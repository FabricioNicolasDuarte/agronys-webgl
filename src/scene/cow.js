import * as THREE from "three";

const GREEN = 0x5cff88;

function add(group, geo, mat, x, y, z, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.rotation.set(rx, ry, rz);
  group.add(mesh);
  return mesh;
}

/** Vaca low-poly wireframe, misma paleta que la plántula. */
export function createCow() {
  const group = new THREE.Group();
  const wire = new THREE.MeshBasicMaterial({ color: GREEN, wireframe: true, transparent: true, opacity: 0.92 });
  const fill = new THREE.MeshBasicMaterial({
    color: GREEN,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  });

  const body = new THREE.BoxGeometry(1.15, 0.55, 0.55);
  add(group, body, wire, 0, 0.42, 0);
  add(group, body, fill, 0, 0.42, 0);

  const head = new THREE.BoxGeometry(0.38, 0.32, 0.32);
  add(group, head, wire, 0.68, 0.58, 0);
  add(group, head, fill, 0.68, 0.58, 0);

  const snout = new THREE.BoxGeometry(0.22, 0.16, 0.22);
  add(group, snout, wire, 0.9, 0.5, 0);

  const leg = new THREE.CylinderGeometry(0.06, 0.07, 0.42, 5);
  const legs = [
    [0.38, 0.12, 0.18],
    [0.38, 0.12, -0.18],
    [-0.38, 0.12, 0.18],
    [-0.38, 0.12, -0.18],
  ];
  legs.forEach(([x, y, z]) => {
    add(group, leg, wire, x, y, z);
  });

  const horn = new THREE.ConeGeometry(0.05, 0.16, 4);
  add(group, horn, wire, 0.62, 0.78, 0.12, 1, 1, 1, 0.3, 0, 0.4);
  add(group, horn, wire, 0.62, 0.78, -0.12, 1, 1, 1, 0.3, 0, -0.4);

  const ear = new THREE.BoxGeometry(0.12, 0.08, 0.04);
  add(group, ear, wire, 0.58, 0.68, 0.22, 1, 1, 1, 0, 0.4, 0.3);
  add(group, ear, wire, 0.58, 0.68, -0.22, 1, 1, 1, 0, -0.4, -0.3);

  group.rotation.y = -0.55;
  return group;
}
