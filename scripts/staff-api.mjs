import { loadEnv } from "vite";

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(body));
}

async function rest(url, key, path, options = {}) {
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
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

export function staffApi() {
  return {
    name: "staff-api",
    configureServer(server) {
      const env = loadEnv("development", process.cwd(), "");
      const url = env.VITE_SUPABASE_URL;
      const anon = env.VITE_SUPABASE_ANON_KEY;
      const secret = env.SUPABASE_SECRET_KEY;

      server.middlewares.use("/api/staff", async (req, res) => {
        if (req.method !== "POST") {
          send(res, 405, { error: "Método no permitido." });
          return;
        }
        if (!url || !anon || !secret) {
          send(res, 500, { error: "Falta la clave local del servidor." });
          return;
        }
        try {
          const body = await readBody(req);
          const token = String(req.headers.authorization || "").replace(/^Bearer /, "");
          const me = await fetch(`${url}/auth/v1/user`, {
            headers: { apikey: anon, Authorization: `Bearer ${token}` },
          });
          const meData = await me.json();
          if (!me.ok || !meData?.id) {
            send(res, 401, { error: "Tenés que entrar como superadmin." });
            return;
          }
          const profile = await rest(url, secret, `/rest/v1/profiles?id=eq.${meData.id}&select=role`);
          if (profile?.[0]?.role !== "superadmin") {
            send(res, 403, { error: "Solo el superadmin administra usuarios." });
            return;
          }
          if (body.action === "password") {
            if (!body.user_id || String(body.password || "").length < 8) {
              send(res, 400, { error: "La contraseña provisoria necesita al menos 8 caracteres." });
              return;
            }
            await rest(url, secret, `/auth/v1/admin/users/${body.user_id}`, {
              method: "PUT",
              body: JSON.stringify({ password: body.password }),
            });
            send(res, 200, { ok: true });
            return;
          }
          const role = body.role === "client" ? "client" : "vendor";
          if (!body.email || !body.full_name || String(body.password || "").length < 8) {
            send(res, 400, { error: "Completá nombre, correo y una contraseña de al menos 8 caracteres." });
            return;
          }
          let organizationId = body.organization_id || null;
          if (role === "client" && !organizationId) {
            if (!body.organization_name) {
              send(res, 400, { error: "El cliente necesita un establecimiento." });
              return;
            }
            const org = await rest(url, secret, "/rest/v1/organizations", {
              method: "POST",
              headers: { Prefer: "return=representation" },
              body: JSON.stringify({ legal_name: body.organization_name, country: body.country || "AR" }),
            });
            organizationId = org?.[0]?.id;
          }
          const created = await rest(url, secret, "/auth/v1/admin/users", {
            method: "POST",
            body: JSON.stringify({
              email: body.email,
              password: body.password,
              email_confirm: true,
              user_metadata: { full_name: body.full_name },
            }),
          });
          await rest(url, secret, `/rest/v1/profiles?id=eq.${created.id}`, {
            method: "PATCH",
            headers: { Prefer: "return=minimal" },
            body: JSON.stringify({
              full_name: body.full_name,
              role,
              email: body.email,
              organization_id: role === "client" ? organizationId : null,
            }),
          });
          send(res, 200, { ok: true });
        } catch (error) {
          send(res, 400, { error: error instanceof Error ? error.message : "No se pudo completar." });
        }
      });
    },
  };
}
