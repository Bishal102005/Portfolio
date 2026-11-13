'use client';

import React from 'react';
import { paper, mx, wrap, art, T, INK, SERIF, SANS } from '@/lib/three/pageDrawers';
import { Project } from '@/lib/types/portfolio';

export const projectsData: Project[] = [
  {
    t: 'Aurora',
    sub: 'Real-time analytics dashboard',
    yr: 2025,
    role: 'Lead front-end engineer',
    c: ['#180826', '#ff7a59'],
    ch: 'Teams drowned in forty disconnected reports and waited seconds for every chart.',
    ap: 'I rebuilt the data layer around streaming aggregates and drew every chart on one shared canvas scene.',
    out: 'Dashboards now render in under a second, and teams answer their own questions.',
    stack: ['React', 'D3', 'WebSockets', 'Rust'],
    m: [['−62%', 'load time'], ['3.1M', 'events a day']],
    q: '“It finally feels like the data is on our side.”'
  },
  {
    t: 'Lumen',
    sub: 'Immersive 3D product configurator',
    yr: 2024,
    role: 'Creative developer',
    c: ['#290d16', '#ff4757'],
    ch: 'Shoppers could not picture a custom lamp from flat photos, so returns stayed high.',
    ap: 'A WebGL configurator with baked lighting, compressed models and a UI that never hides the product.',
    out: 'Conversion rose, returns fell, and the scene loads in under three seconds on mid-range phones.',
    stack: ['three.js', 'R3F', 'GLSL', 'Next.js'],
    m: [['+34%', 'conversion'], ['2.8s', 'mobile load']],
    q: '“The first configurator our customers actually finish.”'
  },
  {
    t: 'Fable',
    sub: 'Bedtime story app for children',
    yr: 2023,
    role: 'Product engineer and motion designer',
    c: ['#241202', '#f59e0b'],
    ch: 'Parents wanted calm screens that children could use without reading.',
    ap: 'A gesture-first interface with soft motion, offline narration and a separate parent mode.',
    out: 'Rated 4.8 stars, with children reaching story time in two taps.',
    stack: ['React Native', 'Reanimated', 'Lottie', 'Firebase'],
    m: [['4.8', 'store rating'], ['120k', 'downloads']],
    q: '“My daughter asks for it by name.”'
  }
];

export function drawProjectVisual(g: CanvasRenderingContext2D, f: number) {
  const k = Math.floor((f - 3) / 2);
  const p = projectsData[k];
  const m = mx(f);
  paper(g, f);
  art(g, k, p, m, 110, 550, 650);
  T(g, 'Figure ' + (k + 1) + '. ' + p.t + ', ' + p.sub.toLowerCase(), m, 805, 'italic 600 20px ' + SERIF, '#3c234a');
  g.font = 'italic 24px ' + SERIF;
  g.fillStyle = INK;
  wrap(g, p.q, m, 860, 550, 34);
}

export function drawProjectStory(g: CanvasRenderingContext2D, f: number) {
  const k = Math.floor((f - 4) / 2);
  const p = projectsData[k];
  const m = mx(f);
  paper(g, f);
  T(g, 'Chapter ' + ['one', 'two', 'three'][k], m, 110, '700 17px ' + SANS, '#d96b34');
  T(g, p.t, m, 185, '700 72px ' + SERIF, INK);
  T(g, p.sub, m, 228, 'italic 600 25px ' + SERIF, '#3c234a');
  T(g, p.role + ', ' + p.yr, m, 264, '600 16px ' + SANS, '#4c3358');
  let y = 330;
  [
    ['The challenge', p.ch],
    ['The approach', p.ap],
    ['The outcome', p.out]
  ].forEach(([h, t]) => {
    T(g, h, m, y, '700 23px ' + SERIF, INK);
    g.font = '500 18px ' + SANS;
    g.fillStyle = '#180e1c';
    y = wrap(g, t, m, y + 32, 550, 28) + 24;
  });
  let x = m;
  y += 6;
  p.stack.forEach((s) => {
    g.font = '600 14px ' + SANS;
    const w = g.measureText(s).width + 26;
    g.fillStyle = 'rgba(255, 122, 89, 0.08)';
    g.beginPath();
    if (typeof (g as any).roundRect === 'function') {
      (g as any).roundRect(x, y, w, 32, 16);
    } else {
      g.rect(x, y, w, 32);
    }
    g.fill();
    g.strokeStyle = 'rgba(255, 122, 89, 0.22)';
    g.lineWidth = 1;
    g.stroke();
    T(g, s, x + 13, y + 21, '600 14px ' + SANS, '#7c2d12');
    x += w + 8;
  });
  p.m.forEach((q, i) => {
    const bx = m + i * 280;
    T(g, q[0], bx, y + 170, '700 60px ' + SERIF, '#ff7a59');
    T(g, q[1], bx, y + 202, '16px ' + SANS, '#84688f');
  });
}

export const Projects: React.FC = () => {
  return (
    <section id="projects">
      <h2>Selected Work</h2>
      {projectsData.map((p) => (
        <article key={p.t}>
          <h3>
            {p.t}: {p.sub} ({p.yr})
          </h3>
          <p><strong>Role:</strong> {p.role}</p>
          <p><strong>Challenge:</strong> {p.ch}</p>
          <p><strong>Approach:</strong> {p.ap}</p>
          <p><strong>Outcome:</strong> {p.out}</p>
          <p><strong>Stack:</strong> {p.stack.join(', ')}</p>
        </article>
      ))}
    </section>
  );
};

