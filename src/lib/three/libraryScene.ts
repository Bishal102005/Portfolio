import * as THREE from 'three';

// Procedural texture for rich dark polished walnut / oak wood grain
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, '#261309');
  grad.addColorStop(0.3, '#341a0e');
  grad.addColorStop(0.7, '#2c160b');
  grad.addColorStop(1, '#200f07');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Natural linear wood fibers
  for (let y = 0; y < 512; y += 2) {
    const wave = Math.sin(y * 0.035) * 5 + Math.sin(y * 0.012) * 10;
    const alpha = 0.045 + Math.sin(y * 0.15 + wave * 0.08) * 0.025;
    ctx.fillStyle = `rgba(72, 38, 20, ${Math.max(0, alpha)})`;
    ctx.fillRect(0, y, 512, 1.5);
  }

  // Soft edge bevel shadow
  const vGrad = ctx.createLinearGradient(0, 0, 0, 512);
  vGrad.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
  vGrad.addColorStop(0.06, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(0.94, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(1, 'rgba(0, 0, 0, 0.32)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Procedural texture for creamy book page deckle edges
function createPaperEdgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#eddcb9';
  ctx.fillRect(0, 0, 128, 128);

  for (let y = 0; y < 128; y += 3) {
    ctx.fillStyle = 'rgba(140, 108, 76, 0.16)';
    ctx.fillRect(0, y, 128, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Classical vintage book titles
const VINTAGE_TITLES = [
  'HISTORIA NATVRALIS',
  'CHRONICA MVNDI',
  'PHILOSOPHIA ANTIQVA',
  'ASTRONOMIA NOVA',
  'DE ARTE POETICA',
  'OPERA OMNIA',
  'ELEMENTA CODICIS',
  'ARCHITECTVRA SACRA',
  'GEOMETRIA SPECVLO',
  'BIBLIOTHECA NOCTIS'
];

// Rich antique leather color palettes (Burgundy, Hunter Green, Midnight Navy, Cognac, Ochre)
const LEATHER_PALETTES = [
  { base: '#3a1017', dark: '#180407', gold: '#dfb76c' }, // Burgundy Morocco
  { base: '#10281b', dark: '#06130c', gold: '#e4c379' }, // Antique Hunter Green
  { base: '#122030', dark: '#070e17', gold: '#dfbe75' }, // Midnight Navy
  { base: '#3b2010', dark: '#1c0e07', gold: '#e6c882' }, // Cognac Leather
  { base: '#463218', dark: '#22170b', gold: '#ebd18e' }, // Aged Ochre
  { base: '#25162a', dark: '#100913', gold: '#e2be72' }, // Imperial Plum
  { base: '#2c180e', dark: '#140b06', gold: '#dfba6f' }, // Deep Mahogany
  { base: '#181716', dark: '#0a0a09', gold: '#d5ae63' }  // Antique Ebony
];

// Procedural generator for clean vintage book spine textures
function createVintageSpineTexture(paletteIndex: number, titleIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const pal = LEATHER_PALETTES[paletteIndex % LEATHER_PALETTES.length];
  const title = VINTAGE_TITLES[titleIndex % VINTAGE_TITLES.length];

  // Cylindrical leather gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 128, 0);
  bgGrad.addColorStop(0, pal.dark);
  bgGrad.addColorStop(0.2, pal.base);
  bgGrad.addColorStop(0.5, pal.base);
  bgGrad.addColorStop(0.8, pal.base);
  bgGrad.addColorStop(1, pal.dark);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 128, 512);

  // Five raised horizontal ribs
  const ribYs = [65, 155, 260, 365, 450];
  ribYs.forEach((ry) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(6, ry + 4, 116, 4);
    ctx.fillStyle = pal.gold;
    ctx.fillRect(6, ry, 116, 5);
    ctx.fillStyle = '#fff0ba';
    ctx.fillRect(6, ry, 116, 2);
  });

  // Gilded border
  ctx.strokeStyle = pal.gold;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(10, 12, 108, 488);

  // Stamped gold lettering and emblems
  ctx.fillStyle = pal.gold;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '16px serif';
  ctx.fillText('❖', 64, 38);
  ctx.font = '12px serif';
  ctx.fillText('❧ ✦ ☙', 64, 110);

  ctx.font = '600 13px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#fce4a6';

  const words = title.split(' ');
  let ty = 185;
  words.forEach((w) => {
    ctx.fillText(w, 64, ty);
    ty += 18;
  });

  ctx.font = '11px sans-serif';
  ctx.fillStyle = pal.gold;
  ctx.fillText('• VOL. ' + ((titleIndex % 6) + 1) + ' •', 64, 312);
  ctx.fillText('✦ ❖ ✦', 64, 410);

  ctx.font = '14px serif';
  ctx.fillText('❦', 64, 480);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createLibraryScene(): THREE.Group {
  const library = new THREE.Group();
  library.name = 'single-shelf-library';

  // 1. Materials
  const woodTexture = createWoodTexture();
  const paperEdgeTexture = createPaperEdgeTexture();

  const woodMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.65,
    metalness: 0.06
  });

  const shelfMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.6,
    metalness: 0.06
  });

  const backboardMat = new THREE.MeshStandardMaterial({
    color: 0x160c07,
    roughness: 0.94,
    metalness: 0.02
  });

  const paperEdgeMat = new THREE.MeshStandardMaterial({
    map: paperEdgeTexture,
    roughness: 0.95,
    metalness: 0.0
  });

  // Pre-generate pool of clean vintage spine materials
  const spineMaterials: THREE.MeshStandardMaterial[] = [];
  for (let i = 0; i < 8; i++) {
    const spineTex = createVintageSpineTexture(i, i);
    spineMaterials.push(
      new THREE.MeshStandardMaterial({
        map: spineTex,
        roughness: 0.55,
        metalness: 0.12
      })
    );
  }

  // 2. Single Shelf Architectural Construction
  const shelfWidth = 9.2;
  const shelfDepth = 1.5;

  // Bottom Shelf Board (Where the books rest)
  const bottomShelf = new THREE.Mesh(
    new THREE.BoxGeometry(shelfWidth, 0.12, shelfDepth),
    shelfMat
  );
  bottomShelf.position.set(0, -1.13, -2.05);
  library.add(bottomShelf);

  // Top Shelf Board / Crown (Right above the books)
  const topShelf = new THREE.Mesh(
    new THREE.BoxGeometry(shelfWidth, 0.14, shelfDepth + 0.08),
    shelfMat
  );
  topShelf.position.set(0, 1.14, -2.01);
  library.add(topShelf);

  // Left Vertical Wooden Column / Upright
  const leftColumn = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 2.4, shelfDepth + 0.05),
    woodMat
  );
  leftColumn.position.set(-shelfWidth / 2 + 0.11, 0, -2.02);
  library.add(leftColumn);

  // Right Vertical Wooden Column / Upright
  const rightColumn = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 2.4, shelfDepth + 0.05),
    woodMat
  );
  rightColumn.position.set(shelfWidth / 2 - 0.11, 0, -2.02);
  library.add(rightColumn);

  // Back Wooden Panel
  const backPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(shelfWidth, 2.4),
    backboardMat
  );
  backPanel.position.set(0, 0, -2.7);
  library.add(backPanel);

  // 3. Helper to create a single 3D vintage book on the shelf
  function createShelfBook(
    w: number,
    h: number,
    d: number,
    paletteIdx: number,
    titleIdx: number
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(w, h, d);
    const spineMat = spineMaterials[paletteIdx % spineMaterials.length];
    const pal = LEATHER_PALETTES[paletteIdx % LEATHER_PALETTES.length];
    const coverMat = new THREE.MeshStandardMaterial({
      color: pal.base,
      roughness: 0.65,
      metalness: 0.06
    });

    const materials = [
      coverMat,      // +X
      coverMat,      // -X
      paperEdgeMat,  // +Y (deckle paper edge)
      coverMat,      // -Y
      spineMat,      // +Z (spine facing room!)
      coverMat       // -Z
    ];

    return new THREE.Mesh(geo, materials);
  }

  // 4. Fill This Single Shelf with Orderly Vintage Books
  function fillSingleShelfRow(xStart: number, xEnd: number, bIdxStart: number) {
    let curX = xStart;
    let bIdx = bIdxStart;

    while (curX < xEnd) {
      const bookW = 0.082 + Math.random() * 0.026;
      // Height matches Bishal's book (H = 1.98) with subtle natural variation
      const bookH = 1.98 + (Math.random() - 0.5) * 0.06;
      const bookD = 1.15;

      const book = createShelfBook(bookW, bookH, bookD, bIdx, bIdx);
      // Resting flush on the bottom shelf board
      const bY = -1.13 + 0.06 + bookH / 2;
      const bZ = -2.05;

      book.position.set(curX + bookW / 2, bY, bZ);
      library.add(book);

      curX += bookW + 0.005;
      bIdx++;
    }
  }

  // Left side of the single shelf: from left upright (-4.35) to Bishal's center slot (-0.11)
  fillSingleShelfRow(-shelfWidth / 2 + 0.24, -0.11, 0);

  // Right side of the single shelf: from Bishal's center slot (+0.11) to right upright (+4.35)
  fillSingleShelfRow(0.11, shelfWidth / 2 - 0.24, 4);

  // 5. Warm Intimate Lighting for the Single Shelf
  // Ambient warm fill
  const ambientFill = new THREE.PointLight(0xffedd2, 1.4, 10);
  ambientFill.position.set(0, 1.8, -0.6);
  library.add(ambientFill);

  // Left & right warm shelf fills
  const leftShelfLight = new THREE.PointLight(0xf59e0b, 1.1, 7);
  leftShelfLight.position.set(-2.8, 0.4, -1.0);
  library.add(leftShelfLight);

  const rightShelfLight = new THREE.PointLight(0xf59e0b, 1.1, 7);
  rightShelfLight.position.set(2.8, 0.4, -1.0);
  library.add(rightShelfLight);

  // Dedicated Warm Accent Spotlight focused right on Bishal's centerpiece book
  const featureSpot = new THREE.SpotLight(0xfffaed, 2.2, 8.0, Math.PI / 3.6, 0.4);
  featureSpot.position.set(0, 1.8, -0.3);
  featureSpot.target.position.set(0, -0.08, -2.05);
  library.add(featureSpot);
  library.add(featureSpot.target);

  return library;
}
