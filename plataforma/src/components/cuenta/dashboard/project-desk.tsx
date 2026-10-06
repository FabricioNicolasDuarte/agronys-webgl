"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SupabaseClient } from "@supabase/supabase-js";
import { formatUsd, STATUS_LABEL, type DealStatus } from "@/components/cuenta/dashboard/situation";

const FALLBACK = {
  accent: "#3ad0ff",
  ice: "#b8f4ff",
  mint: "#8ee7ff",
  deep: "#2f6fed",
  mid: "#7eb6ff",
  ink: "#8ebbd4",
  grid: "#1a5278",
  text: "#f4fbff",
  surface: "#071c2c",
};

const PAYOUT_LABEL: Record<string, string> = {
  payable: "A liquidar",
  invoiced_by_payee: "Con factura del colaborador",
  paid: "Pagada",
  void: "Anulada",
};

type Product = { id: string; name: string; suggested_price_usd: number | null };
type Share = { product_id: string; profile_id: string; share_percent: number | string };
type Deal = { id: string; product_id: string; organization_id: string; status: string; sold_price_usd: number | null };
type Payout = { id: string; deal_id: string; amount_usd: number | string; status: string };
type Tone = typeof FALLBACK;

function percentLabel(value: number) {
  return `${value.toLocaleString("es-AR", { maximumFractionDigits: 2 })} %`;
}

function useTone(): Tone {
  const [tone, setTone] = useState(FALLBACK);
  useEffect(() => {
    const shell = document.querySelector(".shell");
    if (!shell) return;
    const style = getComputedStyle(shell);
    const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
    setTone({
      ...FALLBACK,
      accent: read("--emerald", FALLBACK.accent),
      ice: read("--lime", FALLBACK.ice),
      mint: read("--mint", FALLBACK.mint),
      ink: read("--muted", FALLBACK.ink),
      grid: read("--line", FALLBACK.grid),
      text: read("--text", FALLBACK.text),
      surface: read("--surface", FALLBACK.surface),
    });
  }, []);
  return tone;
}

function PayBar(props: { x?: number; y?: number; width?: number; height?: number; payload?: { usd?: number }; tone: Tone }) {
  const x = props.x ?? 0;
  const y = props.y ?? 0;
  const width = props.width ?? 0;
  const height = props.height ?? 0;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={10} fill={props.tone.accent} />
      <text x={x + width + 10} y={y + height / 2} dominantBaseline="middle" fill={props.tone.text} fontSize={12}>
        {formatUsd(props.payload?.usd ?? 0)}
      </text>
    </g>
  );
}

export function ProjectDesk({ db, profile }: { db: SupabaseClient; profile: { id: string } }) {
  const tone = useTone();
  const [picked, setPicked] = useState("");
  const [rows, setRows] = useState<{
    products: Product[];
    shares: Share[];
    names: Map<string, string>;
    orgs: Map<string, string>;
    deals: Deal[];
    payouts: Payout[];
  } | null>(null);

  useEffect(() => {
    Promise.all([
      db.from("products").select("id, name, suggested_price_usd"),
      db.from("product_collaborators").select("product_id, profile_id, share_percent"),
      db.from("profiles").select("id, full_name"),
      db.from("organizations").select("id, legal_name"),
      db.from("deals").select("id, product_id, organization_id, status, sold_price_usd").neq("status", "draft"),
      db.from("payouts").select("id, deal_id, amount_usd, status").eq("payee_id", profile.id),
    ]).then(([products, shares, people, orgs, deals, payouts]) => {
      setRows({
        products: products.data || [],
        shares: shares.data || [],
        names: new Map((people.data || []).map((person) => [person.id, person.full_name || "—"])),
        orgs: new Map((orgs.data || []).map((org) => [org.id, org.legal_name])),
        deals: deals.data || [],
        payouts: (payouts.data || []).filter((row) => row.status !== "void"),
      });
    });
  }, [db, profile.id]);

  if (!rows) return <p className="muted">Cargando…</p>;

  const mine = new Set(rows.shares.filter((share) => share.profile_id === profile.id).map((share) => share.product_id));
  const projects = rows.products.filter((product) => mine.has(product.id));
  const projectIds = new Set(projects.map((product) => product.id));
  const sales = rows.deals.filter((deal) => projectIds.has(deal.product_id));
  const saleIds = new Set(sales.map((deal) => deal.id));
  const parts = rows.payouts.filter((payout) => saleIds.has(payout.deal_id));
  const open = sales.filter((deal) => deal.status !== "paid" && deal.status !== "void");
  const due = parts.filter((part) => part.status === "payable" || part.status === "invoiced_by_payee").reduce((sum, part) => sum + Number(part.amount_usd), 0);
  const mineTotal = parts.reduce((sum, part) => sum + Number(part.amount_usd), 0);
  const selectedId = projects.some((product) => product.id === picked) ? picked : projects[0]?.id || "";
  const selected = projects.find((product) => product.id === selectedId);
  const team = rows.shares
    .filter((share) => share.product_id === selectedId)
    .slice()
    .sort((a, b) => Number(b.share_percent) - Number(a.share_percent));
  const own = team.find((share) => share.profile_id === profile.id);
  const ownPercent = Number(own?.share_percent || 0);
  const asOf = new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  const month = asOf.charAt(0).toUpperCase() + asOf.slice(1);
  const statusOrder: DealStatus[] = ["assigned", "accepted", "invoiced", "paid"];
  const byStatus = statusOrder
    .map((status) => ({ status, name: STATUS_LABEL[status], count: sales.filter((deal) => deal.status === status).length }))
    .filter((row) => row.count > 0);
  const statusFill = [tone.ice, tone.mint, tone.accent, tone.deep];
  const payBars = projects.map((product) => {
    const ids = new Set(sales.filter((deal) => deal.product_id === product.id).map((deal) => deal.id));
    const usd = parts.filter((part) => ids.has(part.deal_id)).reduce((sum, part) => sum + Number(part.amount_usd), 0);
    return { name: product.name, usd };
  });
  let other = 0;
  const slices = team.map((share) => {
    const self = share.profile_id === profile.id;
    const fill = self ? tone.accent : [tone.ice, tone.mid, tone.deep, tone.mint][other++ % 4];
    return {
      id: share.profile_id,
      name: rows.names.get(share.profile_id) || "—",
      self,
      percent: Number(share.share_percent),
      fill,
    };
  });

  const alerts = [
    due > 0
      ? { title: "Tu liquidación", text: `${formatUsd(due)} a tu nombre. El cliente no te paga: lo liquida la casa.`, attention: false }
      : { title: "Sin liquidación pendiente", text: "Todavía no hay una parte a tu nombre. Aparece cuando el cliente cubrió la factura.", attention: false },
    open.length
      ? { title: open.length === 1 ? "1 venta sin cobrar" : `${open.length} ventas sin cobrar`, text: "Sigue en tus proyectos. Tu parte no se calcula hasta que el cliente cubrió la factura.", attention: true }
      : selected
        ? { title: "Tu porcentaje", text: `En ${selected.name} te corresponde ${percentLabel(ownPercent)}. El precio cobrado se divide con el reparto.`, attention: false }
        : { title: "Sin proyectos", text: "Cuando te incluyan en un co-desarrollo, el reparto aparece acá.", attention: false },
  ];

  return (
    <div className="ops">
      <header>
        <div className="ops-head">
          <div>
            <p className="ops-kicker">Proyectos</p>
            <h2>Mis proyectos</h2>
          </div>
          <p className="ops-asof">{month}</p>
        </div>
        <p className="ops-note">Estas cifras salen de tus proyectos, el reparto y tu liquidación. No ves la infraestructura ni cómo paga el cliente.</p>
      </header>

      <ul className="ops-alerts">
        {alerts.map((alert) => (
          <li key={alert.title} className={alert.attention ? "is-attention" : ""}>
            <strong>{alert.title}</strong>
            <span>{alert.text}</span>
          </li>
        ))}
      </ul>

      <section className="ops-kpis" aria-label="Indicadores de tus proyectos">
        <article>
          <p>Proyectos</p>
          <strong>{projects.length}</strong>
          <span>{projects.length === 1 ? projects[0].name : "Co-desarrollos en los que estás"}</span>
        </article>
        <article>
          <p>Tu parte</p>
          <strong>{formatUsd(mineTotal)}</strong>
          <span>Suma de lo que te corresponde en las ventas cobradas</span>
        </article>
        <article>
          <p>Ventas abiertas</p>
          <strong>{open.length}</strong>
          <span>{sales.length} en tus proyectos, {sales.length - open.length} {sales.length - open.length === 1 ? "cobrada" : "cobradas"}</span>
        </article>
        <article>
          <p>A liquidar</p>
          <strong>{formatUsd(due)}</strong>
          <span>Pendiente de pago por la casa</span>
        </article>
      </section>

      {projects.length ? (
        <>
          <div className="ops-grid">
            <section className="ops-card">
              <h3>Reparto{selected ? ` · ${selected.name}` : ""}</h3>
              {projects.length > 1 ? (
                <div className="ops-switch-row">
                  {projects.map((product) => (
                    <button key={product.id} type="button" className="ops-switch" aria-pressed={product.id === selectedId} onClick={() => setPicked(product.id)}>
                      {product.name}
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="ops-plot ops-plot-short ops-donut" role="img" aria-label="Porcentaje de cada integrante">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={slices} dataKey="percent" nameKey="name" cx="50%" cy="50%" innerRadius={68} outerRadius={96} paddingAngle={3} stroke={tone.surface} strokeWidth={3} isAnimationActive={false}>
                      {slices.map((slice) => <Cell key={slice.id} fill={slice.fill} />)}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (!active || !payload?.[0]) return null;
                      const row = payload[0].payload as { name: string; percent: number; self: boolean };
                      return (
                        <div className="ops-tip">
                          <strong>{row.self ? `${row.name} · vos` : row.name}</strong>
                          <span>{percentLabel(row.percent)}</span>
                        </div>
                      );
                    }} />
                  </PieChart>
                </ResponsiveContainer>
                <p className="ops-gauge-read">
                  <strong>{percentLabel(ownPercent)}</strong>
                  <span>vos</span>
                </p>
              </div>
              <ul className="ops-legend">
                {slices.map((slice) => (
                  <li key={slice.id}>
                    <i style={{ background: slice.fill }} />
                    {slice.self ? `${slice.name} · vos` : slice.name} · {percentLabel(slice.percent)}
                  </li>
                ))}
              </ul>
            </section>
            <section className="ops-card">
              <h3>Ventas por estado</h3>
              {byStatus.length ? (
                <>
                  <div className="ops-plot ops-plot-short ops-donut" role="img" aria-label="Ventas de tus proyectos por estado">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={byStatus} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={68} outerRadius={96} paddingAngle={3} stroke={tone.surface} strokeWidth={3} isAnimationActive={false}>
                          {byStatus.map((row, index) => <Cell key={row.status} fill={statusFill[index] || tone.accent} />)}
                        </Pie>
                        <Tooltip content={({ active, payload }) => {
                          if (!active || !payload?.[0]) return null;
                          const row = payload[0].payload as { name: string; count: number };
                          return (
                            <div className="ops-tip">
                              <strong>{row.name}</strong>
                              <span>{row.count} {row.count === 1 ? "venta" : "ventas"}</span>
                            </div>
                          );
                        }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="ops-gauge-read">
                      <strong>{sales.length}</strong>
                      <span>{sales.length === 1 ? "venta" : "ventas"}</span>
                    </p>
                  </div>
                  <ul className="ops-legend">
                    {byStatus.map((row, index) => (
                      <li key={row.status}>
                        <i style={{ background: statusFill[index] || tone.accent }} />
                        {row.name} · {row.count}
                      </li>
                    ))}
                  </ul>
                </>
              ) : <p className="ops-note">Todavía no hay una venta de tus proyectos.</p>}
            </section>
          </div>

          <div className="ops-grid ops-grid-even">
            <section className="ops-card">
              <h3>Tu porcentaje</h3>
              <div className="ops-gauge">
                <div className="ops-plot ops-plot-short" role="img" aria-label={`Tu porcentaje ${percentLabel(ownPercent)}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius={78} outerRadius={108} data={[{ name: "Vos", value: ownPercent, fill: tone.accent }]} startAngle={210} endAngle={-30}>
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar background={{ fill: "#12344a" }} dataKey="value" cornerRadius={12} isAnimationActive={false} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="ops-gauge-read">
                  <strong>{percentLabel(ownPercent)}</strong>
                  <span>{selected?.name || "proyecto"}</span>
                </p>
              </div>
              <p className="ops-note">Precio sugerido {formatUsd(selected?.suggested_price_usd ?? null)}. El porcentaje es el del reparto, no una comisión de venta.</p>
            </section>
            <section className="ops-card">
              <h3>Tu liquidación</h3>
              {payBars.some((bar) => bar.usd > 0) ? (
                <div className="ops-plot" role="img" aria-label="Tu liquidación por proyecto">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={payBars} layout="vertical" margin={{ top: 8, right: 88, left: 8, bottom: 0 }}>
                      <CartesianGrid horizontal={false} stroke={tone.grid} />
                      <XAxis type="number" hide domain={[0, "dataMax"]} />
                      <YAxis type="category" dataKey="name" width={120} axisLine={false} tickLine={false} tick={{ fill: tone.ink, fontSize: 12 }} />
                      <Tooltip content={({ active, payload }) => {
                        if (!active || !payload?.[0]?.payload) return null;
                        const row = payload[0].payload as { name: string; usd: number };
                        return (
                          <div className="ops-tip">
                            <strong>{row.name}</strong>
                            <span>{formatUsd(row.usd)}</span>
                          </div>
                        );
                      }} cursor={{ fill: "rgba(58, 208, 255, 0.08)" }} />
                      <Bar dataKey="usd" barSize={16} shape={<PayBar tone={tone} />} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : <p className="ops-note">Todavía no hay una parte liquidable.</p>}
              <p className="ops-note">Solo tu importe. No ves la parte de los demás ni el medio de pago del cliente.</p>
            </section>
          </div>

          <section className="ops-card">
            <h3>Libro de tus proyectos</h3>
            <div className="ops-table-wrap">
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Establecimiento</th>
                    <th>Estado</th>
                    <th>Precio</th>
                    <th>Tu parte</th>
                    <th>Liquidación</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.length ? sales.map((deal) => {
                    const mineParts = parts.filter((part) => part.deal_id === deal.id);
                    const amount = mineParts.reduce((sum, part) => sum + Number(part.amount_usd), 0);
                    return (
                      <tr key={deal.id}>
                        <td>{rows.products.find((product) => product.id === deal.product_id)?.name || "—"}</td>
                        <td>{rows.orgs.get(deal.organization_id) || "—"}</td>
                        <td><span className={`ops-status is-${deal.status}`}>{STATUS_LABEL[deal.status as DealStatus] || deal.status}</span></td>
                        <td>{formatUsd(deal.sold_price_usd)}</td>
                        <td>{mineParts.length ? formatUsd(amount) : "—"}</td>
                        <td>{mineParts.length ? mineParts.map((part) => PAYOUT_LABEL[part.status] || part.status).join(", ") : "Todavía no"}</td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan={6}>Todavía no hay una venta de tus proyectos.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : <p className="ops-note">No estás en ningún proyecto.</p>}
    </div>
  );
}
