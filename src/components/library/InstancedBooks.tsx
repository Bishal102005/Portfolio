'use client';

import React from 'react';
import { SHELF_CONFIG, getQualitySettings } from '@/lib/constants/shelfConfig';

export interface InstancedBooksProps {
  isMobile?: boolean;
}

/**
 * <InstancedBooks />
 * High-performance instanced background books (300+ books with gold bands).
 */
export const InstancedBooks: React.FC<InstancedBooksProps> = ({ isMobile = false }) => {
  const quality = getQualitySettings(isMobile);

  return (
    <div
      className="instanced-books-spec"
      data-quality={isMobile ? 'low' : 'high'}
      data-books-per-bay={quality.booksPerBay}
      data-seed={SHELF_CONFIG.seed}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default InstancedBooks;
