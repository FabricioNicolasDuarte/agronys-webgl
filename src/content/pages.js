import { getLang, t } from "../i18n.js";

export const WA = "https://wa.me/543704022201";
export const MAIL = "mailto:skadiagtech@gmail.com";

const NUTROGAN_STACK = [
  "Vue 3",
  "Quasar",
  "Vite",
  "Pinia",
  "Supabase",
  "PostgreSQL",
  "LocalForage",
  "Leaflet",
  "GeoServer",
  "TensorFlow.js",
  "PWA",
];

const SIGAG_STACK = [
  "TypeScript",
  "React Native",
  "Expo",
  "React Navigation",
  "WatermelonDB",
  "SQLite",
  "LokiJS",
  "Supabase",
  "PostgreSQL",
];

const PRECISION_STACK = [
  "Python",
  "PySpark",
  "Delta Lake",
  "Apache Airflow",
  "Streamlit",
  "Pandas",
  "Docker",
  "PostgreSQL",
  "Databricks",
];

function stackChips(items) {
  return `<ul class="stack-chips">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function productShowcase(copy) {
  return `
    <h2>${copy.hn}</h2>
    <p>${copy.pn}</p>
    <div class="shot-grid">
      <figure class="shot-mock">
        <img src="./media/ui/nutrogan-mockup.png" alt="${copy.an}" />
        <figcaption>${copy.cn}</figcaption>
        ${stackChips(NUTROGAN_STACK)}
      </figure>
      <figure class="shot-mock">
        <img src="./media/ui/sigag-mockup.png" alt="${copy.as}" />
        <figcaption>${copy.cs}</figcaption>
        ${stackChips(SIGAG_STACK)}
      </figure>
      <figure class="shot-mock">
        <img src="./media/ui/dashboard-mockup.png" alt="${copy.ap}" />
        <figcaption>${copy.cp}</figcaption>
        ${stackChips(PRECISION_STACK)}
      </figure>
    </div>
  `;
}

export function waDemoUrl(topic) {
  const msg = (t().askDemoMsg || "Hola, quiero pedir una demo de {topic}.").replace("{topic}", topic);
  return `${WA}?text=${encodeURIComponent(msg)}`;
}

const es = {
  about: `
    <p class="eyebrow">Qui\u00e9nes somos</p>
    <h1>Equipo AgTech para el establecimiento.</h1>
    <p>Skadia es una startup AgTech argentina (desde 2022). El equipo desarrolla herramientas de <strong>ganader\u00eda de precisi\u00f3n</strong>: el registro se origina en el potrero, donde est\u00e1 la hacienda y con frecuencia no hay cobertura de red.</p>
    <div class="fact-row">
      <p class="fact"><b>Origen</b><span>Argentina \u00b7 2022</span></p>
      <p class="fact"><b>Base operativa</b><span>NEA y Paraguay</span></p>
      <p class="fact"><b>Alcance</b><span>Soluciones a medida</span></p>
    </div>
    <p>El trabajo se sostiene sobre una l\u00ednea t\u00e9cnica de campo (captura offline, indicadores, visi\u00f3n y lectura territorial), con desarrollo en el NEA.</p>
    <p>Skadia no sustituye al veterinario ni al encargado. El equipo ordena la informaci\u00f3n para que el establecimiento decida.</p>
  `,
  approach: `
    <p class="eyebrow">Enfoque \u00b7 desde 2022</p>
    <h1>El dato tiene que servir en el potrero, no reci\u00e9n en la oficina.</h1>
    <p>El equipo trabaja para que el establecimiento decida con lo que ocurre en el lote. Calor, carga, condici\u00f3n del animal y forraje no pueden vivir en registros separados.</p>
    <ul class="hud-list">
      <li><span class="hud-n">01</span><div><strong>El animal no espera.</strong><p>Un pico de calor o un lote pasado de carga se detectan tarde si el registro queda para cuando haya conectividad.</p></div></li>
      <li><span class="hud-n">02</span><div><strong>En el campo no siempre hay red.</strong><p>Un sistema que solo opera conectado empuja a perder el dato. La captura debe continuar sin cobertura.</p></div></li>
      <li><span class="hud-n">03</span><div><strong>Un mismo criterio operativo.</strong><p>El personal, el servicio veterinario y la direcci\u00f3n necesitan la misma lectura de la hacienda.</p></div></li>
      <li><span class="hud-n">04</span><div><strong>Pasto y rodeo son el mismo negocio.</strong><p>Separarlos en sistemas distintos termina en decisiones incompletas.</p></div></li>
    </ul>
  `,
  services: `
    <p class="eyebrow">Servicios</p>
    <h1>Capacidades para el establecimiento</h1>
    <p>L\u00edneas de trabajo que el equipo configura a medida. La decisi\u00f3n operativa permanece en el predio.</p>
    <div class="cards">
      <article><div class="svc-head"><img src="./icons/ganaderia.svg" alt="" /><h2>Monitoreo 360\u00b0 con IA</h2></div><p>Pesajes, movimientos y atenciones en un mismo registro. Evoluci\u00f3n del animal y del lote a lo largo de la campa\u00f1a.</p></article>
      <article><div class="svc-head"><img src="./icons/vision.svg" alt="" /><h2>Visi\u00f3n artificial</h2></div><p>Condici\u00f3n corporal, reconocimiento, esc\u00e1ner de anomal\u00edas (heridas, lesiones y otras se\u00f1ales visibles) y esc\u00e1ner de materia fecal para an\u00e1lisis. No sustituye el diagn\u00f3stico veterinario ni el laboratorio.</p></article>
      <article><div class="svc-head"><img src="./icons/orquestacion.svg" alt="" /><h2>Monitoreo y alertas</h2></div><p>Notificaciones priorizadas de calor, sanidad y manejo.</p></article>
      <article><div class="svc-head"><img src="./icons/agro.svg" alt="" /><h2>Gesti\u00f3n de potreros</h2></div><p>Carga, forraje y descanso en la misma lectura que el rodeo.</p></article>
      <article><div class="svc-head"><img src="./icons/satelital.svg" alt="" /><h2>Monitoreo satelital y NDVI</h2></div><p>Seguimiento de vigor de cultivo y forraje.</p></article>
      <article><div class="svc-head"><img src="./icons/datos.svg" alt="" /><h2>Captura en campo</h2></div><p>Registro en el lote, con o sin red. Sincronizaci\u00f3n al restablecerse la conectividad.</p></article>
      <article><div class="svc-head"><img src="./icons/automat.svg" alt="" /><h2>Automatizaci\u00f3n</h2></div><p>Flujos disparados por un evento: notificaci\u00f3n, planilla o mensaje.</p></article>
      <article><div class="svc-head"><img src="./icons/dataeng.svg" alt="" /><h2>Ingenier\u00eda de datos</h2></div><p>Integraci\u00f3n de dispositivo, planillas y oficina.</p></article>
      <article><div class="svc-head"><img src="./icons/offline.svg" alt="" /><h2>Arquitectura offline-first</h2></div><p>Operaci\u00f3n continua sin cobertura. Sincronizaci\u00f3n al recuperar se\u00f1al.</p></article>
    </div>
  `,
  products: `
    <p class="eyebrow">Productos</p>
    <h1>Soluciones a medida</h1>
    <p>No se ofrece un paquete cerrado. Cada despliegue se arma seg\u00fan las necesidades del cliente o de la empresa: alcance, infraestructura y ritmos de trabajo del establecimiento.</p>
    <h2>Tipos de producto</h2>
    <div class="cards">
      <article><h2>Plataformas de campo</h2><p>Aplicaciones para captura y consulta en el lote, con o sin conectividad.</p></article>
      <article><h2>Tableros de decisi\u00f3n</h2><p>Indicadores de hacienda, forraje y operaci\u00f3n, alineados a la oficina.</p></article>
      <article><h2>M\u00f3dulos de visi\u00f3n</h2><p>Condici\u00f3n corporal, reconocimiento, anomal\u00edas (heridas y lesiones) y materia fecal para an\u00e1lisis, en lote, manga o corral.</p></article>
      <article><h2>Alertas y orquestaci\u00f3n</h2><p>Avisos de calor, sanidad y manejo, conectados a los flujos del predio.</p></article>
      <article><h2>Capas territoriales</h2><p>Potreros, carga, sat\u00e9lite y NDVI, integrados a la lectura ganadera o agr\u00edcola.</p></article>
      <article><h2>Integraciones a medida</h2><p>Planillas, dispositivos, mensajer\u00eda y sistemas ya en uso en la empresa.</p></article>
      <article><h2>Lakehouse de indicadores</h2><p>Pipeline medall\u00f3n (bronze / silver / gold) sobre pesadas, ocupaci\u00f3n, ITH y BCS: GMD, carga UA/ha y riesgo t\u00e9rmico para el lote.</p></article>
    </div>
    <h2>Tecnolog\u00edas y herramientas</h2>
    <ul class="tech-chips" aria-label="Stack">
      <li>Aplicaciones m\u00f3viles offline-first</li>
      <li>Sincronizaci\u00f3n diferencial</li>
      <li>Visi\u00f3n artificial</li>
      <li>Esc\u00e1ner de anomal\u00edas</li>
      <li>Esc\u00e1ner de materia fecal</li>
      <li>Modelos de GMD / ITH / carga</li>
      <li>Sanidad y next-best-action</li>
      <li>Consulta conversacional</li>
      <li>Automatizaci\u00f3n de flujos (n8n)</li>
      <li>Ingenier\u00eda de datos</li>
      <li>Lakehouse medall\u00f3n (Delta / Spark)</li>
      <li>GIS y cartograf\u00eda</li>
      <li>Im\u00e1genes satelitales y NDVI</li>
      <li>APIs e integraci\u00f3n de planillas</li>
      <li>Arquitectura local-first</li>
    </ul>
    ${productShowcase({
      hn: "L\u00ednea de productos",
      pn: "Tres l\u00edneas propias. Nutrogan: territorio, recursos y NDVI. SIGAG: visi\u00f3n, sanidad y operaci\u00f3n en el lote. Ganader\u00eda de precisi\u00f3n: lakehouse medall\u00f3n (planillas a indicadores GMD, carga, ITH y BCS). Cada una con stack propio.",
      an: "Nutrogan: mockup de la app de campo (corral, recursos y potreros)",
      cn: "Nutrogan \u00b7 app de campo",
      as: "SIGAG: mockup de la app de visi\u00f3n y sanidad",
      cs: "SIGAG \u00b7 visi\u00f3n y sanidad",
      ap: "Ganader\u00eda de precisi\u00f3n: HUD del lakehouse (bronze, silver, gold) con GMD, UA/ha, ITH y BCS",
      cp: "Ganader\u00eda de precisi\u00f3n \u00b7 lakehouse",
    })}
    <p class="demo-cta-wrap">
      <a class="demo-cta" href="__DEMO_WA__" rel="noopener noreferrer" target="_blank">__ASK_DEMO__</a>
    </p>
  `,
  contact: `
    <p class="eyebrow">Contacto</p>
    <h1>Canal del equipo</h1>
    <p>Las consultas las atiende el equipo. Indique el tipo de establecimiento y el problema operativo con el que desea empezar.</p>
    <div class="contact-grid">
      <div class="reach">
        <a class="reach-btn" href="${MAIL}">
          <span class="reach-ico" aria-hidden="true">${mailSvg()}</span>
          <span>Correo del equipo</span>
        </a>
        <a class="reach-btn" href="${WA}" rel="noopener noreferrer" target="_blank">
          <span class="reach-ico" aria-hidden="true">${waSvg()}</span>
          <span>WhatsApp</span>
        </a>
      </div>
      <figure class="nea-map">
        <img src="./art/nea.png" alt="Presencia operativa: Chaco, Corrientes, Misiones, Formosa y Paraguay" />
        <figcaption>Presencia en el NEA argentino y Paraguay</figcaption>
      </figure>
    </div>
  `,
  legal: `
    <p class="eyebrow">Marco legal</p>
    <h1>Aviso legal</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Titular del sitio</strong><p>Este sitio informa sobre Skadia y las soluciones de campo que ofrece el equipo. Operaci\u00f3n: equipo Skadia, Argentina.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Car\u00e1cter informativo</strong><p>El contenido no constituye asesoramiento veterinario ni agron\u00f3mico, ni garantiza resultados productivos.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Alcance</strong><p>Las descripciones de capacidades y tecnolog\u00edas son orientativas. Cada despliegue se define con el establecimiento.</p></div></article>
    </div>
  `,
  privacy: `
    <p class="eyebrow">Marco legal</p>
    <h1>Privacidad</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Datos de consulta</strong><p>Los datos enviados por correo o WhatsApp se usan \u00fanicamente para responder. No se comercializan bases.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Responsable</strong><p>Contacto: <a href="${MAIL}">skadiagtech@gmail.com</a>. Responsable: el equipo Skadia.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Conservaci\u00f3n y derechos</strong><p>Plazo: relaci\u00f3n comercial o Ley 25.326. Puede solicitar acceso, rectificaci\u00f3n o supresi\u00f3n por ese correo.</p></div></article>
      <article><span class="hud-n">04</span><div><strong>Anal\u00edtica</strong><p>Esta versi\u00f3n del sitio no incorpora publicidad de terceros ni anal\u00edtica de marketing.</p></div></article>
    </div>
  `,
  cookies: `
    <p class="eyebrow">Marco legal</p>
    <h1>Cookies</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Preferencia t\u00e9cnica</strong><p>Se guarda en el navegador (almacenamiento local) si acept\u00f3 este aviso.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Sin seguimiento publicitario</strong><p>No se usan cookies de marketing en esta versi\u00f3n.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Control</strong><p>Puede borrar los datos del sitio desde la configuraci\u00f3n del navegador.</p></div></article>
    </div>
  `,
  terms: `
    <p class="eyebrow">Marco legal</p>
    <h1>T\u00e9rminos de uso</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Uso del contenido</strong><p>El contenido de este sitio no puede copiarse con fines comerciales sin autorizaci\u00f3n.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Producto y contrato</strong><p>El software y las cuentas se rigen por el contrato al contratar, no \u00fanicamente por esta p\u00e1gina.</p></div></article>
    </div>
  `,
  a11y: `
    <p class="eyebrow">Marco legal</p>
    <h1>Accesibilidad</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Recorrido</strong><p>Idioma espa\u00f1ol, salto al contenido, contraste sobre fondo oscuro, foco visible y encabezados.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Portal</strong><p>El dibujo del portal es ilustrativo; la misma informaci\u00f3n est\u00e1 en Enfoque, Servicios y Productos. Se respeta reducir movimiento.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Aviso</strong><p>Si un recorrido no es usable: <a href="${MAIL}">skadiagtech@gmail.com</a>.</p></div></article>
    </div>
  `,
};

const en = {
  about: `
    <p class="eyebrow">About us</p>
    <h1>An AgTech team for the farm.</h1>
    <p>Skadia is an Argentine AgTech startup (since 2022). The team builds <strong>precision livestock</strong> tools: records start in the paddock, where cattle are and coverage is often missing.</p>
    <div class="fact-row">
      <p class="fact"><b>Origin</b><span>Argentina \u00b7 2022</span></p>
      <p class="fact"><b>Operating base</b><span>NEA and Paraguay</span></p>
      <p class="fact"><b>Scope</b><span>Tailored solutions</span></p>
    </div>
    <p>The work rests on a field-technical line (offline capture, indicators, vision and territorial reading), with development in the NEA.</p>
    <p>Skadia does not replace the veterinarian or the foreman. The team organizes information so the farm can decide.</p>
  `,
  approach: `
    <p class="eyebrow">Approach \u00b7 since 2022</p>
    <h1>Data has to work in the paddock, not only back at the office.</h1>
    <p>The team works so the farm can decide from what is happening in the lot. Heat, stocking, animal condition and forage cannot live in separate records.</p>
    <ul class="hud-list">
      <li><span class="hud-n">01</span><div><strong>The animal does not wait.</strong><p>A heat spike or an overloaded lot is seen too late if logging waits for connectivity.</p></div></li>
      <li><span class="hud-n">02</span><div><strong>The field does not always have a network.</strong><p>A system that only runs online pushes data loss. Capture must continue without coverage.</p></div></li>
      <li><span class="hud-n">03</span><div><strong>One operational criterion.</strong><p>Staff, veterinary service and management need the same reading of the herd.</p></div></li>
      <li><span class="hud-n">04</span><div><strong>Grass and herd are the same business.</strong><p>Splitting them into different systems ends in incomplete decisions.</p></div></li>
    </ul>
  `,
  services: `
    <p class="eyebrow">Services</p>
    <h1>Capabilities for the farm</h1>
    <p>Work lines the team configures to each property. Operational decisions stay on the farm.</p>
    <div class="cards">
      <article><div class="svc-head"><img src="./icons/ganaderia.svg" alt="" /><h2>360\u00b0 monitoring with AI</h2></div><p>Weighings, movements and treatments in one record.</p></article>
      <article><div class="svc-head"><img src="./icons/vision.svg" alt="" /><h2>Computer vision</h2></div><p>Body condition, recognition, anomaly scanning (wounds, lesions and other visible signs) and fecal-matter scanning for analysis. It does not replace veterinary diagnosis or the lab.</p></article>
      <article><div class="svc-head"><img src="./icons/orquestacion.svg" alt="" /><h2>Monitoring and alerts</h2></div><p>Prioritized notices for heat, health and handling.</p></article>
      <article><div class="svc-head"><img src="./icons/agro.svg" alt="" /><h2>Paddock management</h2></div><p>Stocking, forage and rest in the same reading as the herd.</p></article>
      <article><div class="svc-head"><img src="./icons/satelital.svg" alt="" /><h2>Satellite monitoring and NDVI</h2></div><p>Crop and forage vigor follow-up.</p></article>
      <article><div class="svc-head"><img src="./icons/datos.svg" alt="" /><h2>Field capture</h2></div><p>Logging in the lot, with or without a network.</p></article>
      <article><div class="svc-head"><img src="./icons/automat.svg" alt="" /><h2>Automation</h2></div><p>Flows triggered by an event: notice, sheet or message.</p></article>
      <article><div class="svc-head"><img src="./icons/dataeng.svg" alt="" /><h2>Data engineering</h2></div><p>Integration of device, sheets and office.</p></article>
      <article><div class="svc-head"><img src="./icons/offline.svg" alt="" /><h2>Offline-first architecture</h2></div><p>Continuous operation without coverage.</p></article>
    </div>
  `,
  products: `
    <p class="eyebrow">Products</p>
    <h1>Tailored solutions</h1>
    <p>There is no closed package. Each deployment is built around the client or company: scope, infrastructure and how the farm already works.</p>
    <h2>Product types</h2>
    <div class="cards">
      <article><h2>Field platforms</h2><p>Apps for capture and query in the lot, with or without connectivity.</p></article>
      <article><h2>Decision dashboards</h2><p>Herd, forage and operations indicators aligned with the office.</p></article>
      <article><h2>Vision modules</h2><p>Body condition, recognition, anomalies (wounds and lesions) and fecal matter for analysis, in the lot, chute or yard.</p></article>
      <article><h2>Alerts and orchestration</h2><p>Heat, health and handling notices tied to on-farm flows.</p></article>
      <article><h2>Territorial layers</h2><p>Paddocks, stocking, satellite and NDVI integrated with livestock or crop reading.</p></article>
      <article><h2>Custom integrations</h2><p>Sheets, devices, messaging and systems already in use.</p></article>
      <article><h2>Indicator lakehouse</h2><p>Medallion pipeline (bronze / silver / gold) on weighings, occupancy, THI and BCS: ADG, UA/ha stocking and heat risk for the lot.</p></article>
    </div>
    <h2>Technologies and tools</h2>
    <ul class="tech-chips" aria-label="Stack">
      <li>Offline-first mobile apps</li>
      <li>Differential sync</li>
      <li>Computer vision</li>
      <li>Anomaly scanner</li>
      <li>Fecal-matter scanner</li>
      <li>ADG / THI / stocking models</li>
      <li>Health and next-best-action</li>
      <li>Conversational query</li>
      <li>Flow automation (n8n)</li>
      <li>Data engineering</li>
      <li>Medallion lakehouse (Delta / Spark)</li>
      <li>GIS and mapping</li>
      <li>Satellite imagery and NDVI</li>
      <li>APIs and spreadsheet integration</li>
      <li>Local-first architecture</li>
    </ul>
    ${productShowcase({
      hn: "Product line",
      pn: "Three in-house lines. Nutrogan: territory, resources and NDVI. SIGAG: vision, animal health and lot operations. Precision livestock: medallion lakehouse (sheets to ADG, stocking, THI and BCS). Each with its own stack.",
      an: "Nutrogan: field-app mockup (yard, resources and paddocks)",
      cn: "Nutrogan \u00b7 field app",
      as: "SIGAG: vision and animal-health app mockup",
      cs: "SIGAG \u00b7 vision and health",
      ap: "Precision livestock: lakehouse HUD (bronze, silver, gold) with ADG, UA/ha, THI and BCS",
      cp: "Precision livestock \u00b7 lakehouse",
    })}
    <p class="demo-cta-wrap">
      <a class="demo-cta" href="__DEMO_WA__" rel="noopener noreferrer" target="_blank">__ASK_DEMO__</a>
    </p>
  `,
  contact: `
    <p class="eyebrow">Contact</p>
    <h1>Team channel</h1>
    <p>The team handles inquiries. State the type of farm and the operational problem you want to start with.</p>
    <div class="contact-grid">
      <div class="reach">
        <a class="reach-btn" href="${MAIL}">
          <span class="reach-ico" aria-hidden="true">${mailSvg()}</span>
          <span>Team email</span>
        </a>
        <a class="reach-btn" href="${WA}" rel="noopener noreferrer" target="_blank">
          <span class="reach-ico" aria-hidden="true">${waSvg()}</span>
          <span>WhatsApp</span>
        </a>
      </div>
      <figure class="nea-map">
        <img src="./art/nea.png" alt="Operating presence: Chaco, Corrientes, Misiones, Formosa and Paraguay" />
        <figcaption>Presence in Argentina\u2019s NEA and Paraguay</figcaption>
      </figure>
    </div>
  `,
  legal: `
    <p class="eyebrow">Legal framework</p>
    <h1>Legal notice</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Site operator</strong><p>This site informs about Skadia and the field solutions the team offers. Operation: Skadia team, Argentina.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Informational only</strong><p>Content is not veterinary or agronomic advice and does not guarantee production results.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Scope</strong><p>Capability and technology descriptions are indicative. Each deployment is defined with the farm.</p></div></article>
    </div>
  `,
  privacy: `
    <p class="eyebrow">Legal framework</p>
    <h1>Privacy</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Inquiry data</strong><p>Data sent by email or WhatsApp is used only to answer. Databases are not sold.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Controller</strong><p>Contact: <a href="${MAIL}">skadiagtech@gmail.com</a>. Controller: the Skadia team.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Retention and rights</strong><p>Term: the commercial relationship or Law 25.326. Access, rectification or deletion via that address.</p></div></article>
      <article><span class="hud-n">04</span><div><strong>Analytics</strong><p>This version has no third-party ads or marketing analytics.</p></div></article>
    </div>
  `,
  cookies: `
    <p class="eyebrow">Legal framework</p>
    <h1>Cookies</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Technical preference</strong><p>The browser stores (local storage) whether you accepted this notice.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>No ad tracking</strong><p>No marketing cookies in this version.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Control</strong><p>You can clear site data in the browser settings.</p></div></article>
    </div>
  `,
  terms: `
    <p class="eyebrow">Legal framework</p>
    <h1>Terms of use</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Content</strong><p>Site content may not be copied for commercial purposes without authorization.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Product contract</strong><p>Software and accounts are governed by the engagement contract, not only this page.</p></div></article>
    </div>
  `,
  a11y: `
    <p class="eyebrow">Legal framework</p>
    <h1>Accessibility</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Path</strong><p>Spanish language, skip to content, dark-background contrast, visible focus and headings.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Portal</strong><p>The portal drawing is illustrative; the same information is in Approach, Services and Products. Reduced motion is respected.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Report</strong><p>If a path is unusable: <a href="${MAIL}">skadiagtech@gmail.com</a>.</p></div></article>
    </div>
  `,
};

const pt = {
  about: `
    <p class="eyebrow">Quem somos</p>
    <h1>Equipe AgTech para o estabelecimento.</h1>
    <p>Skadia \u00e9 uma startup AgTech argentina (desde 2022). A equipe desenvolve ferramentas de <strong>pecu\u00e1ria de precis\u00e3o</strong>: o registro nasce no piquete, onde est\u00e1 o gado e muitas vezes n\u00e3o h\u00e1 cobertura de rede.</p>
    <div class="fact-row">
      <p class="fact"><b>Origem</b><span>Argentina \u00b7 2022</span></p>
      <p class="fact"><b>Base operacional</b><span>NEA e Paraguai</span></p>
      <p class="fact"><b>Alcance</b><span>Solu\u00e7\u00f5es sob medida</span></p>
    </div>
    <p>O trabalho se apoia em uma linha t\u00e9cnica de campo (captura offline, indicadores, vis\u00e3o e leitura territorial), com desenvolvimento no NEA.</p>
    <p>Skadia n\u00e3o substitui o veterin\u00e1rio nem o encarregado. A equipe organiza a informa\u00e7\u00e3o para o estabelecimento decidir.</p>
  `,
  approach: `
    <p class="eyebrow">Abordagem \u00b7 desde 2022</p>
    <h1>O dado tem de servir no piquete, n\u00e3o s\u00f3 no escrit\u00f3rio.</h1>
    <p>A equipe trabalha para que o estabelecimento decida com o que ocorre no lote. Calor, carga, condi\u00e7\u00e3o do animal e forragem n\u00e3o podem viver em registros separados.</p>
    <ul class="hud-list">
      <li><span class="hud-n">01</span><div><strong>O animal n\u00e3o espera.</strong><p>Um pico de calor ou um lote sobrecarregado \u00e9 visto tarde se o registro espera conectividade.</p></div></li>
      <li><span class="hud-n">02</span><div><strong>No campo nem sempre h\u00e1 rede.</strong><p>Um sistema que s\u00f3 opera conectado empurra a perda do dado. A captura deve continuar sem cobertura.</p></div></li>
      <li><span class="hud-n">03</span><div><strong>Um mesmo crit\u00e9rio operacional.</strong><p>A equipe, o servi\u00e7o veterin\u00e1rio e a dire\u00e7\u00e3o precisam da mesma leitura do rebanho.</p></div></li>
      <li><span class="hud-n">04</span><div><strong>Pasto e rebanho s\u00e3o o mesmo neg\u00f3cio.</strong><p>Separ\u00e1-los em sistemas distintos termina em decis\u00f5es incompletas.</p></div></li>
    </ul>
  `,
  services: `
    <p class="eyebrow">Servi\u00e7os</p>
    <h1>Capacidades para o estabelecimento</h1>
    <p>Linhas de trabalho que a equipe configura sob medida. A decis\u00e3o operacional permanece no predio.</p>
    <div class="cards">
      <article><div class="svc-head"><img src="./icons/ganaderia.svg" alt="" /><h2>Monitoramento 360\u00b0 com IA</h2></div><p>Pesagens, movimenta\u00e7\u00f5es e atendimentos no mesmo registro. Evolu\u00e7\u00e3o do animal e do lote ao longo da campanha.</p></article>
      <article><div class="svc-head"><img src="./icons/vision.svg" alt="" /><h2>Vis\u00e3o artificial</h2></div><p>Condi\u00e7\u00e3o corporal, reconhecimento, scanner de anomalias (feridas, les\u00f5es e outros sinais vis\u00edveis) e scanner de mat\u00e9ria fecal para an\u00e1lise. N\u00e3o substitui o diagn\u00f3stico veterin\u00e1rio nem o laborat\u00f3rio.</p></article>
      <article><div class="svc-head"><img src="./icons/orquestacion.svg" alt="" /><h2>Monitoramento e alertas</h2></div><p>Notifica\u00e7\u00f5es priorizadas de calor, sanidade e manejo.</p></article>
      <article><div class="svc-head"><img src="./icons/agro.svg" alt="" /><h2>Gest\u00e3o de piquetes</h2></div><p>Carga, forragem e descanso na mesma leitura que o rebanho.</p></article>
      <article><div class="svc-head"><img src="./icons/satelital.svg" alt="" /><h2>Monitoramento satelital e NDVI</h2></div><p>Acompanhamento do vigor da cultura e da forragem.</p></article>
      <article><div class="svc-head"><img src="./icons/datos.svg" alt="" /><h2>Captura em campo</h2></div><p>Registro no lote, com ou sem rede. Sincroniza\u00e7\u00e3o ao restabelecer a conectividade.</p></article>
      <article><div class="svc-head"><img src="./icons/automat.svg" alt="" /><h2>Automa\u00e7\u00e3o</h2></div><p>Fluxos disparados por um evento: notifica\u00e7\u00e3o, planilha ou mensagem.</p></article>
      <article><div class="svc-head"><img src="./icons/dataeng.svg" alt="" /><h2>Engenharia de dados</h2></div><p>Integra\u00e7\u00e3o de dispositivo, planilhas e escrit\u00f3rio.</p></article>
      <article><div class="svc-head"><img src="./icons/offline.svg" alt="" /><h2>Arquitetura offline-first</h2></div><p>Opera\u00e7\u00e3o cont\u00ednua sem cobertura. Sincroniza\u00e7\u00e3o ao recuperar o sinal.</p></article>
    </div>
  `,
  products: `
    <p class="eyebrow">Produtos</p>
    <h1>Solu\u00e7\u00f5es sob medida</h1>
    <p>N\u00e3o se oferece um pacote fechado. Cada implanta\u00e7\u00e3o se monta segundo as necessidades do cliente ou da empresa: alcance, infraestrutura e ritmos de trabalho do estabelecimento.</p>
    <h2>Tipos de produto</h2>
    <div class="cards">
      <article><h2>Plataformas de campo</h2><p>Aplicativos para captura e consulta no lote, com ou sem conectividade.</p></article>
      <article><h2>Pain\u00e9is de decis\u00e3o</h2><p>Indicadores de gado, forragem e opera\u00e7\u00e3o, alinhados ao escrit\u00f3rio.</p></article>
      <article><h2>M\u00f3dulos de vis\u00e3o</h2><p>Condi\u00e7\u00e3o corporal, reconhecimento, anomalias (feridas e les\u00f5es) e mat\u00e9ria fecal para an\u00e1lise, no lote ou no curral.</p></article>
      <article><h2>Alertas e orquestra\u00e7\u00e3o</h2><p>Avisos de calor, sanidade e manejo, ligados aos fluxos do predio.</p></article>
      <article><h2>Camadas territoriais</h2><p>Piquetes, carga, sat\u00e9lite e NDVI, integrados \u00e0 leitura pecu\u00e1ria ou agr\u00edcola.</p></article>
      <article><h2>Integra\u00e7\u00f5es sob medida</h2><p>Planilhas, dispositivos, mensageria e sistemas j\u00e1 em uso na empresa.</p></article>
      <article><h2>Lakehouse de indicadores</h2><p>Pipeline medalh\u00e3o (bronze / silver / gold) sobre pesagens, ocupa\u00e7\u00e3o, ITH e BCS: GMD, carga UA/ha e risco t\u00e9rmico para o lote.</p></article>
    </div>
    <h2>Tecnologias e ferramentas</h2>
    <ul class="tech-chips" aria-label="Stack">
      <li>Aplicativos m\u00f3veis offline-first</li>
      <li>Sincroniza\u00e7\u00e3o diferencial</li>
      <li>Vis\u00e3o artificial</li>
      <li>Scanner de anomalias</li>
      <li>Scanner de mat\u00e9ria fecal</li>
      <li>Modelos de GMD / ITH / carga</li>
      <li>Sanidade e next-best-action</li>
      <li>Consulta conversacional</li>
      <li>Automa\u00e7\u00e3o de fluxos (n8n)</li>
      <li>Engenharia de dados</li>
      <li>Lakehouse medalh\u00e3o (Delta / Spark)</li>
      <li>GIS e cartografia</li>
      <li>Imagens satelitais e NDVI</li>
      <li>APIs e integra\u00e7\u00e3o de planilhas</li>
      <li>Arquitetura local-first</li>
    </ul>
    ${productShowcase({
      hn: "Linha de produtos",
      pn: "Tr\u00eas linhas pr\u00f3prias. Nutrogan: territ\u00f3rio, recursos e NDVI. SIGAG: vis\u00e3o, sanidade e opera\u00e7\u00e3o no lote. Pecu\u00e1ria de precis\u00e3o: lakehouse medalh\u00e3o (planilhas a GMD, carga, ITH e BCS). Cada uma com stack pr\u00f3prio.",
      an: "Nutrogan: mockup do app de campo (curral, recursos e piquetes)",
      cn: "Nutrogan \u00b7 app de campo",
      as: "SIGAG: mockup do app de vis\u00e3o e sanidade",
      cs: "SIGAG \u00b7 vis\u00e3o e sanidade",
      ap: "Pecu\u00e1ria de precis\u00e3o: HUD do lakehouse (bronze, silver, gold) com GMD, UA/ha, ITH e BCS",
      cp: "Pecu\u00e1ria de precis\u00e3o \u00b7 lakehouse",
    })}
    <p class="demo-cta-wrap">
      <a class="demo-cta" href="__DEMO_WA__" rel="noopener noreferrer" target="_blank">__ASK_DEMO__</a>
    </p>
  `,
  contact: `
    <p class="eyebrow">Contato</p>
    <h1>Canal da equipe</h1>
    <p>As consultas s\u00e3o atendidas pela equipe. Indique o tipo de estabelecimento e o problema operacional com o qual deseja come\u00e7ar.</p>
    <div class="contact-grid">
      <div class="reach">
        <a class="reach-btn" href="${MAIL}">
          <span class="reach-ico" aria-hidden="true">${mailSvg()}</span>
          <span>E-mail da equipe</span>
        </a>
        <a class="reach-btn" href="${WA}" rel="noopener noreferrer" target="_blank">
          <span class="reach-ico" aria-hidden="true">${waSvg()}</span>
          <span>WhatsApp</span>
        </a>
      </div>
      <figure class="nea-map">
        <img src="./art/nea.png" alt="Presen\u00e7a operacional: Chaco, Corrientes, Misiones, Formosa e Paraguai" />
        <figcaption>Presen\u00e7a no NEA argentino e no Paraguai</figcaption>
      </figure>
    </div>
  `,
  legal: `
    <p class="eyebrow">Marco legal</p>
    <h1>Aviso legal</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Titular do site</strong><p>Este site informa sobre a Skadia e as solu\u00e7\u00f5es de campo que a equipe oferece. Opera\u00e7\u00e3o: equipe Skadia, Argentina.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Car\u00e1ter informativo</strong><p>O conte\u00fado n\u00e3o constitui assessoria veterin\u00e1ria nem agron\u00f4mica, nem garante resultados produtivos.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Alcance</strong><p>As descri\u00e7\u00f5es de capacidades e tecnologias s\u00e3o orientativas. Cada implanta\u00e7\u00e3o se define com o estabelecimento.</p></div></article>
    </div>
  `,
  privacy: `
    <p class="eyebrow">Marco legal</p>
    <h1>Privacidade</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Dados de consulta</strong><p>Os dados enviados por e-mail ou WhatsApp s\u00e3o usados apenas para responder. N\u00e3o se comercializam bases.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Respons\u00e1vel</strong><p>Contato: <a href="${MAIL}">skadiagtech@gmail.com</a>. Respons\u00e1vel: a equipe Skadia.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Conserva\u00e7\u00e3o e direitos</strong><p>Prazo: rela\u00e7\u00e3o comercial ou Lei 25.326. Pode solicitar acesso, retifica\u00e7\u00e3o ou exclus\u00e3o por esse e-mail.</p></div></article>
      <article><span class="hud-n">04</span><div><strong>Anal\u00edtica</strong><p>Esta vers\u00e3o do site n\u00e3o incorpora publicidade de terceiros nem anal\u00edtica de marketing.</p></div></article>
    </div>
  `,
  cookies: `
    <p class="eyebrow">Marco legal</p>
    <h1>Cookies</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Prefer\u00eancia t\u00e9cnica</strong><p>Guarda-se no navegador (armazenamento local) se voc\u00ea aceitou este aviso.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Sem rastreamento publicit\u00e1rio</strong><p>N\u00e3o se usam cookies de marketing nesta vers\u00e3o.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Controle</strong><p>Voc\u00ea pode apagar os dados do site nas configura\u00e7\u00f5es do navegador.</p></div></article>
    </div>
  `,
  terms: `
    <p class="eyebrow">Marco legal</p>
    <h1>Termos de uso</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Uso do conte\u00fado</strong><p>O conte\u00fado deste site n\u00e3o pode ser copiado com fins comerciais sem autoriza\u00e7\u00e3o.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Produto e contrato</strong><p>O software e as contas se regem pelo contrato ao contratar, n\u00e3o apenas por esta p\u00e1gina.</p></div></article>
    </div>
  `,
  a11y: `
    <p class="eyebrow">Marco legal</p>
    <h1>Acessibilidade</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Percurso</strong><p>Idioma selecion\u00e1vel, salto ao conte\u00fado, contraste sobre fundo escuro, foco vis\u00edvel e t\u00edtulos.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Portal</strong><p>O desenho do portal \u00e9 ilustrativo; a mesma informa\u00e7\u00e3o est\u00e1 em Abordagem, Servi\u00e7os e Produtos. Respeita-se reduzir movimento.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Aviso</strong><p>Se um percurso n\u00e3o for us\u00e1vel: <a href="${MAIL}">skadiagtech@gmail.com</a>.</p></div></article>
    </div>
  `,
};

const zh = {
  about: `
    <p class="eyebrow">\u5173\u4e8e\u6211\u4eec</p>
    <h1>\u9762\u5411\u7267\u573a\u7684\u519c\u4e1a\u79d1\u6280\u56e2\u961f\u3002</h1>
    <p>Skadia \u662f\u4e00\u5bb6\u963f\u6839\u5ef7 AgTech \u521b\u4e1a\u516c\u53f8\uff08\u81ea 2022 \u5e74\uff09\u3002\u56e2\u961f\u6253\u9020<strong>\u7cbe\u51c6\u755c\u7267</strong>\u5de5\u5177\uff1a\u8bb0\u5f55\u8d77\u6e90\u4e8e\u56f4\u680f\u2014\u2014\u725b\u7fa4\u6240\u5728\u4e14\u5e38\u5e38\u6ca1\u6709\u7f51\u7edc\u8986\u76d6\u7684\u5730\u65b9\u3002</p>
    <div class="fact-row">
      <p class="fact"><b>\u8d77\u6e90</b><span>\u963f\u6839\u5ef7 \u00b7 2022</span></p>
      <p class="fact"><b>\u8fd0\u8425\u57fa\u5730</b><span>NEA \u4e0e\u5df4\u62c9\u572d</span></p>
      <p class="fact"><b>\u8303\u56f4</b><span>\u5b9a\u5236\u89e3\u51b3\u65b9\u6848</span></p>
    </div>
    <p>\u5de5\u4f5c\u57fa\u4e8e\u7530\u95f4\u6280\u672f\u4e3b\u7ebf\uff08\u79bb\u7ebf\u91c7\u96c6\u3001\u6307\u6807\u3001\u89c6\u89c9\u4e0e\u571f\u5730\u89e3\u8bfb\uff09\uff0c\u7814\u53d1\u4f4d\u4e8e NEA\u3002</p>
    <p>Skadia \u4e0d\u53d6\u4ee3\u517d\u533b\u6216\u573a\u957f\u3002\u56e2\u961f\u6574\u7406\u4fe1\u606f\uff0c\u4f9b\u7267\u573a\u51b3\u7b56\u3002</p>
  `,
  approach: `
    <p class="eyebrow">\u65b9\u6cd5 \u00b7 \u81ea 2022 \u5e74</p>
    <h1>\u6570\u636e\u5fc5\u987b\u5728\u56f4\u680f\u91cc\u80fd\u7528\uff0c\u800c\u4e0d\u662f\u53ea\u5728\u529e\u4e8b\u5904\u624d\u80fd\u7528\u3002</h1>
    <p>\u56e2\u961f\u8ba9\u7267\u573a\u80fd\u4f9d\u636e\u56f4\u680f\u5b9e\u51b5\u51b3\u7b56\u3002\u70ed\u5e94\u6fc0\u3001\u8f7d\u755c\u3001\u4f53\u51b5\u4e0e\u9972\u8349\u4e0d\u80fd\u6563\u843d\u5728\u4e0d\u540c\u8bb0\u5f55\u91cc\u3002</p>
    <ul class="hud-list">
      <li><span class="hud-n">01</span><div><strong>\u725b\u7fa4\u7b49\u4e0d\u8d77\u3002</strong><p>\u82e5\u8bb0\u5f55\u7b49\u7f51\u7edc\uff0c\u9ad8\u6e29\u6216\u8d85\u8f7d\u5c31\u4f1a\u53d1\u73b0\u5f97\u592a\u665a\u3002</p></div></li>
      <li><span class="hud-n">02</span><div><strong>\u7530\u95f4\u5e76\u975e\u59cb\u7ec8\u6709\u7f51\u3002</strong><p>\u53ea\u80fd\u5728\u7ebf\u8fd0\u884c\u7684\u7cfb\u7edf\u5bb9\u6613\u4e22\u6570\u636e\u3002\u65e0\u8986\u76d6\u65f6\u4e5f\u5fc5\u987b\u80fd\u91c7\u96c6\u3002</p></div></li>
      <li><span class="hud-n">03</span><div><strong>\u7edf\u4e00\u4f5c\u4e1a\u6807\u51c6\u3002</strong><p>\u5458\u5de5\u3001\u517d\u533b\u670d\u52a1\u4e0e\u7ba1\u7406\u9700\u8981\u5bf9\u725b\u7fa4\u7684\u540c\u4e00\u8bfb\u6570\u3002</p></div></li>
      <li><span class="hud-n">04</span><div><strong>\u8349\u4e0e\u725b\u662f\u540c\u4e00\u7b14\u751f\u610f\u3002</strong><p>\u62c6\u5230\u4e0d\u540c\u7cfb\u7edf\u4f1a\u5bfc\u81f4\u51b3\u7b56\u4e0d\u5b8c\u6574\u3002</p></div></li>
    </ul>
  `,
  services: `
    <p class="eyebrow">\u670d\u52a1</p>
    <h1>\u9762\u5411\u7267\u573a\u7684\u80fd\u529b</h1>
    <p>\u56e2\u961f\u6309\u9700\u914d\u7f6e\u7684\u5de5\u4f5c\u7ebf\u3002\u4f5c\u4e1a\u51b3\u7b56\u7559\u5728\u7267\u573a\u3002</p>
    <div class="cards">
      <article><div class="svc-head"><img src="./icons/ganaderia.svg" alt="" /><h2>AI 360\u00b0 \u76d1\u6d4b</h2></div><p>\u79f0\u91cd\u3001\u8f6c\u7fa4\u4e0e\u5904\u7f6e\u540c\u6863\u3002\u52a8\u7269\u4e0e\u6574\u6279\u968f\u5b63\u8282\u6f14\u5316\u3002</p></article>
      <article><div class="svc-head"><img src="./icons/vision.svg" alt="" /><h2>\u8ba1\u7b97\u673a\u89c6\u89c9</h2></div><p>\u4f53\u51b5\u3001\u8bc6\u522b\u3001\u5f02\u5e38\u626b\u63cf\uff08\u4f24\u53e3\u3001\u75c5\u7076\u53ca\u5176\u4ed6\u53ef\u89c1\u8ff9\u8c61\uff09\u4ee5\u53ca\u7caa\u4fbf\u626b\u63cf\u4f9b\u5206\u6790\u3002\u4e0d\u53d6\u4ee3\u517d\u533b\u8bca\u65ad\u6216\u5b9e\u9a8c\u5ba4\u3002</p></article>
      <article><div class="svc-head"><img src="./icons/orquestacion.svg" alt="" /><h2>\u76d1\u6d4b\u4e0e\u9884\u8b66</h2></div><p>\u70ed\u5e94\u6fc0\u3001\u536b\u751f\u4e0e\u7ba1\u7406\u7684\u4f18\u5148\u901a\u77e5\u3002</p></article>
      <article><div class="svc-head"><img src="./icons/agro.svg" alt="" /><h2>\u56f4\u680f\u7ba1\u7406</h2></div><p>\u8f7d\u755c\u3001\u9972\u8349\u4e0e\u4f11\u606f\u4e0e\u725b\u7fa4\u540c\u4e00\u8bfb\u6570\u3002</p></article>
      <article><div class="svc-head"><img src="./icons/satelital.svg" alt="" /><h2>\u536b\u661f\u76d1\u6d4b\u4e0e NDVI</h2></div><p>\u8ddf\u8e2a\u4f5c\u7269\u4e0e\u9972\u8349\u52bf\u3002</p></article>
      <article><div class="svc-head"><img src="./icons/datos.svg" alt="" /><h2>\u7530\u95f4\u91c7\u96c6</h2></div><p>\u5728\u56f4\u680f\u8bb0\u5f55\uff0c\u65e0\u8bba\u6709\u65e0\u7f51\u7edc\u3002\u8fde\u63a5\u6062\u590d\u540e\u540c\u6b65\u3002</p></article>
      <article><div class="svc-head"><img src="./icons/automat.svg" alt="" /><h2>\u81ea\u52a8\u5316</h2></div><p>\u7531\u4e8b\u4ef6\u89e6\u53d1\u7684\u6d41\u7a0b\uff1a\u901a\u77e5\u3001\u8868\u683c\u6216\u6d88\u606f\u3002</p></article>
      <article><div class="svc-head"><img src="./icons/dataeng.svg" alt="" /><h2>\u6570\u636e\u5de5\u7a0b</h2></div><p>\u8bbe\u5907\u3001\u8868\u683c\u4e0e\u529e\u4e8b\u5904\u6574\u5408\u3002</p></article>
      <article><div class="svc-head"><img src="./icons/offline.svg" alt="" /><h2>\u79bb\u7ebf\u4f18\u5148\u67b6\u6784</h2></div><p>\u65e0\u8986\u76d6\u4e5f\u53ef\u8fde\u7eed\u4f5c\u4e1a\u3002</p></article>
    </div>
  `,
  products: `
    <p class="eyebrow">\u4ea7\u54c1</p>
    <h1>\u5b9a\u5236\u89e3\u51b3\u65b9\u6848</h1>
    <p>\u4e0d\u63d0\u4f9b\u5c01\u95ed\u5957\u9910\u3002\u6bcf\u6b21\u90e8\u7f72\u6309\u5ba2\u6237\u6216\u4f01\u4e1a\u9700\u6c42\u7ec4\u88c5\uff1a\u8303\u56f4\u3001\u57fa\u7840\u8bbe\u65bd\u4e0e\u7267\u573a\u8282\u594f\u3002</p>
    <h2>\u4ea7\u54c1\u7c7b\u578b</h2>
    <div class="cards">
      <article><h2>\u7530\u95f4\u5e73\u53f0</h2><p>\u5728\u56f4\u680f\u91c7\u96c6\u4e0e\u67e5\u8be2\u7684\u5e94\u7528\uff0c\u652f\u6301\u6709\u7f51\u6216\u65e0\u7f51\u3002</p></article>
      <article><h2>\u51b3\u7b56\u4eea\u8868\u76d8</h2><p>\u4e0e\u529e\u4e8b\u5904\u5bf9\u9f50\u7684\u725b\u7fa4\u3001\u9972\u8349\u4e0e\u4f5c\u4e1a\u6307\u6807\u3002</p></article>
      <article><h2>\u89c6\u89c9\u6a21\u5757</h2><p>\u4f53\u51b5\u3001\u8bc6\u522b\u3001\u5f02\u5e38\uff08\u4f24\u53e3\u4e0e\u75c5\u7076\uff09\u4e0e\u7caa\u4fbf\u5206\u6790\uff0c\u7528\u4e8e\u56f4\u680f\u6216\u901a\u9053\u3002</p></article>
      <article><h2>\u9884\u8b66\u4e0e\u7f16\u6392</h2><p>\u70ed\u5e94\u6fc0\u3001\u536b\u751f\u4e0e\u7ba1\u7406\u901a\u77e5\uff0c\u63a5\u5165\u7267\u573a\u6d41\u7a0b\u3002</p></article>
      <article><h2>\u571f\u5730\u56fe\u5c42</h2><p>\u56f4\u680f\u3001\u8f7d\u755c\u3001\u536b\u661f\u4e0e NDVI\uff0c\u878d\u5165\u755c\u7267\u6216\u79cd\u690d\u8bfb\u6570\u3002</p></article>
      <article><h2>\u5b9a\u5236\u96c6\u6210</h2><p>\u8868\u683c\u3001\u8bbe\u5907\u3001\u6d88\u606f\u4e0e\u4f01\u4e1a\u73b0\u6709\u7cfb\u7edf\u3002</p></article>
      <article><h2>\u6307\u6807 lakehouse</h2><p>\u94dc/\u94f6/\u91d1\u5957\u7ba1\u7ebf\uff1a\u79f0\u91cd\u3001\u8f7d\u755c\u3001ITH \u4e0e BCS\uff0c\u5f97\u51fa GMD\u3001UA/ha \u4e0e\u70ed\u5e94\u6fc0\u98ce\u9669\u3002</p></article>
    </div>
    <h2>\u6280\u672f\u4e0e\u5de5\u5177</h2>
    <ul class="tech-chips" aria-label="Stack">
      <li>\u79bb\u7ebf\u4f18\u5148\u79fb\u52a8\u5e94\u7528</li>
      <li>\u5dee\u91cf\u540c\u6b65</li>
      <li>\u8ba1\u7b97\u673a\u89c6\u89c9</li>
      <li>\u5f02\u5e38\u626b\u63cf</li>
      <li>\u7caa\u4fbf\u626b\u63cf</li>
      <li>GMD / ITH / \u8f7d\u755c\u6a21\u578b</li>
      <li>\u536b\u751f\u4e0e next-best-action</li>
      <li>\u5bf9\u8bdd\u5f0f\u67e5\u8be2</li>
      <li>\u6d41\u7a0b\u81ea\u52a8\u5316\uff08n8n\uff09</li>
      <li>\u6570\u636e\u5de5\u7a0b</li>
      <li>Lakehouse \u5957\u7ba1\uff08Delta / Spark\uff09</li>
      <li>GIS \u4e0e\u5236\u56fe</li>
      <li>\u536b\u661f\u5f71\u50cf\u4e0e NDVI</li>
      <li>API \u4e0e\u8868\u683c\u96c6\u6210</li>
      <li>\u672c\u5730\u4f18\u5148\u67b6\u6784</li>
    </ul>
    ${productShowcase({
      hn: "\u4ea7\u54c1\u7ebf",
      pn: "\u4e09\u6761\u81ea\u6709\u4ea7\u7ebf\u3002Nutrogan\uff1a\u571f\u5730\u3001\u8d44\u6e90\u4e0e NDVI\u3002SIGAG\uff1a\u89c6\u89c9\u3001\u536b\u751f\u4e0e\u56f4\u680f\u4f5c\u4e1a\u3002\u7cbe\u51c6\u517b\u6b96\uff1alakehouse \u5957\u7ba1\uff08\u8868\u683c\u5230 GMD\u3001\u8f7d\u755c\u3001ITH \u4e0e BCS\uff09\u3002\u5404\u81ea\u6280\u672f\u6808\u3002",
      an: "Nutrogan\uff1a\u7530\u95f4\u5e94\u7528\u6837\u673a\uff08\u5708\u680f\u3001\u8d44\u6e90\u4e0e\u56f4\u680f\uff09",
      cn: "Nutrogan \u00b7 \u7530\u95f4\u5e94\u7528",
      as: "SIGAG\uff1a\u89c6\u89c9\u4e0e\u536b\u751f\u5e94\u7528\u6837\u673a",
      cs: "SIGAG \u00b7 \u89c6\u89c9\u4e0e\u536b\u751f",
      ap: "\u7cbe\u51c6\u517b\u6b96\uff1alakehouse HUD\uff08bronze / silver / gold\uff09\u4e0e GMD\u3001UA/ha\u3001ITH\u3001BCS",
      cp: "\u7cbe\u51c6\u517b\u6b96 \u00b7 lakehouse",
    })}
    <p class="demo-cta-wrap">
      <a class="demo-cta" href="__DEMO_WA__" rel="noopener noreferrer" target="_blank">__ASK_DEMO__</a>
    </p>
  `,
  contact: `
    <p class="eyebrow">\u8054\u7cfb</p>
    <h1>\u56e2\u961f\u6e20\u9053</h1>
    <p>\u54a8\u8be2\u7531\u56e2\u961f\u53d7\u7406\u3002\u8bf7\u8bf4\u660e\u7267\u573a\u7c7b\u578b\u4ee5\u53ca\u5e0c\u671b\u4f18\u5148\u89e3\u51b3\u7684\u4f5c\u4e1a\u95ee\u9898\u3002</p>
    <div class="contact-grid">
      <div class="reach">
        <a class="reach-btn" href="${MAIL}">
          <span class="reach-ico" aria-hidden="true">${mailSvg()}</span>
          <span>\u56e2\u961f\u90ae\u7bb1</span>
        </a>
        <a class="reach-btn" href="${WA}" rel="noopener noreferrer" target="_blank">
          <span class="reach-ico" aria-hidden="true">${waSvg()}</span>
          <span>WhatsApp</span>
        </a>
      </div>
      <figure class="nea-map">
        <img src="./art/nea.png" alt="\u8fd0\u8425\u8303\u56f4\uff1a\u67e5\u79d1\u3001\u79d1\u91cc\u5c14\u7279\u65af\u3001\u7c73\u897f\u5965\u5185\u65af\u3001\u798f\u83ab\u8428\u4e0e\u5df4\u62c9\u572d" />
        <figcaption>\u8986\u76d6\u963f\u6839\u5ef7 NEA \u4e0e\u5df4\u62c9\u572d</figcaption>
      </figure>
    </div>
  `,
  legal: `
    <p class="eyebrow">\u6cd5\u5f8b\u6846\u67b6</p>
    <h1>\u6cd5\u5f8b\u58f0\u660e</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>\u7ad9\u70b9\u8fd0\u8425\u65b9</strong><p>\u672c\u7ad9\u4ecb\u7ecd Skadia \u53ca\u56e2\u961f\u63d0\u4f9b\u7684\u7530\u95f4\u89e3\u51b3\u65b9\u6848\u3002\u8fd0\u8425\uff1aSkadia \u56e2\u961f\uff0c\u963f\u6839\u5ef7\u3002</p></div></article>
      <article><span class="hud-n">02</span><div><strong>\u4ec5\u4f9b\u8d44\u8baf</strong><p>\u5185\u5bb9\u4e0d\u6784\u6210\u517d\u533b\u6216\u519c\u827a\u5efa\u8bae\uff0c\u4ea6\u4e0d\u4fdd\u8bc1\u751f\u4ea7\u7ed3\u679c\u3002</p></div></article>
      <article><span class="hud-n">03</span><div><strong>\u8303\u56f4</strong><p>\u80fd\u529b\u4e0e\u6280\u672f\u63cf\u8ff0\u4ec5\u4f9b\u53c2\u8003\u3002\u6bcf\u6b21\u90e8\u7f72\u4e0e\u7267\u573a\u5171\u540c\u786e\u5b9a\u3002</p></div></article>
    </div>
  `,
  privacy: `
    <p class="eyebrow">\u6cd5\u5f8b\u6846\u67b6</p>
    <h1>\u9690\u79c1</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>\u54a8\u8be2\u6570\u636e</strong><p>\u901a\u8fc7\u90ae\u4ef6\u6216 WhatsApp \u53d1\u9001\u7684\u6570\u636e\u4ec5\u7528\u4e8e\u56de\u590d\u3002\u4e0d\u51fa\u552e\u6570\u636e\u5e93\u3002</p></div></article>
      <article><span class="hud-n">02</span><div><strong>\u8d23\u4efb\u65b9</strong><p>\u8054\u7cfb\uff1a<a href="${MAIL}">skadiagtech@gmail.com</a>\u3002\u8d23\u4efb\u65b9\uff1aSkadia \u56e2\u961f\u3002</p></div></article>
      <article><span class="hud-n">03</span><div><strong>\u4fdd\u5b58\u4e0e\u6743\u5229</strong><p>\u671f\u9650\uff1a\u5546\u52a1\u5173\u7cfb\u6216\u6cd5\u5f8b 25.326\u3002\u53ef\u901a\u8fc7\u8be5\u90ae\u7bb1\u7533\u8bf7\u67e5\u9605\u3001\u66f4\u6b63\u6216\u5220\u9664\u3002</p></div></article>
      <article><span class="hud-n">04</span><div><strong>\u5206\u6790</strong><p>\u672c\u7248\u672c\u4e0d\u542b\u7b2c\u4e09\u65b9\u5e7f\u544a\u6216\u8425\u9500\u5206\u6790\u3002</p></div></article>
    </div>
  `,
  cookies: `
    <p class="eyebrow">\u6cd5\u5f8b\u6846\u67b6</p>
    <h1>Cookie</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>\u6280\u672f\u504f\u597d</strong><p>\u82e5\u60a8\u63a5\u53d7\u672c\u63d0\u793a\uff0c\u6d4f\u89c8\u5668\u4f1a\u5728\u672c\u5730\u5b58\u50a8\u4e2d\u8bb0\u5f55\u3002</p></div></article>
      <article><span class="hud-n">02</span><div><strong>\u65e0\u5e7f\u544a\u8ffd\u8e2a</strong><p>\u672c\u7248\u672c\u4e0d\u4f7f\u7528\u8425\u9500 Cookie\u3002</p></div></article>
      <article><span class="hud-n">03</span><div><strong>\u63a7\u5236</strong><p>\u53ef\u5728\u6d4f\u89c8\u5668\u8bbe\u7f6e\u4e2d\u6e05\u9664\u672c\u7ad9\u6570\u636e\u3002</p></div></article>
    </div>
  `,
  terms: `
    <p class="eyebrow">\u6cd5\u5f8b\u6846\u67b6</p>
    <h1>\u4f7f\u7528\u6761\u6b3e</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>\u5185\u5bb9\u4f7f\u7528</strong><p>\u672a\u7ecf\u6388\u6743\uff0c\u4e0d\u5f97\u4e3a\u5546\u4e1a\u76ee\u7684\u590d\u5236\u672c\u7ad9\u5185\u5bb9\u3002</p></div></article>
      <article><span class="hud-n">02</span><div><strong>\u4ea7\u54c1\u4e0e\u5408\u540c</strong><p>\u8f6f\u4ef6\u4e0e\u8d26\u6237\u4ee5\u7b7e\u7ea6\u5408\u540c\u4e3a\u51c6\uff0c\u800c\u975e\u4ec5\u4ee5\u672c\u9875\u4e3a\u51c6\u3002</p></div></article>
    </div>
  `,
  a11y: `
    <p class="eyebrow">\u6cd5\u5f8b\u6846\u67b6</p>
    <h1>\u65e0\u969c\u788d</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>\u6d4f\u89c8\u8def\u5f84</strong><p>\u53ef\u9009\u8bed\u8a00\u3001\u8df3\u8f6c\u6b63\u6587\u3001\u6697\u5e95\u5bf9\u6bd4\u3001\u53ef\u89c1\u7126\u70b9\u4e0e\u6807\u9898\u3002</p></div></article>
      <article><span class="hud-n">02</span><div><strong>\u95e8\u6237</strong><p>\u95e8\u6237\u63d2\u56fe\u4ec5\u4f9b\u8bf4\u660e\uff1b\u76f8\u540c\u4fe1\u606f\u89c1\u65b9\u6cd5\u3001\u670d\u52a1\u4e0e\u4ea7\u54c1\u3002\u9075\u5b88\u51cf\u5c11\u52a8\u6548\u3002</p></div></article>
      <article><span class="hud-n">03</span><div><strong>\u53cd\u9988</strong><p>\u82e5\u8def\u5f84\u4e0d\u53ef\u7528\uff1a<a href="${MAIL}">skadiagtech@gmail.com</a>\u3002</p></div></article>
    </div>
  `,
};

function mailSvg() {
  return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>`;
}

function waSvg() {
  return `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.38-1.41a9.9 9.9 0 004.66 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.76 14.16c-.24.68-1.4 1.26-1.94 1.34-.5.07-1.13.1-1.83-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.2-1.18-1.57-1.18-3 0-1.41.74-2.11 1-2.4.24-.27.64-.4 1.02-.4.12 0 .23 0 .33.01.29.01.44.03.63.49.2.5.67 1.73.73 1.86.06.13.1.28.02.45-.08.16-.12.27-.24.41-.12.14-.25.31-.36.42-.12.12-.24.25-.1.48.14.24.62 1.02 1.33 1.65 1.08.96 1.94 1.27 2.24 1.4.24.1.46.09.64-.07.22-.2.5-.58.8-.94.21-.26.48-.3.76-.2.28.09 1.79.84 2.1.99.3.16.5.23.57.36.08.13.08.75-.16 1.43z"/></svg>`;
}

export function renderPage(main, page) {
  const lang = getLang();
  const pack = { es, en, pt, zh }[lang] || es;
  let html = pack[page];
  if (!html) return;
  html = html
    .replaceAll("__DEMO_WA__", waDemoUrl("Skadia"))
    .replaceAll("__ASK_DEMO__", t().askDemo);
  const legal = new Set(["legal", "privacy", "cookies", "terms", "a11y"]);
  if (legal.has(page)) {
    main.innerHTML = wrapLegal(html, page, lang);
    return;
  }
  main.innerHTML = html;
}

function wrapLegal(inner, page, lang) {
  const rails = {
    es: [
      ["legal", "./aviso-legal.html", "Aviso legal"],
      ["privacy", "./privacidad.html", "Privacidad"],
      ["cookies", "./cookies.html", "Cookies"],
      ["terms", "./terminos.html", "T\u00e9rminos"],
      ["a11y", "./accesibilidad.html", "Accesibilidad"],
    ],
    en: [
      ["legal", "./aviso-legal.html", "Notice"],
      ["privacy", "./privacidad.html", "Privacy"],
      ["cookies", "./cookies.html", "Cookies"],
      ["terms", "./terminos.html", "Terms"],
      ["a11y", "./accesibilidad.html", "Accessibility"],
    ],
    pt: [
      ["legal", "./aviso-legal.html", "Aviso legal"],
      ["privacy", "./privacidad.html", "Privacidade"],
      ["cookies", "./cookies.html", "Cookies"],
      ["terms", "./terminos.html", "Termos"],
      ["a11y", "./accesibilidad.html", "Acessibilidade"],
    ],
    zh: [
      ["legal", "./aviso-legal.html", "\u6cd5\u5f8b\u58f0\u660e"],
      ["privacy", "./privacidad.html", "\u9690\u79c1"],
      ["cookies", "./cookies.html", "Cookie"],
      ["terms", "./terminos.html", "\u6761\u6b3e"],
      ["a11y", "./accesibilidad.html", "\u65e0\u969c\u788d"],
    ],
  };
  const items = rails[lang] || rails.es;
  const nav = items
    .map(([id, href, label]) => {
      const on = id === page ? ' aria-current="page"' : "";
      return `<a class="legal-rail-link" href="${href}"${on}>${label}</a>`;
    })
    .join("");
  const kicker = { es: "Legal", en: "Legal", pt: "Legal", zh: "\u6cd5\u5f8b" }[lang] || "Legal";
  return `<div class="legal-shell">
    <nav class="legal-rail" aria-label="${kicker}">${nav}</nav>
    <div class="legal-main">${inner}</div>
  </div>`;
}
