"use client";

import { useEffect, useRef } from "react";

type Kind = "rain" | "storm" | "fog" | "hail" | "snow" | "flood" | "fire" | "frost" | "drought" | "";

type Drop = {
  x: number;
  y: number;
  len: number;
  speed: number;
  drift: number;
  alpha: number;
  r: number;
  sway: number;
};

function between(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function WeatherFx() {
  const ref = useRef<HTMLCanvasElement>(null);
  const fogRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const root = canvas?.closest<HTMLElement>("[data-stage]");
    if (!canvas || !root) return;

    let alive = true;
    let frame = 0;
    let last = 0;
    let built: Kind = "";
    let drops: Drop[] = [];
    let noise: HTMLCanvasElement | null = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function kind(): Kind {
      const wx = root?.dataset.wx || "";
      if (wx === "rain" || wx === "storm" || wx === "fog" || wx === "hail" || wx === "snow" || wx === "flood" || wx === "fire" || wx === "frost" || wx === "drought") return wx;
      return "";
    }

    function build(w: number, h: number, wx: Kind) {
      drops = [];
      built = wx;
      if (wx === "rain" || wx === "storm") {
        const heavy = wx === "storm";
        const count = heavy ? 40 : 24;
        for (let i = 0; i < count; i += 1) {
          drops.push({
            x: Math.random() * w,
            y: Math.random() * h,
            len: between(heavy ? 14 : 10, heavy ? 24 : 18),
            speed: between(heavy ? 100 : 70, heavy ? 150 : 120),
            drift: between(-12, 6),
            alpha: between(0.12, heavy ? 0.28 : 0.22),
            r: 0,
            sway: 0,
          });
        }
      }
      if (wx === "hail") {
        for (let i = 0; i < 18; i += 1) {
          drops.push({
            x: Math.random() * w,
            y: Math.random() * h,
            len: between(5, 9),
            speed: between(220, 340),
            drift: between(-6, 3),
            alpha: between(0.55, 0.9),
            r: between(1.1, 1.8),
            sway: 0,
          });
        }
      }
      if (wx === "snow") {
        for (let i = 0; i < 46; i += 1) {
          drops.push({
            x: Math.random() * w,
            y: Math.random() * h,
            len: 0,
            speed: between(10, 28),
            drift: between(8, 22),
            alpha: between(0.2, 0.55),
            r: between(4, 10),
            sway: Math.random() * Math.PI * 2,
          });
        }
      }
      if (wx === "fire") {
        for (let i = 0; i < 12; i += 1) {
          drops.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.8,
            len: 0,
            speed: between(-18, -8),
            drift: between(6, 16),
            alpha: between(0.25, 0.6),
            r: between(1.4, 2.8),
            sway: Math.random() * Math.PI * 2,
          });
        }
      }
      if ((wx === "fog" || wx === "fire" || wx === "drought") && !noise) {
        const sheet = document.createElement("canvas");
        sheet.width = 160;
        sheet.height = 80;
        const pen = sheet.getContext("2d");
        if (pen) {
          const pixels = pen.createImageData(160, 80);
          for (let i = 0; i < pixels.data.length; i += 4) {
            const grain = Math.random();
            const tone = 150 + grain * 80;
            pixels.data[i] = tone;
            pixels.data[i + 1] = tone + 6;
            pixels.data[i + 2] = tone;
            pixels.data[i + 3] = grain > 0.42 ? Math.floor(50 + grain * 120) : 0;
          }
          pen.putImageData(pixels, 0, 0);
        }
        noise = sheet;
      }
    }

    function fit(node: HTMLCanvasElement, w: number, h: number) {
      node.style.width = "100%";
      node.style.height = "100%";
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(w * dpr);
      const height = Math.floor(h * dpr);
      if (node.width !== width || node.height !== height) {
        node.width = width;
        node.height = height;
      }
      const ctx = node.getContext("2d");
      if (!ctx) return null;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return ctx;
    }

    function paintFront(time: number, w: number, h: number, wx: Kind) {
      const node = fogRef.current;
      if (!node) return;
      const ctx = fit(node, w, h);
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      if (wx === "fog" && noise) paintFogBank(ctx, time, w, h);
      else if (wx === "fire" && noise) paintSmoke(ctx, time, w, h);
      else if (wx === "flood") paintWater(ctx, time, w, h);
      else if (wx === "frost") paintFrost(ctx, w, h);
      else if (wx === "drought" && noise) paintDust(ctx, time, w, h);
    }

    function veil(ctx: CanvasRenderingContext2D, w: number, h: number, top: number, mid: number) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-in";
      const vertical = ctx.createLinearGradient(0, 0, 0, h);
      vertical.addColorStop(0, "rgba(0,0,0,0)");
      vertical.addColorStop(0.3, `rgba(0,0,0,${top})`);
      vertical.addColorStop(0.52, `rgba(0,0,0,${mid})`);
      vertical.addColorStop(0.78, "rgba(0,0,0,1)");
      vertical.addColorStop(0.92, "rgba(0,0,0,0.45)");
      vertical.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vertical;
      ctx.fillRect(0, 0, w, h);
      const sides = ctx.createLinearGradient(0, 0, w, 0);
      sides.addColorStop(0, "rgba(0,0,0,0.15)");
      sides.addColorStop(0.14, "rgba(0,0,0,0.4)");
      sides.addColorStop(0.28, "rgba(0,0,0,1)");
      sides.addColorStop(0.72, "rgba(0,0,0,1)");
      sides.addColorStop(0.86, "rgba(0,0,0,0.4)");
      sides.addColorStop(1, "rgba(0,0,0,0.15)");
      ctx.fillStyle = sides;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    function paintFogBank(ctx: CanvasRenderingContext2D, time: number, w: number, h: number) {
      if (!noise) return;
      const t = time / 1000;
      const dip = Math.pow(Math.max(0, -Math.sin(t * 0.22)), 4);
      const cover = 0.96 - dip * 0.3;
      const shift = (t * 10) % w;
      ctx.save();
      ctx.filter = "blur(40px)";
      ctx.globalAlpha = cover;
      const bank = ctx.createLinearGradient(0, h * 0.4, 0, h * 0.9);
      bank.addColorStop(0, "rgba(176, 184, 178, 0)");
      bank.addColorStop(0.22, "rgba(196, 204, 198, 0.9)");
      bank.addColorStop(0.58, "rgba(206, 214, 208, 1)");
      bank.addColorStop(1, "rgba(184, 192, 186, 0.72)");
      ctx.fillStyle = bank;
      ctx.fillRect(w * 0.14, h * 0.38, w * 0.72, h * 0.52);
      ctx.globalAlpha = cover * 0.45;
      ctx.drawImage(noise, -shift, h * 0.38, w + 2, h * 0.5);
      ctx.drawImage(noise, w - shift, h * 0.38, w + 2, h * 0.5);
      ctx.restore();
      veil(ctx, w, h, 0.12, 0.92);
    }

    function paintFrost(ctx: CanvasRenderingContext2D, w: number, h: number) {
      const sheen = ctx.createLinearGradient(0, h * 0.55, 0, h);
      sheen.addColorStop(0, "rgba(210, 228, 236, 0)");
      sheen.addColorStop(0.35, "rgba(198, 220, 230, 0.16)");
      sheen.addColorStop(1, "rgba(186, 210, 222, 0.28)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, h * 0.5, w, h * 0.5);
    }

    function paintDust(ctx: CanvasRenderingContext2D, time: number, w: number, h: number) {
      if (!noise) return;
      const shift = ((time / 1000) * 14) % w;
      ctx.save();
      ctx.filter = "blur(36px)";
      ctx.globalAlpha = 0.28;
      ctx.drawImage(noise, -shift, h * 0.35, w + 2, h * 0.5);
      ctx.drawImage(noise, w - shift, h * 0.35, w + 2, h * 0.5);
      ctx.restore();
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(150, 110, 60, 0.55)";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    function paintSmoke(ctx: CanvasRenderingContext2D, time: number, w: number, h: number) {
      if (!noise) return;
      const shift = ((time / 1000) * 18) % w;
      ctx.save();
      ctx.filter = "blur(40px)";
      ctx.globalAlpha = 0.5;
      ctx.drawImage(noise, -shift, h * 0.08, w + 2, h * 0.7);
      ctx.drawImage(noise, w - shift, h * 0.08, w + 2, h * 0.7);
      ctx.restore();
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(92, 58, 32, 0.72)";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      veil(ctx, w, h, 0.55, 0.7);
    }

    function paintWater(ctx: CanvasRenderingContext2D, time: number, w: number, h: number) {
      const y0 = h * 0.73;
      const waveAt = (x: number) => Math.sin(x * 0.01 + time / 3200) * 2.2 + Math.sin(x * 0.004 - time / 5400) * 1.4;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, y0 + waveAt(0));
      for (let x = 0; x <= w; x += 24) ctx.lineTo(x, y0 + waveAt(x));
      ctx.lineTo(w, h);
      ctx.closePath();
      const water = ctx.createLinearGradient(0, y0, 0, h);
      water.addColorStop(0, "rgba(130, 138, 120, 0)");
      water.addColorStop(0.08, "rgba(96, 108, 92, 0.42)");
      water.addColorStop(0.28, "rgba(46, 58, 48, 0.86)");
      water.addColorStop(0.7, "rgba(28, 36, 30, 0.7)");
      water.addColorStop(1, "rgba(14, 16, 14, 0.12)");
      ctx.fillStyle = water;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, y0 + waveAt(0));
      for (let x = 0; x <= w; x += 24) ctx.lineTo(x, y0 + waveAt(x));
      ctx.strokeStyle = "rgba(120, 116, 96, 0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    function draw(time: number) {
      const node = ref.current;
      if (!node || !root) return;
      node.style.width = "100%";
      node.style.height = "100%";
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(w * dpr);
      const height = Math.floor(h * dpr);
      if (node.width !== width || node.height !== height) {
        node.width = width;
        node.height = height;
        built = "";
      }
      const wx = kind();
      const ctx = node.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (wx && built !== wx) build(w, h, wx);
      paintFront(time, w, h, wx);
      if (!wx) return;
      const dt = Math.min(0.05, last ? (time - last) / 1000 : 0.016);
      last = time;
      const step = reduce ? 0 : dt;

      if (wx === "fog" && noise) {
        const shift = ((time / 1000) * 22) % w;
        ctx.save();
        ctx.filter = "blur(32px)";
        ctx.globalAlpha = 0.18;
        ctx.drawImage(noise, -shift, 0, w + 2, h * 0.62);
        ctx.drawImage(noise, w - shift, 0, w + 2, h * 0.62);
        ctx.restore();
      }
      if (wx === "fire") {
        const glow = ctx.createRadialGradient(w * 0.5, h * 0.76, 10, w * 0.5, h * 0.76, w * 0.48);
        glow.addColorStop(0, "rgba(255, 110, 36, 0.22)");
        glow.addColorStop(0.45, "rgba(160, 48, 12, 0.08)");
        glow.addColorStop(1, "rgba(40, 8, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.lineCap = "round";
      for (const drop of drops) {
        drop.y += drop.speed * step;
        const sway = drop.sway ? Math.sin(time / 1400 + drop.sway) * drop.drift : 0;
        drop.x += (drop.sway ? 0 : drop.drift) * step;
        if (drop.y > h + 30) {
          drop.y = -30;
          drop.x = Math.random() * w;
        }
        if (drop.y < -20) {
          drop.y = h * 0.78;
          drop.x = Math.random() * w;
        }
        if (drop.x < -40) drop.x = w + 20;
        if (drop.x > w + 40) drop.x = -20;
        const x = drop.x + sway;
        if (wx === "fire") {
          const grad = ctx.createRadialGradient(x, drop.y, 0, x, drop.y, drop.r * 3);
          grad.addColorStop(0, `rgba(255, 186, 90, ${drop.alpha})`);
          grad.addColorStop(0.45, `rgba(255, 90, 24, ${drop.alpha * 0.35})`);
          grad.addColorStop(1, "rgba(255, 60, 0, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, drop.y, drop.r * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (drop.sway) {
          const grad = ctx.createRadialGradient(x, drop.y, 0, x, drop.y, drop.r);
          grad.addColorStop(0, `rgba(255, 255, 255, ${drop.alpha})`);
          grad.addColorStop(0.4, `rgba(255, 255, 255, ${drop.alpha * 0.28})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, drop.y, drop.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (drop.r > 0) {
          ctx.globalAlpha = drop.alpha;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(x, drop.y - drop.len);
          ctx.lineTo(x, drop.y);
          ctx.stroke();
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(x, drop.y, drop.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          ctx.globalAlpha = drop.alpha;
          ctx.strokeStyle = "#d5dee6";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, drop.y);
          ctx.lineTo(x + drop.drift * 0.08, drop.y + drop.len);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    function loop(time: number) {
      if (!alive) return;
      try {
        draw(time);
      } catch (err) {
        canvas.dataset.err = err instanceof Error ? err.message : String(err);
        return;
      }
      if (kind() && !reduce) frame = requestAnimationFrame(loop);
    }

    const watch = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      last = 0;
      built = "";
      draw(performance.now());
      if (kind() && !reduce) frame = requestAnimationFrame(loop);
    });
    watch.observe(root, { attributes: true, attributeFilter: ["data-wx"] });
    draw(performance.now());
    if (kind() && !reduce) frame = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      watch.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="weather-fx" aria-hidden="true" />
      <canvas ref={fogRef} className="fog-front" aria-hidden="true" />
    </>
  );
}
