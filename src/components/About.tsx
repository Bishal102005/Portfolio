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
  T(g, aboutData.title, m, 150, '700 54px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 175, 70, 3);

  // Drop cap initial letter
  T(g, aboutData.intro[0][0], m, 330, '700 130px ' + SERIF, '#d96b34');
  g.font = 'italic 25px ' + SERIF;
  g.fillStyle = INK;
  let y = wrap(g, aboutData.intro[0].slice(1), m + 88, 250, 460, 38);

  g.font = '500 19px ' + SANS;
  g.fillStyle = '#180e1c';
  y = wrap(g, aboutData.intro[1], m, y > 360 ? y + 20 : 380, 550, 32) + 10;
  y = wrap(g, aboutData.instructions, m, y, 550, 32);

  T(g, aboutData.signature, m, y + 70, 'italic 700 46px ' + SERIF, '#3c184a');
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

