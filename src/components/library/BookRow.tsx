'use client';

import React from 'react';

export interface BookRowProps {
  rowIndex: number;
  isFeaturedRow?: boolean;
  bookCount?: number;
}

/**
 * <BookRow />
 * Represents one horizontal shelf row tier.
 */
export const BookRow: React.FC<BookRowProps> = ({
  rowIndex,
  isFeaturedRow = false,
  bookCount = 65
}) => {
  return (
    <div
      className="book-row-tier"
      data-row-index={rowIndex}
      data-featured={isFeaturedRow}
      data-book-count={bookCount}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default BookRow;
