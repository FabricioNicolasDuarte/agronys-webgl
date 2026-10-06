"use client";

import { useEffect, useState } from "react";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { products, WA } from "@/content/site";
import { PAGES } from "@/i18n/pages";

export function ProductDeck() {
  const copy = PAGES[useLang()].products;
  usePageTitle(copy.meta);
  const [id, setId] = useState<(typeof products)[number]["id"]>("nutrogan");

  useEffect(() => {
    const pick = () => {
      const hash = window.location.hash.replace("#", "");
      if (products.some((item) => item.id === hash)) setId(hash as (typeof products)[number]["id"]);
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  const current = products.find((item) => item.id === id) ?? products[0];
  const text = copy.items[current.id];
  const index = String(products.findIndex((item) => item.id === current.id) + 1).padStart(2, "0");
  const demo = `${WA}?text=${encodeURIComponent(copy.seeMsg(text.name))}`;

  return (
    <section className="prod-deck" data-tone={current.id}>
      <header className="prod-head">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.h1}</h1>
        <p>{copy.lead}</p>
      </header>
      <div className="prod-orbit" role="tablist" aria-label={copy.tabs}>
        {products.map((item, i) => {
          const slot = copy.items[item.id];
          return (
            <button
              key={item.id}
              type="button"
              className={item.id === current.id ? "prod-slot is-on" : "prod-slot"}
              role="tab"
              aria-selected={item.id === current.id}
              onClick={() => setId(item.id)}
            >
              <span className="prod-ring" aria-hidden="true" />
              <span className="prod-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="prod-slot-name">{slot.name}</span>
              <span className="prod-slot-tag">{slot.line}</span>
            </button>
          );
        })}
      </div>
      <div className="prod-hud">
        <div className="prod-view">
          <p className="prod-live">{index} · {text.line}</p>
          <figure className="prod-scope">
            <img className="prod-shot" src={current.image} alt={copy.screens(text.name)} />
          </figure>
          <ul className="prod-tick">
            {text.chips.map((chip) => <li key={chip}>{chip}</li>)}
          </ul>
        </div>
        <ol className="prod-pipe">
          <li data-step="from"><span>01</span><div><b>{copy.costs}</b><p className="prod-copy">{text.from}</p></div></li>
          <li data-step="work"><span>02</span><div><b>{copy.helps}</b><p className="prod-copy">{text.work}</p></div></li>
          <li data-step="out"><span>03</span><div><b>{copy.achieve}</b><p className="prod-copy">{text.out}</p></div></li>
        </ol>
      </div>
      <div className="prod-actions">
        <a className="demo-cta prod-demo" href={demo} target="_blank" rel="noopener noreferrer">
          {copy.see(text.name)}
        </a>
        {"app" in current && current.app ? (
          <a className="demo-cta prod-app" href={current.app} target="_blank" rel="noopener noreferrer">
            {copy.openApp}
          </a>
        ) : null}
      </div>
    </section>
  );
}
