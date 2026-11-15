'use client';

import React from 'react';
import { TW, TH, SERIF, SANS } from '@/lib/three/drawUtils';

export const heroData = {
  // Top epigraph quote related to creative developer portfolio
  topQuote: [
    'WHERE CODE BECOMES TACTILE & WEIGHTY.',
    'AN ARCHIVE OF INTERACTIVE CRAFT.'
  ],

  // Main stacked title lines with exact styling
  titleLines: [
    { text: 'THE', color: '#ffffff', size: 52, weight: '600' },
    { text: 'PORTFOLIO', color: '#df9c48', size: 60, weight: '700' }, // Burnished Warm Gold
    { text: 'OF', color: '#ffffff', size: 46, weight: '600' },
    { text: 'SELECTED', color: '#ffffff', size: 52, weight: '600' },
    { text: 'WORKS', color: '#ffffff', size: 62, weight: '700' }
  ],

  // Subtitle boxed between delicate gold rules
  subtitleLines: ['CREATIVE', 'DEVELOPER', 'VOLUME I'],

  // Author name at the bottom
  authorName: 'B I S H A L   S A H A',

  // Profile data for semantic & fallback
  name: 'Bishal Saha',
  role: 'Creative Developer',
  volume: 'Volume I'
};

let cachedCoverImg: HTMLImageElement | null = null;
let isCoverLoading = false;

export function preloadCoverImage(): Promise<HTMLImageElement | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (cachedCoverImg && cachedCoverImg.complete && cachedCoverImg.naturalWidth > 0) {
    return Promise.resolve(cachedCoverImg);
  }
  if (isCoverLoading) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (cachedCoverImg && cachedCoverImg.complete) {
          clearInterval(interval);
          resolve(cachedCoverImg);
        }
      }, 50);
    });
  }

  isCoverLoading = true;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/cover-bg.jpg';
    img.onload = () => {
      cachedCoverImg = img;
      isCoverLoading = false;
      resolve(img);
    };
    img.onerror = () => {
      isCoverLoading = false;
      resolve(null);
    };
  });
}

function drawTrackedText(
  g: CanvasRenderingContext2D,
  str: string,
  x: number,
  y: number,
  letterSpacing: number,
  align: 'left' | 'center' = 'left'
) {
  g.textAlign = 'left';
  const chars = str.split('');
  let totalWidth = 0;
  const widths = chars.map((c) => {
    const w = g.measureText(c).width;
    totalWidth += w;
    return w;
  });
  totalWidth += Math.max(0, chars.length - 1) * letterSpacing;

  let currentX = align === 'center' ? x - totalWidth / 2 : x;
  for (let i = 0; i < chars.length; i++) {
    g.fillText(chars[i], currentX, y);
    currentX += widths[i] + letterSpacing;
  }
}

function drawDiamondDivider(
  g: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lineWidth: number
) {
  g.save();
  g.strokeStyle = '#c49b66';
  g.lineWidth = 1;

  // Left line
  g.beginPath();
  g.moveTo(cx - lineWidth / 2, cy);
  g.lineTo(cx - 10, cy);
  g.stroke();

  // Center diamond
  g.fillStyle = '#dca75d';
  g.beginPath();
  g.moveTo(cx, cy - 4);
  g.lineTo(cx + 4, cy);
  g.lineTo(cx, cy + 4);
  g.lineTo(cx - 4, cy);
  g.closePath();
  g.fill();

  // Right line
  g.beginPath();
  g.moveTo(cx + 10, cy);
  g.lineTo(cx + lineWidth / 2, cy);
  g.stroke();
  g.restore();
}

function drawEnso(g: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  g.save();
  g.strokeStyle = '#dca75d';
  g.lineWidth = 4;
  g.lineCap = 'round';
  g.beginPath();
  // Open Zen circle with gap at top-right
  g.arc(cx, cy, r, 0.28 * Math.PI, 1.82 * Math.PI);
  g.stroke();

  // Subtle interior brush touch
  g.strokeStyle = 'rgba(235, 179, 102, 0.4)';
  g.lineWidth = 2;
  g.beginPath();
  g.arc(cx, cy, r - 2, 0.35 * Math.PI, 1.75 * Math.PI);
  g.stroke();
  g.restore();
}

function drawTreeOfLife(g: CanvasRenderingContext2D, cx: number, cy: number, scale: number = 1.0) {
  g.save();
  g.translate(cx, cy);
  g.scale(scale, scale);

  g.fillStyle = '#fbe39d';
  g.strokeStyle = '#d4a559';
  g.lineWidth = 2.5;

  // 1. Trunk
  g.beginPath();
  g.moveTo(-16, 45);
  g.bezierCurveTo(-14, 15, -22, -15, -12, -45);
  g.bezierCurveTo(-6, -65, 0, -85, 0, -95);
  g.bezierCurveTo(0, -85, 6, -65, 12, -45);
  g.bezierCurveTo(22, -15, 14, 15, 16, 45);
  g.closePath();
  g.fill();

  // 2. Main Canopy Boughs
  const branches = [
    { cp1x: -12, cp1y: -45, cp2x: -55, cp2y: -65, endx: -115, endy: -75 },
    { cp1x: -10, cp1y: -60, cp2x: -65, cp2y: -95, endx: -95, endy: -135 },
    { cp1x: -5, cp1y: -80, cp2x: -45, cp2y: -125, endx: -65, endy: -175 },
    { cp1x: 0, cp1y: -95, cp2x: -25, cp2y: -155, endx: -25, endy: -195 },
    { cp1x: 12, cp1y: -45, cp2x: 55, cp2y: -65, endx: 115, endy: -75 },
    { cp1x: 10, cp1y: -60, cp2x: 65, cp2y: -95, endx: 95, endy: -135 },
    { cp1x: 5, cp1y: -80, cp2x: 45, cp2y: -125, endx: 65, endy: -175 },
    { cp1x: 0, cp1y: -95, cp2x: 25, cp2y: -155, endx: 25, endy: -195 }
  ];

  branches.forEach((b) => {
    g.beginPath();
    g.moveTo(b.cp1x, b.cp1y);
    g.bezierCurveTo(b.cp2x, b.cp2y, b.endx, b.endy, b.endx, b.endy);
    g.lineWidth = 3.5;
    g.stroke();

    g.beginPath();
    g.arc(b.endx, b.endy, 6.5, 0, Math.PI * 2);
    g.fill();

    for (let i = 0; i < 3; i++) {
      const ang = (i / 3) * Math.PI - Math.PI / 2;
      g.beginPath();
      g.arc(b.endx + Math.cos(ang) * 14, b.endy + Math.sin(ang) * 14, 4.2, 0, Math.PI * 2);
      g.fill();
    }
  });

  // Stardust foliage spray in canopy
  for (let a = 0; a < 36; a++) {
    const angle = (a / 36) * Math.PI * 1.8 + Math.PI * 0.1;
    const r = 85 + (a % 5) * 26;
    const lx = Math.cos(angle) * r;
    const ly = -105 - Math.sin(angle) * (r * 0.75);
    g.beginPath();
    g.arc(lx, ly, a % 3 === 0 ? 3.5 : 2.2, 0, Math.PI * 2);
    g.fill();
  }

  // 3. Intertwined Root System
  const roots = [
    { x1: -12, y1: 45, x2: -45, y2: 65, x3: -85, y3: 85 },
    { x1: -8, y1: 45, x2: -35, y2: 85, x3: -55, y3: 115 },
    { x1: 0, y1: 45, x2: -15, y2: 95, x3: 0, y3: 125 },
    { x1: 8, y1: 45, x2: 35, y2: 85, x3: 55, y3: 115 },
    { x1: 12, y1: 45, x2: 45, y2: 65, x3: 85, y3: 85 }
  ];

  roots.forEach((rt) => {
    g.beginPath();
    g.moveTo(rt.x1, rt.y1);
    g.bezierCurveTo(rt.x2, rt.y2, rt.x3, rt.y3, rt.x3, rt.y3);
    g.lineWidth = 3.0;
    g.stroke();

    g.beginPath();
    g.arc(rt.x3, rt.y3, 4.0, 0, Math.PI * 2);
    g.fill();
  });

  g.restore();
}

export function drawCover(g: CanvasRenderingContext2D) {
  // 1. Deep Antique Teal/Emerald Moroccan Leather Base (matching video_frame_06)
  const gr = g.createLinearGradient(0, 0, TW, TH);
  gr.addColorStop(0, '#061a12');
  gr.addColorStop(0.25, '#0b3224');
  gr.addColorStop(0.5, '#124835');
  gr.addColorStop(0.8, '#0b3224');
  gr.addColorStop(1, '#061a12');
  g.fillStyle = gr;
  g.fillRect(0, 0, TW, TH);

  // Micro-leather texture pores
  g.save();
  for (let i = 0; i < 3500; i++) {
    const px = Math.random() * TW;
    const py = Math.random() * TH;
    g.fillStyle = Math.random() > 0.5 ? 'rgba(255, 235, 175, 0.035)' : 'rgba(0, 15, 8, 0.18)';
    g.fillRect(px, py, 2, 2);
  }
  g.restore();

  // 2. 24k Gold Double Border with Ornamental Filigree
  g.save();
  g.strokeStyle = '#d4a559';
  g.lineWidth = 4;
  g.strokeRect(32, 32, TW - 64, TH - 64);

  g.strokeStyle = 'rgba(251, 227, 157, 0.75)';
  g.lineWidth = 1.5;
  g.strokeRect(40, 40, TW - 80, TH - 80);

  // Corner Arabesques
  const corners = [
    { x: 42, y: 42 },
    { x: TW - 42, y: 42 },
    { x: 42, y: TH - 42 },
    { x: TW - 42, y: TH - 42 }
  ];
  corners.forEach((c) => {
    g.strokeStyle = '#fbe39d';
    g.lineWidth = 2;
    g.beginPath();
    g.arc(c.x, c.y, 22, 0, Math.PI * 2);
    g.stroke();

    g.fillStyle = '#fbe39d';
    g.beginPath();
    g.arc(c.x, c.y, 4, 0, Math.PI * 2);
    g.fill();
  });
  g.restore();

  // 3. Top Epigraph Tagline
  g.font = '500 13px ' + SANS;
  g.fillStyle = '#fbe39d';
  drawTrackedText(g, 'AN ARCHIVE OF INTERACTIVE CRAFT', TW / 2, 88, 3.8, 'center');
  drawDiamondDivider(g, TW / 2, 108, 120);

  // 4. Main Title in 24k Gold Roman Serif Typography
  g.font = '700 46px ' + SERIF;
  g.fillStyle = '#ffffff';
  drawTrackedText(g, 'THE', TW / 2, 175, 6, 'center');

  g.font = '700 56px ' + SERIF;
  g.fillStyle = '#fbe39d';
  drawTrackedText(g, 'PORTFOLIO', TW / 2, 238, 7, 'center');

  g.font = '600 24px ' + SERIF;
  g.fillStyle = '#dcd3c3';
  drawTrackedText(g, 'OF SELECTED WORKS', TW / 2, 282, 5, 'center');

  // 5. Centerpiece 24k Gold Tree of Life (matching video_frame_06!)
  drawTreeOfLife(g, TW / 2, 550, 1.25);

  // 6. Subtitle & Volume Tag
  g.font = '600 15px ' + SANS;
  g.fillStyle = '#fbe39d';
  drawTrackedText(g, 'CREATIVE DEVELOPER • VOLUME I', TW / 2, TH - 145, 3.5, 'center');
  drawDiamondDivider(g, TW / 2, TH - 125, 95);

  // 7. Author Name at Bottom
  g.font = '700 32px ' + SERIF;
  g.fillStyle = '#ffffff';
  drawTrackedText(g, 'B I S H A L   S A H A', TW / 2, TH - 78, 6, 'center');
}

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="sr-only">
      <h1>{heroData.titleLines.map((l) => l.text).join(' ')}</h1>
      <p>{heroData.subtitleLines.join(' ')}</p>
      <p>{heroData.authorName}</p>
    </section>
  );
};
