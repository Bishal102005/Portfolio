import * as THREE from 'three';
import { LIBRARY_CONFIG } from '../constants/libraryRoomConfig';

export function createGallery(walnutMat: THREE.Material): THREE.Group {
  const gallery = new THREE.Group();
  gallery.name = 'library-second-level-gallery';

  const { room, gallery: galCfg, stairs: stairCfg } = LIBRARY_CONFIG;
  const galleryFloorY = room.floorY + galCfg.height; // -4.6 + 3.85 = -0.75
  const walkwayThick = 0.16;

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a559,
    roughness: 0.3,
    metalness: 0.85
  });

  // 1. Walkway Planks along Left and Right Walls
  const walkwayLength = room.length - 2.0; // 18m
  const walkwayZCenter = (walkwayLength / 2) - 4.0; // center along room length

  // Left Walkway
  const leftWalkway = new THREE.Mesh(
    new THREE.BoxGeometry(galCfg.walkwayWidth, walkwayThick, walkwayLength),
    walnutMat
  );
  leftWalkway.position.set(-room.width / 2 + galCfg.walkwayWidth / 2, galleryFloorY - walkwayThick / 2, walkwayZCenter);
  leftWalkway.receiveShadow = true;
  leftWalkway.castShadow = true;
  gallery.add(leftWalkway);

  // Right Walkway
  const rightWalkway = new THREE.Mesh(
    new THREE.BoxGeometry(galCfg.walkwayWidth, walkwayThick, walkwayLength),
    walnutMat
  );
  rightWalkway.position.set(room.width / 2 - galCfg.walkwayWidth / 2, galleryFloorY - walkwayThick / 2, walkwayZCenter);
  rightWalkway.receiveShadow = true;
  rightWalkway.castShadow = true;
  gallery.add(rightWalkway);

  // 2. Classical Turned Balustrade Railing along Inner Edge
  const railingHeight = galCfg.railingHeight;
  const balusterSpacing = 0.28;
  const balusterCount = Math.floor(walkwayLength / balusterSpacing);

  const sides = [
    { x: -room.width / 2 + galCfg.walkwayWidth, isLeft: true },
    { x: room.width / 2 - galCfg.walkwayWidth, isLeft: false }
  ];

  sides.forEach(({ x }) => {
    // Top Handrail
    const handrail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, walkwayLength, 12),
      walnutMat
    );
    handrail.rotation.x = Math.PI / 2;
    handrail.position.set(x, galleryFloorY + railingHeight, walkwayZCenter);
    gallery.add(handrail);

    // Bottom rail
    const bottomRail = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.05, walkwayLength),
      walnutMat
    );
    bottomRail.position.set(x, galleryFloorY + 0.04, walkwayZCenter);
    gallery.add(bottomRail);

    // Turned balusters
    const balusterGeo = new THREE.CylinderGeometry(0.022, 0.022, railingHeight - 0.08, 8);
    for (let i = 0; i < balusterCount; i += 2) {
      const z = -4.0 + i * balusterSpacing;
      if (z > walkwayLength - 4.5) break;

      const baluster = new THREE.Mesh(balusterGeo, brassMat);
      baluster.position.set(x, galleryFloorY + railingHeight / 2, z);
      gallery.add(baluster);
    }
  });

  // 3. Transverse Rear Gallery Walkway Spanning Across the Back Wall (Z = -8.5m)
  // Perfectly framing the background library interior matching sec_01.jpg
  const rearWalkwayZ = -8.5;
  const rearWalkway = new THREE.Mesh(
    new THREE.BoxGeometry(room.width, walkwayThick, galCfg.walkwayWidth),
    walnutMat
  );
  rearWalkway.position.set(0, galleryFloorY - walkwayThick / 2, rearWalkwayZ);
  rearWalkway.receiveShadow = true;
  gallery.add(rearWalkway);

  // Rear Gallery Handrail facing forward into the room (+Z edge)
  const rearHandrailZ = rearWalkwayZ + galCfg.walkwayWidth / 2;
  const rearHandrail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, room.width - 0.8, 12),
    walnutMat
  );
  rearHandrail.rotation.z = Math.PI / 2;
  rearHandrail.position.set(0, galleryFloorY + railingHeight, rearHandrailZ);
  gallery.add(rearHandrail);

  const rearBottomRail = new THREE.Mesh(
    new THREE.BoxGeometry(room.width - 0.8, 0.05, 0.08),
    walnutMat
  );
  rearBottomRail.position.set(0, galleryFloorY + 0.04, rearHandrailZ);
  gallery.add(rearBottomRail);

  // Balusters along rear gallery
  const balusterGeoRear = new THREE.CylinderGeometry(0.022, 0.022, railingHeight - 0.08, 8);
  for (let bx = -room.width / 2 + 0.8; bx <= room.width / 2 - 0.8; bx += 0.32) {
    const baluster = new THREE.Mesh(balusterGeoRear, brassMat);
    baluster.position.set(bx, galleryFloorY + railingHeight / 2, rearHandrailZ);
    gallery.add(baluster);
  }

  // Classical Cream Stone Arches Rising Above Rear Gallery (Z = -9.2m)
  const stoneArchMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfd2,
    roughness: 0.84,
    metalness: 0.02
  });

  const archPositionsX = [-3.8, 0, 3.8];
  archPositionsX.forEach((ax) => {
    // Left & Right Roman Arch Pillars
    [-1.2, 1.2].forEach((px) => {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.20, room.ceilingY - galleryFloorY, 14),
        stoneArchMat
      );
      pillar.position.set(ax + px, (galleryFloorY + room.ceilingY) / 2, -9.2);
      gallery.add(pillar);
    });

    // Semicircular Stone Arch Header
    const archHeader = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.16, 8, 20, Math.PI),
      stoneArchMat
    );
    archHeader.position.set(ax, room.ceilingY - 0.6, -9.2);
    gallery.add(archHeader);
  });

  // 4. Fluted Classical Support Columns Rising from Ground Floor
  const columnHeight = galCfg.height - walkwayThick;
  const columnGeo = new THREE.CylinderGeometry(0.14, 0.16, columnHeight, 16);
  const columnBaseGeo = new THREE.BoxGeometry(0.42, 0.18, 0.42);

  for (let i = 0; i < galCfg.columnCount; i++) {
    const cz = -2.5 + i * 3.4;
    const colY = room.floorY + columnHeight / 2;

    [-room.width / 2 + galCfg.walkwayWidth, room.width / 2 - galCfg.walkwayWidth].forEach((cx) => {
      const col = new THREE.Mesh(columnGeo, walnutMat);
      col.position.set(cx, colY, cz);
      col.castShadow = true;
      col.receiveShadow = true;
      gallery.add(col);

      // Base
      const cBase = new THREE.Mesh(columnBaseGeo, walnutMat);
      cBase.position.set(cx, room.floorY + 0.09, cz);
      gallery.add(cBase);

      // Capital
      const cCap = new THREE.Mesh(columnBaseGeo, walnutMat);
      cCap.position.set(cx, galleryFloorY - walkwayThick - 0.09, cz);
      gallery.add(cCap);
    });
  }

  // 4. Spiral Staircase in Corner
  const stairGroup = new THREE.Group();
  stairGroup.position.set(stairCfg.position.x, room.floorY, stairCfg.position.z);

  // Central pole
  const poleHeight = galCfg.height + railingHeight;
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, poleHeight, 16),
    brassMat
  );
  pole.position.y = poleHeight / 2;
  stairGroup.add(pole);

  // Spiral treads
  const treadAngle = (Math.PI * 1.8) / stairCfg.treads;
  const treadHeight = galCfg.height / stairCfg.treads;
  const treadWidth = stairCfg.radius;

  for (let t = 0; t < stairCfg.treads; t++) {
    const angle = t * treadAngle;
    const tread = new THREE.Mesh(
      new THREE.BoxGeometry(treadWidth, 0.045, 0.32),
      walnutMat
    );
    tread.position.set(
      Math.cos(angle) * (treadWidth / 2),
      t * treadHeight + 0.02,
      Math.sin(angle) * (treadWidth / 2)
    );
    tread.rotation.y = -angle;
    tread.castShadow = true;
    stairGroup.add(tread);

    // Outer baluster on each tread
    const outerBaluster = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.016, 0.85, 6),
      brassMat
    );
    outerBaluster.position.set(
      Math.cos(angle) * (treadWidth - 0.05),
      t * treadHeight + 0.45,
      Math.sin(angle) * (treadWidth - 0.05)
    );
    stairGroup.add(outerBaluster);
  }

  gallery.add(stairGroup);

  return gallery;
}
