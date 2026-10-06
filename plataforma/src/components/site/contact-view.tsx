"use client";

import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { MAIL, WA } from "@/content/site";
import { PAGES } from "@/i18n/pages";
import { useEffect, useRef, useState } from "react";

const ZONES: { cls: string; id: string; label: string }[] = [
  { cls: "cls-29", id: "formosa", label: "rep Formosa" },
  { cls: "cls-3", id: "chaco", label: "rep Chaco" },
  { cls: "cls-15", id: "corrientes", label: "rep Corrientes" },
  { cls: "cls-18", id: "santafe", label: "rep Santa Fe" },
  { cls: "cls-24", id: "entrerios", label: "rep Entre Ríos" },
  { cls: "cls-2", id: "misiones", label: "rep Misiones" },
  { cls: "cls-8", id: "paraguay", label: "rep Paraguay" },
  { cls: "cls-16", id: "uruguay", label: "rep Uruguay" },
];

type Tip = { id: string; label: string; x: number; y: number; below: boolean };

export function ContactView({ mapSvg }: { mapSvg: string }) {
  const copy = PAGES[useLang()].contact;
  usePageTitle(copy.meta);
  const stage = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const hideTimer = useRef<number | null>(null);

  const tipId = useRef<string | null>(null);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    for (const zone of ZONES) {
      root.querySelectorAll(`path.${zone.cls}`).forEach((path) => {
        path.classList.add("zone");
        path.setAttribute("data-zone", zone.id);
        path.setAttribute("data-label", zone.label);
        path.setAttribute("role", "link");
        path.setAttribute("tabindex", "0");
        path.setAttribute("aria-label", zone.label);
      });
    }

    const place = (path: SVGPathElement, clientX: number, clientY: number) => {
      const host = root.getBoundingClientRect();
      const rawX = clientX - host.left;
      const y = clientY - host.top;
      tipId.current = path.dataset.zone || "";
      setTip({
        id: tipId.current,
        label: path.dataset.label || "",
        x: Math.min(host.width - 88, Math.max(88, rawX)),
        y,
        below: y < 72,
      });
    };

    const clearHide = () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };

    const onOver = (event: PointerEvent) => {
      const path = (event.target as Element).closest?.("path.zone") as SVGPathElement | null;
      if (!path) return;
      clearHide();
      place(path, event.clientX, event.clientY);
    };

    const onOut = (event: PointerEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && root.contains(next) && (next as Element).closest?.(".zone-tip, path.zone")) return;
      clearHide();
      hideTimer.current = window.setTimeout(() => {
        tipId.current = null;
        setTip(null);
      }, 160);
    };

    const open = () => window.open(WA, "_blank", "noopener,noreferrer");

    const onClick = (event: Event) => {
      const path = (event.target as Element).closest?.("path.zone");
      if (!path) return;
      open();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const path = (event.target as Element).closest?.("path.zone");
      if (!path) return;
      event.preventDefault();
      open();
    };

    const onFocus = (event: FocusEvent) => {
      const path = (event.target as Element).closest?.("path.zone") as SVGPathElement | null;
      if (!path) return;
      const box = path.getBoundingClientRect();
      place(path, box.left + box.width / 2, box.top + 24);
    };

    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointermove", onOver);
    root.addEventListener("pointerout", onOut);
    root.addEventListener("click", onClick);
    root.addEventListener("focusin", onFocus);
    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointermove", onOver);
      root.removeEventListener("pointerout", onOut);
      root.removeEventListener("click", onClick);
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("keydown", onKey);
      clearHide();
    };
  }, [mapSvg]);

  return (
    <div className="contact-page">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.h1}</h1>
      <p className="lead">{copy.lead}</p>
      <div className="contact-actions">
        <a className="reach-btn" href={MAIL}>
          <EnvelopeSimple className="reach-ico" size={28} weight="duotone" aria-hidden="true" />
          <span>{copy.mail}</span>
        </a>
        <a className="reach-btn" href={WA} target="_blank" rel="noopener noreferrer">
          <WhatsappLogo className="reach-ico" size={28} weight="duotone" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>
      <section className="presence" aria-label={copy.presence}>
        <p className="eyebrow">{copy.presence}</p>
        <div className="rep-stage" ref={stage}>
          <div className="rep-map" dangerouslySetInnerHTML={{ __html: mapSvg }} />
          {tip && (
            <a
              className={tip.below ? "zone-tip is-below" : "zone-tip"}
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{ left: tip.x, top: tip.y }}
              onPointerEnter={() => {
                if (hideTimer.current) window.clearTimeout(hideTimer.current);
              }}
            >
              <WhatsappLogo size={22} weight="duotone" aria-hidden="true" />
              <b>{tip.label}</b>
            </a>
          )}
        </div>
        <p className="presence-foot">{copy.foot}</p>
        <p className="presence-soon">{copy.soon}</p>
      </section>
    </div>
  );
}
