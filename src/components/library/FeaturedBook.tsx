'use client';

import React from 'react';
import { LIBRARY_CONFIG } from '@/lib/constants/libraryRoomConfig';

export interface FeaturedBookProps {
  onPull?: () => void;
  isHovered?: boolean;
}

/**
 * <FeaturedBook />
 * The featured portfolio book slotted inside the eye-level shelf row.
 * Connected to BookEngine for raycasting, hover nudge, and cinematic pull-out.
 */
export const FeaturedBook: React.FC<FeaturedBookProps> = ({
  onPull,
  isHovered = false
}) => {
  return (
    <div
      className="featured-book-spec"
      data-row={LIBRARY_CONFIG.featuredBook.row}
      data-hovered={isHovered}
      onClick={onPull}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default FeaturedBook;
