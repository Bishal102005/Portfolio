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

export function drawForeword(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, aboutData.title, m, 145, '700 58px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 172, 70, 3.5);

  // Drop cap initial letter
  T(g, aboutData.intro[0][0], m, 320, '700 135px ' + SERIF, '#c85a20');
  g.font = 'italic 600 26px ' + SERIF;
  g.fillStyle = INK;
  let y = wrap(g, aboutData.intro[0].slice(1), m + 92, 240, 455, 40);

  g.font = '500 22px ' + SANS;
  g.fillStyle = '#0e0712';
  y = wrap(g, aboutData.intro[1], m, y > 350 ? y + 25 : 375, 550, 36) + 16;
  y = wrap(g, aboutData.instructions, m, y, 550, 36);

  T(g, aboutData.signature, m, y + 65, 'italic 700 48px ' + SERIF, '#2d1138');
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

