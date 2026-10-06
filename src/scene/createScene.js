import * as THREE from "three";
import { createPlant } from "./plant.js";
import { createCow } from "./cow.js";
import { createConnectors } from "./connectors.js";
import { layerByNode } from "../content/agronys.js";
import { paintLayer } from "../ui/layers.js";

export function createScene(canvas) {
  const scene = new THREE.Scene();

  const look = new THREE.Vector3(-0.15, 0.35, 0);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  camera.position.set(0.4, 0.85, 5.4);
  camera.lookAt(look);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const { group: plant, nodeLocals, nodes } = createPlant();
  plant.position.set(0.85, -0.2, 0);
  plant.scale.setScalar(0.92);
  scene.add(plant);

  const cow = createCow();
  cow.position.set(-1.35, -0.55, 0.15);
  cow.scale.setScalar(0.95);
  scene.add(cow);

  const connectors = createConnectors(document.querySelector("#leads"));
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pointerNdc = { x: 0, y: 0 };
  let selectedNode = 1;
  let hoverNode = -1;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clock = new THREE.Clock();

  window.addEventListener("agronys:layer", (e) => {
    selectedNode = e.detail.node;
  });

  function resize() {
    const box = canvas.parentElement?.getBoundingClientRect() ?? { width: window.innerWidth, height: window.innerHeight };
    camera.aspect = box.width / Math.max(box.height, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(box.width, box.height, false);
  }

  function onPointerMove(e) {
    pointerNdc.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerNdc.y = -(e.clientY / window.innerHeight) * 2 + 1;
    pointer.set(pointerNdc.x, pointerNdc.y);
  }

  function pickNode() {
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(nodes)[0]?.object.userData.nodeIndex ?? -1;
  }

  function paintNodes() {
    nodes.forEach((mesh, i) => {
      const on = i === selectedNode || i === hoverNode;
      mesh.scale.setScalar(on ? 1.65 : 1);
      mesh.material.color.setHex(i === selectedNode ? 0x7dffb0 : 0xffffff);
    });
  }

  function onClick(e) {
    if (e.target.closest?.("#ui, #sheet, #site, #cookies")) return;
    const n = pickNode();
    const layer = layerByNode(n);
    if (layer) paintLayer(layer.id, { open: true });
  }

  function tick() {
    const t = clock.getElapsedTime();
    if (!reduced) {
      plant.rotation.y = Math.sin(t * 0.32) * 0.1;
      plant.position.y = -0.2 + Math.sin(t * 0.85) * 0.025;
      cow.position.y = -0.55 + Math.sin(t * 0.7 + 0.8) * 0.02;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.4 + pointerNdc.x * 0.28, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.85 + pointerNdc.y * 0.12, 0.05);
    }
    camera.lookAt(look);
    hoverNode = pickNode();
    paintNodes();
    connectors.update(plant, nodeLocals, camera);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("click", onClick);
  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(tick);

  return { scene, camera, renderer, plant, cow };
}
