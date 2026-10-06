"use client";

import { Sora } from "next/font/google";
import {
  ArrowUUpLeft,
  Bell,
  BookOpen,
  CaretLeft,
  Check,
  Coins,
  CurrencyCircleDollar,
  FileText,
  FolderOpen,
  HardDrives,
  Key,
  LinkSimple,
  List,
  Minus,
  Package,
  PencilSimple,
  PlayCircle,
  Plus,
  Prohibit,
  Receipt,
  SignOut,
  SquaresFour,
  Trash,
  UserPlus,
  UsersThree,
  Wallet,
  X,
  type Icon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Dashboard } from "@/components/cuenta/dashboard/dashboard-view";
import { ClientDesk } from "@/components/cuenta/dashboard/client-desk";
import { ProjectDesk } from "@/components/cuenta/dashboard/project-desk";
import { VendorDesk } from "@/components/cuenta/dashboard/vendor-desk";
import { loadSituation } from "@/components/cuenta/dashboard/load-situation";
import type { Situation } from "@/components/cuenta/dashboard/situation";
import { Guia } from "@/components/cuenta/guia";
import { Alertas } from "@/components/cuenta/alerts-view";
import { loadAlerts, type DeskAlert } from "@/components/cuenta/alerts";
import { billingFor, isMarket, isParty, MARKET_LABEL, PARTY_LABEL, pesosFrom, type Market, type Party } from "@/lib/fiscal/billing";
import { RecordFile } from "@/components/cuenta/record-file";
import { browserDb } from "@/lib/supabase";

type Role = "superadmin" | "vendor" | "client";
type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: Role;
  organization_id: string | null;
};

const STATUS: Record<string, string> = {
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

function money(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  return `USD ${Number(value).toLocaleString("es-AR")}`;
}

function label(value: string | null | undefined) {
  if (!value) return "—";
  return STATUS[value] || value;
}

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SIDE_KEY = "agronys-nav";

const ICONS: Record<string, Icon> = {
  resumen: SquaresFour,
  ventas: Receipt,
  cobros: CurrencyCircleDollar,
  guia: BookOpen,
  liquidaciones: Wallet,
  personas: UsersThree,
  productos: Package,
  infra: HardDrives,
  demos: PlayCircle,
  alertas: Bell,
  contratos: Package,
  recibos: FileText,
  proyectos: FolderOpen,
  panel: SquaresFour,
  clave: Key,
};

type SideItem = { id: string; name: string };
type SideGroup = { label: string; items: SideItem[] };

const GLYPH = {
  plus: Plus,
  close: X,
  edit: PencilSimple,
  remove: Trash,
  save: Check,
  key: Key,
  link: LinkSimple,
  join: UserPlus,
  unlink: Minus,
  invoice: Receipt,
  collect: Coins,
  take: ArrowUUpLeft,
  void: Prohibit,
} as const;

function Act({
  name,
  title,
  tone,
  type = "button",
  onClick,
}: {
  name: keyof typeof GLYPH;
  title: string;
  tone?: "primary" | "danger";
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const Glyph = GLYPH[name];
  return (
    <button type={type} className={tone ? `act is-${tone}` : "act"} aria-label={title} title={title} onClick={onClick}>
      <Glyph size={15} weight="regular" aria-hidden="true" />
    </button>
  );
}

async function staff(db: SupabaseClient, body: Record<string, unknown>) {
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
}

export function Cuenta() {
  const db = browserDb();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [bootError, setBootError] = useState("");
  const [collaborator, setCollaborator] = useState(false);
  const [mod, setMod] = useState("resumen");
  const [collapsed, setCollapsed] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [alerts, setAlerts] = useState<DeskAlert[]>([]);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(SIDE_KEY) === "1");
    } catch {
      /* la barra queda abierta */
    }
  }, []);

  useEffect(() => {
    let stop = false;
    (async () => {
      const { data } = await db.auth.getSession();
      if (stop) return;
      if (!data.session) {
        setReady(true);
        return;
      }
      await loadProfile(db, setProfile, setCollaborator, setMod);
      if (!stop) setReady(true);
    })().catch((error) => {
      if (stop) return;
      setBootError(error instanceof Error ? error.message : "No se pudo abrir la cuenta.");
      setReady(true);
    });
    return () => {
      stop = true;
    };
  }, [db]);

  useEffect(() => {
    if (!profile) return;
    loadAlerts(db, profile.role).then(setAlerts);
  }, [db, profile]);

  if (!ready) return <main className="cuenta"><p className="muted">Abriendo la cuenta…</p></main>;
  if (bootError) return <main className="cuenta"><p className="err">{bootError}</p></main>;
  if (!profile) {
    return (
      <Gate
        db={db}
        onIn={async () => {
          await loadProfile(db, setProfile, setCollaborator, setMod);
        }}
      />
    );
  }

  const groups = modulesFor(profile, collaborator);
  const shellTone = collaborator ? " is-admin" : profile.role === "client" ? " is-client" : profile.role === "vendor" ? " is-vendor" : "";
  const shellClass = `shell ${sora.className}${shellTone}${collapsed ? " is-collapsed" : ""}${navOpen ? " is-nav-open" : ""}`;
  function choose(id: string) {
    setMod(id);
    setNavOpen(false);
  }

  function toggleSide() {
    setCollapsed((value) => {
      const next = !value;
      try {
        localStorage.setItem(SIDE_KEY, next ? "1" : "0");
      } catch {
        /* sigue el estado de esta visita */
      }
      return next;
    });
  }

  return (
    <div className={shellClass}>
      {navOpen ? <button type="button" className="shell-shade" aria-label="Cerrar menú" onClick={() => setNavOpen(false)} /> : null}
      <aside className="shell-side">
        <Link className="shell-brand" href="/" aria-label="Agronys">
          <img className="shell-brand-full" src="/logos/logo-texto-blanco.svg" alt="" />
          <img className="shell-brand-mark" src="/logos/logo-solo.svg" alt="" />
        </Link>
        <nav className="shell-nav" aria-label="Módulos de la cuenta">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="shell-label">{group.label}</p>
              {group.items.map((item) => {
                const Glyph = ICONS[item.id] || SquaresFour;
                return (
                  <button key={item.id} type="button" className="shell-link" aria-pressed={mod === item.id} title={item.name} onClick={() => choose(item.id)}>
                    <Glyph size={20} weight="regular" aria-hidden="true" />
                    <span>{item.name}</span>
                    {item.id === "alertas" && alerts.length ? <em className="shell-count">{alerts.length}</em> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="shell-foot">
          <div className="shell-who">
            <strong>{profile.full_name || "Cuenta"}</strong>
            <p className="muted">{collaborator ? "Administrador" : label(profile.role)}</p>
          </div>
          <button type="button" className="shell-link" aria-pressed={mod === "clave"} title="Mi contraseña" onClick={() => choose("clave")}>
            <Key size={20} weight="regular" aria-hidden="true" />
            <span>Mi contraseña</span>
          </button>
          <button type="button" className="shell-link" title="Salir" onClick={() => {
            void db.auth.signOut().then(() => {
              setProfile(null);
              setCollaborator(false);
              setAlerts([]);
            });
          }}>
            <SignOut size={20} weight="regular" aria-hidden="true" />
            <span>Salir</span>
          </button>
          <button type="button" className="shell-collapse" aria-expanded={!collapsed} aria-label={collapsed ? "Expandir menú" : "Contraer menú"} onClick={toggleSide}>
            <CaretLeft size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </aside>
      <main className="main">
        <div className="shell-bar">
          <button type="button" aria-label="Abrir menú" onClick={() => setNavOpen(true)}>
            <List size={22} weight="regular" aria-hidden="true" />
          </button>
          <img src="/logos/logo-texto-blanco.svg" alt="Agronys" />
        </div>
        <section className={mod === "resumen" || mod === "guia" || mod === "personas" || mod === "productos" || mod === "proyectos" || mod === "panel" || mod === "alertas" ? "panel is-board" : "panel"}>
          <p className="sim-note">Los números salen de lo que está cargado en la base.</p>
          {mod === "resumen" ? <Estado db={db} /> : null}
          {mod === "personas" ? <Personas db={db} /> : null}
          {mod === "productos" ? <Productos db={db} profile={profile} /> : null}
          {mod === "ventas" ? <Ventas db={db} profile={profile} /> : null}
          {mod === "cobros" ? <Cobros db={db} /> : null}
          {mod === "guia" ? <Guia /> : null}
          {mod === "liquidaciones" ? <Liquidaciones db={db} profile={profile} /> : null}
          {mod === "infra" ? <Infra db={db} /> : null}
          {mod === "demos" ? <Demos db={db} profile={profile} /> : null}
          {mod === "contratos" ? <Contratos db={db} /> : null}
          {mod === "recibos" ? <Recibos db={db} /> : null}
          {mod === "proyectos" ? <ProjectDesk db={db} profile={profile} /> : null}
          {mod === "panel" && profile.role === "vendor" ? <VendorDesk db={db} profile={profile} /> : null}
          {mod === "panel" && profile.role === "client" ? <ClientDesk db={db} /> : null}
          {mod === "alertas" ? <Alertas alerts={alerts} /> : null}
          {mod === "clave" ? <Clave db={db} /> : null}
        </section>
      </main>
    </div>
  );
}

function modulesFor(profile: Profile, collaborator: boolean): SideGroup[] {
  if (profile.role === "superadmin") {
    return [
      {
        label: "Operación",
        items: [
          { id: "resumen", name: "Estado" },
          { id: "alertas", name: "Alertas" },
          { id: "ventas", name: "Ventas" },
          { id: "cobros", name: "Cobros" },
          { id: "guia", name: "Guía" },
          { id: "liquidaciones", name: "Liquidaciones" },
        ],
      },
      {
        label: "Catálogo",
        items: [
          { id: "personas", name: "Personas" },
          { id: "productos", name: "Productos" },
        ],
      },
      {
        label: "Casa",
        items: [
          { id: "infra", name: "Infraestructura" },
          { id: "demos", name: "Demos" },
        ],
      },
    ];
  }
  if (profile.role === "client") {
    return [
      {
        label: "Cuenta",
        items: [
          { id: "panel", name: "Estado" },
          { id: "alertas", name: "Alertas" },
          { id: "contratos", name: "Mis productos" },
          { id: "recibos", name: "Mis comprobantes" },
          { id: "demos", name: "Demos" },
        ],
      },
    ];
  }
  const groups: SideGroup[] = [];
  if (collaborator) {
    groups.push({ label: "Proyectos", items: [{ id: "proyectos", name: "Mis proyectos" }, { id: "alertas", name: "Alertas" }] });
  }
  groups.push({
    label: "Operación",
    items: [
      ...(collaborator ? [] : [{ id: "panel", name: "Estado" }, { id: "alertas", name: "Alertas" }]),
      { id: "ventas", name: "Mis ventas" },
      { id: "liquidaciones", name: "Mis cobros" },
    ],
  });
  return groups;
}

function Gate({ db, onIn }: { db: SupabaseClient; onIn: () => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const signed = await db.auth.signInWithPassword({ email: email.trim(), password });
    if (signed.error) {
      setError("Correo o contraseña incorrectos.");
      setPending(false);
      return;
    }
    await onIn();
    setPending(false);
  }

  return (
    <main className="cuenta">
      <form className="login" onSubmit={submit}>
        <img className="login-logo" src="/logos/logo-texto-blanco.svg" alt="Agronys" />
        <h1>Entrar</h1>
        <label>
          Correo
          <input type="email" name="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Contraseña
          <input type="password" name="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error ? <p className="err">{error}</p> : null}
        <button type="submit" disabled={pending}>{pending ? "Entrando…" : "Entrar"}</button>
        <p className="muted">El alta la hace la casa. No hay registro público.</p>
      </form>
    </main>
  );
}

async function loadProfile(
  db: SupabaseClient,
  setProfile: (profile: Profile | null) => void,
  setCollaborator: (value: boolean) => void,
  setMod: (value: string) => void,
) {
  const { data: auth } = await db.auth.getUser();
  const user = auth.user;
  if (!user) return setProfile(null);
  const { data: profile, error } = await db.from("profiles").select("*").eq("id", user.id).single();
  if (error || !profile) return setProfile(null);
  const next = profile as Profile;
  let isCollaborator = false;
  if (next.role === "vendor") {
    const links = await db.from("product_collaborators").select("product_id").eq("profile_id", user.id);
    isCollaborator = (links.data || []).length > 0;
  }
  setCollaborator(isCollaborator);
  setMod(next.role === "client" ? "panel" : isCollaborator ? "proyectos" : next.role === "vendor" ? "panel" : "resumen");
  setProfile(next);
}

function Personas({ db }: { db: SupabaseClient }) {
  const [people, setPeople] = useState<{ id: string; full_name: string; email: string; role: string; organization_id: string | null }[]>([]);
  const [orgs, setOrgs] = useState<{ id: string; legal_name: string; country: string }[]>([]);
  const [note, setNote] = useState<{ text: string; ok: boolean } | null>(null);
  const [role, setRole] = useState("vendor");
  const [orgMode, setOrgMode] = useState("existing");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [keying, setKeying] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    Promise.all([
      db.from("profiles").select("id, full_name, email, role, organization_id").order("full_name"),
      db.from("organizations").select("id, legal_name, country").order("legal_name"),
    ]).then(([list, orgList]) => {
      setPeople(list.data || []);
      setOrgs(orgList.data || []);
    });
  }, [db, tick]);

  const orgNames = new Map(orgs.map((org) => [org.id, org]));
  const bands = [
    { id: "superadmin", title: "Casa" },
    { id: "vendor", title: "Vendedores" },
    { id: "client", title: "Clientes" },
  ];

  return (
    <div className="desk">
      <header className="desk-head">
        <div>
          <p className="ops-kicker">Catálogo</p>
          <h2>Personas</h2>
          <p className="desk-lead">Cada persona entra con una contraseña provisoria y después la cambia. Un cliente siempre pertenece a un establecimiento.</p>
        </div>
        <Act name={creating ? "close" : "plus"} title={creating ? "Cerrar" : "Nueva"} tone="primary" onClick={() => setCreating((value) => !value)} />
      </header>
      {creating ? (
      <form className="desk-card" onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        try {
          await staff(db, {
            action: "create",
            full_name: form.get("full_name"),
            email: form.get("email"),
            password: form.get("password"),
            role,
            organization_id: role === "client" && orgMode === "existing" ? form.get("organization_id") : "",
            organization_name: role === "client" && orgMode === "new" ? form.get("organization_name") : "",
            country: form.get("country"),
            party: form.get("party"),
            tax_id: form.get("tax_id"),
          });
          setNote({ text: "Persona creada. Pasale la contraseña provisoria.", ok: true });
          setRole("vendor");
          setOrgMode("existing");
          setCreating(false);
          setTick((value) => value + 1);
          event.currentTarget.reset();
        } catch (error) {
          setNote({ text: error instanceof Error ? error.message : "No se pudo crear.", ok: false });
        }
      }}>
        <h3>Nueva persona</h3>
        <div className="grid">
          <label>Nombre<input name="full_name" required /></label>
          <label>Correo<input name="email" type="email" required /></label>
          <label>Contraseña provisoria<input name="password" minLength={8} required /></label>
          <label>Rol
            <select name="role" value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="vendor">Vendedor</option>
              <option value="client">Cliente</option>
            </select>
          </label>
        </div>
        {role === "client" ? (
          <div className="grid">
            <label>Establecimiento
              <select name="org_mode" value={orgMode} onChange={(event) => setOrgMode(event.target.value)}>
                <option value="existing">Uno que ya existe</option>
                <option value="new">Crear uno nuevo</option>
              </select>
            </label>
            {orgMode === "existing" ? (
              <label>Cuál
                <select name="organization_id" required>
                  {orgs.map((org) => <option key={org.id} value={org.id}>{org.legal_name}</option>)}
                </select>
              </label>
            ) : (
              <>
                <label>Nombre del establecimiento<input name="organization_name" required /></label>
                <label>País
                  <select name="country" defaultValue="AR">
                    <option value="AR">Argentina</option>
                    <option value="PY">Paraguay</option>
                    <option value="UY">Uruguay</option>
                  </select>
                </label>
                <label>Tipo de sujeto
                  <select name="party" defaultValue="juridica">
                    <option value="juridica">Persona jurídica</option>
                    <option value="humana">Persona humana</option>
                    <option value="otro">Otro tipo de entidad</option>
                  </select>
                </label>
                <label>CUIT, RUC o RUT<input name="tax_id" required placeholder="Según el país" /></label>
              </>
            )}
          </div>
        ) : null}
        <Act name="plus" title="Crear" tone="primary" type="submit" />
      </form>
      ) : null}
      {note ? <p className={note.ok ? "ok" : "err"}>{note.text}</p> : null}
      <div className="desk-groups">
        {bands.map((band) => {
          const list = people.filter((person) => person.role === band.id);
          return (
            <section key={band.id} className="desk-group">
              <p className="ops-kicker">{band.title}</p>
              {list.length ? list.map((person) => {
                const org = person.organization_id ? orgNames.get(person.organization_id) : null;
                return (
                  <article key={person.id} className="desk-person">
                    <div className="desk-line">
                      <div>
                        <strong>{person.full_name || "Sin nombre"}</strong>
                        <p>{person.email || "Sin correo"}{org ? ` · ${org.legal_name}` : ""}</p>
                      </div>
                      {person.role === "superadmin" ? null : (
                        <div className="acts">
                          <Act name="edit" title="Editar" onClick={() => { setEditing(editing === person.id ? null : person.id); setKeying(null); }} />
                          <Act name="key" title="Clave" onClick={() => { setKeying(keying === person.id ? null : person.id); setEditing(null); }} />
                          <Act name="remove" title="Borrar" tone="danger" onClick={async () => {
                            if (!window.confirm(`¿Borrar a ${person.full_name || "esta persona"}?`)) return;
                            try {
                              await staff(db, { action: "delete", user_id: person.id });
                              setNote({ text: "Persona borrada.", ok: true });
                              setTick((value) => value + 1);
                            } catch (error) {
                              setNote({ text: error instanceof Error ? error.message : "No se pudo borrar.", ok: false });
                            }
                          }} />
                        </div>
                      )}
                    </div>
                    {editing === person.id ? (
                      <form className="grid" onSubmit={async (event) => {
                        event.preventDefault();
                        const form = new FormData(event.currentTarget);
                        try {
                          await staff(db, {
                            action: "update",
                            user_id: person.id,
                            full_name: form.get("full_name"),
                            email: form.get("email"),
                            role: form.get("role"),
                            organization_id: form.get("organization_id"),
                          });
                          setNote({ text: "Persona actualizada.", ok: true });
                          setEditing(null);
                          setTick((value) => value + 1);
                        } catch (error) {
                          setNote({ text: error instanceof Error ? error.message : "No se pudo guardar.", ok: false });
                        }
                      }}>
                        <label>Nombre<input name="full_name" defaultValue={person.full_name} required /></label>
                        <label>Correo<input name="email" type="email" defaultValue={person.email} required /></label>
                        <label>Rol
                          <select name="role" defaultValue={person.role === "client" ? "client" : "vendor"}>
                            <option value="vendor">Vendedor</option>
                            <option value="client">Cliente</option>
                          </select>
                        </label>
                        <label>Establecimiento
                          <select name="organization_id" defaultValue={person.organization_id || ""}>
                            <option value="">Sin establecimiento</option>
                            {orgs.map((item) => <option key={item.id} value={item.id}>{item.legal_name}</option>)}
                          </select>
                        </label>
                        <Act name="save" title="Guardar" tone="primary" type="submit" />
                      </form>
                    ) : null}
                    {person.role === "client" && person.organization_id ? (
                      <RecordFile db={db} kind="fiscal" ownerId={person.organization_id} label="Constancia de CUIT, RUC o RUT" canUpload />
                    ) : null}
                    {keying === person.id ? (
                      <form className="row" onSubmit={async (event) => {
                        event.preventDefault();
                        const password = new FormData(event.currentTarget).get("password");
                        try {
                          await staff(db, { action: "password", user_id: person.id, password });
                          setNote({ text: "Contraseña provisoria actualizada.", ok: true });
                          setKeying(null);
                          event.currentTarget.reset();
                        } catch (error) {
                          setNote({ text: error instanceof Error ? error.message : "No se pudo guardar.", ok: false });
                        }
                      }}>
                        <label>Nueva provisoria<input name="password" minLength={8} placeholder="Mínimo 8" required /></label>
                        <Act name="save" title="Guardar" tone="primary" type="submit" />
                      </form>
                    ) : null}
                  </article>
                );
              }) : <p className="desk-lead">Nadie en este grupo.</p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Estado({ db }: { db: SupabaseClient }) {
  const [situation, setSituation] = useState<Situation | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    loadSituation(db).then(setSituation).catch((reason) => {
      setError(reason instanceof Error ? reason.message : "No se pudo leer el estado.");
    });
  }, [db]);
  if (error) return <p className="err">{error}</p>;
  if (!situation) return <p className="muted">Leyendo facturas, ventas y liquidaciones…</p>;
  return <Dashboard situation={situation} />;
}

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  line: string;
  kind: string;
  suggested_price_usd: number | null;
  active: boolean;
  site_url: string | null;
};

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function Productos({ db, profile }: { db: SupabaseClient; profile: Profile }) {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [people, setPeople] = useState<{ id: string; full_name: string; role: string }[]>([]);
  const [links, setLinks] = useState<{ product_id: string; profile_id: string; share_percent: number }[]>([]);
  const [sellers, setSellers] = useState<{ product_id: string; profile_id: string }[]>([]);
  const [demos, setDemos] = useState<{ id: string; product_id: string; organization_id: string; expires_at: string }[]>([]);
  const [orgs, setOrgs] = useState<{ id: string; legal_name: string }[]>([]);
  const [note, setNote] = useState<{ text: string; ok: boolean } | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    Promise.all([
      db.from("products").select("id, slug, name, line, kind, suggested_price_usd, active, site_url").order("name"),
      db.from("profiles").select("id, full_name, role").in("role", ["vendor", "superadmin"]),
      db.from("product_collaborators").select("product_id, profile_id, share_percent"),
      db.from("demos").select("id, product_id, organization_id, expires_at").order("expires_at"),
      db.from("organizations").select("id, legal_name").order("legal_name"),
      db.from("product_sellers").select("product_id, profile_id"),
    ]).then(([a, b, c, d, e, f]) => {
      setProducts(a.data || []);
      setPeople(b.data || []);
      setLinks(c.data || []);
      setDemos(d.data || []);
      setOrgs(e.data || []);
      setSellers(f.data || []);
      const failed = [a.error, b.error, c.error, d.error, e.error, f.error].find(Boolean);
      if (failed) setNote({ text: failed.message, ok: false });
    });
  }, [db, tick]);
  const names = new Map(people.map((person) => [person.id, person.full_name]));
  const orgNames = new Map(orgs.map((org) => [org.id, org.legal_name]));
  const lineLabel: Record<string, string> = { agricultura: "Agricultura", ganaderia: "Ganadería", mixto: "Mixto" };
  return (
    <div className="desk">
      <header className="desk-head">
        <div>
          <p className="ops-kicker">Catálogo</p>
          <h2>Productos</h2>
          <p className="desk-lead">En la ficha se asigna quién lo vende, o quiénes lo desarrollaron y con qué porcentaje.</p>
        </div>
        <Act name={creating ? "close" : "plus"} title={creating ? "Cerrar" : "Nuevo"} tone="primary" onClick={() => setCreating((value) => !value)} />
      </header>
      {creating ? (
      <form className="desk-card" onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = String(form.get("name") || "").trim();
        const slug = slugify(String(form.get("slug") || name));
        const price = String(form.get("price") || "");
        const { error } = await db.from("products").insert({
          name,
          slug,
          line: form.get("line"),
          kind: form.get("kind"),
          suggested_price_usd: price === "" ? null : Number(price),
          site_url: String(form.get("site_url") || "") || null,
          active: true,
        });
        if (error) setNote({ text: error.message, ok: false });
        else {
          setNote({ text: "Producto creado.", ok: true });
          setCreating(false);
          event.currentTarget.reset();
          setTick((value) => value + 1);
        }
      }}>
        <h3>Nuevo producto</h3>
        <div className="grid">
          <label>Nombre<input name="name" required /></label>
          <label>Identificador<input name="slug" placeholder="se arma con el nombre" /></label>
          <label>Línea
            <select name="line" defaultValue="mixto">
              <option value="agricultura">Agricultura</option>
              <option value="ganaderia">Ganadería</option>
              <option value="mixto">Mixto</option>
            </select>
          </label>
          <label>Tipo
            <select name="kind" defaultValue="catalog">
              <option value="catalog">Catálogo</option>
              <option value="codeveloped">Co-desarrollo</option>
            </select>
          </label>
          <label>Precio sugerido USD<input name="price" type="number" min={0} step="0.01" /></label>
          <label>Enlace<input name="site_url" type="url" placeholder="https://" /></label>
        </div>
        <Act name="plus" title="Crear" tone="primary" type="submit" />
      </form>
      ) : null}
      {note ? <p className={note.ok ? "ok" : "err"}>{note.text}</p> : null}
      <div className="desk-list">
        {products.map((product) => {
          const mine = links.filter((link) => link.product_id === product.id);
          const mineSellers = sellers.filter((seller) => seller.product_id === product.id);
          const shareSum = Math.round(mine.reduce((total, link) => total + Number(link.share_percent), 0) * 100) / 100;
          const productDemos = demos.filter((demo) => demo.product_id === product.id);
          const expanded = open === product.id;
          return (
            <article key={product.id} className="desk-card">
              <div className="desk-line">
                <button type="button" className="desk-item" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : product.id)}>
                  <strong>{product.name}</strong>
                  <span className="chip-row">
                    <span className="chip">{lineLabel[product.line] || product.line}</span>
                    <span className="chip">{product.kind === "codeveloped" ? "Co-desarrollo" : "Catálogo"}</span>
                    <span className="chip">{product.active ? "Activo" : "Pausado"}</span>
                    <span className="chip">{product.suggested_price_usd == null ? "Sin precio" : money(product.suggested_price_usd)}</span>
                  </span>
                  <span className="desk-lead">{product.kind === "codeveloped" ? `${mine.length} ${mine.length === 1 ? "persona" : "personas"} · ${shareSum}%` : `${mineSellers.length} ${mineSellers.length === 1 ? "vendedor" : "vendedores"}`} · {productDemos.length} {productDemos.length === 1 ? "demo" : "demos"}</span>
                </button>
                <div className="acts">
                  <Act name="edit" title="Editar" onClick={() => setOpen(expanded ? null : product.id)} />
                  <Act name="remove" title="Borrar" tone="danger" onClick={async () => {
                    if (!window.confirm(`¿Borrar ${product.name}?`)) return;
                    const sales = await db.from("deals").select("id").eq("product_id", product.id).limit(1);
                    if (sales.error) return setNote({ text: sales.error.message, ok: false });
                    if (sales.data?.length) return setNote({ text: "Este producto tiene ventas. No se borra.", ok: false });
                    const costs = await db.from("infrastructure_costs").select("id").eq("product_id", product.id).limit(1);
                    if (costs.error) return setNote({ text: costs.error.message, ok: false });
                    if (costs.data?.length) return setNote({ text: "Este producto tiene costos de infraestructura. No se borra.", ok: false });
                    const removed = await db.from("demos").delete().eq("product_id", product.id);
                    if (removed.error) return setNote({ text: removed.error.message, ok: false });
                    const { error } = await db.from("products").delete().eq("id", product.id);
                    setNote(error ? { text: error.message, ok: false } : { text: "Producto borrado.", ok: true });
                    if (!error) {
                      setOpen(null);
                      setTick((value) => value + 1);
                    }
                  }} />
                </div>
              </div>
              {expanded ? (
                <>
                  <h3>Ficha</h3>
                  <form className="grid" onSubmit={async (event) => {
                    event.preventDefault();
                    const form = new FormData(event.currentTarget);
                    const price = String(form.get("price") || "");
                    const { error } = await db.from("products").update({
                      name: String(form.get("name") || "").trim(),
                      slug: slugify(String(form.get("slug") || "")),
                      line: form.get("line"),
                      kind: form.get("kind"),
                      suggested_price_usd: price === "" ? null : Number(price),
                      site_url: String(form.get("site_url") || "") || null,
                      active: form.get("active") === "on",
                    }).eq("id", product.id);
                    setNote(error ? { text: error.message, ok: false } : { text: "Ficha guardada.", ok: true });
                    if (!error) setTick((value) => value + 1);
                  }}>
                    <label>Nombre<input name="name" defaultValue={product.name} required /></label>
                    <label>Identificador<input name="slug" defaultValue={product.slug} required /></label>
                    <label>Línea
                      <select name="line" defaultValue={product.line}>
                        <option value="agricultura">Agricultura</option>
                        <option value="ganaderia">Ganadería</option>
                        <option value="mixto">Mixto</option>
                      </select>
                    </label>
                    <label>Tipo
                      <select name="kind" defaultValue={product.kind}>
                        <option value="catalog">Catálogo</option>
                        <option value="codeveloped">Co-desarrollo</option>
                      </select>
                    </label>
                    <label>Precio sugerido USD<input name="price" type="number" min={0} step="0.01" defaultValue={product.suggested_price_usd ?? ""} /></label>
                    <label>Enlace<input name="site_url" type="url" defaultValue={product.site_url ?? ""} placeholder="https://" /></label>
                    <label className="row">Activo<input name="active" type="checkbox" defaultChecked={product.active} /></label>
                    <Act name="save" title="Guardar" tone="primary" type="submit" />
                  </form>
                  {product.kind === "catalog" ? null : <p className="desk-lead">Lo vende alguien del reparto de abajo.</p>}
                    <>
                      <h3>Quiénes lo desarrollaron</h3>
                      <p>El precio cobrado se reparte con estos porcentajes cuando el tipo de la ficha es Co-desarrollo. Tienen que sumar 100 e incluir a la casa. Si lo hiciste solo, quedás vos al 100.</p>
                      <p className={shareSum === 100 ? "ok" : "err"}>Suma {shareSum}%</p>
                      <div className="share-row">
                        <span>Solo yo, al 100%</span>
                      <Act name="join" title="Dejar el proyecto solo a mi nombre" onClick={async () => {
                        const keep = await db.from("product_collaborators").upsert({
                          product_id: product.id,
                          profile_id: profile.id,
                          share_percent: 100,
                        });
                        if (keep.error) return setNote({ text: keep.error.message, ok: false });
                        const others = mine.filter((link) => link.profile_id !== profile.id).map((link) => link.profile_id);
                        if (others.length) {
                          const removed = await db.from("product_collaborators").delete().eq("product_id", product.id).in("profile_id", others);
                          if (removed.error) return setNote({ text: removed.error.message, ok: false });
                        }
                        const updated = await db.from("products").update({ kind: "codeveloped" }).eq("id", product.id);
                        setNote(updated.error ? { text: updated.error.message, ok: false } : { text: "Quedó a tu nombre, al 100%.", ok: true });
                        if (!updated.error) setTick((value) => value + 1);
                      }} />
                      </div>
                      {mine.map((link) => (
                        <form key={link.profile_id} className="share-row" onSubmit={async (event) => {
                          event.preventDefault();
                          const share = Number(new FormData(event.currentTarget).get("share"));
                          const { error } = await db.from("product_collaborators").update({ share_percent: share }).eq("product_id", product.id).eq("profile_id", link.profile_id);
                          setNote(error ? { text: error.message, ok: false } : { text: "Porcentaje guardado.", ok: true });
                          if (!error) setTick((value) => value + 1);
                        }}>
                          <strong>{names.get(link.profile_id) || "—"}</strong>
                          <label>%<input name="share" type="number" min={0.01} max={100} step="0.01" defaultValue={link.share_percent} required /></label>
                          <Act name="save" title="Guardar porcentaje" tone="primary" type="submit" />
                          <Act name="unlink" title="Quitar" tone="danger" onClick={async () => {
                            const { error } = await db.from("product_collaborators").delete().eq("product_id", product.id).eq("profile_id", link.profile_id);
                            if (error) setNote({ text: error.message, ok: false });
                            else setTick((value) => value + 1);
                          }} />
                        </form>
                      ))}
                      <form className="share-row" onSubmit={async (event) => {
                        event.preventDefault();
                        const form = new FormData(event.currentTarget);
                        const profileId = String(form.get("profile_id") || "");
                        if (!profileId) return;
                        const { error } = await db.from("product_collaborators").insert({
                          product_id: product.id,
                          profile_id: profileId,
                          share_percent: Number(form.get("share")),
                        });
                        setNote(error ? { text: error.message, ok: false } : { text: "Persona agregada al reparto.", ok: true });
                        if (!error) {
                          event.currentTarget.reset();
                          setTick((value) => value + 1);
                        }
                      }}>
                        <select name="profile_id" defaultValue="">
                          <option value="">Agregar persona</option>
                          {people.filter((person) => !mine.some((link) => link.profile_id === person.id)).map((person) => (
                            <option key={person.id} value={person.id}>{person.full_name}</option>
                          ))}
                        </select>
                        <label>%<input name="share" type="number" min={0.01} max={100} step="0.01" required /></label>
                        <Act name="plus" title="Agregar al reparto" type="submit" />
                      </form>
                    </>
                  {product.kind === "catalog" ? (
                    <>
                      <h3>Quién lo vende</h3>
                      <p>Solo estas personas pueden cargar una venta de este producto. La comisión no es un porcentaje del equipo: si vende por encima del precio sugerido, se lleva la diferencia; si vende a ese precio o menos, el 10%.</p>
                      {mineSellers.length ? mineSellers.map((seller) => (
                        <div key={seller.profile_id} className="share-row">
                          <strong>{names.get(seller.profile_id) || "—"}</strong>
                          <Act name="unlink" title="Quitar vendedor" tone="danger" onClick={async () => {
                            const { error } = await db.from("product_sellers").delete().eq("product_id", product.id).eq("profile_id", seller.profile_id);
                            if (error) setNote({ text: error.message, ok: false });
                            else setTick((value) => value + 1);
                          }} />
                        </div>
                      )) : <p>Nadie asignado. Hasta que elijas un vendedor, no se puede cargar una venta.</p>}
                      <form className="share-row" onSubmit={async (event) => {
                        event.preventDefault();
                        const profileId = String(new FormData(event.currentTarget).get("profile_id") || "");
                        if (!profileId) return;
                        const { error } = await db.from("product_sellers").insert({ product_id: product.id, profile_id: profileId });
                        setNote(error ? { text: error.message, ok: false } : { text: "Vendedor asignado.", ok: true });
                        if (!error) setTick((value) => value + 1);
                      }}>
                        <select name="profile_id" defaultValue="">
                          <option value="">Asignar vendedor</option>
                          {people.filter((person) => !mineSellers.some((seller) => seller.profile_id === person.id)).map((person) => (
                            <option key={person.id} value={person.id}>{person.full_name}</option>
                          ))}
                        </select>
                        <Act name="plus" title="Asignar vendedor" type="submit" />
                      </form>
                    </>
                  ) : null}
                  <h3>Demos</h3>
                  <form className="row" onSubmit={async (event) => {
                    event.preventDefault();
                    const form = new FormData(event.currentTarget);
                    const { error } = await db.from("demos").insert({
                      organization_id: form.get("organization_id"),
                      product_id: product.id,
                      expires_at: new Date(`${form.get("expires")}T23:59:00`).toISOString(),
                      granted_by: profile.id,
                    });
                    if (error) setNote({ text: error.message, ok: false });
                    else setTick((value) => value + 1);
                  }}>
                    <select name="organization_id">{orgs.map((org) => <option key={org.id} value={org.id}>{org.legal_name}</option>)}</select>
                    <label>Vence<input name="expires" type="date" required /></label>
                    <Act name="plus" title="Habilitar demo" type="submit" />
                  </form>
                  <ul>
                    {productDemos.length ? productDemos.map((demo) => (
                      <li key={demo.id} className="desk-line">
                        <span>{orgNames.get(demo.organization_id) || "Establecimiento"} · hasta {new Date(demo.expires_at).toLocaleDateString("es-AR")}</span>
                        <Act name="remove" title="Borrar demo" tone="danger" onClick={async () => {
                          const { error } = await db.from("demos").delete().eq("id", demo.id);
                          setNote(error ? { text: error.message, ok: false } : { text: "Demo borrada.", ok: true });
                          if (!error) setTick((value) => value + 1);
                        }} />
                      </li>
                    )) : <li>Sin demos.</li>}
                  </ul>
                </>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Ventas({ db, profile }: { db: SupabaseClient; profile: Profile }) {
  const admin = profile.role === "superadmin";
  const [rows, setRows] = useState<{ products: { id: string; name: string; kind: string; suggested_price_usd: number | null }[]; orgs: { id: string; legal_name: string }[]; people: { id: string; full_name: string; role: string }[]; deals: { id: string; product_id: string; organization_id: string; seller_id: string; status: string; suggested_price_usd: number | null; sold_price_usd: number | null }[]; sellers: { product_id: string; profile_id: string }[]; collabs: { product_id: string; profile_id: string }[] } | null>(null);
  const [msg, setMsg] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [saleProduct, setSaleProduct] = useState("");
  const [tick, setTick] = useState(0);
  useEffect(() => {
    Promise.all([
      db.from("products").select("id, name, kind, suggested_price_usd"),
      db.from("organizations").select("id, legal_name"),
      db.from("profiles").select("id, full_name, role"),
      db.from("deals").select("id, product_id, organization_id, seller_id, status, suggested_price_usd, sold_price_usd").order("created_at", { ascending: false }),
      db.from("product_sellers").select("product_id, profile_id"),
      db.from("product_collaborators").select("product_id, profile_id"),
    ]).then(([products, orgs, people, deals, sellers, collabs]) => {
      setRows({
        products: products.data || [],
        orgs: orgs.data || [],
        people: people.data || [],
        deals: deals.data || [],
        sellers: sellers.data || [],
        collabs: collabs.data || [],
      });
    }).catch(() => {
      setRows({ products: [], orgs: [], people: [], deals: [], sellers: [], collabs: [] });
    });
  }, [db, tick]);
  if (!rows) return <p className="muted">Cargando…</p>;
  const product = new Map(rows.products.map((item) => [item.id, item]));
  const org = new Map(rows.orgs.map((item) => [item.id, item.legal_name]));
  const person = new Map(rows.people.map((item) => [item.id, item.full_name]));
  const chosenId = saleProduct || rows.products[0]?.id || "";
  const chosen = product.get(chosenId);
  const allowedIds = new Set((chosen?.kind === "codeveloped" ? rows.collabs : rows.sellers).filter((item) => item.product_id === chosenId).map((item) => item.profile_id));
  const sellerOptions = rows.people.filter((item) => allowedIds.has(item.id));
  const listed = admin ? rows.deals : rows.deals.filter((deal) => deal.seller_id === profile.id);
  return (
    <div className="desk">
      <header className="desk-head">
        <div>
          <p className="ops-kicker">Operación</p>
          <h2>{admin ? "Ventas" : "Mis ventas"}</h2>
        </div>
        {admin ? <Act name={creating ? "close" : "plus"} title={creating ? "Cerrar" : "Nueva"} tone="primary" onClick={() => setCreating((value) => !value)} /> : null}
      </header>
      {admin && creating ? (
        <form className="desk-card grid" onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const chosen = product.get(String(form.get("product_id")));
          const { error } = await db.from("deals").insert({
            product_id: form.get("product_id"),
            organization_id: form.get("organization_id"),
            seller_id: form.get("seller_id"),
            status: "assigned",
            suggested_price_usd: chosen?.suggested_price_usd,
          });
          if (error) setMsg(error.message);
          else {
            setCreating(false);
            setTick((value) => value + 1);
          }
        }}>
          <label>Producto<select name="product_id" value={chosenId} onChange={(event) => setSaleProduct(event.target.value)}>{rows.products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <label>Establecimiento<select name="organization_id">{rows.orgs.map((item) => <option key={item.id} value={item.id}>{item.legal_name}</option>)}</select></label>
          <label>Vendedor
            <select name="seller_id" required>
              {sellerOptions.length ? sellerOptions.map((item) => <option key={item.id} value={item.id}>{item.full_name}</option>) : <option value="">Nadie asignado en Productos</option>}
            </select>
          </label>
          <Act name="plus" title="Crear" tone="primary" type="submit" />
        </form>
      ) : null}
      {msg ? <p className="err">{msg}</p> : null}
      <table>
        <thead><tr><th>Producto</th><th>Establecimiento</th><th>Vendedor</th><th>Estado</th><th>Sugerido</th><th>Vendido</th>{admin ? <th /> : null}</tr></thead>
        <tbody>
          {listed.length ? null : <tr><td colSpan={admin ? 7 : 6}>No tenés ventas a tu nombre.</td></tr>}
          {listed.map((deal) => (
            <tr key={deal.id}>
              <td>{product.get(deal.product_id)?.name}</td>
              <td>{org.get(deal.organization_id)}</td>
              <td>{person.get(deal.seller_id)}</td>
              <td>{label(deal.status)}</td>
              <td>{money(deal.suggested_price_usd)}</td>
              <td>{money(deal.sold_price_usd)}</td>
              {admin ? (
                <td>
                  <div className="acts">
                    <Act name="edit" title="Editar" onClick={() => setEditing(editing === deal.id ? null : deal.id)} />
                    {deal.seller_id !== profile.id ? (
                      <Act name="take" title="Retomar" onClick={async () => {
                        if (deal.status === "paid") return setMsg("Esta venta ya está cobrada. No se retoma.");
                        const { error } = await db.rpc("take_over_deal", { p_deal: deal.id });
                        if (error) setMsg(error.message);
                        else setTick((value) => value + 1);
                      }} />
                    ) : null}
                    <Act name="remove" title="Borrar" tone="danger" onClick={async () => {
                      if (deal.status !== "assigned") return setMsg("Esta venta ya avanzó. Se borra solo si sigue asignada.");
                      if (!window.confirm("¿Borrar esta venta?")) return;
                      const { error } = await db.from("deals").delete().eq("id", deal.id);
                      if (error) setMsg(error.message);
                      else setTick((value) => value + 1);
                    }} />
                  </div>
                  {editing === deal.id ? (
                    <form className="row" onSubmit={async (event) => {
                      event.preventDefault();
                      if (deal.status === "invoiced" || deal.status === "paid") {
                        return setMsg("Esta venta ya está facturada. El importe no se cambia.");
                      }
                      const sold = Number(new FormData(event.currentTarget).get("sold"));
                      if (deal.status === "assigned" && deal.suggested_price_usd && sold < Number(deal.suggested_price_usd)) {
                        const approved = await db.rpc("approve_discount", { p_deal: deal.id });
                        if (approved.error) return setMsg(approved.error.message);
                      }
                      const { error } = await db.from("deals").update({
                        sold_price_usd: sold,
                        status: deal.status === "assigned" ? "accepted" : deal.status,
                      }).eq("id", deal.id);
                      if (error) setMsg(error.message);
                      else {
                        setEditing(null);
                        setMsg("");
                        setTick((value) => value + 1);
                      }
                    }}>
                      <input name="sold" type="number" min={0} step="0.01" placeholder="Precio vendido" defaultValue={deal.sold_price_usd ?? ""} required />
                      <Act name="save" title="Guardar" tone="primary" type="submit" />
                    </form>
                  ) : null}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cobros({ db }: { db: SupabaseClient }) {
  const [deals, setDeals] = useState<{ id: string; product_id: string; status: string; sold_price_usd: number; organization_id: string }[]>([]);
  const [names, setNames] = useState<Map<string, string>>(new Map());
  const [orgs, setOrgs] = useState<Map<string, { country: string; party: string; tax_id: string | null; legal_name: string }>>(new Map());
  const [invoices, setInvoices] = useState<Map<string, { id: string; number: number; amount_ars: number; kind: string }>>(new Map());
  const [payments, setPayments] = useState<Map<string, string>>(new Map());
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [sheet, setSheet] = useState<"invoice" | "collect">("invoice");
  const [tick, setTick] = useState(0);
  useEffect(() => {
    Promise.all([
      db.from("deals").select("id, product_id, status, sold_price_usd, organization_id").in("status", ["accepted", "invoiced", "paid"]),
      db.from("products").select("id, name"),
      db.from("organizations").select("id, legal_name, country, party, tax_id"),
      db.from("invoices").select("id, deal_id, number, amount_ars, kind"),
      db.from("payments").select("id, invoice_id"),
    ]).then(([dealRows, productRows, orgRows, invoiceRows, paymentRows]) => {
      setDeals(dealRows.data || []);
      setNames(new Map((productRows.data || []).map((item) => [item.id, item.name])));
      setOrgs(new Map((orgRows.data || []).map((item) => [item.id, item])));
      setInvoices(new Map((invoiceRows.data || []).map((item) => [item.deal_id, item])));
      setPayments(new Map((paymentRows.data || []).map((item) => [item.invoice_id, item.id])));
    });
  }, [db, tick]);
  return (
    <>
      <h2>Cobros</h2>
      <p className="muted">La factura y el pago los registrás vos. El vendedor no ve el medio ni si el cliente se atrasó. Argentina se factura con C. Paraguay y Uruguay, con factura E de exportación de servicios.</p>
      {msg ? <p className="err">{msg}</p> : null}
      <table>
        <thead><tr><th>Producto</th><th>Estado</th><th>Precio</th><th>Acción</th><th>Archivos</th></tr></thead>
        <tbody>
          {deals.map((deal) => {
            const invoice = invoices.get(deal.id);
            const client = orgs.get(deal.organization_id);
            const country: Market = isMarket(client?.country || "") ? client!.country as Market : "AR";
            const party: Party = isParty(client?.party || "") ? client!.party as Party : "juridica";
            const rule = billingFor(country, party);
            return (
              <tr key={deal.id}>
                <td>{names.get(deal.product_id)}<br /><span className="muted">{client?.legal_name} · {MARKET_LABEL[country]} · {rule.document}</span></td>
                <td>{label(deal.status)}</td>
                <td>{money(deal.sold_price_usd)}</td>
                <td>
                  <div className="acts">
                    <Act name="edit" title="Editar" onClick={() => {
                      if (deal.status === "paid") return setMsg("Este cobro ya está cerrado.");
                      setSheet(deal.status === "invoiced" ? "collect" : "invoice");
                      setOpen(open === deal.id ? null : deal.id);
                    }} />
                    <Act name="invoice" title="Facturar" tone="primary" onClick={() => {
                      if (deal.status !== "accepted") return setMsg(invoice ? "Ya está facturada." : "Primero hay que aceptar la venta.");
                      setSheet("invoice");
                      setOpen(open === deal.id && sheet === "invoice" ? null : deal.id);
                    }} />
                    <Act name="collect" title="Cobrar" tone="primary" onClick={() => {
                      if (deal.status === "paid") return setMsg("Ya está cobrada.");
                      if (deal.status !== "invoiced" || !invoice) return setMsg("Primero se emite la factura.");
                      setSheet("collect");
                      setOpen(open === deal.id && sheet === "collect" ? null : deal.id);
                    }} />
                    <Act name="remove" title="Borrar" tone="danger" onClick={async () => {
                      if (invoice || deal.status === "paid" || deal.status === "invoiced") return setMsg("Este cobro ya tiene factura. No se borra.");
                      if (!window.confirm("¿Borrar este cobro?")) return;
                      const { error } = await db.from("deals").delete().eq("id", deal.id);
                      if (error) setMsg(error.message);
                      else setTick((value) => value + 1);
                    }} />
                  </div>
                  {open === deal.id && sheet === "invoice" && deal.status === "accepted" ? (
                    client?.tax_id ? (
                      <form className="row" onSubmit={async (event) => {
                        event.preventDefault();
                        const form = new FormData(event.currentTarget);
                        const usd = Number(deal.sold_price_usd);
                        const fx = Number(form.get("fx"));
                        if (!fx || fx <= 0) return setMsg("Falta el tipo de cambio.");
                        const { error } = await db.from("invoices").insert({
                          deal_id: deal.id,
                          organization_id: deal.organization_id,
                          kind: rule.kind,
                          number: Number(form.get("number")),
                          amount_usd: usd,
                          amount_ars: pesosFrom(usd, fx),
                          fx_rate: fx,
                        });
                        if (error) return setMsg(error.message);
                        const updated = await db.from("deals").update({ status: "invoiced" }).eq("id", deal.id);
                        if (updated.error) return setMsg(updated.error.message);
                        setTick((value) => value + 1);
                      }}>
                        <input name="number" type="number" placeholder="Nº" required />
                        <input name="fx" type="number" step="0.0001" placeholder={rule.kind === "E" ? "BNA comprador, día hábil anterior" : "Pesos por dólar"} required />
                        <Act name="save" title={`Emitir ${rule.document}`} tone="primary" type="submit" />
                        <span className="muted">{rule.notice}</span>
                      </form>
                    ) : (
                      <span className="err">Falta el {rule.taxIdLabel} de {PARTY_LABEL[party]}.</span>
                    )
                  ) : null}
                  {open === deal.id && sheet === "collect" && deal.status === "invoiced" && invoice ? (
                    <form className="row" onSubmit={async (event) => {
                      event.preventDefault();
                      const form = new FormData(event.currentTarget);
                      const { error } = await db.from("payments").insert({
                        invoice_id: invoice.id,
                        amount_ars: Number(form.get("amount")),
                        method: form.get("method"),
                        behavior: form.get("behavior"),
                      });
                      if (error) return setMsg(error.message);
                      const updated = await db.from("deals").update({ status: "paid" }).eq("id", deal.id);
                      if (updated.error) return setMsg(updated.error.message);
                      const settled = await db.rpc("settle_deal", { p_deal: deal.id });
                      if (settled.error) return setMsg(settled.error.message);
                      setTick((value) => value + 1);
                    }}>
                      <input name="amount" type="number" step="0.01" defaultValue={invoice.amount_ars} required />
                      <input name="method" placeholder="Medio" required />
                      <input name="behavior" placeholder="Comportamiento de pago" />
                      <Act name="save" title="Registrar cobro" tone="primary" type="submit" />
                    </form>
                  ) : null}
                </td>
                <td>
                  {invoice ? <RecordFile db={db} kind="invoice" ownerId={invoice.id} label="Comprobante emitido" canUpload /> : <span className="muted">Sin factura</span>}
                  {invoice && payments.get(invoice.id) ? <RecordFile db={db} kind="payment" ownerId={payments.get(invoice.id) || ""} label="Comprobante del cobro" canUpload /> : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function Liquidaciones({ db, profile }: { db: SupabaseClient; profile: Profile }) {
  const [rows, setRows] = useState<{ id: string; kind: string; amount_usd: number; status: string; payee: { full_name: string } | { full_name: string }[] | null; deals: { products: { name: string } | { name: string }[] | null; organizations: { legal_name: string } | { legal_name: string }[] | null } | { products: { name: string } | { name: string }[] | null; organizations: { legal_name: string } | { legal_name: string }[] | null }[] | null }[]>([]);
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    db.from("payouts").select("id, kind, amount_usd, status, payee:profiles!payouts_payee_id_fkey(full_name), deals(products(name), organizations(legal_name))").then(({ data, error }) => {
      if (error) setMsg(error.message);
      setRows(data || []);
    });
  }, [db, tick]);
  const admin = profile.role === "superadmin";
  function nameOf(value: { full_name?: string; name?: string; legal_name?: string } | { full_name?: string; name?: string; legal_name?: string }[] | null, key: "full_name" | "name" | "legal_name") {
    const row = Array.isArray(value) ? value[0] : value;
    return row?.[key] || "—";
  }
  return (
    <>
      <h2>{admin ? "Liquidaciones" : "Mis cobros"}</h2>
      <p className="muted">{admin ? "Se crean cuando el cliente cubrió la factura. El cliente no le paga al vendedor." : "Lo que Agronys te liquida. Acá no aparece cómo pagó el cliente."}</p>
      {msg ? <p className="err">{msg}</p> : null}
      <table>
        <thead><tr><th>Producto</th><th>Establecimiento</th>{admin ? <th>Persona</th> : null}<th>Tipo</th><th>Importe</th><th>Estado</th><th>Archivo</th></tr></thead>
        <tbody>
          {rows.length ? rows.map((row) => {
            const deal = Array.isArray(row.deals) ? row.deals[0] : row.deals;
            return (
              <tr key={row.id}>
                <td>{nameOf(deal?.products || null, "name")}</td>
                <td>{nameOf(deal?.organizations || null, "legal_name")}</td>
                {admin ? <td>{nameOf(row.payee, "full_name")}</td> : null}
                <td>{label(row.kind)}</td>
                <td>{money(row.amount_usd)}</td>
                <td>
                  {label(row.status)}
                  {admin ? (
                    <div className="acts">
                      <Act name="edit" title="Editar" onClick={() => setEditing(editing === row.id ? null : row.id)} />
                      {row.status !== "void" ? (
                        <Act name="void" title="Anular" tone="danger" onClick={async () => {
                          if (!window.confirm("¿Anular esta liquidación?")) return;
                          const { error } = await db.from("payouts").update({ status: "void" }).eq("id", row.id);
                          if (error) setMsg(error.message);
                          else setTick((value) => value + 1);
                        }} />
                      ) : null}
                    </div>
                  ) : null}
                  {admin && editing === row.id ? (
                    <select value={row.status} onChange={async (event) => {
                      const { error } = await db.from("payouts").update({ status: event.target.value }).eq("id", row.id);
                      if (error) setMsg(error.message);
                      else {
                        setEditing(null);
                        setTick((value) => value + 1);
                      }
                    }}>
                      <option value="payable">A liquidar</option>
                      <option value="invoiced_by_payee">Con factura del colaborador</option>
                      <option value="paid">Pagada</option>
                      <option value="void">Anulada</option>
                    </select>
                  ) : null}
                </td>
                <td>
                  <RecordFile db={db} kind="payout" ownerId={row.id} label="Factura del colaborador" canUpload />
                </td>
              </tr>
            );
          }) : <tr><td colSpan={admin ? 7 : 6}>No hay liquidaciones. Aparecen después de registrar el cobro de una factura.</td></tr>}
        </tbody>
      </table>
    </>
  );
}

function Infra({ db }: { db: SupabaseClient }) {
  const [rows, setRows] = useState<{ id: string; period: string; amount_usd: number; note: string | null; product_id: string | null; products: { name: string } | { name: string }[] | null }[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [msg, setMsg] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    Promise.all([
      db.from("infrastructure_costs").select("id, period, amount_usd, note, product_id, products(name)").order("period", { ascending: false }),
      db.from("products").select("id, name").order("name"),
    ]).then(([costs, catalog]) => {
      if (costs.error) setMsg(costs.error.message);
      setRows(costs.data || []);
      setProducts(catalog.data || []);
    });
  }, [db, tick]);
  return (
    <div className="desk">
      <header className="desk-head">
        <div>
          <p className="ops-kicker">Casa</p>
          <h2>Infraestructura</h2>
          <p className="desk-lead">Cada costo queda asociado a un producto. No entra en el precio ni en el reparto.</p>
        </div>
        <Act name={creating ? "close" : "plus"} title={creating ? "Cerrar" : "Nuevo"} tone="primary" onClick={() => setCreating((value) => !value)} />
      </header>
      {creating ? (
      <form className="desk-card grid" onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const { error } = await db.from("infrastructure_costs").insert({
          product_id: form.get("product_id"),
          period: form.get("period"),
          amount_usd: Number(form.get("amount")),
          note: String(form.get("note") || "") || null,
        });
        if (error) setMsg(error.message);
        else {
          setMsg("Costo cargado.");
          setCreating(false);
          event.currentTarget.reset();
          setTick((value) => value + 1);
        }
      }}>
        <label>Producto
          <select name="product_id" required>
            <option value="">Elegir</option>
            {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
          </select>
        </label>
        <label>Mes<input name="period" type="date" required /></label>
        <label>USD<input name="amount" type="number" min={0} step="0.01" required /></label>
        <label>Nota<input name="note" /></label>
        <Act name="plus" title="Crear" tone="primary" type="submit" />
      </form>
      ) : null}
      {msg ? <p className={msg.startsWith("Costo") ? "ok" : "err"}>{msg}</p> : null}
      <table>
        <thead><tr><th>Producto</th><th>Mes</th><th>Importe</th><th>Nota</th><th>Factura</th><th /></tr></thead>
        <tbody>{rows.map((row) => {
          const product = Array.isArray(row.products) ? row.products[0] : row.products;
          return (
            <tr key={row.id}>
              <td>{product?.name || "Sin producto"}</td>
              <td>{row.period}</td>
              <td>{money(row.amount_usd)}</td>
              <td>{row.note}</td>
              <td><RecordFile db={db} kind="infra" ownerId={row.id} label="Factura del proveedor" canUpload /></td>
              <td>
                <div className="acts">
                  <Act name="edit" title="Editar" onClick={() => setEditing(editing === row.id ? null : row.id)} />
                  <Act name="remove" title="Borrar" tone="danger" onClick={async () => {
                    if (!window.confirm("¿Borrar este costo?")) return;
                    const { error } = await db.from("infrastructure_costs").delete().eq("id", row.id);
                    if (error) setMsg(error.message);
                    else setTick((value) => value + 1);
                  }} />
                </div>
                {editing === row.id ? (
                  <form className="grid" onSubmit={async (event) => {
                    event.preventDefault();
                    const form = new FormData(event.currentTarget);
                    const { error } = await db.from("infrastructure_costs").update({
                      product_id: form.get("product_id"),
                      period: form.get("period"),
                      amount_usd: Number(form.get("amount")),
                      note: String(form.get("note") || "") || null,
                    }).eq("id", row.id);
                    if (error) setMsg(error.message);
                    else {
                      setEditing(null);
                      setTick((value) => value + 1);
                    }
                  }}>
                    <label>Producto
                      <select name="product_id" defaultValue={row.product_id || ""} required>
                        {products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                      </select>
                    </label>
                    <label>Mes<input name="period" type="date" defaultValue={String(row.period).slice(0, 10)} required /></label>
                    <label>USD<input name="amount" type="number" min={0} step="0.01" defaultValue={row.amount_usd} required /></label>
                    <label>Nota<input name="note" defaultValue={row.note || ""} /></label>
                    <Act name="save" title="Guardar" tone="primary" type="submit" />
                  </form>
                ) : null}
              </td>
            </tr>
          );
        })}</tbody>
      </table>
    </div>
  );
}

function Demos({ db, profile }: { db: SupabaseClient; profile: Profile }) {
  const admin = profile.role === "superadmin";
  const [rows, setRows] = useState<{ id: string; expires_at: string; product_id: string; organization_id: string }[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [orgs, setOrgs] = useState<{ id: string; legal_name: string }[]>([]);
  const [msg, setMsg] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    db.from("demos").select("id, expires_at, product_id, organization_id").then(({ data }) => setRows(data || []));
    if (profile.role !== "client") db.from("products").select("id, name").then(({ data }) => setProducts(data || []));
    if (admin) db.from("organizations").select("id, legal_name").then(({ data }) => setOrgs(data || []));
  }, [db, profile.role, admin, tick]);
  const names = new Map(products.map((item) => [item.id, item.name]));
  const orgNames = new Map(orgs.map((item) => [item.id, item.legal_name]));
  return (
    <div className="desk">
      <header className="desk-head">
        <div>
          <p className="ops-kicker">Casa</p>
          <h2>Demos</h2>
          {admin ? null : <p className="desk-lead">Demos habilitadas para tu cuenta.</p>}
        </div>
        {admin ? <Act name={creating ? "close" : "plus"} title={creating ? "Cerrar" : "Nueva"} tone="primary" onClick={() => setCreating((value) => !value)} /> : null}
      </header>
      {admin && creating ? (
        <form className="desk-card row" onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const { error } = await db.from("demos").insert({
            organization_id: form.get("organization_id"),
            product_id: form.get("product_id"),
            expires_at: new Date(`${form.get("expires")}T23:59:00`).toISOString(),
            granted_by: profile.id,
          });
          if (error) setMsg(error.message);
          else {
            setCreating(false);
            setTick((value) => value + 1);
          }
        }}>
          <select name="organization_id">{orgs.map((item) => <option key={item.id} value={item.id}>{item.legal_name}</option>)}</select>
          <select name="product_id">{products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
          <label>Vence<input name="expires" type="date" required /></label>
          <Act name="plus" title="Crear" tone="primary" type="submit" />
        </form>
      ) : null}
      {msg ? <p className="err">{msg}</p> : null}
      <ul className="desk-list">
        {rows.length ? rows.map((demo) => (
          <li key={demo.id} className="desk-person">
            <div className="desk-line">
              <span>
                {names.get(demo.product_id) || "Demo"}
                {orgNames.get(demo.organization_id) ? ` · ${orgNames.get(demo.organization_id)}` : ""}
                {` · hasta ${new Date(demo.expires_at).toLocaleDateString("es-AR")}`}
              </span>
              {admin ? (
                <div className="acts">
                  <Act name="edit" title="Editar" onClick={() => setEditing(editing === demo.id ? null : demo.id)} />
                  <Act name="remove" title="Borrar" tone="danger" onClick={async () => {
                    if (!window.confirm("¿Borrar esta demo?")) return;
                    const { error } = await db.from("demos").delete().eq("id", demo.id);
                    if (error) setMsg(error.message);
                    else setTick((value) => value + 1);
                  }} />
                </div>
              ) : null}
            </div>
            {admin && editing === demo.id ? (
              <form className="row" onSubmit={async (event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                const { error } = await db.from("demos").update({
                  organization_id: form.get("organization_id"),
                  product_id: form.get("product_id"),
                  expires_at: new Date(`${form.get("expires")}T23:59:00`).toISOString(),
                }).eq("id", demo.id);
                if (error) setMsg(error.message);
                else {
                  setEditing(null);
                  setTick((value) => value + 1);
                }
              }}>
                <select name="organization_id" defaultValue={demo.organization_id}>{orgs.map((item) => <option key={item.id} value={item.id}>{item.legal_name}</option>)}</select>
                <select name="product_id" defaultValue={demo.product_id}>{products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
                <label>Vence<input name="expires" type="date" defaultValue={demo.expires_at.slice(0, 10)} required /></label>
                <Act name="save" title="Guardar" tone="primary" type="submit" />
              </form>
            ) : null}
          </li>
        )) : <li>No hay demos.</li>}
      </ul>
    </div>
  );
}

function Contratos({ db }: { db: SupabaseClient }) {
  const [rows, setRows] = useState<{ product_name: string; status: string; sold_price_usd: number }[]>([]);
  useEffect(() => {
    db.from("client_contracts").select("product_name, status, sold_price_usd").then(({ data }) => setRows(data || []));
  }, [db]);
  return (
    <>
      <h2>Mis productos</h2>
      <table>
        <thead><tr><th>Producto</th><th>Estado</th><th>Precio</th></tr></thead>
        <tbody>{rows.map((row) => <tr key={row.product_name}><td>{row.product_name}</td><td>{label(row.status)}</td><td>{money(row.sold_price_usd)}</td></tr>)}</tbody>
      </table>
    </>
  );
}

function Recibos({ db }: { db: SupabaseClient }) {
  const [rows, setRows] = useState<{ invoice_id: string; number: number; amount_ars: number; paid_at: string }[]>([]);
  useEffect(() => {
    db.from("client_receipts").select("invoice_id, number, amount_ars, paid_at").then(({ data }) => setRows(data || []));
  }, [db]);
  return (
    <>
      <h2>Mis comprobantes</h2>
      <table>
        <thead><tr><th>Factura</th><th>Pesos</th><th>Fecha</th><th>Archivo</th></tr></thead>
        <tbody>{rows.map((row) => (
          <tr key={row.invoice_id}>
            <td>{row.number}</td>
            <td>ARS {Number(row.amount_ars).toLocaleString("es-AR")}</td>
            <td>{new Date(row.paid_at).toLocaleDateString("es-AR")}</td>
            <td><RecordFile db={db} kind="invoice" ownerId={row.invoice_id} label="Todavía no hay comprobante" canUpload={false} /></td>
          </tr>
        ))}</tbody>
      </table>
    </>
  );
}

function Clave({ db }: { db: SupabaseClient }) {
  const [msg, setMsg] = useState("");
  return (
    <>
      <h2>Mi contraseña</h2>
      <p className="muted">Podés cambiar tu contraseña. El correo y el rol los administra Agronys.</p>
      <form className="grid" onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        if (form.get("password") !== form.get("again")) {
          setMsg("Las dos contraseñas no coinciden.");
          return;
        }
        const { error } = await db.auth.updateUser({ password: String(form.get("password")) });
        setMsg(error ? error.message : "Contraseña actualizada.");
      }}>
        <label>Nueva contraseña<input name="password" type="password" minLength={8} required /></label>
        <label>Repetir<input name="again" type="password" minLength={8} required /></label>
        <Act name="save" title="Guardar" tone="primary" type="submit" />
      </form>
      {msg ? <p>{msg}</p> : null}
    </>
  );
}
