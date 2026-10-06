"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/site/lang-switch";
import { INFO } from "@/i18n/info";

const LINKS = [
  ["/quienes-somos", "about"],
  ["/aviso-legal", "notice"],
  ["/privacidad", "privacy"],
  ["/cookies", "cookies"],
  ["/terminos", "terms"],
  ["/accesibilidad", "a11y"],
  ["/faq", "faq"],
] as const;

export function SiteNotch() {
  const pack = INFO[useLang()];
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={open ? "edge-notch is-open" : "edge-notch"} ref={root}>
      {open && (
        <nav className="edge-menu" aria-label={pack.menu}>
          {LINKS.map(([href, key]) => (
            <Link key={href} href={href} aria-current={path === href ? "page" : undefined} onClick={() => setOpen(false)}>
              {pack.links[key]}
            </Link>
          ))}
        </nav>
      )}
      <button
        type="button"
        className="edge-notch-btn"
        aria-expanded={open}
        aria-label={pack.menu}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 11.2v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="8" r="0.9" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
