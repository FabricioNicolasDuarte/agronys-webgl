import { layerByNode } from "../content/skadia.js";
import { openHubDetail } from "../ui/layers.js";

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

function toPath(pts) {
  return pts.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}

function vhToEdge(from, to, side, clear) {
  const endX = side === "right" ? to.x - clear : to.x + clear;
  return [from, { x: from.x, y: to.y }, { x: endX, y: to.y }];
}

function applyDash(path, reveal) {
  let len = 0;
  try {
    len = path.getTotalLength();
  } catch {
    return;
  }
  if (!len) {
    path.style.strokeDasharray = "";
    path.style.strokeDashoffset = "";
    return;
  }
  path.style.strokeDasharray = `${len}`;
  path.style.strokeDashoffset = `${((1 - reveal) * len).toFixed(2)}`;
}

function makeLead(svg, right) {
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
  const joints = [0, 1].map(() => {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("r", "1.6");
    c.setAttribute("fill", joint);
    svg.appendChild(c);
    return c;
  });
  return { path, joints, right };
}

function styleLead(group, item) {
  const right = Boolean(item.right);
  const rgb = right ? "109,255,154" : "73,236,253";
  const reveal = item.reveal == null ? 1 : item.reveal;
  group.right = right;
  group.path.style.filter = "none";
  if (item.kind === "cascade") {
    const a = 0.12 + 0.38 * reveal;
    group.path.setAttribute("stroke", `rgba(${rgb},${a.toFixed(2)})`);
    group.path.setAttribute("stroke-width", "1.2");
    group.path.setAttribute("stroke-linecap", "round");
    applyDash(group.path, reveal);
    group.joints.forEach((c) => {
      c.style.display = "none";
    });
    return;
  }
  group.path.style.strokeDasharray = "";
  group.path.style.strokeDashoffset = "";
  group.path.setAttribute("stroke-linecap", "butt");
  group.path.setAttribute("stroke", `rgba(${rgb},0.22)`);
  group.path.setAttribute("stroke-width", "1.05");
  group.joints.forEach((c) => {
    c.setAttribute("r", "1.6");
    c.setAttribute("fill", `rgba(${rgb},0.28)`);
  });
}

function orbClear(el) {
  const r = el.getBoundingClientRect();
  return Math.max(r.width, r.height) / 2 + 8;
}

export function createConnectors(svg) {
  const pool = [];

  function center(el) {
    const r = el.getBoundingClientRect();
    const s = svg.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - s.left,
      y: r.top + r.height / 2 - s.top,
    };
  }

  function hubRoutes() {
    const left = [];
    const right = [];
    document.querySelectorAll(".orb[data-node]").forEach((orb) => {
      const nodeIndex = String(orb.dataset.node);
      const from = document.querySelector(`.hub-node[data-node="${nodeIndex}"]`);
      if (!from) return;
      const side = orb.closest(".col-right") ? "right" : "left";
      const item = { from, to: orb, right: side === "right" };
      (side === "right" ? right : left).push(item);
    });
    left.sort((a, b) => center(a.to).y - center(b.to).y);
    right.sort((a, b) => center(a.to).y - center(b.to).y);
    left.forEach((it) => {
      it.pts = vhToEdge(center(it.from), center(it.to), "left", orbClear(it.to));
    });
    right.forEach((it) => {
      it.pts = vhToEdge(center(it.from), center(it.to), "right", orbClear(it.to));
    });
    return [...left, ...right];
  }

  function sideDock(el, side) {
    const r = el.getBoundingClientRect();
    const s = svg.getBoundingClientRect();
    return {
      x: (side === "left" ? r.left : r.right) - s.left,
      y: r.top + r.height / 2 - s.top,
    };
  }

  function leaveOrb(orb, toward) {
    const o = center(orb);
    const r = orb.getBoundingClientRect();
    const rad = Math.max(r.width, r.height) / 2 + 8;
    const dx = toward.x - o.x;
    const dy = toward.y - o.y;
    const d = Math.hypot(dx, dy) || 1;
    return { x: o.x + (dx / d) * rad, y: o.y + (dy / d) * rad };
  }

  function cascadeReveal(i, n, host) {
    const now = performance.now();
    const step = 95;
    const ms = 420;
    if (host?.dataset.fold === "1") {
      const t0 = Number(host.dataset.foldAt || now);
      const delay = (n - 1 - i) * step;
      return 1 - Math.max(0, Math.min(1, (now - t0 - delay) / ms));
    }
    const t0 = Number(host?.dataset.unroll || 0);
    if (!t0) return 0;
    const delay = i * step;
    return Math.max(0, Math.min(1, (now - t0 - delay) / ms));
  }

  function cascadeRoutes() {
    const origin = document.querySelector(".panel.is-hot .orb");
    const host = document.querySelector("#cascade");
    const cards = [...document.querySelectorAll("#cascade .cascade-card")];
    if (!origin || !cards.length) return [];
    const right = Boolean(origin.closest(".col-right"));
    const n = cards.length;
    return cards.map((card, i) => {
      const end = sideDock(card, i === 0 ? (right ? "right" : "left") : "left");
      const start =
        i === 0 ? leaveOrb(origin, end) : sideDock(cards[i - 1], "right");
      const pts =
        Math.abs(start.y - end.y) < 2 ? [start, end] : [start, { x: start.x, y: end.y }, end];
      return {
        pts,
        right,
        kind: "cascade",
        reveal: cascadeReveal(i, n, host),
      };
    });
  }

  function update() {
    const items = [...hubRoutes(), ...cascadeRoutes()];
    while (pool.length < items.length) pool.push(makeLead(svg, items[pool.length]?.right || false));
    pool.forEach((group, i) => {
      const item = items[i];
      const on = Boolean(item) && (item.reveal == null || item.reveal > 0.02);
      group.path.style.display = on ? "" : "none";
      group.joints.forEach((c) => {
        c.style.display = on ? "" : "none";
      });
      if (!on) return;
      group.path.setAttribute("d", toPath(item.pts));
      styleLead(group, item);
      const elbows = item.pts.slice(1, -1);
      group.joints.forEach((c, j) => {
        const p = elbows[j];
        if (!p || item.kind === "cascade") return;
        c.setAttribute("cx", p.x.toFixed(1));
        c.setAttribute("cy", p.y.toFixed(1));
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
      if (layer) openHubDetail(layer.id, { sound: true });
    });
  });
  function tick() {
    connectors.update();
    requestAnimationFrame(tick);
  }
  window.addEventListener("resize", connectors.update);
  requestAnimationFrame(tick);
}
