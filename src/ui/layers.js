import { LAYERS, layerByNode } from "../content/agronys.js";
import { playTap } from "./sound.js";
import { waDemoUrl } from "../content/pages.js";
import { t } from "../i18n.js";

let cascadeId = null;
let cascadeTimer = 0;
const UNROLL_STEP = 95;
const UNROLL_MS = 420;

function demoButton(topic, tone = "") {
  const copy = t();
  const klass = tone ? `demo-cta demo-cta--${tone}` : "demo-cta";
  return `<a class="${klass}" href="${waDemoUrl(topic)}" rel="noopener noreferrer" target="_blank">${copy.askDemo}</a>`;
}

function maizeLayer(layer) {
  return layer.node === 0 || layer.node === 3 || layer.node === 5;
}

function cascadeItems(host) {
  return [...host.querySelectorAll(".cascade-card")];
}

function setReading(on, node) {
  document.querySelector(".portal")?.classList.toggle("is-reading", on);
  document.querySelectorAll(".hub-node").forEach((el) => {
    el.classList.toggle("is-live", Boolean(on && String(el.dataset.node) === String(node)));
  });
}

function cascadeBand() {
  const bar = document.querySelector(".topbar");
  const brand = document.querySelector(".brand-logo") || document.querySelector(".brand");
  const top = Math.round((brand || bar)?.getBoundingClientRect().bottom ?? 56) + 8;
  return { top, cx: window.innerWidth / 2 };
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

function fillSheet(layer) {
  const k = document.querySelector("#sheet-kicker");
  const title = document.querySelector("#sheet-title");
  const p = document.querySelector("#sheet-lead");
  const extra = document.querySelector("#sheet-extra");
  const ul = document.querySelector("#sheet-list");
  const demo = document.querySelector("#sheet-demo");
  const close = document.querySelector("#sheet-close");
  if (k) k.textContent = layer.kicker;
  if (title) title.textContent = layer.title;
  if (p) p.textContent = layer.lead;
  if (extra) extra.textContent = layer.extra || "";
  if (ul) ul.innerHTML = (layer.bullets || []).map((b) => `<li>${b}</li>`).join("");
  if (demo) demo.innerHTML = demoButton(layer.title);
  if (close) close.textContent = t().close;
}

export function openSection(id) {
  closeCascade();
  const layer = LAYERS().find((l) => l.id === id) ?? LAYERS()[0];
  fillSheet(layer);
  const sheet = document.querySelector("#sheet");
  if (sheet) sheet.hidden = false;
}

export function closeSection() {
  const sheet = document.querySelector("#sheet");
  if (sheet) sheet.hidden = true;
  const h = location.hash.replace("#", "");
  if (LAYERS().some((l) => l.id === h)) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

function cascadePieces(layer) {
  const facts = (layer.facts || layer.bullets || []).slice(0, 2);
  return [
    { kicker: layer.kicker, title: layer.title },
    { body: layer.brief || layer.lead },
    { facts },
    { actions: true },
  ];
}

function wipeCascade() {
  cascadeId = null;
  window.clearTimeout(cascadeTimer);
  const host = document.querySelector("#cascade");
  if (!host) return;
  host.hidden = true;
  host.innerHTML = "";
  host.classList.remove("is-maize", "is-cow");
  setReading(false);
}

function foldTowardIcon(el, origin) {
  if (!origin) {
    el.style.transformOrigin = "0% 50%";
    return;
  }
  const a = origin.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  const ox = b.width ? ((a.left + a.width / 2 - b.left) / b.width) * 100 : 0;
  const oy = b.height ? ((a.top + a.height / 2 - b.top) / b.height) * 100 : 50;
  el.style.transformOrigin = `${ox}% ${oy}%`;
}

export function closeCascade() {
  const host = document.querySelector("#cascade");
  if (!host || host.hidden) {
    wipeCascade();
    return;
  }
  const items = cascadeItems(host);
  if (!items.length || reducedMotion()) {
    wipeCascade();
    return;
  }
  host.dataset.fold = "1";
  host.dataset.foldAt = String(performance.now());
  const origin = document.querySelector(".panel.is-hot .orb");
  items.forEach((el, i) => {
    foldTowardIcon(el, origin);
    el.style.transitionDelay = `${(items.length - 1 - i) * UNROLL_STEP}ms`;
    el.classList.remove("is-open");
    el.classList.add("is-fold");
  });
  window.clearTimeout(cascadeTimer);
  cascadeTimer = window.setTimeout(wipeCascade, (items.length - 1) * UNROLL_STEP + UNROLL_MS + 50);
}

function isPhone() {
  return window.matchMedia("(max-width: 760px)").matches;
}

export function placeCascade() {
  const host = document.querySelector("#cascade");
  if (!host || host.hidden) return;
  const cards = [...host.querySelectorAll(".cascade-card")];
  if (!cards.length) return;

  const gap = isPhone() ? 8 : 10;
  const n = cards.length;

  if (isPhone()) {
    const bar = document.querySelector(".topbar");
    const top = Math.round((bar?.getBoundingClientRect().bottom ?? 52) + 8);
    const pad = 12;
    const w = Math.max(200, window.innerWidth - pad * 2);
    const avail = window.innerHeight - top - pad - 8;
    const h = Math.max(92, Math.min(128, Math.floor((avail - (n - 1) * gap) / n)));
    cards.forEach((card, i) => {
      card.style.width = `${w}px`;
      card.style.height = `${h}px`;
      card.style.left = `${pad}px`;
      card.style.top = `${top + i * (h + gap)}px`;
    });
    return;
  }

  const band = cascadeBand();
  const w = Math.max(148, Math.min(188, Math.floor((Math.min(window.innerWidth - 24, 820) - (n - 1) * gap) / n)));
  const h = 148;
  const total = n * w + (n - 1) * gap;
  let x = band.cx - total / 2;
  x = Math.max(12, Math.min(x, window.innerWidth - total - 12));
  const y = band.top;

  cards.forEach((card, i) => {
    card.style.width = `${w}px`;
    card.style.height = `${h}px`;
    card.style.left = `${Math.round(x + i * (w + gap))}px`;
    card.style.top = `${Math.round(y)}px`;
  });
}

function unrollCascade(host) {
  const items = cascadeItems(host);
  const instant = reducedMotion();
  items.forEach((el, i) => {
    el.classList.remove("is-fold");
    el.style.transformOrigin = isPhone() ? "50% 0%" : "0% 50%";
    el.style.transitionDelay = instant ? "0ms" : `${i * UNROLL_STEP}ms`;
  });
  host.dataset.fold = "";
  host.dataset.foldAt = "";
  host.dataset.unroll = String(performance.now());
  requestAnimationFrame(() => {
    items.forEach((el) => el.classList.add("is-open"));
  });
}

function renderCascade(id) {
  const layer = LAYERS().find((l) => l.id === id);
  const host = document.querySelector("#cascade");
  if (!layer || !host) return;
  window.clearTimeout(cascadeTimer);
  cascadeId = id;
  closeSection();
  const closeLabel = t().close || "×";
  const tone = maizeLayer(layer) ? "maize" : "cow";
  host.classList.toggle("is-maize", tone === "maize");
  host.classList.toggle("is-cow", tone === "cow");
  setReading(true, layer.node);
  host.innerHTML = cascadePieces(layer)
    .map((piece, i) => {
      const n = String(i + 1).padStart(2, "0");
      const index = `<span class="cascade-index" aria-hidden="true">${n}</span>`;
      if (piece.actions) {
        return `<article class="cascade-card is-actions">${index}
      ${demoButton(layer.title, tone)}
      <button type="button" class="cascade-x" aria-label="${closeLabel}">×</button>
    </article>`;
      }
      const kicker = piece.kicker ? `<p class="cascade-kicker">${piece.kicker}</p>` : "";
      const title = piece.title ? `<h3>${piece.title}</h3>` : "";
      const body = piece.body ? `<p>${piece.body}</p>` : "";
      const facts = piece.facts
        ? `<ul>${piece.facts.map((f) => `<li>${f}</li>`).join("")}</ul>`
        : "";
      const klass = piece.title ? "cascade-card is-title" : "cascade-card";
      return `<article class="${klass}">${index}${kicker}${title}${body}${facts}</article>`;
    })
    .join("");
  host.hidden = false;
  host.querySelector(".cascade-x")?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeCascade();
  });
  requestAnimationFrame(() => {
    placeCascade();
    unrollCascade(host);
    requestAnimationFrame(placeCascade);
  });
}

export function paintLayer(id, { open = true, sound = false, cascade = false } = {}) {
  const layer = LAYERS().find((l) => l.id === id) ?? LAYERS()[0];

  document.querySelectorAll(".panel").forEach((el) => {
    el.classList.toggle("is-hot", el.dataset.layer === layer.id);
  });
  document.querySelectorAll(".svc-btn").forEach((el) => {
    el.classList.toggle("is-on", el.dataset.layer === layer.id);
  });

  window.dispatchEvent(new CustomEvent("agronys:layer", { detail: { id: layer.id, node: layer.node } }));
  if (sound) playTap();
  if (cascade) {
    renderCascade(layer.id);
    return;
  }
  closeCascade();
  if (open) openSection(layer.id);
}

export function openHubDetail(id, { sound = false } = {}) {
  if (cascadeId === id) {
    closeCascade();
    if (sound) playTap();
    return;
  }
  paintLayer(id, { open: false, sound, cascade: true });
}

export function bindUi() {
  document.querySelectorAll(".panel[data-layer]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openHubDetail(el.dataset.layer, { sound: true });
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openHubDetail(el.dataset.layer, { sound: true });
      }
    });
  });
  document.querySelectorAll(".svc-btn[data-layer]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      paintLayer(el.dataset.layer, { open: true, sound: true });
    });
  });
  document.querySelector("#sheet-close")?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeSection();
  });
  document.querySelector("#sheet")?.addEventListener("click", (e) => {
    if (e.target.id === "sheet") closeSection();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCascade();
      closeSection();
    }
  });
  window.addEventListener("resize", placeCascade);
  window.addEventListener("agronys:lang", () => {
    const sheet = document.querySelector("#sheet");
    const hot =
      document.querySelector(".panel.is-hot")?.dataset.layer ||
      document.querySelector(".svc-btn.is-on")?.dataset.layer;
    if (sheet && !sheet.hidden && hot) fillSheet(LAYERS().find((l) => l.id === hot) ?? LAYERS()[0]);
    if (cascadeId) renderCascade(cascadeId);
  });

  const fromHash = location.hash.replace("#", "");
  if (LAYERS().some((l) => l.id === fromHash)) {
    paintLayer(fromHash, { open: false });
  } else {
    paintLayer("ganaderia", { open: false });
  }
}

export { layerByNode };
