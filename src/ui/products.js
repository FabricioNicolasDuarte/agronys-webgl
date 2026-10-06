import { getLang } from "../i18n.js";
import { waDemoUrl } from "../content/pages.js";

const NUTROGAN_APP_URL = "https://nutrogan.site";

const LINES = [
  {
    id: "nutrogan",
    idx: "01",
    img: "/media/ui/nutrogan-mockup.png",
    appUrl: NUTROGAN_APP_URL,
    stack: ["Agricultura", "Recorrido del lote", "Sigue sin señal", "Dron solo si ya lo tiene"],
  },
  {
    id: "sigag",
    idx: "02",
    img: "/media/ui/sigag-mockup.png",
    stack: ["Ganadería", "Lectura de apoyo", "Sigue sin señal", "Caravana solo si ya la tiene"],
  },
  {
    id: "potrero",
    idx: "03",
    img: "/media/ui/dashboard-mockup.png",
    stack: ["Mixto", "Carga y forraje", "Tablero del establecimiento", "Sin hardware obligatorio"],
  },
];

const COPY = {
  es: {
    eyebrow: "Productos",
    title: "Software para el establecimiento",
    lead: "Tres l\u00edneas: agricultura, ganader\u00eda y el campo mixto. El programa trabaja con o sin se\u00f1al. La caravana, el dron o el sensor se conectan solo si el establecimiento ya los tiene.",
    from: "De d\u00f3nde parte",
    work: "Qu\u00e9 se hace",
    out: "Qu\u00e9 se obtiene",
    demo: "Pedir demo de",
    visitApp: "Abrir app",
    lines: {
      nutrogan: {
        name: "Nutrogan",
        tag: "Agricultura",
        from: "El lote, con o sin se\u00f1al. La decisi\u00f3n de recorrido no puede esperar a la oficina.",
        work: "Se mira el vigor del cultivo con imagen satelital abierta y el clima del d\u00eda. La salida es qu\u00e9 zona recorrer. Si el establecimiento ya tiene un dron o un sensor de suelo, ese archivo entra al mismo lote.",
        out: "Una lista de zonas para caminar, usable en el campo y en el escritorio.",
      },
      sigag: {
        name: "SIGAG",
        tag: "Ganader\u00eda",
        from: "El animal en el lote, la manga o el corral, el d\u00eda de trabajo.",
        work: "Se registra la jornada sin red. La c\u00e1mara aporta una lectura de apoyo: condici\u00f3n, se\u00f1ales visibles y materia fecal. Si ya hay caravana electr\u00f3nica, se lee. La declaraci\u00f3n ante SENASA la hace el productor.",
        out: "El mismo criterio para encargado y veterinario. Orienta. No diagnostica ni reemplaza al laboratorio.",
      },
      potrero: {
        name: "Potrero",
        tag: "Mixto",
        from: "El pasto y la hacienda del mismo establecimiento, que hoy suelen vivir en sistemas separados.",
        work: "Se cruza la carga, el descanso del lote y el vigor del forraje. Encima, el tablero de la campa\u00f1a: ganancia de peso, carga por hect\u00e1rea, calor y condici\u00f3n.",
        out: "Una lectura para decidir qu\u00e9 potrero recibe hacienda y cu\u00e1l necesita reposo.",
      },
    },
    mods: [
      { id: "field", line: "nutrogan", label: "App de campo" },
      { id: "map", line: "nutrogan", label: "Potreros y GIS" },
      { id: "sat", line: "nutrogan", label: "NDVI satelital" },
      { id: "vision", line: "sigag", label: "Visi\u00f3n en el animal" },
      { id: "alert", line: "sigag", label: "Alertas de lote" },
      { id: "board", line: "potrero", label: "Tablero de situaci\u00f3n" },
      { id: "forraje", line: "potrero", label: "Carga y forraje" },
      { id: "sync", line: "potrero", label: "Planillas existentes" },
    ],
  },
  en: {
    eyebrow: "Products",
    title: "Software for the farm",
    lead: "Three lines: cropping, livestock and the mixed farm. The program works with or without a signal. A tag, drone or sensor connects only when the farm already has it.",
    from: "Where it starts",
    work: "What is done",
    out: "What you get",
    demo: "Request a demo of",
    visitApp: "Open app",
    lines: {
      nutrogan: {
        name: "Nutrogan",
        tag: "Cropping",
        from: "The field, with or without a signal. The walk cannot wait for the office.",
        work: "Crop vigor is read from open satellite imagery and the day's weather. The output is which zone to walk. If the farm already has a drone or a soil sensor, that file joins the same field.",
        out: "A list of zones to walk, usable in the field and at the desk.",
      },
      sigag: {
        name: "SIGAG",
        tag: "Livestock",
        from: "The animal in the lot, chute or yard, on the working day.",
        work: "The day is recorded without a network. The camera adds a supporting reading: condition, visible signs and fecal matter. An electronic tag is read only if it is already there. The official declaration stays with the producer.",
        out: "One criterion for the manager and the veterinarian. It guides. It does not diagnose or replace the lab.",
      },
      potrero: {
        name: "Potrero",
        tag: "Mixed farm",
        from: "Grass and cattle on the same farm, which usually live in separate systems.",
        work: "Stocking, paddock rest and forage vigor are read together. Above that, the campaign board: weight gain, stocking per hectare, heat and condition.",
        out: "One reading to decide which paddock can take cattle and which needs rest.",
      },
    },
    mods: [
      { id: "field", line: "nutrogan", label: "Field app" },
      { id: "map", line: "nutrogan", label: "Paddocks and GIS" },
      { id: "sat", line: "nutrogan", label: "Satellite NDVI" },
      { id: "vision", line: "sigag", label: "Vision on the animal" },
      { id: "alert", line: "sigag", label: "Lot alerts" },
      { id: "board", line: "potrero", label: "Status board" },
      { id: "forraje", line: "potrero", label: "Stocking and forage" },
      { id: "sync", line: "potrero", label: "Existing sheets" },
    ],
  },
  pt: {
    eyebrow: "Produtos",
    title: "Software para o estabelecimento",
    lead: "Tr\u00eas linhas: agricultura, pecu\u00e1ria e o campo misto. O programa funciona com ou sem sinal. Brinco, drone ou sensor entram s\u00f3 se o estabelecimento j\u00e1 os tem.",
    from: "De onde parte",
    work: "O que se faz",
    out: "O que se obt\u00e9m",
    demo: "Pedir demo de",
    visitApp: "Abrir app",
    lines: {
      nutrogan: {
        name: "Nutrogan",
        tag: "Agricultura",
        from: "O lote, com ou sem sinal. A decis\u00e3o do percurso n\u00e3o pode esperar o escrit\u00f3rio.",
        work: "O vigor do cultivo \u00e9 lido com imagem de sat\u00e9lite aberta e o clima do dia. A sa\u00edda \u00e9 qual zona percorrer. Se o estabelecimento j\u00e1 tem drone ou sensor de solo, esse arquivo entra no mesmo lote.",
        out: "Uma lista de zonas para caminhar, us\u00e1vel no campo e no escrit\u00f3rio.",
      },
      sigag: {
        name: "SIGAG",
        tag: "Pecu\u00e1ria",
        from: "O animal no lote, no tronco ou no curral, no dia de trabalho.",
        work: "A jornada \u00e9 registrada sem rede. A c\u00e2mera acrescenta uma leitura de apoio: condi\u00e7\u00e3o, sinais vis\u00edveis e mat\u00e9ria fecal. O brinco eletr\u00f4nico \u00e9 lido s\u00f3 se j\u00e1 existe. A declara\u00e7\u00e3o oficial fica com o produtor.",
        out: "O mesmo crit\u00e9rio para o encarregado e o veterin\u00e1rio. Orienta. N\u00e3o diagnostica nem substitui o laborat\u00f3rio.",
      },
      potrero: {
        name: "Potrero",
        tag: "Misto",
        from: "O pasto e o gado do mesmo estabelecimento, que hoje costumam viver em sistemas separados.",
        work: "Cruza-se carga, descanso do piquete e vigor da forragem. Por cima, o painel da campanha: ganho de peso, carga por hectare, calor e condi\u00e7\u00e3o.",
        out: "Uma leitura para decidir qual piquete recebe gado e qual precisa de descanso.",
      },
    },
    mods: [
      { id: "field", line: "nutrogan", label: "App de campo" },
      { id: "map", line: "nutrogan", label: "Piquetes e GIS" },
      { id: "sat", line: "nutrogan", label: "NDVI satelital" },
      { id: "vision", line: "sigag", label: "Vis\u00e3o no animal" },
      { id: "alert", line: "sigag", label: "Alertas de lote" },
      { id: "board", line: "potrero", label: "Painel de situa\u00e7\u00e3o" },
      { id: "forraje", line: "potrero", label: "Carga e forragem" },
      { id: "sync", line: "potrero", label: "Planilhas existentes" },
    ],
  },
  zh: {
    eyebrow: "\u4ea7\u54c1",
    title: "\u7267\u573a\u8f6f\u4ef6",
    lead: "\u4e09\u6761\u4ea7\u54c1\u7ebf\uff1a\u79cd\u690d\u3001\u517b\u6b96\u4e0e\u6df7\u5408\u519c\u573a\u3002\u6709\u7f51\u6216\u65e0\u7f51\u90fd\u53ef\u4ee5\u5de5\u4f5c\u3002\u8033\u6807\u3001\u65e0\u4eba\u673a\u6216\u4f20\u611f\u5668\u53ea\u6709\u7267\u573a\u5df2\u7ecf\u62e5\u6709\u65f6\u624d\u63a5\u5165\u3002",
    from: "\u4ece\u4f55\u5f00\u59cb",
    work: "\u505a\u4ec0\u4e48",
    out: "\u5f97\u5230\u4ec0\u4e48",
    demo: "\u7533\u8bf7\u6f14\u793a",
    visitApp: "\u6253\u5f00\u5e94\u7528",
    lines: {
      nutrogan: {
        name: "Nutrogan",
        tag: "\u79cd\u690d",
        from: "\u7530\u5757\uff0c\u6709\u7f51\u6216\u65e0\u7f51\u3002\u5de1\u89c6\u4e0d\u80fd\u7b49\u5230\u4e86\u529e\u516c\u5ba4\u3002",
        work: "\u7528\u516c\u5f00\u536b\u661f\u5f71\u50cf\u548c\u5f53\u5929\u5929\u6c14\u770b\u4f5c\u7269\u957f\u52bf\u3002\u7ed3\u679c\u662f\u8be5\u8d70\u54ea\u4e00\u533a\u3002\u7267\u573a\u82e5\u5df2\u6709\u65e0\u4eba\u673a\u6216\u571f\u58e4\u4f20\u611f\u5668\uff0c\u6587\u4ef6\u8fdb\u5165\u540c\u4e00\u5757\u5730\u3002",
        out: "\u4e00\u4efd\u53ef\u5728\u7530\u95f4\u548c\u684c\u9762\u4f7f\u7528\u7684\u5de1\u89c6\u6e05\u5355\u3002",
      },
      sigag: {
        name: "SIGAG",
        tag: "\u517b\u6b96",
        from: "\u5de5\u4f5c\u5f53\u5929\u7684\u56f4\u680f\u3001\u901a\u9053\u6216\u5708\u680f\u91cc\u7684\u52a8\u7269\u3002",
        work: "\u65e0\u7f51\u4e5f\u80fd\u8bb0\u5f55\u5f53\u5929\u7684\u5de5\u4f5c\u3002\u76f8\u673a\u63d0\u4f9b\u8f85\u52a9\u8bfb\u6570\uff1a\u4f53\u51b5\u3001\u53ef\u89c1\u5f02\u5e38\u548c\u7caa\u4fbf\u3002\u53ea\u6709\u5df2\u7ecf\u6709\u7535\u5b50\u8033\u6807\u65f6\u624d\u8bfb\u53d6\u3002\u5b98\u65b9\u7533\u62a5\u4ecd\u7531\u751f\u4ea7\u8005\u5b8c\u6210\u3002",
        out: "\u7ba1\u7406\u4e0e\u517d\u533b\u4f7f\u7528\u540c\u4e00\u6807\u51c6\u3002\u5b83\u63d0\u4f9b\u53c2\u8003\uff0c\u4e0d\u505a\u8bca\u65ad\uff0c\u4e5f\u4e0d\u53d6\u4ee3\u5b9e\u9a8c\u5ba4\u3002",
      },
      potrero: {
        name: "Potrero",
        tag: "\u6df7\u5408",
        from: "\u540c\u4e00\u7267\u573a\u7684\u8349\u573a\u4e0e\u725b\u7fa4\uff0c\u4eca\u5929\u901a\u5e38\u5206\u5728\u4e0d\u540c\u7cfb\u7edf\u91cc\u3002",
        work: "\u628a\u8f7d\u755c\u3001\u56f4\u680f\u4f11\u606f\u548c\u9972\u8349\u957f\u52bf\u653e\u5728\u540c\u4e00\u8bfb\u6570\u91cc\u3002\u4e0a\u9762\u662f\u4ea7\u5b63\u4eea\u8868\u76d8\uff1a\u589e\u91cd\u3001\u6bcf\u516c\u9877\u8f7d\u755c\u3001\u70ed\u5e94\u6fc0\u548c\u4f53\u51b5\u3002",
        out: "\u4e00\u6b21\u8bfb\u6570\uff0c\u7528\u6765\u51b3\u5b9a\u54ea\u5757\u56f4\u680f\u53ef\u4ee5\u8fdb\u725b\u3001\u54ea\u5757\u9700\u8981\u4f11\u606f\u3002",
      },
    },
    mods: [
      { id: "field", line: "nutrogan", label: "\u7530\u95f4\u5e94\u7528" },
      { id: "map", line: "nutrogan", label: "\u56f4\u680f\u4e0e GIS" },
      { id: "sat", line: "nutrogan", label: "\u536b\u661f NDVI" },
      { id: "vision", line: "sigag", label: "\u52a8\u7269\u89c6\u89c9" },
      { id: "alert", line: "sigag", label: "\u56f4\u680f\u9884\u8b66" },
      { id: "board", line: "potrero", label: "\u6001\u52bf\u4eea\u8868\u76d8" },
      { id: "forraje", line: "potrero", label: "\u8f7d\u755c\u4e0e\u9972\u8349" },
      { id: "sync", line: "potrero", label: "\u73b0\u6709\u8868\u683c" },
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
  const app = root.querySelector(".prod-app");
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
  if (app) {
    if (line.appUrl) {
      app.hidden = false;
      app.href = line.appUrl;
      app.textContent = `${c.visitApp || "Open app"} · nutrogan.site`;
    } else {
      app.hidden = true;
    }
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
            <img class="prod-shot" src="/media/ui/nutrogan-mockup.png" alt="" />
          </figure>
          <ul class="prod-tick" aria-label="stack"></ul>
        </div>
        <ol class="prod-pipe">
          <li data-step="from"><span>01</span><div><b>${c.from}</b><p class="prod-copy"></p></div></li>
          <li data-step="work"><span>02</span><div><b>${c.work}</b><p class="prod-copy"></p></div></li>
          <li data-step="out"><span>03</span><div><b>${c.out}</b><p class="prod-copy"></p></div></li>
        </ol>
      </div>
      <div class="prod-actions">
        <a class="demo-cta prod-demo" rel="noopener noreferrer" target="_blank"></a>
        <a class="demo-cta prod-app" rel="noopener noreferrer" target="_blank" hidden></a>
      </div>
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
