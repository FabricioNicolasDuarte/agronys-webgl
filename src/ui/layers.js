import { LAYERS, layerByNode } from "../content/skadia.js";
import { playTap } from "./sound.js";
import { waDemoUrl } from "../content/pages.js";
import { t } from "../i18n.js";

function demoButton(topic) {
  const copy = t();
  return `<a class="demo-cta" href="${waDemoUrl(topic)}" rel="noopener noreferrer" target="_blank">${copy.askDemo}</a>`;
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

export function paintLayer(id, { open = true, sound = false } = {}) {
  const layer = LAYERS().find((l) => l.id === id) ?? LAYERS()[0];

  document.querySelectorAll(".panel").forEach((el) => {
    el.classList.toggle("is-hot", el.dataset.layer === layer.id);
  });
  document.querySelectorAll(".svc-btn").forEach((el) => {
    el.classList.toggle("is-on", el.dataset.layer === layer.id);
  });

  window.dispatchEvent(new CustomEvent("skadia:layer", { detail: { id: layer.id, node: layer.node } }));
  if (sound) playTap();
  if (open) openSection(layer.id);
}

export function bindUi() {
  document.querySelectorAll(".panel[data-layer], .svc-btn[data-layer]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      paintLayer(el.dataset.layer, { open: true, sound: true });
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        paintLayer(el.dataset.layer, { open: true, sound: true });
      }
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
    if (e.key === "Escape") closeSection();
  });
  window.addEventListener("skadia:lang", () => {
    const sheet = document.querySelector("#sheet");
    const hot =
      document.querySelector(".panel.is-hot")?.dataset.layer ||
      document.querySelector(".svc-btn.is-on")?.dataset.layer;
    if (sheet && !sheet.hidden && hot) fillSheet(LAYERS().find((l) => l.id === hot) ?? LAYERS()[0]);
  });

  const fromHash = location.hash.replace("#", "");
  if (LAYERS().some((l) => l.id === fromHash)) {
    paintLayer(fromHash, { open: false });
  } else {
    paintLayer("ganaderia", { open: false });
  }
}

export { layerByNode };
