"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Act } from "@/components/cuenta/desk-actions";

type FiscalRow = {
  category: string;
  annual_gross_cap_ars: number;
  alert_ratio: number;
  valid_from: string;
  note: string;
};

export function FiscalDesk({ db }: { db: SupabaseClient }) {
  const [row, setRow] = useState<FiscalRow | null>(null);
  const [msg, setMsg] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    db.from("fiscal_parameters")
      .select("category, annual_gross_cap_ars, alert_ratio, valid_from, note")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) setMsg(error.message);
        else setRow(data);
      });
  }, [db, tick]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const percent = Number(form.get("percent"));
    const cap = Number(form.get("cap"));
    if (!Number.isFinite(percent) || percent <= 0 || percent > 100) {
      setMsg("El aviso tiene que estar entre 1 y 100.");
      return;
    }
    if (!Number.isFinite(cap) || cap <= 0) {
      setMsg("El tope tiene que ser mayor a cero.");
      return;
    }
    const { error } = await db.from("fiscal_parameters").update({
      category: String(form.get("category")).trim(),
      annual_gross_cap_ars: cap,
      alert_ratio: percent / 100,
      valid_from: String(form.get("valid_from")),
      note: String(form.get("note")).trim(),
    }).eq("id", 1);
    setMsg(error ? error.message : "Tope guardado. La alerta usa este valor.");
    if (!error) setTick((value) => value + 1);
  }

  return (
    <div className="desk">
      <header className="desk-head">
        <div>
          <p className="ops-kicker">Casa</p>
          <h2>Tope fiscal</h2>
          <p className="desk-lead">Referencia para avisar cuando el facturado de 12 meses se acerca al tope cargado. No consulta ARCA ni confirma la categoría del titular.</p>
        </div>
      </header>
      {row ? (
        <form key={`${row.category}-${row.valid_from}-${row.annual_gross_cap_ars}-${row.alert_ratio}`} className="desk-card grid" onSubmit={save}>
          <label>Categoría de referencia
            <input name="category" defaultValue={row.category} required />
          </label>
          <label>Tope anual (ARS)
            <input name="cap" type="number" min={1} step="0.01" defaultValue={row.annual_gross_cap_ars} required />
          </label>
          <label>Avisar al llegar a (%)
            <input name="percent" type="number" min={1} max={100} step="0.1" defaultValue={Math.round(Number(row.alert_ratio) * 1000) / 10} required />
          </label>
          <label>Vigente desde
            <input name="valid_from" type="date" defaultValue={String(row.valid_from).slice(0, 10)} required />
          </label>
          <label>Nota
            <input name="note" defaultValue={row.note} required />
          </label>
          <Act name="save" title="Guardar" tone="primary" type="submit" />
        </form>
      ) : <p className="muted">No hay un tope cargado.</p>}
      {msg ? <p className={msg.startsWith("Tope guardado") ? "muted" : "err"}>{msg}</p> : null}
    </div>
  );
}
