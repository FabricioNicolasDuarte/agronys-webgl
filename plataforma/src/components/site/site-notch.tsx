"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/site/lang-switch";
import { INFO } from "@/i18n/info";

const LINKS = [
  ["/empresa", "about"],
  ["/aviso-legal", "notice"],
  ["/privacidad", "privacy"],
  ["/cookies", "cookies"],
  ["/terminos", "terms"],
  ["/accesibilidad", "a11y"],
  ["/faq", "faq"],
] as const;

export function InfoMenu({ place = "dock" }: { place?: "dock" | "foot" }) {
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
    <div className={open ? `info-slot is-${place} is-open` : `info-slot is-${place}`} ref={root}>
      <button
        type="button"
        className={place === "dock" ? "dock-link info-open" : "info-open"}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={pack.menu}
        onClick={() => setOpen((value) => !value)}
      >
        {pack.chip}
      </button>
      {open && (
        <nav className="info-menu" aria-label={pack.menu}>
          {LINKS.map(([href, key]) => (
            <Link key={href} href={href} aria-current={path === href ? "page" : undefined} onClick={() => setOpen(false)}>
              {pack.links[key]}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
