import * as THREE from 'three';
import { SHELF_CONFIG } from '../constants/shelfConfig';

export interface PropsResult {
  group: THREE.Group;
  candleLights: THREE.PointLight[];
}

export function createShelfProps(rowPlankY: number[], bayXCenters: number[]): PropsResult {
  const group = new THREE.Group();
  group.name = 'shelf-props-collection';

  const { shelfZ, depth } = SHELF_CONFIG;
  const frontZ = shelfZ + depth / 2 - 0.28;

  // Materials
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a559,
    roughness: 0.28,
    metalness: 0.88
  });

  const waxMat = new THREE.MeshStandardMaterial({
    color: 0xfff8ee,
    roughness: 0.82,
    metalness: 0.02
  });

  const flameMat = new THREE.MeshBasicMaterial({
    color: 0xffaa33
  });

  const parchmentMat = new THREE.MeshStandardMaterial({
    color: 0xdfd3b5,
    roughness: 0.88,
    metalness: 0.02
  });

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0x243228,
    roughness: 0.35,
    metalness: 0.15
  });

  const foliageMat = new THREE.MeshStandardMaterial({
    color: 0x1f4422,
    roughness: 0.65,
    metalness: 0.04,
    side: THREE.DoubleSide
  });

  const candleLights: THREE.PointLight[] = [];

  // =========================================================================
  // 1. Classical Brass Celestial Armillary Globe (Row 3, Left Bay)
  // =========================================================================
  {
    const globeGroup = new THREE.Group();
    const globeY = rowPlankY[3] + SHELF_CONFIG.plankThickness / 2;
    const globeX = bayXCenters[0] + 0.15;
    globeGroup.position.set(globeX, globeY, frontZ - 0.05);

    // Turned wooden / brass base
    const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.08, 20), brassMat);
    baseMesh.position.y = 0.04;
    globeGroup.add(baseMesh);

    // Turned pedestal shaft
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.065, 0.32, 16), brassMat);
    shaft.position.y = 0.22;
    globeGroup.add(shaft);

    // Meridian gimbal ring
    const meridianRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.024, 12, 32), brassMat);
    meridianRing.position.y = 0.56;
    meridianRing.rotation.y = Math.PI / 4;
    globeGroup.add(meridianRing);

    // Celestial Sphere with axial tilt (23.5 degrees)
    const sphereGroup = new THREE.Group();
    sphereGroup.position.y = 0.56;
    sphereGroup.rotation.z = -0.41; // 23.5 deg

    const sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 20, 16),
      new THREE.MeshStandardMaterial({
        color: 0x3d4b44,
        roughness: 0.45,
        metalness: 0.35
      })
    );
    sphereGroup.add(sphereMesh);

    // Equator brass band
    const equatorRing = new THREE.Mesh(new THREE.TorusGeometry(0.325, 0.016, 8, 28), brassMat);
    equatorRing.rotation.x = Math.PI / 2;
    sphereGroup.add(equatorRing);

    globeGroup.add(sphereGroup);
    group.add(globeGroup);
  }

  // =========================================================================
  // 2. Flickering Wax Pillar Candle #1 (Row 2, Right Bay)
  // =========================================================================
  {
    const candleGroup = new THREE.Group();
    const candleY = rowPlankY[2] + SHELF_CONFIG.plankThickness / 2;
    const candleX = bayXCenters[2] + 0.72;
    candleGroup.position.set(candleX, candleY, frontZ + 0.04);

    // Brass candlestick dish
    const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.04, 20), brassMat);
    dish.position.y = 0.02;
    candleGroup.add(dish);

    // Wax candle cylinder
    const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.052, 0.28, 16), waxMat);
    wax.position.y = 0.18;
    candleGroup.add(wax);

    // Black wick
    const wick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.035, 6),
      new THREE.MeshBasicMaterial({ color: 0x111111 })
    );
    wick.position.y = 0.335;
    candleGroup.add(wick);

    // Flame mesh
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.075, 10), flameMat);
    flame.position.y = 0.375;
    flame.name = 'candle-flame-1';
    candleGroup.add(flame);

    // Warm flickering point light
    const candleLight = new THREE.PointLight(0xffb248, 0.95, 4.2);
    candleLight.position.y = 0.42;
    candleLight.name = 'candle-light-1';
    candleGroup.add(candleLight);
    candleLights.push(candleLight);

    group.add(candleGroup);
  }

  // =========================================================================
  // 3. Flickering Wax Taper Candle #2 (Row 3, Left Bay)
  // =========================================================================
  {
    const candleGroup2 = new THREE.Group();
    const candle2Y = rowPlankY[3] + SHELF_CONFIG.plankThickness / 2;
    const candle2X = bayXCenters[0] - 0.78;
    candleGroup2.position.set(candle2X, candle2Y, frontZ);

    const holder = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.15, 0.16, 16), brassMat);
    holder.position.y = 0.08;
    candleGroup2.add(holder);

    const taperWax = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.038, 0.38, 14), waxMat);
    taperWax.position.y = 0.35;
    candleGroup2.add(taperWax);

    const flame2 = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.065, 8), flameMat);
    flame2.position.y = 0.57;
    flame2.name = 'candle-flame-2';
    candleGroup2.add(flame2);

    const candleLight2 = new THREE.PointLight(0xff9e36, 0.85, 3.8);
    candleLight2.position.y = 0.60;
    candleLight2.name = 'candle-light-2';
    candleGroup2.add(candleLight2);
    candleLights.push(candleLight2);

    group.add(candleGroup2);
  }

  // =========================================================================
  // 4. Stack of Flat Horizontal Books (Row 1, Center Bay)
  // =========================================================================
  {
    const stackGroup = new THREE.Group();
    const stackY = rowPlankY[1] + SHELF_CONFIG.plankThickness / 2;
    const stackX = bayXCenters[1] - 1.15;
    stackGroup.position.set(stackX, stackY, frontZ - 0.05);

    const bookColors = [0x421018, 0x0f1c2d, 0x2c170c, 0x143822];
    const dims = [
      { w: 0.95, h: 0.14, d: 1.12, rot: 0.02 },
      { w: 0.90, h: 0.12, d: 1.05, rot: -0.06 },
      { w: 0.85, h: 0.13, d: 0.98, rot: 0.08 },
      { w: 0.80, h: 0.11, d: 0.92, rot: -0.03 }
    ];

    let currentH = 0;
    dims.forEach((dm, i) => {
      const bMat = new THREE.MeshStandardMaterial({
        color: bookColors[i % bookColors.length],
        roughness: 0.52,
        metalness: 0.08
      });
      const bookMesh = new THREE.Mesh(new THREE.BoxGeometry(dm.w, dm.h, dm.d), bMat);
      bookMesh.position.y = currentH + dm.h / 2;
      bookMesh.rotation.y = dm.rot;
      bookMesh.castShadow = true;
      bookMesh.receiveShadow = true;
      stackGroup.add(bookMesh);
      currentH += dm.h;
    });

    group.add(stackGroup);
  }

  // =========================================================================
  // 5. Small Glazed Urn with Trailing Ivy Foliage (Row 3, Right Bay)
  // =========================================================================
  {
    const plantGroup = new THREE.Group();
    const plantY = rowPlankY[3] + SHELF_CONFIG.plankThickness / 2;
    const plantX = bayXCenters[2] + 0.92;
    plantGroup.position.set(plantX, plantY, frontZ);

    // Ceramic planter
    const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.28, 16), ceramicMat);
    planter.position.y = 0.14;
    planter.castShadow = true;
    plantGroup.add(planter);

    // Dark soil
    const soil = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 0.02, 16),
      new THREE.MeshStandardMaterial({ color: 0x150b05, roughness: 0.98 })
    );
    soil.position.y = 0.27;
    plantGroup.add(soil);

    // Trailing ivy leaves cascading downward over shelf edge
    const leafGeo = new THREE.PlaneGeometry(0.085, 0.12);
    for (let i = 0; i < 18; i++) {
      const leaf = new THREE.Mesh(leafGeo, foliageMat);
      const angle = (i / 18) * Math.PI * 2;
      const r = 0.12 + Math.random() * 0.10;
      const lx = Math.cos(angle) * r;
      const lz = Math.sin(angle) * r;
      const ly = 0.28 - (Math.sin(angle) > 0 ? (i % 5) * 0.07 : -Math.random() * 0.06);

      leaf.position.set(lx, ly, lz);
      leaf.rotation.set(Math.random() * 0.8, angle, Math.random() * 0.5);
      plantGroup.add(leaf);
    }

    group.add(plantGroup);
  }

  // =========================================================================
  // 6. Rolled Ancient Parchment Scrolls (Row 2, Left Bay)
  // =========================================================================
  {
    const scrollGroup = new THREE.Group();
    const scrollY = rowPlankY[2] + SHELF_CONFIG.plankThickness / 2;
    const scrollX = bayXCenters[0] - 0.25;
    scrollGroup.position.set(scrollX, scrollY, frontZ);

    for (let i = 0; i < 2; i++) {
      const scrollMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.55, 16), parchmentMat);
      scrollMesh.rotation.z = Math.PI / 2;
      scrollMesh.rotation.y = (i === 0 ? 0.15 : -0.12);
      scrollMesh.position.set((i - 0.5) * 0.12, 0.05 + i * 0.08, (i - 0.5) * 0.08);

      // Ribbon tie around scroll center
      const tie = new THREE.Mesh(
        new THREE.CylinderGeometry(0.053, 0.053, 0.035, 16),
        new THREE.MeshStandardMaterial({ color: 0x421018, roughness: 0.6 })
      );
      tie.rotation.z = Math.PI / 2;
      scrollMesh.add(tie);

      scrollGroup.add(scrollMesh);
    }

    group.add(scrollGroup);
  }

  return {
    group,
    candleLights
  };
}
