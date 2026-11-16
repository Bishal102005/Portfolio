import * as THREE from 'three';

// ============================================================================
// Procedural Dark Walnut Desk Wood Texture Generator
// ============================================================================
export function createWalnutDeskTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Deep rich walnut wood gradient base
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  bgGrad.addColorStop(0, '#1c1009');
  bgGrad.addColorStop(0.25, '#28170d');
  bgGrad.addColorStop(0.5, '#341f12');
  bgGrad.addColorStop(0.75, '#26160d');
  bgGrad.addColorStop(1, '#1a0f08');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Longitudinal wavy grain lines
  for (let y = 0; y < 1024; y += 2) {
    const wave = Math.sin(y * 0.015) * 16 + Math.sin(y * 0.005) * 28 + Math.cos(y * 0.03) * 6;
    const tone = Math.sin(y * 0.10 + wave * 0.035);
    const alpha = 0.07 + Math.max(0, tone) * 0.12;
    ctx.fillStyle = `rgba(10, 5, 2, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 1024, 1.8);

    // Warm amber satin varnish sheen on grain ridges
    if (y % 8 === 0) {
      const hl = 0.035 + Math.sin(y * 0.05 + wave * 0.02) * 0.025;
      if (hl > 0) {
        ctx.fillStyle = `rgba(210, 140, 75, ${hl.toFixed(3)})`;
        ctx.fillRect(0, y + 0.5, 1024, 1.0);
      }
    }
  }

  // Walnut wood pores
  for (let i = 0; i < 400; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rw = 12 + Math.random() * 35;
    const rh = 1.0 + Math.random() * 1.5;
    ctx.fillStyle = 'rgba(180, 115, 60, 0.04)';
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
  skyGrad.addColorStop(0, '#060a12');
  skyGrad.addColorStop(0.45, '#0e1624');
  skyGrad.addColorStop(0.85, '#1a2232');
  skyGrad.addColorStop(1, '#242b3a');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1024, 576);

  // Tiny distant stars
  for (let i = 0; i < 85; i++) {
    const sx = Math.random() * 1024;
    const sy = Math.random() * 320;
    const sr = Math.random() * 1.2 + 0.4;
    ctx.fillStyle = `rgba(235, 245, 255, ${(Math.random() * 0.7 + 0.3).toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layer 1: Distant dark mountains
  ctx.fillStyle = '#0b101a';
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
  duneGrad.addColorStop(0, '#121822');
  duneGrad.addColorStop(1, '#080c14');
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
  ctx.fillStyle = 'rgba(12, 16, 24, 0.75)';
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
  ctx.fillStyle = 'rgba(235, 240, 250, 0.75)';
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
  radGrad.addColorStop(0, 'rgba(255, 245, 200, 0.95)');
  radGrad.addColorStop(0.18, 'rgba(250, 205, 110, 0.75)');
  radGrad.addColorStop(0.45, 'rgba(235, 155, 45, 0.35)');
  radGrad.addColorStop(0.8, 'rgba(180, 95, 15, 0.08)');
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Sharp radiating rays of light (matching frame_003.jpg)
  const numRays = 48;
  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * Math.PI * 2;
    const len = 90 + (i % 3 === 0 ? 140 : i % 2 === 0 ? 100 : 65);
    const w = i % 3 === 0 ? 3.5 : 2.0;

    const x2 = cx + Math.cos(angle) * len;
    const y2 = cy + Math.sin(angle) * len;

    const rayGrad = ctx.createLinearGradient(cx, cy, x2, y2);
    rayGrad.addColorStop(0, 'rgba(255, 250, 220, 0.95)');
    rayGrad.addColorStop(0.3, 'rgba(255, 215, 120, 0.8)');
    rayGrad.addColorStop(0.8, 'rgba(240, 160, 40, 0.3)');
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
// Complete 3D Developer Workspace Scene (Desk, Monitor, Screenbar, Coffee, Mouse)
// ============================================================================
export interface DeskWorkspaceResult {
  group: THREE.Group;
  deskSunburst: THREE.Mesh;
  steamParticles: THREE.Points;
  screenbarLight: THREE.SpotLight;
  deskLampLight: THREE.PointLight;
}

export function createDeskWorkspaceScene(): DeskWorkspaceResult {
  const group = new THREE.Group();
  group.name = 'developer-workspace-scene';

  const walnutTex = createWalnutDeskTexture();
  const screenTex = createMonitorWallpaperTexture();
  const sunburstTex = createSunburstTexture();

  // Core PBR Materials
  const walnutMat = new THREE.MeshStandardMaterial({
    map: walnutTex,
    roughness: 0.44,
    metalness: 0.08
  });

  const matteBlackMat = new THREE.MeshStandardMaterial({
    color: 0x121418,
    roughness: 0.65,
    metalness: 0.25
  });

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0x8a929e,
    roughness: 0.32,
    metalness: 0.85
  });

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    roughness: 0.22,
    metalness: 0.05,
    emissive: 0x243244,
    emissiveIntensity: 0.45
  });

  const deskPadMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.88,
    metalness: 0.02
  });

  // =========================================================================
  // 1. Solid Walnut Wooden Desk (Matching frame_001.jpg)
  // =========================================================================
  const deskY = -0.55;
  const deskWidth = 3.6;
  const deskDepth = 2.0;
  const deskThick = 0.08;

  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(deskWidth, deskThick, deskDepth),
    walnutMat
  );
  deskTop.position.set(0, deskY, -0.45);
  deskTop.receiveShadow = true;
  group.add(deskTop);

  // Chamfered front bullnose edge of the desk
  const frontLip = new THREE.Mesh(
    new THREE.CylinderGeometry(deskThick / 2, deskThick / 2, deskWidth, 14),
    walnutMat
  );
  frontLip.rotation.z = Math.PI / 2;
  frontLip.position.set(0, deskY, -0.45 + deskDepth / 2);
  frontLip.receiveShadow = true;
  group.add(frontLip);

  // Minimalist matte black steel desk legs
  const legPositions = [
    { x: -deskWidth / 2 + 0.15, z: -0.45 - deskDepth / 2 + 0.15 },
    { x: deskWidth / 2 - 0.15, z: -0.45 - deskDepth / 2 + 0.15 },
    { x: -deskWidth / 2 + 0.15, z: -0.45 + deskDepth / 2 - 0.15 },
    { x: deskWidth / 2 - 0.15, z: -0.45 + deskDepth / 2 - 0.15 }
  ];
  legPositions.forEach((lp) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 2.5, 12),
      matteBlackMat
    );
    leg.position.set(lp.x, deskY - 1.25, lp.z);
    group.add(leg);
  });

  // Large felt / leather desk mat in front of monitor
  const deskMat = new THREE.Mesh(
    new THREE.BoxGeometry(1.68, 0.006, 0.78),
    deskPadMat
  );
  deskMat.position.set(-0.45, deskY + deskThick / 2 + 0.003, -0.22);
  deskMat.receiveShadow = true;
  group.add(deskMat);

  // =========================================================================
  // 2. Desktop Monitor on Aluminum Stand (Left side, angled toward user)
  // =========================================================================
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(-0.95, deskY + deskThick / 2 + 0.01, -0.68);
  monitorGroup.rotation.y = 0.20; // Angled ~11° toward user

  // Aluminum Stand Base on desk
  const standBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.012, 0.26),
    aluminumMat
  );
  standBase.position.set(0, 0.006, 0);
  monitorGroup.add(standBase);

  // Stand Column / Neck
  const standNeck = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.52, 0.05),
    aluminumMat
  );
  standNeck.position.set(0, 0.26, -0.06);
  standNeck.rotation.x = -0.08;
  monitorGroup.add(standNeck);

  // Monitor Display Body
  const screenW = 1.25;
  const screenH = 0.72;
  const screenBack = new THREE.Mesh(
    new THREE.BoxGeometry(screenW, screenH, 0.024),
    matteBlackMat
  );
  screenBack.position.set(0, 0.52, 0.04);
  monitorGroup.add(screenBack);

  // Screen Face with dark aesthetic wallpaper
  const screenFace = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW - 0.02, screenH - 0.02),
    screenMat
  );
  screenFace.position.set(0, 0.52, 0.053);
  monitorGroup.add(screenFace);

  // Monitor Light Bar (Screenbar) mounted on top of monitor
  const screenbarY = 0.52 + screenH / 2 + 0.02;
  const screenbar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.016, 0.016, 0.65, 16),
    aluminumMat
  );
  screenbar.rotation.z = Math.PI / 2;
  screenbar.position.set(0, screenbarY, 0.08);
  monitorGroup.add(screenbar);

  // Light strip on screenbar casting warm wash downward
  const lightStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.60, 0.005, 0.012),
    new THREE.MeshBasicMaterial({ color: 0xffeed5 })
  );
  lightStrip.position.set(0, screenbarY - 0.015, 0.08);
  monitorGroup.add(lightStrip);

  const screenbarLight = new THREE.SpotLight(0xffedd2, 1.4, 2.5, Math.PI / 3.6, 0.6);
  screenbarLight.position.set(0, screenbarY, 0.08);
  screenbarLight.target.position.set(0, 0, 0.35);
  monitorGroup.add(screenbarLight);
  monitorGroup.add(screenbarLight.target);

  group.add(monitorGroup);

  // =========================================================================
  // 3. Mechanical Keyboard (Matching frame_001.jpg)
  // =========================================================================
  const keyboardGroup = new THREE.Group();
  keyboardGroup.position.set(-0.58, deskY + deskThick / 2 + 0.006, -0.16);
  keyboardGroup.rotation.y = 0.03;

  // Keyboard body
  const kbBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.022, 0.165),
    matteBlackMat
  );
  kbBody.position.y = 0.011;
  keyboardGroup.add(kbBody);

  // Keycap rows with subtle amber backlight glow
  const keycapRowMat = new THREE.MeshStandardMaterial({
    color: 0x22262e,
    roughness: 0.55,
    metalness: 0.15
  });

  for (let r = 0; r < 5; r++) {
    const rz = -0.058 + r * 0.029;
    const rowMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.012, 0.024),
      keycapRowMat
    );
    rowMesh.position.set(0, 0.026, rz);
    keyboardGroup.add(rowMesh);
  }

  // Keyboard ambient backplate glow
  const kbGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.45, 0.14),
    new THREE.MeshBasicMaterial({
      color: 0xffaa44,
      transparent: true,
      opacity: 0.18
    })
  );
  kbGlow.rotation.x = -Math.PI / 2;
  kbGlow.position.set(0, 0.023, 0);
  keyboardGroup.add(kbGlow);

  group.add(keyboardGroup);

  // =========================================================================
  // 4. Ergonomic Wireless Mouse (Matching frame_001.jpg)
  // =========================================================================
  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(-0.16, deskY + deskThick / 2 + 0.006, -0.22);
  mouseGroup.rotation.y = -0.06;

  const mouseBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.075, 0.034, 0.125),
    matteBlackMat
  );
  mouseBody.position.y = 0.017;
  mouseGroup.add(mouseBody);

  // Metallic scroll wheel
  const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.009, 0.016, 12),
    aluminumMat
  );
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.034, -0.028);
  mouseGroup.add(wheel);

  group.add(mouseGroup);

  // =========================================================================
  // 5. Steaming Coffee Mug on Wooden Saucer (Matching frame_001.jpg)
  // =========================================================================
  const coffeeGroup = new THREE.Group();
  coffeeGroup.position.set(-0.25, deskY + deskThick / 2 + 0.006, -0.76);

  // Wooden Coaster
  const coaster = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 0.014, 20),
    walnutMat
  );
  coaster.position.y = 0.007;
  coffeeGroup.add(coaster);

  // Glass/Ceramic Mug
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.054, 0.135, 20),
    new THREE.MeshStandardMaterial({
      color: 0xdfd8ce,
      roughness: 0.25,
      metalness: 0.1
    })
  );
  mug.position.y = 0.08;
  coffeeGroup.add(mug);

  // Coffee liquid surface
  const coffeeLiquid = new THREE.Mesh(
    new THREE.CircleGeometry(0.062, 18),
    new THREE.MeshStandardMaterial({
      color: 0x3d2010,
      roughness: 0.15,
      metalness: 0.2
    })
  );
  coffeeLiquid.rotation.x = -Math.PI / 2;
  coffeeLiquid.position.y = 0.142;
  coffeeGroup.add(coffeeLiquid);

  // Mug handle
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.042, 0.011, 8, 16, Math.PI * 1.3),
    new THREE.MeshStandardMaterial({ color: 0xdfd8ce, roughness: 0.25 })
  );
  handle.position.set(0.075, 0.08, 0);
  handle.rotation.z = Math.PI / 4;
  coffeeGroup.add(handle);

  // Animated Steam Particles rising gently
  const steamCount = 14;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  for (let i = 0; i < steamCount; i++) {
    steamPos[i * 3] = (Math.random() - 0.5) * 0.06;
    steamPos[i * 3 + 1] = 0.16 + (i / steamCount) * 0.28;
    steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

  const steamMat = new THREE.PointsMaterial({
    size: 0.055,
    color: 0xffeedd,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const steamParticles = new THREE.Points(steamGeo, steamMat);
  coffeeGroup.add(steamParticles);

  group.add(coffeeGroup);

  // =========================================================================
  // 6. Radiant Sunburst Caustic Light on Desk (Below Book, frame_005.jpg)
  // =========================================================================
  const sunburstGeo = new THREE.PlaneGeometry(1.4, 1.4);
  const sunburstMat = new THREE.MeshBasicMaterial({
    map: sunburstTex,
    transparent: true,
    opacity: 0.0, // Ramped up dynamically on hover and levitation!
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const deskSunburst = new THREE.Mesh(sunburstGeo, sunburstMat);
  deskSunburst.rotation.x = -Math.PI / 2;
  deskSunburst.position.set(0.48, deskY + deskThick / 2 + 0.002, -0.05);
  group.add(deskSunburst);

  // =========================================================================
  // 7. Background Room Architecture & Ambient Floor Lamp (frame_001.jpg)
  // =========================================================================
  // Warm plaster room back wall
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(8.0, 5.0),
    new THREE.MeshStandardMaterial({
      color: 0x1e191f,
      roughness: 0.92,
      metalness: 0.02
    })
  );
  backWall.position.set(0, 0.8, -2.2);
  group.add(backWall);

  // Ambient Floor Lamp in background corner (right side, casting warm amber cone)
  const lampGroup = new THREE.Group();
  lampGroup.position.set(1.65, deskY, -1.35);

  const lampPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.016, 0.016, 2.2, 10),
    aluminumMat
  );
  lampPole.position.y = 1.1;
  lampGroup.add(lampPole);

  const lampShade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.28, 0.28, 16),
    new THREE.MeshStandardMaterial({
      color: 0x2e1c12,
      emissive: 0xd47e28,
      emissiveIntensity: 0.85,
      roughness: 0.6
    })
  );
  lampShade.position.y = 1.95;
  lampGroup.add(lampShade);

  const deskLampLight = new THREE.PointLight(0xff9a38, 1.8, 6.5);
  deskLampLight.position.set(0, 1.90, 0);
  lampGroup.add(deskLampLight);

  group.add(lampGroup);

  // Background Lounge Sofa / Armchair in distance (subtly visible bokeh silhouette)
  const sofaGroup = new THREE.Group();
  sofaGroup.position.set(1.4, deskY - 0.2, -1.6);
  sofaGroup.rotation.y = -0.35;

  const sofaSeat = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.35, 0.75),
    new THREE.MeshStandardMaterial({ color: 0x2b211a, roughness: 0.85 })
  );
  sofaSeat.position.y = 0.25;
  sofaGroup.add(sofaSeat);

  const sofaBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.55, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x221812, roughness: 0.88 })
  );
  sofaBack.position.set(0, 0.65, -0.28);
  sofaGroup.add(sofaBack);

  group.add(sofaGroup);

  // =========================================================================
  // 8. Overall Atmosphere & Lighting
  // =========================================================================
  const roomAmbient = new THREE.AmbientLight(0xfff0dd, 0.55);
  group.add(roomAmbient);

  const roomKeyLight = new THREE.DirectionalLight(0xfff5ea, 0.75);
  roomKeyLight.position.set(1.5, 3.2, 2.0);
  group.add(roomKeyLight);

  return {
    group,
    deskSunburst,
    steamParticles,
    screenbarLight,
    deskLampLight
  };
}
