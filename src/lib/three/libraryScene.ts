import * as THREE from 'three';

// Procedural texture for dark polished mahogany / walnut wood grain
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Smooth warm dark walnut gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, '#241208');
  grad.addColorStop(0.3, '#30180d');
  grad.addColorStop(0.7, '#2a150b');
  grad.addColorStop(1, '#1e0e06');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Subtle natural wood grain lines
  for (let y = 0; y < 512; y += 2) {
    const wave = Math.sin(y * 0.035) * 5 + Math.sin(y * 0.012) * 10;
    const alpha = 0.04 + Math.sin(y * 0.15 + wave * 0.08) * 0.025;
    ctx.fillStyle = `rgba(68, 36, 18, ${Math.max(0, alpha)})`;
    ctx.fillRect(0, y, 512, 1.5);
  }

  // Soft edge bevel shadow
  const vGrad = ctx.createLinearGradient(0, 0, 0, 512);
  vGrad.addColorStop(0, 'rgba(0, 0, 0, 0.15)');
  vGrad.addColorStop(0.06, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(0.94, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(1, 'rgba(0, 0, 0, 0.28)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Procedural texture for clean parquet hardwood floor
function createParquetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1a0c05';
  ctx.fillRect(0, 0, 512, 512);

  const plankW = 64;
  const plankH = 128;
  for (let x = 0; x < 512; x += plankW) {
    for (let y = 0; y < 512; y += plankH) {
      const isAlt = ((x / plankW) + (y / plankH)) % 2 === 0;
      ctx.fillStyle = isAlt ? '#261208' : '#1f0e05';
      ctx.fillRect(x + 1, y + 1, plankW - 2, plankH - 2);

      for (let py = y + 3; py < y + plankH - 3; py += 4) {
        ctx.fillStyle = 'rgba(50, 24, 10, 0.2)';
        ctx.fillRect(x + 2, py, plankW - 4, 1.5);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Procedural texture for book page edges
function createPaperEdgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#eddcb9';
  ctx.fillRect(0, 0, 128, 128);

  for (let y = 0; y < 128; y += 3) {
    ctx.fillStyle = 'rgba(140, 108, 76, 0.15)';
    ctx.fillRect(0, y, 128, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Procedural texture for leather desk blotter pad with gold border
function createDeskBlotterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1e0a0f';
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = '#cda158';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 480, 224);
  ctx.strokeStyle = 'rgba(235, 195, 120, 0.45)';
  ctx.lineWidth = 1;
  ctx.strokeRect(22, 22, 468, 212);

  ctx.font = '16px serif';
  ctx.fillStyle = '#cda158';
  ctx.fillText('❖', 28, 40);
  ctx.fillText('❖', 472, 40);
  ctx.fillText('❖', 28, 224);
  ctx.fillText('❖', 472, 224);

  const tex = new THREE.CanvasTexture(canvas);
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

// Rich harmonious antique leather palettes
const LEATHER_PALETTES = [
  { base: '#360e14', dark: '#180407', gold: '#dfb76c' }, // Burgundy Morocco
  { base: '#0f2619', dark: '#06130c', gold: '#e4c379' }, // Antique Hunter Green
  { base: '#101c2a', dark: '#060c14', gold: '#dfbe75' }, // Midnight Navy
  { base: '#361c0e', dark: '#1a0d06', gold: '#e6c882' }, // Cognac Leather
  { base: '#422e15', dark: '#20160a', gold: '#ebd18e' }, // Aged Ochre
  { base: '#221327', dark: '#0f0812', gold: '#e2be72' }, // Imperial Plum
  { base: '#28150d', dark: '#130a05', gold: '#dfba6f' }, // Deep Mahogany
  { base: '#161514', dark: '#090808', gold: '#d5ae63' }  // Antique Ebony
];

// Procedural generator for clean, elegant vintage book spines
function createVintageSpineTexture(paletteIndex: number, titleIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const pal = LEATHER_PALETTES[paletteIndex % LEATHER_PALETTES.length];
  const title = VINTAGE_TITLES[titleIndex % VINTAGE_TITLES.length];

  // Smooth cylindrical leather gradient
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
  library.name = 'virtual-library';

  // 1. Textures & Materials
  const woodTexture = createWoodTexture();
  const parquetTexture = createParquetTexture();
  const paperEdgeTexture = createPaperEdgeTexture();
  const blotterTexture = createDeskBlotterTexture();

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

  const floorMat = new THREE.MeshStandardMaterial({
    map: parquetTexture,
    roughness: 0.5,
    metalness: 0.08
  });

  const backboardMat = new THREE.MeshStandardMaterial({
    color: 0x140a06,
    roughness: 0.94,
    metalness: 0.02
  });

  const paperEdgeMat = new THREE.MeshStandardMaterial({
    map: paperEdgeTexture,
    roughness: 0.95,
    metalness: 0.0
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a054,
    metalness: 0.88,
    roughness: 0.25
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

  // 2. Room Architecture: Parquet Hardwood Floor & Walls
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 14),
    floorMat
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2.25, 0.5);
  library.add(floor);

  // Back Wall
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(22, 10),
    backboardMat
  );
  backWall.position.set(0, 1.2, -2.75);
  library.add(backWall);

  // Left Room Wall
  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    woodMat
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-10.5, 1.2, 0);
  library.add(leftWall);

  // Right Room Wall
  const rightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    woodMat
  );
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(10.5, 1.2, 0);
  library.add(rightWall);

  // Ceiling & Clean Crossbeams
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 14),
    woodMat
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, 4.4, 0.5);
  library.add(ceiling);

  const beamGeo = new THREE.BoxGeometry(22, 0.28, 0.35);
  [-2.2, -0.6, 1.0, 2.6].forEach((bz) => {
    const beam = new THREE.Mesh(beamGeo, woodMat);
    beam.position.set(0, 4.25, bz);
    library.add(beam);
  });

  // 3. Grand 5-Bay Floor-to-Ceiling Bookcase (6 Shelf Levels)
  const shelfYPositions = [4.15, 3.25, 2.15, 1.05, -1.07, -2.15];
  shelfYPositions.forEach((y, idx) => {
    const isCrown = idx === 0;
    const shelfThickness = isCrown ? 0.22 : 0.08;
    const shelfDepth = isCrown ? 1.6 : 1.45;
    const shelf = new THREE.Mesh(
      new THREE.BoxGeometry(19.2, shelfThickness, shelfDepth),
      shelfMat
    );
    shelf.position.set(0, y, -2.1);
    library.add(shelf);
  });

  // 6 Massive Vertical Architectural Columns
  const columnXPositions = [-9.2, -5.2, -1.5, 1.5, 5.2, 9.2];
  columnXPositions.forEach((x) => {
    const col = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 6.4, 1.55),
      woodMat
    );
    col.position.set(x, 1.0, -2.05);
    library.add(col);
  });

  // Crown Cornice Header
  const crownHeader = new THREE.Mesh(
    new THREE.BoxGeometry(19.6, 0.35, 1.7),
    woodMat
  );
  crownHeader.position.set(0, 4.3, -2.02);
  library.add(crownHeader);

  // Helper to create a single clean 3D vintage book
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

  // Populate shelf section with clean, orderly, dignified books (NO messy jagged spikes!)
  function fillShelf(
    shelfY: number,
    xStart: number,
    xEnd: number,
    baseH: number,
    skipCenterSlot = false
  ) {
    let curX = xStart;
    let bIdx = Math.floor(Math.random() * 8);

    while (curX < xEnd) {
      if (skipCenterSlot && curX > -0.11 && curX < 0.11) {
        curX = 0.11;
        continue;
      }

      const bookW = 0.078 + Math.random() * 0.024;
      // Harmonious, dignified heights with subtle 2-3% natural variance
      const bookH = baseH + (Math.random() - 0.5) * 0.05;
      const bookD = 1.15;

      const book = createShelfBook(bookW, bookH, bookD, bIdx, bIdx);
      const bY = shelfY + 0.04 + bookH / 2;
      const bZ = -2.1;

      book.position.set(curX + bookW / 2, bY, bZ);
      library.add(book);

      curX += bookW + 0.006;
      bIdx++;
    }
  }

  // 4. Fill Shelves Across All 5 Bays and All Tiers in Dignified Rows!
  const bays: [number, number][] = [
    [-9.0, -5.3],
    [-5.1, -1.6],
    [-1.42, 1.42], // Center Bay (holds Bishal's book!)
    [1.6, 5.1],
    [5.3, 9.0]
  ];

  // Tier 1: Eye-level Feature Shelf (Y = -1.07) -> H = 1.98 to fit Bishal's book!
  bays.forEach(([x1, x2], idx) => {
    const isCenter = idx === 2;
    fillShelf(-1.07, x1, x2, 1.98, isCenter);
  });

  // Tier 2: Mid Shelf (Y = 1.05 to 2.15)
  bays.forEach(([x1, x2]) => {
    fillShelf(1.05, x1, x2, 1.02);
  });

  // Tier 3: Upper Shelf (Y = 2.15 to 3.25)
  bays.forEach(([x1, x2]) => {
    fillShelf(2.15, x1, x2, 1.02);
  });

  // Tier 4: Gallery Shelf (Y = 3.25 to 4.15)
  bays.forEach(([x1, x2]) => {
    fillShelf(3.25, x1, x2, 0.84);
  });

  // Tier 0: Bottom Base Shelf (Y = -2.15 to -1.07)
  bays.forEach(([x1, x2]) => {
    fillShelf(-2.15, x1, x2, 0.98);
  });

  // 5. Classic Rolling Library Ladder (Oxford Style)
  const ladderGroup = new THREE.Group();
  ladderGroup.position.set(3.4, 0, 0);

  // Upper Brass Guide Rail running across the bookcase
  const railGeo = new THREE.CylinderGeometry(0.024, 0.024, 18.5, 16);
  const brassRail = new THREE.Mesh(railGeo, brassMat);
  brassRail.rotation.z = Math.PI / 2;
  brassRail.position.set(0, 2.3, -1.35);
  library.add(brassRail);

  // Brass rail brackets
  [-7.0, -3.5, 0, 3.5, 7.0].forEach((bx) => {
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.4), brassMat);
    bracket.position.set(bx, 2.3, -1.55);
    library.add(bracket);
  });

  // Wooden Ladder: 2 leaning stringers + 11 rungs
  const ladderH = 4.7;
  const stringerGeo = new THREE.BoxGeometry(0.06, ladderH, 0.12);
  const leftStringer = new THREE.Mesh(stringerGeo, woodMat);
  const rightStringer = new THREE.Mesh(stringerGeo, woodMat);

  const ladderAngle = 0.18;
  leftStringer.rotation.x = ladderAngle;
  rightStringer.rotation.x = ladderAngle;
  leftStringer.position.set(-0.28, 0.08, -1.0);
  rightStringer.position.set(0.28, 0.08, -1.0);
  ladderGroup.add(leftStringer, rightStringer);

  for (let r = 0; r < 11; r++) {
    const rungY = -1.9 + r * 0.38;
    const rungZ = -0.65 - r * 0.068;
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.56, 12), woodMat);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(0, rungY, rungZ);
    ladderGroup.add(rung);
  }

  const wheelGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
  const leftWheel = new THREE.Mesh(wheelGeo, brassMat);
  const rightWheel = new THREE.Mesh(wheelGeo, brassMat);
  leftWheel.rotation.z = Math.PI / 2;
  rightWheel.rotation.z = Math.PI / 2;
  leftWheel.position.set(-0.28, -2.18, -0.6);
  rightWheel.position.set(0.28, -2.18, -0.6);
  ladderGroup.add(leftWheel, rightWheel);

  library.add(ladderGroup);

  // 6. Clean, Dignified Executive Study Desk in the Foreground
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, 0);

  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(5.4, 0.09, 1.45),
    shelfMat
  );
  deskTop.position.set(0, -1.32, -0.85);
  deskGroup.add(deskTop);

  const deskApron = new THREE.Mesh(
    new THREE.BoxGeometry(5.1, 0.14, 1.25),
    woodMat
  );
  deskApron.position.set(0, -1.43, -0.85);
  deskGroup.add(deskApron);

  const legGeo = new THREE.CylinderGeometry(0.06, 0.04, 0.86, 16);
  const legPositions: [number, number][] = [
    [-2.45, -0.35],
    [2.45, -0.35],
    [-2.45, -1.35],
    [2.45, -1.35]
  ];
  legPositions.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(legGeo, woodMat);
    leg.position.set(lx, -1.82, lz);
    deskGroup.add(leg);

    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.06, 16), brassMat);
    ferrule.position.set(lx, -2.22, lz);
    deskGroup.add(ferrule);
  });

  const blotterMat = new THREE.MeshStandardMaterial({
    map: blotterTexture,
    roughness: 0.55,
    metalness: 0.1
  });
  const blotter = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.012, 0.9),
    blotterMat
  );
  blotter.position.set(0, -1.27, -0.82);
  deskGroup.add(blotter);

  library.add(deskGroup);

  // 7. Warm Atmospheric Library Lighting (Clean, glare-free, cohesive)
  const chandelierFill = new THREE.PointLight(0xffecd0, 1.5, 14);
  chandelierFill.position.set(0, 3.4, 0.6);
  library.add(chandelierFill);

  const leftWingLight = new THREE.PointLight(0xf59e0b, 1.2, 10);
  leftWingLight.position.set(-4.5, 1.2, -0.8);
  library.add(leftWingLight);

  const rightWingLight = new THREE.PointLight(0xf59e0b, 1.2, 10);
  rightWingLight.position.set(4.5, 1.2, -0.8);
  library.add(rightWingLight);

  // Dedicated Warm Accent Spotlight focused right on Bishal's book
  const featureSpot = new THREE.SpotLight(0xfffaed, 2.0, 9.0, Math.PI / 3.6, 0.4);
  featureSpot.position.set(0, 2.2, -0.3);
  featureSpot.target.position.set(0, -0.04, -2.0);
  library.add(featureSpot);
  library.add(featureSpot.target);

  return library;
}
