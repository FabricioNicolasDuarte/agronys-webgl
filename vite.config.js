import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { staffApi } from "./scripts/staff-api.mjs";

const root = dirname(fileURLToPath(import.meta.url));

const pages = [
  "quienes-somos",
  "enfoque",
  "servicios",
  "productos",
  "contacto",
  "aviso-legal",
  "privacidad",
  "cookies",
  "terminos",
  "accesibilidad",
  "entrar",
];

const input = {
  main: resolve(root, "index.html"),
};
for (const slug of pages) {
  input[slug] = resolve(root, slug, "index.html");
}

export default defineConfig({
  plugins: [staffApi()],
  // Apex domain agronys.com — absolute paths enable clean folder URLs
  base: "/",
  server: {
    port: 5173,
    strictPort: true,
  },
  publicDir: "public",
  build: {
    rollupOptions: { input },
  },
});
