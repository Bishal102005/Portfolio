import * as THREE from 'three';
import { SHELF_CONFIG, createSeededRandom } from '../constants/shelfConfig';

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

  // Flatten palette for fast random sampling
  const palettePool: number[] = [
    ...leatherPalette.burgundy,
    ...leatherPalette.burgundy, // Weighted
    ...leatherPalette.forestGreen,
    ...leatherPalette.forestGreen,
    ...leatherPalette.navy,
    ...leatherPalette.navy,
    ...leatherPalette.brown,
    ...leatherPalette.brown,
    ...leatherPalette.brown,
    ...leatherPalette.vellum
  ];

  // Materials
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

  // Generate books bay by bay
  for (let r = 0; r < rows; r++) {
    const plankY = rowPlankY[r];
    const shelfSurfaceY = plankY + SHELF_CONFIG.plankThickness / 2;

    for (let c = 0; c < columns; c++) {
      const centerX = bayXCenters[c];
      const halfBay = bayWidth / 2;
      const bayLeft = centerX - halfBay + 0.08;
      const bayRight = centerX + halfBay - 0.08;

      const isFeaturedBay = r === featuredBook.row && c === featuredBook.section;

      let currentX = bayLeft;

      // Small prop reservation offsets in selected bays
      let reservedPropXStart = 999;
      let reservedPropXEnd = -999;

      // Reserve space for props
      if (r === 3 && c === 0) {
        // Brass Globe in top-left bay
        reservedPropXStart = centerX - 0.85;
        reservedPropXEnd = centerX + 0.85;
      } else if (r === 2 && c === 2) {
        // Candle & flat stack in right middle bay
        reservedPropXStart = centerX + 0.45;
        reservedPropXEnd = centerX + 1.45;
      } else if (r === 3 && c === 2) {
        // Small trailing plant in right upper bay
        reservedPropXStart = centerX + 0.65;
        reservedPropXEnd = centerX + 1.55;
      }

      while (currentX < bayRight) {
        // Check featured book slot in middle row center bay
        if (isFeaturedBay) {
          const slotHalf = featuredBook.slotWidth / 2;
          const slotMinX = -slotHalf;
          const slotMaxX = slotHalf;

          // If inside featured book slot, skip past it so Bishal's book sits cleanly
          if (currentX > slotMinX - 0.12 && currentX < slotMaxX) {
            currentX = slotMaxX + 0.05;
            continue;
          }
        }

        // Check prop reservation
        if (currentX >= reservedPropXStart && currentX < reservedPropXEnd) {
          currentX = reservedPropXEnd + 0.06;
          continue;
        }

        // Book dimensions
        const width = 0.065 + rng() * 0.085; // Thickness 6.5cm - 15cm
        const height = 1.25 + rng() * 0.34; // Height 1.25m - 1.59m
        const bookDepth = 0.88 + rng() * 0.22; // Depth 0.88m - 1.10m

        if (currentX + width > bayRight) break;

        const posX = currentX + width / 2;
        const posY = shelfSurfaceY + height / 2;
        // Align book spine near shelf front edge
        const frontEdgeZ = shelfZ + depth / 2 - 0.06;
        const posZ = frontEdgeZ - bookDepth / 2 - rng() * 0.04;

        // Occasional leaning book at bay edges or gaps
        let rotZ = (rng() - 0.5) * 0.025; // Subtle natural tilt
        let tiltOffset = 0;

        if (rng() < (isMobile ? 0.04 : 0.08) && currentX < bayRight - 0.35) {
          rotZ = (rng() > 0.5 ? 1 : -1) * (0.12 + rng() * 0.09);
          tiltOffset = Math.sin(Math.abs(rotZ)) * (height / 2);
        }

        const rotation = new THREE.Euler((rng() - 0.5) * 0.015, (rng() - 0.5) * 0.02, rotZ);
        const position = new THREE.Vector3(posX + tiltOffset * Math.sign(rotZ), posY, posZ);
        const scale = new THREE.Vector3(width, height, bookDepth);

        const hexColor = palettePool[Math.floor(rng() * palettePool.length)];
        const color = new THREE.Color(hexColor);

        booksData.push({ position, rotation, scale, color });

        // Add 2 gold embossed bands on the book spine
        const spineFaceZ = posZ + bookDepth / 2 + 0.002;
        const bandH = 0.018 + rng() * 0.012;
        const bandW = width * 1.002;
        const bandD = 0.006;

        // Top band
        goldBandsData.push({
          position: new THREE.Vector3(position.x, position.y + height * 0.28, spineFaceZ),
          rotation,
          scale: new THREE.Vector3(bandW, bandH, bandD)
        });

        // Bottom band
        goldBandsData.push({
          position: new THREE.Vector3(position.x, position.y - height * 0.30, spineFaceZ),
          rotation,
          scale: new THREE.Vector3(bandW, bandH, bandD)
        });

        // Advance along shelf plank
        const gap = rng() < 0.15 ? 0.03 + rng() * 0.05 : 0.003 + rng() * 0.008;
        currentX += width + gap;
      }
    }
  }

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
  bandsMesh.castShadow = false;
  bandsMesh.receiveShadow = true;

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
