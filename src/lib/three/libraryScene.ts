import * as THREE from 'three';

// ============================================================================
// Procedural Textures for Grand Library Architecture
// ============================================================================

// 1. Rich dark polished walnut / mahogany wood grain
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, '#241209');
  grad.addColorStop(0.25, '#32190e');
  grad.addColorStop(0.5, '#2a140a');
  grad.addColorStop(0.75, '#361c10');
  grad.addColorStop(1, '#200f07');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Natural linear wood fibers
  for (let y = 0; y < 512; y += 2) {
    const wave = Math.sin(y * 0.03) * 6 + Math.sin(y * 0.015) * 12;
    const alpha = 0.05 + Math.sin(y * 0.12 + wave * 0.06) * 0.03;
    ctx.fillStyle = `rgba(82, 44, 24, ${Math.max(0, alpha)})`;
    ctx.fillRect(0, y, 512, 1.5);
  }

  // Soft edge bevel shadow
  const vGrad = ctx.createLinearGradient(0, 0, 0, 512);
  vGrad.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
  vGrad.addColorStop(0.08, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(0.92, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(1, 'rgba(0, 0, 0, 0.32)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 2. Classical herringbone dark oak parquet flooring
function createParquetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#180c06';
  ctx.fillRect(0, 0, 512, 512);

  const plankW = 64;
  const plankH = 128;
  const tones = ['#201008', '#26140b', '#1e0e07', '#2a160d', '#221109'];

  for (let x = 0; x < 512; x += plankW) {
    for (let y = 0; y < 512; y += plankH) {
      const tone = tones[((x / plankW + y / plankH) * 3) % tones.length];
      ctx.fillStyle = tone;
      ctx.fillRect(x + 1, y + 1, plankW - 2, plankH - 2);

      // Subtle plank wood grain
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(x + 1, y + plankH - 3, plankW - 2, 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.fillRect(x + 1, y + 1, plankW - 2, 1.5);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 3. Stately burgundy & gold runner carpet down the central aisle
function createCarpetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#2d080e';
  ctx.fillRect(0, 0, 256, 512);

  ctx.fillStyle = '#c89544';
  ctx.fillRect(12, 0, 5, 512);
  ctx.fillRect(239, 0, 5, 512);

  ctx.strokeStyle = 'rgba(235, 195, 115, 0.65)';
  ctx.lineWidth = 2;
  ctx.strokeRect(26, 0, 204, 512);

  for (let y = 32; y < 512; y += 64) {
    ctx.strokeStyle = 'rgba(212, 163, 89, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(128, y - 20);
    ctx.lineTo(158, y);
    ctx.lineTo(128, y + 20);
    ctx.lineTo(98, y);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#d4a359';
    ctx.beginPath();
    ctx.arc(128, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 3);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 4. Grand Palladian Gothic arched window with cool moonlit twilight glow
function createWindowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const sky = ctx.createLinearGradient(0, 0, 0, 512);
  sky.addColorStop(0, '#0a1020');
  sky.addColorStop(0.35, '#121e3a');
  sky.addColorStop(0.7, '#1b2b4e');
  sky.addColorStop(1, '#24355a');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 512, 512);

  const moonGrad = ctx.createRadialGradient(256, 160, 10, 256, 160, 220);
  moonGrad.addColorStop(0, 'rgba(215, 235, 255, 0.85)');
  moonGrad.addColorStop(0.25, 'rgba(170, 205, 250, 0.45)');
  moonGrad.addColorStop(0.65, 'rgba(100, 150, 220, 0.15)');
  moonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = moonGrad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#120c08';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(256, 256, 230, Math.PI, 0, false);
  ctx.stroke();

  const mullions = [128, 192, 256, 320, 384];
  mullions.forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 256);
    ctx.lineTo(x, 512);
    ctx.stroke();
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 5. Ornate wrought-iron / brass filigree balustrade railing
function createBalustradeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 128);

  ctx.fillStyle = '#caa15b';
  ctx.fillRect(0, 4, 512, 10);
  ctx.fillStyle = '#fbe39d';
  ctx.fillRect(0, 4, 512, 3);

  ctx.fillStyle = '#22150b';
  ctx.fillRect(0, 114, 512, 10);

  for (let x = 16; x < 512; x += 32) {
    ctx.fillStyle = '#8a6833';
    ctx.fillRect(x + 2, 14, 4, 100);

    ctx.fillStyle = '#e8c47b';
    ctx.beginPath();
    ctx.arc(x + 4, 64, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#241407';
    ctx.beginPath();
    ctx.arc(x + 4, 64, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(4, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 6. Creamy book page deckle edge texture
function createPaperEdgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ece3d2';
  ctx.fillRect(0, 0, 128, 128);

  for (let y = 0; y < 128; y += 3) {
    ctx.fillStyle = 'rgba(135, 100, 68, 0.16)';
    ctx.fillRect(0, y, 128, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Classical vintage book titles for authentic library spines
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
  { base: '#3b1219', dark: '#180407', gold: '#e2ba71' }, // Burgundy Morocco
  { base: '#102a1d', dark: '#06130c', gold: '#e4c379' }, // Antique Hunter Green
  { base: '#132233', dark: '#070e17', gold: '#dfbe75' }, // Midnight Navy
  { base: '#3c2212', dark: '#1c0e07', gold: '#e6c882' }, // Cognac Leather
  { base: '#48341a', dark: '#22170b', gold: '#ebd18e' }, // Aged Ochre
  { base: '#28172d', dark: '#100913', gold: '#e2be72' }, // Imperial Plum
  { base: '#2d190e', dark: '#140b06', gold: '#dfba6f' }, // Deep Mahogany
  { base: '#1a1918', dark: '#0a0a09', gold: '#d5ae63' }  // Antique Ebony
];

// Clean procedural vintage book spine texture
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

  const ribYs = [65, 155, 260, 365, 450];
  ribYs.forEach((ry) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(6, ry + 4, 116, 4);
    ctx.fillStyle = pal.gold;
    ctx.fillRect(6, ry, 116, 5);
    ctx.fillStyle = '#fff0ba';
    ctx.fillRect(6, ry, 116, 2);
  });

  ctx.strokeStyle = pal.gold;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(10, 12, 108, 488);

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

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Grand 3D Library Scene Constructor
// ============================================================================
export function createLibraryScene(): THREE.Group {
  const library = new THREE.Group();
  library.name = 'grand-library-hall';

  // 1. Core Architectural Materials
  const woodTexture = createWoodTexture();
  const parquetTexture = createParquetTexture();
  const carpetTexture = createCarpetTexture();
  const windowTexture = createWindowTexture();
  const balustradeTexture = createBalustradeTexture();
  const paperEdgeTexture = createPaperEdgeTexture();

  const woodMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.65,
    metalness: 0.08
  });

  const shelfMat = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.6,
    metalness: 0.06
  });

  const backboardMat = new THREE.MeshStandardMaterial({
    color: 0x140b06,
    roughness: 0.95,
    metalness: 0.02
  });

  const floorMat = new THREE.MeshStandardMaterial({
    map: parquetTexture,
    roughness: 0.5,
    metalness: 0.12
  });

  const carpetMat = new THREE.MeshStandardMaterial({
    map: carpetTexture,
    roughness: 0.85,
    metalness: 0.02
  });

  const windowMat = new THREE.MeshBasicMaterial({
    map: windowTexture
  });

  const balustradeMat = new THREE.MeshStandardMaterial({
    map: balustradeTexture,
    transparent: true,
    alphaTest: 0.25,
    roughness: 0.45,
    metalness: 0.65,
    side: THREE.DoubleSide
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a559,
    roughness: 0.32,
    metalness: 0.88
  });

  const emeraldMat = new THREE.MeshStandardMaterial({
    color: 0x0c6837,
    emissive: 0x084223,
    emissiveIntensity: 0.5,
    roughness: 0.22,
    metalness: 0.15
  });

  const paperEdgeMat = new THREE.MeshStandardMaterial({
    map: paperEdgeTexture,
    roughness: 0.95,
    metalness: 0.0
  });

  // Pre-generate pool of vintage spine materials
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

  // 2. Room Architecture (Floor, Ceiling, Walls)
  // Polished parquet floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 18),
    floorMat
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2.4, 0);
  library.add(floor);

  // Stately velvet runner carpet leading to the center showcase
  const runner = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 12),
    carpetMat
  );
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(0, -2.39, 0.8);
  library.add(runner);

  // Coffered Vaulted Ceiling overhead
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 18),
    woodMat
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, 5.0, 0);
  library.add(ceiling);

  // Ceiling transverse oak beams
  for (let z = -6; z <= 3; z += 2.2) {
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(22, 0.32, 0.36),
      woodMat
    );
    beam.position.set(0, 4.84, z);
    library.add(beam);
  }

  // Rear Architectural Wall with Palladian Arched Window
  const rearWall = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 8.5),
    backboardMat
  );
  rearWall.position.set(0, 1.4, -4.5);
  library.add(rearWall);

  // Grand Palladian Gothic Window in the background
  const grandWindow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 6.5),
    windowMat
  );
  grandWindow.position.set(0, 2.6, -4.48);
  library.add(grandWindow);

  // 3. Central Grand Multi-Tier Library Bookcase
  const caseWidth = 14.8;
  const caseBackZ = -2.85;

  // Bookcase backboard
  const caseBack = new THREE.Mesh(
    new THREE.PlaneGeometry(caseWidth, 6.8),
    backboardMat
  );
  caseBack.position.set(0, 0.9, caseBackZ);
  library.add(caseBack);

  // Horizontal Tiers of Stately Walnut Shelves:
  const shelfYPositions = [
    { y: -2.35, d: 1.4, h: 0.16 }, // Ground tier base
    { y: -1.13, d: 1.4, h: 0.14 }, // Hero shelf base
    { y: 1.15, d: 1.7, h: 0.16 },  // Mezzanine gallery walkway
    { y: 2.45, d: 1.35, h: 0.12 }, // Upper gallery shelf
    { y: 3.85, d: 1.5, h: 0.22 }   // Top carved crown molding
  ];

  shelfYPositions.forEach((s) => {
    const shelfMesh = new THREE.Mesh(
      new THREE.BoxGeometry(caseWidth, s.h, s.d),
      shelfMat
    );
    shelfMesh.position.set(0, s.y, -2.05);
    library.add(shelfMesh);
  });

  // Elevated Mahogany Pedestal / Lectern Plinth exclusively for Bishal's Glowing Book
  const pedestal = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.14, 1.35),
    woodMat
  );
  pedestal.position.set(0, -1.06, -2.05);
  library.add(pedestal);

  // Gilded brass trim around the pedestal top
  const pedTrim = new THREE.Mesh(
    new THREE.BoxGeometry(1.64, 0.02, 1.39),
    brassMat
  );
  pedTrim.position.set(0, -0.99, -2.05);
  library.add(pedTrim);

  // Upper Gallery Balustrade Railing running across the mezzanine level
  const balustrade = new THREE.Mesh(
    new THREE.PlaneGeometry(caseWidth, 0.72),
    balustradeMat
  );
  balustrade.position.set(0, 1.62, -1.22);
  library.add(balustrade);

  // Vertical Architectural Columns / Fluted Pilasters
  const pillarXPositions = [-7.1, -2.6, 2.6, 7.1];
  pillarXPositions.forEach((px) => {
    const column = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 6.4, 1.4),
      woodMat
    );
    column.position.set(px, 0.8, -2.05);
    library.add(column);

    const capBottom = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.22, 1.46),
      woodMat
    );
    capBottom.position.set(px, -2.25, -2.05);
    library.add(capBottom);

    const capTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.26, 1.52),
      woodMat
    );
    capTop.position.set(px, 3.82, -2.05);
    library.add(capTop);
  });

  // Arches crowning the 3 bays at the top
  const archBays = [-4.85, 0, 4.85];
  archBays.forEach((ax) => {
    const archBeam = new THREE.Mesh(
      new THREE.BoxGeometry(4.7, 0.18, 1.36),
      woodMat
    );
    archBeam.position.set(ax, 3.65, -2.05);
    library.add(archBeam);
  });

  // Side Wing Bookcases (Flanking Left & Right receding in perspective)
  const leftWing = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 6.4, 6.0),
    woodMat
  );
  leftWing.position.set(-8.0, 0.8, 0.6);
  library.add(leftWing);

  const rightWing = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 6.4, 6.0),
    woodMat
  );
  rightWing.position.set(8.0, 0.8, 0.6);
  library.add(rightWing);

  // 4. Foreground Classical Library Study Tables with Glowing Banker's Lamps
  function createStudyTable(tx: number, tz: number) {
    const tableGroup = new THREE.Group();
    tableGroup.position.set(tx, 0, tz);

    // Polished dark mahogany tabletop
    const tabletop = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.08, 1.3),
      woodMat
    );
    tabletop.position.set(0, -1.48, 0);
    tableGroup.add(tabletop);

    // 4 Carved table legs down to the parquet floor (-2.4)
    const legGeo = new THREE.CylinderGeometry(0.045, 0.035, 0.88, 12);
    const legOffsets = [
      [-1.05, -0.5],
      [1.05, -0.5],
      [-1.05, 0.5],
      [1.05, 0.5]
    ];
    legOffsets.forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, woodMat);
      leg.position.set(lx, -1.96, lz);
      tableGroup.add(leg);

      // Brass foot ferrule
      const ferrule = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.045, 0.06, 12),
        brassMat
      );
      ferrule.position.set(lx, -2.37, lz);
      tableGroup.add(ferrule);
    });

    // Dark leather desk blotter pad with gold border
    const blotter = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.015, 0.8),
      new THREE.MeshStandardMaterial({
        color: 0x1f140e,
        roughness: 0.75,
        metalness: 0.05
      })
    );
    blotter.position.set(0, -1.435, 0.05);
    tableGroup.add(blotter);

    // Stack of 2 antique books resting flat on table
    const flatBook1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.06, 0.6),
      spineMaterials[1]
    );
    flatBook1.position.set(0.65, -1.41, -0.15);
    flatBook1.rotation.y = 0.12;
    tableGroup.add(flatBook1);

    const flatBook2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.055, 0.55),
      spineMaterials[3]
    );
    flatBook2.position.set(0.63, -1.35, -0.14);
    flatBook2.rotation.y = -0.08;
    tableGroup.add(flatBook2);

    // Iconic Emerald Green Banker's Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-0.55, -1.44, -0.18);

    // Brass tiered base
    const lampBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.13, 0.03, 16),
      brassMat
    );
    lampGroup.add(lampBase);

    // Curved brass arm
    const lampStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.32, 12),
      brassMat
    );
    lampStem.position.set(0, 0.16, 0);
    lampGroup.add(lampStem);

    const lampArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.22, 12),
      brassMat
    );
    lampArm.rotation.z = Math.PI / 2;
    lampArm.position.set(0, 0.32, 0);
    lampGroup.add(lampArm);

    // Emerald glass curved hood / lampshade
    const shade = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.11, 0.15),
      emeraldMat
    );
    shade.position.set(0, 0.3, 0);
    lampGroup.add(shade);

    // Dedicated warm amber pool of light from the banker's lamp
    const lampLight = new THREE.PointLight(0xffdf88, 1.8, 5.0);
    lampLight.position.set(0, 0.24, 0.05);
    lampGroup.add(lampLight);

    tableGroup.add(lampGroup);
    library.add(tableGroup);
  }

  // Left & Right Library Study Tables flanking the central carpet aisle
  createStudyTable(-3.6, 0.6);
  createStudyTable(3.6, 0.6);

  // 5. Curated Antique Books with Generous Blank Spaces (Clean & Spacious)
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
      spineMat,      // +Z (spine facing library!)
      coverMat       // -Z
    ];

    return new THREE.Mesh(geo, materials);
  }

  // Helper to add a small, orderly cluster of books (4 to 7 books) with breathing room
  function addCuratedBookCluster(
    baseY: number,
    startX: number,
    count: number,
    bIdxStart: number,
    targetHeight = 1.25
  ) {
    let curX = startX;
    for (let i = 0; i < count; i++) {
      const bookW = 0.075 + (i % 3) * 0.015;
      const bookH = targetHeight + (Math.sin(i * 1.8) * 0.08);
      const bookD = 0.95;

      const book = createShelfBook(bookW, bookH, bookD, bIdxStart + i, bIdxStart + i);
      const bY = baseY + 0.07 + bookH / 2;
      const bZ = -2.05;

      book.position.set(curX + bookW / 2, bY, bZ);
      library.add(book);

      curX += bookW + 0.008;
    }
  }

  // --- Tier 1: Main Center Showcase Tier (-1.13) ---
  // Bishal's grand book sits at X = 0 (Height = 1.98, Elevated on pedestal to Y = 0.0)
  // Generous blank open space around Bishal's book from X = -1.5 to +1.5!
  
  // Left side curated clusters with blank gaps
  addCuratedBookCluster(-1.13, -2.5, 6, 0, 1.28); // Cluster near center gap
  addCuratedBookCluster(-1.13, -4.6, 7, 6, 1.34); // Cluster in left bay
  addCuratedBookCluster(-1.13, -6.6, 5, 2, 1.22); // Cluster near outer pillar

  // Right side curated clusters with blank gaps
  addCuratedBookCluster(-1.13, 1.6, 6, 4, 1.28);  // Cluster near center gap
  addCuratedBookCluster(-1.13, 3.4, 7, 1, 1.34);  // Cluster in right bay
  addCuratedBookCluster(-1.13, 5.5, 5, 5, 1.22);  // Cluster near outer pillar

  // --- Tier 0: Ground Level Tier (-2.35) ---
  addCuratedBookCluster(-2.35, -5.8, 6, 3, 1.1);
  addCuratedBookCluster(-2.35, -1.8, 7, 7, 1.15);
  addCuratedBookCluster(-2.35, 1.2, 7, 0, 1.15);
  addCuratedBookCluster(-2.35, 4.8, 6, 4, 1.1);

  // --- Tier 2: Upper Gallery Mezzanine (+1.15) ---
  addCuratedBookCluster(1.15, -5.6, 6, 5, 1.05);
  addCuratedBookCluster(1.15, -1.8, 6, 1, 1.08);
  addCuratedBookCluster(1.15, 1.2, 6, 6, 1.08);
  addCuratedBookCluster(1.15, 4.8, 6, 2, 1.05);

  // --- Tier 3: High Arch Attic Tier (+2.45) ---
  addCuratedBookCluster(2.45, -4.5, 5, 4, 0.95);
  addCuratedBookCluster(2.45, -0.8, 6, 0, 0.98);
  addCuratedBookCluster(2.45, 3.6, 5, 3, 0.95);

  // 6. Atmospheric Grand Library Lighting
  // Hanging Brass Pendant Lanterns casting warm light from ceiling
  const lanternPositions = [
    [-3.6, 3.4, -0.5],
    [3.6, 3.4, -0.5]
  ];

  lanternPositions.forEach(([lx, ly, lz]) => {
    const chain = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 1.6, 8),
      brassMat
    );
    chain.position.set(lx, ly + 0.8, lz);
    library.add(chain);

    const lanternCage = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.18, 0.45, 6),
      brassMat
    );
    lanternCage.position.set(lx, ly, lz);
    library.add(lanternCage);

    const lanternLight = new THREE.PointLight(0xffdf99, 1.6, 12.0);
    lanternLight.position.set(lx, ly - 0.1, lz);
    library.add(lanternLight);
  });

  // Warm library ambient fill
  const ambientWarm = new THREE.PointLight(0xffe2b8, 1.4, 14.0);
  ambientWarm.position.set(0, 2.2, 0.2);
  library.add(ambientWarm);

  // Cool moonlit blue twilight from Palladian window
  const moonLight = new THREE.PointLight(0x7da4d9, 1.2, 12.0);
  moonLight.position.set(0, 2.8, -3.8);
  library.add(moonLight);

  // Dedicated Warm Accent Spotlight focused right on Bishal's centerpiece book
  const featureSpot = new THREE.SpotLight(0xfffaed, 1.9, 9.5, Math.PI / 3.4, 0.4);
  featureSpot.position.set(0, 2.5, -0.2);
  featureSpot.target.position.set(0, 0.0, -2.05);
  library.add(featureSpot);
  library.add(featureSpot.target);

  return library;
}
