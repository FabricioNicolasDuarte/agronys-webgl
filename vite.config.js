import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  server: {
    port: 5173,
    strictPort: true,
  },
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        "quienes-somos": resolve(root, "quienes-somos.html"),
        enfoque: resolve(root, "enfoque.html"),
        servicios: resolve(root, "servicios.html"),
        productos: resolve(root, "productos.html"),
        contacto: resolve(root, "contacto.html"),
        "aviso-legal": resolve(root, "aviso-legal.html"),
        privacidad: resolve(root, "privacidad.html"),
        cookies: resolve(root, "cookies.html"),
        terminos: resolve(root, "terminos.html"),
        accesibilidad: resolve(root, "accesibilidad.html"),
      },
    },
  },
});
