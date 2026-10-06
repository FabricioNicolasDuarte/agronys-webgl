"use client";

import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { CONTACT, MAIL } from "@/content/site";
import { INFO, type InfoPack } from "@/i18n/info";

function withMail(text: string) {
  const parts = text.split(CONTACT);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      <a href={MAIL}>{CONTACT}</a>
      {parts.slice(1).join(CONTACT)}
    </>
  );
}

export function InfoView({ id }: { id: keyof InfoPack["pages"] }) {
  const pack = INFO[useLang()];
  const page = pack.pages[id];
  usePageTitle(page.meta);
  return (
    <>
      <p className="eyebrow">{page.eyebrow}</p>
      <h1>{page.h1}</h1>
      <div className="legal-grid">
        {page.items.map((item, index) => (
          <article key={item.title}>
            <span className="hud-n">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{withMail(item.text)}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
