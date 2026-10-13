"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ORBIT, presentationHref } from "@/components/orbit/copy";
import { orbitClass } from "@/components/orbit/font";
import { WireGlobe } from "@/components/orbit/globe";
import { AgronysLogo } from "@/components/orbit/logos";
import { FieldVideo } from "@/components/orbit/section-film";
import { Clock, Footer, Nav, PlaceMark, Rich } from "@/components/orbit/shell";
import { useLang } from "@/components/site/lang-switch";
import { SECTIONS } from "@/i18n/sections";

const STAGE = [
  "/orbit/films/cards/stage-campo.mp4",
  "/orbit/films/cards/stage-datos.mp4",
  "/orbit/films/cards/stage-jornada.mp4",
  "/orbit/films/cards/stage-equipos.mp4",
];

function ink(amount: number) {
  const channel = Math.round(228 - amount * 211);
  return `rgb(${channel} ${channel} ${channel})`;
}

type Spot = { x: number; y: number; size: number };
type Flight = Spot & { settled: boolean; intro: number; shrink: number };

const LOGO_ASPECT = 1575.81 / 337.49;

function spot(kind: "full" | "mid" | "corner"): Spot {
  if (kind === "full") {
    const startW = Math.min(window.innerWidth * 0.94, window.innerHeight * 0.86 * LOGO_ASPECT);
    const size = startW / LOGO_ASPECT;
    return { x: (window.innerWidth - startW) / 2, y: (window.innerHeight - size) / 2, size };
  }
  if (kind === "mid") {
    return {
      x: window.innerWidth * 0.018,
      y: window.innerHeight * 0.06,
      size: Math.min(window.innerWidth * 0.13, window.innerHeight * 0.16),
    };
  }
  const box = document.getElementById("orbit-brand")?.getBoundingClientRect();
  return { x: box?.left ?? 32, y: box?.top ?? 18, size: box?.height || 22 };
}

function mix(from: Spot, to: Spot, ease: number): Spot {
  return {
    x: from.x + (to.x - from.x) * ease,
    y: from.y + (to.y - from.y) * ease,
    size: from.size + (to.size - from.size) * ease,
  };
}

function introFrame(ease: number): Flight {
  return { ...mix(spot("full"), spot("mid"), ease), settled: false, intro: ease, shrink: 0 };
}

function scrollFrame(progress: number): Flight {
  const shrink = Math.min(1, Math.max(0, progress / 0.58));
  const ease = 1 - (1 - shrink) ** 3;
  return { ...mix(spot("mid"), spot("corner"), ease), settled: ease > 0.97, intro: 1, shrink: ease };
}

export function OrbitHome() {
  const lang = useLang();
  const copy = ORBIT[lang];
  const company = SECTIONS[lang].company;
  const method = SECTIONS[lang].method;
  const pin = useRef<HTMLElement>(null);
  const lockup = useRef<HTMLElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const wantTime = useRef(0);
  const seeking = useRef(false);
  const [progress, setProgress] = useState(0);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [seen, setSeen] = useState(false);
  const [inks, setInks] = useState<number[]>([0, 0, 0]);
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const stagePhoto = useRef<HTMLDivElement>(null);
  const introDone = useRef(false);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      introDone.current = true;
      setFlight({ ...spot("corner"), settled: true, intro: 1, shrink: 1 });
      return;
    }
    if (window.scrollY > 24 && pin.current) {
      introDone.current = true;
      const total = pin.current.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-pin.current.getBoundingClientRect().top, 0), Math.max(total, 0));
      setFlight(scrollFrame(total > 0 ? passed / total : 0));
      return;
    }
    let start = 0;
    let frame = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / 2800);
      const moved = t <= 0.3 ? 0 : (t - 0.3) / 0.7;
      const ease = 1 - (1 - moved) ** 3;
      if (t >= 1) {
        introDone.current = true;
        setFlight(introFrame(1));
        return;
      }
      setFlight(introFrame(ease));
      frame = requestAnimationFrame(tick);
    };
    setFlight(introFrame(0));
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const node = pin.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      setInks([1, 1, 1]);
      return;
    }
    const onScroll = () => {
      const total = node.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-node.getBoundingClientRect().top, 0), Math.max(total, 0));
      const p = total > 0 ? passed / total : 0;
      setProgress(p);
      if (introDone.current) setFlight(scrollFrame(p));
      const media = film.current;
      if (media?.duration) {
        const clip = Math.min(1, p / 0.82);
        wantTime.current = clip * Math.max(0, media.duration - 1 / 24);
        if (!seeking.current && Math.abs(media.currentTime - wantTime.current) > 1 / 48) {
          seeking.current = true;
          media.currentTime = wantTime.current;
        }
      }
      const lines = lockup.current?.querySelectorAll("p");
      if (lines?.length) {
        setInks(
          [...lines].map((el) => {
            const top = el.getBoundingClientRect().top / window.innerHeight;
            return Math.min(1, Math.max(0, (0.78 - top) / 0.32));
          }),
        );
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const node = lockup.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setSeen(true);
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".orbit-team");
    const observer = new IntersectionObserver(
      (entries) => setOverDark(entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.4)),
      { threshold: [0.4, 0.7] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => setTab((value) => (value + 1) % STAGE.length), 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    stagePhoto.current?.querySelectorAll("video").forEach((node, index) => {
      if (index === tab) node.play().catch(() => {});
      else node.pause();
    });
  }, [tab]);

  const t = Math.min(1, Math.max(0, (progress - 0.78) / 0.22));
  const wash = Math.min(1, Math.max(0, (progress - 0.8) / 0.16));
  const tone = Math.round(5 + (243 - 5) * wash);
  const theme = overDark || progress <= 0.82 ? "dark" : "light";
  const intro = flight?.intro ?? 0;
  const opening = intro < 0.995;
  const wordLight = progress > 0.84;

  return (
    <div className={`${orbitClass(lang)} orbit${opening ? " is-intro" : ""}`}>
      <Nav theme={theme} hidden={progress < 0.06} settled={flight?.settled ?? false} />
      <section className="orbit-pin" ref={pin}>
        <div className="orbit-sticky" style={{ background: `rgb(${tone} ${tone} ${tone})` }}>
          <div className="orbit-ticks" style={{ opacity: (opening ? intro : 1) * (1 - wash) }} />
          <h1
            className="orbit-wordmark"
            style={
              flight
                ? {
                    position: "fixed",
                    left: flight.x,
                    top: flight.y,
                    width: "auto",
                    height: flight.size,
                    transform: "none",
                    color: wordLight ? "#111" : "#fff",
                    opacity: flight.settled ? 0 : 1,
                    zIndex: 70,
                  }
                : undefined
            }
          >
            <AgronysLogo />
          </h1>
          <p className="orbit-by" style={{ opacity: opening ? 0 : Math.max(0, 1 - (flight?.shrink ?? 0) * 1.35) }}>
            <span>{copy.designed}</span>
            <span>{copy.operated}</span>
          </p>
          <figure
            className="orbit-hero-frame"
            style={{
              top: `${7 * t}vh`,
              right: `${4.5 * t}vw`,
              bottom: `${8 * t}vh`,
              left: `${4.5 * t}vw`,
              borderRadius: `${22 * t}px`,
            }}
          >
            <div className="orbit-hero-fit">
              <video
                ref={film}
                className="orbit-hero-video"
                src="/orbit/hero.mp4?v=4"
                poster="/orbit/hero-poster.jpg?v=4"
                muted
                playsInline
                preload="auto"
                aria-label={copy.heroAlt}
                style={opening ? { filter: `blur(${(1 - intro) * 22}px)` } : undefined}
                onLoadedData={(event) => event.currentTarget.pause()}
                onSeeked={(event) => {
                  const media = event.currentTarget;
                  if (Math.abs(media.currentTime - wantTime.current) > 1 / 48) {
                    media.currentTime = wantTime.current;
                    return;
                  }
                  seeking.current = false;
                }}
              />
            </div>
            <div className="orbit-hero-dim" style={{ opacity: opening ? (1 - intro) * 0.62 : 0 }} />
          </figure>
          <div className="orbit-hero-meta" style={{ opacity: opening ? 0 : Math.max(0, 1 - progress * 2.4) }}>
            <Clock />
            <PlaceMark />
          </div>
        </div>
      </section>

      <section className={`orbit-lockup${seen ? " is-in" : ""}`} ref={lockup} aria-label={copy.deliver}>
        {copy.lines.map((line, index) => (
          <p key={line} className={"abcdefg"[index]} style={{ color: ink(inks[index] ?? 0) }}>
            <Rich text={line} />
          </p>
        ))}
      </section>

      <section className="orbit-constellation">
        <h2>{copy.constellation}</h2>
        <WireGlobe />
      </section>

      <section
        className="orbit-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="orbit-stage-photo" ref={stagePhoto}>
          {STAGE.map((src, index) => (
            <FieldVideo key={src} src={src} className={index === tab ? "is-on" : ""} />
          ))}
          <div className="orbit-pills" role="tablist">
            {copy.tabs.map((label, index) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={index === tab}
                className={index === tab ? "is-on" : ""}
                onClick={() => setTab(index)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="orbit-stage-copy">
          <h2>{copy.deliver}</h2>
          <p>{copy.tabText[tab]}</p>
          <a className="orbit-btn" href={presentationHref(lang)}>
            {company.cta}
          </a>
        </div>
      </section>

      <section className="orbit-process">
        <div className="orbit-process-copy">
          <p className="orbit-kicker"><i />{method.eyebrow}</p>
          <h2>{method.h1}</h2>
        </div>
        <div className="orbit-cards">
          {method.steps.map((step, index) => (
            <article className="orbit-card" key={step.title}>
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
              </div>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="orbit-team">
        <FieldVideo src="/orbit/films/cards/team.mp4" />
        <div>
          <p className="orbit-kicker"><i />{company.eyebrow}</p>
          <h2>{company.h1}</h2>
          <Link href="/empresa">{copy.meet}</Link>
        </div>
      </section>

      <section className="orbit-message">
        <h2>{company.note}</h2>
        <a className="orbit-btn" href={presentationHref(lang)}>
          {company.cta}
        </a>
      </section>

      <section className="orbit-corona" aria-hidden="true">
        <FieldVideo className="orbit-corona-video" src="/orbit/films/cards/corona.mp4" />
        <h2>{copy.marquee}</h2>
        <div className="orbit-halftone">
          <FieldVideo src="/orbit/films/cards/circle.mp4" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
