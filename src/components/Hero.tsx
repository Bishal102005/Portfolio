'use client';

import React from 'react';
import { TW, TH, SERIF, SANS } from '@/lib/three/pageDrawers';

export const heroData = {
  name: 'Bishal Saha',
  role: 'Creative Developer',
  subtitle: 'A 3D Portfolio',
  volume: 'Volume I',
  startNote: 'Open the cover to begin'
};

export function drawCover(g: CanvasRenderingContext2D) {
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

  // Volume tag
  g.font = 'italic 24px ' + SERIF;
  g.fillStyle = '#fed7aa';
  g.textAlign = 'center';
  g.fillText(heroData.volume, TW / 2, 230);

  // Embossed Solar Sunset Gold titles
  const parts = heroData.name.split(' ');
  g.font = '700 84px ' + SERIF;
  g.fillStyle = '#f59e0b';
  g.fillText(parts[0], TW / 2, 420);
  if (parts[1]) g.fillText(parts[1], TW / 2, 515);

  g.fillStyle = '#ff7a59';
  g.fillRect(TW / 2 - 60, 560, 120, 2);

  g.font = 'italic 28px ' + SERIF;
  g.fillStyle = '#fed7aa';
  g.fillText(heroData.role + ', ' + heroData.subtitle.toLowerCase(), TW / 2, 615);

  g.font = '16px ' + SANS;
  g.fillStyle = '#f59e0b';
  g.fillText(heroData.startNote, TW / 2, TH - 120);
}

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="sr-only">
      <h1>{heroData.name}</h1>
      <p>{heroData.role}</p>
      <p>{heroData.volume}</p>
    </section>
  );
};

