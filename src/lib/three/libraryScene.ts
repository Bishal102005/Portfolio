import * as THREE from 'three';

// ============================================================================
// Procedural Master Textures for Real Filmic Library Architecture
// ============================================================================

// 1. Photorealistic Aged English Quarter-Sawn Oak Wood Texture
function createOakWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm, rich amber/honey oak gradient base
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  bgGrad.addColorStop(0, '#28150a');
  bgGrad.addColorStop(0.18, '#3c2010');
  bgGrad.addColorStop(0.38, '#4a2915');
  bgGrad.addColorStop(0.62, '#381e0e');
  bgGrad.addColorStop(0.85, '#4e2d18');
  bgGrad.addColorStop(1, '#241208');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Deep longitudinal wood fibers & wavy grain pores
  for (let y = 0; y < 1024; y += 2) {
    const wave = Math.sin(y * 0.02) * 14 + Math.sin(y * 0.007) * 28 + Math.cos(y * 0.04) * 5;
    const tone = Math.sin(y * 0.15 + wave * 0.05);
    const alpha = 0.07 + Math.max(0, tone) * 0.11;
    ctx.fillStyle = `rgba(18, 9, 4, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 1024, 1.6);

    // Warm golden satin varnish highlights on grain ridges
    if (y % 6 === 0) {
      const hlAlpha = 0.035 + Math.sin(y * 0.08 + wave * 0.03) * 0.03;
      if (hlAlpha > 0) {
        ctx.fillStyle = `rgba(235, 175, 105, ${hlAlpha.toFixed(3)})`;
        ctx.fillRect(0, y + 0.5, 1024, 1.0);
      }
    }
  }

  // Medullary rays (quarter-sawn oak ray flecks)
  for (let i = 0; i < 450; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rw = 20 + Math.random() * 65;
    const rh = 1.2 + Math.random() * 2.2;
    ctx.fillStyle = 'rgba(215, 160, 95, 0.06)';
    ctx.fillRect(rx, ry, rw, rh);
  }

  // Organic wood knots and growth rings
  const knots = [
    { x: 260, y: 340, r: 42 },
    { x: 740, y: 680, r: 55 }
  ];
  knots.forEach((k) => {
    for (let r = k.r; r > 4; r -= 3) {
      ctx.strokeStyle = 'rgba(22, 11, 5, 0.14)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(k.x, k.y, r * 1.6, r * 0.75, 0.2, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  // Top and bottom bevel shadow for molded shelf planks
  const vGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  vGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
  vGrad.addColorStop(0.05, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(0.95, 'rgba(0, 0, 0, 0)');
  vGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 2. Classical Herringbone Dark Oak Parquet Flooring
function createParquetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#140a05';
  ctx.fillRect(0, 0, 512, 512);

  const plankW = 64;
  const plankH = 128;
  const tones = ['#1d0e07', '#25130a', '#1a0c06', '#2a160d', '#201008'];

  for (let x = 0; x < 512; x += plankW) {
    for (let y = 0; y < 512; y += plankH) {
      const tone = tones[((x / plankW + y / plankH) * 3) % tones.length];
      ctx.fillStyle = tone;
      ctx.fillRect(x + 1, y + 1, plankW - 2, plankH - 2);

      // Subtle plank wood grain & bevel
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(x + 1, y + plankH - 3, plankW - 2, 2);
      ctx.fillStyle = 'rgba(255, 220, 160, 0.04)';
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

// 3. Stately Burgundy Velvet Runner Carpet
function createCarpetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#26060c';
  ctx.fillRect(0, 0, 256, 512);

  ctx.fillStyle = '#c5923f';
  ctx.fillRect(10, 0, 5, 512);
  ctx.fillRect(241, 0, 5, 512);

  ctx.strokeStyle = 'rgba(235, 195, 115, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 0, 208, 512);

  for (let y = 32; y < 512; y += 64) {
    ctx.strokeStyle = 'rgba(212, 163, 89, 0.35)';
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

// 4. Classical Gothic Window with Cool Moonlit Twilight Glow
function createWindowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const sky = ctx.createLinearGradient(0, 0, 0, 512);
  sky.addColorStop(0, '#070c18');
  sky.addColorStop(0.35, '#0e182e');
  sky.addColorStop(0.7, '#152442');
  sky.addColorStop(1, '#1e3052');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 512, 512);

  const moonGrad = ctx.createRadialGradient(256, 160, 10, 256, 160, 220);
  moonGrad.addColorStop(0, 'rgba(215, 235, 255, 0.85)');
  moonGrad.addColorStop(0.25, 'rgba(160, 195, 245, 0.4)');
  moonGrad.addColorStop(0.65, 'rgba(90, 140, 210, 0.12)');
  moonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = moonGrad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#0f0805';
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

// 5. Deckle Paper Fore-Edge Texture (For Books Facing Paper Out!)
function createDecklePaperEdgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#e5d9be';
  ctx.fillRect(0, 0, 256, 1024);

  // Organic horizontal parchment page strata & fiber ridges
  for (let y = 0; y < 1024; y += 2) {
    const wave = Math.sin(y * 0.1) * 2;
    const shadowAlpha = 0.12 + Math.sin(y * 0.4) * 0.08;
    ctx.fillStyle = `rgba(105, 75, 45, ${shadowAlpha.toFixed(2)})`;
    ctx.fillRect(0, y + wave, 256, 1.2);
  }

  // Worn edges with darker patina
  const edgeGrad = ctx.createLinearGradient(0, 0, 256, 0);
  edgeGrad.addColorStop(0, 'rgba(75, 45, 20, 0.45)');
  edgeGrad.addColorStop(0.12, 'rgba(75, 45, 20, 0)');
  edgeGrad.addColorStop(0.88, 'rgba(75, 45, 20, 0)');
  edgeGrad.addColorStop(1, 'rgba(75, 45, 20, 0.45)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, 256, 1024);

  // Antique binding cords / stitches
  const stitchYs = [180, 420, 660, 860];
  stitchYs.forEach((sy) => {
    ctx.fillStyle = 'rgba(60, 35, 15, 0.65)';
    ctx.fillRect(100, sy, 56, 6);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 6. Engraved Brass Placard for Bishal's Centerpiece Showcase Plinth
function createBrassPlacardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Polished golden brass gradient
  const brassGrad = ctx.createLinearGradient(0, 0, 512, 128);
  brassGrad.addColorStop(0, '#caa257');
  brassGrad.addColorStop(0.25, '#f5dc95');
  brassGrad.addColorStop(0.5, '#deb160');
  brassGrad.addColorStop(0.75, '#fbe6a8');
  brassGrad.addColorStop(1, '#b68c42');
  ctx.fillStyle = brassGrad;
  ctx.fillRect(0, 0, 512, 128);

  // Engraved border bevel
  ctx.strokeStyle = '#5a3d12';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(8, 8, 496, 112);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(12, 12, 488, 104);

  // Classical screw rivets at 4 corners
  const rivets = [
    [24, 24],
    [488, 24],
    [24, 104],
    [488, 104]
  ];
  rivets.forEach(([rx, ry]) => {
    ctx.fillStyle = '#4a300d';
    ctx.beginPath();
    ctx.arc(rx, ry, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f8e4a8';
    ctx.beginPath();
    ctx.arc(rx - 1, ry - 1, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Engraved black lettering with subtle cast highlight
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '700 24px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('B I S H A L   S A H A', 256, 49);
  ctx.fillStyle = '#1c1206';
  ctx.fillText('B I S H A L   S A H A', 256, 47);

  ctx.font = '600 13px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('SELECTED WORKS  •  VOLUME I', 256, 85);
  ctx.fillStyle = '#3a240c';
  ctx.fillText('SELECTED WORKS  •  VOLUME I', 256, 84);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Photorealistic Antique Book Spines (Exact video_frame_02 Reference Styles)
// ============================================================================

interface AntiqueBookConfig {
  style: number; // 0: Emerald Arabesque, 1: Oxblood Gold Ribs, 2: Deckle Paper, 3: Cognac Gilt, 4: Vellum, 5: Midnight Navy
  title: string;
  sub?: string;
  vol?: string;
}

function createAntiqueSpineTexture(cfg: AntiqueBookConfig): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  const { style, title, sub, vol } = cfg;

  if (style === 2) {
    // Style 2 is the deckle paper fore-edge facing out!
    return createDecklePaperEdgeTexture();
  }

  // Base leather palettes
  let baseColor = '#0d281a'; // Emerald
  let darkColor = '#05120b';
  let goldColor = '#e2be74';
  let goldBright = '#fff2be';

  if (style === 1) {
    // Oxblood / Crimson Morocco
    baseColor = '#3b1016';
    darkColor = '#1a0407';
    goldColor = '#e6c278';
    goldBright = '#fff1be';
  } else if (style === 3) {
    // Cognac / Chestnut Leather
    baseColor = '#462412';
    darkColor = '#200e06';
    goldColor = '#e8c57e';
    goldBright = '#fff4ca';
  } else if (style === 4) {
    // Ancient Vellum / Aged Parchment
    baseColor = '#dfd3b8';
    darkColor = '#b8aa8c';
    goldColor = '#4a331a'; // Dark sepia ink
    goldBright = '#2b1b0d';
  } else if (style === 5) {
    // Midnight Royal Navy
    baseColor = '#0f1d30';
    darkColor = '#060c14';
    goldColor = '#e0ba72';
    goldBright = '#fff2be';
  } else if (style === 6) {
    // Antique Ebony
    baseColor = '#18181b';
    darkColor = '#09090a';
    goldColor = '#d9b266';
    goldBright = '#fceec0';
  } else if (style === 7) {
    // Imperial Plum
    baseColor = '#2b132e';
    darkColor = '#110613';
    goldColor = '#e2be75';
    goldBright = '#fff0ba';
  }

  // Realistic rounded spine gradient with deep 3D curve shading
  const bgGrad = ctx.createLinearGradient(0, 0, 256, 0);
  bgGrad.addColorStop(0, darkColor);
  bgGrad.addColorStop(0.12, baseColor);
  bgGrad.addColorStop(0.5, style === 4 ? '#ebe0cb' : baseColor);
  bgGrad.addColorStop(0.88, baseColor);
  bgGrad.addColorStop(1, darkColor);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 256, 1024);

  // Micro leather grain noise & pores
  for (let i = 0; i < 2400; i++) {
    const nx = Math.random() * 256;
    const ny = Math.random() * 1024;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 0, 0, 0.16)' : 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(nx, ny, 2, 2);
  }

  // 5 Raised Hubbed Sewing Ribs (Heavy 3D embossed ribs with gold tooling)
  const ribYs = [130, 310, 520, 720, 890];
  ribYs.forEach((ry) => {
    // Deep cast drop shadow below rib
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(10, ry + 12, 236, 8);

    // Embossed leather rib band
    ctx.fillStyle = baseColor;
    ctx.fillRect(10, ry - 4, 236, 16);

    // Gilded gold bands
    ctx.fillStyle = goldColor;
    ctx.fillRect(10, ry - 1, 236, 7);
    ctx.fillStyle = goldBright;
    ctx.fillRect(10, ry + 1, 236, 2.5);

    // Top highlight rim
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(10, ry - 4, 236, 1.5);
  });

  // Ornate Gilded Borders
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 22, 220, 980);

  ctx.strokeStyle = goldBright;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(24, 28, 208, 968);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Symmetrical Curvilinear Arabesques (Like Cynthia's Journey in video_frame_02!)
  if (style === 0 || style === 7) {
    // Top arabesque floral cartouche
    ctx.fillStyle = goldColor;
    ctx.font = '28px serif';
    ctx.fillText('❧ ✦ ☙', 128, 68);

    // Upper compartment ornate filigree scrollwork
    for (let py = 195; py <= 245; py += 50) {
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(128, py, 26, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(128, py, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = goldBright;
      ctx.beginPath();
      ctx.arc(128, py, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Lower compartment ornate arabesque scrollwork
    for (let py = 780; py <= 830; py += 50) {
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(128, py, 26, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = goldBright;
      ctx.beginPath();
      ctx.arc(128, py, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Classical Gilded Serif Title stamped in central compartment
  ctx.font = '700 24px "Playfair Display", Georgia, serif';
  ctx.fillStyle = goldBright;

  const words = title.split(' ');
  let startY = 385;
  words.forEach((w) => {
    ctx.fillText(w, 128, startY);
    startY += 30;
  });

  if (sub) {
    ctx.font = '600 13px Inter, sans-serif';
    ctx.fillStyle = goldColor;
    ctx.fillText(sub, 128, startY + 12);
  }

  if (vol) {
    ctx.font = '700 14px "Playfair Display", Georgia, serif';
    ctx.fillStyle = goldColor;
    ctx.fillText(vol, 128, 620);
  }

  // Tail ornament
  ctx.font = '22px serif';
  ctx.fillStyle = goldColor;
  ctx.fillText('❖', 128, 950);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Curated selection of classical vintage books matching the reference video
const VINTAGE_BOOKS: AntiqueBookConfig[] = [
  { style: 0, title: 'HISTORIA NATVRALIS', sub: 'EX ARCHIVIS', vol: '• VOL. I •' },       // Emerald Arabesque
  { style: 1, title: 'CHRONICA REGVM', sub: 'LIBER PRIMVS', vol: '• VOL. II •' },        // Oxblood Morocco
  { style: 2, title: '', sub: '', vol: '' },                                               // Deckle Fore-edge (Pages facing out!)
  { style: 3, title: 'ASTRONOMIA NOVA', sub: 'DE MOTIBVS', vol: '• VOL. III •' },         // Cognac Gilt
  { style: 4, title: 'PHILOSOPHIA ANTIQVA', sub: 'OPERA OMNIA', vol: '• VOL. IV •' },     // Ancient Vellum
  { style: 5, title: 'DE ARTE POETICA', sub: 'EXEMPLARIA', vol: '• VOL. V •' },          // Midnight Navy
  { style: 6, title: 'ELEMENTA CODICIS', sub: 'THEORIA ET PRAXIS', vol: '• VOL. VI •' },  // Ebony Morocco
  { style: 7, title: 'OPERA OMNIA', sub: 'COLLECTIO SACRA', vol: '• VOL. VII •' }         // Imperial Plum
];

// ============================================================================
// Grand 3D Library Scene Constructor (Filmic Cinematic Bookshelf)
// ============================================================================
export function createLibraryScene(): THREE.Group {
  const library = new THREE.Group();
  library.name = 'grand-library-hall';

  // 1. Core Materials
  const oakTexture = createOakWoodTexture();
  const parquetTexture = createParquetTexture();
  const carpetTexture = createCarpetTexture();
  const windowTexture = createWindowTexture();
  const deckleTexture = createDecklePaperEdgeTexture();
  const brassPlacardTexture = createBrassPlacardTexture();

  const oakMat = new THREE.MeshStandardMaterial({
    map: oakTexture,
    roughness: 0.52,
    metalness: 0.08
  });

  const shelfMat = new THREE.MeshStandardMaterial({
    map: oakTexture,
    roughness: 0.48,
    metalness: 0.06
  });

  const backboardMat = new THREE.MeshStandardMaterial({
    color: 0x120a05,
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

  const deckleMat = new THREE.MeshStandardMaterial({
    map: deckleTexture,
    roughness: 0.92,
    metalness: 0.0
  });

  // Pre-generate pool of vintage spine materials
  const spineMaterials: THREE.MeshStandardMaterial[] = [];
  VINTAGE_BOOKS.forEach((cfg) => {
    const spineTex = createAntiqueSpineTexture(cfg);
    spineMaterials.push(
      new THREE.MeshStandardMaterial({
        map: spineTex,
        roughness: cfg.style === 4 ? 0.85 : 0.48,
        metalness: cfg.style === 4 ? 0.02 : 0.12
      })
    );
  });

  // 2. Room Architecture (Floor, Ceiling, Walls)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 18), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2.4, 0);
  library.add(floor);

  const runner = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 12), carpetMat);
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(0, -2.39, 0.8);
  library.add(runner);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(24, 18), oakMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, 5.0, 0);
  library.add(ceiling);

  // Ceiling transverse oak beams
  for (let z = -6; z <= 3; z += 2.2) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(22, 0.32, 0.36), oakMat);
    beam.position.set(0, 4.84, z);
    library.add(beam);
  }

  // Rear Wall with Palladian Arched Window
  const rearWall = new THREE.Mesh(new THREE.PlaneGeometry(24, 8.5), backboardMat);
  rearWall.position.set(0, 1.4, -4.5);
  library.add(rearWall);

  const grandWindow = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 6.5), windowMat);
  grandWindow.position.set(0, 2.6, -4.48);
  library.add(grandWindow);

  // 3. Central Grand Bookshelf Architecture (Heavy Oak Construction)
  const caseWidth = 13.8;
  const caseBackZ = -2.85;

  // Dark Recessed Bookcase Backboard
  const caseBack = new THREE.Mesh(new THREE.PlaneGeometry(caseWidth, 6.8), backboardMat);
  caseBack.position.set(0, 0.9, caseBackZ);
  library.add(caseBack);

  // Solid Vertical Oak Side Uprights / Stiles (Framing the intimate shelf bay like in the video)
  const sideUprights = [-5.6, 5.6];
  sideUprights.forEach((ux) => {
    const upright = new THREE.Mesh(new THREE.BoxGeometry(0.36, 6.4, 1.6), oakMat);
    upright.position.set(ux, 0.8, -2.05);
    library.add(upright);

    // Carved column base & capital
    const baseCap = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.18, 1.68), oakMat);
    baseCap.position.set(ux, -2.25, -2.05);
    library.add(baseCap);

    const topCap = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.22, 1.68), oakMat);
    topCap.position.set(ux, 3.82, -2.05);
    library.add(topCap);
  });

  // Heavy Horizontal Oak Shelves:
  // Main Hero Tier Plank (Where Bishal's book & antique books sit at Y = -1.13)
  const mainShelfPlank = new THREE.Mesh(new THREE.BoxGeometry(caseWidth, 0.18, 1.45), shelfMat);
  mainShelfPlank.position.set(0, -1.13, -2.05);
  library.add(mainShelfPlank);

  // Molded Bullnose Front Lip for the Main Shelf Plank
  const shelfLip = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, caseWidth, 12), shelfMat);
  shelfLip.rotation.z = Math.PI / 2;
  shelfLip.position.set(0, -1.13, -1.325);
  library.add(shelfLip);

  // Upper Shelf Tier (+1.45)
  const upperShelf = new THREE.Mesh(new THREE.BoxGeometry(caseWidth, 0.14, 1.35), shelfMat);
  upperShelf.position.set(0, 1.45, -2.05);
  library.add(upperShelf);

  // Top Crown Molding (+3.85)
  const crownMolding = new THREE.Mesh(new THREE.BoxGeometry(caseWidth + 0.4, 0.28, 1.6), oakMat);
  crownMolding.position.set(0, 3.85, -2.05);
  library.add(crownMolding);

  // Ground Shelf Tier Base (-2.35)
  const groundShelf = new THREE.Mesh(new THREE.BoxGeometry(caseWidth, 0.16, 1.45), shelfMat);
  groundShelf.position.set(0, -2.35, -2.05);
  library.add(groundShelf);

  // Carved Oak Bracket Corbels supporting the main shelf
  const corbelXPositions = [-4.6, -2.2, 2.2, 4.6];
  corbelXPositions.forEach((cx) => {
    const corbel = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.38, 0.45), oakMat);
    corbel.position.set(cx, -1.38, -1.8);
    library.add(corbel);
  });

  // Elevated Mahogany Pedestal / Showcase Plinth exclusively for Bishal's Glowing Book
  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.14, 1.35), oakMat);
  pedestal.position.set(0, -1.06, -2.05);
  library.add(pedestal);

  // Gilded Brass Inlaid Trim on the Pedestal
  const pedTrim = new THREE.Mesh(new THREE.BoxGeometry(1.69, 0.02, 1.39), brassMat);
  pedTrim.position.set(0, -0.99, -2.05);
  library.add(pedTrim);

  // Dedication Brass Placard mounted on the pedestal front face!
  const placardMat = new THREE.MeshStandardMaterial({
    map: brassPlacardTexture,
    roughness: 0.3,
    metalness: 0.85
  });
  const placard = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.16), placardMat);
  placard.position.set(0, -1.06, -1.36);
  library.add(placard);

  // 4. Photorealistic Antique Book Generator (with Curved Convex Spines!)
  function createFilmicBook(
    w: number,
    h: number,
    d: number,
    bookCfgIndex: number,
    tiltAngle = 0
  ): THREE.Group {
    const bookGroup = new THREE.Group();
    const cfg = VINTAGE_BOOKS[bookCfgIndex % VINTAGE_BOOKS.length];
    const spineMat = spineMaterials[bookCfgIndex % spineMaterials.length];

    // Leather cover material
    const coverMat = new THREE.MeshStandardMaterial({
      color:
        cfg.style === 0
          ? 0x0c2518
          : cfg.style === 1
          ? 0x340b12
          : cfg.style === 3
          ? 0x3e2010
          : cfg.style === 4
          ? 0xdfd3b8
          : cfg.style === 5
          ? 0x0e1828
          : cfg.style === 6
          ? 0x161618
          : 0x281028,
      roughness: cfg.style === 4 ? 0.85 : 0.55,
      metalness: 0.06
    });

    // Main rectangular book body
    const bodyGeo = new THREE.BoxGeometry(w, h, d);
    const bodyMaterials = [
      coverMat,    // +X
      coverMat,    // -X
      deckleMat,   // +Y (deckle top edge)
      coverMat,    // -Y
      spineMat,    // +Z (front face)
      deckleMat    // -Z (rear paper edge)
    ];
    const body = new THREE.Mesh(bodyGeo, bodyMaterials);
    bookGroup.add(body);

    // Convex Curved Spine Mesh attached to the front face!
    // This gives authentic rounded specular highlights seen in video_frame_02!
    if (cfg.style !== 2) {
      const spineRadius = w * 0.95;
      const spineCurvedGeo = new THREE.CylinderGeometry(
        spineRadius,
        spineRadius,
        h,
        16,
        1,
        false,
        -Math.PI / 2,
        Math.PI
      );
      const curvedSpine = new THREE.Mesh(spineCurvedGeo, spineMat);
      curvedSpine.position.set(0, 0, d / 2 - 0.005);
      curvedSpine.scale.set(1.0, 1.0, 0.45); // Flatten curve to realistic book spine profile
      bookGroup.add(curvedSpine);

      // Gold-embossed raised headband lips at top and bottom of spine
      const headbandGeo = new THREE.CylinderGeometry(spineRadius * 0.98, spineRadius * 0.98, 0.025, 14);
      const headbandTop = new THREE.Mesh(headbandGeo, brassMat);
      headbandTop.position.set(0, h / 2 - 0.012, d / 2 + 0.005);
      headbandTop.scale.set(1.0, 1.0, 0.45);
      bookGroup.add(headbandTop);

      const headbandBtm = new THREE.Mesh(headbandGeo, brassMat);
      headbandBtm.position.set(0, -h / 2 + 0.012, d / 2 + 0.005);
      headbandBtm.scale.set(1.0, 1.0, 0.45);
      bookGroup.add(headbandBtm);
    }

    if (tiltAngle !== 0) {
      bookGroup.rotation.z = tiltAngle;
    }

    return bookGroup;
  }

  // 5. Ornate Sculpted Antique Brass Bookend
  function createBrassBookend(bx: number, by: number, bz: number, flip = false): THREE.Group {
    const bookend = new THREE.Group();
    bookend.position.set(bx, by, bz);

    // Heavy stepped brass base
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.65), brassMat);
    bookend.add(base);

    // Upright sculpted filigree plate
    const upright = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.62, 0.58), brassMat);
    upright.position.set(flip ? 0.07 : -0.07, 0.31, 0);
    bookend.add(upright);

    // Classical spherical brass finial
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), brassMat);
    finial.position.set(flip ? 0.07 : -0.07, 0.66, 0);
    bookend.add(finial);

    return bookend;
  }

  // 6. Curated Antique Books Placement (Matching video_frame_02 reference!)
  // Generous blank open space around Bishal's centerpiece book from X = -1.5 to +1.5!

  // --- LEFT SHELF CLUSTER (X = -1.6 to -4.0) ---
  const leftBookConfigs = [
    { w: 0.10, h: 1.64, d: 0.96, cfgIdx: 1, zOff: 0.01, tilt: 0 },       // Oxblood Morocco
    { w: 0.11, h: 1.72, d: 0.98, cfgIdx: 0, zOff: 0.02, tilt: 0 },       // Emerald Arabesque (Cynthia's Journey)
    { w: 0.09, h: 1.56, d: 0.94, cfgIdx: 2, zOff: -0.02, tilt: 0 },      // Deckle Paper Fore-edge (From video!)
    { w: 0.10, h: 1.66, d: 0.96, cfgIdx: 3, zOff: 0.01, tilt: 0 },       // Cognac Gilt
    { w: 0.095, h: 1.50, d: 0.94, cfgIdx: 4, zOff: 0.0, tilt: 0.065 }    // Vellum (Tilted gently leaning!)
  ];

  let curLeftX = -1.65;
  leftBookConfigs.forEach((b) => {
    const bookMesh = createFilmicBook(b.w, b.h, b.d, b.cfgIdx, b.tilt);
    const bY = -1.13 + 0.09 + b.h / 2;
    const bZ = -2.05 + b.zOff;
    bookMesh.position.set(curLeftX - b.w / 2, bY, bZ);
    library.add(bookMesh);
    curLeftX -= b.w + 0.012;
  });

  // Antique brass bookend holding the left row
  library.add(createBrassBookend(curLeftX - 0.08, -1.02, -2.05, false));

  // --- RIGHT SHELF CLUSTER (X = +1.6 to +4.0) ---
  const rightBookConfigs = [
    { w: 0.10, h: 1.66, d: 0.96, cfgIdx: 7, zOff: 0.01, tilt: 0 },       // Imperial Plum
    { w: 0.11, h: 1.74, d: 0.98, cfgIdx: 5, zOff: 0.02, tilt: 0 },       // Midnight Navy
    { w: 0.09, h: 1.58, d: 0.94, cfgIdx: 3, zOff: -0.01, tilt: 0 },      // Cognac Gilt
    { w: 0.10, h: 1.64, d: 0.96, cfgIdx: 1, zOff: 0.01, tilt: 0 }        // Oxblood Morocco
  ];

  let curRightX = 1.65;
  rightBookConfigs.forEach((b) => {
    const bookMesh = createFilmicBook(b.w, b.h, b.d, b.cfgIdx, b.tilt);
    const bY = -1.13 + 0.09 + b.h / 2;
    const bZ = -2.05 + b.zOff;
    bookMesh.position.set(curRightX + b.w / 2, bY, bZ);
    library.add(bookMesh);
    curRightX += b.w + 0.012;
  });

  // Stack of 2 large antique folio books resting flat beside the row (Filmic detail!)
  const flatFolio1 = createFilmicBook(0.68, 0.08, 0.94, 6, 0);
  flatFolio1.position.set(curRightX + 0.42, -1.00, -2.05);
  flatFolio1.rotation.y = 0.08;
  library.add(flatFolio1);

  const flatFolio2 = createFilmicBook(0.64, 0.075, 0.90, 0, 0);
  flatFolio2.position.set(curRightX + 0.41, -0.92, -2.05);
  flatFolio2.rotation.y = -0.05;
  library.add(flatFolio2);

  // Antique brass bookend holding the right row
  library.add(createBrassBookend(curRightX + 0.88, -1.02, -2.05, true));

  // --- UPPER SHELF TIER (Y = 1.45) Curated Small Volumes ---
  const upperLeftConfigs = [
    { w: 0.08, h: 1.25, d: 0.85, cfgIdx: 0 },
    { w: 0.085, h: 1.32, d: 0.88, cfgIdx: 5 },
    { w: 0.08, h: 1.20, d: 0.82, cfgIdx: 4 }
  ];
  let upLeftX = -2.4;
  upperLeftConfigs.forEach((b) => {
    const bookMesh = createFilmicBook(b.w, b.h, b.d, b.cfgIdx);
    bookMesh.position.set(upLeftX - b.w / 2, 1.45 + 0.07 + b.h / 2, -2.05);
    library.add(bookMesh);
    upLeftX -= b.w + 0.01;
  });

  const upperRightConfigs = [
    { w: 0.08, h: 1.28, d: 0.86, cfgIdx: 1 },
    { w: 0.085, h: 1.34, d: 0.88, cfgIdx: 7 },
    { w: 0.08, h: 1.22, d: 0.84, cfgIdx: 3 }
  ];
  let upRightX = 2.4;
  upperRightConfigs.forEach((b) => {
    const bookMesh = createFilmicBook(b.w, b.h, b.d, b.cfgIdx);
    bookMesh.position.set(upRightX + b.w / 2, 1.45 + 0.07 + b.h / 2, -2.05);
    library.add(bookMesh);
    upRightX += b.w + 0.01;
  });

  // 7. Iconic Emerald Glass Banker's Lamp on the Shelf
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-4.85, -1.04, -1.95);

  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.04, 16), brassMat);
  lampGroup.add(lampBase);

  const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 12), brassMat);
  lampStem.position.set(0, 0.19, 0);
  lampGroup.add(lampStem);

  const lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.24, 12), brassMat);
  lampArm.rotation.z = Math.PI / 2;
  lampArm.position.set(0, 0.38, 0);
  lampGroup.add(lampArm);

  const lampShade = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.16), emeraldMat);
  lampShade.position.set(0, 0.36, 0);
  lampGroup.add(lampShade);

  // Dedicated warm amber pool of light from the banker's lamp
  const lampLight = new THREE.PointLight(0xffbe55, 1.8, 6.0);
  lampLight.position.set(0, 0.28, 0.08);
  lampGroup.add(lampLight);

  library.add(lampGroup);

  // 8. Atmospheric Volumetric Sunlight Shaft / God Ray Beam cutting from top-left
  // Creates that iconic cinematic "filmy" morning light cutting through an ancient library
  const beamGeo = new THREE.CylinderGeometry(0.5, 2.6, 9.5, 16, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xffdf95,
    transparent: true,
    opacity: 0.065,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const lightBeam = new THREE.Mesh(beamGeo, beamMat);
  lightBeam.position.set(-1.8, 1.6, -1.6);
  lightBeam.rotation.z = -0.52; // Angled down from top-left
  lightBeam.rotation.x = 0.15;
  library.add(lightBeam);

  // 9. Atmospheric Golden Dust Motes (Floating in the Light Beam)
  const motesCount = 65;
  const motesGeo = new THREE.BufferGeometry();
  const motesPos = new Float32Array(motesCount * 3);

  for (let i = 0; i < motesCount; i++) {
    motesPos[i * 3] = -4.5 + Math.random() * 9.0;
    motesPos[i * 3 + 1] = -1.2 + Math.random() * 3.8;
    motesPos[i * 3 + 2] = -2.6 + Math.random() * 2.2;
  }
  motesGeo.setAttribute('position', new THREE.BufferAttribute(motesPos, 3));

  const motesMat = new THREE.PointsMaterial({
    size: 0.038,
    color: 0xffe28a,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const dustMotes = new THREE.Points(motesGeo, motesMat);
  dustMotes.name = 'atmospheric-dust-motes';
  library.add(dustMotes);

  // 10. Master Cinematic Chiaroscuro Lighting
  // Balanced ambient baseline (velvety shadows, rich contrast)
  const ambientWarm = new THREE.HemisphereLight(0xffeedd, 0x1a0f08, 0.45);
  ambientWarm.name = 'library-ambient';
  library.add(ambientWarm);

  // Cinematic Golden Key Spotlight angled from top-left
  const keySpot = new THREE.SpotLight(0xffe2a0, 2.4, 12.0, Math.PI / 3.2, 0.45);
  keySpot.name = 'library-key-spot';
  keySpot.position.set(-3.2, 3.4, 1.6);
  keySpot.target.position.set(0, 0.0, -2.05);
  keySpot.castShadow = true;
  keySpot.shadow.bias = -0.0005;
  keySpot.shadow.mapSize.width = 1024;
  keySpot.shadow.mapSize.height = 1024;
  library.add(keySpot);
  library.add(keySpot.target);

  // Dedicated Warm Accent Spotlight focused directly on Bishal's centerpiece book
  const heroSpot = new THREE.SpotLight(0xfff5e0, 2.2, 9.5, Math.PI / 3.6, 0.38);
  heroSpot.name = 'library-hero-spot';
  heroSpot.position.set(0, 2.8, -0.2);
  heroSpot.target.position.set(0, 0.0, -2.05);
  library.add(heroSpot);
  library.add(heroSpot.target);

  // Cool soft blue moonlight fill from the high window
  const moonFill = new THREE.PointLight(0x7da4d9, 0.85, 12.0);
  moonFill.position.set(0, 2.8, -3.8);
  library.add(moonFill);

  return library;
}
