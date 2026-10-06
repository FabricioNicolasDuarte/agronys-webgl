"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { services, WA, type ServiceId } from "@/content/site";
import { PAGES } from "@/i18n/pages";

const FAMILIES = [
  {
    id: "celular",
    label: "Dispositivos",
    line: "Teléfono, tablet o computadora. Según el proyecto se elige APK o PWA.",
    tone: "#f3d48a",
    video: "/media/bg/dispositivos.mp4?v=3",
  },
  {
    id: "drones",
    label: "Drones",
    line: "El lote entero, desde el aire, en el momento justo.",
    tone: "#f4efe4",
    video: "/media/bg/drones.mp4?v=3",
  },
  {
    id: "sensores",
    label: "Sensores",
    line: "Agua, animal, peso y clima te avisan antes.",
    tone: "#e7c27a",
    video: "/media/bg/sensores.mp4?v=5",
  },
  {
    id: "automatizacion",
    label: "Automatización",
    line: "Manga, comida, cerco y agua trabajan solos.",
    tone: "#e8944a",
    video: "/media/bg/automatizacion.mp4?v=3",
  },
] as const;

const MARKS: Record<ServiceId, string[]> = {
  herd: ["/icons/ganaderia.svg", "/icons/datos.svg", "/icons/offline.svg"],
  camera: ["/icons/vision.svg", "/icons/ganaderia.svg", "/icons/orquestacion.svg"],
  alert: ["/icons/orquestacion.svg", "/icons/satelital.svg", "/icons/datos.svg"],
  paddock: ["/icons/agro.svg", "/icons/satelital.svg", "/icons/ganaderia.svg"],
  grass: ["/icons/satelital.svg", "/icons/agro.svg", "/icons/vision.svg"],
  daylog: ["/icons/datos.svg", "/icons/offline.svg", "/icons/agro.svg"],
  autoalert: ["/icons/automat.svg", "/icons/orquestacion.svg", "/icons/datos.svg"],
  numbers: ["/icons/dataeng.svg", "/icons/agro.svg", "/icons/ganaderia.svg"],
  offline: ["/icons/offline.svg", "/icons/datos.svg", "/icons/ganaderia.svg"],
  droneCount: ["/icons/vision.svg", "/icons/ganaderia.svg", "/icons/satelital.svg"],
  droneApply: ["/icons/satelital.svg", "/icons/agro.svg", "/icons/automat.svg"],
  water: ["/icons/datos.svg", "/icons/agro.svg", "/icons/orquestacion.svg"],
  collar: ["/icons/ganaderia.svg", "/icons/vision.svg", "/icons/orquestacion.svg"],
  scale: ["/icons/dataeng.svg", "/icons/ganaderia.svg", "/icons/datos.svg"],
  station: ["/icons/orquestacion.svg", "/icons/satelital.svg", "/icons/agro.svg"],
  fence: ["/icons/orquestacion.svg", "/icons/agro.svg", "/icons/offline.svg"],
  feeder: ["/icons/automat.svg", "/icons/ganaderia.svg", "/icons/dataeng.svg"],
  chute: ["/icons/ganaderia.svg", "/icons/automat.svg", "/icons/datos.svg"],
  pump: ["/icons/agro.svg", "/icons/automat.svg", "/icons/offline.svg"],
};

type FamilyId = (typeof FAMILIES)[number]["id"] | "todo";

function ToneIcon({ src, tone, size }: { src: string; tone: string; size: number }) {
  return (
    <span
      className="tone-icon"
      style={{
        width: size,
        height: size,
        background: tone,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
      }}
    />
  );
}

export function ServiceCatalog() {
  const copy = PAGES[useLang()].services;
  usePageTitle(copy.meta);
  const [current, setCurrent] = useState<FamilyId>("celular");
  const [simula, setSimula] = useState(false);
  const [armed, setArmed] = useState<ServiceId[]>([]);
  const [mounted, setMounted] = useState(false);
  const notchRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ x: 4, w: 72 });

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    const root = notchRef.current;
    if (!root) return;
    const place = () => {
      const btn = root.querySelector<HTMLButtonElement>(`[data-kind="${current}"]`);
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
  }, [current]);

  const family = FAMILIES.find((item) => item.id === current);
  const tone = family?.tone ?? "#ffc000";
  const video = family?.video ?? "/media/bg/campo.mp4?v=4";
  const visible = services.filter((item) => current === "todo" || item.kind === current);
  const picked = services.filter((item) => armed.includes(item.id));
  const message = picked.length
    ? copy.ask(picked.map((item) => copy.items[item.id].title).join(", "))
    : copy.know;

  const toggle = (id: ServiceId) => {
    setArmed((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]));
  };

  const backdrop = (
    <>
      <video key={video} className="offer-video" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
      </video>
      <div className="offer-scrim" />
    </>
  );

  return (
    <div className="offer-fit" style={{ "--tone": tone } as CSSProperties}>
      {mounted ? createPortal(backdrop, document.body) : null}
      <header className="offer-top">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.h1}</h1>
        </div>
        <button type="button" className={simula ? "offer-sim is-on" : "offer-sim"} aria-pressed={simula} onClick={() => setSimula((value) => !value)}>
          {copy.simulate}
        </button>
      </header>

      <div className="offer-bar">
        <div className="svc-notch" ref={notchRef} role="tablist" aria-label={copy.groups}>
          <i className="svc-notch-thumb" style={{ width: thumb.w, transform: `translateX(${thumb.x}px)` }} />
          <button type="button" role="tab" data-kind="todo" aria-selected={current === "todo"} onClick={() => setCurrent("todo")}>
            {copy.all}
          </button>
          {FAMILIES.map((item) => (
            <button key={item.id} type="button" role="tab" data-kind={item.id} aria-selected={current === item.id} onClick={() => setCurrent(item.id)}>
              {copy.families[item.id].label}
            </button>
          ))}
        </div>
        <p>{family ? copy.families[family.id].line : copy.allLine}</p>
      </div>

      <video key={video} className="offer-stage" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
      </video>

      <div className="offer-grid">
        {visible.map((item) => {
          const card = copy.items[item.id];
          const on = armed.includes(item.id);
          const marks = MARKS[item.id] ?? [item.icon];
          return (
            <article key={item.id} className={on ? "offer-card is-on" : "offer-card"}>
              <div className="offer-card-top">
                <span className="offer-plate">
                  <ToneIcon src={item.icon} tone={tone} size={40} />
                </span>
                {simula ? (
                  <button type="button" className="svc-switch" role="switch" aria-checked={on} aria-label={on ? copy.remove(card.title) : copy.add(card.title)} onClick={() => toggle(item.id)}>
                    <i />
                  </button>
                ) : null}
              </div>
              <h2>{card.title}</h2>
              <div className="offer-marks" aria-hidden="true">
                {marks.map((src) => (
                  <span key={src} className="offer-mark">
                    <ToneIcon src={src} tone={tone} size={16} />
                  </span>
                ))}
              </div>
              <p>{card.text}</p>
            </article>
          );
        })}
      </div>

      {simula && picked.length > 0 ? (
        <div className="offer-ask">
          <p>{copy.inTeam(picked.length)}</p>
          <a className="svc-cta" href={`${WA}?text=${encodeURIComponent(message)}`}>{copy.wantTeam}</a>
        </div>
      ) : null}

      {current !== "celular" ? (
        <p className="offer-note">{copy.hardware}</p>
      ) : null}
    </div>
  );
}
