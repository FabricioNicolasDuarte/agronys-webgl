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
import { formatArs, formatUsd, STATUS_LABEL, type DealStatus } from "@/components/cuenta/dashboard/situation";

const TONE = {
  accent: "#ff7a59",
  ice: "#ffd0c4",
  mint: "#ffc2b3",
  deep: "#e24b32",
  ink: "#e0b2a6",
  grid: "#6a3830",
  text: "#fff8f6",
  surface: "#241410",
  track: "#4a2822",
};

const DOC: Record<string, string> = {
  C: "Factura C",
  E: "Factura E",
  NC_C: "Nota de crédito C",
  NC_E: "Nota de crédito E",
};

type Contract = { id: string; product_id: string; product_name: string; status: string; sold_price_usd: number | null };
type Receipt = { id: string; kind: string; number: number; amount_ars: number | string; paid_at: string };
type Demo = { id: string; product_id: string; expires_at: string };

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

function ArsBar(props: { x?: number; y?: number; width?: number; height?: number; payload?: { ars?: number }; fill: string; ink: string }) {
  const x = props.x ?? 0;
  const y = props.y ?? 0;
  const width = props.width ?? 0;
  const height = props.height ?? 0;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={10} fill={props.fill} />
      <text x={x + width + 10} y={y + height / 2} dominantBaseline="middle" fill={props.ink} fontSize={12}>
        {formatArs(props.payload?.ars ?? 0)}
      </text>
    </g>
  );
}

export function ClientDesk({ db }: { db: SupabaseClient }) {
  const tone = useTone();
  const [rows, setRows] = useState<{ contracts: Contract[]; receipts: Receipt[]; demos: Demo[] } | null>(null);

  useEffect(() => {
    Promise.all([
      db.from("client_contracts").select("id, product_id, product_name, status, sold_price_usd"),
      db.from("client_receipts").select("id, kind, number, amount_ars, paid_at"),
      db.from("demos").select("id, product_id, expires_at"),
    ]).then(([contracts, receipts, demos]) => {
      setRows({
        contracts: contracts.data || [],
        receipts: receipts.data || [],
        demos: demos.data || [],
      });
    });
  }, [db]);

  if (!rows) return <p className="muted">Cargando…</p>;

  const names = new Map(rows.contracts.map((row) => [row.product_id, row.product_name]));
  const paid = rows.contracts.filter((row) => row.status === "paid").length;
  const open = rows.contracts.length - paid;
  const covered = rows.contracts.length ? Math.round((paid / rows.contracts.length) * 1000) / 10 : 0;
  const pesos = rows.receipts.reduce((sum, row) => sum + Number(row.amount_ars), 0);
  const asOf = new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  const month = asOf.charAt(0).toUpperCase() + asOf.slice(1);
  const statusOrder: DealStatus[] = ["accepted", "invoiced", "paid"];
  const byStatus = statusOrder
    .map((status) => ({ status, name: STATUS_LABEL[status], count: rows.contracts.filter((row) => row.status === status).length }))
    .filter((row) => row.count > 0);
  const statusFill = [tone.ice, tone.mint, tone.accent];
  const bars = rows.receipts
    .slice()
    .sort((a, b) => a.number - b.number)
    .map((row) => ({ name: `${DOC[row.kind] || row.kind} ${row.number}`, ars: Number(row.amount_ars) }));

  const alerts = [
    rows.demos.length
      ? {
          title: rows.demos.length === 1 ? "1 demo habilitada" : `${rows.demos.length} demos habilitadas`,
          text: rows.demos.map((demo) => `${names.get(demo.product_id) || "Producto"} hasta el ${new Date(demo.expires_at).toLocaleDateString("es-AR")}`).join(". "),
          attention: true,
        }
      : { title: "Sin demos", text: "No hay una demo habilitada para tu establecimiento.", attention: false },
    open
      ? { title: open === 1 ? "1 producto sin cobrar" : `${open} productos sin cobrar`, text: "El comprobante aparece cuando el pago quedó registrado.", attention: false }
      : { title: "Productos cobrados", text: rows.contracts.length ? "Los productos de tu cuenta están cobrados." : "Todavía no hay un producto en tu cuenta.", attention: false },
  ];

  return (
    <div className="ops">
      <header>
        <div className="ops-head">
          <div>
            <p className="ops-kicker">Cuenta</p>
            <h2>Mi cuenta</h2>
          </div>
          <p className="ops-asof">{month}</p>
        </div>
        <p className="ops-note">Estas cifras son tus productos y tus comprobantes. No ves comisiones ni el reparto de quien lo desarrolló.</p>
      </header>

      <ul className="ops-alerts">
        {alerts.map((alert) => (
          <li key={alert.title} className={alert.attention ? "is-attention" : ""}>
            <strong>{alert.title}</strong>
            <span>{alert.text}</span>
          </li>
        ))}
      </ul>

      <section className="ops-kpis" aria-label="Indicadores de tu cuenta">
        <article>
          <p>Productos</p>
          <strong>{rows.contracts.length}</strong>
          <span>Contratados por tu establecimiento</span>
        </article>
        <article>
          <p>Cobrados</p>
          <strong>{paid}</strong>
          <span>{open} {open === 1 ? "pendiente" : "pendientes"}</span>
        </article>
        <article>
          <p>Comprobantes</p>
          <strong>{rows.receipts.length}</strong>
          <span>Registrados a tu nombre</span>
        </article>
        <article>
          <p>Pagado</p>
          <strong>{formatArs(pesos)}</strong>
          <span>Suma de tus comprobantes</span>
        </article>
      </section>

      <div className="ops-grid">
        <section className="ops-card">
          <h3>Productos por estado</h3>
          {byStatus.length ? (
            <>
              <div className="ops-plot ops-plot-short ops-donut" role="img" aria-label="Tus productos por estado">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={byStatus} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={68} outerRadius={96} paddingAngle={3} stroke={tone.surface} strokeWidth={3} isAnimationActive={false}>
                      {byStatus.map((row, index) => <Cell key={row.status} fill={statusFill[index] || tone.accent} />)}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (!active || !payload?.[0]) return null;
                      const row = payload[0].payload as { name: string; count: number };
                      return <div className="ops-tip"><strong>{row.name}</strong><span>{row.count}</span></div>;
                    }} />
                  </PieChart>
                </ResponsiveContainer>
                <p className="ops-gauge-read">
                  <strong>{rows.contracts.length}</strong>
                  <span>{rows.contracts.length === 1 ? "producto" : "productos"}</span>
                </p>
              </div>
              <ul className="ops-legend">
                {byStatus.map((row, index) => (
                  <li key={row.status}><i style={{ background: statusFill[index] || tone.accent }} />{row.name} · {row.count}</li>
                ))}
              </ul>
            </>
          ) : <p className="ops-note">Todavía no hay un producto en tu cuenta.</p>}
        </section>
        <section className="ops-card">
          <h3>Productos cobrados</h3>
          <div className="ops-gauge">
            <div className="ops-plot ops-plot-short" role="img" aria-label={`${paid} de ${rows.contracts.length} productos cobrados`}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius={78} outerRadius={108} data={[{ name: "Cobrados", value: covered, fill: tone.accent }]} startAngle={210} endAngle={-30}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar background={{ fill: tone.track }} dataKey="value" cornerRadius={12} isAnimationActive={false} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <p className="ops-gauge-read">
              <strong>{paid}</strong>
              <span>de {rows.contracts.length}</span>
            </p>
          </div>
          <p className="ops-note">Cuenta los productos de tu establecimiento que ya están cobrados.</p>
        </section>
      </div>

      <section className="ops-card">
        <h3>Comprobantes</h3>
        {bars.length ? (
          <div className="ops-plot" role="img" aria-label="Importe en pesos de tus comprobantes">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} layout="vertical" margin={{ top: 8, right: 120, left: 8, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke={tone.grid} />
                <XAxis type="number" hide domain={[0, Math.max(1, ...bars.map((bar) => bar.ars))]} />
                <YAxis type="category" dataKey="name" width={110} axisLine={false} tickLine={false} tick={{ fill: tone.ink, fontSize: 12 }} />
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.[0]?.payload) return null;
                  const row = payload[0].payload as { name: string; ars: number };
                  return <div className="ops-tip"><strong>{row.name}</strong><span>{formatArs(row.ars)}</span></div>;
                }} cursor={{ fill: "rgba(255, 122, 89, 0.12)" }} />
                <Bar dataKey="ars" barSize={16} isAnimationActive={false} shape={(props: { x?: number; y?: number; width?: number; height?: number; payload?: { ars?: number } }) => <ArsBar {...props} fill={tone.accent} ink={tone.text} />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : <p className="ops-note">Todavía no hay un comprobante.</p>}
        <p className="ops-note">Pesos de tus comprobantes. Acá no aparece el medio de pago ni una comisión.</p>
      </section>

      <section className="ops-card">
        <h3>Tus productos</h3>
        <div className="ops-table-wrap">
          <table className="ops-table">
            <thead>
              <tr><th>Producto</th><th>Estado</th><th>Precio</th></tr>
            </thead>
            <tbody>
              {rows.contracts.length ? rows.contracts.map((row) => (
                <tr key={row.id}>
                  <td>{row.product_name}</td>
                  <td><span className={`ops-status is-${row.status}`}>{STATUS_LABEL[row.status as DealStatus] || row.status}</span></td>
                  <td>{formatUsd(row.sold_price_usd)}</td>
                </tr>
              )) : <tr><td colSpan={3}>Todavía no hay un producto.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
