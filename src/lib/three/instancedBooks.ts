import * as THREE from 'three';
import { SHELF_CONFIG, createSeededRandom } from '../constants/shelfConfig';
import { LIBRARY_CONFIG } from '../constants/libraryRoomConfig';

export interface BookInstanceData {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  color: THREE.Color;
}

export function createInstancedBooks(
  rowPlankY: number[],
  bayXCenters: number[],
  bayWidth: number,
  isMobile: boolean = false
): {
  group: THREE.Group;
  totalBooks: number;
} {
  const group = new THREE.Group();
  group.name = 'instanced-bookshelf-library';

  const rng = createSeededRandom(SHELF_CONFIG.seed);
  const { rows, columns, depth, shelfZ, featuredBook, leatherPalette } = SHELF_CONFIG;
  const { room, gallery: galCfg } = LIBRARY_CONFIG;

  const palettePool: number[] = [
    ...leatherPalette.burgundy,
    ...leatherPalette.burgundy,
    ...leatherPalette.forestGreen,
    ...leatherPalette.forestGreen,
    ...leatherPalette.navy,
    ...leatherPalette.navy,
    ...leatherPalette.brown,
    ...leatherPalette.brown,
    ...leatherPalette.brown,
    ...leatherPalette.vellum
  ];

  const leatherMat = new THREE.MeshStandardMaterial({
    roughness: 0.55,
    metalness: 0.08
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: leatherPalette.goldFoil,
    roughness: 0.32,
    metalness: 0.88
  });

  const booksData: BookInstanceData[] = [];
  const goldBandsData: { position: THREE.Vector3; rotation: THREE.Euler; scale: THREE.Vector3 }[] = [];
  const baseUnitBox = new THREE.BoxGeometry(1, 1, 1);

  // Helper to add a book
  const addBook = (
    pos: THREE.Vector3,
    rot: THREE.Euler,
    scale: THREE.Vector3,
    colorHex: number,
    facingAxis: 'z' | 'x'
  ) => {
    const color = new THREE.Color(colorHex);
    booksData.push({ position: pos, rotation: rot, scale, color });

    // Add gold embossed bands on spine
    const bandH = 0.018 + rng() * 0.012;
    if (facingAxis === 'z') {
      const spineFaceZ = pos.z + scale.z / 2 + 0.002;
      goldBandsData.push({
        position: new THREE.Vector3(pos.x, pos.y + scale.y * 0.28, spineFaceZ),
        rotation: rot,
        scale: new THREE.Vector3(scale.x * 1.002, bandH, 0.006)
      });
      goldBandsData.push({
        position: new THREE.Vector3(pos.x, pos.y - scale.y * 0.30, spineFaceZ),
        rotation: rot,
        scale: new THREE.Vector3(scale.x * 1.002, bandH, 0.006)
      });
    } else {
      // Facing along X axis (for side wall shelves)
      const signX = pos.x > 0 ? -1 : 1;
      const spineFaceX = pos.x + (scale.x / 2) * signX;
      goldBandsData.push({
        position: new THREE.Vector3(spineFaceX, pos.y + scale.y * 0.28, pos.z),
        rotation: rot,
        scale: new THREE.Vector3(0.006, bandH, scale.z * 1.002)
      });
      goldBandsData.push({
        position: new THREE.Vector3(spineFaceX, pos.y - scale.y * 0.30, pos.z),
        rotation: rot,
        scale: new THREE.Vector3(0.006, bandH, scale.z * 1.002)
      });
    }
  };

  // =========================================================================
  // 1. Focal Wall Books (Eye-Level Center Shelf Wall, ~360 books)
  // =========================================================================
  for (let r = 0; r < rows; r++) {
    const plankY = rowPlankY[r];
    const shelfSurfaceY = plankY + SHELF_CONFIG.plankThickness / 2;

    for (let c = 0; c < columns; c++) {
      const centerX = bayXCenters[c];
      const halfBay = bayWidth / 2;
      const bayLeft = centerX - halfBay + 0.08;
      const bayRight = centerX + halfBay - 0.08;
      const isFeaturedBay = r === 1 || r === featuredBook.row;

      let currentX = bayLeft;
      let reservedPropXStart = 999;
      let reservedPropXEnd = -999;

      if (r === 3 && c === 0) {
        reservedPropXStart = centerX - 0.85;
        reservedPropXEnd = centerX + 0.85;
      } else if (r === 2 && c === 2) {
        reservedPropXStart = centerX + 0.45;
        reservedPropXEnd = centerX + 1.45;
      } else if (r === 3 && c === 2) {
        reservedPropXStart = centerX + 0.65;
        reservedPropXEnd = centerX + 1.55;
      }

      while (currentX < bayRight) {
        if (isFeaturedBay) {
          const slotHalf = featuredBook.slotWidth / 2;
          if (currentX > -slotHalf - 0.12 && currentX < slotHalf) {
            currentX = slotHalf + 0.05;
            continue;
          }
        }

        if (currentX >= reservedPropXStart && currentX < reservedPropXEnd) {
          currentX = reservedPropXEnd + 0.06;
          continue;
        }

        const width = 0.065 + rng() * 0.085;
        const height = 1.25 + rng() * 0.34;
        const bookDepth = 0.88 + rng() * 0.22;

        if (currentX + width > bayRight) break;

        const posX = currentX + width / 2;
        const posY = shelfSurfaceY + height / 2;
        const frontEdgeZ = shelfZ + depth / 2 - 0.06;
        const posZ = frontEdgeZ - bookDepth / 2 - rng() * 0.04;

        let rotZ = (rng() - 0.5) * 0.025;
        let tiltOffset = 0;
        if (rng() < (isMobile ? 0.04 : 0.08) && currentX < bayRight - 0.35) {
          rotZ = (rng() > 0.5 ? 1 : -1) * (0.12 + rng() * 0.09);
          tiltOffset = Math.sin(Math.abs(rotZ)) * (height / 2);
        }

        const rotation = new THREE.Euler((rng() - 0.5) * 0.015, (rng() - 0.5) * 0.02, rotZ);
        const position = new THREE.Vector3(posX + tiltOffset * Math.sign(rotZ), posY, posZ);
        const scale = new THREE.Vector3(width, height, bookDepth);
        const hexColor = palettePool[Math.floor(rng() * palettePool.length)];

        addBook(position, rotation, scale, hexColor, 'z');

        const gap = rng() < 0.15 ? 0.03 + rng() * 0.05 : 0.003 + rng() * 0.008;
        currentX += width + gap;
      }
    }
  }

  // =========================================================================
  // 2. Long Side Walls (Ground Tier + Gallery Tier, ~1,800 books)
  // =========================================================================
  // Generate books along the left wall (X = -5.55) and right wall (X = 5.55)
  const sideWalls = [
    { wallX: -room.width / 2 + 0.45, isLeft: true },
    { wallX: room.width / 2 - 0.45, isLeft: false }
  ];

  const sideTierPlankYs = [
    // Ground Tier shelves
    room.floorY + 0.15,
    room.floorY + 1.45,
    room.floorY + 2.75,
    // Gallery Tier shelves
    room.floorY + galCfg.height + 0.15,
    room.floorY + galCfg.height + 1.45,
    room.floorY + galCfg.height + 2.75
  ];

  const zStart = -3.2;
  const zEnd = isMobile ? 6.5 : 12.5; // Optimized bounds on mobile

  sideWalls.forEach(({ wallX, isLeft }) => {
    sideTierPlankYs.forEach((tierY) => {
      let curZ = zStart;
      while (curZ < zEnd) {
        const thickness = 0.07 + rng() * 0.08;
        const bHeight = 1.15 + rng() * 0.28;
        const bDepth = 0.85 + rng() * 0.18;

        const posX = wallX + (isLeft ? bDepth / 2 : -bDepth / 2);
        const posY = tierY + bHeight / 2;
        const posZ = curZ + thickness / 2;

        const rotX = (rng() - 0.5) * 0.02;
        const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;
        const rotZ = rng() < 0.05 ? (rng() - 0.5) * 0.15 : 0;

        const pos = new THREE.Vector3(posX, posY, posZ);
        const rot = new THREE.Euler(rotX, rotY, rotZ);
        const scale = new THREE.Vector3(bDepth, bHeight, thickness);
        const hexColor = palettePool[Math.floor(rng() * palettePool.length)];

        addBook(pos, rot, scale, hexColor, 'x');

        const step = thickness + (rng() < 0.1 ? 0.04 : 0.005);
        curZ += step;
      }
    });
  });

  // 3. Transverse Rear Gallery Shelves (Z = -9.2m across room width)
  // Generating rows of antique leather books on the upper rear gallery
  const rearTierYs = [
    room.floorY + galCfg.height + 0.15,
    room.floorY + galCfg.height + 1.45
  ];
  rearTierYs.forEach((tierY) => {
    let curX = -room.width / 2 + 1.2;
    while (curX < room.width / 2 - 1.2) {
      const width = 0.07 + rng() * 0.08;
      const bHeight = 1.15 + rng() * 0.28;
      const bDepth = 0.85 + rng() * 0.18;
      const posX = curX + width / 2;
      const posY = tierY + bHeight / 2;
      const posZ = -9.2;
      const rot = new THREE.Euler(0, 0, 0);
      const scale = new THREE.Vector3(width, bHeight, bDepth);
      const hexColor = palettePool[Math.floor(rng() * palettePool.length)];
      addBook(new THREE.Vector3(posX, posY, posZ), rot, scale, hexColor, 'z');
      curX += width + 0.01;
    }
  });

  // Build InstancedMesh for leather book bodies
  const totalBooks = booksData.length;
  const bookMesh = new THREE.InstancedMesh(baseUnitBox, leatherMat, totalBooks);
  bookMesh.name = 'instanced-books-bodies';
  bookMesh.castShadow = true;
  bookMesh.receiveShadow = true;

  const mat4 = new THREE.Matrix4();
  const quat = new THREE.Quaternion();

  for (let i = 0; i < totalBooks; i++) {
    const d = booksData[i];
    quat.setFromEuler(d.rotation);
    mat4.compose(d.position, quat, d.scale);
    bookMesh.setMatrixAt(i, mat4);
    bookMesh.setColorAt(i, d.color);
  }

  bookMesh.instanceMatrix.needsUpdate = true;
  if (bookMesh.instanceColor) bookMesh.instanceColor.needsUpdate = true;
  group.add(bookMesh);

  // Build InstancedMesh for gold spine foil bands
  const totalBands = goldBandsData.length;
  const bandsMesh = new THREE.InstancedMesh(baseUnitBox, goldMat, totalBands);
  bandsMesh.name = 'instanced-books-gold-bands';

  for (let i = 0; i < totalBands; i++) {
    const b = goldBandsData[i];
    quat.setFromEuler(b.rotation);
    mat4.compose(b.position, quat, b.scale);
    bandsMesh.setMatrixAt(i, mat4);
  }

  bandsMesh.instanceMatrix.needsUpdate = true;
  group.add(bandsMesh);

  return {
    group,
    totalBooks
  };
}
