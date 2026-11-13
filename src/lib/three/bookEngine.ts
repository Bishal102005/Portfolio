import * as THREE from 'three';
import { FACES, HIT, TH, TW } from './pageDrawers';
import { NAMES } from '../constants/portfolioData';
import { createLibraryScene } from './libraryScene';

export interface Sheet {
  geo: THREE.PlaneGeometry;
  fm: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
  bm: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
  p: number;
  tp: number;
}

export interface BookEngineOptions {
  canvas: HTMLCanvasElement;
  onSpreadChange: (target: number) => void;
  onPortraitChange?: (portrait: boolean) => void;
  onHintHide?: () => void;
  onFloatingChange?: (floating: boolean) => void;
  initialFloating?: boolean;
}

// Procedural generator for Bishal's luxury leather book spine with 24k gold filigree
function createSpineTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  const bgGrad = ctx.createLinearGradient(0, 0, 256, 0);
  bgGrad.addColorStop(0, '#0a0b10');
  bgGrad.addColorStop(0.18, '#161922');
  bgGrad.addColorStop(0.5, '#202430');
  bgGrad.addColorStop(0.82, '#161922');
  bgGrad.addColorStop(1, '#0a0b10');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 256, 1024);

  for (let i = 0; i < 1800; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 1024;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(x, y, 2, 2);
  }

  ctx.strokeStyle = '#d4a359';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(14, 18, 228, 988);
  ctx.strokeStyle = 'rgba(245, 212, 133, 0.65)';
  ctx.lineWidth = 1;
  ctx.strokeRect(18, 22, 220, 980);

  const ribYs = [125, 305, 515, 715, 885];
  ribYs.forEach((ry) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(8, ry + 8, 240, 6);
    ctx.fillStyle = '#b88636';
    ctx.fillRect(8, ry, 240, 8);
    ctx.fillStyle = '#fbe39d';
    ctx.fillRect(8, ry, 240, 3);
    for (let dx = 22; dx < 236; dx += 14) {
      ctx.fillStyle = '#5c3909';
      ctx.fillRect(dx, ry + 2, 3, 3);
    }
  });

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '24px serif';
  ctx.fillStyle = '#fbe39d';
  ctx.fillText('✦ ✦ ✦', 128, 70);

  ctx.font = '700 24px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('B I S H A L', 128, 195);
  ctx.fillText('S A H A', 128, 228);

  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#d4a359';
  ctx.fillText('━━━━ ✦ ━━━━', 128, 258);

  ctx.font = '700 25px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#fbe39d';
  ctx.fillText('THE', 128, 390);
  ctx.font = '700 28px "Playfair Display", Georgia, serif';
  ctx.fillText('PORTFOLIO', 128, 426);

  ctx.font = '600 15px Inter, sans-serif';
  ctx.fillStyle = '#dcd3c3';
  ctx.fillText('SELECTED WORKS', 128, 462);

  ctx.font = '600 17px Inter, sans-serif';
  ctx.fillStyle = '#d4a359';
  ctx.fillText('CREATIVE DEV', 128, 595);
  ctx.font = '500 15px "Playfair Display", Georgia, serif';
  ctx.fillText('VOLUME I', 128, 625);

  ctx.font = '500 17px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#fbe39d';
  ctx.fillText('• 2026 •', 128, 798);

  ctx.font = '24px serif';
  ctx.fillText('❖', 128, 940);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Procedural texture for soft radial golden aura glow
function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const rad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  rad.addColorStop(0, 'rgba(255, 235, 150, 0.95)');
  rad.addColorStop(0.25, 'rgba(245, 180, 50, 0.7)');
  rad.addColorStop(0.6, 'rgba(220, 130, 20, 0.25)');
  rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, 256, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class BookEngine {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private group!: THREE.Group;
  private sheets: Sheet[] = [];
  private backLeft!: THREE.Mesh;
  private backRight!: THREE.Mesh;
  private spine!: THREE.Mesh;
  private ribbonBookmark!: THREE.Mesh;
  private pickHitBox!: THREE.Mesh;
  private spineTexture!: THREE.CanvasTexture;
  private readingLight!: THREE.DirectionalLight;
  private readingFillLight!: THREE.PointLight;

  // Magical Golden Aura & Embers for Bishal's Glowing Book
  private bookAuraLight!: THREE.PointLight;
  private spineGlowPlane!: THREE.Mesh;
  private bookParticlesGeo!: THREE.BufferGeometry;
  private bookParticles!: THREE.Points;
  private bookParticleAngles!: Float32Array;
  private bookParticleRadii!: Float32Array;
  private bookParticleSpeeds!: Float32Array;
  private bookParticleHeights!: Float32Array;

  private textures: THREE.CanvasTexture[] = [];
  private raycaster = new THREE.Raycaster();

  private W = 1.4;
  private H = 1.98;
  private N = 26;
  private S = 8;
  private E = 0.006;
  private isReducedMotion = false;

  public cur = 0;
  public target = 0;
  public side = 1;
  public portrait = false;
  public isFloating = false;
  private isBookHovered = false;

  private acc = 0;
  private hov = 0;
  private dist = 4.4;
  private px = 0;
  private py = 0;
  private wheelT = 0;
  private last = performance.now();
  private animId: number | null = null;
  private isDisposed = false;
  private pointerDownCoord: [number, number] | null = null;

  private onSpreadChange: (target: number) => void;
  private onPortraitChange?: (portrait: boolean) => void;
  private onHintHide?: () => void;
  private onFloatingChange?: (floating: boolean) => void;

  constructor(options: BookEngineOptions) {
    this.canvas = options.canvas;
    this.onSpreadChange = options.onSpreadChange;
    this.onPortraitChange = options.onPortraitChange;
    this.onHintHide = options.onHintHide;
    this.onFloatingChange = options.onFloatingChange;
    this.isFloating = options.initialFloating ?? false;
  }

  public async init(initialSpread = 0): Promise<boolean> {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
      });
    } catch {
      return false;
    }

    if (typeof window !== 'undefined') {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Modern color space, ACES Filmic Tone Mapping, & Soft Shadows for cinematic realism
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(48, 1, 0.1, 60);
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Build grand 3D virtual library environment
    const library = createLibraryScene();
    this.scene.add(library);

    // Balanced, atmospheric ambient and directional lighting
    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x3a2518, 0.9);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 0.85);
    dirLight.position.set(-2, 3.5, 4);
    this.scene.add(dirLight);

    const lampLight = new THREE.PointLight(0xf59e0b, 0.8, 10);
    lampLight.position.set(-2.5, 1.2, 1.8);
    this.scene.add(lampLight);

    // Dedicated Reading Key Light directly illuminating the floating book (soft, balanced, non-glaring)
    this.readingLight = new THREE.DirectionalLight(0xfffbf5, this.isFloating ? 1.15 : 0.4);
    this.readingLight.position.set(0.1, 2.8, 4.2);
    this.scene.add(this.readingLight);

    // Soft warm front fill light directly for book pages
    this.readingFillLight = new THREE.PointLight(0xfff7ee, this.isFloating ? 0.65 : 0.25, 12);
    this.readingFillLight.position.set(0, 0.4, 3.6);
    this.scene.add(this.readingFillLight);

    // Canvas textures for book pages
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    this.textures = FACES.map((drawerFn, i) => {
      const c = document.createElement('canvas');
      c.width = TW;
      c.height = TH;
      const ctx = c.getContext('2d');
      if (ctx) drawerFn(ctx, i);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = maxAniso;
      if (i % 2) {
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.x = -1;
        t.offset.x = 1;
      }
      return t;
    });

    const createMat = (m: THREE.CanvasTexture, side: THREE.Side) =>
      new THREE.MeshStandardMaterial({
        map: m,
        side,
        roughness: 0.88,
        metalness: 0.0
      });

    // Build sheets
    this.sheets = [];
    for (let i = 0; i < this.S; i++) {
      const geo = new THREE.PlaneGeometry(this.W, this.H, this.N, 1);
      geo.translate(this.W / 2, 0, 0);

      const fm = new THREE.Mesh(geo, createMat(this.textures[2 * i], THREE.FrontSide));
      const bm = new THREE.Mesh(geo, createMat(this.textures[2 * i + 1], THREE.BackSide));
      fm.castShadow = true;
      fm.receiveShadow = true;
      bm.castShadow = true;
      bm.receiveShadow = true;
      this.group.add(fm, bm);
      this.sheets.push({ geo, fm, bm, p: -1, tp: 0 });
    }

    // Deep luxury leather cover boards
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x181a24,
      roughness: 0.55,
      metalness: 0.12
    });

    this.backRight = new THREE.Mesh(new THREE.BoxGeometry(this.W + 0.07, this.H + 0.07, 0.03), leatherMat);
    this.backLeft = this.backRight.clone();
    this.backRight.position.set(this.W / 2, 0, -0.02);
    this.backLeft.position.set(-this.W / 2, 0, -0.02);
    this.backRight.castShadow = true;
    this.backRight.receiveShadow = true;
    this.backLeft.castShadow = true;
    this.backLeft.receiveShadow = true;

    // Bishal's dedicated luxury spine
    this.spineTexture = createSpineTexture();
    const spineMat = new THREE.MeshStandardMaterial({
      map: this.spineTexture,
      roughness: 0.52,
      metalness: 0.15
    });

    const spineGeo = new THREE.BoxGeometry(0.06, this.H + 0.08, 0.14);
    const spineMaterials = [
      leatherMat,
      spineMat, // -X face: gold-stamped spine
      leatherMat,
      leatherMat,
      leatherMat,
      leatherMat
    ];
    this.spine = new THREE.Mesh(spineGeo, spineMaterials);
    this.spine.position.set(-0.03, 0, -0.02);
    this.spine.castShadow = true;
    this.spine.receiveShadow = true;
    this.group.add(this.backRight, this.backLeft, this.spine);

    // Golden Bookmark Ribbon draping down from spine
    const ribbonGeo = new THREE.PlaneGeometry(0.035, 0.32);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xd4a054,
      roughness: 0.35,
      metalness: 0.75,
      side: THREE.DoubleSide
    });
    this.ribbonBookmark = new THREE.Mesh(ribbonGeo, ribbonMat);
    this.ribbonBookmark.position.set(-0.031, -(this.H + 0.08) / 2 - 0.12, -0.02);
    this.ribbonBookmark.castShadow = true;
    this.group.add(this.ribbonBookmark);

    // =========================================================================
    // Magical Golden Glow Aura & Swirling Stardust Embers for Bishal's Book
    // =========================================================================
    const glowTex = createGlowTexture();

    // 1. PointLight attached inside the spine that softly pulses and casts warm golden backlight
    this.bookAuraLight = new THREE.PointLight(0xffbe3b, 1.8, 3.5);
    this.bookAuraLight.position.set(-0.06, 0, -0.05);
    this.group.add(this.bookAuraLight);

    // 2. Soft radial spine glow flare
    const spineGlowGeo = new THREE.PlaneGeometry(0.36, this.H + 0.22);
    const spineGlowMat = new THREE.MeshBasicMaterial({
      map: glowTex,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.spineGlowPlane = new THREE.Mesh(spineGlowGeo, spineGlowMat);
    this.spineGlowPlane.rotation.y = -Math.PI / 2;
    this.spineGlowPlane.position.set(-0.065, 0, -0.02);
    this.group.add(this.spineGlowPlane);

    // 3. Cluster of 24 delicate golden embers swirling gracefully around the book
    this.bookParticlesGeo = new THREE.BufferGeometry();
    const bPosArr = new Float32Array(24 * 3);
    this.bookParticleAngles = new Float32Array(24);
    this.bookParticleRadii = new Float32Array(24);
    this.bookParticleSpeeds = new Float32Array(24);
    this.bookParticleHeights = new Float32Array(24);

    for (let i = 0; i < 24; i++) {
      this.bookParticleAngles[i] = Math.random() * Math.PI * 2;
      this.bookParticleRadii[i] = 0.14 + Math.random() * 0.26;
      this.bookParticleSpeeds[i] = 0.4 + Math.random() * 0.6;
      this.bookParticleHeights[i] = (Math.random() - 0.5) * (this.H + 0.1);

      bPosArr[i * 3] = -0.03 + Math.cos(this.bookParticleAngles[i]) * this.bookParticleRadii[i];
      bPosArr[i * 3 + 1] = this.bookParticleHeights[i];
      bPosArr[i * 3 + 2] = -0.02 + Math.sin(this.bookParticleAngles[i]) * this.bookParticleRadii[i];
    }

    this.bookParticlesGeo.setAttribute('position', new THREE.BufferAttribute(bPosArr, 3));
    this.bookParticles = new THREE.Points(
      this.bookParticlesGeo,
      new THREE.PointsMaterial({
        size: 0.034,
        color: 0xffd875,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    this.group.add(this.bookParticles);

    // Invisible pick hit box for responsive hover and clicking
    const hitGeo = new THREE.BoxGeometry(0.75, this.H + 0.5, 0.75);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    this.pickHitBox = new THREE.Mesh(hitGeo, hitMat);
    this.group.add(this.pickHitBox);

    // Setup initial state
    this.cur = initialSpread;
    this.target = initialSpread;
    this.side = initialSpread === 8 ? 0 : initialSpread === 0 ? 1 : 0;

    this.sheets.forEach((s, i) => {
      s.p = s.tp = i < this.cur ? 1 : 0;
      this.bend(s, i);
    });

    if (!this.isFloating) {
      this.group.position.set(0, 0.0, -2.05);
      this.group.rotation.set(0, Math.PI / 2, 0);
      this.dist = 4.4;
    } else {
      this.group.position.set(0, 0, 0);
      this.group.rotation.set(-0.08, 0, 0);
      this.dist = 4.4;
    }

    this.attachEventListeners();
    this.handleResize();

    this.last = performance.now();
    this.animate(this.last);

    return true;
  }

  private bend(s: Sheet, i: number) {
    const p = s.p;
    const th = p * Math.PI;
    const lag = Math.sin(p * Math.PI) * 0.55;
    const a = s.geo.attributes.position.array as Float32Array;
    const dx = this.W / this.N;
    const k = p * p * (3 - 2 * p);
    const zb = (this.S - i) * this.E * (1 - k) + i * this.E * k;
    let x = 0;
    let z = 0;

    for (let j = 0; j <= this.N; j++) {
      if (j) {
        const ph = th - (lag * j) / this.N;
        x += Math.cos(ph) * dx;
        z += Math.sin(ph) * dx;
      }
      a[j * 3] = x;
      a[j * 3 + 2] = z + zb;
      a[(this.N + 1 + j) * 3] = x;
      a[(this.N + 1 + j) * 3 + 2] = z + zb;
    }
    s.geo.attributes.position.needsUpdate = true;
    s.geo.computeVertexNormals();
    s.geo.computeBoundingSphere();
  }

  public go(n: number, s = 0) {
    this.side = s;
    const safeN = Math.max(0, Math.min(this.S, n));
    this.target = safeN;
    if (typeof window !== 'undefined' && location.hash.slice(1) !== NAMES[safeN]) {
      location.hash = NAMES[safeN];
    }
    this.onSpreadChange(safeN);
    this.onHintHide?.();
  }

  public step(d: number) {
    let n = this.target;
    let s = this.side;

    if (this.portrait) {
      if (d > 0) {
        if (n === this.S) return;
        if (s === 0 && n > 0) s = 1;
        else {
          n++;
          s = 0;
        }
      } else {
        if (n === 0) return;
        if (s === 1 && n > 0) s = 0;
        else {
          n--;
          s = 1;
        }
      }
    } else {
      n = Math.max(0, Math.min(this.S, n + d));
      s = n === 0 ? 1 : 0;
    }
    this.go(n, s);
  }

  public pullFromShelf() {
    if (this.isFloating) return;
    this.isFloating = true;
    this.isBookHovered = false;
    if (this.canvas) this.canvas.style.cursor = 'default';
    this.go(0, 1);
    this.onFloatingChange?.(true);
    this.onHintHide?.();
  }

  public returnToShelf() {
    if (!this.isFloating) return;
    this.go(0, 0);

    setTimeout(() => {
      this.isFloating = false;
      this.isBookHovered = false;
      if (this.canvas) this.canvas.style.cursor = 'default';
      this.onFloatingChange?.(false);
    }, 380);
  }

  private handleResize = () => {
    if (!this.canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.portrait = w / h < 0.95;
    this.onPortraitChange?.(this.portrait);
    this.onSpreadChange(this.target);
  };

  private handlePointerDown = (e: PointerEvent) => {
    this.pointerDownCoord = [e.clientX, e.clientY];
  };

  private handlePointerMove = (e: PointerEvent) => {
    this.px = e.clientX / window.innerWidth - 0.5;
    this.py = e.clientY / window.innerHeight - 0.5;

    if (!this.isFloating) {
      if (this.camera && this.canvas) {
        this.raycaster.setFromCamera(
          new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1),
          this.camera
        );
        const targets: THREE.Object3D[] = [this.pickHitBox, this.spine, this.sheets[0]?.fm, this.backRight].filter(Boolean);
        const hits = this.raycaster.intersectObjects(targets);
        const hovered = hits.length > 0;
        if (hovered !== this.isBookHovered) {
          this.isBookHovered = hovered;
          this.canvas.style.cursor = hovered ? 'pointer' : 'default';
        }
      }
      return;
    }

    this.hov = this.portrait ? 0 : this.px > 0.32 ? 1 : this.px < -0.32 ? -1 : 0;
  };

  private handlePointerLeave = () => {
    this.hov = 0;
    if (!this.isFloating) {
      this.isBookHovered = false;
      if (this.canvas) this.canvas.style.cursor = 'default';
    }
  };

  private handlePointerUp = (e: PointerEvent) => {
    if (!this.pointerDownCoord) return;
    const dx = e.clientX - this.pointerDownCoord[0];
    const dy = e.clientY - this.pointerDownCoord[1];
    this.pointerDownCoord = null;

    if (!this.isFloating) {
      this.raycaster.setFromCamera(
        new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1),
        this.camera
      );
      const targets: THREE.Object3D[] = [this.pickHitBox, this.spine, this.sheets[0]?.fm, this.backRight].filter(Boolean);
      const hits = this.raycaster.intersectObjects(targets);
      if (hits.length > 0 || Math.abs(this.px) < 0.22) {
        this.pullFromShelf();
      }
      return;
    }

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      return this.step(dx < 0 ? 1 : -1);
    }
    if (Math.hypot(dx, dy) > 10) return;

    if (this.cur === this.target && this.sheets.every((s) => Math.abs(s.p - s.tp) < 0.01)) {
      this.raycaster.setFromCamera(
        new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1),
        this.camera
      );
      const L: THREE.Object3D[] = [];
      if (this.cur < this.S) L.push(this.sheets[this.cur].fm);
      if (this.cur > 0) L.push(this.sheets[this.cur - 1].bm);
      const intersects = this.raycaster.intersectObjects(L);
      const h = intersects[0];
      if (h && h.uv) {
        const f = h.object === this.sheets[this.cur]?.fm ? 2 * this.cur : 2 * this.cur - 1;
        const u = f % 2 ? 1 - h.uv.x : h.uv.x;
        const y = (1 - h.uv.y) * TH;
        const hit = (HIT[f] || []).find((r) => y > r[0] && y < r[1] && u * TW > 40);
        if (hit) {
          const a = hit[2];
          if (typeof a === 'number') {
            return this.go(a, 0);
          } else if (typeof a === 'string') {
            if (a.startsWith('mailto')) {
              window.location.href = a;
            } else {
              window.open(a, '_blank', 'noopener,noreferrer');
            }
            return;
          }
        }
        return this.step(f % 2 === 0 ? 1 : -1);
      }
    }

    this.step(e.clientX > window.innerWidth / 2 ? 1 : -1);
  };

  private handleWheel = (e: WheelEvent) => {
    if (!this.isFloating) return;
    const t = performance.now();
    if (Math.abs(e.deltaY) > 25 && t - this.wheelT > 800) {
      this.wheelT = t;
      this.step(e.deltaY > 0 ? 1 : -1);
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (!this.isFloating) {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        this.pullFromShelf();
        return;
      }
    }
    if (e.key === 'Escape' && this.isFloating) {
      this.returnToShelf();
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'PageDown') this.step(1);
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') this.step(-1);
    if (e.key === 'Home') this.go(0, 1);
    if (e.key === 'End') this.go(this.S, 0);
  };

  private handleHashChange = () => {
    const i = NAMES.indexOf(window.location.hash.slice(1));
    if (i >= 0) {
      this.target = i;
      if (i === 0) this.side = 1;
      if (i === this.S) this.side = 0;
      this.onSpreadChange(i);
    }
  };

  private attachEventListeners() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('wheel', this.handleWheel, { passive: true });
    window.addEventListener('hashchange', this.handleHashChange);

    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerleave', this.handlePointerLeave);
    this.canvas.addEventListener('pointerup', this.handlePointerUp);
  }

  private animate = (now: number) => {
    if (this.isDisposed) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;

    if (this.cur !== this.target) {
      this.acc += dt;
      if (this.isReducedMotion || this.acc > 0.085) {
        this.acc = 0;
        this.cur += this.isReducedMotion ? this.target - this.cur : Math.sign(this.target - this.cur);
      }
    }

    this.sheets.forEach((s, i) => {
      s.tp = i < this.cur ? 1 : 0;
      if (this.cur === this.target && !this.isReducedMotion && this.isFloating) {
        if (this.hov > 0 && i === this.cur) s.tp = 0.07;
        if (this.hov < 0 && i === this.cur - 1) s.tp = 0.93;
      }
      const o = s.p;
      s.p += (s.tp - s.p) * (1 - Math.exp(-dt * (this.isReducedMotion ? 60 : 6.5)));
      if (Math.abs(s.tp - s.p) < 0.0005) s.p = s.tp;
      if (s.p !== o) this.bend(s, i);
    });

    this.backLeft.visible = this.cur > 0;
    this.backRight.visible = this.cur < this.S;

    const fx = this.portrait
      ? this.side
        ? this.W / 2
        : -this.W / 2
      : this.target === 0
      ? this.W / 2
      : this.target === this.S
      ? -this.W / 2
      : 0;

    const hw = this.portrait
      ? this.W * 0.62
      : this.target === 0 || this.target === this.S
      ? this.W * 0.65
      : this.W * 1.12;

    const tn = Math.tan(0.5 * 38 * (Math.PI / 180));
    const dd = Math.max(hw / (tn * this.camera.aspect), (this.H * 0.68) / tn);

    const t = now / 1000;
    const kPos = 1 - Math.exp(-dt * 4.5);
    const kRot = 1 - Math.exp(-dt * 4.5);

    if (!this.isFloating) {
      // Resting on shelf: spine facing viewer
      const hoverSlide = this.isBookHovered ? 0.35 : 0;
      const hoverAngle = this.isBookHovered ? -0.06 : 0;
      const targetShelfX = 0;
      const targetShelfY = 0.0;
      const targetShelfZ = -2.05 + hoverSlide;
      const targetRotX = 0;
      const targetRotY = Math.PI / 2 + hoverAngle;

      this.group.position.x += (targetShelfX - this.group.position.x) * kPos;
      this.group.position.y += (targetShelfY - this.group.position.y) * kPos;
      this.group.position.z += (targetShelfZ - this.group.position.z) * kPos;

      this.group.rotation.x += (targetRotX - this.group.rotation.x) * kRot;
      this.group.rotation.y += (targetRotY - this.group.rotation.y) * kRot;
      this.group.rotation.z += (0 - this.group.rotation.z) * kRot;

      // Grand Atmospheric Library framing: study tables, glowing banker's lamps, mezzanine gallery, lanterns, and floor
      const targetCamDist = 4.4;
      const targetCamY = 0.35;
      this.dist += (targetCamDist - this.dist) * (1 - Math.exp(-dt * 3.5));
      const camParallaxX = this.isReducedMotion ? 0 : this.px * 0.45;
      const camParallaxY = this.isReducedMotion ? 0 : -this.py * 0.25;
      this.camera.position.set(camParallaxX, targetCamY + camParallaxY, this.dist);
      this.camera.lookAt(0, 0.08, -2.05);
    } else {
      // Floating in reading position facing user
      this.group.position.x += (-fx - this.group.position.x) * kPos;
      const targetFloatY = this.isReducedMotion ? 0 : Math.sin(t * 0.8) * 0.025;
      this.group.position.y += (targetFloatY - this.group.position.y) * kPos;
      this.group.position.z += (0 - this.group.position.z) * kPos;

      const targetRotX = this.isReducedMotion ? -0.08 : -0.08 + this.py * 0.1;
      const targetRotY = this.isReducedMotion ? 0 : this.px * 0.18;
      this.group.rotation.x += (targetRotX - this.group.rotation.x) * kRot;
      this.group.rotation.y += (targetRotY - this.group.rotation.y) * kRot;
      this.group.rotation.z += (0 - this.group.rotation.z) * kRot;

      this.dist += (dd - this.dist) * (1 - Math.exp(-dt * 3.5));
      this.camera.position.set(0, 0.35, this.dist);
      this.camera.lookAt(0, 0, 0);
    }

    // Dynamic light brightness easing
    if (this.readingLight && this.readingFillLight) {
      const targetReadLight = this.isFloating ? 1.15 : 0.4;
      const targetFillLight = this.isFloating ? 0.65 : 0.25;
      this.readingLight.intensity += (targetReadLight - this.readingLight.intensity) * (1 - Math.exp(-dt * 4.0));
      this.readingFillLight.intensity += (targetFillLight - this.readingFillLight.intensity) * (1 - Math.exp(-dt * 4.0));
    }

    // =========================================================================
    // Animate Soft Golden Glow & Clean Embers for Bishal's Book
    // =========================================================================
    const pulse = Math.sin(t * 2.5) * 0.22 + 0.78; // Gentle breathing cycle
    const hoverMult = this.isBookHovered ? 1.4 : 1.0;

    if (this.bookAuraLight) {
      this.bookAuraLight.intensity = (this.isFloating ? 0.35 : 1.8) * pulse * hoverMult;
    }
    if (this.spineGlowPlane) {
      (this.spineGlowPlane.material as THREE.MeshBasicMaterial).opacity = 0.7 * pulse * hoverMult;
    }

    // Swirl delicate golden embers around Bishal's glowing book
    if (this.bookParticlesGeo && this.bookParticleAngles) {
      const bPos = this.bookParticlesGeo.attributes.position.array as Float32Array;
      const speedMult = this.isBookHovered ? 1.8 : 1.0;
      for (let i = 0; i < 24; i++) {
        this.bookParticleAngles[i] += dt * this.bookParticleSpeeds[i] * speedMult;
        this.bookParticleHeights[i] += dt * 0.16;
        if (this.bookParticleHeights[i] > (this.H + 0.15) / 2) {
          this.bookParticleHeights[i] = -(this.H + 0.15) / 2;
        }
        bPos[i * 3] = -0.03 + Math.cos(this.bookParticleAngles[i]) * this.bookParticleRadii[i];
        bPos[i * 3 + 1] = this.bookParticleHeights[i];
        bPos[i * 3 + 2] = -0.02 + Math.sin(this.bookParticleAngles[i]) * this.bookParticleRadii[i];
      }
      this.bookParticlesGeo.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
    this.animId = requestAnimationFrame(this.animate);
  };

  public destroy() {
    this.isDisposed = true;
    if (this.animId !== null) cancelAnimationFrame(this.animId);

    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('hashchange', this.handleHashChange);

    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerleave', this.handlePointerLeave);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);

    this.textures.forEach((t) => t.dispose());
    this.spineTexture?.dispose();
    this.sheets.forEach((s) => {
      s.geo.dispose();
      (s.fm.material as THREE.Material).dispose();
      (s.bm.material as THREE.Material).dispose();
    });
    this.bookParticlesGeo?.dispose();
    this.renderer?.dispose();
  }
}
