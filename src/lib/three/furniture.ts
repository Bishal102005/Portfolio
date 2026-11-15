import * as THREE from 'three';
import { LIBRARY_CONFIG } from '../constants/libraryRoomConfig';

export interface FurnitureResult {
  group: THREE.Group;
  bankerLights: THREE.PointLight[];
}

export function createLibraryFurniture(walnutMat: THREE.Material): FurnitureResult {
  const group = new THREE.Group();
  group.name = 'library-furniture-collection';

  const { ladder: ladCfg, furniture: furnCfg, room } = LIBRARY_CONFIG;

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a559,
    roughness: 0.28,
    metalness: 0.88
  });

  const emeraldMat = new THREE.MeshStandardMaterial({
    color: 0x0c6837,
    emissive: 0x084223,
    emissiveIntensity: 0.6,
    roughness: 0.22,
    metalness: 0.15
  });

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x3a140d, // Rich antique oxblood/cognac leather
    roughness: 0.62,
    metalness: 0.08
  });

  const bankerLights: THREE.PointLight[] = [];

  // =========================================================================
  // 1. Rolling Library Ladder on Brass Rail
  // =========================================================================
  {
    const ladderGroup = new THREE.Group();
    const railZStart = -3.5;
    const railZLength = 12.0;

    // Brass Rail along right shelves
    const rail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.024, railZLength, 12),
      brassMat
    );
    rail.rotation.x = Math.PI / 2;
    rail.position.set(ladCfg.railX, ladCfg.railY, railZStart + railZLength / 2);
    ladderGroup.add(rail);

    // Support standoffs holding rail to the shelf
    for (let rz = railZStart; rz <= railZStart + railZLength; rz += 2.4) {
      const standoff = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.25, 8),
        brassMat
      );
      standoff.rotation.z = Math.PI / 2;
      standoff.position.set(ladCfg.railX + 0.12, ladCfg.railY, rz);
      ladderGroup.add(standoff);
    }

    // Timber Ladder
    const ladderX = ladCfg.railX;
    const ladderZ = 1.8;
    const ladderLength = (ladCfg.railY - room.floorY) / Math.cos(ladCfg.ladderAngle) + 0.35;
    const ladderWidth = 0.48;

    const singleLadder = new THREE.Group();
    singleLadder.position.set(ladderX, room.floorY, ladderZ);
    singleLadder.rotation.z = ladCfg.ladderAngle;

    // Side Rails
    const sideRailGeo = new THREE.BoxGeometry(0.065, ladderLength, 0.09);
    [-ladderWidth / 2, ladderWidth / 2].forEach((sx) => {
      const sRail = new THREE.Mesh(sideRailGeo, walnutMat);
      sRail.position.set(sx, ladderLength / 2, 0);
      sRail.castShadow = true;
      singleLadder.add(sRail);

      // Bottom Caster Wheels
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12), brassMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(sx, 0.04, 0);
      singleLadder.add(wheel);

      // Top Brass Hook grasping rail
      const hook = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.015, 8, 16, Math.PI * 1.2), brassMat);
      hook.position.set(sx, ladderLength - 0.1, 0.04);
      hook.rotation.y = Math.PI / 2;
      singleLadder.add(hook);
    });

    // Rungs
    const rungGeo = new THREE.CylinderGeometry(0.018, 0.018, ladderWidth, 10);
    const rungCount = Math.floor(ladderLength / 0.32);
    for (let i = 1; i < rungCount; i++) {
      const rung = new THREE.Mesh(rungGeo, walnutMat);
      rung.rotation.z = Math.PI / 2;
      rung.position.set(0, i * 0.32, 0);
      singleLadder.add(rung);
    }

    ladderGroup.add(singleLadder);
    group.add(ladderGroup);
  }

  // =========================================================================
  // 2. Heavy Oak Reading Tables with Banker's Lamps
  // =========================================================================
  furnCfg.tables.forEach((tPos, tIdx) => {
    const tableGroup = new THREE.Group();
    tableGroup.position.set(tPos.x, tPos.y, tPos.z);

    const tableW = 2.4;
    const tableH = 0.78;
    const tableD = 1.15;
    const topThick = 0.09;

    // Tabletop
    const tabletop = new THREE.Mesh(
      new THREE.BoxGeometry(tableW, topThick, tableD),
      walnutMat
    );
    tabletop.position.y = tableH - topThick / 2;
    tabletop.castShadow = true;
    tabletop.receiveShadow = true;
    tableGroup.add(tabletop);

    // Turned Legs
    const legGeo = new THREE.CylinderGeometry(0.055, 0.045, tableH - topThick, 12);
    [
      [-tableW / 2 + 0.14, -tableD / 2 + 0.14],
      [tableW / 2 - 0.14, -tableD / 2 + 0.14],
      [-tableW / 2 + 0.14, tableD / 2 - 0.14],
      [tableW / 2 - 0.14, tableD / 2 - 0.14]
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, walnutMat);
      leg.position.set(lx, (tableH - topThick) / 2, lz);
      leg.castShadow = true;
      tableGroup.add(leg);
    });

    // Green Glass Banker's Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(0, tableH, 0);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.03, 14), brassMat);
    lampGroup.add(lampBase);

    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.35, 10), brassMat);
    lampStem.position.y = 0.18;
    lampGroup.add(lampStem);

    const lampShade = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.10, 0.14), emeraldMat);
    lampShade.position.set(0, 0.35, 0);
    lampGroup.add(lampShade);

    // Warm amber pool of reading light
    const lampLight = new THREE.PointLight(0xffbe55, 1.4, 5.0);
    lampLight.position.set(0, 0.28, 0.06);
    lampLight.name = `banker-lamp-${tIdx + 1}`;
    lampGroup.add(lampLight);
    bankerLights.push(lampLight);

    tableGroup.add(lampGroup);

    // Open book on table
    const bookCover = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.02, 0.34),
      new THREE.MeshStandardMaterial({ color: 0x421018, roughness: 0.6 })
    );
    bookCover.position.set(0.55, tableH + 0.01, 0.15);
    bookCover.rotation.y = 0.15;
    tableGroup.add(bookCover);

    const bookPages = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.03, 0.32),
      new THREE.MeshStandardMaterial({ color: 0xfff9f5, roughness: 0.9 })
    );
    bookPages.position.set(0.55, tableH + 0.025, 0.15);
    bookPages.rotation.y = 0.15;
    tableGroup.add(bookPages);

    group.add(tableGroup);
  });

  // =========================================================================
  // 3. Chesterfield Leather Armchairs
  // =========================================================================
  furnCfg.armchairs.forEach((aPos) => {
    const chairGroup = new THREE.Group();
    chairGroup.position.set(aPos.x, aPos.y, aPos.z);
    chairGroup.rotation.y = aPos.rotY;

    // Seat cushion
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.22, 0.85), leatherMat);
    seat.position.y = 0.44;
    seat.castShadow = true;
    chairGroup.add(seat);

    // Backrest
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.72, 0.22), leatherMat);
    back.position.set(0, 0.82, -0.34);
    back.castShadow = true;
    chairGroup.add(back);

    // Armrests
    [-0.42, 0.42].forEach((ax) => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.36, 0.85), leatherMat);
      arm.position.set(ax, 0.62, 0);
      arm.castShadow = true;
      chairGroup.add(arm);
    });

    // Turned wooden feet
    const footGeo = new THREE.CylinderGeometry(0.04, 0.025, 0.15, 8);
    [
      [-0.34, -0.34],
      [0.34, -0.34],
      [-0.34, 0.34],
      [0.34, 0.34]
    ].forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(footGeo, walnutMat);
      foot.position.set(fx, 0.075, fz);
      chairGroup.add(foot);
    });

    group.add(chairGroup);
  });

  return { group, bankerLights };
}
