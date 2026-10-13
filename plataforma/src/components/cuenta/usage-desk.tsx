"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Act } from "@/components/cuenta/desk-actions";

type UsageRow = {
  id: string;
  organization_id: string;
  product_id: string;
  occurred_on: string;
  metric: string;
  value: number;
};

export function UsageDesk({ db }: { db: SupabaseClient }) {
  const [rows, setRows] = useState<UsageRow[]>([]);
  const [orgs, setOrgs] = useState<{ id: string; legal_name: string }[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [msg, setMsg] = useState("");
  const [creating, setCreating] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    db.from("app_usage").select("id, organization_id, product_id, occurred_on, metric, value").order("occurred_on", { ascending: false }).then(({ data }) => setRows(data || []));
    db.from("organizations").select("id, legal_name").order("legal_name").then(({ data }) => setOrgs(data || []));
    db.from("products").select("id, name").order("name").then(({ data }) => setProducts(data || []));
  }, [db, tick]);

  const orgName = new Map(orgs.map((item) => [item.id, item.legal_name]));
  const productName = new Map(products.map((item) => [item.id, item.name]));

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const metric = String(form.get("metric")).trim();
    const value = Number(form.get("value"));
    if (!metric) {
      setMsg("La medida necesita un nombre.");
      return;
    }
    if (!Number.isFinite(value)) {
      setMsg("El valor tiene que ser un número.");
      return;
    }
    const { error } = await db.from("app_usage").insert({
      organization_id: form.get("organization_id"),
      product_id: form.get("product_id"),
      occurred_on: form.get("occurred_on"),
      metric,
      value,
    });
    if (error) setMsg(error.message);
    else {
      setMsg("");
      setCreating(false);
      setTick((n) => n + 1);
    }
  }

  return (
    <div className="desk">
      <header className="desk-head">
        <div>
          <p className="ops-kicker">Casa</p>
          <h2>Uso</h2>
          <p className="desk-lead">Registro manual por establecimiento y producto. Nutrogan y SIGAG todavía no envían estos números.</p>
        </div>
        <Act name={creating ? "close" : "plus"} title={creating ? "Cerrar" : "Nuevo"} tone="primary" onClick={() => setCreating((value) => !value)} />
      </header>
      {creating ? (
        <form className="desk-card row" onSubmit={create}>
          <select name="organization_id" required>{orgs.map((item) => <option key={item.id} value={item.id}>{item.legal_name}</option>)}</select>
          <select name="product_id" required>{products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
          <label>Fecha<input name="occurred_on" type="date" required /></label>
          <label>Medida<input name="metric" required placeholder="Nombre de la medida" /></label>
          <label>Valor<input name="value" type="number" step="any" required /></label>
          <Act name="plus" title="Cargar" tone="primary" type="submit" />
        </form>
      ) : null}
      {msg ? <p className="err">{msg}</p> : null}
      <table>
        <thead><tr><th>Fecha</th><th>Establecimiento</th><th>Producto</th><th>Medida</th><th>Valor</th><th></th></tr></thead>
        <tbody>
          {rows.length ? rows.map((row) => (
            <tr key={row.id}>
              <td>{new Date(`${row.occurred_on}T12:00:00`).toLocaleDateString("es-AR")}</td>
              <td>{orgName.get(row.organization_id) || "—"}</td>
              <td>{productName.get(row.product_id) || "—"}</td>
              <td>{row.metric}</td>
              <td>{Number(row.value).toLocaleString("es-AR")}</td>
              <td>
                <Act name="remove" title="Borrar" tone="danger" onClick={async () => {
                  const { error } = await db.from("app_usage").delete().eq("id", row.id);
                  if (error) setMsg(error.message);
                  else setTick((n) => n + 1);
                }} />
              </td>
            </tr>
          )) : <tr><td colSpan={6}>No hay uso cargado.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
