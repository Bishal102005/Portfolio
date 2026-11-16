import * as THREE from 'three';

// ============================================================================
// Procedural Warm Luminous Walnut Desk Wood Texture Generator (frame_001.jpg)
// ============================================================================
export function createWalnutDeskTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm, rich amber-walnut gradient base matching frame_001.jpg
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  bgGrad.addColorStop(0, '#4a2c1a');
  bgGrad.addColorStop(0.25, '#623b23');
  bgGrad.addColorStop(0.5, '#784a2d');
  bgGrad.addColorStop(0.75, '#643c24');
  bgGrad.addColorStop(1, '#4c2e1b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Fine longitudinal grain waves with warm specular highlights
  for (let y = 0; y < 1024; y += 2) {
    const wave = Math.sin(y * 0.018) * 16 + Math.sin(y * 0.006) * 28 + Math.cos(y * 0.04) * 6;
    const tone = Math.sin(y * 0.11 + wave * 0.035);
    const alpha = 0.09 + Math.max(0, tone) * 0.16;
    ctx.fillStyle = `rgba(38, 20, 10, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 1024, 1.8);

    // Warm amber satin varnish sheen on grain ridges
    if (y % 6 === 0) {
      const hl = 0.06 + Math.sin(y * 0.05 + wave * 0.02) * 0.04;
      if (hl > 0) {
        ctx.fillStyle = `rgba(250, 195, 130, ${hl.toFixed(3)})`;
        ctx.fillRect(0, y + 0.5, 1024, 1.0);
      }
    }
  }

  // Walnut wood pores
  for (let i = 0; i < 500; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rw = 12 + Math.random() * 35;
    const rh = 1.0 + Math.random() * 1.5;
    ctx.fillStyle = 'rgba(225, 165, 95, 0.07)';
    ctx.fillRect(rx, ry, rw, rh);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural Monitor Wallpaper Texture Generator (Matching frame_001.jpg)
// ============================================================================
export function createMonitorWallpaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576; // 16:9
  const ctx = canvas.getContext('2d')!;

  // Deep twilight sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 576);
  skyGrad.addColorStop(0, '#0a101b');
  skyGrad.addColorStop(0.45, '#121b2a');
  skyGrad.addColorStop(0.85, '#1e283a');
  skyGrad.addColorStop(1, '#2b3445');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1024, 576);

  // Tiny distant stars
  for (let i = 0; i < 90; i++) {
    const sx = Math.random() * 1024;
    const sy = Math.random() * 320;
    const sr = Math.random() * 1.3 + 0.4;
    ctx.fillStyle = `rgba(240, 248, 255, ${(Math.random() * 0.7 + 0.3).toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layer 1: Distant dark mountains
  ctx.fillStyle = '#0f1622';
  ctx.beginPath();
  ctx.moveTo(0, 420);
  ctx.lineTo(160, 310);
  ctx.lineTo(340, 360);
  ctx.lineTo(520, 260);
  ctx.lineTo(720, 330);
  ctx.lineTo(890, 290);
  ctx.lineTo(1024, 380);
  ctx.lineTo(1024, 576);
  ctx.lineTo(0, 576);
  ctx.closePath();
  ctx.fill();

  // Layer 2: Mid-ground mountain dunes (matching frame_001.jpg)
  const duneGrad = ctx.createLinearGradient(0, 300, 0, 540);
  duneGrad.addColorStop(0, '#18202d');
  duneGrad.addColorStop(1, '#0e141f');
  ctx.fillStyle = duneGrad;
  ctx.beginPath();
  ctx.moveTo(0, 480);
  ctx.bezierCurveTo(220, 350, 420, 380, 620, 440);
  ctx.bezierCurveTo(780, 490, 920, 410, 1024, 460);
  ctx.lineTo(1024, 576);
  ctx.lineTo(0, 576);
  ctx.closePath();
  ctx.fill();

  // Windows 11 style centered dock / taskbar
  ctx.fillStyle = 'rgba(16, 22, 32, 0.85)';
  ctx.fillRect(0, 540, 1024, 36);

  // Centered taskbar icons
  const iconColors = ['#0078d4', '#00a4ef', '#ffb900', '#107c41', '#e81123', '#7fba00', '#d83b01'];
  iconColors.forEach((col, idx) => {
    const ix = 512 - 90 + idx * 26;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.roundRect(ix, 548, 18, 18, 4);
    ctx.fill();
  });

  // Time / date on bottom right
  ctx.fillStyle = 'rgba(235, 240, 250, 0.85)';
  ctx.font = '500 13px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('9:42 PM', 995, 563);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural Soft Circular Particle Texture
// ============================================================================
export function createSoftParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const rad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  rad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  rad.addColorStop(0.35, 'rgba(255, 248, 225, 0.65)');
  rad.addColorStop(0.7, 'rgba(255, 235, 180, 0.2)');
  rad.addColorStop(1, 'rgba(255, 220, 150, 0)');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, 64, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural Sunburst Rays Texture Generator (Matching frame_003 & frame_005)
// ============================================================================
export function createSunburstTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const cx = 256;
  const cy = 256;

  // Luminous radial glow center
  const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
  radGrad.addColorStop(0, 'rgba(255, 250, 220, 0.98)');
  radGrad.addColorStop(0.18, 'rgba(255, 215, 120, 0.82)');
  radGrad.addColorStop(0.42, 'rgba(240, 165, 50, 0.42)');
  radGrad.addColorStop(0.75, 'rgba(195, 105, 18, 0.12)');
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Sharp radiating rays of light
  const numRays = 52;
  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * Math.PI * 2;
    const len = 95 + (i % 3 === 0 ? 150 : i % 2 === 0 ? 110 : 70);
    const w = i % 3 === 0 ? 3.5 : 2.0;

    const x2 = cx + Math.cos(angle) * len;
    const y2 = cy + Math.sin(angle) * len;

    const rayGrad = ctx.createLinearGradient(cx, cy, x2, y2);
    rayGrad.addColorStop(0, 'rgba(255, 252, 230, 0.98)');
    rayGrad.addColorStop(0.3, 'rgba(255, 220, 130, 0.85)');
    rayGrad.addColorStop(0.8, 'rgba(245, 165, 45, 0.35)');
    rayGrad.addColorStop(1, 'rgba(220, 120, 20, 0)');

    ctx.strokeStyle = rayGrad;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural Framed Wall Art Texture Generator (Matching frame_010.jpg)
// ============================================================================
export function createWallArtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#eae2d6';
  ctx.fillRect(0, 0, 512, 680);

  const artGrad = ctx.createLinearGradient(60, 60, 452, 620);
  artGrad.addColorStop(0, '#1c222e');
  artGrad.addColorStop(0.5, '#2e3846');
  artGrad.addColorStop(1, '#483c36');
  ctx.fillStyle = artGrad;
  ctx.fillRect(60, 60, 392, 560);

  ctx.fillStyle = '#e8b868';
  ctx.beginPath();
  ctx.arc(256, 260, 75, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#141822';
  ctx.beginPath();
  ctx.moveTo(60, 620);
  ctx.lineTo(210, 420);
  ctx.lineTo(320, 520);
  ctx.lineTo(452, 380);
  ctx.lineTo(452, 620);
  ctx.closePath();
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Complete 3D Developer Workspace Scene (1:1 Proportional Real-World Layout)
// ============================================================================
export interface DeskWorkspaceResult {
  group: THREE.Group;
  deskSunburst: THREE.Mesh;
  steamParticles: THREE.Points;
  screenbarLight: THREE.SpotLight;
  deskLampLight: THREE.PointLight;
  wallBacklight: THREE.PointLight;
}

export function createDeskWorkspaceScene(): DeskWorkspaceResult {
  const group = new THREE.Group();
  group.name = 'developer-workspace-scene';

  const walnutTex = createWalnutDeskTexture();
  const screenTex = createMonitorWallpaperTexture();
  const sunburstTex = createSunburstTexture();
  const artTex = createWallArtTexture();
  const particleTex = createSoftParticleTexture();

  // Core Warm Materials
  const walnutMat = new THREE.MeshStandardMaterial({
    map: walnutTex,
    roughness: 0.35,
    metalness: 0.06
  });

  const matteBlackMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.58,
    metalness: 0.22
  });

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0x9ca3af,
    roughness: 0.25,
    metalness: 0.88
  });

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    roughness: 0.16,
    metalness: 0.05,
    emissive: 0x384a5e,
    emissiveIntensity: 0.7
  });

  // Realistic Proportions
  const floorY = -0.85;
  const deskTopY = -0.11;
  const deskThick = 0.04;
  const deskWidth = 1.75;
  const deskDepth = 0.95;

  // =========================================================================
  // 1. Room Floor
  // =========================================================================
  const floorGeo = new THREE.PlaneGeometry(8.0, 7.0);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x221710,
    roughness: 0.72,
    metalness: 0.04
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, floorY, -0.4);
  floor.receiveShadow = true;
  group.add(floor);

  // =========================================================================
  // 2. Solid Walnut Wooden Desk (Natural 1.75m x 0.95m developer desk)
  // =========================================================================
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(deskWidth, deskThick, deskDepth),
    walnutMat
  );
  deskTop.position.set(-0.05, deskTopY - deskThick / 2, -0.32);
  deskTop.receiveShadow = true;
  group.add(deskTop);

  // Bullnose front lip of desk
  const frontLip = new THREE.Mesh(
    new THREE.CylinderGeometry(deskThick / 2, deskThick / 2, deskWidth, 16),
    walnutMat
  );
  frontLip.rotation.z = Math.PI / 2;
  frontLip.position.set(-0.05, deskTopY - deskThick / 2, -0.32 + deskDepth / 2);
  frontLip.receiveShadow = true;
  group.add(frontLip);

  // Matte black steel desk legs extending to the floor
  const legPositions = [
    { x: -0.05 - deskWidth / 2 + 0.12, z: -0.32 - deskDepth / 2 + 0.12 },
    { x: -0.05 + deskWidth / 2 - 0.12, z: -0.32 - deskDepth / 2 + 0.12 },
    { x: -0.05 - deskWidth / 2 + 0.12, z: -0.32 + deskDepth / 2 - 0.12 },
    { x: -0.05 + deskWidth / 2 - 0.12, z: -0.32 + deskDepth / 2 - 0.12 }
  ];
  const legHeight = Math.abs(deskTopY - deskThick - floorY);
  legPositions.forEach((lp) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.024, legHeight, 14),
      matteBlackMat
    );
    leg.position.set(lp.x, floorY + legHeight / 2, lp.z);
    group.add(leg);
  });

  // =========================================================================
  // 3. Desktop Widescreen Monitor & Screenbar (Left side, matching frame_001.jpg)
  // =========================================================================
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(-0.48, deskTopY + 0.002, -0.52);
  monitorGroup.rotation.y = 0.42; // Angled ~24° toward user

  // Aluminum Stand Base on desk
  const standBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.008, 0.18),
    aluminumMat
  );
  standBase.position.set(0, 0.004, 0);
  standBase.receiveShadow = true;
  monitorGroup.add(standBase);

  // Aluminum Stand Column
  const standNeck = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.28, 0.035),
    aluminumMat
  );
  standNeck.position.set(0, 0.14, -0.05);
  standNeck.rotation.x = -0.08;
  monitorGroup.add(standNeck);

  // Monitor Display Body (32-inch 16:9)
  const screenW = 0.72;
  const screenH = 0.42;
  const screenBack = new THREE.Mesh(
    new THREE.BoxGeometry(screenW, screenH, 0.016),
    matteBlackMat
  );
  screenBack.position.set(0, 0.30, 0.03);
  monitorGroup.add(screenBack);

  // Screen Face with dark mountain wallpaper & Windows 11 taskbar
  const screenFace = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW - 0.012, screenH - 0.012),
    screenMat
  );
  screenFace.position.set(0, 0.30, 0.039);
  monitorGroup.add(screenFace);

  // Screenbar mounted on top of monitor (frame_001.jpg)
  const screenbarY = 0.30 + screenH / 2 + 0.012;
  const screenbar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 0.42, 16),
    aluminumMat
  );
  screenbar.rotation.z = Math.PI / 2;
  screenbar.position.set(0, screenbarY, 0.055);
  monitorGroup.add(screenbar);

  // Downward warm light strip on screenbar
  const lightStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.003, 0.008),
    new THREE.MeshBasicMaterial({ color: 0xfff2e0 })
  );
  lightStrip.position.set(0, screenbarY - 0.01, 0.055);
  monitorGroup.add(lightStrip);

  const screenbarLight = new THREE.SpotLight(0xfff0db, 2.4, 2.5, Math.PI / 3.2, 0.65);
  screenbarLight.position.set(0, screenbarY, 0.055);
  screenbarLight.target.position.set(0, 0, 0.28);
  monitorGroup.add(screenbarLight);
  monitorGroup.add(screenbarLight.target);

  group.add(monitorGroup);

  // =========================================================================
  // 4. Mechanical Keyboard (Center-left, angled naturally, frame_001.jpg)
  // =========================================================================
  const keyboardGroup = new THREE.Group();
  keyboardGroup.position.set(-0.18, deskTopY + 0.002, -0.18);
  keyboardGroup.rotation.y = 0.36; // Angled ~20°

  // Keyboard body
  const kbBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.016, 0.145),
    matteBlackMat
  );
  kbBody.position.y = 0.008;
  keyboardGroup.add(kbBody);

  // Keycap rows
  const keycapRowMat = new THREE.MeshStandardMaterial({
    color: 0x242830,
    roughness: 0.52,
    metalness: 0.12
  });

  for (let r = 0; r < 5; r++) {
    const rz = -0.050 + r * 0.025;
    const rowMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.009, 0.020),
      keycapRowMat
    );
    rowMesh.position.set(0, 0.018, rz);
    keyboardGroup.add(rowMesh);
  }

  // Keyboard subtle warm backlight
  const kbGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.36, 0.12),
    new THREE.MeshBasicMaterial({
      color: 0xffaa44,
      transparent: true,
      opacity: 0.18
    })
  );
  kbGlow.rotation.x = -Math.PI / 2;
  kbGlow.position.set(0, 0.016, 0);
  keyboardGroup.add(kbGlow);

  group.add(keyboardGroup);

  // =========================================================================
  // 5. Ergonomic Wireless Mouse (Beside / behind book, frame_001.jpg)
  // =========================================================================
  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(0.11, deskTopY + 0.002, -0.28);
  mouseGroup.rotation.y = -0.15;

  const mouseBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.068, 0.030, 0.112),
    matteBlackMat
  );
  mouseBody.position.y = 0.015;
  mouseGroup.add(mouseBody);

  const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.007, 0.007, 0.014, 12),
    aluminumMat
  );
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.030, -0.024);
  mouseGroup.add(wheel);

  group.add(mouseGroup);

  // =========================================================================
  // 6. Steaming Coffee Mug & Artist Pen Cup (Upper-center, frame_001.jpg)
  // =========================================================================
  const coffeeGroup = new THREE.Group();
  coffeeGroup.position.set(-0.02, deskTopY + 0.002, -0.48);

  // Wooden Coaster
  const coaster = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.008, 20),
    walnutMat
  );
  coaster.position.y = 0.004;
  coffeeGroup.add(coaster);

  // Ceramic Mug
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.044, 0.034, 0.09, 20),
    new THREE.MeshStandardMaterial({
      color: 0xe8e2d8,
      roughness: 0.22,
      metalness: 0.08
    })
  );
  mug.position.y = 0.052;
  coffeeGroup.add(mug);

  // Coffee froth layer
  const coffeeLiquid = new THREE.Mesh(
    new THREE.CircleGeometry(0.040, 18),
    new THREE.MeshStandardMaterial({
      color: 0x4a2a16,
      roughness: 0.18,
      metalness: 0.12
    })
  );
  coffeeLiquid.rotation.x = -Math.PI / 2;
  coffeeLiquid.position.y = 0.093;
  coffeeGroup.add(coffeeLiquid);

  // Mug handle
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.026, 0.007, 8, 16, Math.PI * 1.3),
    new THREE.MeshStandardMaterial({ color: 0xe8e2d8, roughness: 0.22 })
  );
  handle.position.set(0.048, 0.052, 0);
  handle.rotation.z = Math.PI / 4;
  coffeeGroup.add(handle);

  // Animated Steam Particles (Soft circular puffs)
  const steamCount = 14;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  for (let i = 0; i < steamCount; i++) {
    steamPos[i * 3] = (Math.random() - 0.5) * 0.035;
    steamPos[i * 3 + 1] = 0.10 + (i / steamCount) * 0.18;
    steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.035;
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

  const steamMat = new THREE.PointsMaterial({
    size: 0.045,
    map: particleTex,
    color: 0xffeedd,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const steamParticles = new THREE.Points(steamGeo, steamMat);
  coffeeGroup.add(steamParticles);

  // Cylindrical Pen Holder cup next to coffee (frame_001.jpg)
  const penCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.025, 0.08, 16),
    matteBlackMat
  );
  penCup.position.set(-0.11, 0.04, 0.01);
  coffeeGroup.add(penCup);

  for (let p = 0; p < 4; p++) {
    const pen = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0035, 0.0035, 0.12, 8),
      new THREE.MeshStandardMaterial({
        color: p % 2 === 0 ? 0xbaa482 : 0x22262d,
        roughness: 0.4
      })
    );
    pen.position.set(-0.11 + (p - 1.5) * 0.008, 0.08, 0.01 + (p % 2) * 0.007);
    pen.rotation.z = (p - 1.5) * 0.1;
    coffeeGroup.add(pen);
  }

  group.add(coffeeGroup);

  // =========================================================================
  // 7. Radiant Sunburst Caustic Light on Desk (Below Book, frame_005.jpg)
  // =========================================================================
  const sunburstGeo = new THREE.PlaneGeometry(0.55, 0.55);
  const sunburstMat = new THREE.MeshBasicMaterial({
    map: sunburstTex,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const deskSunburst = new THREE.Mesh(sunburstGeo, sunburstMat);
  deskSunburst.rotation.x = -Math.PI / 2;
  deskSunburst.position.set(0.29, deskTopY + 0.002, 0.01);
  group.add(deskSunburst);

  // =========================================================================
  // 8. Background Warm Room Architecture (frame_001.jpg)
  // =========================================================================
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xd4cbbe,
    roughness: 0.82,
    metalness: 0.02
  });

  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(8.0, 5.0),
    wallMat
  );
  backWall.position.set(0, floorY + 2.5, -1.35);
  group.add(backWall);

  // Framed Wall Artwork mounted on wall behind monitor (frame_010.jpg)
  const artGroup = new THREE.Group();
  artGroup.position.set(-0.42, 0.45, -1.34);

  const artFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.44, 0.015),
    matteBlackMat
  );
  artGroup.add(artFrame);

  const artCanvas = new THREE.Mesh(
    new THREE.PlaneGeometry(0.30, 0.42),
    new THREE.MeshStandardMaterial({ map: artTex, roughness: 0.6 })
  );
  artCanvas.position.z = 0.008;
  artGroup.add(artCanvas);
  group.add(artGroup);

  // Cozy Lounge Sofa on the floor (frame_001.jpg)
  const sofaGroup = new THREE.Group();
  sofaGroup.position.set(0.85, floorY, -1.05);
  sofaGroup.rotation.y = -0.35;

  const sofaMat = new THREE.MeshStandardMaterial({
    color: 0x3d352e,
    roughness: 0.85
  });

  const sofaSeat = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.35, 0.65),
    sofaMat
  );
  sofaSeat.position.y = 0.175;
  sofaGroup.add(sofaSeat);

  const sofaBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.55, 0.18),
    sofaMat
  );
  sofaBack.position.set(0, 0.52, -0.24);
  sofaGroup.add(sofaBack);

  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0xd4c8b6,
    roughness: 0.8
  });

  const pillow1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.26, 0.09),
    pillowMat
  );
  pillow1.position.set(-0.18, 0.42, -0.12);
  pillow1.rotation.set(-0.25, 0.2, -0.15);
  sofaGroup.add(pillow1);

  const pillow2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.24, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xb8ab98, roughness: 0.82 })
  );
  pillow2.position.set(0.14, 0.40, -0.14);
  pillow2.rotation.set(-0.2, -0.18, 0.12);
  sofaGroup.add(pillow2);

  group.add(sofaGroup);

  // Ambient Floor Lamp standing on floor (frame_001.jpg)
  const lampGroup = new THREE.Group();
  lampGroup.position.set(0.80, floorY, -0.92);

  const lampBasePlate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.015, 18),
    aluminumMat
  );
  lampBasePlate.position.y = 0.008;
  lampGroup.add(lampBasePlate);

  const lampPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 1.65, 12),
    aluminumMat
  );
  lampPole.position.y = 0.83;
  lampGroup.add(lampPole);

  const lampShade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.24, 0.22, 18),
    new THREE.MeshStandardMaterial({
      color: 0x2e1c12,
      emissive: 0xd47e28,
      emissiveIntensity: 0.95,
      roughness: 0.55
    })
  );
  lampShade.position.y = 1.60;
  lampGroup.add(lampShade);

  const deskLampLight = new THREE.PointLight(0xff9e3b, 2.5, 6.0);
  deskLampLight.position.set(0, 1.55, 0);
  lampGroup.add(deskLampLight);

  group.add(lampGroup);

  // Wall bias lighting behind monitor
  const wallBacklight = new THREE.PointLight(0xffe4be, 1.6, 3.8);
  wallBacklight.position.set(-0.48, 0.20, -1.05);
  group.add(wallBacklight);

  // Overall Room Lighting
  const roomAmbient = new THREE.AmbientLight(0xfff5ea, 1.25);
  group.add(roomAmbient);

  const ceilingKeyLight = new THREE.DirectionalLight(0xfff8ee, 1.35);
  ceilingKeyLight.position.set(1.2, 3.5, 1.8);
  group.add(ceilingKeyLight);

  return {
    group,
    deskSunburst,
    steamParticles,
    screenbarLight,
    deskLampLight,
    wallBacklight
  };
}
