import * as THREE from "three";

/** Curvas tipo HUD: nodo 3D → orbe de tarjeta. */
export function createConnectors(svg) {
  const orbs = [
    ...document.querySelectorAll(".orb[data-node]"),
    document.querySelector('.dock-btn[data-layer="orquestacion"]'),
  ].filter(Boolean);
  const ns = "http://www.w3.org/2000/svg";

  const paths = orbs.map((orb) => {
    const path = document.createElementNS(ns, "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "rgba(255,255,255,0.55)");
    path.setAttribute("stroke-width", "1.2");
    svg.appendChild(path);
    return { path, orb, nodeIndex: Number(orb.dataset.node) };
  });

  const world = new THREE.Vector3();
  const ndc = new THREE.Vector3();

  function update(plantGroup, nodeLocals, camera) {
    const canvas = document.querySelector("#webgl");
    const cr = canvas?.getBoundingClientRect();
    const w = cr?.width ?? window.innerWidth;
    const h = cr?.height ?? window.innerHeight;
    const left = cr?.left ?? 0;
    const top = cr?.top ?? 0;

    paths.forEach(({ path, orb, nodeIndex }) => {
      const local = nodeLocals[nodeIndex];
      if (!local) return;

      world.copy(local);
      plantGroup.localToWorld(world);
      ndc.copy(world).project(camera);

      const x1 = left + (ndc.x * 0.5 + 0.5) * w;
      const y1 = top + (-ndc.y * 0.5 + 0.5) * h;
      const rect = orb.getBoundingClientRect();
      const x2 = rect.left + rect.width / 2;
      const y2 = rect.top + rect.height / 2;
      const cx = (x1 + x2) / 2;
      const cy = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.18;

      path.setAttribute("d", `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
    });
  }

  return { update };
}
