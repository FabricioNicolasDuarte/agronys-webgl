import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const secret = process.env.SUPABASE_SECRET_KEY || "";
const kinds = new Set(["invoice", "payment", "fiscal", "infra", "payout"]);
const mimes = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const maxBytes = 8 * 1024 * 1024;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Profile = { id: string; role: string; organization_id: string | null };

async function service(path: string, options: RequestInit = {}) {
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
      ...(options.headers || {}),
    },
  });
  return response;
}

async function caller(request: Request): Promise<Profile | null> {
  const token = (request.headers.get("authorization") || "").replace(/^Bearer /, "");
  if (!token) return null;
  const me = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anon, Authorization: `Bearer ${token}` },
  });
  const user = await me.json();
  if (!me.ok || !user?.id) return null;
  const rows = await service(`/rest/v1/profiles?id=eq.${user.id}&select=id,role,organization_id`);
  const list = await rows.json();
  return Array.isArray(list) ? list[0] || null : null;
}

async function ownerExists(kind: string, ownerId: string) {
  const table: Record<string, string> = {
    invoice: "invoices",
    payment: "payments",
    fiscal: "organizations",
    infra: "infrastructure_costs",
    payout: "payouts",
  };
  const rows = await service(`/rest/v1/${table[kind]}?id=eq.${ownerId}&select=id`);
  const list = await rows.json();
  return Boolean(list?.[0]?.id);
}

async function allowed(profile: Profile, kind: string, ownerId: string, writing: boolean) {
  if (profile.role === "superadmin") return true;
  if (kind === "invoice" && !writing && profile.role === "client" && profile.organization_id) {
    const rows = await service(`/rest/v1/invoices?id=eq.${ownerId}&select=organization_id`);
    const list = await rows.json();
    return list?.[0]?.organization_id === profile.organization_id;
  }
  if (kind === "payout") {
    const rows = await service(`/rest/v1/payouts?id=eq.${ownerId}&select=payee_id`);
    const list = await rows.json();
    return list?.[0]?.payee_id === profile.id;
  }
  return false;
}

function safeName(name: string) {
  const clean = name.replace(/[^\w.\-]+/g, "_").slice(0, 80);
  return clean || "archivo";
}

export async function GET(request: Request) {
  if (!url || !anon || !secret) {
    return NextResponse.json({ error: "Falta la configuración del servidor." }, { status: 500 });
  }
  const profile = await caller(request);
  if (!profile) return NextResponse.json({ error: "Tenés que entrar." }, { status: 401 });
  const params = new URL(request.url).searchParams;
  const id = params.get("id");
  if (id) {
    if (!uuid.test(id)) return NextResponse.json({ error: "No está el archivo." }, { status: 400 });
    const found = await service(`/rest/v1/record_files?id=eq.${id}&select=id,kind,owner_id,storage_path,file_name,mime`);
    const row = (await found.json())?.[0];
    if (!row) return NextResponse.json({ error: "No está el archivo." }, { status: 404 });
    if (!(await allowed(profile, row.kind, row.owner_id, false))) {
      return NextResponse.json({ error: "No podés ver este archivo." }, { status: 403 });
    }
    const file = await service(`/storage/v1/object/records/${row.storage_path}`);
    if (!file.ok) return NextResponse.json({ error: "No se pudo leer el archivo." }, { status: 502 });
    return new NextResponse(file.body, {
      headers: {
        "content-type": row.mime,
        "content-disposition": `attachment; filename="${safeName(row.file_name)}"`,
      },
    });
  }
  const kind = params.get("kind") || "";
  const owner = params.get("owner") || "";
  if (!kinds.has(kind) || !uuid.test(owner)) {
    return NextResponse.json({ error: "Falta el documento." }, { status: 400 });
  }
  if (!(await allowed(profile, kind, owner, false))) {
    return NextResponse.json({ files: [] });
  }
  const listed = await service(`/rest/v1/record_files?kind=eq.${kind}&owner_id=eq.${owner}&select=id,file_name`);
  const files = await listed.json();
  return NextResponse.json({ files: Array.isArray(files) ? files : [] });
}

export async function POST(request: Request) {
  if (!url || !anon || !secret) {
    return NextResponse.json({ error: "Falta la configuración del servidor." }, { status: 500 });
  }
  const profile = await caller(request);
  if (!profile) return NextResponse.json({ error: "Tenés que entrar." }, { status: 401 });
  const form = await request.formData();
  const kind = String(form.get("kind") || "");
  const ownerId = String(form.get("owner_id") || "");
  const file = form.get("file");
  if (!kinds.has(kind) || !uuid.test(ownerId) || !(file instanceof File)) {
    return NextResponse.json({ error: "Falta el archivo." }, { status: 400 });
  }
  if (!mimes.has(file.type) || file.size <= 0 || file.size > maxBytes) {
    return NextResponse.json({ error: "El archivo tiene que ser PDF, JPG, PNG o WebP, de hasta 8 MB." }, { status: 400 });
  }
  if (!(await ownerExists(kind, ownerId))) {
    return NextResponse.json({ error: "Ese registro no existe." }, { status: 404 });
  }
  if (!(await allowed(profile, kind, ownerId, true))) {
    return NextResponse.json({ error: "No podés cargar este archivo." }, { status: 403 });
  }
  const path = `${kind}/${ownerId}/${safeName(file.name)}`;
  const previous = await service(`/rest/v1/record_files?kind=eq.${kind}&owner_id=eq.${ownerId}&select=storage_path`);
  const old = (await previous.json())?.[0];
  if (old?.storage_path) {
    await service(`/storage/v1/object/records/${old.storage_path}`, { method: "DELETE" });
  }
  const uploaded = await service(`/storage/v1/object/records/${path}`, {
    method: "POST",
    headers: { "content-type": file.type, "x-upsert": "true" },
    body: await file.arrayBuffer(),
  });
  if (!uploaded.ok) {
    const detail = await uploaded.text();
    return NextResponse.json({ error: detail || "No se pudo guardar el archivo." }, { status: 502 });
  }
  if (old) {
    await service(`/rest/v1/record_files?kind=eq.${kind}&owner_id=eq.${ownerId}`, { method: "DELETE" });
  }
  const saved = await service("/rest/v1/record_files", {
    method: "POST",
    headers: { "content-type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify({
      kind,
      owner_id: ownerId,
      storage_path: path,
      file_name: file.name,
      mime: file.type,
      created_by: profile.id,
    }),
  });
  if (!saved.ok) {
    const detail = await saved.text();
    return NextResponse.json({ error: detail || "No se pudo registrar el archivo." }, { status: 502 });
  }
  const row = (await saved.json())?.[0];
  return NextResponse.json({ id: row?.id, file_name: row?.file_name });
}
