"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/components/site/lang-switch";
import { PAGES } from "@/i18n/pages";

const KEY = "agronys-cookies";

export function CookieBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(localStorage.getItem(KEY) !== "1");
    } catch {
      setOpen(true);
    }
  }, []);

  const copy = PAGES[useLang()].cookies;
  if (!open) return null;

  return (
    <div className="cookies" role="dialog" aria-label={copy.aria}>
      <p>
        {copy.bar}{" "}
        <Link href="/cookies">{copy.more}</Link>.
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            localStorage.setItem(KEY, "1");
          } catch {
            /* el aviso se cierra igual */
          }
          setOpen(false);
        }}
      >
        {copy.accept}
      </button>
    </div>
  );
}
