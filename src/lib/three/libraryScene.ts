import * as THREE from 'three';

// Procedural texture generator for rich dark polished mahogany / walnut wood grain
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, '#211007');
  grad.addColorStop(0.28, '#2e170c');
  grad.addColorStop(0.72, '#28140a');
  grad.addColorStop(1, '#1c0c05');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  for (let y = 0; y < 512; y++) {
    const wave = Math.sin(y * 0.038) * 7 + Math.sin(y * 0.016) * 16;
    const alpha = 0.05 + Math.sin(y * 0.16 + wave * 0.09) * 0.035;
    ctx.fillStyle = `rgba(62, 32, 16, ${Math.max(0, alpha)})`;
    ctx.fillRect(0, y, 512, 1);
  }

  for (let i = 0; i < 300; i++) {
    const y = Math.random() * 512;
    const h = 1 + Math.random() * 2.5;
    ctx.fillStyle = Math.random() > 0.45 ? 'rgba(10, 5, 2, 0.38)' : 'rgba(96, 52, 26, 0.22)';
    ctx.fillRect(0, y, 512, h);
  }

  const vGrad = ctx.createLinearGradient(0, 0, 0, 512);
  vGrad.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
  vGrad.addColorStop(0.08, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(0.92, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(1, 'rgba(0, 0, 0, 0.38)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Procedural bump map for tactile wood grain micro-relief
function createWoodBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y++) {
    const wave = Math.sin(y * 0.08) * 4;
    const val = 128 + Math.floor(Math.sin(y * 0.35 + wave) * 35);
    ctx.fillStyle = `rgb(${val},${val},${val})`;
    ctx.fillRect(0, y, 256, 1);
  }

  for (let i = 0; i < 150; i++) {
    const y = Math.random() * 256;
    ctx.fillStyle = Math.random() > 0.5 ? '#a0a0a0' : '#606060';
    ctx.fillRect(0, y, 256, 1.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  return tex;
}

// Procedural texture generator for parquet hardwood floor
function createParquetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1e0e06';
  ctx.fillRect(0, 0, 512, 512);

  const plankW = 64;
  const plankH = 128;
  for (let x = 0; x < 512; x += plankW) {
    for (let y = 0; y < 512; y += plankH) {
      const isAlt = ((x / plankW) + (y / plankH)) % 2 === 0;
      ctx.fillStyle = isAlt ? '#2a140a' : '#220f06';
      ctx.fillRect(x + 1, y + 1, plankW - 2, plankH - 2);

      for (let py = y + 2; py < y + plankH - 2; py += 3) {
        ctx.fillStyle = 'rgba(55, 28, 12, 0.25)';
        ctx.fillRect(x + 1, py, plankW - 2, 1.5);
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

// Procedural texture for aged book page deckle edges
function createPaperEdgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#e8d6b5';
  ctx.fillRect(0, 0, 128, 128);

  for (let y = 0; y < 128; y += 2) {
    const alpha = 0.12 + Math.random() * 0.2;
    ctx.fillStyle = `rgba(130, 98, 68, ${alpha})`;
    ctx.fillRect(0, y, 128, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Procedural texture for leather desk blotter pad with gold-tooled filigree border
function createDeskBlotterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1c090d';
  ctx.fillRect(0, 0, 512, 256);

  for (let i = 0; i < 600; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.18)';
    ctx.fillRect(x, y, 2, 2);
  }

  ctx.strokeStyle = '#cda158';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 480, 224);
  ctx.strokeStyle = 'rgba(235, 195, 120, 0.55)';
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

// Ambient occlusion shadow strip for under-shelf depth
function createShelfShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 64);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.88)');
  grad.addColorStop(0.3, 'rgba(12, 6, 3, 0.55)');
  grad.addColorStop(0.7, 'rgba(12, 6, 3, 0.18)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// Volumetric light ray gradient texture
function createLightBeamTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, 'rgba(255, 230, 160, 0.65)');
  grad.addColorStop(0.2, 'rgba(255, 210, 120, 0.35)');
  grad.addColorStop(0.7, 'rgba(240, 180, 80, 0.15)');
  grad.addColorStop(1, 'rgba(200, 140, 50, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 512);

  const tex = new THREE.CanvasTexture(canvas);
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
  'BIBLIOTHECA NOCTIS',
  'RHETORICA CLASSICA',
  'DE RERVM NATVRA'
];

// Rich antique leather color palettes
const LEATHER_PALETTES = [
  { base: '#3b0e14', dark: '#1b0508', gold: '#dfb76c' },
  { base: '#102a1b', dark: '#08170e', gold: '#e4c379' },
  { base: '#111f2f', dark: '#080f18', gold: '#dfbe75' },
  { base: '#3d2010', dark: '#1f1008', gold: '#e6c882' },
  { base: '#4a3518', dark: '#261b0c', gold: '#ebd18e' },
  { base: '#25152a', dark: '#120a14', gold: '#e2be72' },
  { base: '#2d1810', dark: '#160b07', gold: '#dfba6f' },
  { base: '#1a1917', dark: '#0c0b0a', gold: '#d5ae63' }
];

// Procedural generator for vintage book spine textures
function createVintageSpineTexture(paletteIndex: number, titleIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const pal = LEATHER_PALETTES[paletteIndex % LEATHER_PALETTES.length];
  const title = VINTAGE_TITLES[titleIndex % VINTAGE_TITLES.length];

  const bgGrad = ctx.createLinearGradient(0, 0, 128, 0);
  bgGrad.addColorStop(0, pal.dark);
  bgGrad.addColorStop(0.2, pal.base);
  bgGrad.addColorStop(0.5, pal.base);
  bgGrad.addColorStop(0.8, pal.base);
  bgGrad.addColorStop(1, pal.dark);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 128, 512);

  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 512;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.14)';
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const ribYs = [65, 155, 260, 365, 450];
  ribYs.forEach((ry) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(6, ry + 5, 116, 4);
    ctx.fillStyle = pal.gold;
    ctx.fillRect(6, ry, 116, 5);
    ctx.fillStyle = '#fff0ba';
    ctx.fillRect(6, ry, 116, 2);
    for (let dx = 12; dx < 114; dx += 8) {
      ctx.fillStyle = 'rgba(40, 20, 5, 0.7)';
      ctx.fillRect(dx, ry + 1.5, 2, 2);
    }
  });

  ctx.strokeStyle = pal.gold;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(10, 12, 108, 488);

  ctx.fillStyle = pal.gold;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '16px serif';
  ctx.fillText('❖', 64, 38);
  ctx.font = '13px serif';
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

// Bump map for raised spine ribs & embossed crests
function createSpineBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 64, 256);

  const ribYs = [32, 78, 130, 182, 225];
  ribYs.forEach((ry) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, ry, 56, 3);
    ctx.fillStyle = '#404040';
    ctx.fillRect(4, ry + 3, 56, 3);
  });

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export function createLibraryScene(): THREE.Group {
  const library = new THREE.Group();
  library.name = 'virtual-library';

  // 1. Textures & Materials with Bump Mapping
  const woodTexture = createWoodTexture();
  const woodBump = createWoodBumpTexture();
  const parquetTexture = createParquetTexture();
  const paperEdgeTexture = createPaperEdgeTexture();
  const blotterTexture = createDeskBlotterTexture();
  const shelfShadowTexture = createShelfShadowTexture();
  const spineBumpTexture = createSpineBumpTexture();
  const lightBeamTexture = createLightBeamTexture();

  const woodMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    bumpMap: woodBump,
    bumpScale: 0.035,
    roughness: 0.65,
    metalness: 0.08
  });

  const shelfMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    bumpMap: woodBump,
    bumpScale: 0.04,
    roughness: 0.58,
    metalness: 0.08
  });

  const floorMat = new THREE.MeshStandardMaterial({
    map: parquetTexture,
    bumpMap: woodBump,
    bumpScale: 0.03,
    roughness: 0.45,
    metalness: 0.12
  });

  const backboardMat = new THREE.MeshStandardMaterial({
    color: 0x120905,
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
    roughness: 0.22
  });

  const shadowStripMat = new THREE.MeshBasicMaterial({
    map: shelfShadowTexture,
    transparent: true,
    opacity: 0.65,
    depthWrite: false
  });

  // Pre-generate pool of vintage spine materials with bump mapping
  const spineMaterials: THREE.MeshStandardMaterial[] = [];
  for (let i = 0; i < 8; i++) {
    const spineTex = createVintageSpineTexture(i, i);
    spineMaterials.push(
      new THREE.MeshStandardMaterial({
        map: spineTex,
        bumpMap: spineBumpTexture,
        bumpScale: 0.06,
        roughness: 0.52,
        metalness: 0.14
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
  floor.receiveShadow = true;
  library.add(floor);

  // Back Wall
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(22, 10),
    backboardMat
  );
  backWall.position.set(0, 1.2, -2.75);
  backWall.receiveShadow = true;
  library.add(backWall);

  // Left Room Wall
  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    woodMat
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-10.5, 1.2, 0);
  leftWall.receiveShadow = true;
  library.add(leftWall);

  // Right Room Wall
  const rightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    woodMat
  );
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(10.5, 1.2, 0);
  rightWall.receiveShadow = true;
  library.add(rightWall);

  // Ceiling & Heavy Crossbeams
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
    shelf.receiveShadow = true;
    shelf.castShadow = true;
    library.add(shelf);

    // Deep ambient occlusion shadow strip right beneath each shelf board
    if (idx < shelfYPositions.length - 1) {
      const shadowStrip = new THREE.Mesh(
        new THREE.PlaneGeometry(19.0, 0.35),
        shadowStripMat
      );
      shadowStrip.position.set(0, y - shelfThickness / 2 - 0.175, -2.05);
      library.add(shadowStrip);
    }
  });

  // 6 Massive Vertical Architectural Columns / Fluted Pilasters
  const columnXPositions = [-9.2, -5.2, -1.5, 1.5, 5.2, 9.2];
  columnXPositions.forEach((x) => {
    const col = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 6.4, 1.55),
      woodMat
    );
    col.position.set(x, 1.0, -2.05);
    col.receiveShadow = true;
    col.castShadow = true;
    library.add(col);
  });

  // Crown Cornice Header
  const crownHeader = new THREE.Mesh(
    new THREE.BoxGeometry(19.6, 0.35, 1.7),
    woodMat
  );
  crownHeader.position.set(0, 4.3, -2.02);
  crownHeader.castShadow = true;
  library.add(crownHeader);

  // Helper to create a single 3D vintage book with shadows
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

    const bookMesh = new THREE.Mesh(geo, materials);
    bookMesh.castShadow = true;
    bookMesh.receiveShadow = true;
    return bookMesh;
  }

  // Populate shelf section with authentic books (including tilts and horizontal stacks!)
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
      if (skipCenterSlot && curX > -0.11 && curX < 0.11) {
        curX = 0.11;
        continue;
      }

      // Horizontal book stack
      if (Math.random() < 0.09 && curX < xEnd - 0.35 && (!skipCenterSlot || Math.abs(curX) > 0.45)) {
        const stackW = 0.22 + Math.random() * 0.06;
        const stackH = 0.055 + Math.random() * 0.02;
        const stackD = 1.1 + Math.random() * 0.15;
        const count = 2 + Math.floor(Math.random() * 2);

        for (let s = 0; s < count; s++) {
          const hBook = createShelfBook(stackW, stackH, stackD, bIdx + s, bIdx + s);
          hBook.position.set(
            curX + stackW / 2 + (Math.random() - 0.5) * 0.015,
            shelfY + 0.04 + stackH / 2 + s * stackH,
            -2.1
          );
          library.add(hBook);
        }
        curX += stackW + 0.012;
        bIdx += count;
        continue;
      }

      const bookW = 0.072 + Math.random() * 0.04;
      const bookH = baseH + (Math.random() - 0.5) * hVar;
      const bookD = 1.15 + Math.random() * 0.15;

      const book = createShelfBook(bookW, bookH, bookD, bIdx, bIdx);
      const bY = shelfY + 0.04 + bookH / 2;
      const bZ = -2.1 + (Math.random() - 0.5) * 0.04;

      const isTilted = Math.random() < 0.12 && curX < xEnd - 0.22;
      const tiltZ = isTilted ? (Math.random() > 0.5 ? 0.038 : -0.038) : 0;

      book.position.set(curX + bookW / 2, bY, bZ);
      book.rotation.z = tiltZ;
      library.add(book);

      curX += bookW + 0.006;
      bIdx++;
    }
  }

  // 4. Fill Shelves Across All 5 Bays and All Tiers!
  const bays: [number, number][] = [
    [-9.0, -5.3],
    [-5.1, -1.6],
    [-1.42, 1.42], // Center Bay
    [1.6, 5.1],
    [5.3, 9.0]
  ];

  // Tier 1: Eye-level Feature Shelf (Y = -1.07)
  bays.forEach(([x1, x2], idx) => {
    const isCenter = idx === 2;
    fillShelf(-1.07, x1, x2, 1.98, 0.12, isCenter);
  });

  // Tier 2: Mid Shelf (Y = 1.05 to 2.15)
  bays.forEach(([x1, x2]) => {
    fillShelf(1.05, x1, x2, 1.02, 0.08);
  });

  // Tier 3: Upper Shelf (Y = 2.15 to 3.25)
  bays.forEach(([x1, x2]) => {
    fillShelf(2.15, x1, x2, 1.02, 0.08);
  });

  // Tier 4: Gallery Shelf (Y = 3.25 to 4.15)
  bays.forEach(([x1, x2]) => {
    fillShelf(3.25, x1, x2, 0.84, 0.06);
  });

  // Tier 0: Bottom Base Shelf (Y = -2.15 to -1.07)
  bays.forEach(([x1, x2]) => {
    fillShelf(-2.15, x1, x2, 0.98, 0.08);
  });

  // 5. Classic Rolling Library Ladder (Oxford Style)
  const ladderGroup = new THREE.Group();
  ladderGroup.position.set(3.4, 0, 0);

  // Upper Brass Guide Rail running across the bookcase
  const railGeo = new THREE.CylinderGeometry(0.024, 0.024, 18.5, 16);
  const brassRail = new THREE.Mesh(railGeo, brassMat);
  brassRail.rotation.z = Math.PI / 2;
  brassRail.position.set(0, 2.3, -1.35);
  brassRail.castShadow = true;
  library.add(brassRail);

  // Brass rail brackets
  [-7.0, -3.5, 0, 3.5, 7.0].forEach((bx) => {
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.4), brassMat);
    bracket.position.set(bx, 2.3, -1.55);
    bracket.castShadow = true;
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
  leftStringer.castShadow = true;
  rightStringer.castShadow = true;
  ladderGroup.add(leftStringer, rightStringer);

  for (let r = 0; r < 11; r++) {
    const rungY = -1.9 + r * 0.38;
    const rungZ = -0.65 - r * 0.068;
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.56, 12), woodMat);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(0, rungY, rungZ);
    rung.castShadow = true;
    ladderGroup.add(rung);
  }

  const wheelGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
  const leftWheel = new THREE.Mesh(wheelGeo, brassMat);
  const rightWheel = new THREE.Mesh(wheelGeo, brassMat);
  leftWheel.rotation.z = Math.PI / 2;
  rightWheel.rotation.z = Math.PI / 2;
  leftWheel.position.set(-0.28, -2.18, -0.6);
  rightWheel.position.set(0.28, -2.18, -0.6);
  leftWheel.castShadow = true;
  rightWheel.castShadow = true;
  ladderGroup.add(leftWheel, rightWheel);

  library.add(ladderGroup);

  // 6. Grand Study Desk in the Foreground
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, 0);

  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.09, 1.4),
    shelfMat
  );
  deskTop.position.set(0, -1.32, -0.85);
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  const deskApron = new THREE.Mesh(
    new THREE.BoxGeometry(4.9, 0.14, 1.22),
    woodMat
  );
  deskApron.position.set(0, -1.43, -0.85);
  deskApron.castShadow = true;
  deskGroup.add(deskApron);

  const legGeo = new THREE.CylinderGeometry(0.06, 0.04, 0.86, 16);
  const legPositions: [number, number][] = [
    [-2.35, -0.35],
    [2.35, -0.35],
    [-2.35, -1.35],
    [2.35, -1.35]
  ];
  legPositions.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(legGeo, woodMat);
    leg.position.set(lx, -1.82, lz);
    leg.castShadow = true;
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
    new THREE.BoxGeometry(2.3, 0.012, 0.88),
    blotterMat
  );
  blotter.position.set(0, -1.27, -0.82);
  blotter.receiveShadow = true;
  deskGroup.add(blotter);

  // Desk accessories
  const deskStackColors = [0x4a181d, 0x182a3c, 0x56381c];
  deskStackColors.forEach((col, sIdx) => {
    const bGeo = new THREE.BoxGeometry(0.55, 0.06, 0.75);
    const bMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.65 });
    const sBook = new THREE.Mesh(bGeo, bMat);
    sBook.position.set(-1.85 + sIdx * 0.01, -1.24 + sIdx * 0.06, -0.82 + sIdx * 0.02);
    sBook.rotation.y = 0.08 - sIdx * 0.04;
    sBook.castShadow = true;
    sBook.receiveShadow = true;
    deskGroup.add(sBook);
  });

  const caddyMat = new THREE.MeshStandardMaterial({ color: 0x221108, roughness: 0.7 });
  const caddyBase = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 0.5), caddyMat);
  caddyBase.position.set(1.85, -1.25, -0.82);
  caddyBase.castShadow = true;
  deskGroup.add(caddyBase);

  for (let cb = 0; cb < 4; cb++) {
    const cbMat = new THREE.MeshStandardMaterial({
      color: LEATHER_PALETTES[(cb + 2) % LEATHER_PALETTES.length].base,
      roughness: 0.6
    });
    const cBook = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.38, 0.44), cbMat);
    cBook.position.set(1.58 + cb * 0.08, -1.04, -0.82);
    cBook.rotation.z = cb === 3 ? -0.1 : 0;
    cBook.castShadow = true;
    deskGroup.add(cBook);
  }

  const specsGroup = new THREE.Group();
  specsGroup.position.set(-0.55, -1.26, -0.65);
  specsGroup.rotation.y = 0.35;

  const rimGeo = new THREE.TorusGeometry(0.045, 0.006, 8, 20);
  const leftRim = new THREE.Mesh(rimGeo, brassMat);
  const rightRim = new THREE.Mesh(rimGeo, brassMat);
  leftRim.rotation.x = Math.PI / 2;
  rightRim.rotation.x = Math.PI / 2;
  leftRim.position.x = -0.06;
  rightRim.position.x = 0.06;

  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.04, 8), brassMat);
  bridge.rotation.z = Math.PI / 2;

  specsGroup.add(leftRim, rightRim, bridge);
  deskGroup.add(specsGroup);

  library.add(deskGroup);

  // 7. Atmospheric Volumetric God Ray (Cone of Golden Light shining down on the Centerpiece)
  const beamMat = new THREE.MeshBasicMaterial({
    map: lightBeamTexture,
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const lightRayGeo = new THREE.CylinderGeometry(0.18, 1.35, 3.2, 24, 1, true);
  const lightBeam = new THREE.Mesh(lightRayGeo, beamMat);
  lightBeam.position.set(0, 1.25, -1.35);
  lightBeam.rotation.x = 0.22; // Angled down towards Bishal's book slot
  library.add(lightBeam);

  // 8. Warm Multi-Layered Library Lighting with Realistic Shadows
  const chandelierFill = new THREE.PointLight(0xffecd0, 1.8, 14);
  chandelierFill.position.set(0, 3.4, 0.6);
  library.add(chandelierFill);

  const leftWingLight = new THREE.PointLight(0xf59e0b, 1.5, 10);
  leftWingLight.position.set(-4.5, 1.2, -0.8);
  library.add(leftWingLight);

  const rightWingLight = new THREE.PointLight(0xf59e0b, 1.5, 10);
  rightWingLight.position.set(4.5, 1.2, -0.8);
  library.add(rightWingLight);

  // Dedicated Warm Accent Spotlight with PCF Soft Shadows focused right on Bishal's book
  const featureSpot = new THREE.SpotLight(0xfffaed, 2.5, 9.0, Math.PI / 3.6, 0.45);
  featureSpot.position.set(0, 2.2, -0.3);
  featureSpot.target.position.set(0, -0.04, -2.0);
  featureSpot.castShadow = true;
  featureSpot.shadow.mapSize.width = 1024;
  featureSpot.shadow.mapSize.height = 1024;
  featureSpot.shadow.bias = -0.0005;
  library.add(featureSpot);
  library.add(featureSpot.target);

  return library;
}
