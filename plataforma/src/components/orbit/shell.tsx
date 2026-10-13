"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ORBIT, presentationHref } from "@/components/orbit/copy";
import { orbitClass } from "@/components/orbit/font";
import { bootLang, COPY } from "@/i18n/lang";
import { LangSwitch, useLang } from "@/components/site/lang-switch";
import { CONTACT } from "@/content/site";
import { AgronysLogo, ProductLogo } from "@/components/orbit/logos";
import "./orbit.css";

const PRODUCTS = [
  { href: "/productos/nutrogan", id: "nutrogan" },
  { href: "/productos/sigag", id: "sigag" },
  { href: "/productos/datagronys", id: "datagronys" },
] as const;

function relLum(r: number, g: number, b: number) {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function solidLum(el: Element) {
  const bg = getComputedStyle(el).backgroundColor;
  const match = bg.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/);
  if (!match) return null;
  const alpha = match[4] == null ? 1 : Number(match[4]);
  if (alpha < 0.4) return null;
  return relLum(Number(match[1]), Number(match[2]), Number(match[3]));
}

function mediaLum(
  media: HTMLVideoElement | HTMLImageElement,
  width: number,
  height: number,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
) {
  const rect = media.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2 || width < 8 || height < 8) return null;
  const cover = getComputedStyle(media).objectFit === "cover";
  const scale = cover ? Math.max(rect.width / width, rect.height / height) : rect.width / width;
  const drawnW = width * (cover ? scale : rect.width / width);
  const drawnH = height * (cover ? scale : rect.height / height);
  const sx = Math.min(width - 8, Math.max(0, (x - rect.left - (rect.width - drawnW) / 2) / (drawnW / width)));
  const sy = Math.min(height - 8, Math.max(0, (y - rect.top - (rect.height - drawnH) / 2) / (drawnH / height)));
  try {
    ctx.drawImage(media, sx, sy, 8, 8, 0, 0, 8, 8);
    const data = ctx.getImageData(0, 0, 8, 8).data;
    let r = 0;
    let g = 0;
    let b = 0;
    let n = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 16) continue;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n += 1;
    }
    return n ? relLum(r / n, g / n, b / n) : null;
  } catch {
    return null;
  }
}

function luminanceAt(x: number, y: number, ctx: CanvasRenderingContext2D) {
  for (const node of document.elementsFromPoint(x, y)) {
    if (node.closest(".orbit-nav, .orbit-wordmark")) continue;
    if (node instanceof HTMLVideoElement && node.readyState >= 2 && node.videoWidth) {
      const lum = mediaLum(node, node.videoWidth, node.videoHeight, x, y, ctx);
      if (lum != null) return lum;
    }
    if (node instanceof HTMLImageElement && node.complete && node.naturalWidth) {
      const lum = mediaLum(node, node.naturalWidth, node.naturalHeight, x, y, ctx);
      if (lum != null) return lum;
    }
    const solid = solidLum(node);
    if (solid != null) return solid;
  }
  return null;
}

function useCornerTone() {
  const [tone, setTone] = useState(1);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 8;
    canvas.height = 8;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    let smooth = 1;
    let frame = 0;
    const sample = () => {
      frame = 0;
      const brand = document.getElementById("orbit-brand");
      const box = brand?.getBoundingClientRect();
      const x = box && box.width ? box.left + box.width * 0.28 : 64;
      const y = box && box.height ? box.top + box.height * 0.5 : 30;
      const lum = luminanceAt(x, y, ctx);
      let target = smooth;
      if (lum != null) {
        if (smooth > 0.5) target = lum > 0.62 ? 0 : 1;
        else target = lum < 0.38 ? 1 : 0;
      }
      smooth += (target - smooth) * 0.62;
      setTone((prev) => (Math.abs(prev - smooth) < 0.02 ? prev : smooth));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(sample);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const id = window.setInterval(schedule, 420);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearInterval(id);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return tone;
}

export function Nav({ theme, hidden, settled = true }: { theme: "dark" | "light"; hidden?: boolean; settled?: boolean }) {
  const lang = useLang();
  const copy = ORBIT[lang];
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const tone = useCornerTone();
  const logo = Math.round(tone * 255);
  const veil = 255 - logo;

  useEffect(() => {
    bootLang();
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [path]);

  return (
    <header
      className={`orbit-nav is-${theme}${hidden ? " is-hidden" : ""}${settled ? " is-settled" : ""}${menu ? " is-open" : ""}`}
      style={{ ["--logo-c" as string]: String(logo), ["--veil-c" as string]: String(veil) }}
    >
      <span className="orbit-veil" aria-hidden="true" />
      <Link href="/" className="orbit-brand" id="orbit-brand" aria-label="Agronys">
        <AgronysLogo />
      </Link>
      <button
        type="button"
        className="orbit-burger"
        aria-expanded={menu}
        aria-label={copy.products}
        onClick={() => setMenu((value) => !value)}
      >
        <span />
        <span />
      </button>
      <nav className={menu ? "is-open" : ""} aria-label="Agronys">
        <Link href="/metodo">{copy.solution}</Link>
        <details className="orbit-products">
          <summary>
            {copy.products}
            <svg viewBox="0 0 12 8" width="10" height="8" aria-hidden="true">
              <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </summary>
          <div className="orbit-drop" role="menu">
            {PRODUCTS.map((item) => (
              <Link key={item.id} href={item.href} role="menuitem">
                <ProductLogo id={item.id} />
              </Link>
            ))}
          </div>
        </details>
        <Link href="/empresa">{copy.about}</Link>
        <Link href="/servicios">{copy.services}</Link>
        <Link href="/entrar">{copy.enter}</Link>
        <Link className="orbit-btn" href="/contacto">
          {copy.contact}
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  const lang = useLang();
  const copy = ORBIT[lang];
  const account = COPY[lang].account;
  const year = new Date().getFullYear();

  return (
    <footer className="orbit-foot">
      <div>
        <p className="orbit-future">{copy.future}</p>
      </div>
      <div>
        <p className="orbit-col">{copy.about}</p>
        <Link href="/empresa">{copy.about}</Link>
        <Link href="/metodo">{copy.solution}</Link>
        <Link href="/contacto">{copy.contact}</Link>
        <Link href="/entrar">{account}</Link>
      </div>
      <div>
        <p className="orbit-col">{copy.technology}</p>
        <Link href="/productos/nutrogan"><ProductLogo id="nutrogan" /></Link>
        <Link href="/productos/sigag"><ProductLogo id="sigag" /></Link>
        <Link href="/productos/datagronys"><ProductLogo id="datagronys" /></Link>
      </div>
      <div>
        <p className="orbit-col">{copy.connect}</p>
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
        <a href={presentationHref(lang)}>WhatsApp</a>
      </div>
      <div className="orbit-legal">
        <p>
          <Link href="/privacidad">{copy.privacy}</Link>
          <Link href="/terminos">{copy.terms}</Link>
          <span>© {year} Agronys</span>
          <span className="orbit-credit">
            {copy.credit}{" "}
            <a href="https://fabricioduarte.tech/" target="_blank" rel="noopener noreferrer">fabricioduarte.tech</a>
          </span>
        </p>
        <LangSwitch />
      </div>
    </footer>
  );
}

export function OrbitFrame({ children, theme = "light" }: { children: React.ReactNode; theme?: "dark" | "light" }) {
  const lang = useLang();
  return (
    <div className={`${orbitClass(lang)} orbit orbit-doc`}>
      <Nav theme={theme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function Clock() {
  const lang = useLang();
  const copy = ORBIT[lang];
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="orbit-time">
      <i />
      {copy.localTime} {time}
    </p>
  );
}

export function PlaceMark() {
  const lang = useLang();
  const copy = ORBIT[lang];
  return (
    <p className="orbit-place">
      <img className="orbit-yatay" src="/orbit/yatay.svg" alt="" />
      <span>{copy.origin}</span>
      <i className="orbit-dots" aria-hidden="true" />
    </p>
  );
}

export function Rich({ text }: { text: string }) {
  const lang = useLang();
  const parts = text.split("{o}");
  if (parts.length === 1) return text;
  const label = lang === "en" ? "Paddock" : lang === "zh" ? "地块" : "Lote";
  return (
    <>
      {parts[0]}
      <span className="orbit-earth" role="img" aria-label={label} />
      {parts[1]}
    </>
  );
}
