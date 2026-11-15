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

  // =========================================================================
  // Freestanding Warm Oak Bookcase Unit (Matching video sec_01.jpg & sec_02.jpg)
  // Intimate eye-level shelf bay centered at Z = -2.05, open to grand hall behind
  // =========================================================================
  const shelfZ = -2.05;
  const depth = 0.44;
  const unitWidth = 3.08;
  const plankThickness = 0.06;

  // Middle Shelf Plank (where Bishal's book sits at Y = 0.0, surface at Y = -0.77)
  const middlePlankY = -0.80;
  // Lower Shelf Plank (where lower row of antique books sits)
  const lowerPlankY = -2.25;
  // Top Cap Board of the bookcase unit
  const topPlankY = 0.88;

  const rowPlankY = [lowerPlankY, middlePlankY];
  const bayXCenters = [0];
  const bayWidth = 2.76;

  // 1. Recessed Walnut Backboard Panel (ONLY behind this bookcase bay!)
  const backboard = new THREE.Mesh(
    new THREE.BoxGeometry(unitWidth - 0.12, topPlankY - lowerPlankY + 0.15, 0.04),
    backboardMat
  );
  backboard.position.set(0, (lowerPlankY + topPlankY) / 2, shelfZ - depth / 2 - 0.02);
  backboard.receiveShadow = true;
  group.add(backboard);

  // 2. Horizontal Wooden Shelf Planks with Molded Bullnose Front Lips
  [lowerPlankY, middlePlankY].forEach((py) => {
    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(unitWidth - 0.16, plankThickness, depth),
      walnutMat
    );
    plank.position.set(0, py, shelfZ);
    plank.castShadow = true;
    plank.receiveShadow = true;
    group.add(plank);

    const bullnose = new THREE.Mesh(
      new THREE.CylinderGeometry(plankThickness / 2, plankThickness / 2, unitWidth - 0.16, 12),
      walnutMat
    );
    bullnose.rotation.z = Math.PI / 2;
    bullnose.position.set(0, py, shelfZ + depth / 2);
    bullnose.castShadow = true;
    bullnose.receiveShadow = true;
    group.add(bullnose);
  });

  // 3. Sturdy Vertical Outer Posts (Left & Right framing the bay)
  [-1.45, 1.45].forEach((px) => {
    const postH = topPlankY - lowerPlankY + 0.12;
    const post = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, postH, depth + 0.04),
      walnutMat
    );
    post.position.set(px, (lowerPlankY + topPlankY) / 2, shelfZ);
    post.castShadow = true;
    post.receiveShadow = true;
    group.add(post);

    // Carved classical plinth block
    const baseBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.20, 0.18, depth + 0.08),
      walnutMat
    );
    baseBlock.position.set(px, lowerPlankY - plankThickness / 2, shelfZ);
    group.add(baseBlock);

    // Carved capital block
    const capBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.20, 0.18, depth + 0.08),
      walnutMat
    );
    capBlock.position.set(px, topPlankY, shelfZ);
    group.add(capBlock);
  });

  // 4. Solid Wooden Top Cap / Crown of the Bookcase Unit (visible right above books)
  const topCap = new THREE.Mesh(
    new THREE.BoxGeometry(unitWidth + 0.12, 0.09, depth + 0.06),
    walnutMat
  );
  topCap.position.set(0, topPlankY, shelfZ);
  topCap.castShadow = true;
  group.add(topCap);

  const topBullnose = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, unitWidth + 0.12, 14),
    walnutMat
  );
  topBullnose.rotation.z = Math.PI / 2;
  topBullnose.position.set(0, topPlankY, shelfZ + depth / 2 + 0.03);
  group.add(topBullnose);

  return {
    group,
    walnutMat,
    backboardMat,
    rowPlankY,
    bayXCenters,
    bayWidth
  };
}
