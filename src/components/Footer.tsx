'use client';

import React from 'react';
import { TW, TH, SERIF, SANS } from '@/lib/three/pageDrawers';

export const footerData = {
  title: 'Fin.',
  subtitle: 'Thank you for reading',
  note: 'Turn back, or write to me'
};

export function drawBackCover(g: CanvasRenderingContext2D) {
  // Deep Blackberry Wine & Midnight Plum Obsidian gradient
  const gr = g.createLinearGradient(0, 0, TW, TH);
  gr.addColorStop(0, '#2b0a3d');
  gr.addColorStop(0.5, '#200630');
  gr.addColorStop(1, '#13031f');
  g.fillStyle = gr;
  g.fillRect(0, 0, TW, TH);

  // Solar starlight micro-stippling
  for (let i = 0; i < 1500; i++) {
    g.fillStyle = `rgba(255, 200, 150, ${Math.random() * 0.04})`;
    g.fillRect(Math.random() * TW, Math.random() * TH, 2, 2);
  }

  // Solar Sunset Coral & Gold Filigree border
  g.strokeStyle = '#ff7a59';
  g.lineWidth = 3;
  g.strokeRect(44, 44, TW - 88, TH - 88);

  g.strokeStyle = 'rgba(245, 158, 11, 0.65)';
  g.lineWidth = 1;
  g.strokeRect(58, 58, TW - 116, TH - 116);

  // Embossed Solar Sunset Gold title
  g.font = '700 84px ' + SERIF;
  g.fillStyle = '#f59e0b';
  g.textAlign = 'center';
  g.fillText(footerData.title, TW / 2, 420);

  g.fillStyle = '#ff7a59';
  g.fillRect(TW / 2 - 60, 560, 120, 2);

  g.font = 'italic 28px ' + SERIF;
  g.fillStyle = '#fed7aa';
  g.fillText(footerData.subtitle, TW / 2, 615);

  g.font = '16px ' + SANS;
  g.fillStyle = '#f59e0b';
  g.fillText(footerData.note, TW / 2, TH - 120);
}

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="sr-only">
      <p>{footerData.title}</p>
      <p>{footerData.subtitle}</p>
      <p>{footerData.note}</p>
    </footer>
  );
};

