'use client';

import React from 'react';
import { LABEL } from '@/lib/constants/portfolioData';

interface BookHUDProps {
  currentSpread: number;
  currentSide?: number;
  isPortrait?: boolean;
  onPrev: () => void;
  onNext: () => void;
  showHint: boolean;
}

const PAGE_TITLES: Record<number, string> = {
  1: 'Foreword',
  2: 'Contents',
  3: 'Aurora · Overview',
  4: 'Aurora · Details',
  5: 'Lumen · Overview',
  6: 'Lumen · Details',
  7: 'Fable · Overview',
  8: 'Fable · Details',
  9: 'Skills · Expertise',
  10: 'Tools & Stack',
  11: 'Journey · Timeline',
  12: 'Journey · Bio',
  13: 'Contact & Links',
  14: 'Colophon'
};

export const BookHUD: React.FC<BookHUDProps> = ({
  currentSpread,
  currentSide = 0,
  isPortrait = false,
  onPrev,
  onNext,
  showHint
}) => {
  const isCover = currentSpread === 0;
  const isBackCover = currentSpread === 8;

  let pageLabel: string;
  if (isPortrait) {
    if (isCover) {
      pageLabel = 'Cover · The Portfolio';
    } else if (isBackCover) {
      pageLabel = 'Back cover';
    } else {
      const pageNum = currentSide === 1 ? 2 * currentSpread : 2 * currentSpread - 1;
      const title = PAGE_TITLES[pageNum] || LABEL[currentSpread];
      pageLabel = `${title} (${pageNum}/14)`;
    }
  } else {
    pageLabel =
      LABEL[currentSpread] +
      (currentSpread > 0 && currentSpread < 8
        ? `, pages ${2 * currentSpread - 1} and ${2 * currentSpread}`
        : '');
  }

  return (
    <>
      <p
        className="hint"
        id="hint"
        style={{ opacity: showHint ? 0.8 : 0 }}
      >
        <span className="hint-desktop">Click a page, drag, or use the arrow keys to turn</span>
        <span className="hint-mobile">Swipe or tap edges to turn pages</span>
      </p>

      <div className="hud">
        <button
          id="prev"
          type="button"
          aria-label="Previous page"
          disabled={isCover}
          onClick={onPrev}
        >
          &larr;
        </button>
        <span id="ind" aria-live="polite">
          {pageLabel}
        </span>
        <button
          id="next"
          type="button"
          aria-label="Next page"
          disabled={isBackCover}
          onClick={onNext}
        >
          &rarr;
        </button>
      </div>
    </>
  );
};

