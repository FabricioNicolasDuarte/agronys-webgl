"use client";

import { useEffect, useRef, useState } from "react";
import { ProductLogo } from "@/components/orbit/logos";

const SCREENS: Record<string, string[]> = {
  nutrogan: [
    "/orbit/screens/nutrogan-screen-1.jpg",
    "/orbit/screens/nutrogan-screen-2.jpg",
  ],
  sigag: ["/orbit/screens/sigag-home.png", "/orbit/jornada.jpg", "/orbit/plano-3.jpg"],
  datagronys: [
    "/orbit/screens/datagronys-kpis.png",
    "/orbit/screens/datagronys-serie.png",
    "/orbit/screens/datagronys-campos.png",
  ],
};

function usePin(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(0.2);
      return;
    }
    const onScroll = () => {
      const total = node.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-node.getBoundingClientRect().top, 0), Math.max(total, 0));
      setProgress(total > 0 ? passed / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

export function ProductFilm({ id, title, text }: { id: string; title: string; text: string }) {
  const pin = useRef<HTMLElement>(null);
  const progress = usePin(pin);
  const frames = SCREENS[id] ?? SCREENS.nutrogan;
  const wide = id === "datagronys";
  const yaw = progress * 360;
  const face = Math.min(frames.length - 1, Math.floor(progress * frames.length * 0.92));
  const shape = wide ? " is-wide" : "";

  return (
    <section className="film" ref={pin}>
      <div className="film-sticky">
        <h1 style={{ opacity: Math.max(0, 1 - progress * 1.4) }}>
          <ProductLogo id={id} />
          <span className="sr-only">{title}</span>
        </h1>
        <div className="turn-stage">
          <div className={`turn${shape}`} style={{ transform: `rotateY(${yaw}deg) rotateX(8deg)` }}>
            <div className="turn-face">
              {frames.map((src, index) => (
                <img key={src} src={src} alt={index === 0 ? title : ""} style={{ opacity: index === face ? 1 : 0 }} />
              ))}
            </div>
            <div className="turn-back" />
          </div>
        </div>
        <p className="film-caption" style={{ opacity: progress > 0.62 ? Math.min(1, (progress - 0.62) * 4) : 0 }}>{text}</p>
      </div>
    </section>
  );
}
