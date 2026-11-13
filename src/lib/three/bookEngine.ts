import * as THREE from 'three';
import { FACES, HIT, TH, TW } from './pageDrawers';
import { NAMES } from '../constants/portfolioData';

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
  private particlesGeo!: THREE.BufferGeometry;
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

  private acc = 0;
  private hov = 0;
  private dist = 5;
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

  constructor(options: BookEngineOptions) {
    this.canvas = options.canvas;
    this.onSpreadChange = options.onSpreadChange;
    this.onPortraitChange = options.onPortraitChange;
    this.onHintHide = options.onHintHide;
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

    // Three.js modern color space setup
    if ('outputColorSpace' in this.renderer) {
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else if ('outputEncoding' in this.renderer) {
      (this.renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
    }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xfff4e0, 0x6a5038, 0.78);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(-2, 3, 4);
    this.scene.add(dirLight);

    // Textures from FACES
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    this.textures = FACES.map((drawerFn, i) => {
      const c = document.createElement('canvas');
      c.width = TW;
      c.height = TH;
      const ctx = c.getContext('2d');
      if (ctx) drawerFn(ctx, i);
      const t = new THREE.CanvasTexture(c);
      if ('colorSpace' in t) {
        t.colorSpace = THREE.SRGBColorSpace;
      } else if ('encoding' in t) {
        (t as any).encoding = (THREE as any).sRGBEncoding;
      }
      t.anisotropy = maxAniso;
      if (i % 2) {
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.x = -1;
        t.offset.x = 1;
      }
      return t;
    });

    const createMat = (m: THREE.CanvasTexture, side: THREE.Side) =>
      new THREE.MeshStandardMaterial({ map: m, side, roughness: 0.88 });

    // Build sheets
    this.sheets = [];
    for (let i = 0; i < this.S; i++) {
      const geo = new THREE.PlaneGeometry(this.W, this.H, this.N, 1);
      geo.translate(this.W / 2, 0, 0);

      const fm = new THREE.Mesh(geo, createMat(this.textures[2 * i], THREE.FrontSide));
      const bm = new THREE.Mesh(geo, createMat(this.textures[2 * i + 1], THREE.BackSide));
      this.group.add(fm, bm);
      this.sheets.push({ geo, fm, bm, p: -1, tp: 0 });
    }

    // Leather cover boards and spine
    const leatherMat = new THREE.MeshStandardMaterial({ color: 0x4a261d, roughness: 0.7 });
    this.backRight = new THREE.Mesh(new THREE.BoxGeometry(this.W + 0.07, this.H + 0.07, 0.03), leatherMat);
    this.backLeft = this.backRight.clone();
    this.backRight.position.set(this.W / 2, 0, -0.02);
    this.backLeft.position.set(-this.W / 2, 0, -0.02);

    this.spine = new THREE.Mesh(new THREE.BoxGeometry(0.05, this.H + 0.07, 0.03), leatherMat);
    this.spine.position.z = -0.02;
    this.group.add(this.backRight, this.backLeft, this.spine);

    // Warm ambient floating dust particles
    this.particlesGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(360);
    for (let i = 0; i < 120; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 8;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    this.particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const particles = new THREE.Points(
      this.particlesGeo,
      new THREE.PointsMaterial({
        size: 0.025,
        color: 0xfff1cf,
        transparent: true,
        opacity: 0.45,
        depthWrite: false
      })
    );
    this.scene.add(particles);

    // Setup initial state
    this.cur = initialSpread;
    this.target = initialSpread;
    this.side = initialSpread === 8 ? 0 : initialSpread === 0 ? 1 : 0;

    this.sheets.forEach((s, i) => {
      s.p = s.tp = i < this.cur ? 1 : 0;
      this.bend(s, i);
    });

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
    this.hov = this.portrait ? 0 : this.px > 0.32 ? 1 : this.px < -0.32 ? -1 : 0;
  };

  private handlePointerLeave = () => {
    this.hov = 0;
  };

  private handlePointerUp = (e: PointerEvent) => {
    if (!this.pointerDownCoord) return;
    const dx = e.clientX - this.pointerDownCoord[0];
    const dy = e.clientY - this.pointerDownCoord[1];
    this.pointerDownCoord = null;

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
    const t = performance.now();
    if (Math.abs(e.deltaY) > 25 && t - this.wheelT > 800) {
      this.wheelT = t;
      this.step(e.deltaY > 0 ? 1 : -1);
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
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
      if (this.cur === this.target && !this.isReducedMotion) {
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
    this.dist += (dd - this.dist) * Math.min(1, dt * 4);
    this.camera.position.set(0, 0.35, this.dist);
    this.camera.lookAt(0, 0, 0);

    this.group.position.x += (-fx - this.group.position.x) * Math.min(1, dt * 5);
    const t = now / 1000;
    this.group.position.y = this.isReducedMotion ? 0 : Math.sin(t * 0.8) * 0.025;
    this.group.rotation.y += ((this.isReducedMotion ? 0 : this.px * 0.18) - this.group.rotation.y) * 0.05;
    this.group.rotation.x += ((this.isReducedMotion ? -0.1 : -0.1 + this.py * 0.1) - this.group.rotation.x) * 0.05;

    // Dust particles float
    const pos = this.particlesGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < 120; i++) {
      pos[i * 3 + 1] += dt * 0.04;
      if (pos[i * 3 + 1] > 3) pos[i * 3 + 1] = -3;
    }
    this.particlesGeo.attributes.position.needsUpdate = true;

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
    this.sheets.forEach((s) => {
      s.geo.dispose();
      (s.fm.material as THREE.Material).dispose();
      (s.bm.material as THREE.Material).dispose();
    });
    this.particlesGeo.dispose();
    this.renderer.dispose();
  }
}

