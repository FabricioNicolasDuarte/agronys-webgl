import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const root = document.querySelector("#app");
const db = url && key ? createClient(url, key) : null;

const STATUS = {
  draft: "Borrador",
  assigned: "Asignada",
  accepted: "Aceptada",
  invoiced: "Facturada",
  paid: "Cobrada",
  void: "Anulada",
  payable: "A liquidar",
  invoiced_by_payee: "Con factura del colaborador",
  sales_commission: "Comisión de venta",
  dev_split: "Parte de co-desarrollo",
  superadmin: "Superadmin",
  vendor: "Vendedor",
  client: "Cliente",
};

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
}

function money(value) {
  if (value === null || value === undefined || value === "") return "—";
  return `USD ${Number(value).toLocaleString("es-AR")}`;
}

function boot() {
  if (!db) {
    root.innerHTML = `<main class="login"><section class="card"><h1>Entrar</h1><p class="err">La base local no está configurada.</p></section></main>`;
    return;
  }
  db.auth.getSession().then(({ data }) => {
    if (data.session) enter();
    else login();
  });
}

function login(message = "") {
  root.innerHTML = `
    <main class="login">
      <form class="card" id="login">
        <h1>Entrar</h1>
        <p class="muted">El usuario y la contraseña provisoria los entrega Agronys. Acá no hay registro.</p>
        <label>Correo<input name="email" type="email" autocomplete="username" required /></label>
        <label>Contraseña<input name="password" type="password" autocomplete="current-password" required /></label>
        <button type="submit">Entrar</button>
        <p class="err" id="msg">${esc(message)}</p>
        <a href="/">Volver al sitio</a>
      </form>
    </main>`;
  root.querySelector("#login").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { error } = await db.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (error) {
      root.querySelector("#msg").textContent = "Usuario o contraseña incorrectos.";
      return;
    }
    enter();
  });
}

async function enter() {
  const { data: auth } = await db.auth.getUser();
  const user = auth.user;
  if (!user) return login();
  const { data: profile, error } = await db.from("profiles").select("*").eq("id", user.id).single();
  if (error || !profile) return login("No se encontró la cuenta.");
  const collab = profile.role === "vendor"
    ? await db.from("product_collaborators").select("product_id").eq("profile_id", user.id)
    : { data: [] };
  shell(profile, (collab.data || []).length > 0);
}

function modulesFor(profile, collaborator) {
  if (profile.role === "superadmin") {
    return [
      ["resumen", "Resumen"],
      ["personas", "Personas"],
      ["productos", "Productos"],
      ["ventas", "Ventas"],
      ["cobros", "Cobros"],
      ["liquidaciones", "Liquidaciones"],
      ["infra", "Infraestructura"],
      ["demos", "Demos"],
      ["clave", "Mi contraseña"],
    ];
  }
  if (profile.role === "client") {
    return [
      ["contratos", "Mis productos"],
      ["recibos", "Mis comprobantes"],
      ["demos", "Demos"],
      ["clave", "Mi contraseña"],
    ];
  }
  const items = [
    ["ventas", "Mis ventas"],
    ["liquidaciones", "Mis cobros"],
  ];
  if (collaborator) items.push(["proyectos", "Mis proyectos"]);
  items.push(["clave", "Mi contraseña"]);
  return items;
}

function shell(profile, collaborator) {
  const items = modulesFor(profile, collaborator);
  root.innerHTML = `
    <div class="shell">
      <nav class="nav">
        <strong>${esc(profile.full_name || "Cuenta")}</strong>
        <p class="muted">${esc(STATUS[profile.role] || profile.role)}</p>
        ${items.map(([id, label]) => `<button type="button" data-mod="${id}">${label}</button>`).join("")}
        <button type="button" class="ghost" id="out">Salir</button>
        <a href="/">Sitio público</a>
      </nav>
      <main class="main"><section class="panel" id="panel"></section></main>
    </div>`;
  root.querySelector("#out").addEventListener("click", async () => {
    await db.auth.signOut();
    login();
  });
  root.querySelectorAll("[data-mod]").forEach((button) => {
    button.addEventListener("click", () => open(profile, button.dataset.mod));
  });
  open(profile, items[0][0]);
}

async function open(profile, id) {
  root.querySelectorAll("[data-mod]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.mod === id ? "true" : "false");
  });
  const panel = root.querySelector("#panel");
  panel.innerHTML = `<p class="muted">Cargando…</p>`;
  const views = {
    resumen: viewResumen,
    personas: viewPersonas,
    productos: viewProductos,
    ventas: viewVentas,
    cobros: viewCobros,
    liquidaciones: viewPayouts,
    infra: viewInfra,
    demos: viewDemos,
    contratos: viewContratos,
    recibos: viewRecibos,
    proyectos: viewProyectos,
    clave: viewPassword,
  };
  await views[id](panel, profile);
}

async function viewResumen(panel) {
  const [fiscal, deals, payouts, infra] = await Promise.all([
    db.rpc("fiscal_snapshot"),
    db.from("deals").select("status"),
    db.from("payouts").select("status, amount_usd"),
    db.from("infrastructure_costs").select("amount_usd"),
  ]);
  const snap = fiscal.data?.[0];
  const pending = (payouts.data || []).filter((row) => row.status === "payable");
  panel.innerHTML = `
    <h2>Resumen</h2>
    <div class="grid">
      <p><b>Facturado 12 meses</b><br />${snap ? `ARS ${Number(snap.invoiced_ars).toLocaleString("es-AR")}` : "—"}</p>
      <p><b>Tope de referencia</b><br />${snap ? `ARS ${Number(snap.cap_ars).toLocaleString("es-AR")}` : "—"}</p>
      <p><b>Alerta de categoría</b><br />${snap?.alert ? "Revisar con el contador" : "Dentro del margen de alerta"}</p>
      <p><b>Ventas</b><br />${(deals.data || []).length}</p>
      <p><b>Liquidaciones pendientes</b><br />${pending.length}</p>
      <p><b>Infraestructura cargada</b><br />${money((infra.data || []).reduce((sum, row) => sum + Number(row.amount_usd), 0))}</p>
    </div>
    <p class="muted">El tope es la categoría K de ARCA desde agosto de 2026. Reemplazalo por tu categoría real antes de usarlo como decisión.</p>`;
}

async function viewPersonas(panel) {
  const [{ data: people }, { data: orgs }] = await Promise.all([
    db.from("profiles").select("id, full_name, email, role").order("full_name"),
    db.from("organizations").select("id, legal_name").order("legal_name"),
  ]);
  panel.innerHTML = `
    <h2>Personas</h2>
    <p class="muted">Vos das el usuario y la contraseña provisoria. La persona solo puede cambiar esa contraseña.</p>
    <form id="new-user" class="grid">
      <label>Nombre<input name="full_name" required /></label>
      <label>Correo<input name="email" type="email" required /></label>
      <label>Contraseña provisoria<input name="password" type="text" minlength="8" required /></label>
      <label>Rol
        <select name="role">
          <option value="vendor">Vendedor</option>
          <option value="client">Cliente</option>
        </select>
      </label>
      <label>Establecimiento existente
        <select name="organization_id">
          <option value="">Nuevo</option>
          ${(orgs || []).map((org) => `<option value="${org.id}">${esc(org.legal_name)}</option>`).join("")}
        </select>
      </label>
      <label>Nombre del establecimiento nuevo<input name="organization_name" /></label>
      <button type="submit">Crear usuario</button>
    </form>
    <p id="person-msg"></p>
    <table>
      <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Nueva provisoria</th></tr></thead>
      <tbody>
        ${(people || []).map((person) => `
          <tr>
            <td>${esc(person.full_name)}</td>
            <td>${esc(person.email)}</td>
            <td>${esc(STATUS[person.role] || person.role)}</td>
            <td>
              ${person.role === "superadmin" ? "—" : `
                <form data-reset="${person.id}" class="row">
                  <input name="password" type="text" minlength="8" placeholder="Mínimo 8" required />
                  <button type="submit">Guardar</button>
                </form>`}
            </td>
          </tr>`).join("")}
      </tbody>
    </table>`;
  panel.querySelector("#new-user").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const msg = panel.querySelector("#person-msg");
    try {
      await staff({
        action: "create",
        full_name: form.get("full_name"),
        email: form.get("email"),
        password: form.get("password"),
        role: form.get("role"),
        organization_id: form.get("organization_id"),
        organization_name: form.get("organization_name"),
      });
      msg.className = "ok";
      msg.textContent = "Usuario creado. Pasale la contraseña provisoria.";
      viewPersonas(panel);
    } catch (error) {
      msg.className = "err";
      msg.textContent = error.message;
    }
  });
  panel.querySelectorAll("[data-reset]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const password = new FormData(form).get("password");
      try {
        await staff({ action: "password", user_id: form.dataset.reset, password });
        form.reset();
        panel.querySelector("#person-msg").textContent = "Contraseña provisoria actualizada.";
      } catch (error) {
        panel.querySelector("#person-msg").textContent = error.message;
      }
    });
  });
}

async function staff(body) {
  const { data } = await db.auth.getSession();
  const response = await fetch("/api/staff", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${data.session?.access_token || ""}`,
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "No se pudo completar.");
  return payload;
}

async function viewProductos(panel, profile) {
  const [{ data: products }, { data: people }, { data: links }] = await Promise.all([
    db.from("products").select("id, name, line, kind, suggested_price_usd").order("name"),
    db.from("profiles").select("id, full_name, role").in("role", ["vendor", "superadmin"]),
    db.from("product_collaborators").select("product_id, profile_id"),
  ]);
  const names = new Map((people || []).map((person) => [person.id, person.full_name]));
  panel.innerHTML = `
    <h2>Productos</h2>
    ${(products || []).map((product) => `
      <article>
        <h2>${esc(product.name)} · ${esc(product.line)} · ${product.kind === "codeveloped" ? "Co-desarrollo" : "Catálogo"}</h2>
        <form data-price="${product.id}" class="row">
          <label>Precio sugerido USD<input name="price" type="number" min="0" step="0.01" value="${product.suggested_price_usd ?? ""}" /></label>
          <button type="submit">Guardar precio</button>
        </form>
        <p>Colaboradores: ${esc((links || []).filter((link) => link.product_id === product.id).map((link) => names.get(link.profile_id) || "—").join(", ") || "ninguno")}</p>
        <form data-collab="${product.id}" class="row">
          <select name="profile_id">
            ${(people || []).filter((person) => person.role === "vendor").map((person) => `<option value="${person.id}">${esc(person.full_name)}</option>`).join("")}
          </select>
          <button type="submit">Sumar al co-desarrollo</button>
          <button type="button" data-kind="${product.id}">Marcar co-desarrollo</button>
        </form>
      </article>`).join("")}
    <p id="prod-msg"></p>`;
  panel.querySelectorAll("[data-price]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const price = new FormData(form).get("price");
      const { error } = await db.from("products").update({
        suggested_price_usd: price === "" ? null : Number(price),
      }).eq("id", form.dataset.price);
      note(panel, "#prod-msg", error);
    });
  });
  panel.querySelectorAll("[data-collab]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const profileId = new FormData(form).get("profile_id");
      const { error } = await db.from("product_collaborators").insert({
        product_id: form.dataset.collab,
        profile_id: profileId,
      });
      if (error) note(panel, "#prod-msg", error);
      else viewProductos(panel, profile);
    });
  });
  panel.querySelectorAll("[data-kind]").forEach((button) => {
    button.addEventListener("click", async () => {
      await db.from("product_collaborators").insert({
        product_id: button.dataset.kind,
        profile_id: profile.id,
      });
      const { error } = await db.from("products").update({ kind: "codeveloped" }).eq("id", button.dataset.kind);
      if (error) note(panel, "#prod-msg", error);
      else viewProductos(panel, profile);
    });
  });
}

async function loadCatalog() {
  const [products, orgs, people, deals] = await Promise.all([
    db.from("products").select("id, name, suggested_price_usd"),
    db.from("organizations").select("id, legal_name"),
    db.from("profiles").select("id, full_name, role"),
    db.from("deals").select("id, product_id, organization_id, seller_id, status, suggested_price_usd, sold_price_usd, discount_approved").order("created_at", { ascending: false }),
  ]);
  return {
    products: products.data || [],
    orgs: orgs.data || [],
    people: people.data || [],
    deals: deals.data || [],
    error: products.error || orgs.error || people.error || deals.error,
  };
}

async function viewVentas(panel, profile) {
  const catalog = await loadCatalog();
  if (catalog.error && profile.role !== "superadmin") {
    panel.innerHTML = `<h2>Mis ventas</h2><p class="err">${esc(catalog.error.message)}</p>`;
    return;
  }
  const product = new Map(catalog.products.map((item) => [item.id, item]));
  const org = new Map(catalog.orgs.map((item) => [item.id, item.legal_name]));
  const person = new Map(catalog.people.map((item) => [item.id, item.full_name]));
  const admin = profile.role === "superadmin";
  panel.innerHTML = `
    <h2>${admin ? "Ventas" : "Mis ventas"}</h2>
    ${admin ? `
      <form id="new-deal" class="grid">
        <label>Producto<select name="product_id">${catalog.products.map((item) => `<option value="${item.id}">${esc(item.name)}</option>`).join("")}</select></label>
        <label>Establecimiento<select name="organization_id">${catalog.orgs.map((item) => `<option value="${item.id}">${esc(item.legal_name)}</option>`).join("")}</select></label>
        <label>Vendedor<select name="seller_id">${catalog.people.filter((item) => item.role !== "client").map((item) => `<option value="${item.id}">${esc(item.full_name)}</option>`).join("")}</select></label>
        <button type="submit">Asignar venta</button>
      </form>` : ""}
    <p id="deal-msg"></p>
    <table>
      <thead><tr><th>Producto</th><th>Establecimiento</th><th>Vendedor</th><th>Estado</th><th>Sugerido</th><th>Vendido</th>${admin ? "<th></th>" : ""}</tr></thead>
      <tbody>
        ${catalog.deals.map((deal) => `
          <tr>
            <td>${esc(product.get(deal.product_id)?.name)}</td>
            <td>${esc(org.get(deal.organization_id))}</td>
            <td>${esc(person.get(deal.seller_id))}</td>
            <td>${esc(STATUS[deal.status] || deal.status)}</td>
            <td>${money(deal.suggested_price_usd)}</td>
            <td>${money(deal.sold_price_usd)}</td>
            ${admin ? `<td>${deal.status === "assigned" ? `<form data-accept="${deal.id}" class="row"><input name="sold" type="number" min="0" step="0.01" placeholder="Precio vendido" required /><button type="submit">Aceptar</button></form>` : ""}${deal.seller_id !== profile.id && deal.status !== "paid" ? `<button type="button" data-take="${deal.id}">Retomar</button>` : ""}</td>` : ""}
          </tr>`).join("")}
      </tbody>
    </table>`;
  panel.querySelector("#new-deal")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const chosen = product.get(form.get("product_id"));
    const { error } = await db.from("deals").insert({
      product_id: form.get("product_id"),
      organization_id: form.get("organization_id"),
      seller_id: form.get("seller_id"),
      status: "assigned",
      suggested_price_usd: chosen?.suggested_price_usd,
    });
    if (error) note(panel, "#deal-msg", error);
    else viewVentas(panel, profile);
  });
  panel.querySelectorAll("[data-accept]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const sold = Number(new FormData(form).get("sold"));
      const deal = catalog.deals.find((item) => item.id === form.dataset.accept);
      if (deal?.suggested_price_usd && sold < Number(deal.suggested_price_usd)) {
        const { error } = await db.rpc("approve_discount", { p_deal: deal.id });
        if (error) return note(panel, "#deal-msg", error);
      }
      const { error } = await db.from("deals").update({ sold_price_usd: sold, status: "accepted" }).eq("id", form.dataset.accept);
      if (error) note(panel, "#deal-msg", error);
      else viewVentas(panel, profile);
    });
  });
  panel.querySelectorAll("[data-take]").forEach((button) => {
    button.addEventListener("click", async () => {
      const { error } = await db.rpc("take_over_deal", { p_deal: button.dataset.take });
      if (error) note(panel, "#deal-msg", error);
      else viewVentas(panel, profile);
    });
  });
}

async function viewCobros(panel) {
  const [{ data: deals }, { data: products }, { data: invoices }] = await Promise.all([
    db.from("deals").select("id, product_id, status, sold_price_usd, organization_id").in("status", ["accepted", "invoiced", "paid"]),
    db.from("products").select("id, name"),
    db.from("invoices").select("id, deal_id, number, amount_usd, amount_ars"),
  ]);
  const names = new Map((products || []).map((item) => [item.id, item.name]));
  const byDeal = new Map((invoices || []).map((item) => [item.deal_id, item]));
  panel.innerHTML = `
    <h2>Cobros</h2>
    <p class="muted">La factura y el pago los registrás vos. El vendedor no ve el medio ni si el cliente se atrasó.</p>
    <table>
      <thead><tr><th>Producto</th><th>Estado</th><th>Precio</th><th>Acción</th></tr></thead>
      <tbody>
        ${(deals || []).map((deal) => {
          const invoice = byDeal.get(deal.id);
          if (deal.status === "accepted") {
            return `<tr><td>${esc(names.get(deal.product_id))}</td><td>Aceptada</td><td>${money(deal.sold_price_usd)}</td><td>
              <form data-invoice="${deal.id}" data-org="${deal.organization_id}" data-usd="${deal.sold_price_usd}" class="row">
                <input name="number" type="number" placeholder="Nº" required />
                <input name="ars" type="number" step="0.01" placeholder="Pesos" required />
                <button type="submit">Emitir factura C</button>
              </form></td></tr>`;
          }
          if (deal.status === "invoiced" && invoice) {
            return `<tr><td>${esc(names.get(deal.product_id))}</td><td>Factura ${esc(invoice.number)}</td><td>${money(deal.sold_price_usd)}</td><td>
              <form data-pay="${invoice.id}" data-deal="${deal.id}" class="row">
                <input name="amount" type="number" step="0.01" value="${invoice.amount_ars}" required />
                <input name="method" placeholder="Medio" required />
                <input name="behavior" placeholder="Comportamiento de pago" />
                <button type="submit">Registrar cobro y liquidar</button>
              </form></td></tr>`;
          }
          return `<tr><td>${esc(names.get(deal.product_id))}</td><td>Cobrada</td><td>${money(deal.sold_price_usd)}</td><td>Lista</td></tr>`;
        }).join("")}
      </tbody>
    </table>
    <p id="pay-msg"></p>`;
  panel.querySelectorAll("[data-invoice]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const usd = Number(form.dataset.usd);
      const ars = Number(formData.get("ars"));
      const { error } = await db.from("invoices").insert({
        deal_id: form.dataset.invoice,
        organization_id: form.dataset.org,
        kind: "C",
        number: Number(formData.get("number")),
        amount_usd: usd,
        amount_ars: ars,
        fx_rate: usd ? ars / usd : null,
      });
      if (error) return note(panel, "#pay-msg", error);
      const updated = await db.from("deals").update({ status: "invoiced" }).eq("id", form.dataset.invoice);
      if (updated.error) return note(panel, "#pay-msg", updated.error);
      viewCobros(panel);
    });
  });
  panel.querySelectorAll("[data-pay]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const { error } = await db.from("payments").insert({
        invoice_id: form.dataset.pay,
        amount_ars: Number(formData.get("amount")),
        method: formData.get("method"),
        behavior: formData.get("behavior"),
      });
      if (error) return note(panel, "#pay-msg", error);
      const updated = await db.from("deals").update({ status: "paid" }).eq("id", form.dataset.deal);
      if (updated.error) return note(panel, "#pay-msg", updated.error);
      const settled = await db.rpc("settle_deal", { p_deal: form.dataset.deal });
      if (settled.error) return note(panel, "#pay-msg", settled.error);
      viewCobros(panel);
    });
  });
}

async function viewPayouts(panel, profile) {
  const { data, error } = await db.from("payouts").select("kind, amount_usd, status, payee_id");
  if (error) {
    panel.innerHTML = `<h2>Cobros</h2><p class="err">${esc(error.message)}</p>`;
    return;
  }
  let names = new Map();
  if (profile.role === "superadmin") {
    const people = await db.from("profiles").select("id, full_name");
    names = new Map((people.data || []).map((person) => [person.id, person.full_name]));
  }
  panel.innerHTML = `
    <h2>${profile.role === "superadmin" ? "Liquidaciones" : "Mis cobros"}</h2>
    <p class="muted">${profile.role === "superadmin" ? "Lo que Agronys debe pagar. El cliente no le paga al vendedor." : "Lo que Agronys te liquida. Acá no aparece cómo pagó el cliente."}</p>
    <table>
      <thead><tr>${profile.role === "superadmin" ? "<th>Persona</th>" : ""}<th>Tipo</th><th>Importe</th><th>Estado</th></tr></thead>
      <tbody>
        ${(data || []).map((row) => `<tr>
          ${profile.role === "superadmin" ? `<td>${esc(names.get(row.payee_id))}</td>` : ""}
          <td>${esc(STATUS[row.kind] || row.kind)}</td>
          <td>${money(row.amount_usd)}</td>
          <td>${esc(STATUS[row.status] || row.status)}</td>
        </tr>`).join("")}
      </tbody>
    </table>`;
}

async function viewInfra(panel) {
  const { data } = await db.from("infrastructure_costs").select("period, amount_usd, note").order("period", { ascending: false });
  panel.innerHTML = `
    <h2>Infraestructura</h2>
    <p class="muted">Este costo no entra en el precio del producto ni en el reparto. Solo lo ves vos.</p>
    <form id="infra" class="row">
      <label>Mes<input name="period" type="date" required /></label>
      <label>USD<input name="amount" type="number" min="0" step="0.01" required /></label>
      <label>Nota<input name="note" /></label>
      <button type="submit">Cargar</button>
    </form>
    <p id="infra-msg"></p>
    <table>
      <thead><tr><th>Mes</th><th>Importe</th><th>Nota</th></tr></thead>
      <tbody>${(data || []).map((row) => `<tr><td>${esc(row.period)}</td><td>${money(row.amount_usd)}</td><td>${esc(row.note)}</td></tr>`).join("")}</tbody>
    </table>`;
  panel.querySelector("#infra").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { error } = await db.from("infrastructure_costs").insert({
      period: form.get("period"),
      amount_usd: Number(form.get("amount")),
      note: form.get("note"),
    });
    if (error) note(panel, "#infra-msg", error);
    else viewInfra(panel);
  });
}

async function viewDemos(panel, profile) {
  const demos = await db.from("demos").select("expires_at, product_id, organization_id");
  const products = profile.role === "client" ? { data: [] } : await db.from("products").select("id, name");
  const orgs = profile.role === "superadmin" ? await db.from("organizations").select("id, legal_name") : { data: [] };
  const names = new Map((products.data || []).map((item) => [item.id, item.name]));
  const orgNames = new Map((orgs.data || []).map((item) => [item.id, item.legal_name]));
  panel.innerHTML = `
    <h2>Demos</h2>
    ${profile.role === "superadmin" ? `
      <p class="muted">Habilitá una demo para un establecimiento. El cliente la ve en su cuenta.</p>
      <form id="demo" class="row">
        <select name="organization_id">${(orgs.data || []).map((item) => `<option value="${item.id}">${esc(item.legal_name)}</option>`).join("")}</select>
        <select name="product_id">${(products.data || []).map((item) => `<option value="${item.id}">${esc(item.name)}</option>`).join("")}</select>
        <label>Vence<input name="expires" type="date" required /></label>
        <button type="submit">Habilitar</button>
      </form>
      <p id="demo-msg"></p>` : `<p class="muted">Demos habilitadas para tu cuenta.</p>`}
    <ul>${(demos.data || []).map((demo) => `<li>${esc(names.get(demo.product_id) || "Demo")}${orgNames.get(demo.organization_id) ? ` · ${esc(orgNames.get(demo.organization_id))}` : ""} · hasta ${esc(new Date(demo.expires_at).toLocaleDateString("es-AR"))}</li>`).join("") || "<li>No hay demos.</li>"}</ul>
    ${demos.error ? `<p class="err">${esc(demos.error.message)}</p>` : ""}`;
  panel.querySelector("#demo")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { error } = await db.from("demos").insert({
      organization_id: form.get("organization_id"),
      product_id: form.get("product_id"),
      expires_at: new Date(`${form.get("expires")}T23:59:00`).toISOString(),
      granted_by: profile.id,
    });
    if (error) note(panel, "#demo-msg", error);
    else viewDemos(panel, profile);
  });
}

async function viewContratos(panel) {
  const { data, error } = await db.from("client_contracts").select("product_name, status, sold_price_usd");
  panel.innerHTML = `
    <h2>Mis productos</h2>
    ${error ? `<p class="err">${esc(error.message)}</p>` : `
      <table>
        <thead><tr><th>Producto</th><th>Estado</th><th>Precio</th></tr></thead>
        <tbody>${(data || []).map((row) => `<tr><td>${esc(row.product_name)}</td><td>${esc(STATUS[row.status] || row.status)}</td><td>${money(row.sold_price_usd)}</td></tr>`).join("")}</tbody>
      </table>`}`;
}

async function viewRecibos(panel) {
  const { data, error } = await db.from("client_receipts").select("number, amount_ars, paid_at");
  panel.innerHTML = `
    <h2>Mis comprobantes</h2>
    ${error ? `<p class="err">${esc(error.message)}</p>` : `
      <table>
        <thead><tr><th>Factura</th><th>Pesos</th><th>Fecha</th></tr></thead>
        <tbody>${(data || []).map((row) => `<tr><td>${esc(row.number)}</td><td>ARS ${Number(row.amount_ars).toLocaleString("es-AR")}</td><td>${esc(new Date(row.paid_at).toLocaleDateString("es-AR"))}</td></tr>`).join("")}</tbody>
      </table>`}`;
}

async function viewProyectos(panel) {
  const [{ data: products }, { data: deals }, { data: payouts }] = await Promise.all([
    db.from("products").select("id, name, kind"),
    db.from("deals").select("product_id, status, sold_price_usd").neq("status", "draft"),
    db.from("payouts").select("kind, amount_usd, status"),
  ]);
  panel.innerHTML = `
    <h2>Mis proyectos</h2>
    <p class="muted">Ves el proyecto que co-desarrollás y tu parte. No ves la infraestructura ni cómo paga el cliente.</p>
    <ul>${(products || []).map((product) => `<li>${esc(product.name)}</li>`).join("")}</ul>
    <table>
      <thead><tr><th>Estado de la venta</th><th>Precio</th></tr></thead>
      <tbody>${(deals || []).map((deal) => `<tr><td>${esc(STATUS[deal.status] || deal.status)}</td><td>${money(deal.sold_price_usd)}</td></tr>`).join("")}</tbody>
    </table>
    <p>Tu parte: ${(payouts || []).map((row) => money(row.amount_usd)).join(", ") || "todavía no hay una venta cobrada"}</p>`;
}

function viewPassword(panel) {
  panel.innerHTML = `
    <h2>Mi contraseña</h2>
    <p class="muted">Podés cambiar tu contraseña. El correo y el rol los administra Agronys.</p>
    <form id="pass" class="grid">
      <label>Nueva contraseña<input name="password" type="password" minlength="8" required /></label>
      <label>Repetir<input name="again" type="password" minlength="8" required /></label>
      <button type="submit">Cambiar</button>
    </form>
    <p id="pass-msg"></p>`;
  panel.querySelector("#pass").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const msg = panel.querySelector("#pass-msg");
    if (form.get("password") !== form.get("again")) {
      msg.className = "err";
      msg.textContent = "Las dos contraseñas no coinciden.";
      return;
    }
    const { error } = await db.auth.updateUser({ password: String(form.get("password")) });
    msg.className = error ? "err" : "ok";
    msg.textContent = error ? error.message : "Contraseña actualizada.";
  });
}

function note(panel, selector, error) {
  const msg = panel.querySelector(selector);
  if (!msg) return;
  msg.className = "err";
  msg.textContent = error?.message || "";
}

boot();
