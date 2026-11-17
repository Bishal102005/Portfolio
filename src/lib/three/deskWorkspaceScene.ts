import * as THREE from 'three';

// ============================================================================
// Procedural Light Scandinavian Natural Oak Wood Texture
// ============================================================================
export function createNaturalOakTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm light Scandinavian oak base gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  bgGrad.addColorStop(0, '#caa275');
  bgGrad.addColorStop(0.2, '#d6b288');
  bgGrad.addColorStop(0.4, '#e0c098');
  bgGrad.addColorStop(0.6, '#d8b58c');
  bgGrad.addColorStop(0.8, '#caa275');
  bgGrad.addColorStop(1, '#d2ab7f');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle oak grain growth rings and soft longitudinal waves
  for (let y = 0; y < 1024; y += 2) {
    const wave = Math.sin(y * 0.012) * 22 + Math.sin(y * 0.005) * 35 + Math.cos(y * 0.03) * 8;
    const tone = Math.sin(y * 0.08 + wave * 0.02);
    const alpha = 0.04 + Math.max(0, tone) * 0.10;
    ctx.fillStyle = `rgba(142, 104, 66, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, 1024, 1.8);

    // Light honey satin sheen on grain ridges
    if (y % 8 === 0) {
      const hl = 0.04 + Math.sin(y * 0.04 + wave * 0.015) * 0.03;
      if (hl > 0) {
        ctx.fillStyle = `rgba(255, 240, 215, ${hl.toFixed(3)})`;
        ctx.fillRect(0, y + 0.5, 1024, 1.0);
      }
    }
  }

  // Medullary rays (characteristic flecks of natural white oak)
  for (let i = 0; i < 400; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rw = 15 + Math.random() * 45;
    const rh = 1.0 + Math.random() * 1.5;
    ctx.fillStyle = 'rgba(255, 242, 225, 0.08)';
    ctx.fillRect(rx, ry, rw, rh);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createWalnutDeskTexture(): THREE.CanvasTexture {
  return createNaturalOakTexture();
}

// ============================================================================
// Wallpaper Utilities & Dynamic Image Loader
// ============================================================================
function drawImageAspectFill(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  verticalFocus = 0.06 // 0 = top, 0.5 = center, 1 = bottom
) {
  const targetRatio = targetWidth / targetHeight;
  const imgRatio = img.width / img.height;

  let sWidth = img.width;
  let sHeight = img.height;
  let sx = 0;
  let sy = 0;

  if (imgRatio > targetRatio) {
    sWidth = img.height * targetRatio;
    sx = (img.width - sWidth) / 2;
  } else {
    sHeight = img.width / targetRatio;
    // Position crop with top-bias so hair, heads, and faces have proper headroom
    sy = Math.max(0, (img.height - sHeight) * verticalFocus);
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
}

// Procedural Monitor Wallpaper: "FOCUS - PLAN • EXECUTE • SUCCEED"
export function drawFocusWallpaper(ctx: CanvasRenderingContext2D, width = 1024, height = 576): void {
  // Warm minimalist off-white / light cream background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#f7f5f0');
  bgGrad.addColorStop(0.5, '#f2eee6');
  bgGrad.addColorStop(1, '#ece7dd');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Flowing soft contour wave lines matching the user's photo
  ctx.lineWidth = 1.6;
  for (let i = 0; i < 7; i++) {
    ctx.strokeStyle = `rgba(195, 185, 172, ${(0.22 + i * 0.05).toFixed(2)})`;
    ctx.beginPath();
    const yOffset = 310 + i * 22;
    ctx.moveTo(0, yOffset + 30);
    ctx.bezierCurveTo(240, yOffset - 40, 480, yOffset + 45, 720, yOffset - 35);
    ctx.bezierCurveTo(860, yOffset - 75, 960, yOffset - 10, width, yOffset);
    ctx.stroke();
  }

  // Large bold warm rust/burnt orange title: "FOCUS"
  ctx.fillStyle = '#cc5228';
  ctx.font = '700 52px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FOCUS', width / 2, 250);

  // Subtitle: "PLAN • EXECUTE • SUCCEED"
  ctx.fillStyle = '#7a7266';
  ctx.font = '600 13px system-ui, -apple-system, sans-serif';
  ctx.fillText('PLAN • EXECUTE • SUCCEED', width / 2, 292);
}

export function createFocusWallpaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576; // 16:9 widescreen
  const ctx = canvas.getContext('2d')!;
  drawFocusWallpaper(ctx, 1024, 576);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Cinematic Warm Amber & Gold Color Grading (Matches Studio Portfolio Theme)
// ============================================================================
export function applyThemeColorGrading(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.save();

  // 1. Subtle Golden Radiance (boosts luminous highlights and rich warm darks)
  ctx.globalCompositeOperation = 'soft-light';
  const goldGrad = ctx.createLinearGradient(0, 0, width, height);
  goldGrad.addColorStop(0, 'rgba(251, 191, 36, 0.14)'); // 24k Gold
  goldGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.10)');
  goldGrad.addColorStop(1, 'rgba(180, 83, 9, 0.16)'); // Warm Honey Bronze
  ctx.fillStyle = goldGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Cinematic Studio Vignette (edges blend seamlessly into dark curved monitor bezel)
  ctx.globalCompositeOperation = 'multiply';
  const vigGrad = ctx.createRadialGradient(width / 2, height / 2, width * 0.35, width / 2, height / 2, width * 0.70);
  vigGrad.addColorStop(0, 'rgba(255, 252, 248, 1)');
  vigGrad.addColorStop(0.72, 'rgba(245, 235, 220, 0.96)');
  vigGrad.addColorStop(1, 'rgba(32, 20, 10, 0.78)');
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

export function createMonitorWallpaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576; // 16:9 widescreen
  const ctx = canvas.getContext('2d')!;

  // 1. Immediately draw default "FOCUS" wallpaper (instant render, no flicker)
  drawFocusWallpaper(ctx, 1024, 576);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  // 2. Automatically load custom wallpaper image if placed in public/ folder
  if (typeof window !== 'undefined') {
    const candidatePaths = [
      '/pc-wallpaper.png',
      '/pc-wallpaper.jpg',
      '/pc-wallpaper.jpeg',
      '/pc-wallpaper.webp',
      '/pc-screen.png',
      '/pc-screen.jpg',
      '/pc-screen.jpeg',
      '/pc-screen.webp',
      '/monitor-wallpaper.png',
      '/monitor-wallpaper.jpg',
      '/wallpaper.png',
      '/wallpaper.jpg'
    ];

    let candidateIdx = 0;
    const tryNext = () => {
      if (candidateIdx >= candidatePaths.length) return;
      const src = candidatePaths[candidateIdx++];
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.clearRect(0, 0, 1024, 576);
        drawImageAspectFill(ctx, img, 1024, 576);
        applyThemeColorGrading(ctx, 1024, 576);
        tex.needsUpdate = true;
      };
      img.onerror = () => {
        tryNext();
      };
      img.src = src;
    };

    tryNext();
  }

  return tex;
}

// ============================================================================
// Procedural Laptop Wallpaper Texture: macOS Developer Studio (VS Code & Terminal)
// ============================================================================
export function drawDeveloperIDEWallpaper(ctx: CanvasRenderingContext2D, width = 1024, height = 656): void {
  // 1. Wallpaper Background (Deep obsidian / dark violet aurora glow)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0a0d16');
  bgGrad.addColorStop(0.5, '#141724');
  bgGrad.addColorStop(1, '#1e162a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft ambient glowing light orbs
  const glow1 = ctx.createRadialGradient(850, 480, 20, 850, 480, 340);
  glow1.addColorStop(0, 'rgba(245, 158, 11, 0.18)');
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  // 2. macOS Top Menu Bar
  ctx.fillStyle = 'rgba(18, 20, 26, 0.94)';
  ctx.fillRect(0, 0, width, 26);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fillRect(0, 25, width, 1);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 13px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('', 16, 13);

  ctx.fillStyle = 'rgba(220, 230, 245, 0.85)';
  ctx.font = '600 11px system-ui, -apple-system, sans-serif';
  ctx.fillText('Code   File   Edit   Selection   View   Terminal   Window', 42, 13);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('100% ⚡   10:30 AM', width - 16, 13);

  // 3. VS Code Window Frame
  const winX = 12;
  const winY = 34;
  const winW = width - 24;
  const winH = height - 76;
  const winRadius = 8;

  // Window body
  ctx.fillStyle = '#161822';
  ctx.beginPath();
  ctx.roundRect(winX, winY, winW, winH, winRadius);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Window Titlebar
  ctx.fillStyle = '#1c1e28';
  ctx.beginPath();
  ctx.roundRect(winX, winY, winW, 34, [winRadius, winRadius, 0, 0]);
  ctx.fill();

  // Traffic light dots
  const dotY = winY + 17;
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath();
  ctx.arc(winX + 18, dotY, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath();
  ctx.arc(winX + 36, dotY, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath();
  ctx.arc(winX + 54, dotY, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Window Title
  ctx.fillStyle = 'rgba(220, 230, 245, 0.85)';
  ctx.font = '700 12px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('portfolio.tsx — Bishal Saha (Studio Workspace)', winX + winW / 2, dotY);

  // Tabs Bar
  const tabY = winY + 34;
  ctx.fillStyle = '#12141a';
  ctx.fillRect(winX, tabY, winW, 32);

  // Active Tab
  ctx.fillStyle = '#181a24';
  ctx.fillRect(winX + 48, tabY, 180, 32);
  ctx.fillStyle = '#fbbf24'; // Radiant Gold tab indicator
  ctx.fillRect(winX + 48, tabY, 180, 3);

  ctx.textAlign = 'left';
  ctx.font = '700 12px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('⚛  portfolio.tsx', winX + 62, tabY + 16);

  // Inactive Tabs
  ctx.fillStyle = 'rgba(150, 165, 185, 0.55)';
  ctx.font = '600 11.5px system-ui, -apple-system, sans-serif';
  ctx.fillText('studioScene.ts', winX + 246, tabY + 16);
  ctx.fillText('bookEngine.ts', winX + 370, tabY + 16);

  // Left Activity Bar
  const sideW = 46;
  const sideH = winH - 66;
  ctx.fillStyle = '#101217';
  ctx.fillRect(winX, tabY + 32, sideW, sideH);

  ctx.fillStyle = 'rgba(240, 245, 255, 0.9)';
  ctx.font = '16px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('📁', winX + 23, tabY + 54);
  ctx.fillText('🔍', winX + 23, tabY + 92);
  ctx.fillText('🌿', winX + 23, tabY + 130);
  ctx.fillText('⚙', winX + 23, winY + winH - 24);

  // Explorer Sidebar
  const treeW = 150;
  ctx.fillStyle = '#14161f';
  ctx.fillRect(winX + sideW, tabY + 32, treeW, sideH);

  ctx.textAlign = 'left';
  ctx.font = '800 10.5px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(160, 175, 195, 0.75)';
  ctx.fillText('EXPLORER', winX + sideW + 14, tabY + 50);

  ctx.font = '600 12px "Consolas", monospace';
  ctx.fillStyle = 'rgba(230, 235, 245, 0.9)';
  ctx.fillText('▼ PORTFOLIO', winX + sideW + 14, tabY + 72);
  ctx.fillText('  ▼ src', winX + sideW + 14, tabY + 92);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('    ⚛ portfolio.tsx', winX + sideW + 14, tabY + 112);
  ctx.fillStyle = 'rgba(160, 175, 195, 0.65)';
  ctx.fillText('    ⚡ studio.ts', winX + sideW + 14, tabY + 132);
  ctx.fillText('    🎨 theme.css', winX + sideW + 14, tabY + 152);

  // Editor Area (BOLD HIGH-VISIBILITY CODE)
  const editX = winX + sideW + treeW;
  const editY = tabY + 32;
  const editW = winW - sideW - treeW;
  const editH = sideH;

  ctx.font = '700 18px "Consolas", "Fira Code", monospace';
  let ly = editY + 24;
  const lh = 28;

  // Line 1: Comment
  ctx.fillStyle = 'rgba(120, 135, 155, 0.6)';
  ctx.fillText('1', editX + 14, ly);
  ctx.fillStyle = '#6a9955';
  ctx.fillText('// ✦ BISHAL SAHA — CREATIVE 3D & FULL-STACK', editX + 46, ly);
  ly += lh;

  // Line 2: export const Developer = {
  ctx.fillStyle = 'rgba(120, 135, 155, 0.6)';
  ctx.fillText('2', editX + 14, ly);
  ctx.fillStyle = '#c586c0';
  ctx.fillText('export const ', editX + 46, ly);
  let kwW = ctx.measureText('export const ').width;
  ctx.fillStyle = '#fbbf24'; // Radiant Gold
  ctx.fillText('Developer', editX + 46 + kwW, ly);
  let vW = ctx.measureText('Developer').width;
  ctx.fillStyle = '#f8fafc';
  ctx.fillText(' = {', editX + 46 + kwW + vW, ly);
  ly += lh;

  // Line 3: name: "Bishal Saha",
  ctx.fillStyle = 'rgba(120, 135, 155, 0.6)';
  ctx.fillText('3', editX + 14, ly);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('  name: ', editX + 46, ly);
  let p1W = ctx.measureText('  name: ').width;
  ctx.fillStyle = '#4ade80';
  ctx.fillText('"Bishal Saha"', editX + 46 + p1W, ly);
  let s1W = ctx.measureText('"Bishal Saha"').width;
  ctx.fillStyle = '#f8fafc';
  ctx.fillText(',', editX + 46 + p1W + s1W, ly);
  ly += lh;

  // Line 4: craft: ["Next.js 16", "Three.js", "WebGL"],
  ctx.fillStyle = 'rgba(120, 135, 155, 0.6)';
  ctx.fillText('4', editX + 14, ly);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('  craft: ', editX + 46, ly);
  let p2W = ctx.measureText('  craft: ').width;
  ctx.fillStyle = '#4ade80';
  ctx.fillText('["Next.js 16", "Three.js", "WebGL"]', editX + 46 + p2W, ly);
  let s2W = ctx.measureText('["Next.js 16", "Three.js", "WebGL"]').width;
  ctx.fillStyle = '#f8fafc';
  ctx.fillText(',', editX + 46 + p2W + s2W, ly);
  ly += lh;

  // Line 5: focus: "Tactility • Depth • Cinematic Motion",
  ctx.fillStyle = 'rgba(120, 135, 155, 0.6)';
  ctx.fillText('5', editX + 14, ly);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('  focus: ', editX + 46, ly);
  let p3W = ctx.measureText('  focus: ').width;
  ctx.fillStyle = '#4ade80';
  ctx.fillText('"Tactility • Depth • Cinematic Motion"', editX + 46 + p3W, ly);
  let s3W = ctx.measureText('"Tactility • Depth • Cinematic Motion"').width;
  ctx.fillStyle = '#f8fafc';
  ctx.fillText(',', editX + 46 + p3W + s3W, ly);
  ly += lh;

  // Line 6: status: "Building Extraordinary ✨"
  ctx.fillStyle = 'rgba(120, 135, 155, 0.6)';
  ctx.fillText('6', editX + 14, ly);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('  status: ', editX + 46, ly);
  let p4W = ctx.measureText('  status: ').width;
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('"Building Extraordinary ✨"', editX + 46 + p4W, ly);
  ly += lh;

  // Line 7: };
  ctx.fillStyle = 'rgba(120, 135, 155, 0.6)';
  ctx.fillText('7', editX + 14, ly);
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('};', editX + 46, ly);

  // Integrated Terminal Panel (Crisp, High Impact)
  const termY = editY + 226;
  const termH = editH - 226;
  ctx.fillStyle = '#0f1118';
  ctx.fillRect(editX, termY, editW, termH);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(editX, termY);
  ctx.lineTo(editX + editW, termY);
  ctx.stroke();

  // Terminal Header Tabs
  ctx.font = '700 11.5px system-ui, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('TERMINAL', editX + 16, termY + 14);
  ctx.fillStyle = 'rgba(140, 155, 175, 0.6)';
  ctx.fillText('OUTPUT', editX + 110, termY + 14);
  ctx.fillStyle = 'rgba(140, 155, 175, 0.6)';
  ctx.fillText('DEBUG CONSOLE', editX + 185, termY + 14);
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('PORTS: 3000', editX + 330, termY + 14);

  // Terminal Output Lines (Bold 15px font)
  ctx.font = '700 15px "Consolas", monospace';
  let ty = termY + 40;
  const tlh = 24;

  ctx.fillStyle = '#fbbf24';
  ctx.fillText('▲ Next.js 16.4.5 (Turbopack) • Ready on http://localhost:3000', editX + 16, ty);
  ty += tlh;

  ctx.fillStyle = '#4ade80';
  ctx.fillText('✓ Compiled in 115ms (6 static routes, 3D WebGL Book Engine)', editX + 16, ty);
  ty += tlh;

  ctx.fillStyle = '#38bdf8';
  ctx.fillText('✓ Three.js Developer Studio Active • 60 FPS • ACES Filmic', editX + 16, ty);
  ty += tlh + 4;

  ctx.fillStyle = '#f8fafc';
  ctx.fillText('➜ bishal@macbook:~/portfolio $ ', editX + 16, ty);
  const promptW = ctx.measureText('➜ bishal@macbook:~/portfolio $ ').width;
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(editX + 16 + promptW + 2, ty - 12, 10, 16); // Blinking amber block cursor

  // 4. macOS Floating Dock at Bottom
  const dockW = 340;
  const dockH = 42;
  const dockX = (width - dockW) / 2;
  const dockY = height - 52;

  ctx.fillStyle = 'rgba(26, 30, 42, 0.82)';
  ctx.beginPath();
  ctx.roundRect(dockX, dockY, dockW, dockH, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = '18px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('💻   📁   ⚛   🌐   🎨   🐙   🎵   ⚙', width / 2, dockY + 22);
}

// ============================================================================
// Procedural Apple MacBook Pro Precision Keyboard Deck Texture
// ============================================================================
export function createMacBookKeyboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext('2d')!;

  // 1. Unibody Space Gray Anodized Aluminum Top Case
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 680);
  bgGrad.addColorStop(0, '#363942');
  bgGrad.addColorStop(0.5, '#2e3037');
  bgGrad.addColorStop(1, '#22242a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 680);

  // Subtle perimeter metallic edge chamfer
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 1020, 676);

  // 2. Dual Stereo Speaker Grilles (Left & Right)
  ctx.fillStyle = '#16181d';
  for (let y = 65; y < 390; y += 6) {
    for (let x = 44; x < 106; x += 5.5) {
      ctx.fillRect(x, y, 1.8, 1.8);
    }
    for (let x = 918; x < 980; x += 5.5) {
      ctx.fillRect(x, y, 1.8, 1.8);
    }
  }

  // 3. Recessed Matte Keyboard Well
  ctx.fillStyle = '#131418';
  ctx.beginPath();
  ctx.roundRect(118, 40, 788, 376, 8);
  ctx.fill();
  ctx.strokeStyle = '#0d0e11';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Helper function to draw keys with backlight & crisp legends
  const drawKey = (x: number, y: number, w: number, h: number, label: string, isSmall = false) => {
    // Backlight leakage glow
    ctx.strokeStyle = 'rgba(255, 248, 235, 0.18)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4);
    ctx.stroke();

    // Keycap body
    const keyGrad = ctx.createLinearGradient(x, y, x, y + h);
    keyGrad.addColorStop(0, '#24262d');
    keyGrad.addColorStop(1, '#18191e');
    ctx.fillStyle = keyGrad;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4);
    ctx.fill();

    // Keycap perimeter outline
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Laser-etched legend
    if (label) {
      ctx.fillStyle = 'rgba(242, 246, 255, 0.9)';
      ctx.font = isSmall ? '700 11px system-ui, -apple-system, sans-serif' : '700 14px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + w / 2, y + h / 2);
    }
  };

  // Row 0: Function Keys (y = 50, h = 28)
  const fKeys = ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', '⏻'];
  const fKeyW = (764 - (fKeys.length - 1) * 6) / fKeys.length;
  let fx = 130;
  for (const k of fKeys) {
    drawKey(fx, 50, fKeyW, 28, k, true);
    fx += fKeyW + 6;
  }

  // Row 1: Numbers (y = 86, h = 50)
  const r1 = ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'delete'];
  let r1x = 130;
  for (let i = 0; i < r1.length; i++) {
    const kw = i === r1.length - 1 ? 80 : 47;
    drawKey(r1x, 86, kw, 50, r1[i]);
    r1x += kw + 6;
  }

  // Row 2: QWERTY (y = 144, h = 50)
  const r2 = ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'];
  let r2x = 130;
  for (let i = 0; i < r2.length; i++) {
    const kw = i === 0 ? 68 : i === r2.length - 1 ? 59 : 47;
    drawKey(r2x, 144, kw, 50, r2[i], i === 0);
    r2x += kw + 6;
  }

  // Row 3: ASDF (y = 202, h = 50)
  const r3 = ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'];
  let r3x = 130;
  for (let i = 0; i < r3.length; i++) {
    const kw = i === 0 ? 79 : i === r3.length - 1 ? 78 : 47;
    drawKey(r3x, 202, kw, 50, r3[i], i === 0 || i === r3.length - 1);
    r3x += kw + 6;
  }

  // Row 4: ZXCV (y = 260, h = 50)
  const r4 = ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'shift'];
  let r4x = 130;
  for (let i = 0; i < r4.length; i++) {
    const kw = i === 0 || i === r4.length - 1 ? 99 : 47;
    drawKey(r4x, 260, kw, 50, r4[i], i === 0 || i === r4.length - 1);
    r4x += kw + 6;
  }

  // Row 5: Modifiers + Spacebar + Arrows (y = 318, h = 50)
  drawKey(130, 318, 52, 50, 'fn', true);
  drawKey(188, 318, 52, 50, 'control', true);
  drawKey(246, 318, 52, 50, 'option', true);
  drawKey(304, 318, 68, 50, '⌘ cmd', true);
  // Spacebar
  drawKey(378, 318, 266, 50, '');
  drawKey(650, 318, 68, 50, '⌘ cmd', true);
  drawKey(724, 318, 52, 50, 'option', true);
  // Arrow keys
  drawKey(782, 344, 34, 24, '◀', true);
  drawKey(822, 318, 34, 24, '▲', true);
  drawKey(822, 344, 34, 24, '▼', true);
  drawKey(862, 344, 34, 24, '▶', true);

  // 4. Large Glass Force Touch Trackpad
  ctx.fillStyle = '#2c2e36';
  ctx.beginPath();
  ctx.roundRect(340, 442, 344, 210, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 5. Front Display Opening Notch
  ctx.fillStyle = '#141518';
  ctx.beginPath();
  ctx.arc(512, 680, 42, Math.PI, 0);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function createLaptopWallpaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 656; // 16:10 MacBook Retina aspect
  const ctx = canvas.getContext('2d')!;

  drawDeveloperIDEWallpaper(ctx, 1024, 656);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;

  if (typeof window !== 'undefined') {
    const candidatePaths = [
      '/laptop-wallpaper.png',
      '/laptop-wallpaper.jpg',
      '/laptop-screen.png',
      '/laptop-screen.jpg',
      '/laptop.png',
      '/laptop.jpg'
    ];

    let candidateIdx = 0;
    const tryNext = () => {
      if (candidateIdx >= candidatePaths.length) return;
      const src = candidatePaths[candidateIdx++];
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.clearRect(0, 0, 1024, 656);
        drawImageAspectFill(ctx, img, 1024, 656);
        applyThemeColorGrading(ctx, 1024, 656);
        tex.needsUpdate = true;
      };
      img.onerror = () => {
        tryNext();
      };
      img.src = src;
    };

    tryNext();
  }

  return tex;
}

// ============================================================================
// Procedural Framed "369" Poster Art Texture
// ============================================================================
export function createPoster369Texture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext('2d')!;

  // Warm cream fine art paper
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(0, 0, 512, 720);

  // Bold vermilion red typography art "369"
  ctx.fillStyle = '#e53826';
  ctx.font = '900 160px system-ui, -apple-system, "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText('3', 256, 205);
  ctx.fillText('6', 256, 355);
  ctx.fillText('9', 256, 505);

  // Thin minimalist red border frame
  ctx.strokeStyle = '#e53826';
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, 440, 648);

  ctx.font = '700 12px system-ui, sans-serif';
  ctx.fillText('NIKOLA TESLA CODE', 256, 68);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural "dieter rams" Shelf Art Texture
// ============================================================================
export function createDieterRamsArtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 420;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f6f4ee';
  ctx.fillRect(0, 0, 512, 420);

  // Bold lower-case red typography: "dieter rams"
  ctx.fillStyle = '#d83824';
  ctx.font = '700 36px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('dieter', 44, 65);
  ctx.fillText('rams', 44, 105);

  // Retro Braun radio graphic illustration
  ctx.fillStyle = '#ded9cf';
  ctx.beginPath();
  ctx.roundRect(80, 160, 352, 190, 12);
  ctx.fill();

  // Speaker grille slats
  ctx.fillStyle = '#b8b2a5';
  for (let s = 0; s < 18; s++) {
    ctx.fillRect(110 + s * 14, 185, 6, 140);
  }

  // Dial knob
  ctx.fillStyle = '#7a756c';
  ctx.beginPath();
  ctx.arc(385, 255, 28, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural Concentric Circles Art Texture
// ============================================================================
export function createCircleArtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 384;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f5f3ec';
  ctx.fillRect(0, 0, 384, 384);

  // Minimalist black concentric geometric target
  ctx.strokeStyle = '#222222';
  for (let r = 18; r <= 150; r += 16) {
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(192, 192, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural Heather Gray Felt Desk Mat Texture
// ============================================================================
export function createFeltMatTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#8e9094';
  ctx.fillRect(0, 0, 512, 512);

  // Soft woven wool noise
  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const tone = Math.random() > 0.5 ? 245 : 95;
    const alpha = (Math.random() * 0.08).toFixed(3);
    ctx.fillStyle = `rgba(${tone}, ${tone}, ${tone}, ${alpha})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural Digital LED Desk Clock Texture ("10:30")
// ============================================================================
export function createClockTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#141416';
  ctx.fillRect(0, 0, 256, 128);

  ctx.fillStyle = '#f0f4f8';
  ctx.font = '700 52px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('10:30', 128, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Procedural Radial Sunburst Caustic Light Texture
// ============================================================================
export function createSunburstTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 512);
  const cx = 256;
  const cy = 256;

  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
  coreGrad.addColorStop(0, 'rgba(255, 235, 160, 0.95)');
  coreGrad.addColorStop(0.18, 'rgba(255, 205, 100, 0.70)');
  coreGrad.addColorStop(0.48, 'rgba(240, 165, 55, 0.35)');
  coreGrad.addColorStop(0.82, 'rgba(210, 120, 30, 0.08)');
  coreGrad.addColorStop(1, 'rgba(180, 80, 15, 0.0)');

  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 256, 0, Math.PI * 2);
  ctx.fill();

  const rayCount = 42;
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2;
    const len = 140 + Math.sin(i * 3.7) * 90 + Math.cos(i * 1.9) * 35;
    const w = 2.2 + (i % 3) * 1.6;

    const x2 = cx + Math.cos(angle) * len;
    const y2 = cy + Math.sin(angle) * len;

    const rayGrad = ctx.createLinearGradient(cx, cy, x2, y2);
    rayGrad.addColorStop(0, 'rgba(255, 245, 190, 0.85)');
    rayGrad.addColorStop(0.4, 'rgba(255, 195, 80, 0.50)');
    rayGrad.addColorStop(1, 'rgba(230, 140, 40, 0.0)');

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

export function createWallArtTexture(): THREE.CanvasTexture {
  return createPoster369Texture();
}

export function createSoftParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const radGrad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  radGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  radGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.55)');
  radGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.12)');
  radGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 64, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// Complete 3D Developer Workspace Scene (Exact match to User Reference Photo)
// ============================================================================
export interface DeskWorkspaceResult {
  group: THREE.Group;
  deskSunburst: THREE.Mesh;
  steamParticles: THREE.Points;
  screenbarLight: THREE.SpotLight;
  deskLampLight: THREE.PointLight;
  wallBacklight: THREE.PointLight;
  cornerLight?: THREE.PointLight;
  shelfLampLight?: THREE.PointLight;
}

export function createDeskWorkspaceScene(): DeskWorkspaceResult {
  const group = new THREE.Group();
  group.name = 'developer-workspace-scene';

  // Textures
  const oakTex = createNaturalOakTexture();
  const screenTex = createMonitorWallpaperTexture();
  const laptopTex = createLaptopWallpaperTexture();
  const macbookKbTex = createMacBookKeyboardTexture();
  const poster369Tex = createPoster369Texture();
  const dieterTex = createDieterRamsArtTexture();
  const circleTex = createCircleArtTexture();
  const feltTex = createFeltMatTexture();
  const clockTex = createClockTexture();
  const sunburstTex = createSunburstTexture();
  const particleTex = createSoftParticleTexture();

  // Core Scandinavian / Japandi Materials
  const oakMat = new THREE.MeshStandardMaterial({
    map: oakTex,
    roughness: 0.38,
    metalness: 0.04
  });

  const whiteMetalMat = new THREE.MeshStandardMaterial({
    color: 0xd8d4cb,
    roughness: 0.45,
    metalness: 0.12
  });

  const matteBlackMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.58,
    metalness: 0.22
  });

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.25,
    metalness: 0.88
  });

  const spaceGrayMat = new THREE.MeshStandardMaterial({
    color: 0x2e3037,
    roughness: 0.36,
    metalness: 0.65
  });

  const macbookDeckMat = new THREE.MeshStandardMaterial({
    map: macbookKbTex,
    roughness: 0.35,
    metalness: 0.28,
    emissive: 0xffffff,
    emissiveMap: macbookKbTex,
    emissiveIntensity: 0.22
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 0.12,
    metalness: 0.94
  });

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    roughness: 0.24,
    metalness: 0.04,
    emissive: 0xffdfa8,
    emissiveMap: screenTex,
    emissiveIntensity: 0.25
  });

  const laptopScreenMat = new THREE.MeshStandardMaterial({
    map: laptopTex,
    roughness: 0.20,
    metalness: 0.04,
    emissive: 0xffffff,
    emissiveMap: laptopTex,
    emissiveIntensity: 0.38
  });

  const feltMat = new THREE.MeshStandardMaterial({
    map: feltTex,
    roughness: 0.94,
    metalness: 0.02
  });

  const meshChairMat = new THREE.MeshStandardMaterial({
    color: 0xd6d3cc,
    roughness: 0.78,
    metalness: 0.06
  });

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xe5dfd5, // Warm Scandinavian cream / linen plaster matching reference photo
    roughness: 0.92,
    metalness: 0.01
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x9e988e, // Warm light concrete tile
    roughness: 0.72,
    metalness: 0.04
  });

  // Scene Proportions
  const floorY = -0.85;
  const deskTopY = -0.11;
  const deskThick = 0.038;
  const deskWidth = 1.68;
  const deskDepth = 0.86;

  // =========================================================================
  // 1. Room Shell & Architecture (Warm off-white walls & concrete tile floor)
  // =========================================================================
  // Neutral light concrete floor
  const floorGeo = new THREE.PlaneGeometry(10.0, 8.0);
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, floorY, -0.2);
  floor.receiveShadow = true;
  group.add(floor);

  // Circular Area Rug under chair (plush oat-beige wool felt)
  const rugGeo = new THREE.CylinderGeometry(0.60, 0.60, 0.006, 36);
  const rugMat = new THREE.MeshStandardMaterial({
    color: 0x827b6e,
    roughness: 0.94,
    metalness: 0.01
  });
  const rug = new THREE.Mesh(rugGeo, rugMat);
  rug.position.set(-0.54, floorY + 0.003, 0.04);
  rug.receiveShadow = true;
  group.add(rug);

  // Back Wall (warm off-white / light cream)
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(10.0, 5.0),
    wallMat
  );
  backWall.position.set(0, floorY + 2.5, -1.25);
  backWall.receiveShadow = true;
  group.add(backWall);

  // Left Wall (corner meeting back wall)
  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(6.0, 5.0),
    wallMat
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-1.15, floorY + 2.5, 0.5);
  leftWall.receiveShadow = true;
  group.add(leftWall);

  // Architectural White Wooden Baseboards (Skirting Boards along floor)
  const baseboardMat = new THREE.MeshStandardMaterial({
    color: 0xf3efe8,
    roughness: 0.65,
    metalness: 0.02
  });
  const backBaseboard = new THREE.Mesh(
    new THREE.BoxGeometry(10.0, 0.085, 0.016),
    baseboardMat
  );
  backBaseboard.position.set(0, floorY + 0.0425, -1.242);
  group.add(backBaseboard);

  const leftBaseboard = new THREE.Mesh(
    new THREE.BoxGeometry(0.016, 0.085, 6.0),
    baseboardMat
  );
  leftBaseboard.position.set(-1.142, floorY + 0.0425, 0.5);
  group.add(leftBaseboard);

  // Slim Vertical Amber Light Bar in the corner (as seen in photo)
  const cornerLightGroup = new THREE.Group();
  cornerLightGroup.position.set(-1.12, floorY + 0.9, -1.22);

  const cornerLightPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.009, 1.8, 12),
    matteBlackMat
  );
  cornerLightGroup.add(cornerLightPole);

  const cornerLightStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.008, 1.76, 0.008),
    new THREE.MeshBasicMaterial({ color: 0xff8c20 })
  );
  cornerLightStrip.position.set(0.006, 0, 0.006);
  cornerLightGroup.add(cornerLightStrip);

  const cornerLight = new THREE.PointLight(0xff9428, 2.2, 4.5);
  cornerLight.position.set(0.06, 0.20, 0.06);
  cornerLightGroup.add(cornerLight);
  group.add(cornerLightGroup);

  // Framed "369" Poster on the Left Wall (large red graphic typography)
  const poster369Group = new THREE.Group();
  poster369Group.position.set(-1.14, 0.52, -0.42);
  poster369Group.rotation.y = Math.PI / 2;

  const poster369Frame = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.68, 0.016),
    whiteMetalMat
  );
  poster369Group.add(poster369Frame);

  const poster369Canvas = new THREE.Mesh(
    new THREE.PlaneGeometry(0.45, 0.65),
    new THREE.MeshStandardMaterial({ map: poster369Tex, roughness: 0.65 })
  );
  poster369Canvas.position.z = 0.009;
  poster369Group.add(poster369Canvas);
  group.add(poster369Group);

  // =========================================================================
  // 2. White Floating Wall Shelf above Desk (Plants, Dieter Rams, Amber Lamp)
  // =========================================================================
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(-0.02, 0.66, -1.22);

  // White Shelf Plank
  const shelfBoard = new THREE.Mesh(
    new THREE.BoxGeometry(1.52, 0.022, 0.22),
    whiteMetalMat
  );
  shelfBoard.receiveShadow = true;
  shelfGroup.add(shelfBoard);

  // White Steel Brackets underneath shelf
  [-0.55, 0.55].forEach((bx) => {
    const bracketV = new THREE.Mesh(
      new THREE.BoxGeometry(0.018, 0.16, 0.018),
      whiteMetalMat
    );
    bracketV.position.set(bx, -0.09, -0.09);
    shelfGroup.add(bracketV);

    const bracketH = new THREE.Mesh(
      new THREE.BoxGeometry(0.018, 0.018, 0.18),
      whiteMetalMat
    );
    bracketH.position.set(bx, -0.02, 0);
    shelfGroup.add(bracketH);
  });

  // Hanging Trailing Ivy / Pothos Houseplant on the Left of Shelf (Lush & Cascading)
  const plantGroup = new THREE.Group();
  plantGroup.position.set(-0.45, 0.011, 0);

  // Matte Black Ceramic Pot with Saucer Rim
  const plantPot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.052, 0.12, 24),
    matteBlackMat
  );
  plantPot.position.y = 0.06;
  plantGroup.add(plantPot);

  const potRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.068, 0.008, 10, 24),
    matteBlackMat
  );
  potRim.rotation.x = Math.PI / 2;
  potRim.position.y = 0.12;
  plantGroup.add(potRim);

  // Potting Soil
  const soil = new THREE.Mesh(
    new THREE.CircleGeometry(0.064, 18),
    new THREE.MeshStandardMaterial({ color: 0x1f140e, roughness: 0.95 })
  );
  soil.rotation.x = -Math.PI / 2;
  soil.position.y = 0.116;
  plantGroup.add(soil);

  // Multi-tone Natural Foliage Materials
  const leafMatDark = new THREE.MeshStandardMaterial({
    color: 0x244c1d,
    roughness: 0.52,
    metalness: 0.04,
    side: THREE.DoubleSide
  });
  const leafMatMid = new THREE.MeshStandardMaterial({
    color: 0x346b2b,
    roughness: 0.48,
    metalness: 0.04,
    side: THREE.DoubleSide
  });
  const leafMatLight = new THREE.MeshStandardMaterial({
    color: 0x488a3a,
    roughness: 0.45,
    metalness: 0.03,
    side: THREE.DoubleSide
  });
  const leafMats = [leafMatDark, leafMatMid, leafMatLight];

  // Dense Bushy Foliage Crown on top of pot
  for (let l = 0; l < 28; l++) {
    const angle = (l / 28) * Math.PI * 2 + Math.random() * 0.2;
    const r = 0.025 + Math.random() * 0.045;
    const lMat = leafMats[l % 3];
    const leaf = new THREE.Mesh(
      new THREE.PlaneGeometry(0.042, 0.052),
      lMat
    );
    leaf.position.set(Math.cos(angle) * r, 0.125 + Math.random() * 0.03, Math.sin(angle) * r);
    leaf.rotation.set(-0.35 + Math.random() * 0.3, angle + 0.2, (Math.random() - 0.5) * 0.4);
    plantGroup.add(leaf);
  }

  // 8 Drooping Trailing Vines cascading gracefully over the shelf edge
  const vineOffsets = [
    { angle: -Math.PI * 0.55, len: 0.44, sway: -0.02 },
    { angle: -Math.PI * 0.45, len: 0.38, sway: 0.02 },
    { angle: -Math.PI * 0.65, len: 0.32, sway: -0.04 },
    { angle: -Math.PI * 0.35, len: 0.46, sway: 0.03 },
    { angle: -Math.PI * 0.50, len: 0.40, sway: 0.00 },
    { angle: -Math.PI * 0.72, len: 0.26, sway: -0.03 },
    { angle: -Math.PI * 0.28, len: 0.28, sway: 0.04 },
    { angle: -Math.PI * 0.48, len: 0.42, sway: -0.01 }
  ];

  vineOffsets.forEach((v, vi) => {
    const vx = Math.cos(v.angle) * 0.068 + v.sway;
    const vz = 0.065 + Math.sin(v.angle) * 0.02;
    const nodeCount = 8;

    for (let seg = 0; seg < nodeCount; seg++) {
      const progress = seg / (nodeCount - 1);
      const segY = 0.10 - progress * v.len;
      const waveX = Math.sin(progress * Math.PI * 2.5) * 0.018;
      const lMat = leafMats[(vi + seg) % 3];
      const leafScale = 1.0 - progress * 0.25;

      const vineLeaf = new THREE.Mesh(
        new THREE.PlaneGeometry(0.040 * leafScale, 0.050 * leafScale),
        lMat
      );
      vineLeaf.position.set(vx + waveX + (seg % 2 === 0 ? 0.016 : -0.016), segY, vz + progress * 0.035);
      vineLeaf.rotation.set(0.35 + progress * 0.2, (seg * 0.6) + vi, (seg % 2 === 0 ? 0.2 : -0.2));
      plantGroup.add(vineLeaf);
    }
  });
  shelfGroup.add(plantGroup);

  // Framed "dieter rams" Art leaning on shelf
  const dieterGroup = new THREE.Group();
  dieterGroup.position.set(0.05, 0.16, -0.03);
  dieterGroup.rotation.x = -0.06;

  const dieterFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.29, 0.014),
    whiteMetalMat
  );
  dieterGroup.add(dieterFrame);

  const dieterCanvas = new THREE.Mesh(
    new THREE.PlaneGeometry(0.35, 0.26),
    new THREE.MeshStandardMaterial({ map: dieterTex, roughness: 0.65 })
  );
  dieterCanvas.position.z = 0.008;
  dieterGroup.add(dieterCanvas);
  shelfGroup.add(dieterGroup);

  // Mid-Century Amber Mushroom Lamp on shelf (glowing amber glass)
  const mushroomGroup = new THREE.Group();
  mushroomGroup.position.set(0.28, 0.011, 0.01);

  const amberGlassMat = new THREE.MeshStandardMaterial({
    color: 0xdf6a1e,
    emissive: 0xd65814,
    emissiveIntensity: 0.85,
    roughness: 0.24,
    transparent: true,
    opacity: 0.94
  });

  // Mushroom Stem
  const mushStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.038, 0.12, 16),
    amberGlassMat
  );
  mushStem.position.y = 0.06;
  mushroomGroup.add(mushStem);

  // Mushroom Dome Cap
  const mushCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.068, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2),
    amberGlassMat
  );
  mushCap.position.y = 0.12;
  mushroomGroup.add(mushCap);

  const shelfLampLight = new THREE.PointLight(0xff9824, 1.8, 3.2);
  shelfLampLight.position.set(0, 0.16, 0.04);
  mushroomGroup.add(shelfLampLight);
  shelfGroup.add(mushroomGroup);

  // Vintage Retro Camera on shelf
  const cameraGroup = new THREE.Group();
  cameraGroup.position.set(0.42, 0.011, 0.02);

  const camBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.075, 0.048, 0.038),
    matteBlackMat
  );
  camBody.position.y = 0.024;
  cameraGroup.add(camBody);

  const camLens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.016, 0.016, 0.022, 16),
    aluminumMat
  );
  camLens.rotation.x = Math.PI / 2;
  camLens.position.set(0, 0.024, 0.026);
  cameraGroup.add(camLens);
  shelfGroup.add(cameraGroup);

  // Framed Concentric Circles Art Frame on right end of shelf
  const circleArtGroup = new THREE.Group();
  circleArtGroup.position.set(0.56, 0.13, -0.03);
  circleArtGroup.rotation.x = -0.06;

  const circleFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.20, 0.20, 0.012),
    matteBlackMat
  );
  circleArtGroup.add(circleFrame);

  const circleCanvas = new THREE.Mesh(
    new THREE.PlaneGeometry(0.18, 0.18),
    new THREE.MeshStandardMaterial({ map: circleTex, roughness: 0.65 })
  );
  circleCanvas.position.z = 0.007;
  circleArtGroup.add(circleCanvas);
  shelfGroup.add(circleArtGroup);

  group.add(shelfGroup);

  // =========================================================================
  // 3. Standing Desk (Natural Light Oak Tabletop & White Motorized Legs)
  // =========================================================================
  // Natural Scandinavian Oak Tabletop
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(deskWidth, deskThick, deskDepth),
    oakMat
  );
  deskTop.position.set(-0.02, deskTopY - deskThick / 2, -0.32);
  deskTop.receiveShadow = true;
  group.add(deskTop);

  // Rounded front bullnose edge
  const frontLip = new THREE.Mesh(
    new THREE.CylinderGeometry(deskThick / 2, deskThick / 2, deskWidth, 16),
    oakMat
  );
  frontLip.rotation.z = Math.PI / 2;
  frontLip.position.set(-0.02, deskTopY - deskThick / 2, -0.32 + deskDepth / 2);
  frontLip.receiveShadow = true;
  group.add(frontLip);

  // White Motorized T-Frame Legs
  const legHeight = Math.abs(deskTopY - deskThick - floorY);
  const legXPositions = [-0.02 - deskWidth / 2 + 0.15, -0.02 + deskWidth / 2 - 0.15];

  legXPositions.forEach((lx) => {
    // Dual-stage telescoping white columns
    const legUpper = new THREE.Mesh(
      new THREE.BoxGeometry(0.075, legHeight * 0.52, 0.065),
      whiteMetalMat
    );
    legUpper.position.set(lx, floorY + legHeight * 0.74, -0.32);
    group.add(legUpper);

    const legLower = new THREE.Mesh(
      new THREE.BoxGeometry(0.065, legHeight * 0.52, 0.055),
      whiteMetalMat
    );
    legLower.position.set(lx, floorY + legHeight * 0.26, -0.32);
    group.add(legLower);

    // White horizontal foot beam on floor with beveled ends
    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(0.10, 0.032, 0.62),
      whiteMetalMat
    );
    foot.position.set(lx, floorY + 0.016, -0.32);
    group.add(foot);

    // Leveling glides
    [-0.26, 0.26].forEach((gz) => {
      const glide = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.012, 12),
        matteBlackMat
      );
      glide.position.set(lx, floorY + 0.006, -0.32 + gz);
      group.add(glide);
    });
  });

  // Structural crossbar connecting legs under desk
  const crossbar = new THREE.Mesh(
    new THREE.BoxGeometry(deskWidth - 0.35, 0.045, 0.045),
    whiteMetalMat
  );
  crossbar.position.set(-0.02, deskTopY - deskThick - 0.035, -0.32);
  group.add(crossbar);

  // White 3-Drawer Under-Desk Mobile Cabinet (Pedestal on Right)
  const cabinetGroup = new THREE.Group();
  cabinetGroup.position.set(0.48, floorY + 0.27, -0.22);

  const cabBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.31, 0.53, 0.46),
    whiteMetalMat
  );
  cabinetGroup.add(cabBody);

  // 3 Drawer front faces with recessed pull handles
  for (let d = 0; d < 3; d++) {
    const dy = 0.17 - d * 0.17;
    const drawerFront = new THREE.Mesh(
      new THREE.BoxGeometry(0.306, 0.162, 0.012),
      whiteMetalMat
    );
    drawerFront.position.set(0, dy, 0.236);
    cabinetGroup.add(drawerFront);

    // Recessed pull slot
    const pullSlot = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.016, 0.008),
      matteBlackMat
    );
    pullSlot.position.set(0, dy + 0.045, 0.243);
    cabinetGroup.add(pullSlot);
  }

  // Cabinet caster wheels
  [-0.12, 0.12].forEach((cx) => {
    [-0.18, 0.18].forEach((cz) => {
      const caster = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.014, 0.018, 12),
        matteBlackMat
      );
      caster.position.set(cx, -0.275, cz);
      cabinetGroup.add(caster);
    });
  });
  group.add(cabinetGroup);

  // Hanging Over-Ear Headphones on Desk Side Hook (Right side)
  const headphoneGroup = new THREE.Group();
  headphoneGroup.position.set(0.66, deskTopY - 0.16, -0.15);

  // White side hook
  const hook = new THREE.Mesh(
    new THREE.BoxGeometry(0.014, 0.014, 0.07),
    whiteMetalMat
  );
  hook.position.set(-0.02, 0.08, 0);
  headphoneGroup.add(hook);

  // Silver Headband arc
  const headband = new THREE.Mesh(
    new THREE.TorusGeometry(0.048, 0.007, 8, 20, Math.PI),
    aluminumMat
  );
  headband.position.set(0, 0.05, 0);
  headphoneGroup.add(headband);

  // Plush Silver-Gray Earcups
  [-0.048, 0.048].forEach((hx, i) => {
    const earcup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.034, 0.034, 0.026, 18),
      new THREE.MeshStandardMaterial({ color: 0xd0cecb, roughness: 0.65 })
    );
    earcup.rotation.z = Math.PI / 2;
    earcup.position.set(hx, 0.02, 0);
    headphoneGroup.add(earcup);
  });
  group.add(headphoneGroup);

  // =========================================================================
  // 4. Ergonomic Mesh Task Chair (Foreground Left on Circular Rug)
  // =========================================================================
  const chairGroup = new THREE.Group();
  chairGroup.position.set(-0.54, floorY, 0.04);
  chairGroup.rotation.y = 0.35; // Naturally tucked at desk matching reference photo

  // 5-Star Polished Chrome Base
  for (let s = 0; s < 5; s++) {
    const armAngle = (s / 5) * Math.PI * 2;
    const armLen = 0.26;
    const starArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.022, 0.018, armLen),
      chromeMat
    );
    starArm.position.set(Math.sin(armAngle) * armLen * 0.5, 0.036, Math.cos(armAngle) * armLen * 0.5);
    starArm.rotation.y = armAngle;
    chairGroup.add(starArm);

    // Black dual-wheel caster
    const caster = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.016, 12),
      matteBlackMat
    );
    caster.rotation.z = Math.PI / 2;
    caster.position.set(Math.sin(armAngle) * armLen, 0.018, Math.cos(armAngle) * armLen);
    chairGroup.add(caster);
  }

  // Chrome Gas Lift Cylinder Column
  const gasCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.024, 0.24, 16),
    chromeMat
  );
  gasCylinder.position.y = 0.16;
  chairGroup.add(gasCylinder);

  // Tilt Mechanism under seat
  const seatMech = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.045, 0.18),
    matteBlackMat
  );
  seatMech.position.y = 0.29;
  chairGroup.add(seatMech);

  // Contoured White Seat Cushion (breathable mesh/fabric)
  const seatCushion = new THREE.Mesh(
    new THREE.BoxGeometry(0.44, 0.075, 0.42),
    meshChairMat
  );
  seatCushion.position.set(0, 0.34, -0.02);
  chairGroup.add(seatCushion);

  // Curved Ergonomic White Backrest Frame (Herman Miller / Scandinavian Style)
  const backFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.44, 0.52, 0.024),
    whiteMetalMat
  );
  backFrame.position.set(0, 0.62, 0.18);
  backFrame.rotation.x = -0.14;
  chairGroup.add(backFrame);

  // Ergonomic Wishbone / Y-Spine Lumbar Architecture on the Back
  const spineVertical = new THREE.Mesh(
    new THREE.BoxGeometry(0.038, 0.46, 0.022),
    whiteMetalMat
  );
  spineVertical.position.set(0, 0.62, 0.198);
  spineVertical.rotation.x = -0.14;
  chairGroup.add(spineVertical);

  // Horizontal Lumbar Support Bar across lower back
  const lumbarBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.065, 0.026),
    whiteMetalMat
  );
  lumbarBar.position.set(0, 0.53, 0.188);
  lumbarBar.rotation.x = -0.14;
  chairGroup.add(lumbarBar);

  // Upper Y-Rib Supports branching to shoulders
  [-0.12, 0.12].forEach((rx) => {
    const yRib = new THREE.Mesh(
      new THREE.BoxGeometry(0.024, 0.22, 0.018),
      whiteMetalMat
    );
    yRib.position.set(rx, 0.72, 0.21);
    yRib.rotation.set(-0.14, 0, rx > 0 ? -0.32 : 0.32);
    chairGroup.add(yRib);
  });

  // Light Gray Breathable Woven Mesh Panel
  const meshPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.40, 0.48),
    new THREE.MeshStandardMaterial({
      color: 0xd2cec7,
      roughness: 0.82,
      side: THREE.DoubleSide
    })
  );
  meshPanel.position.set(0, 0.62, 0.165);
  meshPanel.rotation.x = -0.14;
  chairGroup.add(meshPanel);

  // Ergonomic Padded Armrests (Left & Right)
  [-0.23, 0.23].forEach((ax) => {
    const armPost = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.20, 12),
      whiteMetalMat
    );
    armPost.position.set(ax, 0.44, 0.02);
    chairGroup.add(armPost);

    const armPad = new THREE.Mesh(
      new THREE.BoxGeometry(0.065, 0.022, 0.22),
      meshChairMat
    );
    armPad.position.set(ax, 0.54, 0.02);
    chairGroup.add(armPad);
  });
  group.add(chairGroup);

  // =========================================================================
  // 5. Solid Oak Dual-Tone Monitor Riser with Cubbies & Warm LED Backlight
  // =========================================================================
  const riserGroup = new THREE.Group();
  riserGroup.position.set(0.02, deskTopY + 0.002, -0.48);

  const riserW = 0.92;
  const riserD = 0.22;
  const riserH = 0.085;

  // Oak Riser Top Board
  const riserTop = new THREE.Mesh(
    new THREE.BoxGeometry(riserW, 0.020, riserD),
    oakMat
  );
  riserTop.position.y = riserH - 0.010;
  riserTop.receiveShadow = true;
  riserGroup.add(riserTop);

  // Oak Riser Legs and Center Divider (forming 2 open cubbies)
  [-riserW / 2 + 0.012, 0, riserW / 2 - 0.012].forEach((rx) => {
    const riserLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.024, riserH - 0.020, riserD),
      oakMat
    );
    riserLeg.position.set(rx, (riserH - 0.020) / 2, 0);
    riserGroup.add(riserLeg);
  });

  // Contents Inside Riser Cubbies:
  // Left Cubby: Black Audio DAC / Interface
  const dac = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.042, 0.14),
    matteBlackMat
  );
  dac.position.set(-0.22, 0.022, 0.01);
  riserGroup.add(dac);

  const dacKnob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, 0.012, 16),
    aluminumMat
  );
  dacKnob.rotation.x = Math.PI / 2;
  dacKnob.position.set(-0.26, 0.022, 0.082);
  riserGroup.add(dacKnob);

  // Center: White Wireless Gaming Controller
  const controllerGroup = new THREE.Group();
  controllerGroup.position.set(0.08, 0.016, 0.02);

  const ctrlBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.028, 0.075),
    whiteMetalMat
  );
  controllerGroup.add(ctrlBody);

  [-0.035, 0.035].forEach((tx) => {
    const thumbstick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.009, 0.009, 0.012, 12),
      matteBlackMat
    );
    thumbstick.position.set(tx, 0.018, 0);
    controllerGroup.add(thumbstick);
  });
  riserGroup.add(controllerGroup);

  // Right Cubby: Compact White Mac Studio / Console Box
  const macStudio = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.052, 0.16),
    whiteMetalMat
  );
  macStudio.position.set(0.28, 0.027, 0.01);
  riserGroup.add(macStudio);

  // Warm Amber LED Light Strip along back of riser glowing against wall
  const riserLed = new THREE.Mesh(
    new THREE.BoxGeometry(riserW - 0.08, 0.006, 0.006),
    new THREE.MeshBasicMaterial({ color: 0xff9438 })
  );
  riserLed.position.set(0, riserH - 0.010, -riserD / 2);
  riserGroup.add(riserLed);

  const wallBacklight = new THREE.PointLight(0xff8c20, 1.8, 3.2);
  wallBacklight.position.set(0, riserH + 0.10, -riserD / 2 - 0.08);
  riserGroup.add(wallBacklight);

  group.add(riserGroup);

  // =========================================================================
  // 6. Curved Widescreen Monitor with Screenbar ("FOCUS" Minimalist Wallpaper)
  // =========================================================================
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(0.02, deskTopY + riserH + 0.002, -0.48);

  // Articulated Black Monitor Arm Stand
  const armBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.025, 16),
    matteBlackMat
  );
  armBase.position.set(0, 0.012, -0.06);
  monitorGroup.add(armBase);

  const armPillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.26, 14),
    matteBlackMat
  );
  armPillar.position.set(0, 0.14, -0.06);
  monitorGroup.add(armPillar);

  // Curved 34-Inch Widescreen Display
  const screenW = 0.78;
  const screenH = 0.40;
  const screenCenterY = 0.28;

  // Monitor Chassis Back
  const screenBack = new THREE.Mesh(
    new THREE.BoxGeometry(screenW, screenH, 0.018),
    matteBlackMat
  );
  screenBack.position.set(0, screenCenterY, 0.02);
  monitorGroup.add(screenBack);

  // Display Screen Face with "FOCUS" Wallpaper
  const screenFace = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW - 0.014, screenH - 0.014),
    screenMat
  );
  screenFace.position.set(0, screenCenterY, 0.030);
  monitorGroup.add(screenFace);

  // Sleek Black Screenbar mounted on top of monitor
  const screenbarY = screenCenterY + screenH / 2 + 0.012;
  const screenbar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.009, 0.46, 16),
    matteBlackMat
  );
  screenbar.rotation.z = Math.PI / 2;
  screenbar.position.set(0, screenbarY, 0.048);
  monitorGroup.add(screenbar);

  // Downward warm light strip on screenbar
  const lightStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.003, 0.008),
    new THREE.MeshBasicMaterial({ color: 0xfff0dd })
  );
  lightStrip.position.set(0, screenbarY - 0.008, 0.048);
  monitorGroup.add(lightStrip);

  const screenbarLight = new THREE.SpotLight(0xffeedd, 1.3, 2.2, Math.PI / 3.8, 0.72);
  screenbarLight.position.set(0, screenbarY, 0.048);
  screenbarLight.target.position.set(0, 0, 0.32);
  monitorGroup.add(screenbarLight);
  monitorGroup.add(screenbarLight.target);

  group.add(monitorGroup);

  // =========================================================================
  // 7. White Bookshelf Studio Speakers on Monitor Riser (Left & Right)
  // =========================================================================
  [-0.38, 0.42].forEach((sx) => {
    const spkGroup = new THREE.Group();
    spkGroup.position.set(sx, deskTopY + riserH + 0.002, -0.48);

    // Matte White Cabinet Body
    const spkBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.115, 0.175, 0.135),
      whiteMetalMat
    );
    spkBody.position.y = 0.088;
    spkGroup.add(spkBody);

    // Black Circular Woofer Cone
    const woofer = new THREE.Mesh(
      new THREE.CylinderGeometry(0.036, 0.036, 0.006, 20),
      matteBlackMat
    );
    woofer.rotation.x = Math.PI / 2;
    woofer.position.set(0, 0.065, 0.070);
    spkGroup.add(woofer);

    // Silk Dome Tweeter
    const tweeter = new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 14, 10),
      matteBlackMat
    );
    tweeter.position.set(0, 0.130, 0.068);
    spkGroup.add(tweeter);

    group.add(spkGroup);
  });

  // =========================================================================
  // 8. Elevated Aluminum Laptop Stand with Apple MacBook Pro 16"
  // =========================================================================
  const laptopGroup = new THREE.Group();
  laptopGroup.position.set(-0.54, deskTopY + 0.002, -0.30);
  laptopGroup.rotation.y = 0.28; // Angled inward toward user

  // Stand Base (flat plate on desk)
  const standBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.19, 0.006, 0.17),
    aluminumMat
  );
  standBase.position.y = 0.003;
  laptopGroup.add(standBase);

  // Stand Support Riser (curved/angled cantilever column)
  const standArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.13, 0.012),
    aluminumMat
  );
  standArm.position.set(0, 0.065, -0.04);
  standArm.rotation.x = -0.08;
  laptopGroup.add(standArm);

  // Stand Tray (angled platform)
  const trayAngle = 0.20; // ~11.5 deg tilt
  const standTray = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.006, 0.17),
    aluminumMat
  );
  standTray.position.set(0, 0.125, 0.015);
  standTray.rotation.x = trayAngle;
  laptopGroup.add(standTray);

  // Stand Front Retention Lip Hooks (holds MacBook from sliding)
  [-0.08, 0.08].forEach((lx) => {
    const lip = new THREE.Mesh(
      new THREE.BoxGeometry(0.024, 0.014, 0.008),
      aluminumMat
    );
    lip.position.set(lx, 0.125 - Math.sin(trayAngle) * 0.085 + 0.007, 0.015 + Math.cos(trayAngle) * 0.085);
    lip.rotation.x = trayAngle;
    laptopGroup.add(lip);
  });

  // MacBook Pro 16" Assembly (mounted securely on tray)
  const macbookPro = new THREE.Group();
  macbookPro.position.set(0, 0.131, 0.015);
  macbookPro.rotation.x = trayAngle;

  // 1. MacBook Unibody Base Chassis
  const mbBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.008, 0.176),
    spaceGrayMat
  );
  macbookPro.add(mbBase);

  // 2. MacBook Keyboard Deck & Trackpad (High-detail texture)
  const mbDeck = new THREE.Mesh(
    new THREE.PlaneGeometry(0.258, 0.174),
    macbookDeckMat
  );
  mbDeck.position.set(0, 0.0042, 0);
  mbDeck.rotation.x = -Math.PI / 2;
  macbookPro.add(mbDeck);

  // 3. Display Hinge (Black anodized hinge cylinder)
  const hingeZ = -0.088;
  const mbHinge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0045, 0.0045, 0.23, 16),
    matteBlackMat
  );
  mbHinge.rotation.z = Math.PI / 2;
  mbHinge.position.set(0, 0.0042, hingeZ);
  macbookPro.add(mbHinge);

  // 4. MacBook Display Lid (opens from hinge at ~115 degrees relative to base)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.0042, hingeZ);
  lidGroup.rotation.x = -0.36; // Open angle

  // Lid Aluminum Backplate
  const lidH = 0.168;
  const mbLidBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, lidH, 0.005),
    spaceGrayMat
  );
  mbLidBack.position.set(0, lidH / 2, -0.0026);
  lidGroup.add(mbLidBack);

  // Front Display Glass Bezel
  const mbBezel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.258, lidH - 0.002),
    matteBlackMat
  );
  mbBezel.position.set(0, lidH / 2, 0.0001);
  lidGroup.add(mbBezel);

  // Apple Camera Notch at top of bezel
  const mbNotch = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, 0.005, 0.0006),
    matteBlackMat
  );
  mbNotch.position.set(0, lidH - 0.0035, 0.0004);
  lidGroup.add(mbNotch);

  // Active Glowing Retina Display Screen (High-Visibility IDE / Turbopack)
  const mbScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.250, 0.158),
    laptopScreenMat
  );
  mbScreen.position.set(0, lidH / 2 - 0.002, 0.0003);
  lidGroup.add(mbScreen);

  macbookPro.add(lidGroup);
  laptopGroup.add(macbookPro);
  group.add(laptopGroup);

  // Digital LED Desk Clock ("10:30") beside laptop
  const clockGroup = new THREE.Group();
  clockGroup.position.set(-0.66, deskTopY + 0.002, -0.16);
  clockGroup.rotation.y = 0.35;

  const clockBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.065, 0.042, 0.032),
    matteBlackMat
  );
  clockBody.position.y = 0.021;
  clockGroup.add(clockBody);

  const clockFace = new THREE.Mesh(
    new THREE.PlaneGeometry(0.058, 0.036),
    new THREE.MeshStandardMaterial({
      map: clockTex,
      roughness: 0.2,
      emissive: 0x222222,
      emissiveIntensity: 0.8
    })
  );
  clockFace.position.set(0, 0.021, 0.017);
  clockGroup.add(clockFace);
  group.add(clockGroup);

  // Small Succulent Plant next to clock
  const smallPlant = new THREE.Mesh(
    new THREE.CylinderGeometry(0.024, 0.018, 0.044, 14),
    whiteMetalMat
  );
  smallPlant.position.set(-0.68, deskTopY + 0.022, -0.26);
  group.add(smallPlant);

  const plantLeaf = new THREE.Mesh(
    new THREE.SphereGeometry(0.022, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0x3d7034, roughness: 0.6 })
  );
  plantLeaf.position.set(-0.68, deskTopY + 0.052, -0.26);
  group.add(plantLeaf);

  // =========================================================================
  // 9. Heather Gray Felt Desk Mat, Keyboard & Mouse
  // =========================================================================
  // Large Felt Desk Mat centered on desk
  const matGeo = new THREE.PlaneGeometry(0.78, 0.38);
  const deskMatMesh = new THREE.Mesh(matGeo, feltMat);
  deskMatMesh.rotation.x = -Math.PI / 2;
  deskMatMesh.position.set(-0.06, deskTopY + 0.003, -0.16);
  deskMatMesh.receiveShadow = true;
  group.add(deskMatMesh);

  // Retro Mechanical Keyboard with warm orange accent keycaps
  const keyboardGroup = new THREE.Group();
  keyboardGroup.position.set(-0.14, deskTopY + 0.004, -0.16);
  keyboardGroup.rotation.y = 0.02;

  const kbBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.016, 0.13),
    whiteMetalMat
  );
  kbBody.position.y = 0.008;
  keyboardGroup.add(kbBody);

  const keycapMat = new THREE.MeshStandardMaterial({
    color: 0xeee8dc,
    roughness: 0.52
  });
  const orangeKeyMat = new THREE.MeshStandardMaterial({
    color: 0xd95a28,
    roughness: 0.48
  });

  for (let r = 0; r < 5; r++) {
    const rz = -0.044 + r * 0.022;
    const isOrangeRow = r === 0 || r === 4;
    const rowMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.315, 0.008, 0.018),
      isOrangeRow ? orangeKeyMat : keycapMat
    );
    rowMesh.position.set(0, 0.018, rz);
    keyboardGroup.add(rowMesh);
  }
  group.add(keyboardGroup);

  // Ergonomic White Wireless Mouse (Logitech MX Master 3S style)
  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(0.12, deskTopY + 0.004, -0.14);
  mouseGroup.rotation.y = -0.08;

  const mouseBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.065, 0.028, 0.11),
    whiteMetalMat
  );
  mouseBody.position.y = 0.014;
  mouseGroup.add(mouseBody);

  const mouseWheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.007, 0.007, 0.014, 12),
    aluminumMat
  );
  mouseWheel.rotation.z = Math.PI / 2;
  mouseWheel.position.set(0, 0.028, -0.024);
  mouseGroup.add(mouseWheel);
  group.add(mouseGroup);

  // =========================================================================
  // 10. Right-Side Desk Decor (Succulent, Dieter Rams Book & Glass Lantern)
  // =========================================================================
  // Orange Hardcover Dieter Rams Notebook / Book
  const orangeBook = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.026, 0.22),
    new THREE.MeshStandardMaterial({ color: 0xd9521e, roughness: 0.62 })
  );
  orangeBook.position.set(0.56, deskTopY + 0.013, -0.30);
  orangeBook.rotation.y = -0.05;
  group.add(orangeBook);

  // Small Succulent on top of / beside orange book
  const rightSucculent = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.020, 0.048, 14),
    whiteMetalMat
  );
  rightSucculent.position.set(0.56, deskTopY + 0.026 + 0.024, -0.30);
  group.add(rightSucculent);

  const rightFoliage = new THREE.Mesh(
    new THREE.SphereGeometry(0.024, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0x3d7034, roughness: 0.6 })
  );
  rightFoliage.position.set(0.56, deskTopY + 0.026 + 0.054, -0.30);
  group.add(rightFoliage);

  // Ambient Glass Cylinder Lantern Lamp with Warm Vertical Glowing Filament
  const lanternGroup = new THREE.Group();
  lanternGroup.position.set(0.68, deskTopY + 0.002, -0.24);

  const lanternBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.038, 0.038, 0.016, 18),
    matteBlackMat
  );
  lanternBase.position.y = 0.008;
  lanternGroup.add(lanternBase);

  // Glass Cylinder
  const lanternGlass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.034, 0.034, 0.16, 18, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      transparent: true,
      opacity: 0.35
    })
  );
  lanternGlass.position.y = 0.096;
  lanternGroup.add(lanternGlass);

  // Glowing Vertical Filament
  const filament = new THREE.Mesh(
    new THREE.CylinderGeometry(0.003, 0.003, 0.09, 8),
    new THREE.MeshBasicMaterial({ color: 0xffaa33 })
  );
  filament.position.y = 0.096;
  lanternGroup.add(filament);

  const deskLampLight = new THREE.PointLight(0xffa238, 1.25, 2.8);
  deskLampLight.position.set(0, 0.10, 0);
  lanternGroup.add(deskLampLight);
  group.add(lanternGroup);

  // =========================================================================
  // 11. Radiant Sunburst Caustic Light on Desk (for Bishal's Portfolio Book)
  // =========================================================================
  const sunburstGeo = new THREE.PlaneGeometry(0.55, 0.55);
  const sunburstMat = new THREE.MeshBasicMaterial({
    map: sunburstTex,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    visible: false
  });
  const deskSunburst = new THREE.Mesh(sunburstGeo, sunburstMat);
  deskSunburst.rotation.x = -Math.PI / 2;
  deskSunburst.position.set(0.28, deskTopY + 0.003, -0.08);
  deskSunburst.visible = false;
  group.add(deskSunburst);

  // Steam particles placeholder to satisfy DeskWorkspaceResult interface
  const steamGeo = new THREE.BufferGeometry();
  steamGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));
  const steamParticles = new THREE.Points(steamGeo, new THREE.PointsMaterial({ visible: false }));
  steamParticles.visible = false;
  group.add(steamParticles);

  // =========================================================================
  // 12. Atmospheric Room Illumination (Warm, High-CRI Scandinavian Interior)
  // =========================================================================
  const roomAmbient = new THREE.AmbientLight(0xfff2e4, 0.48);
  group.add(roomAmbient);

  const ceilingKeyLight = new THREE.DirectionalLight(0xfff4ea, 0.42);
  ceilingKeyLight.position.set(1.5, 4.0, 2.0);
  ceilingKeyLight.castShadow = true;
  group.add(ceilingKeyLight);

  return {
    group,
    deskSunburst,
    steamParticles,
    screenbarLight,
    deskLampLight,
    wallBacklight,
    cornerLight,
    shelfLampLight
  };
}