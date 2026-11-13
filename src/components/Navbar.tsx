'use client';

import React from 'react';
import { paper, mx, T, HIT, INK, GOLD, SERIF, SANS, TH } from '@/lib/three/pageDrawers';
import { heroData } from './Hero';

export const navItems: [label: string, spreadIndex: number][] = [
  ['Cover', 0],
  ['Intro', 1],
  ['Work', 2],
  ['Skills', 5],
  ['Journey', 6]
];

export const tocEntries: [title: string, pageNum: number, spreadTarget: number][] = [
  ['Foreword', 1, 1],
  ['Aurora', 3, 2],
  ['Lumen', 5, 3],
  ['Fable', 7, 4],
  ['Skills and tools', 9, 5],
  ['Journey', 11, 6],
  ['Contact', 13, 7]
];

export function drawTOC(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Contents', m, 150, '700 54px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 175, 70, 3);

  HIT[f] = [];
  tocEntries.forEach((e, i) => {
    const y = 300 + i * 85;
    T(g, e[0], m, y, '500 29px ' + SERIF, INK);
    T(g, String(e[1]), m + 550, y, '20px ' + SANS, '#84688f', 'right');
    g.save();
    g.setLineDash([2, 7]);
    g.strokeStyle = '#e2d5e6';
    g.beginPath();
    g.moveTo(m + g.measureText(e[0]).width + 14, y);
    g.lineTo(m + 510, y);
    g.stroke();
    g.restore();
    HIT[f].push([y - 36, y + 26, e[2]]);
  });
  T(g, 'Tap a title to turn straight to it.', m, TH - 110, 'italic 18px ' + SERIF, '#84688f');
}

interface NavbarProps {
  currentSpread?: number;
  onNavigate?: (spreadIndex: number) => void;
  isFloating?: boolean;
  onReturnToShelf?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSpread = 0,
  onNavigate,
  onReturnToShelf
}) => {
  return (
    <header className="top">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="logo">{heroData.name}</div>
        {onReturnToShelf && (
          <button
            type="button"
            className="return-library-btn"
            onClick={onReturnToShelf}
            title="Put book back onto the bookshelf"
          >
            <span>↩ Put back on shelf</span>
          </button>
        )}
      </div>
      <nav id="nav" aria-label="Chapters">
        {navItems.map(([label, spreadIdx], i) => {
          const nextSpread = i === navItems.length - 1 ? 999 : navItems[i + 1][1];
          const isCurrent = currentSpread >= spreadIdx && currentSpread < nextSpread;
          return (
            <button
              key={label}
              type="button"
              aria-current={isCurrent ? 'true' : 'false'}
              onClick={() => onNavigate?.(spreadIdx)}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

