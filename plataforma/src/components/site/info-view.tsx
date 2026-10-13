"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { CONTACT, MAIL } from "@/content/site";
import { INFO, type InfoPack } from "@/i18n/info";
import type { Lang } from "@/i18n/lang";

const BACK: Record<Lang, string> = {
  es: "Volver",
  en: "Back",
  pt: "Voltar",
  zh: "返回",
  gn: "Ejevy",
};

export function LegalBack() {
  const router = useRouter();
  const label = BACK[useLang()];
  return (
    <button
      type="button"
      className="legal-back"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push("/");
      }}
    >
      <svg viewBox="0 0 14 8" width="14" height="8" aria-hidden="true">
        <path d="M13 4H1M4.5 1 1 4l3.5 3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      {label}
    </button>
  );
}

function RichLine({ text, cookies }: { text: string; cookies: string }) {
  const chunks = text.split(/(\{c\}|contacto@agronys.com)/g);
  return chunks.map((chunk, index) => {
    if (!chunk) return null;
    if (chunk === CONTACT) return <a key={index} href={MAIL}>{CONTACT}</a>;
    if (chunk === "{c}") return <Link key={index} href="/cookies">{cookies}</Link>;
    return <span key={index}>{chunk}</span>;
  });
}

export function InfoView({ id, orbit = false }: { id: keyof InfoPack["pages"]; orbit?: boolean }) {
  const pack = INFO[useLang()];
  const page = pack.pages[id];
  usePageTitle(page.meta);
  const body = (
    <>
      {orbit ? (
        <p className="orbit-kicker"><i />{page.eyebrow}</p>
      ) : (
        <p className="eyebrow">{page.eyebrow}</p>
      )}
      <h1>{page.h1}</h1>
      <div className="legal-grid">
        {page.items.map((item, index) => (
          <article key={item.title}>
            <span className="hud-n">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{item.title}</strong>
              <p><RichLine text={item.text} cookies={pack.links.cookies} /></p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
  if (!orbit) return body;
  return (
    <article className="legal-page">
      <LegalBack />
      {body}
    </article>
  );
}
