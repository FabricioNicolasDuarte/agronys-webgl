"use client";

import Link from "next/link";
import { useEffect } from "react";
import { mountStage } from "@/components/hub/stage";
import { NightSky } from "@/components/hub/night-sky";
import { WeatherFx } from "@/components/hub/weather-fx";
import { PLACE_EVENT, PLACE_KEY } from "@/components/hub/place-bar";
import { getSkyOverride, subscribeSky, type SkyWx } from "@/components/hub/sky-lab";
import { applyChrome, bootLang, getCopy, isLocating, subscribeLang, type TipId } from "@/i18n/lang";
import { DockLinks, LangSwitch } from "@/components/site/lang-switch";
import { InfoMenu } from "@/components/site/site-notch";

type Forecast = {
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  cloud_cover?: number;
  wind_speed_10m: number;
  precipitation: number;
  snowfall?: number;
  hazard?: "flood" | "fire" | "frost" | "drought";
};

const FALLBACK = { lat: -27.451, lon: -58.987, place: "Resistencia, Chaco" };

function formatPlace(city?: string, region?: string) {
  const name = (city || "").trim();
  const area = (region || "").trim();
  if (!name) return "";
  if (!area || area.toLowerCase() === name.toLowerCase()) return name;
  return `${name}, ${area}`;
}

function ith(temp: number, humidity: number) {
  return 0.8 * temp + (humidity / 100) * (temp - 14.4) + 46.4;
}

function tipId(now: Forecast, phase: string): TipId {
  const index = ith(now.temperature_2m, now.relative_humidity_2m);
  const code = now.weather_code;
  if (now.hazard === "fire") return "fire";
  if (now.hazard === "flood") return "flood";
  if (now.hazard === "drought") return "drought";
  if (now.hazard === "frost" || (now.temperature_2m <= 2 && now.precipitation <= 0.1 && (now.snowfall ?? 0) === 0 && code < 51)) return "frost";
  if (code === 96 || code === 99) return "hail";
  if (code >= 95) return "storm";
  if ((now.snowfall ?? 0) > 0 || (code >= 71 && code <= 77)) return "snow";
  if (now.precipitation > 0.2 || code >= 61) return "rain";
  if (code === 45 || code === 48) return "fog";
  if (index >= 79 || now.temperature_2m >= 33) return "heatHigh";
  if (index >= 72) return "heat";
  if (now.wind_speed_10m >= 30) return "wind";
  if (phase === "night") return "night";
  if (phase === "dusk") return "dusk";
  if (phase === "dawn") return "dawn";
  return "clear";
}

type Season = "summer" | "autumn" | "winter" | "spring";

function seasonOf(date: Date, latitude: number): Season {
  const month = date.getMonth();
  const north: Season = month === 11 || month < 2 ? "winter" : month < 5 ? "spring" : month < 8 ? "summer" : "autumn";
  if (latitude >= 0) return north;
  const flip: Record<Season, Season> = { winter: "summer", spring: "autumn", summer: "winter", autumn: "spring" };
  return flip[north];
}

function localHour(date: Date, timeZone: string) {
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    hourCycle: "h23",
  })
    .formatToParts(date)
    .find((item) => item.type === "hour");
  const hour = Number(part?.value);
  return Number.isFinite(hour) ? hour % 24 : 12;
}

function dateAtLocalHour(hour: number, timeZone: string) {
  const day = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const utcGuess = new Date(`${day}T${String(hour).padStart(2, "0")}:00:00Z`);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(fmt.formatToParts(utcGuess).map((part) => [part.type, part.value]));
  const asZone = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return new Date(utcGuess.getTime() - (asZone - utcGuess.getTime()));
}

function presetForecast(kind: Exclude<SkyWx, "live">): Forecast {
  const base: Forecast = {
    temperature_2m: 22,
    relative_humidity_2m: 60,
    weather_code: 0,
    cloud_cover: 8,
    wind_speed_10m: 10,
    precipitation: 0,
    snowfall: 0,
  };
  if (kind === "cloud") return { ...base, weather_code: 3, cloud_cover: 92 };
  if (kind === "rain") return { ...base, weather_code: 63, precipitation: 3.2, cloud_cover: 100, temperature_2m: 18 };
  if (kind === "storm") return { ...base, weather_code: 95, precipitation: 14, cloud_cover: 100, wind_speed_10m: 42, temperature_2m: 19 };
  if (kind === "hail") return { ...base, weather_code: 96, precipitation: 8, cloud_cover: 100, wind_speed_10m: 28, temperature_2m: 16 };
  if (kind === "fog") return { ...base, weather_code: 45, cloud_cover: 100, temperature_2m: 12 };
  if (kind === "snow") return { ...base, weather_code: 73, snowfall: 1.2, cloud_cover: 95, temperature_2m: -2 };
  if (kind === "flood") return { ...base, weather_code: 65, precipitation: 30, cloud_cover: 100, hazard: "flood", temperature_2m: 20, wind_speed_10m: 14 };
  if (kind === "fire") return { ...base, weather_code: 0, cloud_cover: 35, hazard: "fire", temperature_2m: 34, relative_humidity_2m: 22, wind_speed_10m: 24 };
  if (kind === "frost") return { ...base, weather_code: 0, cloud_cover: 12, hazard: "frost", temperature_2m: -1, relative_humidity_2m: 80, wind_speed_10m: 6 };
  if (kind === "drought") return { ...base, weather_code: 0, cloud_cover: 4, hazard: "drought", temperature_2m: 36, relative_humidity_2m: 18, wind_speed_10m: 16 };
  return base;
}

function solar(lat: number, lon: number, date = new Date()) {
  const rad = Math.PI / 180;
  const yearStart = new Date(date.getFullYear(), 0, 0).getTime();
  const day = Math.floor((date.getTime() - yearStart) / 86400000);
  const decl = 23.45 * Math.sin(((360 / 365) * (day - 81)) * rad);
  const b = ((360 / 365) * (day - 81)) * rad;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const tz = -date.getTimezoneOffset() / 60;
  const minutes = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
  const hra = 15 * ((minutes + 4 * (lon - 15 * tz) + eot) / 60 - 12);
  const elev =
    Math.asin(
      Math.sin(decl * rad) * Math.sin(lat * rad) +
        Math.cos(decl * rad) * Math.cos(lat * rad) * Math.cos(hra * rad),
    ) / rad;
  return { elev, hra };
}

function phenomenon(now: Forecast) {
  const code = now.weather_code;
  if (now.hazard === "fire") return "fire";
  if (now.hazard === "flood") return "flood";
  if (now.hazard === "drought") return "drought";
  if (now.hazard === "frost") return "frost";
  if (code === 96 || code === 99) return "hail";
  if (code >= 95) return "storm";
  if ((now.snowfall ?? 0) > 0 || (code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (now.precipitation > 0.15 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if (code === 45 || code === 48) return "fog";
  if (now.temperature_2m <= 2 && now.precipitation <= 0.1 && (now.snowfall ?? 0) === 0 && code < 51) return "frost";
  if (code >= 2) return "cloud";
  return "clear";
}

export function Hub() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-stage]");
    if (!root) return;
    return mountStage(root);
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-stage]");
    if (!root) return;
    let cancel = false;
    let lat = FALLBACK.lat;
    let lon = FALLBACK.lon;
    let place = "Ubicando…";
    let now: Forecast | null = null;

    let zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const seasonLook = {
      summer: ["-8deg", "1.28", "0.06", "190", "80"],
      autumn: ["16deg", "0.9", "0.22", "150", "50"],
      winter: ["22deg", "0.62", "0.02", "214", "170"],
      spring: ["-14deg", "1.16", "0.04", "206", "100"],
    } as const;

    function paint() {
      if (!root) return;
      const over = getSkyOverride();
      if (over?.lat != null && over.lon != null) {
        lat = over.lat;
        lon = over.lon;
      }
      if (over?.place) place = over.place;
      if (over?.timeZone) zone = over.timeZone;
      const sample = over && over.wx !== "live" ? presetForecast(over.wx) : now;
      const date = over?.hour == null ? new Date() : dateAtLocalHour(over.hour, zone);
      const sun = solar(lat, lon, date);
      const season = seasonOf(date, lat);
      const [hue, sat, sepia, sunG, sunB] = seasonLook[season];
      let phase = "day";
      if (sun.elev < -4) phase = "night";
      else if (sun.elev < 8 && sun.hra > 0) phase = "dusk";
      else if (sun.elev < 8) phase = "dawn";
      let lux = sun.elev <= -12 ? 0.14 : sun.elev < 0 ? 0.14 + ((sun.elev + 12) / 12) * 0.28 : sun.elev < 12 ? 0.42 + (sun.elev / 12) * 0.24 : Math.min(0.96, 0.66 + ((sun.elev - 12) / 58) * 0.3);
      const cover = (sample?.cloud_cover ?? 0) / 100;
      lux *= 1 - cover * 0.4;
      const wx = sample ? phenomenon(sample) : "clear";
      if (wx === "rain") lux *= 0.78;
      if (wx === "storm" || wx === "hail") lux *= 0.6;
      if (wx === "snow") lux *= 0.84;
      if (wx === "fog") lux = Math.min(lux, 0.4);
      if (wx === "flood") lux *= 0.7;
      if (wx === "fire") lux *= 0.78;
      if (wx === "frost") lux *= 0.88;
      if (wx === "drought") lux = Math.min(0.92, lux * 1.05);
      const moon = sun.elev < 3 ? Math.min(1, (3 - sun.elev) / 12) : 0;
      if (phase === "night") lux = Math.max(0.34, 0.42 * (1 - cover * 0.12));
      const wind = sample?.wind_speed_10m ?? 8;
      const sway = wx === "storm" || wind >= 30 ? 6 : wx === "rain" || wx === "hail" || wind >= 18 ? 4.2 : phase === "night" ? 1.15 : 2.3;
      const baseHue = parseFloat(hue);
      const baseSepia = sample && sample.temperature_2m >= 33 ? 0.28 : Number(sepia);
      root.style.setProperty("--lux", lux.toFixed(3));
      root.style.setProperty("--soil", phase === "night" ? "0.2" : "0.08");
      root.style.setProperty("--mono", moon.toFixed(2));
      root.style.setProperty("--sat", (Number(sat) * (1 - moon) + 0.62 * moon).toFixed(2));
      root.style.setProperty("--hue", `${Math.round(baseHue * (1 - moon) + 200 * moon)}deg`);
      root.style.setProperty("--sepia", (baseSepia * (1 - moon) + 0.55 * moon).toFixed(2));
      root.style.setProperty("--sun-x", `${Math.min(92, Math.max(8, 50 + (sun.hra / 78) * 38)).toFixed(1)}%`);
      root.style.setProperty("--sun-y", `${sun.elev > 0 ? Math.max(5, 48 - sun.elev * 0.55) : 56}%`);
      root.style.setProperty("--sun-g", phase === "dusk" || phase === "dawn" ? "150" : sunG);
      root.style.setProperty("--sun-b", phase === "dusk" || phase === "dawn" ? "40" : sunB);
      root.style.setProperty("--sun-a", phase === "night" || sun.elev < -6 ? "0" : sun.elev < 10 ? "0.42" : "0.24");
      root.style.setProperty("--star", sun.elev < 3 ? Math.min(1, (3 - sun.elev) / 12).toFixed(2) : "0");
      root.style.setProperty("--sway", `${sway}deg`);
      root.style.setProperty("--sway-time", `${sway > 4 ? 2.3 : phase === "night" ? 8.5 : 6}s`);
      const hour = localHour(date, zone);
      root.dataset.phase = phase;
      root.dataset.season = season;
      root.dataset.wx = wx;
      root.dataset.rest = hour >= 23 || hour < 5 ? "1" : "0";
      root.dataset.sky = wx === "clear" ? phase : wx;
      const copy = getCopy();
      const clock = date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: zone });
      const phaseName = copy.phase[phase as keyof typeof copy.phase];
      const wxName = copy.wx[wx as keyof typeof copy.wx];
      const placeEl = root.querySelector(".clima-place");
      const timeEl = root.querySelector(".clima-time");
      const phaseEl = root.querySelector(".clima-phase");
      const tempEl = root.querySelector<HTMLElement>(".clima-temp");
      const wxEl = root.querySelector(".clima-wx");
      const advice = root.querySelector(".clima-tip");
      if (placeEl) placeEl.textContent = isLocating(place) ? copy.locating : place;
      if (timeEl) timeEl.textContent = clock;
      if (phaseEl) phaseEl.textContent = phaseName ?? "";
      if (tempEl) {
        tempEl.hidden = !sample;
        if (sample) tempEl.textContent = `${Math.round(sample.temperature_2m)}°`;
      }
      if (wxEl) wxEl.textContent = wxName ?? "";
      if (advice) advice.textContent = sample ? copy.tips[tipId(sample, phase)] : copy.reading;
    }

    async function loadWeather() {
      try {
        const weather = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,cloud_cover,wind_speed_10m,precipitation,snowfall&timezone=auto`,
        );
        const data = await weather.json();
        if (cancel || !data.current) return;
        now = data.current as Forecast;
        paint();
      } catch {
        paint();
      }
    }

    async function namePlace() {
      if (cancel || getSkyOverride()?.place) return;
      try {
        const geo = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=es`,
        );
        const found = await geo.json();
        const results = (found.results || []) as { name?: string; admin1?: string; feature_code?: string }[];
        const hit =
          results.find((item) => String(item.feature_code || "").startsWith("PPL")) ||
          results.find((item) => item.name && !/departamento/i.test(item.name));
        const label = formatPlace(hit?.name, hit?.admin1);
        if (!cancel && !getSkyOverride()?.place && label) {
          place = label;
          paint();
          return;
        }
      } catch {
        /* segundo geocodificador */
      }
      try {
        const geo = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`,
        );
        const found = await geo.json();
        const admin = (found.localityInfo?.administrative || []) as { name?: string; adminLevel?: number }[];
        const town = admin.find((item) => item.adminLevel === 8)?.name;
        const rawCity = /departamento|municipio/i.test(found.city || "") ? "" : found.city;
        const label = formatPlace(town || found.locality || rawCity, found.principalSubdivision);
        if (!cancel && !getSkyOverride()?.place && label) {
          place = label;
          paint();
          return;
        }
      } catch {
        /* queda el fallback */
      }
      if (!cancel && !getSkyOverride()?.place) {
        place = FALLBACK.place;
        paint();
      }
    }

    function locateDevice() {
      place = "Ubicando…";
      zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      paint();
      let allowed = false;
      try {
        allowed = localStorage.getItem(PLACE_KEY) === "1";
      } catch {
        allowed = false;
      }
      if (!allowed || !navigator.geolocation) {
        lat = FALLBACK.lat;
        lon = FALLBACK.lon;
        place = FALLBACK.place;
        paint();
        void loadWeather();
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (cancel || getSkyOverride()?.place) return;
          lat = pos.coords.latitude;
          lon = pos.coords.longitude;
          void namePlace();
          void loadWeather();
        },
        () => {
          if (cancel || getSkyOverride()?.place) return;
          lat = FALLBACK.lat;
          lon = FALLBACK.lon;
          place = FALLBACK.place;
          paint();
          void loadWeather();
        },
        { enableHighAccuracy: false, timeout: 4000, maximumAge: 600000 },
      );
    }

    bootLang();
    applyChrome(root);
    paint();
    const unLang = subscribeLang(() => {
      applyChrome(root);
      paint();
    });
    const clockTimer = window.setInterval(paint, 5000);
    const meteoTimer = window.setInterval(() => void loadWeather(), 8 * 60 * 1000);
    const fallbackTimer = window.setTimeout(() => void loadWeather(), 1200);
    locateDevice();
    window.addEventListener(PLACE_EVENT, locateDevice);
    let lastSpot = "";
    const unsubscribe = subscribeSky(() => {
      const over = getSkyOverride();
      if (!over) {
        lastSpot = "";
        locateDevice();
        return;
      }
      if (over.lat != null && over.lon != null) {
        lat = over.lat;
        lon = over.lon;
      }
      if (over.place) place = over.place;
      if (over.timeZone) zone = over.timeZone;
      const spot = over.lat != null && over.lon != null ? `${over.lat},${over.lon}` : lastSpot;
      const moved = spot !== lastSpot && over.lat != null;
      if (over.lat != null) lastSpot = spot;
      if (moved) void loadWeather();
      else paint();
    });

    return () => {
      cancel = true;
      unsubscribe();
      unLang();
      window.removeEventListener(PLACE_EVENT, locateDevice);
      window.clearInterval(clockTimer);
      window.clearInterval(meteoTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="portal" data-stage="">
      <div className="field" aria-hidden="true" />
      <div className="soil" aria-hidden="true" />
      <NightSky />
      <div className="sky-fx" aria-hidden="true" />
      <WeatherFx />
      <svg id="leads" className="leads" aria-hidden="true" />
      <svg id="tails" className="tails" aria-hidden="true" />
      <div id="ui">
        <header className="topbar">
          <p className="brand">
            <Link href="/">
              <img className="brand-logo" src="/logos/logo-texto-blanco.svg" alt="Agronys" />
            </Link>
          </p>
          <div className="top-actions">
            <LangSwitch />
            <Link className="profile" href="/entrar" aria-label="Cuenta">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 19c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </header>
        <aside className="clima" aria-label="Clima y recomendación">
          <p className="clima-place">Ubicando…</p>
          <div className="clima-meta">
            <span className="clima-time">—</span>
            <span className="clima-phase">—</span>
            <span className="clima-temp" hidden>—</span>
            <span className="clima-wx">—</span>
          </div>
          <p className="clima-tip">Leyendo el clima de donde abrís Agronys.</p>
        </aside>

        <main className="board">
          <div className="svc" role="group" aria-label="Lo que Agronys te resuelve">
            <button type="button" className="svc-btn" data-layer="automat" aria-label="El aviso sale solo">
              <img src="/icons/automat.svg" alt="" width={18} height={18} />
            </button>
            <button type="button" className="svc-btn" data-layer="dataeng" aria-label="Los números de tu campaña">
              <img src="/icons/dataeng.svg" alt="" width={18} height={18} />
            </button>
            <button type="button" className="svc-btn" data-layer="offline" aria-label="Seguís aunque no haya señal">
              <img src="/icons/offline.svg" alt="" width={18} height={18} />
            </button>
          </div>
          <div className="col col-left">
            <button type="button" className="panel" data-layer="vision" aria-label="La cámara mira el animal">
              <span className="orb" data-node="2"><img src="/icons/vision.svg" alt="" width={22} height={22} /></span>
            </button>
            <button type="button" className="panel" data-layer="ganaderia" aria-label="Todo el rodeo, en un solo lugar">
              <span className="orb" data-node="1"><img src="/icons/ganaderia.svg" alt="" width={22} height={22} /></span>
            </button>
            <button type="button" className="panel" data-layer="orquestacion" aria-label="Te avisa a tiempo">
              <span className="orb" data-node="4"><img src="/icons/orquestacion.svg" alt="" width={22} height={22} /></span>
            </button>
          </div>
          <div className="hub">
            <svg className="hub-art" viewBox="0 0 1020 760" role="img" aria-label="Vaca y maíz de Agronys">
              <g className="sway-cow" id="art-vaca" />
              <g className="sway-plant" id="art-maiz" />
            </svg>
          </div>
          <div className="col col-right">
            <button type="button" className="panel" data-layer="satelital" aria-label="El pasto, visto desde arriba">
              <span className="orb" data-node="5"><img src="/icons/satelital.svg" alt="" width={22} height={22} /></span>
            </button>
            <button type="button" className="panel" data-layer="agro" aria-label="Qué potrero rinde">
              <span className="orb" data-node="3"><img src="/icons/agro.svg" alt="" width={22} height={22} /></span>
            </button>
            <button type="button" className="panel" data-layer="datos" aria-label="Anotá el día en el lote">
              <span className="orb" data-node="0"><img src="/icons/datos.svg" alt="" width={22} height={22} /></span>
            </button>
          </div>
        </main>

        <div className="bottom-bar">
          <nav className="dock" aria-label="Secciones del sitio">
            <DockLinks />
            <InfoMenu place="dock" />
          </nav>
        </div>
      </div>
      <div id="cascade" className="cascade" hidden />
    </div>
  );
}
