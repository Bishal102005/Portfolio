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
    { text: 'PORTFOLIO', color: '#e5a958', size: 60, weight: '700' }, // Glowing Warm Gold
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

export function drawCover(g: CanvasRenderingContext2D) {
  // 1. Draw double-exposure background image or rich obsidian dusk fallback
  if (cachedCoverImg && cachedCoverImg.complete && cachedCoverImg.naturalWidth > 0) {
    g.drawImage(cachedCoverImg, 0, 0, TW, TH);
  } else {
    // Rich midnight charcoal atmospheric gradient
    const gr = g.createLinearGradient(0, 0, TW, TH);
    gr.addColorStop(0, '#06070a');
    gr.addColorStop(0.5, '#0a0b0e');
    gr.addColorStop(1, '#16110d');
    g.fillStyle = gr;
    g.fillRect(0, 0, TW, TH);
  }

  // 2. Left-side typographic atmosphere vignette for pristine contrast
  const vig = g.createLinearGradient(0, 0, TW * 0.68, 0);
  vig.addColorStop(0, 'rgba(5, 5, 8, 0.94)');
  vig.addColorStop(0.45, 'rgba(5, 5, 8, 0.72)');
  vig.addColorStop(0.75, 'rgba(5, 5, 8, 0.3)');
  vig.addColorStop(1, 'rgba(5, 5, 8, 0)');
  g.fillStyle = vig;
  g.fillRect(0, 0, TW * 0.68, TH);

  // Top header vignette
  const topVig = g.createLinearGradient(0, 0, 0, 160);
  topVig.addColorStop(0, 'rgba(5, 5, 8, 0.88)');
  topVig.addColorStop(1, 'rgba(5, 5, 8, 0)');
  g.fillStyle = topVig;
  g.fillRect(0, 0, TW, 160);

  // Bottom footer vignette
  const botVig = g.createLinearGradient(0, TH - 140, 0, TH);
  botVig.addColorStop(0, 'rgba(5, 5, 8, 0)');
  botVig.addColorStop(1, 'rgba(5, 5, 8, 0.92)');
  g.fillStyle = botVig;
  g.fillRect(0, TH - 140, TW, 140);

  // 3. Top Epigraph Tagline
  g.font = '400 12.5px ' + SANS;
  g.fillStyle = '#dfd2bc';
  drawTrackedText(g, heroData.topQuote[0], TW / 2, 54, 3.5, 'center');
  drawTrackedText(g, heroData.topQuote[1], TW / 2, 74, 3.5, 'center');
  drawDiamondDivider(g, TW / 2, 94, 90);

  // 4. Main Stacked Title
  const leftX = 88;
  let curY = 195;
  for (const item of heroData.titleLines) {
    g.font = `${item.weight} ${item.size}px ${SERIF}`;
    g.fillStyle = item.color;
    g.textAlign = 'left';
    g.fillText(item.text, leftX, curY);
    curY += item.size + 14;
  }

  // 5. Zen Enso Circle
  drawEnso(g, leftX + 22, curY + 22, 17);

  // 6. Subtitle Box
  const subY = curY + 68;
  const ruleW = 138;
  g.save();
  g.strokeStyle = 'rgba(220, 167, 93, 0.55)';
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(leftX, subY);
  g.lineTo(leftX + ruleW, subY);
  g.stroke();

  g.font = '600 13px ' + SANS;
  g.fillStyle = '#dfd2bc';
  let tY = subY + 24;
  for (const line of heroData.subtitleLines) {
    drawTrackedText(g, line, leftX, tY, 2.8, 'left');
    tY += 21;
  }

  g.beginPath();
  g.moveTo(leftX, tY + 4);
  g.lineTo(leftX + ruleW, tY + 4);
  g.stroke();
  g.restore();

  // 7. Author Name at Bottom
  g.font = '500 27px ' + SERIF;
  g.fillStyle = '#ffffff';
  drawTrackedText(g, heroData.authorName, TW / 2, TH - 82, 5, 'center');
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
