'use client';

import React from 'react';
import { paper, mx, wrap, T, INK, SERIF, SANS } from '@/lib/three/pageDrawers';
import { TimelineItem } from '@/lib/types/portfolio';

export const achievementsData: TimelineItem[] = [
  ['2024 to now', 'Senior Creative Developer', 'Studio Nova', 'Leading interactive work for brands, from launch microsites to 3D product tools.'],
  ['2022 to 2024', 'Front-end Engineer', 'Pixel & Co', 'Built design systems and shipped animation-heavy marketing sites.'],
  ['2020 to 2022', 'UI Developer', 'Freelance', 'Delivered sites and apps for start-ups across four countries.'],
  ['2016 to 2020', 'B.Tech, Computer Science', 'University', 'Graphics, human-computer interaction and a thesis on real-time rendering.']
];

export function drawAchievements(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  const isFirstHalf = f === 11;
  T(g, 'Appendix C', m, 110, '600 17px ' + SANS, '#ff7a59');
  T(g, isFirstHalf ? 'Journey' : 'Journey, continued', m, 185, '700 ' + (isFirstHalf ? 62 : 44) + 'px ' + SERIF, INK);

  g.strokeStyle = '#e2d5e6';
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(m + 8, 260);
  g.lineTo(m + 8, 800);
  g.stroke();

  achievementsData.slice(isFirstHalf ? 0 : 2, isFirstHalf ? 2 : 4).forEach((e, i) => {
    const y = 290 + i * 270;
    g.fillStyle = '#ff7a59';
    g.beginPath();
    g.arc(m + 8, y - 6, 9, 0, 7);
    g.fill();
    T(g, e[0], m + 40, y, '600 16px ' + SANS, '#ff7a59');
    T(g, e[1], m + 40, y + 40, '700 28px ' + SERIF, INK);
    T(g, e[2], m + 40, y + 72, 'italic 21px ' + SERIF, '#5a3969');
    g.font = '17px ' + SANS;
    g.fillStyle = '#3f274a';
    wrap(g, e[3], m + 40, y + 108, 500, 27);
  });
}

export const Achievements: React.FC = () => {
  return (
    <section id="achievements">
      <h2>Journey & Achievements</h2>
      {achievementsData.map(([period, title, company, desc], i) => (
        <article key={i}>
          <h3>{title} — {company}</h3>
          <p><em>{period}</em></p>
          <p>{desc}</p>
        </article>
      ))}
    </section>
  );
};

