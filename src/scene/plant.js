import * as THREE from "three";

const GREEN = 0x5cff88;

/** Plántula low-poly wireframe (hub del portal), no foto ni brócoli. */
export function createPlant() {
  const group = new THREE.Group();
  const wire = new THREE.MeshBasicMaterial({ color: GREEN, wireframe: true, transparent: true, opacity: 0.95 });
  const fill = new THREE.MeshBasicMaterial({
    color: GREEN,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
  });

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.055, 1.35, 6), wire);
  stem.position.y = 0.15;
  group.add(stem);

  function leaf(pos, rot, scale) {
    const geo = new THREE.ConeGeometry(0.42, 0.95, 4);
    const a = new THREE.Mesh(geo, wire);
    const b = new THREE.Mesh(geo, fill);
    a.position.set(...pos);
    b.position.set(...pos);
    a.rotation.set(...rot);
    b.rotation.set(...rot);
    a.scale.setScalar(scale);
    b.scale.setScalar(scale);
    group.add(a, b);
  }

  leaf([0.22, 0.55, 0.04], [0.2, 0.3, -1.15], 1);
  leaf([-0.2, 0.72, 0.02], [0.15, -0.25, 1.12], 0.92);
  leaf([0.06, 1.05, -0.04], [0.55, 0.1, -0.15], 0.72);

  const nodeLocals = [
    new THREE.Vector3(0, -0.52, 0),
    new THREE.Vector3(0.48, 0.42, 0.08),
    new THREE.Vector3(-0.46, 0.7, 0.06),
    new THREE.Vector3(0.28, 1.12, -0.06),
    new THREE.Vector3(0, 1.38, 0.04),
  ];

  const nodes = nodeLocals.map((local, index) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    mesh.position.copy(local);
    mesh.userData.nodeIndex = index;
    group.add(mesh);
    return mesh;
  });

  return { group, nodeLocals, nodes };
}
