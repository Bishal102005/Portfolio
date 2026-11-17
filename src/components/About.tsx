'use client';

import React from 'react';
import { paper, mx, wrap, T, INK, GOLD, SERIF, SANS } from '@/lib/three/pageDrawers';
import { heroData } from './Hero';

export const aboutData = {
  title: 'Foreword',
  intro: [
    'I build interfaces that feel like objects: weighty, tactile and quietly surprising.',
    'Every project in this book is a chapter. Each began as a problem someone could not solve with a flat page, and ended as something people could handle.'
  ],
  instructions: 'Read it front to back, or use the contents on the facing page to jump to a chapter.',
  signature: heroData.name.split(' ')[0]
};

let cachedAuthorImg: HTMLImageElement | null = null;
let isAuthorLoading = false;
let registeredPage1: { tex: any; canvas: HTMLCanvasElement } | null = null;

export function registerForewordTexture(tex: any, canvas: HTMLCanvasElement): void {
  registeredPage1 = { tex, canvas };
  if (cachedAuthorImg && cachedAuthorImg.complete && cachedAuthorImg.naturalWidth > 0) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawForeword(ctx, 1);
      tex.needsUpdate = true;
    }
  }
}

function drawImageAspectFill(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  verticalFocus = 0.10
): void {
  const targetRatio = w / h;
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
    sy = Math.max(0, (img.height - sHeight) * verticalFocus);
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}

export function preloadAuthorImage(): Promise<HTMLImageElement | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (cachedAuthorImg && cachedAuthorImg.complete && cachedAuthorImg.naturalWidth > 0) {
    return Promise.resolve(cachedAuthorImg);
  }
  if (isAuthorLoading) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (cachedAuthorImg && cachedAuthorImg.complete) {
          clearInterval(interval);
          resolve(cachedAuthorImg);
        }
      }, 50);
    });
  }

  isAuthorLoading = true;
  const candidates = [
    '/author.png',
    '/author.jpg',
    '/author.jpeg',
    '/author.webp',
    '/profile.png',
    '/profile.jpg',
    '/profile.jpeg',
    '/profile.webp',
    '/foreword.png',
    '/foreword.jpg',
    '/about.png',
    '/about.jpg',
    '/bishal.png',
    '/bishal.jpg',
    '/avatar.png',
    '/avatar.jpg'
  ];

  return new Promise((resolve) => {
    let idx = 0;
    const tryNext = () => {
      if (idx >= candidates.length) {
        isAuthorLoading = false;
        resolve(null);
        return;
      }
      const src = candidates[idx++];
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        cachedAuthorImg = img;
        isAuthorLoading = false;
        if (registeredPage1 && registeredPage1.canvas && registeredPage1.tex) {
          const ctx = registeredPage1.canvas.getContext('2d');
          if (ctx) {
            drawForeword(ctx, 1);
            registeredPage1.tex.needsUpdate = true;
          }
        }
        resolve(img);
      };
      img.onerror = () => {
        tryNext();
      };
      img.src = src;
    };
    tryNext();
  });
}

export function drawForeword(g: CanvasRenderingContext2D, f: number): void {
  paper(g, f);
  const m = mx(f);

  // 1. Header Title
  T(g, aboutData.title, m, 125, '700 52px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 146, 68, 3.5);

  // 2. Drop Cap and Lead Quote
  T(g, aboutData.intro[0][0], m, 260, '700 115px ' + SERIF, '#c85a20');
  g.font = 'italic 500 23px ' + SERIF;
  g.fillStyle = INK;
  wrap(g, aboutData.intro[0].slice(1), m + 82, 198, 480, 33);

  // 3. Body Paragraphs (compact, elegant, high legibility, ends well above card)
  g.font = '400 17.5px ' + SANS;
  g.fillStyle = '#1c1220';
  const y = wrap(g, aboutData.intro[1], m, 296, 560, 27) + 12;

  g.font = 'italic 400 16.5px ' + SERIF;
  g.fillStyle = '#4c3546';
  wrap(g, aboutData.instructions, m, y, 560, 25);

  // =========================================================================
  // Lower Editorial Section: Author Portrait & Credentials (Clear Separation)
  // =========================================================================
  const cardX = 345;
  const cardY = 480;
  const cardW = 285;
  const cardH = 375;

  // Left Column: Signature
  T(g, aboutData.signature, m, 550, 'italic 700 52px ' + SERIF, '#2d1138');

  // Right Column: Author Photo Card
  g.save();

  if (cachedAuthorImg && cachedAuthorImg.complete && cachedAuthorImg.naturalWidth > 0) {
    // Archival Paper Mount Card with Warm Shadow
    g.shadowColor = 'rgba(30, 15, 5, 0.16)';
    g.shadowBlur = 18;
    g.shadowOffsetY = 8;
    g.fillStyle = '#fbf7ee';
    g.beginPath();
    g.roundRect(cardX, cardY, cardW, cardH, 8);
    g.fill();

    // Reset shadow
    g.shadowColor = 'transparent';
    g.shadowBlur = 0;
    g.shadowOffsetY = 0;

    // Elegant gold hairline frame
    g.strokeStyle = 'rgba(200, 90, 32, 0.38)';
    g.lineWidth = 1.2;
    g.stroke();

    // Inner Photo with clean aspect-fill and clip
    const photoPadding = 12;
    const photoX = cardX + photoPadding;
    const photoY = cardY + photoPadding;
    const photoW = cardW - photoPadding * 2;
    const photoH = cardH - photoPadding * 2 - 32;

    g.save();
    g.beginPath();
    g.roundRect(photoX, photoY, photoW, photoH, 5);
    g.clip();

    drawImageAspectFill(g, cachedAuthorImg, photoX, photoY, photoW, photoH, 0.10);
    g.restore();

    // Inner Photo Border
    g.strokeStyle = 'rgba(20, 10, 5, 0.15)';
    g.lineWidth = 1;
    g.beginPath();
    g.roundRect(photoX, photoY, photoW, photoH, 5);
    g.stroke();

    // Bottom Card Caption
    T(g, 'BISHAL SAHA  •  AUTHOR', cardX + cardW / 2, cardY + cardH - 15, '700 10px ' + SANS, '#8a6240', 'center');
  } else {
    // Placeholder Archival Card awaiting user's picture
    g.fillStyle = 'rgba(255, 255, 255, 0.35)';
    g.beginPath();
    g.roundRect(cardX, cardY, cardW, cardH, 8);
    g.fill();

    g.strokeStyle = 'rgba(200, 90, 32, 0.32)';
    g.lineWidth = 1.5;
    g.setLineDash([5, 5]);
    g.stroke();
    g.setLineDash([]);

    // Icon & Invitation text
    T(g, '✦', cardX + cardW / 2, cardY + 130, '700 28px ' + SERIF, GOLD, 'center');
    T(g, 'AUTHOR PORTRAIT', cardX + cardW / 2, cardY + 180, '700 14px ' + SANS, INK, 'center');
    T(g, 'Add your picture:', cardX + cardW / 2, cardY + 215, '500 12px ' + SANS, '#6b4f3b', 'center');
    T(g, 'public/author.png', cardX + cardW / 2, cardY + 238, '600 12px ' + SANS, GOLD, 'center');
  }

  g.restore();
}

export const About: React.FC = () => {
  return (
    <section id="about">
      <h2>{aboutData.title}</h2>
      {aboutData.intro.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
      <p>{aboutData.instructions}</p>
      <p>— {aboutData.signature}</p>
    </section>
  );
};
