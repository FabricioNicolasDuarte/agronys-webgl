import { NextResponse } from "next/server";
import { isMarket, isParty, taxIdError } from "@/lib/fiscal/billing";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const secret = process.env.SUPABASE_SECRET_KEY || "";

async function rest(path: string, options: RequestInit = {}) {
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.msg || data?.message || data?.error_description || data?.error || "No se pudo completar.";
    throw new Error(typeof message === "string" ? message : "No se pudo completar.");
  }
  return data;
}

export async function POST(request: Request) {
  if (!url || !anon || !secret) {
    return NextResponse.json({ error: "Falta la clave local del servidor." }, { status: 500 });
  }
  try {
    const body = await request.json();
    const token = (request.headers.get("authorization") || "").replace(/^Bearer /, "");
    const me = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: anon, Authorization: `Bearer ${token}` },
    });
    const meData = await me.json();
    if (!me.ok || !meData?.id) {
      return NextResponse.json({ error: "Tenés que entrar como superadmin." }, { status: 401 });
    }
    const profile = await rest(`/rest/v1/profiles?id=eq.${meData.id}&select=role`);
    if (profile?.[0]?.role !== "superadmin") {
      return NextResponse.json({ error: "Solo el superadmin administra usuarios." }, { status: 403 });
    }
    if (body.action === "password") {
      if (!body.user_id || String(body.password || "").length < 8) {
        return NextResponse.json({ error: "La contraseña provisoria necesita al menos 8 caracteres." }, { status: 400 });
      }
      await rest(`/auth/v1/admin/users/${body.user_id}`, {
        method: "PUT",
        body: JSON.stringify({ password: body.password }),
      });
      return NextResponse.json({ ok: true });
    }
    if (body.action === "delete") {
      if (!body.user_id || body.user_id === meData.id) {
        return NextResponse.json({ error: "No se puede borrar esta cuenta." }, { status: 400 });
      }
      const target = await rest(`/rest/v1/profiles?id=eq.${body.user_id}&select=role`);
      if (target?.[0]?.role === "superadmin") {
        return NextResponse.json({ error: "La cuenta de la casa no se borra." }, { status: 400 });
      }
      const [sales, payouts, grants] = await Promise.all([
        rest(`/rest/v1/deals?seller_id=eq.${body.user_id}&select=id&limit=1`),
        rest(`/rest/v1/payouts?payee_id=eq.${body.user_id}&select=id&limit=1`),
        rest(`/rest/v1/demos?granted_by=eq.${body.user_id}&select=id&limit=1`),
      ]);
      if (sales?.length || payouts?.length || grants?.length) {
        return NextResponse.json({ error: "Esta persona tiene ventas, liquidaciones o demos. No se borra." }, { status: 400 });
      }
      await rest(`/auth/v1/admin/users/${body.user_id}`, { method: "DELETE" });
      return NextResponse.json({ ok: true });
    }
    if (body.action === "update") {
      const role = body.role === "client" ? "client" : "vendor";
      if (!body.user_id || !body.email || !body.full_name) {
        return NextResponse.json({ error: "Completá nombre y correo." }, { status: 400 });
      }
      const organizationId = role === "client" ? body.organization_id || null : null;
      if (role === "client" && !organizationId) {
        return NextResponse.json({ error: "El cliente necesita un establecimiento." }, { status: 400 });
      }
      await rest(`/auth/v1/admin/users/${body.user_id}`, {
        method: "PUT",
        body: JSON.stringify({
          email: body.email,
          email_confirm: true,
          user_metadata: { full_name: body.full_name },
        }),
      });
      await rest(`/rest/v1/profiles?id=eq.${body.user_id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          full_name: body.full_name,
          role,
          email: body.email,
          organization_id: organizationId,
        }),
      });
      return NextResponse.json({ ok: true });
    }
    const role = body.role === "client" ? "client" : "vendor";
    if (!body.email || !body.full_name || String(body.password || "").length < 8) {
      return NextResponse.json({ error: "Completá nombre, correo y una contraseña de al menos 8 caracteres." }, { status: 400 });
    }
    let organizationId = body.organization_id || null;
    if (role === "client" && !organizationId) {
      if (!body.organization_name) {
        return NextResponse.json({ error: "El cliente necesita un establecimiento." }, { status: 400 });
      }
      const country = String(body.country || "");
      const party = String(body.party || "juridica");
      if (!isMarket(country) || !isParty(party)) {
        return NextResponse.json({ error: "El establecimiento tiene que estar en Argentina, Paraguay o Uruguay." }, { status: 400 });
      }
      const taxError = taxIdError(country, String(body.tax_id || ""));
      if (taxError) return NextResponse.json({ error: taxError }, { status: 400 });
      const org = await rest("/rest/v1/organizations", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          legal_name: body.organization_name,
          country,
          party,
          tax_id: String(body.tax_id).trim(),
        }),
      });
      organizationId = org?.[0]?.id;
    }
    const created = await rest("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        email_confirm: true,
        user_metadata: { full_name: body.full_name },
      }),
    });
    await rest(`/rest/v1/profiles?id=eq.${created.id}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        full_name: body.full_name,
        role,
        email: body.email,
        organization_id: role === "client" ? organizationId : null,
      }),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo completar.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
