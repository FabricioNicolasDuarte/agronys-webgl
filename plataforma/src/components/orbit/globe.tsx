"use client";

import { useEffect, useRef } from "react";

const HERD = [
  [0.12, 0.08],
  [0.22, 0.16],
  [0.08, 0.2],
  [-0.18, -0.12],
  [-0.28, -0.04],
  [-0.12, -0.22],
  [0.34, -0.18],
  [0.42, -0.08],
  [-0.4, 0.16],
  [-0.32, 0.28],
  [0.05, -0.36],
  [-0.05, 0.34],
];

export function WireGlobe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rot = 0.2;
    let raf = 0;

    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.7;
      const cy = h * 0.48;
      const rx = Math.min(w, h) * 0.72;
      const ry = rx * 0.42;
      if (!reduced) rot += 0.0024;

      const project = (x: number, y: number) => {
        const c = Math.cos(rot);
        const s = Math.sin(rot);
        const xr = x * c - y * s;
        const yr = x * s + y * c;
        return { x: cx + xr * rx, y: cy + yr * ry };
      };

      const strokeLoop = (pts: { x: number; y: number }[]) => {
        ctx.beginPath();
        pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.closePath();
        ctx.stroke();
      };

      ctx.lineWidth = 1.15;
      ctx.strokeStyle = "rgba(20,20,20,0.55)";
      strokeLoop([project(-1, -1), project(1, -1), project(1, 1), project(-1, 1)]);

      ctx.strokeStyle = "rgba(20,20,20,0.28)";
      for (let i = 1; i < 4; i++) {
        const t = -1 + (i * 2) / 4;
        ctx.beginPath();
        ctx.moveTo(project(t, -1).x, project(t, -1).y);
        ctx.lineTo(project(t, 1).x, project(t, 1).y);
        ctx.moveTo(project(-1, t).x, project(-1, t).y);
        ctx.lineTo(project(1, t).x, project(1, t).y);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(20,20,20,0.4)";
      ctx.beginPath();
      for (let a = 0; a <= 64; a++) {
        const ang = (a / 64) * Math.PI * 2;
        const p = project(Math.cos(ang) * 0.22, Math.sin(ang) * 0.22);
        if (a === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      const water = project(0, 0);
      ctx.beginPath();
      ctx.arc(water.x, water.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(20,20,20,0.75)";
      ctx.fill();

      ctx.fillStyle = "rgba(17,17,17,0.82)";
      HERD.forEach(([x, y], index) => {
        const drift = reduced ? 0 : Math.sin(rot * 8 + index) * 0.035;
        const p = project(x + drift, y + Math.cos(rot * 6 + index) * 0.028);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4 + (index % 3) * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      const droneAng = rot * 3.2;
      const drone = project(Math.cos(droneAng) * 0.82, Math.sin(droneAng) * 0.82);
      ctx.save();
      ctx.translate(drone.x, drone.y);
      ctx.rotate(droneAng);
      ctx.strokeStyle = "rgba(17,17,17,0.9)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.lineTo(-5, 4);
      ctx.lineTo(-5, -4);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="orbit-globe" aria-hidden="true" />;
}
