"use client";

import { useEffect } from "react";
import { ProductFilm } from "@/components/orbit/film";
import { MarkLogo } from "@/components/orbit/logos";
import { Compare } from "@/components/site/compare-board";
import { FieldVideo, SectionFilm } from "@/components/orbit/section-film";
import { OrbitFrame } from "@/components/orbit/shell";
import { presentationHref } from "@/components/orbit/copy";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { SECTIONS } from "@/i18n/sections";

export function MethodDoc() {
  const lang = useLang();
  const copy = SECTIONS[lang].method;
  usePageTitle(copy.meta);
  return (
    <OrbitFrame>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.h1}</h1>
      <p className="lead">{copy.lead}</p>
      <div className="orbit-cards orbit-doc-cards">
        {copy.steps.map((step, index) => (
          <article className="orbit-card" key={step.title}>
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
            </div>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <p className="orbit-close">{copy.close}</p>
    </OrbitFrame>
  );
}

export function CompanyDoc() {
  const lang = useLang();
  const copy = SECTIONS[lang].company;
  usePageTitle(copy.meta);
  return (
    <OrbitFrame theme="dark">
      <article className="co">
        <SectionFilm src="/orbit/films/empresa.mp4" poster="/orbit/films/empresa.jpg" kicker={copy.eyebrow} title={copy.h1} />
        <div className="co-body">
          <div className="co-lead">
            <MarkLogo />
            <p className="lead">{copy.lead}</p>
          </div>
          <dl className="co-facts">
            {copy.facts.map((fact, index) => (
              <div key={copy.factLabels[index]}>
                <dt>{copy.factLabels[index]}</dt>
                <dd>{fact}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="co-paths">
          {copy.paths.map((item, index) => (
            <article key={item.title}>
              <FieldVideo src={index === 0 ? "/orbit/films/cards/empresa-servicios.mp4" : "/orbit/films/cards/empresa-tecnologia.mp4"} />
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="co-body">
          <div className="doc-portal co-compare">
            <Compare lang={lang} />
          </div>
          <p className="orbit-close">{copy.note}</p>
          <a className="orbit-btn" href={presentationHref(lang)}>{copy.cta}</a>
        </div>
      </article>
    </OrbitFrame>
  );
}

export function SolutionsDoc() {
  const lang = useLang();
  const copy = SECTIONS[lang].solutions;
  const company = SECTIONS[lang].company;
  usePageTitle(company.pathsTitle);
  useEffect(() => {
    const go = () => {
      const id = window.location.hash.slice(1);
      if (!id) {
        document.documentElement.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      const node = document.getElementById(id);
      if (!node) return;
      const top = Math.max(0, node.getBoundingClientRect().top + window.scrollY - 96);
      document.documentElement.scrollTo({ top, behavior: "instant" });
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);
  return (
    <OrbitFrame theme="dark">
      <SectionFilm src="/orbit/films/ademas.mp4" poster="/orbit/films/ademas.jpg" title={company.pathsTitle} />
      <article className="sol-sub section-rest">
        <section id="servicios" aria-labelledby="sub-servicios">
          <p className="orbit-kicker"><i />{company.paths[0].title}</p>
          <h2 id="sub-servicios">{copy.servicesTitle}</h2>
          <p className="lead">{copy.servicesLead}</p>
          {copy.groups.map((group, index) => (
            <section className="orbit-group" key={group.title}>
              <h2><span>{String(index + 1).padStart(2, "0")}</span>{group.title}</h2>
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
        </section>
        <section id="tecnologia" aria-labelledby="sub-tecnologia">
          <p className="orbit-kicker"><i />{company.paths[1].title}</p>
          <h2 id="sub-tecnologia">{copy.linkTitle}</h2>
          <p className="lead">{copy.linkLead}</p>
          <ul className="orbit-link-list">
            {copy.link.map((line) => (
              <li key={line.title}>
                <strong>{line.title}</strong>
                <span>{line.text}</span>
              </li>
            ))}
          </ul>
        </section>
        <p className="orbit-close">{copy.note}</p>
        <a className="orbit-btn" href={presentationHref(lang)}>{copy.cta}</a>
      </article>
    </OrbitFrame>
  );
}

export function ProductDoc({ id }: { id: "nutrogan" | "sigag" | "datagronys" }) {
  const lang = useLang();
  const pack = SECTIONS[lang].solutions;
  const item = pack.products.find((product) => product.id === id) ?? pack.products[0];
  usePageTitle(`${item.title} · Agronys`);
  return (
    <OrbitFrame theme="dark">
      <ProductFilm id={id} title={item.title} text={item.text} />
      <section className="film-note">
        <p>{pack.note}</p>
        <a className="orbit-btn" href={presentationHref(lang)}>{pack.cta}</a>
      </section>
    </OrbitFrame>
  );
}
