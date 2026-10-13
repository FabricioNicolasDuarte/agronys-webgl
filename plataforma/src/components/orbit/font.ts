import { Archivo, Noto_Sans } from "next/font/google";
import type { Lang } from "@/i18n/lang";

const display = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const guarani = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export function orbitClass(lang: Lang) {
  if (lang === "zh") return "orbit-zh";
  if (lang === "gn") return guarani.className;
  return display.className;
}
