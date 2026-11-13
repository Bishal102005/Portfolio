'use client';

import React from 'react';
import { ME, NAV } from '@/lib/constants/portfolioData';

interface BookHeaderProps {
  currentSpread: number;
  onNavigate: (spreadIndex: number) => void;
}

export const BookHeader: React.FC<BookHeaderProps> = ({ currentSpread, onNavigate }) => {
  return (
    <header className="top">
      <div className="logo">{ME.name}</div>
      <nav id="nav" aria-label="Chapters">
        {NAV.map(([label, spreadIdx], i) => {
          const nextSpread = i === NAV.length - 1 ? 999 : NAV[i + 1][1];
          const isCurrent = currentSpread >= spreadIdx && currentSpread < nextSpread;
          return (
            <button
              key={label}
              type="button"
              aria-current={isCurrent ? 'true' : 'false'}
              onClick={() => onNavigate(spreadIdx)}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

