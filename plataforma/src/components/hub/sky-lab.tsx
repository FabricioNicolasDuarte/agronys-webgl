"use client";

import { useEffect, useState } from "react";

export type SkyWx = "live" | "clear" | "cloud" | "rain" | "storm" | "hail" | "fog" | "snow" | "flood" | "fire" | "frost" | "drought";

export type SkyLabState = {
  manual: true;
  lat: number | null;
  lon: number | null;
  place: string | null;
  timeZone: string | null;
  hour: number | null;
  wx: SkyWx;
};

type Hit = {
  id: number;
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
};

let current: SkyLabState | null = null;
const listeners = new Set<() => void>();

export function getSkyOverride() {
  return current;
}

export function setSkyOverride(next: SkyLabState | null) {
  current = next;
  listeners.forEach((fn) => fn());
}

export function subscribeSky(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const EMPTY: SkyLabState = {
  manual: true,
  lat: null,
  lon: null,
  place: null,
  timeZone: null,
  hour: null,
  wx: "live",
};

function placeLabel(hit: Hit) {
  return [hit.name, hit.admin1, hit.country].filter(Boolean).join(", ");
}

export function SkyLab() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(max-width: 760px)").matches) setOpen(false);
  }, []);
  const [draft, setDraft] = useState<SkyLabState>(() => getSkyOverride() ?? EMPTY);
  const [query, setQuery] = useState(() => getSkyOverride()?.place ?? "");
  const [hits, setHits] = useState<Hit[]>([]);
  const [picked, setPicked] = useState(() => getSkyOverride()?.place ?? "");

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2 || q === picked) {
      setHits([]);
      return;
    }
    const timer = window.setTimeout(() => {
      void fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=es&format=json`)
        .then((res) => res.json())
        .then((data) => setHits((data.results || []) as Hit[]))
        .catch(() => setHits([]));
    }, 280);
    return () => window.clearTimeout(timer);
  }, [query, picked]);

  function publish(next: SkyLabState) {
    setDraft(next);
    setSkyOverride(next);
  }

  function reset() {
    setDraft(EMPTY);
    setQuery("");
    setPicked("");
    setHits([]);
    setSkyOverride(null);
  }

  return (
    <aside className="sky-lab" aria-label="Prueba de cielo">
      <div className="sky-lab-row">
        <p className="sky-lab-kicker">Prueba</p>
        <button type="button" className="sky-lab-text" onClick={() => setOpen((value) => !value)}>
          {open ? "Cerrar" : "Probar cielo"}
        </button>
      </div>
      {open ? (
        <>
          <label htmlFor="sky-place">Lugar</label>
          <input
            id="sky-place"
            value={query}
            placeholder="Cualquier ciudad del mundo"
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
          {hits.length > 0 ? (
            <ul className="sky-lab-hits">
              {hits.map((hit) => (
                <li key={hit.id}>
                  <button
                    type="button"
                    onClick={() => {
                      const place = placeLabel(hit);
                      setPicked(place);
                      setQuery(place);
                      setHits([]);
                      publish({
                        ...draft,
                        lat: hit.latitude,
                        lon: hit.longitude,
                        place,
                        timeZone: hit.timezone || null,
                      });
                    }}
                  >
                    {placeLabel(hit)}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="sky-lab-row">
            <label htmlFor="sky-hour">Hora local del lugar</label>
            <button type="button" className="sky-lab-text" onClick={() => publish({ ...draft, hour: null })}>
              Ahora
            </button>
          </div>
          <input
            id="sky-hour"
            type="range"
            min={0}
            max={23}
            step={1}
            value={draft.hour ?? 12}
            onChange={(event) => publish({ ...draft, hour: Number(event.target.value) })}
          />
          <p className="sky-lab-note">{draft.hour == null ? "Hora real" : `${String(draft.hour).padStart(2, "0")}:00`}</p>

          <label htmlFor="sky-wx">Clima</label>
          <select id="sky-wx" value={draft.wx} onChange={(event) => publish({ ...draft, wx: event.target.value as SkyWx })}>
            <option value="live">Real del lugar</option>
            <option value="clear">Despejado</option>
            <option value="cloud">Nublado</option>
            <option value="rain">Lluvia</option>
            <option value="storm">Tormenta</option>
            <option value="hail">Granizo</option>
            <option value="fog">Niebla</option>
            <option value="snow">Nieve</option>
            <option value="flood">Inundación</option>
            <option value="fire">Incendio</option>
            <option value="frost">Helada</option>
            <option value="drought">Sequía</option>
          </select>
          <button type="button" className="sky-lab-reset" onClick={reset}>
            Mi lugar
          </button>
        </>
      ) : null}
    </aside>
  );
}
