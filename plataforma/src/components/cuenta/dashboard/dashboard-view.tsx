"use client";

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
import { billingFor, markets, MARKET_LABEL } from "@/lib/fiscal/billing";
import {
  demoSituation,
  dealsByStatus,
  fiscalUse,
  formatArs,
  formatPercent,
  formatUsd,
  payoutDue,
  situationAlerts,
  STATUS_LABEL,
  type Situation,
  type SituationInvoice,
  type SituationPart,
} from "@/components/cuenta/dashboard/situation";

const LIME = "#d6ff3e";
const EMERALD = "#00e39a";
const MINT = "#7dffc3";
const DEEP = "#14b87a";
const INK = "#93cbb4";
const GRID = "#164838";

const PART_KIND = {
  sales_commission: "Comisión de venta",
  dev_split: "Parte de co-desarrollo",
} as const;

const STATUS_FILL: Record<string, string> = {
  assigned: LIME,
  accepted: MINT,
  invoiced: EMERALD,
  paid: DEEP,
};

function ArsBar(props: { x?: number; y?: number; width?: number; height?: number; fill?: string; ars?: number }) {
  const x = props.x ?? 0;
  const y = props.y ?? 0;
  const width = props.width ?? 0;
  const height = props.height ?? 0;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={10} fill={props.fill} />
      <text x={x + width + 10} y={y + height / 2} dominantBaseline="middle" fill="#f3fff7" fontSize={12}>
        {formatArs(Number(props.ars ?? 0))}
      </text>
    </g>
  );
}

function UsdBar(props: { x?: number; y?: number; width?: number; height?: number; index?: number; payload?: SituationPart }) {
  const x = props.x ?? 0;
  const y = props.y ?? 0;
  const width = props.width ?? 0;
  const height = props.height ?? 0;
  const fills = [LIME, EMERALD, MINT, EMERALD];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={10} fill={fills[props.index ?? 0] || EMERALD} />
      <text x={x + width + 10} y={y + height / 2} dominantBaseline="middle" fill="#f3fff7" fontSize={12}>
        {formatUsd(props.payload?.usd ?? 0)}
      </text>
    </g>
  );
}

function InvoiceTip({ active, payload }: { active?: boolean; payload?: Array<{ payload?: SituationInvoice }> }) {
  if (!active || !payload?.[0]?.payload) return null;
  const row = payload[0].payload;
  return (
    <div className="ops-tip">
      <strong>{row.label}</strong>
      <span>{formatArs(row.ars)}</span>
      <span>{formatUsd(row.usd)} al tipo 1.400</span>
    </div>
  );
}

function PartTip({ active, payload }: { active?: boolean; payload?: Array<{ payload?: SituationPart }> }) {
  if (!active || !payload?.[0]?.payload) return null;
  const row = payload[0].payload;
  return (
    <div className="ops-tip">
      <strong>{row.payee}</strong>
      <span>{PART_KIND[row.kind]}</span>
      <span>{formatUsd(row.usd)}</span>
    </div>
  );
}

function InvoiceChart({ invoices }: { invoices: SituationInvoice[] }) {
  return (
    <div className="ops-plot" role="img" aria-label="Facturado en pesos por comprobante">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={invoices} layout="vertical" margin={{ top: 8, right: 108, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="ops-bar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={EMERALD} />
              <stop offset="100%" stopColor={LIME} />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={false} stroke={GRID} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            width={92}
            axisLine={false}
            tickLine={false}
            tick={{ fill: INK, fontSize: 12 }}
          />
          <Tooltip content={<InvoiceTip />} cursor={{ fill: "rgba(214, 255, 62, 0.08)" }} />
          <Bar dataKey="ars" fill="url(#ops-bar)" barSize={18} shape={<ArsBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatusDonut({ situation }: { situation: Situation }) {
  const rows = dealsByStatus(situation).map((row) => ({
    ...row,
    name: STATUS_LABEL[row.status],
  }));
  return (
    <div>
      <div className="ops-plot ops-plot-short ops-donut" role="img" aria-label="Ventas agrupadas por estado">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={rows}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={96}
              paddingAngle={3}
              stroke="#082018"
              strokeWidth={3}
              isAnimationActive={false}
            >
              {rows.map((row) => (
                <Cell key={row.status} fill={STATUS_FILL[row.status] || EMERALD} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const row = payload[0].payload as { name: string; count: number };
                return (
                  <div className="ops-tip">
                    <strong>{row.name}</strong>
                    <span>{row.count} {row.count === 1 ? "venta" : "ventas"}</span>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <p className="ops-gauge-read">
          <strong>{situation.deals.length}</strong>
          <span>ventas</span>
        </p>
      </div>
      <ul className="ops-legend">
        {rows.map((row) => (
          <li key={row.status}>
            <i style={{ background: STATUS_FILL[row.status] || EMERALD }} />
            {row.name} · {row.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FiscalGauge({ use }: { use: number }) {
  const value = Math.round(use * 1000) / 10;
  return (
    <div className="ops-gauge">
      <div className="ops-plot ops-plot-short" role="img" aria-label={`Uso del tope ${formatPercent(use)}`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius={78}
            outerRadius={108}
            data={[{ name: "Uso", value, fill: EMERALD }]}
            startAngle={210}
            endAngle={-30}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background={{ fill: "#1a4d38" }} dataKey="value" cornerRadius={12} isAnimationActive={false} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="ops-gauge-read">
        <strong>{formatPercent(use)}</strong>
        <span>del tope K</span>
      </p>
    </div>
  );
}

function PayoutChart({ parts }: { parts: SituationPart[] }) {
  return (
    <div className="ops-plot" role="img" aria-label="Partes a liquidar en dólares">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={parts} layout="vertical" margin={{ top: 8, right: 88, left: 8, bottom: 0 }}>
          <CartesianGrid horizontal={false} stroke={GRID} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="payee"
            width={148}
            axisLine={false}
            tickLine={false}
            tick={{ fill: INK, fontSize: 12 }}
          />
          <Tooltip content={<PartTip />} cursor={{ fill: "rgba(214, 255, 62, 0.08)" }} />
          <Bar dataKey="usd" barSize={16} shape={<UsdBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Dashboard({ situation = demoSituation }: { situation?: Situation }) {
  const use = fiscalUse(situation);
  const open = situation.deals.filter((deal) => deal.status !== "paid" && deal.status !== "void").length;
  const due = payoutDue(situation);
  const alerts = situationAlerts(situation);

  return (
    <div className="ops">
      <header>
        <div className="ops-head">
          <div>
            <p className="ops-kicker">Operación</p>
            <h2>Estado de situación</h2>
          </div>
          <p className="ops-asof">{situation.asOf}</p>
        </div>
        <p className="ops-note">{situation.source}</p>
      </header>

      <ul className="ops-alerts">
        {alerts.map((alert) => (
          <li key={alert.title} className={alert.tone === "attention" ? "is-attention" : ""}>
            <strong>{alert.title}</strong>
            <span>{alert.text}</span>
          </li>
        ))}
      </ul>

      <section className="ops-kpis" aria-label="Indicadores de la operación">
        <article>
          <p>Facturado</p>
          <strong>{formatArs(situation.fiscal.invoicedArs)}</strong>
          <span>{situation.invoices.length} comprobantes guardados en la base</span>
        </article>
        <article>
          <p>Uso del tope</p>
          <strong>{formatPercent(use)}</strong>
          <span>Tope K de referencia {formatArs(situation.fiscal.capArs)}</span>
        </article>
        <article>
          <p>Ventas abiertas</p>
          <strong>{open}</strong>
          <span>{situation.deals.length} en el libro, {situation.deals.length - open} cobradas</span>
        </article>
        <article>
          <p>A liquidar</p>
          <strong>{formatUsd(due)}</strong>
          <span>{situation.parts.length} partes pendientes · infra {formatUsd(situation.infraUsd)} aparte</span>
        </article>
      </section>

      <div className="ops-grid">
        <section className="ops-card">
          <h3>Facturación por producto</h3>
          <InvoiceChart invoices={situation.invoices} />
          <p className="ops-note">Cada comprobante guarda el tipo de cambio con el que se emitió. No es una consulta al Banco Nación.</p>
        </section>
        <section className="ops-card">
          <h3>Tope de categoría</h3>
          <FiscalGauge use={use} />
          <p className="ops-note">El tope K es una referencia desde agosto de 2026. No es la categoría real del monotributo.</p>
        </section>
      </div>

      <div className="ops-grid ops-grid-even">
        <section className="ops-card">
          <h3>Ventas por estado</h3>
          <StatusDonut situation={situation} />
        </section>
        <section className="ops-card">
          <h3>Partes a liquidar</h3>
          <PayoutChart parts={situation.parts} />
          <p className="ops-note">La infraestructura no entra en el reparto. El cliente paga solo al superadmin.</p>
        </section>
      </div>

      <section className="ops-card">
        <h3>Cómo se factura</h3>
        <ul className="ops-markets">
          {markets().map((rule) => (
            <li key={rule.country}>
              <strong>{MARKET_LABEL[rule.country]} · {rule.document}</strong>
              <span>{rule.notice}</span>
            </li>
          ))}
        </ul>
        <p className="ops-note">Argentina se factura con C. Paraguay y Uruguay, con factura E y su CUIT país. El sistema no consulta ARCA, la DNIT ni la DGI, y no busca la cotización: la carga quien emite.</p>
      </section>

      <section className="ops-card">
        <h3>Libro de ventas</h3>
        <div className="ops-table-wrap">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Establecimiento</th>
                <th>Estado</th>
                <th>Precio</th>
                <th>Lectura</th>
              </tr>
            </thead>
            <tbody>
              {situation.deals.map((deal) => (
                <tr key={deal.id}>
                  <td>{deal.product}</td>
                  <td>{deal.organization}</td>
                  <td><span className={`ops-status is-${deal.status}`}>{STATUS_LABEL[deal.status]}</span></td>
                  <td>{formatUsd(deal.soldUsd)}</td>
                  <td>{billingFor("AR").document}. {deal.reading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
