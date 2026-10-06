"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { bootLang, COPY, getLang, LANGS, setLang, subscribeLang, type Lang } from "@/i18n/lang";

const LINKS = [
  ["/quienes-somos", "about"],
  ["/enfoque", "approach"],
  ["/servicios", "services"],
  ["/productos", "products"],
  ["/contacto", "contact"],
] as const;

export function useLang() {
  return useSyncExternalStore(subscribeLang, getLang, () => "es" as Lang);
}

export function usePageTitle(title: string) {
  useEffect(() => {
    const apply = () => {
      if (document.title !== title) document.title = title;
    };
    apply();
    const node = document.querySelector("title");
    if (!node) return;
    const observer = new MutationObserver(apply);
    observer.observe(node, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [title]);
}

export function LangSwitch() {
  const lang = useLang();
  const copy = COPY[lang];
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bootLang();
  }, []);
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
    <div className={open ? "lang-switch is-open" : "lang-switch"} ref={root}>
      <button
        type="button"
        className="lang-toggle"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={copy.langLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="12" cy="12" rx="3.3" ry="8.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4.2 12h15.6M5.4 8.4h13.2M5.4 15.6h13.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <div className="lang-menu" role="group" aria-label={copy.langLabel}>
        {LANGS.map((item) => (
          <button
            key={item.id}
            type="button"
            data-lang={item.id}
            title={item.title}
            aria-label={item.title}
            aria-pressed={lang === item.id}
            onClick={() => {
              setLang(item.id);
              setOpen(false);
            }}
          >
            <span className="lang-short">{item.label}</span>
            <span className="lang-full">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DockLinks({ portal = false }: { portal?: boolean }) {
  const lang = useLang();
  const path = usePathname();
  const first = useRef<HTMLAnchorElement>(null);
  const copy = COPY[lang];
  const items = portal ? ([["/" as const, "portal" as const], ...LINKS] as const) : LINKS;
  useEffect(() => {
    first.current?.closest("nav")?.setAttribute("aria-label", copy.navLabel);
  }, [copy.navLabel]);
  return (
    <>
      {items.map(([href, key], index) => (
        <Link key={`${lang}-${href}`} ref={index === 0 ? first : undefined} className="dock-link" href={href} aria-current={path === href ? "page" : undefined}>
          {copy.nav[key]}
        </Link>
      ))}
    </>
  );
}
