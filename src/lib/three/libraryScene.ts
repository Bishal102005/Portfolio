import * as THREE from 'three';
import { createShelfWall, createDarkWalnutTexture } from './shelfWall';
import { createInstancedBooks } from './instancedBooks';
import { createShelfProps } from './props';
import { createGallery } from './gallery';
import { createLibraryFurniture } from './furniture';
import { createArchedWindows } from './windows';
import { LIBRARY_CONFIG } from '../constants/libraryRoomConfig';

// Classical Parquet Flooring for the grand library hall
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

      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      for (let gy = y + 4; gy < y + plankH - 2; gy += 6) {
        ctx.fillRect(x + 2, gy, plankW - 4, 1.2);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 10);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Classical Persian Crimson Wool Runner Carpet
function createCarpetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#34080c';
  ctx.fillRect(0, 0, 512, 1024);

  // Ornate gold & navy filigree borders
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 14;
  ctx.strokeRect(18, 18, 512 - 36, 1024 - 36);

  ctx.strokeStyle = '#0e1c2e';
  ctx.lineWidth = 8;
  ctx.strokeRect(32, 32, 512 - 64, 1024 - 64);

  // Central medallions
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
  tex.repeat.set(1, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Grand 3D Library Interior Room Constructor (12m x 20m x 8.5m)
// ============================================================================
export function createLibraryScene(isMobile: boolean = false): THREE.Group {
  const library = new THREE.Group();
  library.name = 'grand-library-interior-hall';

  const { room, lighting: lightCfg } = LIBRARY_CONFIG;

  // 1. Textures & Core Materials
  const walnutTexture = createDarkWalnutTexture();
  const parquetTexture = createParquetTexture();
  const carpetTexture = createCarpetTexture();

  const walnutMat = new THREE.MeshStandardMaterial({
    map: walnutTexture,
    roughness: 0.52,
    metalness: 0.06
  });

  const floorMat = new THREE.MeshStandardMaterial({
    map: parquetTexture,
    roughness: 0.48,
    metalness: 0.12
  });

  const carpetMat = new THREE.MeshStandardMaterial({
    map: carpetTexture,
    roughness: 0.85,
    metalness: 0.02
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a559,
    roughness: 0.28,
    metalness: 0.88
  });

  // 2. Focal Bookshelf Wall (Where Bishal's Featured Book sits at Y = 0.0)
  const focalShelfWall = createShelfWall({ texture: walnutTexture });
  library.add(focalShelfWall.group);

  // 3. Side Wall Shelves (Left & Right Walls, Ground + Gallery tiers)
  const sideShelvesLength = room.length - 2.0; // 18m
  const sideShelvesZCenter = (sideShelvesLength / 2) - 4.0;
  const sideWallXPositions = [-room.width / 2 + 0.45, room.width / 2 - 0.45];

  sideWallXPositions.forEach((wx) => {
    // Backing panels for side shelves
    const sideBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, room.height, sideShelvesLength),
      walnutMat
    );
    sideBack.position.set(wx > 0 ? wx + 0.45 : wx - 0.45, (room.floorY + room.ceilingY) / 2, sideShelvesZCenter);
    library.add(sideBack);

    // Shelf planks running the length of the side walls
    const tierYs = [
      room.floorY + 0.15,
      room.floorY + 1.45,
      room.floorY + 2.75,
      room.floorY + 3.85 + 0.15,
      room.floorY + 3.85 + 1.45,
      room.floorY + 3.85 + 2.75
    ];
    tierYs.forEach((ty) => {
      const sidePlank = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.08, sideShelvesLength),
        walnutMat
      );
      sidePlank.position.set(wx, ty, sideShelvesZCenter);
      sidePlank.receiveShadow = true;
      library.add(sidePlank);
    });
  });

  // 4. Second-Level Gallery Balcony & Spiral Staircase
  const gallery = createGallery(walnutMat);
  library.add(gallery);

  // 5. Central Aisle Furniture (Rolling Ladder, Reading Tables, Leather Armchairs)
  const furniture = createLibraryFurniture(walnutMat);
  library.add(furniture.group);

  // 6. Arched Far Windows & Volumetric Moonlight Beams
  const windows = createArchedWindows();
  library.add(windows);

  // 7. 2,000+ Instanced Books Across All Shelf Walls & Tiers
  const instancedBooks = createInstancedBooks(
    focalShelfWall.rowPlankY,
    focalShelfWall.bayXCenters,
    focalShelfWall.bayWidth,
    isMobile
  );
  library.add(instancedBooks.group);

  // 8. Shelf Props (Brass Globe, Flickering Candles, Flat Stack, Urn Plant, Scrolls)
  const props = createShelfProps(focalShelfWall.rowPlankY, focalShelfWall.bayXCenters);
  library.add(props.group);

  // 9. Floor & Central Aisle Runner Carpet
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(room.width + 4.0, room.length + 4.0), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, room.floorY, sideShelvesZCenter);
  floor.receiveShadow = true;
  library.add(floor);

  const runner = new THREE.Mesh(new THREE.PlaneGeometry(3.2, room.length - 2.0), carpetMat);
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(0, room.floorY + 0.01, sideShelvesZCenter);
  runner.receiveShadow = true;
  library.add(runner);

  // 10. Vaulted Coffered Wooden Ceiling & Hanging Chandeliers
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(room.width, room.length), walnutMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, room.ceilingY, sideShelvesZCenter);
  library.add(ceiling);

  // Coffered Ceiling Grid Beams
  for (let z = -4.0; z <= 14.0; z += 2.8) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(room.width, 0.38, 0.36), walnutMat);
    beam.position.set(0, room.ceilingY - 0.19, z);
    library.add(beam);
  }
  for (let x = -4.2; x <= 4.2; x += 2.8) {
    const beamX = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, room.length), walnutMat);
    beamX.position.set(x, room.ceilingY - 0.19, sideShelvesZCenter);
    library.add(beamX);
  }

  // 10. Hanging Spherical Milk-Glass Globe Pendant Lamps (Matching sec_01.jpg & sec_02.jpg)
  const globeGlassMat = new THREE.MeshStandardMaterial({
    color: 0xfff4e0,
    emissive: 0xffd275,
    emissiveIntensity: 0.85,
    roughness: 0.18,
    metalness: 0.05
  });

  lightCfg.chandeliers.forEach((chPos, cIdx) => {
    const pendant = new THREE.Group();
    pendant.position.set(chPos.x, chPos.y, chPos.z);

    // Brass suspension chain
    const chainH = room.ceilingY - chPos.y;
    const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, chainH, 6), brassMat);
    chain.position.y = chainH / 2;
    pendant.add(chain);

    // Brass fitting cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.08, 14), brassMat);
    cap.position.y = 0.22;
    pendant.add(cap);

    // Glowing Milk-Glass Globe
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 16), globeGlassMat);
    pendant.add(globe);

    // Warm amber pendant pool light
    const chLight = new THREE.PointLight(0xffbe65, 1.6, 12.0);
    chLight.name = `chandelier-light-${cIdx + 1}`;
    pendant.add(chLight);

    library.add(pendant);
  });

  // Authentic Stacks of Antique Books on Left and Right Floor (Matching sec_01.jpg)
  const bookColors = [0x340b12, 0x162215, 0x3e2010, 0x141416, 0x421018, 0x2e170b];
  const stackPositions = [
    { x: -2.8, z: -4.2, count: 8 },
    { x: -3.4, z: -3.8, count: 6 },
    { x: 2.8, z: -4.5, count: 9 },
    { x: 3.5, z: -3.9, count: 5 }
  ];

  stackPositions.forEach((st) => {
    let curY = room.floorY;
    for (let k = 0; k < st.count; k++) {
      const bw = 0.52 + (Math.sin(k * 1.5) * 0.06);
      const bd = 0.36 + (Math.cos(k * 1.8) * 0.04);
      const bh = 0.07 + (k % 2 === 0 ? 0.02 : -0.01);
      const rot = (Math.sin(k * 2.3) * 0.12);

      const stackBook = new THREE.Mesh(
        new THREE.BoxGeometry(bw, bh, bd),
        new THREE.MeshStandardMaterial({
          color: bookColors[k % bookColors.length],
          roughness: 0.58,
          metalness: 0.06
        })
      );
      stackBook.position.set(st.x, curY + bh / 2, st.z);
      stackBook.rotation.y = rot;
      stackBook.castShadow = true;
      stackBook.receiveShadow = true;
      library.add(stackBook);

      curY += bh + 0.003;
    }
  });

  // 11. Atmospheric Golden Dust Motes in Light Beams
  const motesCount = isMobile ? 45 : 120;
  const motesGeo = new THREE.BufferGeometry();
  const motesPos = new Float32Array(motesCount * 3);

  for (let i = 0; i < motesCount; i++) {
    motesPos[i * 3] = -5.0 + Math.random() * 10.0;
    motesPos[i * 3 + 1] = room.floorY + Math.random() * (room.ceilingY - room.floorY);
    motesPos[i * 3 + 2] = -3.5 + Math.random() * 16.0;
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

  // 12. Master Chiaroscuro Lighting
  const ambientWarm = new THREE.HemisphereLight(lightCfg.ambientColor, 0x140a05, lightCfg.ambientIntensity);
  ambientWarm.name = 'library-ambient';
  library.add(ambientWarm);

  const heroSpot = new THREE.SpotLight(lightCfg.heroSpotColor, lightCfg.heroSpotIntensity, 9.5, Math.PI / 3.8, 0.42);
  heroSpot.name = 'library-hero-spot';
  heroSpot.position.set(0, 2.8, -0.4);
  heroSpot.target.position.set(0, 0.0, -2.05);
  heroSpot.castShadow = true;
  library.add(heroSpot);
  library.add(heroSpot.target);

  const aisleFill = new THREE.DirectionalLight(0x4a6e9a, 0.28);
  aisleFill.position.set(2.5, 3.5, 5.0);
  library.add(aisleFill);

  // 13. Soft Morning Daylight Streaming from High Arched Windows (Matching sec_01.jpg)
  const windowDaylight = new THREE.DirectionalLight(0xe8f4ff, 0.95);
  windowDaylight.name = 'library-window-daylight';
  windowDaylight.position.set(0, 6.5, -12.5);
  windowDaylight.target.position.set(0, -1.0, -2.5);
  library.add(windowDaylight);
  library.add(windowDaylight.target);

  return library;
}
