import { NextResponse } from "next/server";

const LOCAL_DESKS: Record<string, string> = {
  administrador: "admin@agronys.local",
  vendedor: "vendedor@agronys.local",
  cliente: "cliente@agronys.local",
};

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const local = url.includes("127.0.0.1") || url.includes("localhost");
  if (!local) {
    return NextResponse.json({ error: "El ingreso automático es solo de la base local." }, { status: 410 });
  }
  const body = await request.json().catch(() => ({}));
  const email = LOCAL_DESKS[String(body.desk || "")] || process.env.DEMO_EMAIL || "";
  const password = process.env.DEMO_PASSWORD || "";
  if (!url || !anon || !email || !password) {
    return NextResponse.json({ error: "Falta la sesión local de demostración." }, { status: 500 });
  }
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: anon, "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token || !payload.refresh_token) {
    const message = payload.error_description || payload.msg || payload.error || "No se pudo abrir la base local.";
    return NextResponse.json({ error: typeof message === "string" ? message : "No se pudo abrir la base local." }, { status: 400 });
  }
  return NextResponse.json({
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
  });
}
