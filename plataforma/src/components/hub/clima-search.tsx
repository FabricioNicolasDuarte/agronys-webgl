"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PLACE_KEY } from "@/components/hub/place-bar";
import { setSkyOverride } from "@/components/hub/sky-lab";
import { useLang } from "@/components/site/lang-switch";
import type { Lang } from "@/i18n/lang";

type Hit = {
  id: number;
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
};

const COPY: Record<Lang, { seek: string; gps: string; ph: string; empty: string }> = {
  es: {
    seek: "Buscar un lugar",
    gps: "Ubicación en tiempo real",
    ph: "Tres letras del lugar",
    empty: "Sin resultados",
  },
  en: {
    seek: "Search a place",
    gps: "Live location",
    ph: "Three letters of a place",
    empty: "No results",
  },
  pt: {
    seek: "Buscar um lugar",
    gps: "Localização em tempo real",
    ph: "Três letras do lugar",
    empty: "Sem resultados",
  },
  zh: {
    seek: "搜索地点",
    gps: "实时位置",
    ph: "地点的三个字",
    empty: "没有结果",
  },
  gn: {
    seek: "Eheka tenda",
    gps: "Ubicación ko'ágã",
    ph: "Mbohapy tai",
    empty: "Ndaipóri",
  },
};

function label(hit: Hit) {
  return [hit.name, hit.admin1, hit.country].filter(Boolean).join(", ");
}

export function ClimaTools() {
  const lang = useLang();
  const copy = COPY[lang];
  const listId = useId();
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [picked, setPicked] = useState("");
  const [miss, setMiss] = useState(false);

  useEffect(() => {
    const place = document.querySelector<HTMLElement>(".clima-place");
    if (!place) return;
    const openSearch = () => setOpen(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      setOpen(true);
    };
    place.tabIndex = 0;
    place.setAttribute("role", "button");
    place.setAttribute("aria-label", copy.seek);
    place.addEventListener("click", openSearch);
    place.addEventListener("keydown", onKey);
    return () => {
      place.removeEventListener("click", openSearch);
      place.removeEventListener("keydown", onKey);
    };
  }, [copy.seek]);

  useEffect(() => {
    if (!open) return;
    field.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node | null;
      const place = document.querySelector(".clima-place");
      if (!target || box.current?.contains(target) || place?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const q = query.trim();
    if (!open || q.length < 3 || q === picked) {
      setHits([]);
      setMiss(false);
      return;
    }
    const timer = window.setTimeout(() => {
      const language = lang === "gn" ? "es" : lang;
      void fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=${language}&format=json`,
      )
        .then((res) => res.json())
        .then((data) => {
          const next = (data.results || []) as Hit[];
          setHits(next);
          setMiss(next.length === 0);
        })
        .catch(() => {
          setHits([]);
          setMiss(true);
        });
    }, 280);
    return () => window.clearTimeout(timer);
  }, [query, open, picked, lang]);

  function choose(hit: Hit) {
    const place = label(hit);
    setPicked(place);
    setQuery("");
    setHits([]);
    setMiss(false);
    setOpen(false);
    setSkyOverride({
      manual: true,
      lat: hit.latitude,
      lon: hit.longitude,
      place,
      timeZone: hit.timezone || null,
      hour: null,
      wx: "live",
    });
  }

  function live() {
    try {
      localStorage.setItem(PLACE_KEY, "1");
    } catch {
      /* el pedido de ubicación sigue */
    }
    setPicked("");
    setQuery("");
    setHits([]);
    setOpen(false);
    setSkyOverride(null);
  }

  return (
    <div className="clima-tools" ref={box}>
      <button type="button" className="clima-gps" aria-label={copy.gps} title={copy.gps} onClick={live}>
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 2.5v3.2M12 18.3v3.2M2.5 12h3.2M18.3 12h3.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      {open ? (
        <div className="clima-search">
          <input
            ref={field}
            className="clima-find"
            value={query}
            placeholder={copy.ph}
            aria-label={copy.seek}
            autoComplete="off"
            role="combobox"
            aria-expanded={hits.length > 0}
            aria-controls={listId}
            onChange={(event) => {
              setPicked("");
              setQuery(event.target.value);
            }}
          />
          {hits.length > 0 ? (
            <ul className="clima-hits" id={listId}>
              {hits.map((hit) => (
                <li key={hit.id}>
                  <button type="button" onClick={() => choose(hit)}>
                    {label(hit)}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {miss ? <p className="clima-miss">{copy.empty}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
