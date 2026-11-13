'use client';

import React from 'react';
import { paper, mx, wrap, T, INK, SERIF, SANS } from '@/lib/three/pageDrawers';
import { Skill } from '@/lib/types/portfolio';

export const skillsList: Skill[] = [
  ['Interactive 3D and WebGL', 92],
  ['React and Next.js', 95],
  ['Shaders and creative coding', 85],
  ['Motion and interface design', 88],
  ['Node and APIs', 80],
  ['Performance and accessibility', 90]
];

export const toolsList: string[] = [
  'three.js',
  'React Three Fiber',
  'GLSL',
  'GSAP',
  'Framer Motion',
  'TypeScript',
  'Blender',
  'Figma',
  'Vercel',
  'Playwright',
  'Zustand',
  'Tailwind'
];

export function drawSkillsA(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Appendix A', m, 110, '600 17px ' + SANS, '#ff7a59');
  T(g, 'Skills', m, 185, '700 62px ' + SERIF, INK);
  skillsList.forEach((s, i) => {
    const y = 290 + i * 105;
    T(g, s[0], m, y, '500 24px ' + SERIF, INK);
    g.fillStyle = 'rgba(43, 10, 61, 0.08)';
    g.fillRect(m, y + 18, 550, 10);
    g.fillStyle = '#ff7a59';
    g.fillRect(m, y + 18, 5.5 * s[1], 10);
    T(g, s[1] + '%', m + 550, y, '15px ' + SANS, '#84688f', 'right');
  });
}

export function drawSkillsB(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Appendix B', m, 110, '600 17px ' + SANS, '#ff7a59');
  T(g, 'Toolbox', m, 185, '700 62px ' + SERIF, INK);
  let x = m;
  let y = 260;
  toolsList.forEach((s) => {
    g.font = '600 17px ' + SANS;
    const w = g.measureText(s).width + 32;
    if (x + w > m + 550) {
      x = m;
      y += 58;
    }
    g.fillStyle = 'rgba(255, 122, 89, 0.08)';
    g.beginPath();
    if (typeof (g as any).roundRect === 'function') {
      (g as any).roundRect(x, y, w, 40, 20);
    } else {
      g.rect(x, y, w, 40);
    }
    g.fill();
    g.strokeStyle = 'rgba(255, 122, 89, 0.22)';
    g.lineWidth = 1;
    g.stroke();
    T(g, s, x + 16, y + 26, '600 17px ' + SANS, '#26152e');
    x += w + 10;
  });
  T(g, 'Currently exploring', m, 600, '700 23px ' + SERIF, INK);
  g.font = '18px ' + SANS;
  g.fillStyle = '#3f274a';
  wrap(
    g,
    'WebGPU, procedural audio and ways to make 3D pages load faster than the text around them.',
    m,
    634,
    550,
    30
  );
  g.font = 'italic 26px ' + SERIF;
  g.fillStyle = '#5a3969';
  wrap(g, 'Good tools disappear. The work is what is left on the table.', m, 790, 500, 38);
}

export const Skills: React.FC = () => {
  return (
    <section id="skills">
      <h2>Skills & Technologies</h2>
      <ul>
        {skillsList.map(([name, level]) => (
          <li key={name}>
            {name}: {level}%
          </li>
        ))}
      </ul>
      <h3>Toolbox</h3>
      <p>{toolsList.join(', ')}</p>
    </section>
  );
};

