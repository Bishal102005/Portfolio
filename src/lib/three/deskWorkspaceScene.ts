import * as THREE from 'three';

// ============================================================================
// Procedural Warm Luminous Walnut Desk Wood Texture Generator (frame_001.jpg)
// ============================================================================
export function createWalnutDeskTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm, rich amber-walnut gradient base (NOT dark / muddy)
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  bgGrad.addColorStop(0, '#3e2415');
  bgGrad.addColorStop(0.2, '#54321d');
  bgGrad.addColorStop(0.45, '#6a4025');
  bgGrad.addColorStop(0.65, '#76482a');
  bgGrad.addColorStop(0.85, '#5a351e');
  bgGrad.addColorStop(1, '#422616');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Longitudinal wavy grain lines with warm satin highlights
  for (let y = 0; y < 1024; y += 2) {
    const wave = Math.sin(y * 0.015) * 18 + Math.sin(y * 0.005) * 32 + Math.cos(y * 0.035) * 8;
    const tone = Math.sin(y * 0.09 + wave * 0.03);
    const alpha = 0.08 + Math.max(0, tone) * 0.15;
    ctx.fillStyle = `rgba(32, 16, 8, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 1024, 1.8);

    // Warm amber satin varnish sheen on grain ridges (matching frame_001.jpg specular)
    if (y % 6 === 0) {
      const hl = 0.05 + Math.sin(y * 0.045 + wave * 0.02) * 0.035;
      if (hl > 0) {
        ctx.fillStyle = `rgba(245, 185, 120, ${hl.toFixed(3)})`;
        ctx.fillRect(0, y + 0.5, 1024, 1.0);
      }
    }
  }

  // Natural walnut wood pores
  for (let i = 0; i < 450; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rw = 14 + Math.random() * 40;
    const rh = 1.0 + Math.random() * 1.6;
    ctx.fillStyle = 'rgba(215, 150, 85, 0.06)';
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
  ctx.fillStyle = 'rgba(16, 22, 32, 0.82)';
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

  // Sharp radiating rays of light (matching frame_003.jpg & frame_005.jpg)
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

  // Warm cream passe-partout / matting
  ctx.fillStyle = '#eae2d6';
  ctx.fillRect(0, 0, 512, 680);

  // Inner art window
  const artGrad = ctx.createLinearGradient(60, 60, 452, 620);
  artGrad.addColorStop(0, '#1c222e');
  artGrad.addColorStop(0.5, '#2e3846');
  artGrad.addColorStop(1, '#483c36');
  ctx.fillStyle = artGrad;
  ctx.fillRect(60, 60, 392, 560);

  // Minimalist golden geometric moon & mountain silhouette
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
// Complete 3D Developer Workspace Scene (Warm, Bright, Matching Video Exactly)
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

  // Core Warm Photographic Materials
  const walnutMat = new THREE.MeshStandardMaterial({
    map: walnutTex,
    roughness: 0.36,
    metalness: 0.06
  });

  const matteBlackMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.6,
    metalness: 0.25
  });

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0x98a0ab,
    roughness: 0.26,
    metalness: 0.88
  });

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    roughness: 0.18,
    metalness: 0.05,
    emissive: 0x324255,
    emissiveIntensity: 0.65
  });

  // =========================================================================
  // 1. Solid Walnut Wooden Desk (Warm, rich, medium-amber wood tone)
  // =========================================================================
  const deskY = -0.52;
  const deskWidth = 4.2;
  const deskDepth = 2.4;
  const deskThick = 0.08;

  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(deskWidth, deskThick, deskDepth),
    walnutMat
  );
  deskTop.position.set(0, deskY, -0.40);
  deskTop.receiveShadow = true;
  group.add(deskTop);

  // Bullnose front lip of desk
  const frontLip = new THREE.Mesh(
    new THREE.CylinderGeometry(deskThick / 2, deskThick / 2, deskWidth, 16),
    walnutMat
  );
  frontLip.rotation.z = Math.PI / 2;
  frontLip.position.set(0, deskY, -0.40 + deskDepth / 2);
  frontLip.receiveShadow = true;
  group.add(frontLip);

  // Matte black steel desk legs
  const legPositions = [
    { x: -deskWidth / 2 + 0.18, z: -0.40 - deskDepth / 2 + 0.18 },
    { x: deskWidth / 2 - 0.18, z: -0.40 - deskDepth / 2 + 0.18 },
    { x: -deskWidth / 2 + 0.18, z: -0.40 + deskDepth / 2 - 0.18 },
    { x: deskWidth / 2 - 0.18, z: -0.40 + deskDepth / 2 - 0.18 }
  ];
  legPositions.forEach((lp) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 2.5, 14),
      matteBlackMat
    );
    leg.position.set(lp.x, deskY - 1.25, lp.z);
    group.add(leg);
  });

  // =========================================================================
  // 2. Desktop Widescreen Monitor & Screenbar (Left side, matching frame_001.jpg)
  // =========================================================================
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(-0.78, deskY + deskThick / 2 + 0.005, -0.62);
  monitorGroup.rotation.y = 0.28; // Angled ~16° toward center desk

  // Aluminum Stand Base on desk (Clean curved rectangular plate)
  const standBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.012, 0.24),
    aluminumMat
  );
  standBase.position.set(0, 0.006, 0);
  standBase.receiveShadow = true;
  monitorGroup.add(standBase);

  // Aluminum Stand Upright Arm / Column
  const standNeck = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.48, 0.045),
    aluminumMat
  );
  standNeck.position.set(0, 0.24, -0.06);
  standNeck.rotation.x = -0.08;
  monitorGroup.add(standNeck);

  // Monitor Display Body
  const screenW = 1.26;
  const screenH = 0.72;
  const screenBack = new THREE.Mesh(
    new THREE.BoxGeometry(screenW, screenH, 0.022),
    matteBlackMat
  );
  screenBack.position.set(0, 0.49, 0.04);
  monitorGroup.add(screenBack);

  // Screen Face with dark mountain wallpaper & Windows 11 taskbar
  const screenFace = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW - 0.018, screenH - 0.018),
    screenMat
  );
  screenFace.position.set(0, 0.49, 0.052);
  monitorGroup.add(screenFace);

  // Monitor Light Bar (Screenbar) mounted on top of monitor (frame_001.jpg)
  const screenbarY = 0.49 + screenH / 2 + 0.02;
  const screenbar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.65, 16),
    aluminumMat
  );
  screenbar.rotation.z = Math.PI / 2;
  screenbar.position.set(0, screenbarY, 0.075);
  monitorGroup.add(screenbar);

  // Light strip on screenbar casting warm wash downward onto desk
  const lightStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.60, 0.005, 0.01),
    new THREE.MeshBasicMaterial({ color: 0xfff2e0 })
  );
  lightStrip.position.set(0, screenbarY - 0.014, 0.075);
  monitorGroup.add(lightStrip);

  const screenbarLight = new THREE.SpotLight(0xfff0db, 2.2, 3.2, Math.PI / 3.2, 0.65);
  screenbarLight.position.set(0, screenbarY, 0.075);
  screenbarLight.target.position.set(0, 0, 0.38);
  monitorGroup.add(screenbarLight);
  monitorGroup.add(screenbarLight.target);

  group.add(monitorGroup);

  // =========================================================================
  // 3. Mechanical Keyboard (Center-left, angled ~14° matching frame_001.jpg)
  // =========================================================================
  const keyboardGroup = new THREE.Group();
  keyboardGroup.position.set(-0.32, deskY + deskThick / 2 + 0.004, -0.12);
  keyboardGroup.rotation.y = 0.22; // Angled naturally

  // Keyboard body
  const kbBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.02, 0.165),
    matteBlackMat
  );
  kbBody.position.y = 0.01;
  keyboardGroup.add(kbBody);

  // Sculpted keycaps (rows)
  const keycapRowMat = new THREE.MeshStandardMaterial({
    color: 0x242830,
    roughness: 0.52,
    metalness: 0.12
  });

  for (let r = 0; r < 5; r++) {
    const rz = -0.058 + r * 0.029;
    const rowMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.012, 0.024),
      keycapRowMat
    );
    rowMesh.position.set(0, 0.024, rz);
    keyboardGroup.add(rowMesh);
  }

  // Keyboard subtle warm backlight
  const kbGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.45, 0.14),
    new THREE.MeshBasicMaterial({
      color: 0xffaa44,
      transparent: true,
      opacity: 0.16
    })
  );
  kbGlow.rotation.x = -Math.PI / 2;
  kbGlow.position.set(0, 0.021, 0);
  keyboardGroup.add(kbGlow);

  group.add(keyboardGroup);

  // =========================================================================
  // 4. Ergonomic Wireless Mouse (Beside / behind book, matching frame_001.jpg)
  // =========================================================================
  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(0.12, deskY + deskThick / 2 + 0.004, -0.28);
  mouseGroup.rotation.y = -0.15;

  const mouseBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.076, 0.035, 0.126),
    matteBlackMat
  );
  mouseBody.position.y = 0.0175;
  mouseGroup.add(mouseBody);

  // Metallic scroll wheel
  const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.009, 0.016, 14),
    aluminumMat
  );
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.034, -0.028);
  mouseGroup.add(wheel);

  group.add(mouseGroup);

  // =========================================================================
  // 5. Steaming Coffee Mug & Artist Pen Cup (Upper-center, matching frame_001.jpg)
  // =========================================================================
  const coffeeGroup = new THREE.Group();
  coffeeGroup.position.set(0.02, deskY + deskThick / 2 + 0.004, -0.62);

  // Wooden Coaster
  const coaster = new THREE.Mesh(
    new THREE.CylinderGeometry(0.088, 0.088, 0.014, 20),
    walnutMat
  );
  coaster.position.y = 0.007;
  coffeeGroup.add(coaster);

  // Glass / Ceramic Mug
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.066, 0.052, 0.13, 22),
    new THREE.MeshStandardMaterial({
      color: 0xe8e2d8,
      roughness: 0.22,
      metalness: 0.08
    })
  );
  mug.position.y = 0.078;
  coffeeGroup.add(mug);

  // Coffee froth layer
  const coffeeLiquid = new THREE.Mesh(
    new THREE.CircleGeometry(0.06, 18),
    new THREE.MeshStandardMaterial({
      color: 0x4a2a16,
      roughness: 0.18,
      metalness: 0.12
    })
  );
  coffeeLiquid.rotation.x = -Math.PI / 2;
  coffeeLiquid.position.y = 0.138;
  coffeeGroup.add(coffeeLiquid);

  // Mug handle
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.04, 0.01, 8, 16, Math.PI * 1.3),
    new THREE.MeshStandardMaterial({ color: 0xe8e2d8, roughness: 0.22 })
  );
  handle.position.set(0.074, 0.078, 0);
  handle.rotation.z = Math.PI / 4;
  coffeeGroup.add(handle);

  // Animated Steam Particles rising gently
  const steamCount = 14;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  for (let i = 0; i < steamCount; i++) {
    steamPos[i * 3] = (Math.random() - 0.5) * 0.05;
    steamPos[i * 3 + 1] = 0.15 + (i / steamCount) * 0.26;
    steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

  const steamMat = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffeedd,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const steamParticles = new THREE.Points(steamGeo, steamMat);
  coffeeGroup.add(steamParticles);

  // Cylindrical Pen Holder cup next to coffee (frame_001.jpg)
  const penCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.038, 0.12, 18),
    matteBlackMat
  );
  penCup.position.set(-0.16, 0.06, 0.02);
  coffeeGroup.add(penCup);

  // Pencils / styluses sticking out
  for (let p = 0; p < 4; p++) {
    const pen = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.18, 8),
      new THREE.MeshStandardMaterial({
        color: p % 2 === 0 ? 0xbaa482 : 0x22262d,
        roughness: 0.4
      })
    );
    pen.position.set(-0.16 + (p - 1.5) * 0.012, 0.12, 0.02 + (p % 2) * 0.01);
    pen.rotation.z = (p - 1.5) * 0.1;
    coffeeGroup.add(pen);
  }

  group.add(coffeeGroup);

  // =========================================================================
  // 6. Radiant Sunburst Caustic Light on Desk (Below Book, frame_005.jpg)
  // =========================================================================
  const sunburstGeo = new THREE.PlaneGeometry(1.5, 1.5);
  const sunburstMat = new THREE.MeshBasicMaterial({
    map: sunburstTex,
    transparent: true,
    opacity: 0.0, // Ramped up on hover and levitation!
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const deskSunburst = new THREE.Mesh(sunburstGeo, sunburstMat);
  deskSunburst.rotation.x = -Math.PI / 2;
  deskSunburst.position.set(0.36, deskY + deskThick / 2 + 0.002, 0.05);
  group.add(deskSunburst);

  // =========================================================================
  // 7. Background Warm Room Architecture (NOT dark! Warm cream wall & sofa)
  // =========================================================================
  // Warm plaster cream back wall (matching frame_001.jpg, frame_007.jpg)
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xd2c7b8, // Warm light cream/taupe plaster wall
    roughness: 0.82,
    metalness: 0.02
  });

  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(10.0, 6.0),
    wallMat
  );
  backWall.position.set(0, 0.9, -1.95);
  group.add(backWall);

  // Framed Wall Artwork mounted on wall behind monitor (frame_010.jpg)
  const artGroup = new THREE.Group();
  artGroup.position.set(-0.65, 0.95, -1.93);

  const artFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.74, 0.02),
    matteBlackMat
  );
  artGroup.add(artFrame);

  const artCanvas = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.70),
    new THREE.MeshStandardMaterial({ map: artTex, roughness: 0.6 })
  );
  artCanvas.position.z = 0.011;
  artGroup.add(artCanvas);
  group.add(artGroup);

  // Cozy Lounge Sofa in background right (warm charcoal fabric + cream cushions)
  const sofaGroup = new THREE.Group();
  sofaGroup.position.set(1.45, deskY - 0.15, -1.55);
  sofaGroup.rotation.y = -0.32;

  const sofaMat = new THREE.MeshStandardMaterial({
    color: 0x3d352e, // Warm charcoal fabric
    roughness: 0.85
  });

  const sofaSeat = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.38, 0.82),
    sofaMat
  );
  sofaSeat.position.y = 0.25;
  sofaGroup.add(sofaSeat);

  const sofaBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.62, 0.24),
    sofaMat
  );
  sofaBack.position.set(0, 0.68, -0.31);
  sofaGroup.add(sofaBack);

  // Soft light-cream cushions/pillows leaning against sofa (frame_001.jpg)
  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0xd4c8b6, // Light cream cushion
    roughness: 0.8
  });

  const pillow1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.34, 0.12),
    pillowMat
  );
  pillow1.position.set(-0.24, 0.48, -0.16);
  pillow1.rotation.set(-0.25, 0.2, -0.15);
  sofaGroup.add(pillow1);

  const pillow2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.32, 0.11),
    new THREE.MeshStandardMaterial({ color: 0xb5a896, roughness: 0.82 })
  );
  pillow2.position.set(0.18, 0.46, -0.18);
  pillow2.rotation.set(-0.2, -0.18, 0.12);
  sofaGroup.add(pillow2);

  group.add(sofaGroup);

  // Cozy Window Curtains on far right (frame_001.jpg)
  const curtainMat = new THREE.MeshStandardMaterial({
    color: 0x2e2723,
    roughness: 0.92
  });
  const curtain = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.28, 3.8, 14),
    curtainMat
  );
  curtain.position.set(2.45, 0.8, -1.8);
  group.add(curtain);

  // Ambient Floor / Pendant Lamp (Right side, casting warm amber glow, frame_001.jpg)
  const lampGroup = new THREE.Group();
  lampGroup.position.set(1.55, deskY, -1.35);

  const lampPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 2.2, 10),
    aluminumMat
  );
  lampPole.position.y = 1.1;
  lampGroup.add(lampPole);

  const lampShade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.28, 0.26, 16),
    new THREE.MeshStandardMaterial({
      color: 0x2e1c12,
      emissive: 0xd47e28,
      emissiveIntensity: 0.95,
      roughness: 0.55
    })
  );
  lampShade.position.y = 1.95;
  lampGroup.add(lampShade);

  const deskLampLight = new THREE.PointLight(0xff9e3b, 2.4, 7.5);
  deskLampLight.position.set(0, 1.90, 0);
  lampGroup.add(deskLampLight);

  group.add(lampGroup);

  // Soft warm wall wash behind monitor (bias lighting)
  const wallBacklight = new THREE.PointLight(0xffe4be, 1.6, 4.5);
  wallBacklight.position.set(-0.78, 0.28, -1.35);
  group.add(wallBacklight);

  // =========================================================================
  // 8. Overall Bright, Warm Room Lighting (NOT dark!)
  // =========================================================================
  const roomAmbient = new THREE.AmbientLight(0xfff5ea, 1.15); // Bright, luminous ambient light
  group.add(roomAmbient);

  const ceilingKeyLight = new THREE.DirectionalLight(0xfff8ee, 1.25);
  ceilingKeyLight.position.set(1.5, 3.8, 2.0);
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
