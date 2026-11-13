'use client';

import React from 'react';
import { TW, TH, SERIF, SANS } from '@/lib/three/drawUtils';

export const footerData = {
  title: 'Fin.',
  quote: ['WHERE CODE BECOMES TACTILE & WEIGHTY.', 'AN ARCHIVE OF INTERACTIVE CRAFT.'],
  subtitle: 'Thank you for exploring',
  note: 'Turn back, or write to me at 12bishalsaha@email.com'
};

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
  g.arc(cx, cy, r, 0.28 * Math.PI, 1.82 * Math.PI);
  g.stroke();
  g.restore();
}

export function drawBackCover(g: CanvasRenderingContext2D) {
  // Midnight Obsidian & Atmospheric Charcoal
  const gr = g.createLinearGradient(0, 0, TW, TH);
  gr.addColorStop(0, '#06070a');
  gr.addColorStop(0.5, '#0a0b0e');
  gr.addColorStop(1, '#16110d');
  g.fillStyle = gr;
  g.fillRect(0, 0, TW, TH);

  // Subtle stippling
  for (let i = 0; i < 800; i++) {
    g.fillStyle = `rgba(235, 179, 102, ${Math.random() * 0.035})`;
    g.fillRect(Math.random() * TW, Math.random() * TH, 1.5, 1.5);
  }

  // Delicate filigree border
  g.strokeStyle = 'rgba(212, 159, 87, 0.35)';
  g.lineWidth = 1;
  g.strokeRect(50, 50, TW - 100, TH - 100);

  // Zen Enso circle at center
  drawEnso(g, TW / 2, 340, 28);

  // "Fin." Title
  g.font = '700 78px ' + SERIF;
  g.fillStyle = '#e5a958';
  g.textAlign = 'center';
  g.fillText(footerData.title, TW / 2, 455);

  drawDiamondDivider(g, TW / 2, 500, 100);

  // Subtitle
  g.font = 'italic 24px ' + SERIF;
  g.fillStyle = '#dfd2bc';
  g.fillText(footerData.subtitle, TW / 2, 560);

  // Turn back note
  g.font = '15px ' + SANS;
  g.fillStyle = '#c49b66';
  g.fillText(footerData.note, TW / 2, TH - 110);
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
