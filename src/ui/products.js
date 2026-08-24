import { getLang } from "../i18n.js";
import { waDemoUrl } from "../content/pages.js";

const LINES = [
  {
    id: "nutrogan",
    idx: "01",
    img: "./media/ui/nutrogan-mockup.png",
    stack: ["Vue 3", "Quasar", "Vite", "Pinia", "Supabase", "PostgreSQL", "LocalForage", "Leaflet", "GeoServer", "TensorFlow.js", "PWA"],
  },
  {
    id: "sigag",
    idx: "02",
    img: "./media/ui/sigag-mockup.png",
    stack: ["TypeScript", "React Native", "Expo", "React Navigation", "WatermelonDB", "SQLite", "LokiJS", "Supabase", "PostgreSQL"],
  },
  {
    id: "dashboard",
    idx: "03",
    img: "./media/ui/dashboard-mockup.png",
    stack: ["Python", "PySpark", "Delta Lake", "Apache Airflow", "Streamlit", "Pandas", "Docker", "PostgreSQL", "Databricks"],
  },
];

const COPY = {
  es: {
    eyebrow: "Productos",
    title: "Soluciones a medida",
    lead: "No se ofrece un paquete cerrado. Cada despliegue se arma seg\u00fan las necesidades del cliente o de la empresa: alcance, infraestructura y ritmos de trabajo del establecimiento.",
    from: "De d\u00f3nde parte",
    work: "Qu\u00e9 se hace",
    out: "Qu\u00e9 se obtiene",
    demo: "Pedir demo de",
    lines: {
      nutrogan: {
        name: "Nutrogan",
        tag: "Territorio y recursos",
        from: "El potrero y el corral, con o sin red. El registro nace donde est\u00e1 la hacienda, no reci\u00e9n en la oficina.",
        work: "Se levantan l\u00edmites de potrero, carga y recursos. Se cruza ese mapa con imagen satelital (NDVI) y, si hace falta, con modelos en el dispositivo. La app sigue en el lote sin cobertura y sincroniza cuando vuelve la se\u00f1al.",
        out: "Una lectura \u00fanica de potrero, forraje y vigor de pastura, usable en el campo y en escritorio.",
      },
      sigag: {
        name: "SIGAG",
        tag: "Sanidad y operaci\u00f3n",
        from: "El animal en lote, manga o corral, en la recorrida o en el trabajo de manga.",
        work: "La app toma imagen o video, estima condici\u00f3n corporal, marca se\u00f1ales visibles (heridas, lesiones y otras anomal\u00edas) y registra materia fecal para an\u00e1lisis. Opera sin red y avisa cuando hay un evento que el personal debe ver.",
        out: "Apoyo concreto al encargado y al servicio veterinario. No diagnostica ni sustituye al profesional ni al laboratorio.",
      },
      dashboard: {
        name: "Dashboard Estado de Situaci\u00f3n",
        tag: "Indicadores del establecimiento",
        from: "Las planillas, pesadas y registros que el establecimiento ya usa: ocupaci\u00f3n, ITH, BCS y movimientos.",
        work: "Esos datos entran a un lakehouse medall\u00f3n (bronze / silver / gold): se limpian, se unen y se calculan indicadores. El tablero no es un reporte suelto; es la capa de lectura sobre esa pipeline.",
        out: "GMD, UA/ha, riesgo t\u00e9rmico y condici\u00f3n corporal en un mismo tablero, para decidir carga y manejo con n\u00fameros alineados.",
      },
    },
    mods: [
      { id: "field", line: "nutrogan", label: "App de campo" },
      { id: "map", line: "nutrogan", label: "Potreros y GIS" },
      { id: "sat", line: "nutrogan", label: "NDVI satelital" },
      { id: "vision", line: "sigag", label: "Visi\u00f3n en el animal" },
      { id: "alert", line: "sigag", label: "Alertas de lote" },
      { id: "board", line: "dashboard", label: "Tablero de situaci\u00f3n" },
      { id: "lake", line: "dashboard", label: "Lakehouse medall\u00f3n" },
      { id: "sync", line: "dashboard", label: "Planillas existentes" },
    ],
  },
  en: {
    eyebrow: "Products",
    title: "Tailored solutions",
    lead: "There is no closed package. Each deployment is built around the client or company: scope, infrastructure and how the farm already works.",
    from: "Where it starts",
    work: "What is done",
    out: "What you get",
    demo: "Request a demo of",
    lines: {
      nutrogan: {
        name: "Nutrogan",
        tag: "Territory and resources",
        from: "The paddock and the yard, with or without a network. The record starts where the cattle are, not only in the office.",
        work: "Paddock boundaries, stocking and resources are captured. That map is crossed with satellite imagery (NDVI) and, when needed, on-device models. The app keeps working offline and syncs when coverage returns.",
        out: "One reading of paddock, forage and pasture vigor, usable in the field and on the desk.",
      },
      sigag: {
        name: "SIGAG",
        tag: "Health and operations",
        from: "The animal in the lot, chute or yard, during a round or chute work.",
        work: "The app takes image or video, estimates body condition, flags visible signs (wounds, lesions and other anomalies) and logs fecal matter for analysis. It runs without a network and alerts when staff need to look.",
        out: "Concrete support for the manager and the veterinary service. It does not diagnose or replace the professional or the lab.",
      },
      dashboard: {
        name: "Situation Status Dashboard",
        tag: "Farm indicators",
        from: "The sheets, weighings and records the farm already uses: occupancy, THI, BCS and movements.",
        work: "Those data enter a medallion lakehouse (bronze / silver / gold): they are cleaned, joined and turned into indicators. The dashboard is the reading layer on that pipeline, not a loose report.",
        out: "ADG, UA/ha, heat risk and body condition on one board, so stocking and handling decisions share the same numbers.",
      },
    },
    mods: [
      { id: "field", line: "nutrogan", label: "Field app" },
      { id: "map", line: "nutrogan", label: "Paddocks and GIS" },
      { id: "sat", line: "nutrogan", label: "Satellite NDVI" },
      { id: "vision", line: "sigag", label: "Vision on the animal" },
      { id: "alert", line: "sigag", label: "Lot alerts" },
      { id: "board", line: "dashboard", label: "Status dashboard" },
      { id: "lake", line: "dashboard", label: "Medallion lakehouse" },
      { id: "sync", line: "dashboard", label: "Existing sheets" },
    ],
  },
  pt: {
    eyebrow: "Produtos",
    title: "Solu\u00e7\u00f5es sob medida",
    lead: "N\u00e3o se oferece um pacote fechado. Cada implanta\u00e7\u00e3o se monta segundo as necessidades do cliente ou da empresa: alcance, infraestrutura e ritmos de trabalho do estabelecimento.",
    from: "De onde parte",
    work: "O que se faz",
    out: "O que se obt\u00e9m",
    demo: "Pedir demo de",
    lines: {
      nutrogan: {
        name: "Nutrogan",
        tag: "Territ\u00f3rio e recursos",
        from: "O piquete e o curral, com ou sem rede. O registro nasce onde est\u00e1 o gado, n\u00e3o s\u00f3 no escrit\u00f3rio.",
        work: "Levantam-se limites de piquete, carga e recursos. Esse mapa cruza com imagem de sat\u00e9lite (NDVI) e, se preciso, com modelos no dispositivo. O app segue no lote sem cobertura e sincroniza quando a sinal volta.",
        out: "Uma leitura \u00fanica de piquete, forragem e vigor da pastagem, us\u00e1vel no campo e no escrit\u00f3rio.",
      },
      sigag: {
        name: "SIGAG",
        tag: "Sanidade e opera\u00e7\u00e3o",
        from: "O animal no lote, tronco ou curral, na ronda ou no trabalho de manga.",
        work: "O app captura imagem ou v\u00eddeo, estima condi\u00e7\u00e3o corporal, marca sinais vis\u00edveis (feridas, les\u00f5es e outras anomalias) e registra mat\u00e9ria fecal para an\u00e1lise. Opera sem rede e avisa quando h\u00e1 um evento que a equipe deve ver.",
        out: "Apoio concreto ao encarregado e ao servi\u00e7o veterin\u00e1rio. N\u00e3o diagnostica nem substitui o profissional nem o laborat\u00f3rio.",
      },
      dashboard: {
        name: "Dashboard Estado de Situa\u00e7\u00e3o",
        tag: "Indicadores do estabelecimento",
        from: "As planilhas, pesagens e registros que o estabelecimento j\u00e1 usa: ocupa\u00e7\u00e3o, ITH, BCS e movimenta\u00e7\u00f5es.",
        work: "Esses dados entram num lakehouse medalh\u00e3o (bronze / silver / gold): s\u00e3o limpos, unidos e viram indicadores. O painel \u00e9 a camada de leitura sobre essa pipeline, n\u00e3o um relat\u00f3rio solto.",
        out: "GMD, UA/ha, risco t\u00e9rmico e condi\u00e7\u00e3o corporal no mesmo painel, para decidir carga e manejo com n\u00fameros alinhados.",
      },
    },
    mods: [
      { id: "field", line: "nutrogan", label: "App de campo" },
      { id: "map", line: "nutrogan", label: "Piquetes e GIS" },
      { id: "sat", line: "nutrogan", label: "NDVI satelital" },
      { id: "vision", line: "sigag", label: "Vis\u00e3o no animal" },
      { id: "alert", line: "sigag", label: "Alertas de lote" },
      { id: "board", line: "dashboard", label: "Painel de situa\u00e7\u00e3o" },
      { id: "lake", line: "dashboard", label: "Lakehouse medalh\u00e3o" },
      { id: "sync", line: "dashboard", label: "Planilhas existentes" },
    ],
  },
  zh: {
    eyebrow: "\u4ea7\u54c1",
    title: "\u5b9a\u5236\u65b9\u6848",
    lead: "\u4e0d\u63d0\u4f9b\u5c01\u95ed\u5957\u9910\u3002\u6bcf\u6b21\u90e8\u7f72\u6309\u5ba2\u6237\u6216\u4f01\u4e1a\u9700\u6c42\u7ec4\u88c5\uff1a\u8303\u56f4\u3001\u57fa\u7840\u8bbe\u65bd\u4e0e\u7267\u573a\u5df2\u6709\u4f5c\u4e1a\u8282\u594f\u3002",
    from: "\u4ece\u4f55\u5f00\u59cb",
    work: "\u505a\u4ec0\u4e48",
    out: "\u5f97\u5230\u4ec0\u4e48",
    demo: "\u7533\u8bf7\u6f14\u793a",
    lines: {
      nutrogan: {
        name: "Nutrogan",
        tag: "\u571f\u5730\u4e0e\u8d44\u6e90",
        from: "\u56f4\u680f\u4e0e\u5708\u680f\uff0c\u6709\u7f51\u6216\u65e0\u7f51\u3002\u8bb0\u5f55\u4ece\u725b\u7fa4\u6240\u5728\u4e4b\u5730\u5f00\u59cb\uff0c\u800c\u4e0d\u662f\u5230\u4e86\u529e\u516c\u5ba4\u3002",
        work: "\u91c7\u96c6\u56f4\u680f\u8fb9\u754c\u3001\u8f7d\u755c\u4e0e\u8d44\u6e90\uff0c\u5e76\u4e0e\u536b\u661f NDVI \u4ea4\u53c9\uff1b\u5fc5\u8981\u65f6\u5728\u8bbe\u5907\u7aef\u8fd0\u884c\u6a21\u578b\u3002\u65e0\u7f51\u4e5f\u53ef\u7ee7\u7eed\uff0c\u6062\u590d\u8986\u76d6\u540e\u540c\u6b65\u3002",
        out: "\u56f4\u680f\u3001\u9972\u8349\u4e0e\u7267\u8349\u52bf\u7684\u7edf\u4e00\u8bfb\u6570\uff0c\u7530\u95f4\u4e0e\u684c\u9762\u90fd\u53ef\u7528\u3002",
      },
      sigag: {
        name: "SIGAG",
        tag: "\u536b\u751f\u4e0e\u4f5c\u4e1a",
        from: "\u56f4\u680f\u3001\u901a\u9053\u6216\u5708\u680f\u4e2d\u7684\u52a8\u7269\uff0c\u5728\u5de1\u89c6\u6216\u901a\u9053\u4f5c\u4e1a\u65f6\u3002",
        work: "\u5e94\u7528\u91c7\u96c6\u56fe\u50cf\u6216\u89c6\u9891\uff0c\u4f30\u7b97\u4f53\u51b5\uff0c\u6807\u51fa\u53ef\u89c1\u5f02\u5e38\uff08\u4f24\u53e3\u3001\u75c5\u7076\u7b49\uff09\u5e76\u8bb0\u5f55\u7caa\u4fbf\u4f9b\u5206\u6790\u3002\u65e0\u7f51\u53ef\u8fd0\u884c\uff0c\u6709\u4e8b\u4ef6\u65f6\u63d0\u9192\u4eba\u5458\u3002",
        out: "\u5bf9\u7ba1\u7406\u4e0e\u517d\u533b\u670d\u52a1\u7684\u5b9e\u9645\u652f\u6301\u3002\u4e0d\u8bca\u65ad\uff0c\u4e5f\u4e0d\u53d6\u4ee3\u4e13\u4e1a\u4eba\u5458\u6216\u5b9e\u9a8c\u5ba4\u3002",
      },
      dashboard: {
        name: "\u6001\u52bf\u4eea\u8868\u76d8",
        tag: "\u7267\u573a\u6307\u6807",
        from: "\u7267\u573a\u5df2\u5728\u4f7f\u7528\u7684\u8868\u683c\u3001\u79f0\u91cd\u4e0e\u8bb0\u5f55\uff1a\u8f7d\u755c\u3001ITH\u3001BCS \u4e0e\u8f6c\u7fa4\u3002",
        work: "\u6570\u636e\u8fdb\u5165\u94dc/\u94f6/\u91d1 lakehouse\uff1a\u6e05\u6d17\u3001\u5173\u8054\u5e76\u8ba1\u7b97\u6307\u6807\u3002\u4eea\u8868\u76d8\u662f\u8be5\u7ba1\u7ebf\u7684\u8bfb\u6570\u5c42\uff0c\u4e0d\u662f\u96f6\u6563\u62a5\u8868\u3002",
        out: "\u540c\u4e00\u4eea\u8868\u76d8\u4e0a\u7684 GMD\u3001UA/ha\u3001\u70ed\u5e94\u6fc0\u98ce\u9669\u4e0e\u4f53\u51b5\uff0c\u4f7f\u8f7d\u755c\u4e0e\u7ba1\u7406\u51b3\u7b56\u4f7f\u7528\u540c\u4e00\u5957\u6570\u5b57\u3002",
      },
    },
    mods: [
      { id: "field", line: "nutrogan", label: "\u7530\u95f4\u5e94\u7528" },
      { id: "map", line: "nutrogan", label: "\u56f4\u680f\u4e0e GIS" },
      { id: "sat", line: "nutrogan", label: "\u536b\u661f NDVI" },
      { id: "vision", line: "sigag", label: "\u52a8\u7269\u89c6\u89c9" },
      { id: "alert", line: "sigag", label: "\u56f4\u680f\u9884\u8b66" },
      { id: "board", line: "dashboard", label: "\u6001\u52bf\u4eea\u8868\u76d8" },
      { id: "lake", line: "dashboard", label: "\u5957\u7ba1 lakehouse" },
      { id: "sync", line: "dashboard", label: "\u73b0\u6709\u8868\u683c" },
    ],
  },
};

function copy() {
  return COPY[getLang()] || COPY.es;
}

function paint(root, id) {
  const c = copy();
  const line = LINES.find((l) => l.id === id) || LINES[0];
  const meta = c.lines[line.id];
  const deck = root.querySelector(".prod-deck");
  if (deck) deck.dataset.tone = line.id;
  root.querySelectorAll(".prod-slot").forEach((btn) => {
    const on = btn.dataset.prod === line.id;
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
  const shot = root.querySelector(".prod-shot");
  const live = root.querySelector(".prod-live");
  const title = root.querySelector(".prod-name");
  const from = root.querySelector("[data-step=from] .prod-copy");
  const work = root.querySelector("[data-step=work] .prod-copy");
  const out = root.querySelector("[data-step=out] .prod-copy");
  const stack = root.querySelector(".prod-view .prod-tick");
  const demo = root.querySelector(".prod-demo");
  if (shot) {
    shot.src = line.img;
    shot.alt = meta.name;
    shot.style.animation = "none";
    void shot.offsetWidth;
    shot.style.animation = "";
  }
  if (live) live.textContent = `${line.idx}  ${meta.tag}`;
  if (title) title.textContent = meta.name;
  if (from) from.textContent = meta.from;
  if (work) work.textContent = meta.work;
  if (out) out.textContent = meta.out;
  if (stack) stack.innerHTML = line.stack.map((s) => `<li>${s}</li>`).join("");
  root.querySelectorAll(".prod-slide").forEach((slide) => {
    slide.classList.toggle("is-on", slide.dataset.prod === line.id);
  });
  root.querySelectorAll(".prod-dot").forEach((dot) => {
    dot.classList.toggle("is-on", dot.dataset.prod === line.id);
    dot.setAttribute("aria-selected", dot.dataset.prod === line.id ? "true" : "false");
  });
  if (demo) {
    demo.href = waDemoUrl(meta.name);
    demo.textContent = `${c.demo} ${meta.name}`;
  }
}

export function mountProductDeck(host) {
  if (!host) return;
  const c = copy();
  host.innerHTML = `
    <section class="prod-deck" data-prod-deck data-tone="nutrogan">
      <header class="prod-head">
        <p class="eyebrow">${c.eyebrow}</p>
        <h1>${c.title}</h1>
        <p>${c.lead}</p>
      </header>
      <div class="prod-rail" data-prod-rail>
        ${LINES.map((line) => {
          const meta = c.lines[line.id];
          return `<article class="prod-slide" data-prod="${line.id}">
            <img src="${line.img}" alt="${meta.name}" />
            <div class="prod-slide-meta">
              <span class="prod-idx">${line.idx}</span>
              <div>
                <h2>${meta.name}</h2>
                <p>${meta.tag}</p>
              </div>
            </div>
            <ul class="prod-tick">${line.stack.map((s) => `<li>${s}</li>`).join("")}</ul>
          </article>`;
        }).join("")}
      </div>
      <div class="prod-dots" role="tablist" aria-label="${c.eyebrow}">
        ${LINES.map((line) => `<button type="button" class="prod-dot" data-prod="${line.id}" aria-label="${c.lines[line.id].name}"></button>`).join("")}
      </div>
      <div class="prod-orbit" role="tablist" aria-label="${c.eyebrow}">
        ${LINES.map((line) => {
          const meta = c.lines[line.id];
          return `<button type="button" class="prod-slot" role="tab" data-prod="${line.id}" aria-selected="false">
            <span class="prod-ring" aria-hidden="true"></span>
            <span class="prod-idx">${line.idx}</span>
            <span class="prod-slot-name">${meta.name}</span>
            <span class="prod-slot-tag">${meta.tag}</span>
          </button>`;
        }).join("")}
      </div>
      <div class="prod-hud">
        <div class="prod-view">
          <p class="prod-live"></p>
          <figure class="prod-scope">
            <img class="prod-shot" src="./media/ui/nutrogan-mockup.png" alt="" />
          </figure>
          <ul class="prod-tick" aria-label="stack"></ul>
        </div>
        <ol class="prod-pipe">
          <li data-step="from"><span>01</span><div><b>${c.from}</b><p class="prod-copy"></p></div></li>
          <li data-step="work"><span>02</span><div><b>${c.work}</b><p class="prod-copy"></p></div></li>
          <li data-step="out"><span>03</span><div><b>${c.out}</b><p class="prod-copy"></p></div></li>
        </ol>
      </div>
      <a class="demo-cta prod-demo" rel="noopener noreferrer" target="_blank"></a>
    </section>
  `;

  const setLine = (id, fromRail = false) => {
    paint(host, id);
    if (fromRail) return;
    const railEl = host.querySelector("[data-prod-rail]");
    const slide = host.querySelector(`.prod-slide[data-prod="${id}"]`);
    if (railEl && slide) railEl.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  };
  host.querySelectorAll(".prod-slot, .prod-dot").forEach((btn) => {
    btn.addEventListener("click", () => setLine(btn.dataset.prod));
  });
  const rail = host.querySelector("[data-prod-rail]");
  if (rail) {
    rail.addEventListener("scroll", () => {
      window.clearTimeout(rail._sync);
      rail._sync = window.setTimeout(() => {
        const mid = rail.scrollLeft + rail.clientWidth / 2;
        let best = LINES[0].id;
        let dist = Infinity;
        rail.querySelectorAll(".prod-slide").forEach((slide) => {
          const c = slide.offsetLeft + slide.offsetWidth / 2;
          const d = Math.abs(c - mid);
          if (d < dist) {
            dist = d;
            best = slide.dataset.prod;
          }
        });
        paint(host, best);
      }, 80);
    });
  }
  host.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const ids = LINES.map((l) => l.id);
    const cur = host.querySelector(".prod-slot.is-on")?.dataset.prod || ids[0];
    const i = ids.indexOf(cur);
    const next = e.key === "ArrowRight" ? ids[(i + 1) % ids.length] : ids[(i - 1 + ids.length) % ids.length];
    setLine(next);
  });
  setLine("nutrogan");
}
