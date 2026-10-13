"use client";

import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { MARKET_LABEL, PARTY_LABEL, isMarket, isParty } from "@/lib/fiscal/billing";

type Org = {
  legal_name: string;
  country: string;
  party: string;
  tax_id: string | null;
};

type Usage = {
  id: string;
  occurred_on: string;
  metric: string;
  value: number;
  product_name: string;
};

export function EstablishmentDesk({ db }: { db: SupabaseClient }) {
  const [org, setOrg] = useState<Org | null>(null);
  const [usage, setUsage] = useState<Usage[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    db.from("organizations").select("legal_name, country, party, tax_id").maybeSingle().then(({ data, error }) => {
      if (error) setMsg(error.message);
      else setOrg(data);
    });
    db.from("client_usage").select("id, occurred_on, metric, value, product_name").order("occurred_on", { ascending: false }).then(({ data, error }) => {
      if (error) setMsg(error.message);
      else setUsage(data || []);
    });
  }, [db]);
  const country = org && isMarket(org.country) ? MARKET_LABEL[org.country] : org?.country;
  const party = org && isParty(org.party) ? PARTY_LABEL[org.party] : org?.party;

  return (
    <div className="desk">
      <header className="desk-head">
        <div>
          <p className="ops-kicker">Cuenta</p>
          <h2>Establecimiento</h2>
          <p className="desk-lead">Datos que cargó Agronys. El alta y los cambios los hace la casa.</p>
        </div>
      </header>
      {msg ? <p className="err">{msg}</p> : null}
      {org ? (
        <section className="desk-card">
          <h3>{org.legal_name}</h3>
          <p>{country} · {party}</p>
          <p>{org.tax_id || "Sin identificación fiscal cargada"}</p>
        </section>
      ) : <p className="muted">Tu usuario todavía no tiene un establecimiento asignado.</p>}
      <section className="desk-card">
        <h3>Uso registrado</h3>
        <table>
          <thead><tr><th>Fecha</th><th>Producto</th><th>Medida</th><th>Valor</th></tr></thead>
          <tbody>
            {usage.length ? usage.map((row) => (
              <tr key={row.id}>
                <td>{new Date(`${row.occurred_on}T12:00:00`).toLocaleDateString("es-AR")}</td>
                <td>{row.product_name}</td>
                <td>{row.metric}</td>
                <td>{Number(row.value).toLocaleString("es-AR")}</td>
              </tr>
            )) : <tr><td colSpan={4}>Agronys todavía no cargó uso de tus productos.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  );
}
