import * as THREE from 'three';
import { createShelfWall, createDarkWalnutTexture } from './shelfWall';
import { createInstancedBooks } from './instancedBooks';
import { createShelfProps } from './props';

// Classical Parquet Flooring for the lower library view
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

      // Fine wood grain lines inside each parquet block
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      for (let gy = y + 4; gy < y + plankH - 2; gy += 6) {
        ctx.fillRect(x + 2, gy, plankW - 4, 1.2);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 3);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Classical Persian Crimson Wool Runner Carpet
function createCarpetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#3a080c';
  ctx.fillRect(0, 0, 512, 1024);

  // Intricate gold & navy filigree borders
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 14;
  ctx.strokeRect(18, 18, 512 - 36, 1024 - 36);

  ctx.strokeStyle = '#0e1c2e';
  ctx.lineWidth = 8;
  ctx.strokeRect(32, 32, 512 - 64, 1024 - 64);

  // Central ornate medallion motifs
  for (let my = 140; my < 1000; my += 240) {
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(256, my, 45, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1c080b';
    ctx.beginPath();
    ctx.arc(256, my, 32, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Grand 3D Library Scene Constructor (Full Bookshelf Wall & Instanced Books)
// ============================================================================
export function createLibraryScene(isMobile: boolean = false): THREE.Group {
  const library = new THREE.Group();
  library.name = 'grand-library-hall';

  // 1. Textures & Materials
  const walnutTexture = createDarkWalnutTexture();
  const parquetTexture = createParquetTexture();
  const carpetTexture = createCarpetTexture();

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

  const ceilingMat = new THREE.MeshStandardMaterial({
    map: walnutTexture,
    roughness: 0.55,
    metalness: 0.04
  });

  // 2. Full Tall Wooden Bookshelf Wall (5 rows x 3 sections, dark walnut)
  const shelfWall = createShelfWall({ texture: walnutTexture });
  library.add(shelfWall.group);

  // 3. Packed Procedural Instanced Books (300+ books with gold bands)
  const instancedBooks = createInstancedBooks(
    shelfWall.rowPlankY,
    shelfWall.bayXCenters,
    shelfWall.bayWidth,
    isMobile
  );
  library.add(instancedBooks.group);

  // 4. Props (Brass Globe, Flickering Candles, Flat Book Stack, Plant, Scrolls)
  const props = createShelfProps(shelfWall.rowPlankY, shelfWall.bayXCenters);
  library.add(props.group);

  // 5. Room Architecture (Floor, Ceiling, Transverse Beams)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 18), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -4.6, 0);
  floor.receiveShadow = true;
  library.add(floor);

  const runner = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 12), carpetMat);
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(0, -4.59, 0.8);
  runner.receiveShadow = true;
  library.add(runner);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(24, 18), ceilingMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, 5.2, 0);
  library.add(ceiling);

  // Ceiling transverse dark walnut beams
  for (let z = -6; z <= 3; z += 2.2) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(22, 0.36, 0.42), ceilingMat);
    beam.position.set(0, 5.02, z);
    library.add(beam);
  }

  // 6. Volumetric Sunlight Shaft / God Ray Beam cutting from top-left
  const beamGeo = new THREE.CylinderGeometry(0.5, 2.8, 10.5, 16, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xffdf95,
    transparent: true,
    opacity: 0.055,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const lightBeam = new THREE.Mesh(beamGeo, beamMat);
  lightBeam.position.set(-2.2, 1.8, -1.5);
  lightBeam.rotation.z = -0.50; // Angled down from top-left
  lightBeam.rotation.x = 0.15;
  library.add(lightBeam);

  // 7. Atmospheric Golden Dust Motes (Floating in the Light Beam)
  const motesCount = isMobile ? 35 : 75;
  const motesGeo = new THREE.BufferGeometry();
  const motesPos = new Float32Array(motesCount * 3);

  for (let i = 0; i < motesCount; i++) {
    motesPos[i * 3] = -4.5 + Math.random() * 9.0;
    motesPos[i * 3 + 1] = -3.5 + Math.random() * 7.5;
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

  // 8. Low-Key, Warm Chiaroscuro Lighting
  // Dim warm ambient baseline
  const ambientWarm = new THREE.HemisphereLight(0xffeedd, 0x140a05, 0.28);
  ambientWarm.name = 'library-ambient';
  library.add(ambientWarm);

  // Cinematic Golden Key Spotlight angled across the shelves
  const keySpot = new THREE.SpotLight(0xffe2a0, 2.0, 14.0, Math.PI / 3.2, 0.5);
  keySpot.name = 'library-key-spot';
  keySpot.position.set(-3.5, 3.8, 1.8);
  keySpot.target.position.set(0, 0.0, -2.05);
  keySpot.castShadow = true;
  keySpot.shadow.bias = -0.0005;
  keySpot.shadow.mapSize.width = isMobile ? 512 : 1024;
  keySpot.shadow.mapSize.height = isMobile ? 512 : 1024;
  library.add(keySpot);
  library.add(keySpot.target);

  // Soft Spotlight directly from above focused on Bishal's featured centerpiece book
  const heroSpot = new THREE.SpotLight(0xfff5e0, 2.4, 9.5, Math.PI / 3.8, 0.42);
  heroSpot.name = 'library-hero-spot';
  heroSpot.position.set(0, 2.8, -0.4);
  heroSpot.target.position.set(0, 0.0, -2.05);
  library.add(heroSpot);
  library.add(heroSpot.target);

  // Cool soft blue moonlight fill from the high window to deepen shadow tones
  const moonFill = new THREE.DirectionalLight(0x4a6e9a, 0.35);
  moonFill.position.set(2.5, 3.5, 2.0);
  library.add(moonFill);

  return library;
}
