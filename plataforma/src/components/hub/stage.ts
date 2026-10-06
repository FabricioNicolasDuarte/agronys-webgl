import { playClose, playOpen } from "@/components/hub/sound";
import { getCopy, subscribeLang, type LayerId } from "@/i18n/lang";

const NS = "http://www.w3.org/2000/svg";
const UNROLL_STEP = 95;
const UNROLL_MS = 420;
const GOLD = /#ffc000/i;
const HUB_RING = /M0 39C/i;
const WA = "https://wa.me/543704022201";

type Layer = {
  id: string;
  node: number | null;
  title: string;
  kicker: string;
  lead: string;
  brief: string;
  facts: string[];
  line: string;
};

const LAYER_SHAPE: { id: LayerId; node: number | null; line: string }[] = [
  { id: "ganaderia", node: 1, line: "/productos#sigag" },
  { id: "vision", node: 2, line: "/productos#sigag" },
  { id: "datos", node: 0, line: "/productos#nutrogan" },
  { id: "agro", node: 3, line: "/productos#nutrogan" },
  { id: "satelital", node: 5, line: "/productos#nutrogan" },
  { id: "orquestacion", node: 4, line: "/productos#sigag" },
  { id: "automat", node: null, line: "/servicios" },
  { id: "dataeng", node: null, line: "/productos#precision" },
  { id: "offline", node: null, line: "/servicios" },
];

function catalog(): Layer[] {
  const text = getCopy().layers;
  return LAYER_SHAPE.map((item) => ({ ...item, ...text[item.id] }));
}

function layerById(id: string) {
  return catalog().find((layer) => layer.id === id) ?? null;
}

function layerByNode(node: string) {
  return catalog().find((layer) => layer.node !== null && String(layer.node) === node) ?? null;
}

function maizeLayer(layer: Layer) {
  return layer.node === 0 || layer.node === 3 || layer.node === 5;
}

function attrBlob(el: Element) {
  return `${el.getAttribute("fill") || ""} ${el.getAttribute("stroke") || ""} ${el.getAttribute("style") || ""}`;
}

function isHubDot(el: Element) {
  if (el.tagName.toLowerCase() === "circle" && Number(el.getAttribute("r") || 0) >= 30) return true;
  const d = el.getAttribute("d") || "";
  if (HUB_RING.test(d)) return true;
  return GOLD.test(attrBlob(el));
}

function goldAnchor(el: SVGGraphicsElement) {
  const b = el.getBBox();
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  const tr = el.getAttribute("transform") || "";
  const matrix = /matrix\(\s*([^)]+)\)/i.exec(tr);
  if (matrix) {
    const p = matrix[1].trim().split(/[\s,]+/).map(Number);
    if (p.length >= 6) {
      return { el, x: p[0] * cx + p[2] * cy + p[4], y: p[1] * cx + p[3] * cy + p[5] };
    }
  }
  return { el, x: cx, y: cy };
}

function dressSleepRings(root: Element) {
  const rings = [...root.querySelectorAll("circle")].filter((el) => Number(el.getAttribute("r") || 0) >= 30);
  rings.forEach((el) => {
    el.setAttribute("fill", "none");
    el.setAttribute("stroke", "#9acae3");
    el.setAttribute("stroke-width", "9");
    el.parentElement?.appendChild(el);
  });
}

function markCowNodes(root: Element) {
  dressSleepRings(root);
  const dots = [...root.querySelectorAll("path, circle, ellipse")].filter(isHubDot) as SVGGraphicsElement[];
  if (dots.length < 3) return;
  const ranked = dots.map(goldAnchor);
  const body = ranked.reduce((a, b) => (a.y < b.y ? a : b));
  const rest = ranked.filter((d) => d !== body);
  const head = rest.reduce((a, b) => (a.x > b.x ? a : b));
  const hoof = rest.find((d) => d !== head);
  body.el.setAttribute("data-node", "1");
  head.el.setAttribute("data-node", "2");
  hoof?.el.setAttribute("data-node", "4");
  ranked.forEach(({ el }) => el.classList.add("hub-node"));
  padHubHits(root);
}

function markMaizNodes(root: Element) {
  const dots = [...root.querySelectorAll("path, circle, ellipse")].filter(isHubDot) as SVGGraphicsElement[];
  if (dots.length < 2) return;
  const ranked = dots.map(goldAnchor);
  const base = ranked.reduce((a, b) => (a.y > b.y ? a : b));
  const top = ranked.reduce((a, b) => (a.y < b.y ? a : b));
  ranked.forEach(({ el }) => el.classList.add("hub-node"));
  if (ranked.length >= 3) {
    const mid = ranked.find((d) => d !== base && d !== top);
    base.el.setAttribute("data-node", "0");
    mid?.el.setAttribute("data-node", "3");
    top.el.setAttribute("data-node", "5");
  } else {
    const leaf = ranked.find((d) => d !== base);
    leaf?.el.setAttribute("data-node", "3");
    base.el.setAttribute("data-node", "0");
  }
  padHubHits(root);
}

function padHubHits(scope: ParentNode) {
  scope.querySelectorAll(".hub-hit").forEach((el) => el.remove());
  if (!window.matchMedia("(max-width: 760px)").matches) return;
  scope.querySelectorAll<SVGGraphicsElement>(".hub-node").forEach((el) => {
    const ctm = el.getScreenCTM();
    if (!ctm) return;
    const inv = ctm.inverse();
    const origin = new DOMPoint(0, 0).matrixTransform(inv);
    const edge = new DOMPoint(22, 0).matrixTransform(inv);
    const r = Math.hypot(edge.x - origin.x, edge.y - origin.y);
    const box = el.getBBox();
    const hit = document.createElementNS(NS, "circle");
    hit.setAttribute("class", "hub-hit");
    hit.setAttribute("data-node", el.getAttribute("data-node") || "");
    hit.setAttribute("cx", String(box.x + box.width / 2));
    hit.setAttribute("cy", String(box.y + box.height / 2));
    hit.setAttribute("r", String(r));
    const transform = el.getAttribute("transform");
    if (transform) hit.setAttribute("transform", transform);
    el.parentElement?.appendChild(hit);
  });
}

async function inlineArt(host: HTMLElement, url: string, box: { x: number; y: number; w: number; h: number }, kind: "cow" | "maiz") {
  const res = await fetch(url);
  if (!res.ok) return;
  const doc = new DOMParser().parseFromString(await res.text(), "image/svg+xml");
  const root = doc.documentElement;
  const vb = root.getAttribute("viewBox") || `0 0 ${root.getAttribute("width") || 400} ${root.getAttribute("height") || 400}`;
  const nested = document.createElementNS(NS, "svg");
  nested.setAttribute("x", String(box.x));
  nested.setAttribute("y", String(box.y));
  nested.setAttribute("width", String(box.w));
  nested.setAttribute("height", String(box.h));
  nested.setAttribute("viewBox", vb);
  nested.setAttribute("preserveAspectRatio", "xMidYMax meet");
  nested.setAttribute("overflow", "visible");
  [...root.childNodes].forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) nested.appendChild(document.importNode(node, true));
  });
  host.replaceChildren(nested);
  if (kind === "cow") markCowNodes(nested);
  if (kind === "maiz") markMaizNodes(nested);
  requestAnimationFrame(() => padHubHits(nested));
}

function skyRgb() {
  const portal = document.querySelector(".portal");
  const wx = portal?.getAttribute("data-wx");
  const phase = portal?.getAttribute("data-phase");
  if (wx === "storm") return { right: "255,210,120", left: "160,190,255" };
  if (wx === "hail") return { right: "230,236,245", left: "186,206,220" };
  if (wx === "rain" || wx === "snow") return { right: "150,210,255", left: "73,200,255" };
  if (wx === "fog") return { right: "210,220,210", left: "180,200,210" };
  if (wx === "flood") return { right: "150,186,160", left: "70,130,112" };
  if (wx === "fire") return { right: "255,150,70", left: "190,72,28" };
  if (wx === "frost") return { right: "210,228,240", left: "160,196,220" };
  if (wx === "drought") return { right: "220,170,90", left: "180,130,60" };
  if (phase === "night") return { right: "186,176,255", left: "120,170,255" };
  if (phase === "dusk" || phase === "dawn") return { right: "255,192,0", left: "255,150,70" };
  return { right: "109,255,154", left: "73,236,253" };
}

function createConnectors(svg: SVGSVGElement) {
  const pool: { path: SVGPathElement; joints: SVGCircleElement[]; right: boolean }[] = [];

  function center(el: Element) {
    const r = el.getBoundingClientRect();
    const s = svg.getBoundingClientRect();
    return { x: r.left + r.width / 2 - s.left, y: r.top + r.height / 2 - s.top };
  }

  function orbClear(el: Element) {
    const r = el.getBoundingClientRect();
    return Math.max(r.width, r.height) / 2 + 8;
  }

  function makeLead(right: boolean) {
    const path = document.createElementNS(NS, "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linejoin", "miter");
    path.setAttribute("stroke-linecap", "butt");
    svg.appendChild(path);
    const joints = [0, 1].map(() => {
      const c = document.createElementNS(NS, "circle");
      svg.appendChild(c);
      return c;
    });
    return { path, joints, right };
  }

  function update() {
    const tones = skyRgb();
    const left: { from: Element; to: Element }[] = [];
    const right: { from: Element; to: Element }[] = [];
    document.querySelectorAll(".orb[data-node]").forEach((orb) => {
      const from = document.querySelector(`.hub-node[data-node="${orb.getAttribute("data-node")}"]`);
      if (!from) return;
      const side = orb.closest(".col-right") ? right : left;
      side.push({ from, to: orb });
    });
    const items = [...left, ...right].map((item) => {
      const isRight = Boolean(item.to.closest(".col-right"));
      const a = center(item.from);
      const b = center(item.to);
      const endX = isRight ? b.x - orbClear(item.to) : b.x + orbClear(item.to);
      return { pts: [a, { x: a.x, y: b.y }, { x: endX, y: b.y }], right: isRight };
    });
    while (pool.length < items.length) pool.push(makeLead(false));
    pool.forEach((group, i) => {
      const item = items[i];
      group.path.style.display = item ? "" : "none";
      group.joints.forEach((c) => { c.style.display = item ? "" : "none"; });
      if (!item) return;
      const rgb = item.right ? tones.right : tones.left;
      group.path.setAttribute("d", item.pts.map((p, n) => `${n ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" "));
      group.path.setAttribute("stroke", `rgba(${rgb},0.55)`);
      group.path.setAttribute("stroke-width", "1.15");
      const elbow = item.pts[1];
      group.joints.forEach((c, j) => {
        if (j > 0) {
          c.style.display = "none";
          return;
        }
        c.setAttribute("cx", elbow.x.toFixed(1));
        c.setAttribute("cy", elbow.y.toFixed(1));
        c.setAttribute("r", "1.8");
        c.setAttribute("fill", `rgba(${rgb},0.85)`);
      });
    });
  }

  return { update };
}

let cascadeId: string | null = null;
let cascadeTimer = 0;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wipeCascade(root: Element) {
  window.clearTimeout(cascadeTimer);
  cascadeId = null;
  const host = root.querySelector<HTMLElement>("#cascade");
  if (!host) return;
  host.hidden = true;
  host.innerHTML = "";
  host.dataset.fold = "";
  host.classList.remove("is-maize", "is-cow", "is-sheet");
  root.classList.remove("is-reading");
  root.querySelectorAll(".hub-node").forEach((el) => el.classList.remove("is-live"));
  root.querySelectorAll(".panel, .svc-btn").forEach((el) => el.classList.remove("is-hot", "is-on"));
  root.querySelector("#tails")?.classList.remove("is-live", "is-fold");
}

function foldTowardIcon(el: HTMLElement, origin: Element | null) {
  if (!origin) {
    el.style.transformOrigin = "0% 0%";
    return;
  }
  const a = origin.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  const ox = b.width ? ((a.left + a.width / 2 - b.left) / b.width) * 100 : 0;
  const oy = b.height ? ((a.top + a.height / 2 - b.top) / b.height) * 100 : 0;
  el.style.transformOrigin = `${ox}% ${oy}%`;
}

function updateTails(root: Element) {
  const svg = root.querySelector<SVGSVGElement>("#tails");
  if (!svg) return;
  const host = root.querySelector<HTMLElement>("#cascade");
  const cards = host && !host.hidden ? [...host.querySelectorAll<HTMLElement>(".cascade-card")] : [];
  const origin = root.querySelector(".panel.is-hot .orb, .svc-btn.is-on");
  const box = svg.getBoundingClientRect();
  const maize = host?.classList.contains("is-maize");
  const rgb = maize ? "109,255,154" : host?.classList.contains("is-cow") ? "73,236,253" : "255,192,0";
  const folding = host?.dataset.fold === "1";
  svg.classList.toggle("is-live", Boolean(cards.length) && !folding);
  svg.classList.toggle("is-fold", folding);

  while (svg.childElementCount < cards.length) {
    const path = document.createElementNS(NS, "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linejoin", "miter");
    path.setAttribute("stroke-linecap", "butt");
    svg.appendChild(path);
  }
  [...svg.querySelectorAll("path")].forEach((path, index) => {
    const card = cards[index];
    if (!card || !origin) {
      path.style.display = "none";
      return;
    }
    const icon = origin.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const above = cardBox.top + cardBox.height / 2 < icon.top;
    const ax = icon.left + icon.width / 2 - box.left;
    const ay = (above ? icon.top : icon.bottom) - box.top;
    const bx = cardBox.left + cardBox.width / 2 - box.left;
    const by = (above ? cardBox.bottom : cardBox.top) - box.top;
    const rail = above ? by + 16 : by - 16;
    path.style.display = "";
    path.setAttribute(
      "d",
      `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${ax.toFixed(1)} ${rail.toFixed(1)} L ${bx.toFixed(1)} ${rail.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)}`,
    );
    path.setAttribute("stroke", `rgba(${rgb},0.8)`);
    path.setAttribute("stroke-width", "1.2");
  });
}

function placeCascade(root: Element) {
  const host = root.querySelector<HTMLElement>("#cascade");
  if (!host || host.hidden) return;
  const cards = [...host.querySelectorAll<HTMLElement>(".cascade-card")];
  if (!cards.length) return;
  const phone = window.matchMedia("(max-width: 760px)").matches;
  const gap = phone ? 8 : 10;
  if (phone) {
    host.classList.add("is-sheet");
    cards.forEach((card) => {
      card.style.width = "";
      card.style.height = "";
      card.style.left = "";
      card.style.top = "";
    });
    return;
  }
  host.classList.remove("is-sheet");
  const brand = root.querySelector(".brand-logo") || root.querySelector(".brand");
  const fromSvc = Boolean(root.querySelector(".svc-btn.is-on"));
  const top = Math.round((brand?.getBoundingClientRect().bottom ?? 56) + (fromSvc ? 78 : 8));
  const w = Math.max(148, Math.min(188, Math.floor((Math.min(window.innerWidth - 24, 820) - 3 * gap) / 4)));
  const h = 148;
  const total = cards.length * w + (cards.length - 1) * gap;
  let x = window.innerWidth / 2 - total / 2;
  x = Math.max(12, Math.min(x, window.innerWidth - total - 12));
  cards.forEach((card, i) => {
    card.style.width = `${w}px`;
    card.style.height = `${h}px`;
    card.style.left = `${Math.round(x + i * (w + gap))}px`;
    card.style.top = `${top}px`;
  });
}

function closeCascade(root: Element) {
  const host = root.querySelector<HTMLElement>("#cascade");
  if (!host || host.hidden) {
    wipeCascade(root);
    return;
  }
  const items = [...host.querySelectorAll<HTMLElement>(".cascade-card")];
  if (!items.length) {
    wipeCascade(root);
    return;
  }
  if (host.dataset.fold === "1") return;
  playClose();
  if (reducedMotion()) {
    wipeCascade(root);
    return;
  }
  host.dataset.fold = "1";
  const origin = root.querySelector(".panel.is-hot .orb, .svc-btn.is-on");
  items.forEach((el, i) => {
    foldTowardIcon(el, origin);
    el.style.transitionDelay = `${(items.length - 1 - i) * UNROLL_STEP}ms`;
    el.classList.remove("is-open");
    el.classList.add("is-fold");
  });
  window.clearTimeout(cascadeTimer);
  cascadeTimer = window.setTimeout(() => wipeCascade(root), (items.length - 1) * UNROLL_STEP + UNROLL_MS + 40);
}

function fillCascade(host: HTMLElement, layer: Layer, tone: string) {
  const copy = getCopy();
  const demo = `${WA}?text=${encodeURIComponent(copy.demoMsg(layer.title))}`;
  host.innerHTML = `
    <article class="cascade-card is-title"><span class="cascade-index">01</span><p class="cascade-kicker">${layer.kicker}</p><h3>${layer.title}</h3></article>
    <article class="cascade-card"><span class="cascade-index">02</span><p>${layer.brief}</p></article>
    <article class="cascade-card"><span class="cascade-index">03</span><ul>${layer.facts.map((fact) => `<li>${fact}</li>`).join("")}</ul></article>
    <article class="cascade-card is-actions"><span class="cascade-index">04</span>
      <a class="demo-cta demo-cta--${tone}" href="${demo}" target="_blank" rel="noopener noreferrer">${copy.demo}</a>
      <a class="demo-cta demo-cta--${tone}" href="${layer.line}">${copy.seeLine}</a>
      <button type="button" class="cascade-x" aria-label="${copy.close}">×</button>
    </article>`;
}

function openCascade(root: Element, id: string, refresh = false) {
  const layer = layerById(id);
  const host = root.querySelector<HTMLElement>("#cascade");
  if (!layer || !host) return;
  const tone = maizeLayer(layer) ? "maize" : "cow";
  if (refresh && cascadeId === id && !host.hidden && host.dataset.fold !== "1") {
    fillCascade(host, layer, tone);
    host.querySelector(".cascade-x")?.addEventListener("click", (event) => {
      event.stopPropagation();
      closeCascade(root);
    });
    return;
  }
  if (!refresh && cascadeId === id && host.dataset.fold !== "1") {
    closeCascade(root);
    return;
  }
  if (host.dataset.fold === "1") wipeCascade(root);
  window.clearTimeout(cascadeTimer);
  playOpen();
  cascadeId = id;
  host.classList.toggle("is-maize", tone === "maize");
  host.classList.toggle("is-cow", tone === "cow");
  root.classList.add("is-reading");
  root.querySelectorAll(".hub-node").forEach((el) => {
    el.classList.toggle("is-live", el.getAttribute("data-node") === String(layer.node));
  });
  root.querySelectorAll(".panel").forEach((el) => el.classList.toggle("is-hot", el.getAttribute("data-layer") === id));
  root.querySelectorAll(".svc-btn").forEach((el) => el.classList.toggle("is-on", el.getAttribute("data-layer") === id));
  fillCascade(host, layer, tone);
  host.hidden = false;
  host.classList.toggle("is-sheet", window.matchMedia("(max-width: 760px)").matches);
  host.querySelector(".cascade-x")?.addEventListener("click", (event) => {
    event.stopPropagation();
    closeCascade(root);
  });
  requestAnimationFrame(() => {
    placeCascade(root);
    updateTails(root);
    host.querySelectorAll<HTMLElement>(".cascade-card").forEach((el, i) => {
      el.classList.remove("is-fold");
      el.style.transformOrigin = "0% 0%";
      el.style.transitionDelay = reducedMotion() ? "0ms" : `${i * UNROLL_STEP}ms`;
      el.classList.add("is-open");
    });
  });
}

function clearSleepMarks(root: Element) {
  root.querySelectorAll(".sleep-z").forEach((el) => el.remove());
}

function sleepLayer(root: HTMLElement) {
  const host = root.querySelector("#ui");
  if (!host) return null;
  let layer = host.querySelector<HTMLElement>("#sleep-zs");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "sleep-zs";
    layer.setAttribute("aria-hidden", "true");
    host.appendChild(layer);
  }
  return layer;
}

function spawnSleepGroup(root: HTMLElement) {
  const layer = sleepLayer(root);
  const head = root.querySelector("#art-vaca [data-node='2']");
  if (!layer || !head) return false;
  const roll = Math.random();
  const count = roll < 0.22 ? 2 : roll < 0.84 ? 3 : 4;
  const layerBox = layer.getBoundingClientRect();
  const headBox = head.getBoundingClientRect();
  const originX = headBox.left + headBox.width * 0.35 - layerBox.left;
  const originY = headBox.top - layerBox.top - 8;
  for (let i = 0; i < count; i += 1) {
    const mark = document.createElement("span");
    mark.className = "sleep-z";
    mark.textContent = "z";
    mark.setAttribute("aria-hidden", "true");
    mark.style.left = `${originX + i * 12}px`;
    mark.style.top = `${originY - i * 6}px`;
    mark.style.fontSize = `${1.55 + i * 0.55}rem`;
    mark.style.animationDelay = `${i * 0.46}s`;
    mark.style.setProperty("--z-x", `${16 + i * 22}px`);
    mark.style.setProperty("--z-y", `${-168 - i * 52}px`);
    layer.appendChild(mark);
    mark.addEventListener("animationend", () => mark.remove());
  }
  return true;
}

let sleepGen = 0;

export function mountStage(root: HTMLElement) {
  const gen = ++sleepGen;
  let frame = 0;
  let stopped = false;
  let sleepTimer = 0;
  let asleep = false;
  const detach: Array<() => void> = [];
  const current = () => gen === sleepGen && !stopped;
  const stopSleep = () => {
    window.clearTimeout(sleepTimer);
    asleep = false;
    if (gen === sleepGen) clearSleepMarks(root);
  };
  const queueSleep = (delay: number) => {
    if (!current()) return;
    window.clearTimeout(sleepTimer);
    sleepTimer = window.setTimeout(breatheSleep, delay);
  };
  const breatheSleep = () => {
    if (!current() || reducedMotion() || root.dataset.rest !== "1") {
      if (current()) stopSleep();
      return;
    }
    if (!spawnSleepGroup(root)) {
      queueSleep(700);
      return;
    }
    queueSleep(12000 + Math.random() * 9000);
  };
  const armSleep = () => {
    if (!current() || reducedMotion() || root.dataset.rest !== "1") {
      if (root.dataset.rest !== "1") stopSleep();
      return;
    }
    if (asleep) return;
    asleep = true;
    queueSleep(1600);
  };
  const onResize = () => {
    placeCascade(root);
    const cow = root.querySelector("#art-vaca");
    const maize = root.querySelector("#art-maiz");
    if (cow) padHubHits(cow);
    if (maize) padHubHits(maize);
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") closeCascade(root);
  };

  void (async () => {
    const cow = root.querySelector<HTMLElement>("#art-vaca");
    const maize = root.querySelector<HTMLElement>("#art-maiz");
    if (!cow || !maize) return;
    const cowBox = { x: 95, y: 370, w: 560, h: 390 };
    let shown = "";
    let busy = false;
    let queued = false;
    const syncCow = async () => {
      const next = root.dataset.rest === "1" ? "rest" : "wake";
      if (busy) {
        queued = true;
        return;
      }
      if (next === shown) return;
      busy = true;
      await inlineArt(cow, next === "rest" ? "/art/vaca-duerme.svg" : "/art/vaca.svg", cowBox, "cow");
      shown = next;
      busy = false;
      if (stopped) return;
      if (queued) {
        queued = false;
        await syncCow();
      }
    };
    const watch = new MutationObserver(() => {
      void syncCow();
      armSleep();
    });
    watch.observe(root, { attributes: true, attributeFilter: ["data-rest"] });
    detach.push(() => watch.disconnect());
    detach.push(subscribeLang(() => {
      if (cascadeId) openCascade(root, cascadeId, true);
    }));
    await Promise.all([syncCow(), inlineArt(maize, "/art/maiz.svg", { x: 470, y: 4, w: 520, h: 756 }, "maiz")]);
    if (!current()) return;
    armSleep();
    const leads = root.querySelector<SVGSVGElement>("#leads");
    const connectors = leads ? createConnectors(leads) : null;
    const tick = () => {
      connectors?.update();
      updateTails(root);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const onNodeClick = (event: Event) => {
      const el = (event.target as Element | null)?.closest?.(".hub-node, .hub-hit");
      if (!el || (!cow.contains(el) && !maize.contains(el))) return;
      event.stopPropagation();
      const layer = layerByNode(el.getAttribute("data-node") || "");
      if (layer) openCascade(root, layer.id);
    };
    cow.addEventListener("click", onNodeClick);
    maize.addEventListener("click", onNodeClick);
    detach.push(() => {
      cow.removeEventListener("click", onNodeClick);
      maize.removeEventListener("click", onNodeClick);
    });
  })();

  root.querySelectorAll<HTMLElement>("[data-layer]").forEach((el) => {
    const onClick = (event: Event) => {
      event.preventDefault();
      const id = el.dataset.layer;
      if (id) openCascade(root, id);
    };
    el.addEventListener("click", onClick);
    detach.push(() => el.removeEventListener("click", onClick));
  });
  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKey);

  return () => {
    stopped = true;
    stopSleep();
    cascadeId = null;
    detach.splice(0).forEach((fn) => fn());
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("keydown", onKey);
  };
}
