import { layerByNode } from "../content/skadia.js";
import { paintLayer } from "../ui/layers.js";
import { playTap } from "../ui/sound.js";

const NS = "http://www.w3.org/2000/svg";
const GOLD = /#ffc000/i;
const HUB_RING = /M0 39C/i;

function attrBlob(el) {
  return `${el.getAttribute("fill") || ""} ${el.getAttribute("stroke") || ""} ${el.getAttribute("style") || ""}`;
}

function isHubDot(el) {
  const d = el.getAttribute("d") || "";
  if (HUB_RING.test(d)) return true;
  const blob = attrBlob(el);
  if (GOLD.test(blob)) return true;
  return false;
}

function hubDots(root) {
  return [...root.querySelectorAll("path, circle, ellipse")].filter(isHubDot);
}

function goldAnchor(el) {
  const b = el.getBBox();
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  const tr = el.getAttribute("transform") || "";
  const matrix = /matrix\(\s*([^)]+)\)/i.exec(tr);
  if (matrix) {
    const p = matrix[1].trim().split(/[\s,]+/).map(Number);
    if (p.length >= 6) {
      return {
        el,
        x: p[0] * cx + p[2] * cy + p[4],
        y: p[1] * cx + p[3] * cy + p[5],
      };
    }
  }
  const r = el.getBoundingClientRect();
  if (r.width || r.height) {
    return { el, x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  return { el, x: cx, y: cy };
}

function markCowNodes(root) {
  const dots = hubDots(root);
  if (dots.length < 3) return;
  const ranked = dots.map(goldAnchor);
  const hoof = ranked.reduce((a, b) => (a.y > b.y ? a : b));
  const rest = ranked.filter((d) => d !== hoof);
  const head = rest.reduce((a, b) => (a.x > b.x ? a : b));
  const body = rest.find((d) => d !== head);
  body.el.setAttribute("data-node", "1");
  head.el.setAttribute("data-node", "2");
  hoof.el.setAttribute("data-node", "4");
  ranked.forEach(({ el }) => el.classList.add("hub-node"));
}

function markMaizNodes(root) {
  const dots = hubDots(root);
  if (dots.length < 2) return;
  const ranked = dots.map(goldAnchor);
  const base = ranked.reduce((a, b) => (a.y > b.y ? a : b));
  const top = ranked.reduce((a, b) => (a.y < b.y ? a : b));
  ranked.forEach(({ el }) => el.classList.add("hub-node"));
  if (ranked.length >= 3) {
    const mid = ranked.find((d) => d !== base && d !== top);
    base.el.setAttribute("data-node", "0");
    mid.el.setAttribute("data-node", "3");
    top.el.setAttribute("data-node", "5");
  } else {
    const leaf = ranked.find((d) => d !== base);
    leaf.el.setAttribute("data-node", "3");
    base.el.setAttribute("data-node", "0");
  }
}

async function inlineArt(groupId, url, box, kind) {
  const host = document.getElementById(groupId);
  if (!host) return;
  const res = await fetch(url);
  if (!res.ok) return;
  const doc = new DOMParser().parseFromString(await res.text(), "image/svg+xml");
  if (doc.querySelector("parsererror")) return;
  const root = doc.documentElement;
  const vb =
    root.getAttribute("viewBox") ||
    `0 0 ${parseFloat(root.getAttribute("width")) || 400} ${parseFloat(root.getAttribute("height")) || 400}`;

  const nested = document.createElementNS(NS, "svg");
  nested.setAttribute("x", String(box.x));
  nested.setAttribute("y", String(box.y));
  nested.setAttribute("width", String(box.w));
  nested.setAttribute("height", String(box.h));
  nested.setAttribute("viewBox", vb);
  nested.setAttribute("preserveAspectRatio", "xMidYMax meet");
  nested.setAttribute("overflow", "visible");

  [...root.childNodes].forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      nested.appendChild(document.importNode(node, true));
    }
  });
  host.appendChild(nested);
  if (kind === "cow") markCowNodes(nested);
  if (kind === "maiz") markMaizNodes(nested);
}

function polyPoints(a, b, drift) {
  const dir = b.x >= a.x ? 1 : -1;
  const first = { x: a.x + dir * 22, y: a.y + drift * 0.15 };
  const elbow = {
    x: a.x + (b.x - a.x) * 0.52 + drift,
    y: a.y + (b.y - a.y) * 0.18 + drift * 0.35,
  };
  const last = { x: b.x - dir * 16, y: b.y + drift * 0.12 };
  return [a, first, elbow, last, b];
}

function toPath(pts) {
  return pts.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}

export function createConnectors(svg) {
  const orbs = [...document.querySelectorAll(".orb[data-node]")].filter(Boolean);

  const groups = orbs.map((orb) => {
    const right = Boolean(orb.closest(".col-right"));
    const stroke = right ? "rgba(109,255,154,0.22)" : "rgba(73,236,253,0.22)";
    const joint = right ? "rgba(109,255,154,0.28)" : "rgba(73,236,253,0.28)";
    const path = document.createElementNS(NS, "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", stroke);
    path.setAttribute("stroke-width", "1.05");
    path.setAttribute("stroke-linejoin", "miter");
    path.setAttribute("stroke-linecap", "butt");
    path.setAttribute("stroke-miterlimit", "8");
    svg.appendChild(path);
    const joints = [0, 1, 2].map(() => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "1.6");
      c.setAttribute("fill", joint);
      svg.appendChild(c);
      return c;
    });
    return { path, joints, orb, nodeIndex: String(orb.dataset.node) };
  });

  function center(el) {
    const r = el.getBoundingClientRect();
    const s = svg.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - s.left,
      y: r.top + r.height / 2 - s.top,
    };
  }

  function update() {
    groups.forEach(({ path, joints, orb, nodeIndex }) => {
      const hot = document.querySelector(`.hub-node[data-node="${nodeIndex}"]`);
      if (!hot) return;
      const a = center(hot);
      const b = center(orb);
      const pts = polyPoints(a, b, 0);
      path.setAttribute("d", toPath(pts));
      [pts[1], pts[2], pts[3]].forEach((p, j) => {
        joints[j].setAttribute("cx", p.x.toFixed(1));
        joints[j].setAttribute("cy", p.y.toFixed(1));
      });
    });
  }

  return { update };
}

export async function bindHub() {
  const svg = document.querySelector("#leads");
  await Promise.all([
    inlineArt("art-vaca", "./art/vaca.svg", { x: 95, y: 370, w: 560, h: 390 }, "cow"),
    inlineArt("art-maiz", "./art/maiz.svg", { x: 470, y: 4, w: 520, h: 756 }, "maiz"),
  ]);
  if (!svg) return;
  const connectors = createConnectors(svg);
  document.querySelectorAll(".hub-node").forEach((el) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const layer = layerByNode(Number(el.dataset.node));
      if (layer) paintLayer(layer.id, { open: true, sound: true });
    });
  });
  function tick() {
    connectors.update();
    requestAnimationFrame(tick);
  }
  window.addEventListener("resize", connectors.update);
  requestAnimationFrame(tick);
}
