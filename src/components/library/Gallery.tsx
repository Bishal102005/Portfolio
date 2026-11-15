'use client';

import React from 'react';
import { LIBRARY_CONFIG } from '@/lib/constants/libraryRoomConfig';

export interface GalleryProps {
  height?: number;
  walkwayWidth?: number;
}

/**
 * <Gallery />
 * Second-level gallery balcony with turned balustrade, Corinthian support columns,
 * and corner spiral staircase.
 */
export const Gallery: React.FC<GalleryProps> = ({
  height = LIBRARY_CONFIG.gallery.height,
  walkwayWidth = LIBRARY_CONFIG.gallery.walkwayWidth
}) => {
  return (
    <div
      className="library-gallery-spec"
      data-gallery-height={height}
      data-walkway-width={walkwayWidth}
      data-columns={LIBRARY_CONFIG.gallery.columnCount}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default Gallery;
