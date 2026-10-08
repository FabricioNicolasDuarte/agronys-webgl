"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/site/lang-switch";
import type { Lang } from "@/i18n/lang";

export const PLACE_KEY = "agronys-place";
export const PLACE_EVENT = "agronys-place";

const COPY: Record<Lang, { aria: string; text: string; yes: string; no: string }> = {
  es: {
    aria: "Ubicación",
    text: "Para mostrar el clima del lugar donde abrís Agronys, el sitio puede usar tu ubicación.",
    yes: "Usar mi ubicación",
    no: "Seguir sin ella",
  },
  en: {
    aria: "Location",
    text: "To show the weather where you open Agronys, the site can use your location.",
    yes: "Use my location",
    no: "Continue without it",
  },
  pt: {
    aria: "Localização",
    text: "Para mostrar o clima do lugar onde você abre a Agronys, o site pode usar a sua localização.",
    yes: "Usar minha localização",
    no: "Seguir sem ela",
  },
  zh: {
    aria: "位置",
    text: "为了显示你打开 Agronys 时所在地的天气，网站可以使用你的位置。",
    yes: "使用我的位置",
    no: "暂不使用",
  },
  gn: {
    aria: "Ubicación",
    text: "Ehechauka haguã clima eikéha Agronys, pe sitio ikatu oiporu nde ubicación.",
    yes: "Aiporu che ubicación",
    no: "Ahose hese'ỹ",
  },
};

export function PlaceBar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const copy = COPY[useLang()];

  useEffect(() => {
    if (path !== "/") return;
    try {
      setOpen(localStorage.getItem(PLACE_KEY) == null);
    } catch {
      setOpen(true);
    }
  }, [path]);

  if (path !== "/" || !open) return null;

  function choose(value: "1" | "0") {
    try {
      localStorage.setItem(PLACE_KEY, value);
    } catch {
      /* el aviso se cierra igual */
    }
    setOpen(false);
    if (value === "1") window.dispatchEvent(new Event(PLACE_EVENT));
  }

  return (
    <div className="place-ask" role="dialog" aria-label={copy.aria}>
      <p>{copy.text}</p>
      <button type="button" onClick={() => choose("1")}>
        {copy.yes}
      </button>
      <button type="button" className="place-ask-no" onClick={() => choose("0")}>
        {copy.no}
      </button>
    </div>
  );
}
