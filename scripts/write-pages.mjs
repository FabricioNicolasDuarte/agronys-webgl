function nav(active) {
  const items = [
    ["./index.html", "Portal"],
    ["./enfoque.html", "Enfoque"],
    ["./servicios.html", "Servicios"],
    ["./productos.html", "Productos"],
    ["./contacto.html", "Contacto"],
  ];
  return items
    .map(
      ([href, label]) =>
        `<a href="${href}"${active === label ? ' aria-current="page"' : ""}>${label}</a>`,
    )
    .join("\n            ");
}

function page({ title, desc, active, h1, body }) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${desc}" />
    <title>${title}</title>
    <link rel="stylesheet" href="./src/style.css" />
  </head>
  <body class="doc">
    <a class="skip-link" href="#main">Saltar al contenido</a>
    <header class="doc-head">
      <a class="brand-name" href="./index.html">Skadia</a>
      <nav class="top-nav" aria-label="Secciones del sitio">
            ${nav(active)}
      </nav>
    </header>
    <main id="main" class="block page-doc">
      <h1>${h1}</h1>
      ${body}
    </main>
    <footer class="site-foot">
      <p>© <span id="y"></span> Skadia</p>
      <nav aria-label="Legal">
        <a href="./aviso-legal.html">Aviso legal</a>
        <a href="./privacidad.html">Privacidad</a>
        <a href="./cookies.html">Cookies</a>
        <a href="./terminos.html">Términos</a>
        <a href="./accesibilidad.html">Accesibilidad</a>
        <a href="./contacto.html">Contacto</a>
      </nav>
    </footer>
    <div id="cookies-bar" class="cookies" hidden>
      <p>Usamos solo una preferencia técnica para recordar este aviso. <a href="./cookies.html">Más información</a>.</p>
      <button type="button" id="cookies-ok">Aceptar</button>
    </div>
    <script type="module" src="./src/inner.js"></script>
  </body>
</html>
`;
}

const pages = {
  "enfoque.html": page({
    title: "Enfoque · Skadia",
    desc: "Qué es Skadia y para quién trabaja, en lenguaje de campo.",
    active: "Enfoque",
    h1: "El dato tiene que servir en el potrero, no recién en la oficina.",
    body: `
      <p class="eyebrow">Skadia · desde 2022</p>
      <p>Skadia es una startup AgTech argentina. Dirige el producto y la técnica <strong>Fabricio Nicolás Duarte</strong> (co-founder, Lead Developer y CTO), con base en Resistencia, Chaco. El trabajo de la empresa es que el productor y el empresario agroganadero puedan <strong>decidir con lo que está pasando en el lote</strong>.</p>
      <p>No vendemos un tablero lindo para la ciudad. Vendemos que calor, carga, condición del animal y pasto dejen de vivir en recuerdos distintos: el del encargado, el del veterinario y el de la planilla del viernes.</p>
      <h2>¿Para qué se necesita?</h2>
      <ul class="plain">
        <li><strong>El animal no espera.</strong> El pico de calor o un lote pasado de carga se ven tarde si todo se anota “cuando haya Wi‑Fi”.</li>
        <li><strong>En el campo no siempre hay red.</strong> Un sistema que solo anda conectado empuja a perder el dato.</li>
        <li><strong>Cada uno ve distinto.</strong> Hace falta la misma hacienda en la conversación, no tres versiones.</li>
        <li><strong>El pasto y el rodeo son el mismo negocio.</strong> Separarlos en sistemas distintos termina en decisiones a medias.</li>
      </ul>
      <p>De esa línea nace <a href="./productos.html">SIGAG</a> (Sistema Integral de Gestión Agrícola Ganadera). Nutrogan es la plataforma de territorio, recursos y NDVI; SIGAG cubre visión, sanidad y operación en el lote.</p>
    `,
  }),
  "servicios.html": page({
    title: "Servicios · Skadia",
    desc: "Qué ofrece Skadia al productor, en criollo.",
    active: "Servicios",
    h1: "Qué ofrecemos, en criollo",
    body: `
      <p>Cuatro formas de acompañar al establecimiento. El producto que las junta es <a href="./productos.html">SIGAG</a>.</p>
      <div class="cards">
        <article>
          <h2>Manejo de la hacienda</h2>
          <p>Ver estrés por calor, cuántos animales entran en un potrero y cómo viene la ganancia. Para no trabajar hacienda en el peor momento y para no adivinar la carga. En el producto: ITH, carga, GMD/ADG.</p>
        </article>
        <article>
          <h2>Lectura más pareja del animal</h2>
          <p>Visión para condición corporal y reconocimiento: que el encargado y el dueño hablen de lo mismo. Complementa al personal; no diagnostica ni opera sola.</p>
        </article>
        <article>
          <h2>Trabajo con o sin señal</h2>
          <p>Cargar en el lote. Cuando hay red, se actualiza lo que cambió. El celular es la verdad del día hasta que cierra con la oficina. Offline-first, sincronización diferencial.</p>
        </article>
        <article>
          <h2>Que avise a tiempo, y se pueda preguntar</h2>
          <p>Priorizar sanidad y manejo (el próximo paso). Consulta en lenguaje claro. La IA sirve si registra un pesaje, aísla un animal o arma una orden de trabajo — no si solo conversa.</p>
        </article>
      </div>
    `,
  }),
  "productos.html": page({
    title: "Productos · Skadia",
    desc: "SIGAG, Sistema Integral de Gestión Agrícola Ganadera.",
    active: "Productos",
    h1: "Productos",
    body: `
      <p>Hoy el producto de Skadia para el establecimiento es <strong>SIGAG</strong>.</p>
      <article class="product">
        <img class="product-icon" src="./icons/producto-sigag.svg" alt="" width="56" height="56" />
        <div>
          <p class="eyebrow">Producto</p>
          <h2>SIGAG — Sistema Integral de Gestión Agrícola Ganadera</h2>
          <p>Plataforma de ganadería de precisión para el campo y la oficina. El dato se captura donde está el trabajo y alimenta modelos y tableros cuando hay red.</p>
          <p>Incluye, según el despliegue:</p>
          <ul>
            <li>Persistencia local y sync diferencial (WatermelonDB).</li>
            <li>Visión: condición corporal y reconocimiento de animales.</li>
            <li>Motores: GMD, ITH, carga, sanidad, next-best-action.</li>
            <li>Consulta conversacional y orquestación de alertas y flujos (n8n).</li>
            <li>Indicadores y lectura territorial (GIS), heredados de la línea Nutrogan.</li>
          </ul>
          <p>SIGAG no reemplaza al veterinario ni al encargado. Ordena la información para que quien produce decida.</p>
        </div>
      </article>
      <h2>De dónde viene</h2>
      <p><strong>Nutrogan</strong> es la plataforma de territorio, recursos y NDVI (PWA). <strong>SIGAG</strong> es la app nativa de visión, sanidad y operación en el lote. Skadia sostiene ambas líneas desde 2022.</p>
    `,
  }),
  "contacto.html": page({
    title: "Contacto · Skadia",
    desc: "Hablar con Skadia: consultas de establecimientos en Argentina.",
    active: "Contacto",
    h1: "Contacto",
    body: `
      <p>Contanos el tipo de establecimiento y con qué problema del día a día querés empezar. Responde una persona, no un bot.</p>
      <p>Canal publicado del equipo técnico (Fabricio Nicolás Duarte, Resistencia, Chaco):</p>
      <p>
        Correo: <a href="mailto:fabricioduarteoficial@gmail.com">fabricioduarteoficial@gmail.com</a><br />
        Teléfono: <a href="tel:+543704022201">+54 370 402-2201</a><br />
        LinkedIn: <a href="https://www.linkedin.com/in/fabricionicolasduarte/" rel="noopener noreferrer">fabricionicolasduarte</a><br />
        Sitio técnico: <a href="https://fabricioduarte.tech" rel="noopener noreferrer">fabricioduarte.tech</a>
      </p>
      <p>Razón social y CUIT de la sociedad: [COMPLETAR] — se publican aquí cuando estén definidos para el sitio institucional.</p>
    `,
  }),
  "aviso-legal.html": page({
    title: "Aviso legal · Skadia",
    desc: "Aviso legal del sitio Skadia.",
    active: "",
    h1: "Aviso legal",
    body: `
      <p>Este sitio informa sobre Skadia y el producto SIGAG. Operación del sitio: equipo Skadia / Fabricio Nicolás Duarte, Resistencia, Chaco, Argentina. Sociedad: [Razón social], CUIT [CUIT], domicilio [COMPLETAR].</p>
      <p>El contenido es informativo. No es asesoramiento veterinario ni agronómico, ni garantiza resultados productivos.</p>
    `,
  }),
  "privacidad.html": page({
    title: "Privacidad · Skadia",
    desc: "Política de privacidad de Skadia.",
    active: "",
    h1: "Privacidad",
    body: `
      <p>Los datos que envíes por correo (nombre, mensaje, teléfono) se usan solo para responder la consulta. No se venden bases.</p>
      <p>Contacto de privacidad: <a href="mailto:fabricioduarteoficial@gmail.com">fabricioduarteoficial@gmail.com</a>. Encargado: [Razón social] cuando esté constituida a esos efectos; mientras tanto, el responsable del canal publicado.</p>
      <p>Plazo: el de la relación comercial o el que fije la ley argentina (Ley 25.326). Podés pedir acceso, rectificación o supresión por ese correo.</p>
      <p>Esta versión del sitio no incorpora publicidad de terceros ni analítica de marketing. Si se suman, se actualiza este aviso y el de cookies.</p>
    `,
  }),
  "cookies.html": page({
    title: "Cookies · Skadia",
    desc: "Uso de cookies en el sitio Skadia.",
    active: "",
    h1: "Cookies",
    body: `
      <p>Guardamos una preferencia técnica en el navegador (almacenamiento local) para recordar si aceptaste este aviso. No usamos cookies de seguimiento publicitario en esta versión.</p>
      <p>Podés borrar los datos del sitio desde la configuración del navegador.</p>
    `,
  }),
  "terminos.html": page({
    title: "Términos de uso · Skadia",
    desc: "Términos de uso del sitio Skadia.",
    active: "",
    h1: "Términos de uso",
    body: `
      <p>El contenido de este sitio no se copia con fines comerciales sin autorización. Skadia y SIGAG identifican a la línea de producto de la startup; la titularidad societaria se completa en [Razón social].</p>
      <p>El software y las cuentas de producto se rigen por el contrato al contratar, no solo por esta página.</p>
    `,
  }),
  "accesibilidad.html": page({
    title: "Accesibilidad · Skadia",
    desc: "Declaración de accesibilidad de Skadia.",
    active: "",
    h1: "Accesibilidad",
    body: `
      <p>Buscamos un sitio usable: idioma español declarado, salto al contenido, contraste sobre fondo oscuro, foco visible, encabezados y páginas separadas para legal y contacto.</p>
      <p>El dibujo del portal (vaca y planta) es ilustrativo; la misma información está en Enfoque, Servicios y Productos. Respetamos la preferencia de reducir movimiento del sistema.</p>
      <p>Si algo no se puede usar: <a href="mailto:fabricioduarteoficial@gmail.com">fabricioduarteoficial@gmail.com</a>.</p>
    `,
  }),
};

import { writeFileSync } from "node:fs";
import { join } from "node:path";
const dir = "C:/Users/fabri/skadia-webgl";
for (const [name, html] of Object.entries(pages)) {
  writeFileSync(join(dir, name), html, "utf8");
  console.log("wrote", name);
}
