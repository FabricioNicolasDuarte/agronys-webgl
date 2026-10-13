"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/site/lang-switch";
import type { Lang } from "@/i18n/lang";

const KEY = "agronys-sound";

const BEDS = {
  home: { src: "/orbit/audio/silk-and-cedar.mp3", gain: 0.46 },
  servicios: { src: "/orbit/audio/servicios.mp3", gain: 0.7 },
  productos: { src: "/orbit/audio/productos.mp3", gain: 0.7 },
  empresa: { src: "/orbit/audio/empresa.mp3", gain: 0.7 },
  contacto: { src: "/orbit/audio/contacto.mp3", gain: 0.7 },
} as const;

type BedId = keyof typeof BEDS;

const LABEL: Record<Lang, { off: string; on: string }> = {
  es: { on: "Silenciar", off: "Activar sonido" },
  en: { on: "Mute", off: "Turn sound on" },
  pt: { on: "Silenciar", off: "Ligar o som" },
  zh: { on: "关闭声音", off: "打开声音" },
  gn: { on: "Emboty mbopu", off: "Emoĩ mbopu" },
};

function bedFor(path: string): BedId | null {
  if (path === "/") return "home";
  if (path === "/servicios") return "servicios";
  if (path === "/empresa") return "empresa";
  if (path === "/contacto") return "contacto";
  if (path.startsWith("/productos")) return "productos";
  return null;
}

function droneAmount() {
  const node = document.querySelector(".sol-drone");
  if (!node) return 0;
  const box = node.getBoundingClientRect();
  if (box.height < 8) return 0;
  const visible = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0);
  const inside = Math.min(1, Math.max(0, visible / box.height));
  const mid = (box.top + box.bottom) / 2 / window.innerHeight;
  const center = 1 - Math.min(1, Math.abs(mid - 0.5) * 1.6);
  return inside * Math.max(0.35, center);
}

function makeDrone(ac: AudioContext) {
  const master = ac.createGain();
  master.gain.value = 0;
  master.connect(ac.destination);

  const body = ac.createGain();
  body.gain.value = 0.8;
  body.connect(master);
  const pulse = ac.createOscillator();
  const pulseGain = ac.createGain();
  pulse.frequency.value = 6;
  pulseGain.gain.value = 0.16;
  pulse.connect(pulseGain);
  pulseGain.connect(body.gain);
  pulse.start();

  ([
    [174, "sine", 0.62],
    [220, "sine", 0.28],
    [261, "triangle", 0.14],
    [349, "sine", 0.07],
  ] as const).forEach(([freq, type, level]) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = level;
    osc.connect(gain);
    gain.connect(body);
    osc.start();
  });

  return master;
}

export function Soundscape() {
  const path = usePathname();
  const lang = useLang();
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);
  const onRef = useRef(true);
  const pathRef = useRef(path);
  const music = useRef<Partial<Record<BedId, HTMLAudioElement>>>({});
  const levels = useRef<Record<BedId, number>>({
    home: 0,
    servicios: 0,
    productos: 0,
    empresa: 0,
    contacto: 0,
  });
  const droneLevel = useRef(0);
  const droneGain = useRef<GainNode | null>(null);
  const context = useRef<AudioContext | null>(null);
  const blocked = useRef(false);

  onRef.current = on;
  pathRef.current = path;

  useEffect(() => {
    try {
      setOn(localStorage.getItem(KEY) !== "off");
    } catch {
      setOn(true);
    }
    (Object.keys(BEDS) as BedId[]).forEach((id) => {
      const audio = new Audio(BEDS[id].src);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      music.current[id] = audio;
    });
    setReady(true);
    return () => {
      (Object.keys(BEDS) as BedId[]).forEach((id) => music.current[id]?.pause());
      music.current = {};
    };
  }, []);

  function openDrone() {
    if (droneGain.current) {
      if (context.current && context.current.state !== "running") void context.current.resume();
      return;
    }
    const ac = new AudioContext();
    context.current = ac;
    droneGain.current = makeDrone(ac);
    if (ac.state !== "running") void ac.resume();
  }

  useEffect(() => {
    if (!ready) return;
    let frame = 0;
    const tick = () => {
      const enabled = onRef.current;
      const here = pathRef.current;
      const active = enabled ? bedFor(here) : null;
      (Object.keys(BEDS) as BedId[]).forEach((id) => {
        const target = active === id ? BEDS[id].gain : 0;
        const now = levels.current;
        now[id] += (target - now[id]) * 0.045;
        const audio = music.current[id];
        if (!audio) return;
        audio.volume = Math.max(0, Math.min(1, now[id]));
        if (target > 0 && audio.paused && !blocked.current) {
          blocked.current = true;
          void audio.play().then(() => {
            blocked.current = false;
          }).catch(() => {});
        }
        if (target === 0 && now[id] < 0.01 && !audio.paused) audio.pause();
      });
      const droneTarget = enabled && here === "/metodo" ? droneAmount() * 0.78 : 0;
      droneLevel.current += (droneTarget - droneLevel.current) * 0.045;
      if (droneGain.current) droneGain.current.gain.value = Math.max(0, droneLevel.current);
      else if (droneTarget > 0) openDrone();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const kick = () => {
      blocked.current = false;
      if (!onRef.current) return;
      if (context.current && context.current.state !== "running") void context.current.resume();
      const id = bedFor(pathRef.current);
      if (id && music.current[id]?.paused) void music.current[id]?.play().catch(() => {});
      if (pathRef.current === "/metodo") openDrone();
    };
    window.addEventListener("pointerdown", kick);
    window.addEventListener("keydown", kick);
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
  }, [ready]);

  function toggle() {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem(KEY, next ? "on" : "off");
    } catch {
      /* sigue el estado en memoria */
    }
    if (!next) return;
    blocked.current = false;
    const id = bedFor(path);
    if (id) void music.current[id]?.play().catch(() => {});
    if (path === "/metodo") openDrone();
  }

  const label = LABEL[lang][on ? "on" : "off"];

  return (
    <button
      type="button"
      className={on ? "sound-toggle is-on" : "sound-toggle"}
      aria-pressed={on}
      aria-label={label}
      title={label}
      onClick={toggle}
    >
      <span className="sound-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
