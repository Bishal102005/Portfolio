'use client';

import React from 'react';
import { LABEL } from '@/lib/constants/portfolioData';

interface BookHUDProps {
  currentSpread: number;
  onPrev: () => void;
  onNext: () => void;
  showHint: boolean;
}

export const BookHUD: React.FC<BookHUDProps> = ({
  currentSpread,
  onPrev,
  onNext,
  showHint
}) => {
  const isCover = currentSpread === 0;
  const isBackCover = currentSpread === 8;
  const pageLabel =
    LABEL[currentSpread] +
    (currentSpread > 0 && currentSpread < 8
      ? `, pages ${2 * currentSpread - 1} and ${2 * currentSpread}`
      : '');

  return (
    <>
      <p
        className="hint"
        id="hint"
        style={{ opacity: showHint ? 0.75 : 0 }}
      >
        Click a page, drag, or use the arrow keys to turn
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
