'use client';

import React from 'react';
import { paper, mx, wrap, T, HIT, INK, GOLD, SERIF, SANS, TH } from '@/lib/three/pageDrawers';
import { PortfolioLink } from '@/lib/types/portfolio';

export const contactData = {
  headline: 'The last chapter',
  callout: 'Let’s write the next one together.',
  description:
    'I take on a few projects each year: interactive sites, 3D product experiences and design-system work.',
  subDescription:
    'If you have a problem that a flat page cannot solve, tell me about it. I reply within two working days.',
  email: '12bishalsaha@email.com',
  links: [
    ['GitHub', 'https://github.com/Bishal102005', 'github.com/Bishal102005'],
    [
      'LinkedIn',
      'https://www.linkedin.com/in/bishal-saha-b37626255?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      'linkedin.com/in/bishal-saha'
    ],
    ['Résumé', 'https://example.com/resume.pdf', 'example.com/resume.pdf']
  ] as PortfolioLink[]
};

export function drawContactLeft(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, contactData.headline, m, 110, '600 17px ' + SANS, '#ff7a59');
  g.font = 'italic 700 52px ' + SERIF;
  g.fillStyle = INK;
  let y = wrap(g, contactData.callout, m, 200, 550, 66);
  g.font = '19px ' + SANS;
  g.fillStyle = '#3f274a';
  y = wrap(g, contactData.description, m, y + 30, 520, 32);
  wrap(g, contactData.subDescription, m, y + 20, 520, 32);
}

export function drawContactRight(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Contact', m, 150, '700 54px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 175, 70, 3);

  const R: [string, string, string][] = [
    ['Email', contactData.email, 'mailto:' + contactData.email],
    ...contactData.links.map((l) => [
      l[0],
      l[2] || l[1].replace(/^https?:\/\/(www\.)?/, '').split('?')[0],
      l[1]
    ] as [string, string, string])
  ];

  HIT[f] = [];
  R.forEach((r, i) => {
    const y = 290 + i * 130;
    T(g, r[0], m, y, '600 16px ' + SANS, '#ff7a59');
    T(g, r[1], m, y + 42, '500 31px ' + SERIF, INK);
    g.fillStyle = '#ff7a59';
    g.fillRect(m, y + 56, g.measureText(r[1]).width, 2);
    HIT[f].push([y - 30, y + 66, r[2]]);
  });
  T(g, 'Tap any line to open it.', m, TH - 110, 'italic 18px ' + SERIF, '#84688f');
}

export const Contact: React.FC = () => {
  return (
    <section id="contact">
      <h2>{contactData.headline}</h2>
      <p><strong>{contactData.callout}</strong></p>
      <p>{contactData.description}</p>
      <p>{contactData.subDescription}</p>
      <p>
        Email: <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
      </p>
      <ul>
        {contactData.links.map(([label, url]) => (
          <li key={label}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

