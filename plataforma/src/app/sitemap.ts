import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

const PATHS = [
  "/",
  "/empresa",
  "/metodo",
  "/servicios",
  "/soluciones",
  "/contacto",
  "/productos/nutrogan",
  "/productos/sigag",
  "/productos/datagronys",
  "/privacidad",
  "/terminos",
  "/cookies",
  "/aviso-legal",
  "/accesibilidad",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-13");
  return PATHS.map((path) => ({
    url: `${SITE}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
