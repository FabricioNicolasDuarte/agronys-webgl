"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ORBIT, presentationHref } from "@/components/orbit/copy";
import { FieldVideo } from "@/components/orbit/section-film";
import { OrbitFrame } from "@/components/orbit/shell";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { SECTIONS } from "@/i18n/sections";

const PATHS = [
  { href: "/soluciones#servicios", film: "/orbit/films/cards/sol-servicios.mp4" },
  { href: "/soluciones#tecnologia", film: "/orbit/films/cards/sol-tecnologia.mp4" },
];

function ink(amount: number) {
  const channel = Math.round(214 - amount * 197);
  return `rgb(${channel} ${channel} ${channel})`;
}

function FieldDrone() {
  return (
    <div className="sol-drone" aria-hidden="true">
      <span className="sol-rotor a"><i /><i /><i /></span>
      <span className="sol-rotor b"><i /><i /><i /></span>
      <span className="sol-rotor c"><i /><i /><i /></span>
      <span className="sol-rotor d"><i /><i /><i /></span>
      <img src="/orbit/drone.png" alt="" />
    </div>
  );
}

export function SolutionDoc() {
  const lang = useLang();
  const copy = ORBIT[lang];
  const method = SECTIONS[lang].method;
  const solutions = SECTIONS[lang].solutions;
  const company = SECTIONS[lang].company;
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [satY, setSatY] = useState(0);
  const [tones, setTones] = useState<number[]>([]);
  const railRef = useRef<HTMLElement>(null);
  usePageTitle(method.meta);

  useEffect(() => {
    const onScroll = () => {
      setTheme(window.scrollY < window.innerHeight * 0.72 ? "dark" : "light");
      const node = railRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const y = window.innerHeight * 0.42 - rect.top;
      setSatY(Math.min(Math.max(y, 0), Math.max(rect.height - 180, 0)));
      const heads = node.querySelectorAll("[data-ink]");
      setTones(
        [...heads].map((el) => {
          const top = el.getBoundingClientRect().top / window.innerHeight;
          return Math.min(1, Math.max(0, (0.82 - top) / 0.38));
        }),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <OrbitFrame theme={theme}>
      <article className="sol" lang={lang === "zh" ? "zh-Hans" : lang}>
        <header className="sol-hero">
          <video autoPlay muted loop playsInline poster="/orbit/films/solucion.jpg" aria-label={copy.heroAlt}>
            <source src="/orbit/films/solucion.mp4" type="video/mp4" />
          </video>
          <h1>
            {copy.future}
            <span>{copy.designed}.</span>
            <span>{copy.operated}.</span>
          </h1>
        </header>

        <section className="sol-descent" ref={railRef} aria-labelledby="sol-layers-title">
          <div className="sol-rail" aria-hidden="true">
            <i />
            <div className="sol-drone-wrap" style={{ transform: `translate3d(-50%, ${satY}px, 0)` }}>
              <FieldDrone />
            </div>
          </div>
          <div className="sol-descent-copy">
            <p className="orbit-kicker"><i />{solutions.eyebrow}</p>
            <h2 id="sol-layers-title" data-ink="" style={{ color: ink(tones[0] ?? 0) }}>
              {solutions.h1}
            </h2>
            <p className="sol-aside">{solutions.lead}</p>
            {solutions.groups.map((group, index) => (
              <article key={group.title}>
                <h3 data-ink="" style={{ color: ink(tones[index + 1] ?? 0) }}>{group.title}</h3>
                <p>{group.lines.map((line) => line.title).join(" · ")}</p>
                <p>{group.lines[0]?.text}</p>
              </article>
            ))}
            <article>
              <h3 data-ink="" style={{ color: ink(tones[solutions.groups.length + 1] ?? 0) }}>
                {solutions.linkTitle}
              </h3>
              <p>{solutions.linkLead}</p>
            </article>
          </div>
        </section>

        <section className="sol-steps" aria-labelledby="sol-steps-title">
          <p className="orbit-kicker"><i />{method.eyebrow}</p>
          <h2 id="sol-steps-title">{method.h1}</h2>
          <p className="sol-lead">{method.lead}</p>
          <ol>
            {method.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="orbit-close">{method.close}</p>
        </section>

        <section className="sol-paths" aria-labelledby="sol-paths-title">
          <h2 id="sol-paths-title">{company.pathsTitle}</h2>
          <div>
            {company.paths.map((path, index) => (
              <Link key={path.title} href={PATHS[index]?.href ?? "/soluciones#servicios"}>
                <FieldVideo src={PATHS[index]?.film ?? PATHS[0].film} />
                <h3>{path.title}</h3>
                <p>{path.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="orbit-message sol-end">
          <h2>{company.note}</h2>
          <a className="orbit-btn" href={presentationHref(lang)}>{company.cta}</a>
        </section>
      </article>
    </OrbitFrame>
  );
}
