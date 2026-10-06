"use client";

import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { CONTACT, MAIL } from "@/content/site";
import { PAGES } from "@/i18n/pages";

function withMail(text: string) {
  const parts = text.split(CONTACT);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      <a href={MAIL}>{CONTACT}</a>
      {parts[1]}
    </>
  );
}

export function CookiesView() {
  const copy = PAGES[useLang()].cookies;
  usePageTitle(copy.meta);
  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.h1}</h1>
      <div className="legal-grid">
        {copy.items.map((item, index) => (
          <article key={item.title}>
            <span className="hud-n">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{index === 2 ? withMail(item.text) : item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
