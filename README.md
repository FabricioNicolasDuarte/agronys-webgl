# Agronys

Sitio público y cuenta. Lo que responde `agronys.com` es `plataforma` (Next.js).

## Local

```bash
cd plataforma
npm install
npm run dev
```

http://localhost:3000

La cuenta está en `/entrar`. Las claves van en `plataforma/.env.local` y no se versionan.

## Producción

Vercel, con la raíz del proyecto en `plataforma`: https://agronys.com

El directorio de este repo conserva el sitio estático anterior (Vite, `npm run dev` en la raíz). Ya no es el que publica el dominio.
