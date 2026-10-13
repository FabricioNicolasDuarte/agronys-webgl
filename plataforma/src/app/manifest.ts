import type { MetadataRoute } from "next";

const DESCRIPTION =
  "Agronys desarrolla y comercializa software, datos e integración para el establecimiento. Nutrogan, SIGAG y Datagronys son tres de sus productos.";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agronys",
    short_name: "Agronys",
    description: DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#0c0e0d",
    theme_color: "#0c0e0d",
    lang: "es",
    icons: [
      { src: "/favicon.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
