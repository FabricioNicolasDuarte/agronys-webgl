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

const TONE = {
  accent: "#d07bff",
  ice: "#f0d4ff",
  mint: "#e7c6ff",
  deep: "#7a3dff",
  mid: "#b388ff",
  ink: "#c4a8dc",
  grid: "#4a2870",
  text: "#fbf7ff",
  surface: "#1c1028",
  track: "#3a2454",
};

const PAYOUT_LABEL: Record<string, string> = {
  payable: "A liquidar",
  invoiced_by_payee: "Con factura del colaborador",
  paid: "Pagada",
  void: "Anulada",
  sales_commission: "Comisión de venta",
  dev_split: "Parte de co-desarrollo",
};

type Deal = {
  id: string;
  product_id: string;
  organization_id: string;
  status: string;
  suggested_price_usd: number | null;
  sold_price_usd: number | null;
};
type Payout = { id: string; deal_id: string; amount_usd: number | string; status: string; kind: string };

function useTone() {
  const [tone, setTone] = useState(TONE);
  useEffect(() => {
    const shell = document.querySelector(".shell");
    if (!shell) return;
    const style = getComputedStyle(shell);
    const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
    setTone({
      ...TONE,
      accent: read("--emerald", TONE.accent),
      ice: read("--lime", TONE.ice),
      mint: read("--mint", TONE.mint),
      ink: read("--muted", TONE.ink),
      grid: read("--line", TONE.grid),
      text: read("--text", TONE.text),
      surface: read("--surface", TONE.surface),
    });
  }, []);
  return tone;
}

function MoneyBar(props: { x?: number; y?: number; width?: number; height?: number; payload?: { usd?: number }; fill: string; ink: string }) {
  const x = props.x ?? 0;
  const y = props.y ?? 0;
  const width = props.width ?? 0;
  const height = props.height ?? 0;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={10} fill={props.fill} />
      <text x={x + width + 10} y={y + height / 2} dominantBaseline="middle" fill={props.ink} fontSize={12}>
        {formatUsd(props.payload?.usd ?? 0)}
      </text>
    </g>
  );
}

export function VendorDesk({ db, profile }: { db: SupabaseClient; profile: { id: string } }) {
  const tone = useTone();
  const [rows, setRows] = useState<{
    deals: Deal[];
    products: Map<string, string>;
    orgs: Map<string, string>;
    payouts: Payout[];
  } | null>(null);

  useEffect(() => {
    Promise.all([
      db.from("deals").select("id, product_id, organization_id, status, suggested_price_usd, sold_price_usd").neq("status", "draft"),
      db.from("products").select("id, name"),
      db.from("organizations").select("id, legal_name"),
      db.from("payouts").select("id, deal_id, amount_usd, status, kind").eq("payee_id", profile.id),
    ]).then(([deals, products, orgs, payouts]) => {
      const mine = (deals.data || []).filter((deal) => deal.status !== "void");
      setRows({
        deals: mine,
        products: new Map((products.data || []).map((item) => [item.id, item.name])),
        orgs: new Map((orgs.data || []).map((item) => [item.id, item.legal_name])),
        payouts: (payouts.data || []).filter((row) => row.status !== "void"),
      });
    });
  }, [db, profile.id]);

  if (!rows) return <p className="muted">Cargando…</p>;

  const sales = rows.deals;
  const open = sales.filter((deal) => deal.status !== "paid");
  const paid = sales.length - open.length;
  const due = rows.payouts
    .filter((part) => part.status === "payable" || part.status === "invoiced_by_payee")
    .reduce((sum, part) => sum + Number(part.amount_usd), 0);
  const commission = rows.payouts.reduce((sum, part) => sum + Number(part.amount_usd), 0);
  const covered = sales.length ? Math.round((paid / sales.length) * 1000) / 10 : 0;
  const asOf = new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  const month = asOf.charAt(0).toUpperCase() + asOf.slice(1);
  const statusOrder: DealStatus[] = ["assigned", "accepted", "invoiced", "paid"];
  const byStatus = statusOrder
    .map((status) => ({ status, name: STATUS_LABEL[status], count: sales.filter((deal) => deal.status === status).length }))
    .filter((row) => row.count > 0);
  const statusFill = [tone.ice, tone.mint, tone.accent, tone.deep];
  const bars = [...rows.products.entries()].map(([id, name]) => {
    const ids = new Set(sales.filter((deal) => deal.product_id === id).map((deal) => deal.id));
    const usd = rows.payouts.filter((part) => ids.has(part.deal_id)).reduce((sum, part) => sum + Number(part.amount_usd), 0);
    return { name, usd };
  }).filter((bar) => bar.usd > 0);

  const alerts = [
    due > 0
      ? { title: "Tu comisión", text: `${formatUsd(due)} a tu nombre. No cobrás al cliente: lo liquida la casa.`, attention: false }
      : { title: "Sin comisión pendiente", text: "Todavía no hay una comisión a tu nombre. Aparece cuando el cliente cubrió la factura.", attention: false },
    open.length
      ? { title: open.length === 1 ? "1 venta abierta" : `${open.length} ventas abiertas`, text: "Sigue asignada o sin cobrar. No ves el medio de pago.", attention: true }
      : { title: "Ventas cobradas", text: sales.length ? "Todas tus ventas están cobradas." : "Todavía no tenés ventas a tu nombre.", attention: false },
  ];

  return (
    <div className="ops">
      <header>
        <div className="ops-head">
          <div>
            <p className="ops-kicker">Operación</p>
            <h2>Mis ventas</h2>
          </div>
          <p className="ops-asof">{month}</p>
        </div>
        <p className="ops-note">Estas cifras son tus ventas y tu comisión. No ves cómo pagó el cliente ni la parte de otras personas.</p>
      </header>

      <ul className="ops-alerts">
        {alerts.map((alert) => (
          <li key={alert.title} className={alert.attention ? "is-attention" : ""}>
            <strong>{alert.title}</strong>
            <span>{alert.text}</span>
          </li>
        ))}
      </ul>

      <section className="ops-kpis" aria-label="Indicadores de tus ventas">
        <article>
          <p>Ventas</p>
          <strong>{sales.length}</strong>
          <span>A tu nombre</span>
        </article>
        <article>
          <p>Tu comisión</p>
          <strong>{formatUsd(commission)}</strong>
          <span>Lo que te corresponde, no el precio del cliente</span>
        </article>
        <article>
          <p>Abiertas</p>
          <strong>{open.length}</strong>
          <span>{paid} {paid === 1 ? "cobrada" : "cobradas"}</span>
        </article>
        <article>
          <p>A liquidar</p>
          <strong>{formatUsd(due)}</strong>
          <span>Pendiente de pago por la casa</span>
        </article>
      </section>

      <div className="ops-grid">
        <section className="ops-card">
          <h3>Ventas por estado</h3>
          {byStatus.length ? (
            <>
              <div className="ops-plot ops-plot-short ops-donut" role="img" aria-label="Tus ventas por estado">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={byStatus} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={68} outerRadius={96} paddingAngle={3} stroke={tone.surface} strokeWidth={3} isAnimationActive={false}>
                      {byStatus.map((row, index) => <Cell key={row.status} fill={statusFill[index] || tone.accent} />)}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (!active || !payload?.[0]) return null;
                      const row = payload[0].payload as { name: string; count: number };
                      return <div className="ops-tip"><strong>{row.name}</strong><span>{row.count} {row.count === 1 ? "venta" : "ventas"}</span></div>;
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
                  <li key={row.status}><i style={{ background: statusFill[index] || tone.accent }} />{row.name} · {row.count}</li>
                ))}
              </ul>
            </>
          ) : <p className="ops-note">Todavía no tenés ventas a tu nombre.</p>}
        </section>
        <section className="ops-card">
          <h3>Ventas cobradas</h3>
          <div className="ops-gauge">
            <div className="ops-plot ops-plot-short" role="img" aria-label={`${paid} de ${sales.length} ventas cobradas`}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius={78} outerRadius={108} data={[{ name: "Cobradas", value: covered, fill: tone.accent }]} startAngle={210} endAngle={-30}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar background={{ fill: tone.track }} dataKey="value" cornerRadius={12} isAnimationActive={false} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <p className="ops-gauge-read">
              <strong>{paid}</strong>
              <span>de {sales.length}</span>
            </p>
          </div>
          <p className="ops-note">Cuenta las ventas a tu nombre que ya están cobradas. No es una meta.</p>
        </section>
      </div>

      <section className="ops-card">
        <h3>Tu comisión por producto</h3>
        {bars.length ? (
          <div className="ops-plot" role="img" aria-label="Comisión por producto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} layout="vertical" margin={{ top: 8, right: 88, left: 8, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke={tone.grid} />
                <XAxis type="number" hide domain={[0, Math.max(1, ...bars.map((bar) => bar.usd))]} />
                <YAxis type="category" dataKey="name" width={120} axisLine={false} tickLine={false} tick={{ fill: tone.ink, fontSize: 12 }} />
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.[0]?.payload) return null;
                  const row = payload[0].payload as { name: string; usd: number };
                  return <div className="ops-tip"><strong>{row.name}</strong><span>{formatUsd(row.usd)}</span></div>;
                }} cursor={{ fill: "rgba(208, 123, 255, 0.12)" }} />
                <Bar dataKey="usd" barSize={16} isAnimationActive={false} shape={(props: { x?: number; y?: number; width?: number; height?: number; payload?: { usd?: number } }) => <MoneyBar {...props} fill={tone.accent} ink={tone.text} />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : <p className="ops-note">Todavía no hay una comisión liquidable.</p>}
      </section>

      <section className="ops-card">
        <h3>Libro de tus ventas</h3>
        <div className="ops-table-wrap">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Establecimiento</th>
                <th>Estado</th>
                <th>Sugerido</th>
                <th>Vendido</th>
                <th>Tu comisión</th>
                <th>Liquidación</th>
              </tr>
            </thead>
            <tbody>
              {sales.length ? sales.map((deal) => {
                const mine = rows.payouts.filter((part) => part.deal_id === deal.id);
                const amount = mine.reduce((sum, part) => sum + Number(part.amount_usd), 0);
                return (
                  <tr key={deal.id}>
                    <td>{rows.products.get(deal.product_id) || "—"}</td>
                    <td>{rows.orgs.get(deal.organization_id) || "—"}</td>
                    <td><span className={`ops-status is-${deal.status}`}>{STATUS_LABEL[deal.status as DealStatus] || deal.status}</span></td>
                    <td>{formatUsd(deal.suggested_price_usd)}</td>
                    <td>{formatUsd(deal.sold_price_usd)}</td>
                    <td>{mine.length ? formatUsd(amount) : "—"}</td>
                    <td>{mine.length ? mine.map((part) => PAYOUT_LABEL[part.status] || part.status).join(", ") : "Todavía no"}</td>
                  </tr>
                );
              }) : <tr><td colSpan={7}>No tenés ventas a tu nombre.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
