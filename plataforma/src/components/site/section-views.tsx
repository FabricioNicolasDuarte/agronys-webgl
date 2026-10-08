"use client";

import Link from "next/link";
import { Compare } from "@/components/site/compare-board";
import { RiveMark } from "@/components/site/rive-mark";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { WA } from "@/content/site";
import { SECTIONS } from "@/i18n/sections";
import type { Lang } from "@/i18n/lang";

function askHref(lang: Lang) {
  const text =
    lang === "en"
      ? "Good morning. I request a presentation of Agronys for my establishment."
      : lang === "pt"
        ? "Bom dia. Solicito uma apresentação da Agronys para o meu estabelecimento."
        : lang === "zh"
          ? "您好。我希望为牧场申请一次 Agronys 介绍。"
          : lang === "gn"
          ? "Mba'éichapa. Ajerure peteĩ jehechauka Agronys rehe che establecimiento-pe."
          : "Buenos días. Solicito una presentación de Agronys para mi establecimiento.";
  return `${WA}?text=${encodeURIComponent(text)}`;
}

const PRODUCT_ICON: Record<string, string> = {
  nutrogan: "/icons/ganaderia.svg",
  sigag: "/icons/vision.svg",
  datagronys: "/icons/dataeng.svg",
};

const GROUP_ICON = [
  "/icons/automat.svg",
  "/icons/datos.svg",
  "/icons/agro.svg",
  "/icons/satelital.svg",
  "/icons/orquestacion.svg",
];

const LINK_ICON = [
  "/icons/vision.svg",
  "/icons/satelital.svg",
  "/icons/datos.svg",
  "/icons/ganaderia.svg",
  "/icons/agro.svg",
  "/icons/dataeng.svg",
  "/icons/automat.svg",
  "/icons/offline.svg",
  "/icons/orquestacion.svg",
  "/icons/ganaderia.svg",
  "/icons/satelital.svg",
];

function Products({
  items,
  label,
}: {
  items: { id: string; title: string; text: string }[];
  label: string;
}) {
  return (
    <div className="product-row">
      {items.map((item) => (
        <article className="product-card" id={item.id} key={item.id}>
          <img className="mark" src={PRODUCT_ICON[item.id]} alt="" />
          <p className="eyebrow">{label}</p>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export function PlatformView() {
  const lang = useLang();
  const copy = SECTIONS[lang].company;
  const productLabel = lang === "en" ? "Product" : lang === "zh" ? "产品" : "Producto";
  usePageTitle(copy.meta);
  return (
    <article className="read">
      <header className="pane pane-hero">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.h1}</h1>
          <p className="lead">{copy.lead}</p>
        </div>
        <figure className="hero-art">
          <RiveMark label="Animación de Agronys" />
        </figure>
        <dl className="pane-meta">
          {copy.facts.map((fact, index) => (
            <div key={copy.factLabels[index]}>
              <dt>{copy.factLabels[index]}</dt>
              <dd>{fact}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="pane" aria-labelledby="company-products">
        <header className="pane-head">
          <h2 id="company-products">{copy.productsTitle}</h2>
          <p>{copy.productsLead}</p>
        </header>
        <Products items={copy.products} label={productLabel} />
      </section>

      <section className="pane" aria-labelledby="company-paths">
        <header className="pane-head">
          <h2 id="company-paths">{copy.pathsTitle}</h2>
        </header>
        <div className="path-row">
          <Link className="path-card" href="/soluciones#servicios">
            <h3>{copy.paths[0].title}</h3>
            <p>{copy.paths[0].text}</p>
          </Link>
          <Link className="path-card" href="/soluciones#integracion">
            <h3>{copy.paths[1].title}</h3>
            <p>{copy.paths[1].text}</p>
          </Link>
        </div>
        <footer className="pane-end">
          <p className="read-note">{copy.note}</p>
          <a className="read-cta" href={askHref(lang)}>
            {copy.cta}
          </a>
        </footer>
      </section>
    </article>
  );
}

export function MethodView() {
  const lang = useLang();
  const copy = SECTIONS[lang].method;
  usePageTitle(copy.meta);
  return (
    <article className="read">
      <header className="pane pane-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.h1}</h1>
        <p className="lead">{copy.lead}</p>
      </header>
      <ol className="pane read-steps">
        {copy.steps.map((step, index) => (
          <li key={step.title}>
            <span className="read-n">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="pane read-close">{copy.close}</p>
    </article>
  );
}

export function SolutionsView() {
  const lang = useLang();
  const copy = SECTIONS[lang].solutions;
  const productLabel = lang === "en" ? "Product" : lang === "zh" ? "产品" : lang === "gn" ? "Apopyre" : "Producto";
  usePageTitle(copy.meta);
  return (
    <article className="read">
      <header className="pane pane-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.h1}</h1>
        <p className="lead">{copy.lead}</p>
      </header>

      <section className="pane" id="productos" aria-labelledby="sol-products">
        <header className="pane-head">
          <h2 id="sol-products">{copy.productsTitle}</h2>
          <p>{copy.productsLead}</p>
        </header>
        <Products items={copy.products} label={productLabel} />
      </section>

      <Compare lang={lang} />

      <section className="pane" id="servicios" aria-labelledby="sol-services">
        <header className="pane-head">
          <h2 id="sol-services">{copy.servicesTitle}</h2>
          <p>{copy.servicesLead}</p>
        </header>
        <div className="svc-groups">
          {copy.groups.map((group, index) => (
            <section className="svc-group" key={group.title}>
              <img className="mark" src={GROUP_ICON[index] ?? GROUP_ICON[0]} alt="" />
              <h3>{group.title}</h3>
              <ul>
                {group.lines.map((line) => (
                  <li key={line.title}>
                    <strong>{line.title}</strong>
                    <span>{line.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="pane" id="integracion" aria-labelledby="sol-link">
        <header className="pane-head">
          <h2 id="sol-link">{copy.linkTitle}</h2>
          <p>{copy.linkLead}</p>
        </header>
        <ul className="link-list">
          {copy.link.map((line, index) => (
            <li key={line.title}>
              <img className="mark is-mini" src={LINK_ICON[index] ?? LINK_ICON[0]} alt="" />
              <strong>{line.title}</strong>
              <span>{line.text}</span>
            </li>
          ))}
        </ul>
        <footer className="pane-end">
          <p className="read-note">{copy.note}</p>
          <a className="read-cta" href={askHref(lang)}>
            {copy.cta}
          </a>
        </footer>
      </section>
    </article>
  );
}
