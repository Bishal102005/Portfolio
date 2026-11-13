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
  T(g, 'Contents', m, 145, '700 58px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 172, 70, 3.5);

  HIT[f] = [];
  tocEntries.forEach((e, i) => {
    const y = 295 + i * 86;
    T(g, e[0], m, y, '700 32px ' + SERIF, INK);
    T(g, String(e[1]), m + 550, y, '700 24px ' + SANS, '#1e0e24', 'right');
    g.save();
    g.setLineDash([2, 5]);
    g.strokeStyle = '#8c7296';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(m + g.measureText(e[0]).width + 16, y - 4);
    g.lineTo(m + 510, y - 4);
    g.stroke();
    g.restore();
    HIT[f].push([y - 36, y + 26, e[2]]);
  });
  T(g, 'Tap a title to turn straight to it.', m, TH - 105, 'italic 600 20px ' + SERIF, '#2e1836');
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

