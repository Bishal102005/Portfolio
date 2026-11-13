import * as THREE from 'three';

// Procedural texture generator for authentic rich dark walnut / oak wood grain
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base warm dark walnut
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, '#231209');
  grad.addColorStop(0.3, '#32190d');
  grad.addColorStop(0.7, '#2b150b');
  grad.addColorStop(1, '#1e0f07');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Wood grain waves
  for (let y = 0; y < 512; y++) {
    const wave = Math.sin(y * 0.04) * 6 + Math.sin(y * 0.015) * 14;
    const alpha = 0.05 + Math.sin(y * 0.18 + wave * 0.1) * 0.035;
    ctx.fillStyle = `rgba(64, 34, 18, ${Math.max(0, alpha)})`;
    ctx.fillRect(0, y, 512, 1);
  }

  // Fine linear wood fibers
  for (let i = 0; i < 280; i++) {
    const y = Math.random() * 512;
    const h = 1 + Math.random() * 2.5;
    ctx.fillStyle = Math.random() > 0.45 ? 'rgba(12, 6, 3, 0.35)' : 'rgba(92, 52, 28, 0.22)';
    ctx.fillRect(0, y, 512, h);
  }

  // Edge vignette / bevel shadow
  const vGrad = ctx.createLinearGradient(0, 0, 0, 512);
  vGrad.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
  vGrad.addColorStop(0.08, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(0.92, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Procedural texture generator for aged creamy paper page edges
function createPaperEdgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#eddcb9';
  ctx.fillRect(0, 0, 128, 128);

  // Deckle page lines
  for (let y = 0; y < 128; y += 2) {
    const alpha = 0.1 + Math.random() * 0.18;
    ctx.fillStyle = `rgba(138, 108, 76, ${alpha})`;
    ctx.fillRect(0, y, 128, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Vintage titles for neighboring library volumes
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

// Rich antique leather color palettes
const LEATHER_PALETTES = [
  { base: '#3b0e14', dark: '#1b0508', gold: '#dfb76c' }, // Vintage Burgundy Morocco
  { base: '#102a1b', dark: '#08170e', gold: '#e4c379' }, // Antique Hunter Green
  { base: '#111f2f', dark: '#080f18', gold: '#dfbe75' }, // Midnight Navy Buckram
  { base: '#3d2010', dark: '#1f1008', gold: '#e6c882' }, // Warm Cognac Leather
  { base: '#4a3518', dark: '#261b0c', gold: '#ebd18e' }, // Aged Ochre Calfskin
  { base: '#25152a', dark: '#120a14', gold: '#e2be72' }, // Imperial Plum Buckram
  { base: '#2d1810', dark: '#160b07', gold: '#dfba6f' }, // Deep Mahogany
  { base: '#1a1917', dark: '#0c0b0a', gold: '#d5ae63' }  // Antique Ebony Morocco
];

// Procedural generator for realistic antique vintage book spine textures with embossed ribs and gold foil
function createVintageSpineTexture(paletteIndex: number, titleIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const pal = LEATHER_PALETTES[paletteIndex % LEATHER_PALETTES.length];
  const title = VINTAGE_TITLES[titleIndex % VINTAGE_TITLES.length];

  // 1. Cylindrical spine gradient (darker edges simulate curved 3D leather spine)
  const bgGrad = ctx.createLinearGradient(0, 0, 128, 0);
  bgGrad.addColorStop(0, pal.dark);
  bgGrad.addColorStop(0.2, pal.base);
  bgGrad.addColorStop(0.5, pal.base);
  bgGrad.addColorStop(0.8, pal.base);
  bgGrad.addColorStop(1, pal.dark);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 128, 512);

  // Leather speckle / grain
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 512;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.14)';
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // 2. Embossed Raised Ribs (Horizontal Bands)
  const ribYs = [65, 155, 260, 365, 450];
  ribYs.forEach((ry) => {
    // Rib drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(6, ry + 5, 116, 4);

    // Rib base gold
    ctx.fillStyle = pal.gold;
    ctx.fillRect(6, ry, 116, 5);

    // Rib highlight
    ctx.fillStyle = '#fff0ba';
    ctx.fillRect(6, ry, 116, 2);

    // Embossed dotted pattern
    for (let dx = 12; dx < 114; dx += 8) {
      ctx.fillStyle = 'rgba(40, 20, 5, 0.7)';
      ctx.fillRect(dx, ry + 1.5, 2, 2);
    }
  });

  // 3. Delicate gold filigree borders
  ctx.strokeStyle = pal.gold;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(10, 12, 108, 488);

  // 4. Stamped Gold Emblems & Title
  ctx.fillStyle = pal.gold;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Top compartment emblem
  ctx.font = '16px serif';
  ctx.fillText('❖', 64, 38);

  // Second compartment: Gold Filigree Motif
  ctx.font = '13px serif';
  ctx.fillText('❧ ✦ ☙', 64, 110);

  // Main compartment: Vertical Title Letters
  ctx.font = '600 13px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#fce4a6';

  // Draw title vertically down the spine
  const words = title.split(' ');
  let ty = 185;
  words.forEach((w) => {
    ctx.fillText(w, 64, ty);
    ty += 18;
  });

  // Fourth compartment: Volume / Emblem
  ctx.font = '11px sans-serif';
  ctx.fillStyle = pal.gold;
  ctx.fillText('• VOL. ' + ((titleIndex % 6) + 1) + ' •', 64, 312);
  ctx.fillText('✦ ❖ ✦', 64, 410);

  // Bottom compartment emblem
  ctx.font = '14px serif';
  ctx.fillText('❦', 64, 480);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createLibraryScene(): THREE.Group {
  const library = new THREE.Group();
  library.name = 'virtual-library';

  // Shared Procedural Textures
  const woodTexture = createWoodTexture();
  const paperEdgeTexture = createPaperEdgeTexture();

  // Materials
  const woodMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.72,
    metalness: 0.06
  });

  const shelfMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.62,
    metalness: 0.08
  });

  const backboardMat = new THREE.MeshStandardMaterial({
    color: 0x140b07,
    roughness: 0.92,
    metalness: 0.02
  });

  const paperEdgeMat = new THREE.MeshStandardMaterial({
    map: paperEdgeTexture,
    roughness: 0.95,
    metalness: 0.0
  });

  // Pre-generate a pool of authentic vintage spine materials
  const spineMaterials: THREE.MeshStandardMaterial[] = [];
  for (let i = 0; i < 8; i++) {
    const spineTex = createVintageSpineTexture(i, i);
    spineMaterials.push(
      new THREE.MeshStandardMaterial({
        map: spineTex,
        roughness: 0.58,
        metalness: 0.12
      })
    );
  }

  // 1. Back Wall / Bookcase Backing
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 12),
    backboardMat
  );
  backWall.position.set(0, 0.2, -2.65);
  library.add(backWall);

  // 2. Parquet Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(18, 0.2, 8),
    woodMat
  );
  floor.position.set(0, -2.25, -0.6);
  library.add(floor);

  // 3. Shelves (Horizontal Boards)
  // Feature shelf where Bishal's book sits is at Y = -1.07.
  // Upper shelf board is at Y = 1.05.
  // Crown top board is at Y = 2.45.
  // Lower shelf board is at Y = -2.15.
  const shelfYPositions = [2.45, 1.05, -1.07, -2.15];
  shelfYPositions.forEach((y, idx) => {
    const isCrown = idx === 0;
    const shelfThickness = isCrown ? 0.16 : 0.08;
    const shelfDepth = isCrown ? 1.55 : 1.45;
    const shelf = new THREE.Mesh(
      new THREE.BoxGeometry(14, shelfThickness, shelfDepth),
      shelfMat
    );
    shelf.position.set(0, y, -2.05);
    library.add(shelf);
  });

  // 4. Vertical Architectural Columns / Dividers
  const columnXPositions = [-4.6, -1.5, 1.5, 4.6];
  columnXPositions.forEach((x) => {
    const col = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 4.8, 1.52),
      woodMat
    );
    col.position.set(x, 0.15, -2.02);
    library.add(col);
  });

  // 5. Crown Molding / Top Header
  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(14.4, 0.28, 1.62),
    woodMat
  );
  crown.position.set(0, 2.58, -1.98);
  library.add(crown);

  // Helper to create realistic antique 3D books with authentic spine textures
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

    // BoxGeometry material faces:
    // 0: +X, 1: -X, 2: +Y (top - paper edge), 3: -Y (bottom), 4: +Z (spine facing room!), 5: -Z (back facing wall)
    const materials = [
      coverMat,      // +X (right cover)
      coverMat,      // -X (left cover)
      paperEdgeMat,  // +Y (top paper edge)
      coverMat,      // -Y (bottom)
      spineMat,      // +Z (spine facing camera/room!)
      coverMat       // -Z (back towards wall)
    ];

    return new THREE.Mesh(geo, materials);
  }

  // Populate shelf with tightly packed authentic vintage books
  function fillShelf(
    shelfY: number,
    xStart: number,
    xEnd: number,
    baseH: number,
    hVar: number,
    skipCenterSlot = false
  ) {
    let curX = xStart;
    let bIdx = Math.floor(Math.random() * 8);

    while (curX < xEnd) {
      // If skipCenterSlot is true, leave a snug slot (-0.11 to +0.11) for Bishal's feature book!
      if (skipCenterSlot && curX > -0.11 && curX < 0.11) {
        curX = 0.11;
        continue;
      }

      const bookW = 0.075 + Math.random() * 0.038; // 7.5cm to 11.3cm thickness
      const bookH = baseH + (Math.random() - 0.5) * hVar;
      const bookD = 1.15 + Math.random() * 0.15; // Realistic book depth into shelf

      const book = createShelfBook(bookW, bookH, bookD, bIdx, bIdx);

      // Book position resting on shelf board
      const bY = shelfY + 0.04 + bookH / 2;
      const bZ = -2.1 + (Math.random() - 0.5) * 0.04;

      // Subtle natural vertical tilt
      const isTilted = Math.random() < 0.1 && curX < xEnd - 0.22;
      const tiltZ = isTilted ? (Math.random() > 0.5 ? 0.035 : -0.035) : 0;

      book.position.set(curX + bookW / 2, bY, bZ);
      book.rotation.z = tiltZ;
      library.add(book);

      curX += bookW + 0.006;
      bIdx++;
    }
  }

  // 6. Fill Shelves with Books
  // A. Middle Shelf (Y = -1.07): Where Bishal's book sits!
  // Height matches Bishal's book (H = 1.98), book heights ~1.92 to 2.04
  // Left bay:
  fillShelf(-1.07, -4.5, -1.55, 1.96, 0.14);
  // Center bay: packed on both sides of Bishal's slot (-0.11 to +0.11)!
  fillShelf(-1.07, -1.45, 1.45, 1.98, 0.12, true);
  // Right bay:
  fillShelf(-1.07, 1.55, 4.5, 1.96, 0.14);

  // B. Upper Shelf (Y = 1.05 to 2.45):
  fillShelf(1.05, -4.5, -1.55, 1.25, 0.12);
  fillShelf(1.05, -1.45, 1.45, 1.26, 0.1);
  fillShelf(1.05, 1.55, 4.5, 1.25, 0.12);

  // C. Lower Shelf (Y = -2.15 to -1.07):
  fillShelf(-2.15, -4.5, -1.55, 0.94, 0.08);
  fillShelf(-2.15, -1.45, 1.45, 0.95, 0.08);
  fillShelf(-2.15, 1.55, 4.5, 0.94, 0.08);

  // 7. Warm Atmospheric Library Lighting
  // Warm ambient fill lights (soft architectural bounce, no obstructing props)
  const leftFillLight = new THREE.PointLight(0xffb74d, 1.8, 8.5);
  leftFillLight.position.set(-2.4, 0.8, -1.2);
  library.add(leftFillLight);

  const rightFillLight = new THREE.PointLight(0xf59e0b, 1.5, 8.5);
  rightFillLight.position.set(2.4, 0.9, -1.2);
  library.add(rightFillLight);

  // Dedicated Warm Accent Spotlight focused right on Bishal's centerpiece book
  const featureSpot = new THREE.SpotLight(0xfffaed, 2.0, 7.0, Math.PI / 3.8, 0.4);
  featureSpot.position.set(0, 1.25, -0.5);
  featureSpot.target.position.set(0, -0.04, -2.0);
  library.add(featureSpot);
  library.add(featureSpot.target);

  return library;
}
