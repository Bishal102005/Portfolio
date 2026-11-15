import * as THREE from 'three';
import { SHELF_CONFIG } from '../constants/shelfConfig';

// ============================================================================
// Procedural Dark Walnut Wood Texture Generator
// ============================================================================
export function createDarkWalnutTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Deep, rich espresso & chocolate walnut gradient base
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  bgGrad.addColorStop(0, '#160b05');
  bgGrad.addColorStop(0.22, '#241309');
  bgGrad.addColorStop(0.45, '#321b0e');
  bgGrad.addColorStop(0.58, '#26140a');
  bgGrad.addColorStop(0.82, '#381f11');
  bgGrad.addColorStop(1, '#180c06');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Fine longitudinal walnut pores and gentle wavy grain
  for (let y = 0; y < 1024; y += 2) {
    const wave = Math.sin(y * 0.018) * 12 + Math.sin(y * 0.006) * 22 + Math.cos(y * 0.035) * 4;
    const tone = Math.sin(y * 0.12 + wave * 0.04);
    const alpha = 0.08 + Math.max(0, tone) * 0.12;
    ctx.fillStyle = `rgba(12, 6, 3, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 1024, 1.8);

    // Warm amber satin varnish highlights on grain crests
    if (y % 6 === 0) {
      const hlAlpha = 0.04 + Math.sin(y * 0.07 + wave * 0.03) * 0.03;
      if (hlAlpha > 0) {
        ctx.fillStyle = `rgba(215, 145, 80, ${hlAlpha.toFixed(3)})`;
        ctx.fillRect(0, y + 0.5, 1024, 1.0);
      }
    }
  }

  // Walnut medullary flecks & pores
  for (let i = 0; i < 350; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rw = 15 + Math.random() * 45;
    const rh = 1.0 + Math.random() * 1.8;
    ctx.fillStyle = 'rgba(185, 120, 65, 0.05)';
    ctx.fillRect(rx, ry, rw, rh);
  }

  // Top and bottom bevel shadow for molded shelf planks
  const vGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  vGrad.addColorStop(0, 'rgba(0, 0, 0, 0.42)');
  vGrad.addColorStop(0.06, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(0.94, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Full Library Bookshelf Wall Architecture Component
// ============================================================================
export interface ShelfWallOptions {
  texture?: THREE.CanvasTexture;
}

export function createShelfWall(options: ShelfWallOptions = {}): {
  group: THREE.Group;
  walnutMat: THREE.MeshStandardMaterial;
  backboardMat: THREE.MeshStandardMaterial;
  rowPlankY: number[];
  bayXCenters: number[];
  bayWidth: number;
} {
  const group = new THREE.Group();
  group.name = 'library-bookshelf-wall';

  const walnutTexture = options.texture || createDarkWalnutTexture();

  const walnutMat = new THREE.MeshStandardMaterial({
    map: walnutTexture,
    roughness: 0.52,
    metalness: 0.06
  });

  const backboardMat = new THREE.MeshStandardMaterial({
    color: 0x100804,
    roughness: 0.94,
    metalness: 0.02
  });

  const {
    rows,
    columns,
    totalWidth,
    totalHeight,
    depth,
    plankThickness,
    dividerThickness,
    rowSpacing,
    shelfZ,
    backZ
  } = SHELF_CONFIG;

  // 1. Recessed Walnut Backboard Panel
  const backPanel = new THREE.Mesh(new THREE.PlaneGeometry(totalWidth + 1.2, totalHeight + 1.5), backboardMat);
  backPanel.position.set(0, 0, backZ);
  backPanel.receiveShadow = true;
  group.add(backPanel);

  // 2. Compute Plank Y Positions
  // Middle row (row index 2) plank sits directly beneath Bishal's book (which is at Y = 0.0, height ~1.53)
  // Book bottom is at Y = -0.765, so plank top surface is at Y = -0.77
  const middlePlankY = -0.77 - plankThickness / 2; // -0.82
  const rowPlankY: number[] = [];
  for (let r = 0; r < rows; r++) {
    const y = middlePlankY + (r - 2) * rowSpacing;
    rowPlankY.push(y);
  }
  // Also add top ceiling plank
  const topPlankY = middlePlankY + (rows - 2) * rowSpacing;

  // 3. Visible Horizontal Walnut Shelf Planks (5 shelf rows + 1 top plank)
  const allPlankYs = [...rowPlankY, topPlankY];
  allPlankYs.forEach((py) => {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(totalWidth, plankThickness, depth), walnutMat);
    plank.position.set(0, py, shelfZ);
    plank.castShadow = true;
    plank.receiveShadow = true;
    group.add(plank);

    // Molded Bullnose Front Lip for authentic joinery
    const bullnoseLip = new THREE.Mesh(
      new THREE.CylinderGeometry(plankThickness / 2.2, plankThickness / 2.2, totalWidth, 12),
      walnutMat
    );
    bullnoseLip.rotation.z = Math.PI / 2;
    bullnoseLip.position.set(0, py, shelfZ + depth / 2);
    bullnoseLip.castShadow = true;
    bullnoseLip.receiveShadow = true;
    group.add(bullnoseLip);
  });

  // 4. Vertical Dividers (3 Bays = 4 Uprights)
  const bayWidth = (totalWidth - (columns + 1) * dividerThickness) / columns;
  const dividerXPositions: number[] = [];
  const bayXCenters: number[] = [];

  for (let c = 0; c <= columns; c++) {
    const x = -totalWidth / 2 + dividerThickness / 2 + c * (bayWidth + dividerThickness);
    dividerXPositions.push(x);
  }

  for (let c = 0; c < columns; c++) {
    const centerX = -totalWidth / 2 + dividerThickness + bayWidth / 2 + c * (bayWidth + dividerThickness);
    bayXCenters.push(centerX);
  }

  const dividerHeight = topPlankY - rowPlankY[0] + plankThickness;
  const dividerCenterY = (rowPlankY[0] + topPlankY) / 2;

  dividerXPositions.forEach((dx) => {
    const divider = new THREE.Mesh(
      new THREE.BoxGeometry(dividerThickness, dividerHeight, depth + 0.08),
      walnutMat
    );
    divider.position.set(dx, dividerCenterY, shelfZ);
    divider.castShadow = true;
    divider.receiveShadow = true;
    group.add(divider);

    // Classical carved capital & base blocks on vertical dividers
    const baseCap = new THREE.Mesh(
      new THREE.BoxGeometry(dividerThickness + 0.08, 0.16, depth + 0.12),
      walnutMat
    );
    baseCap.position.set(dx, rowPlankY[0] - plankThickness / 2, shelfZ);
    group.add(baseCap);

    const topCap = new THREE.Mesh(
      new THREE.BoxGeometry(dividerThickness + 0.08, 0.16, depth + 0.12),
      walnutMat
    );
    topCap.position.set(dx, topPlankY + plankThickness / 2, shelfZ);
    group.add(topCap);
  });

  // Architectural Inner Framing Uprights on the middle shelf tier (matching video_frame_01)
  [-1.42, 1.42].forEach((ix) => {
    const innerUpright = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, rowSpacing, depth + 0.04),
      walnutMat
    );
    innerUpright.position.set(ix, middlePlankY + rowSpacing / 2, shelfZ);
    innerUpright.castShadow = true;
    innerUpright.receiveShadow = true;
    group.add(innerUpright);
  });

  // 5. Grand Architectural Top Crown Molding
  const crownMolding = new THREE.Mesh(
    new THREE.BoxGeometry(totalWidth + 0.6, 0.38, depth + 0.35),
    walnutMat
  );
  crownMolding.position.set(0, topPlankY + plankThickness / 2 + 0.19, shelfZ);
  crownMolding.castShadow = true;
  group.add(crownMolding);

  // 6. Sturdy Architectural Base Plinth
  const basePlinth = new THREE.Mesh(
    new THREE.BoxGeometry(totalWidth + 0.5, 0.32, depth + 0.32),
    walnutMat
  );
  basePlinth.position.set(0, rowPlankY[0] - plankThickness / 2 - 0.16, shelfZ);
  basePlinth.receiveShadow = true;
  group.add(basePlinth);

  return {
    group,
    walnutMat,
    backboardMat,
    rowPlankY,
    bayXCenters,
    bayWidth
  };
}
