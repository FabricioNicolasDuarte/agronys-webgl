"use client";

import type { DeskAlert } from "@/components/cuenta/alerts";

export function Alertas({ alerts }: { alerts: DeskAlert[] }) {
  const asOf = new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  const month = asOf.charAt(0).toUpperCase() + asOf.slice(1);
  return (
    <div className="ops">
      <header>
        <div className="ops-head">
          <div>
            <p className="ops-kicker">Operación</p>
            <h2>Alertas</h2>
          </div>
          <p className="ops-asof">{month}</p>
        </div>
        <p className="ops-note">Avisos de lo que está cargado: una demo que vence en 30 días, una venta aceptada sin factura, o un reparto que no suma 100. No hay otros avisos.</p>
      </header>
      {alerts.length ? (
        <ul className="ops-alerts is-stack">
          {alerts.map((alert) => (
            <li key={alert.id} className="is-attention">
              <span className="ops-kicker">{alert.kind}</span>
              <strong>{alert.title}</strong>
              <span>{alert.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <section className="ops-card">
          <h3>Nada para avisar</h3>
          <p className="ops-note">Con lo que podés ver, no hay una demo por vencer, una venta aceptada sin factura ni un reparto incompleto.</p>
        </section>
      )}
    </div>
  );
}
