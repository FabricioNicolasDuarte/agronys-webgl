"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  color: string;
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStars(count: number): Star[] {
  const next = mulberry32(0x5eeda1);
  const stars: Star[] = [];
  for (let i = 0; i < count; i += 1) {
    const roll = next();
    const bright = roll > 0.94;
    const tint = next();
    stars.push({
      x: next(),
      y: Math.pow(next(), 0.85),
      r: bright ? 1.05 + next() * 0.55 : 0.3 + next() * 0.55,
      a: bright ? 0.72 + next() * 0.28 : 0.22 + next() * 0.4,
      tw: bright ? next() * Math.PI * 2 : -1,
      color: tint > 0.86 ? "#ffe4bc" : tint < 0.08 ? "#d7e6ff" : "#ffffff",
    });
  }
  return stars;
}

const STARS = makeStars(280);

export function NightSky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let alive = true;

    function draw(time: number) {
      const node = ref.current;
      const parent = node?.parentElement;
      if (!node || !parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(w * dpr);
      const height = Math.floor(h * dpr);
      if (node.width !== width || node.height !== height) {
        node.width = width;
        node.height = height;
      }
      const ctx = node.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (const star of STARS) {
        const horizon = star.y > 0.72 ? Math.max(0, 1 - (star.y - 0.72) / 0.22) : 1;
        let alpha = star.a * horizon;
        if (star.tw >= 0 && !reduce) alpha *= 0.62 + 0.38 * Math.sin(time / 1100 + star.tw);
        if (alpha < 0.04) continue;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop(time: number) {
      if (!alive) return;
      draw(time);
      frame = requestAnimationFrame(loop);
    }

    draw(0);
    if (!reduce) frame = requestAnimationFrame(loop);
    const box = canvas.parentElement ?? canvas;
    const ro = new ResizeObserver(() => draw(performance.now()));
    ro.observe(box);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="night-sky" aria-hidden="true">
      <canvas ref={ref} className="night-stars" />
    </div>
  );
}
