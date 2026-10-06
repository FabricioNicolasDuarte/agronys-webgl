"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { services, WA } from "@/content/site";

const KINDS = [
  { id: "todo", label: "Todo" },
  { id: "celular", label: "Dispositivos" },
  { id: "drones", label: "Drones" },
  { id: "sensores", label: "Sensores" },
  { id: "automatizacion", label: "Automatización" },
] as const;

type Kind = (typeof KINDS)[number]["id"];
type Tone = Exclude<Kind, "todo">;

const TONE: Record<Tone, string> = {
  celular: "#ffc000",
  drones: "#49ecfd",
  sensores: "#6dff9a",
  automatizacion: "#ff9a3c",
};

const GROUPS = KINDS.flatMap((item) => (item.id === "todo" ? [] : [{ id: item.id, label: item.label }]));

export function ServiceBoard() {
  const [kind, setKind] = useState<Kind>("todo");
  const [puntaOnly, setPuntaOnly] = useState(false);
  const [armed, setArmed] = useState<string[]>([]);
  const notchRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ x: 4, w: 72 });

  useLayoutEffect(() => {
    const root = notchRef.current;
    if (!root) return;
    const place = () => {
      const btn = root.querySelector<HTMLButtonElement>(`[data-kind="${kind}"]`);
      if (!btn) return;
      const host = root.getBoundingClientRect();
      const box = btn.getBoundingClientRect();
      setThumb({ x: box.left - host.left, w: box.width });
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(root);
    window.addEventListener("resize", place);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [kind]);

  const visible = useMemo(
    () => services.filter((item) => (kind === "todo" || item.kind === kind) && (!puntaOnly || item.band === "punta")),
    [kind, puntaOnly],
  );

  const bars = GROUPS.map((group) => ({
    ...group,
    offer: services.filter((item) => item.kind === group.id).length,
    on: services.filter((item) => item.kind === group.id && armed.includes(item.title)).length,
  }));
  const max = Math.max(...bars.map((bar) => bar.offer), 1);
  const active = services.filter((item) => armed.includes(item.title));

  const toggle = (title: string) => {
    setArmed((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]));
  };

  const message = active.length
    ? `Hola, quiero armar mi campo con: ${active.map((item) => item.title).join(", ")}.`
    : "Hola, quiero armar el equipo de mi campo: dispositivos, drones, sensores o automatización.";

  return (
    <section className="svc-board">
      <header className="svc-intro">
        <p className="eyebrow">Simulación</p>
        <h1>Simulá tu equipo</h1>
        <p className="lead">
          Prendé lo que viste en <Link href="/servicios">Servicios</Link>. El gráfico arma la combinación y el pedido sale con eso.
        </p>
        <div className="svc-toolbar">
          {active.length > 0 ? (
            <p className="svc-island is-live">
              <span />
              {active.length} en tu equipo
            </p>
          ) : null}
          <div className="svc-notch" ref={notchRef} role="tablist" aria-label="Tipo de servicio">
            <i className="svc-notch-thumb" style={{ width: thumb.w, transform: `translateX(${thumb.x}px)` }} />
            {KINDS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                data-kind={item.id}
                aria-selected={kind === item.id}
                onClick={() => setKind(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="svc-filter">
            <button
              type="button"
              className="svc-switch"
              role="switch"
              aria-checked={puntaOnly}
              onClick={() => setPuntaOnly((value) => !value)}
            >
              <i />
            </button>
            Solo inversión grande
          </label>
        </div>
      </header>

      <div className="svc-layout">
        <div className="svc-grid" key={`${kind}-${puntaOnly}`}>
          {visible.length === 0 ? (
            <p className="svc-empty">Esa combinación no tiene piezas. Los dispositivos cubren el día de trabajo. La inversión grande está en drones, sensores y automatización.</p>
          ) : (
            visible.map((item, index) => {
              const on = armed.includes(item.title);
              return (
                <article key={item.title} className={on ? "svc-card is-on" : "svc-card"} style={{ animationDelay: `${index * 42}ms` }}>
                  <div className="svc-card-top">
                    <img src={item.icon} alt="" width={22} height={22} />
                    <button
                      type="button"
                      className="svc-switch"
                      role="switch"
                      aria-checked={on}
                      aria-label={on ? `Sacar ${item.title}` : `Sumar ${item.title}`}
                      onClick={() => toggle(item.title)}
                    >
                      <i />
                    </button>
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </article>
              );
            })
          )}
        </div>
      </div>

      <section className="svc-console" aria-labelledby="svc-sim-title">
        <div>
          <p className="svc-console-kicker">Simulación</p>
          <h2 id="svc-sim-title">Así queda</h2>
          <ul className="svc-chart">
            {bars.map((bar) => (
              <li key={bar.id}>
                <span>{bar.label}</span>
                <span className="svc-track" aria-hidden="true">
                  <i style={{ width: `${(bar.offer / max) * 100}%`, background: `${TONE[bar.id]}33` }} />
                  <b style={{ width: `${(bar.on / max) * 100}%`, background: TONE[bar.id] }} />
                </span>
                <strong>{bar.on}</strong>
              </li>
            ))}
          </ul>
          <p className="svc-chart-note">
            {active.length
              ? "Cada barra es lo que prendiste. Así de completo queda el campo."
              : "Prendé un servicio y esta simulación muestra el equipo antes de pedirlo."}
          </p>
        </div>
        <div className="svc-sim-side">
          {active.length > 0 ? (
            <ul className="svc-picked">
              {active.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
          ) : null}
          <a className="svc-cta" href={`${WA}?text=${encodeURIComponent(message)}`}>
            {active.length ? "Quiero este equipo" : "Quiero armar mi campo"}
          </a>
          {active.length > 0 ? (
            <button type="button" className="svc-clear" onClick={() => setArmed([])}>
              Vaciar equipo
            </button>
          ) : null}
        </div>
      </section>
    </section>
  );
}
