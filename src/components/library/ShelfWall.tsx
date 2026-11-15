'use client';

import React from 'react';
import { SHELF_CONFIG } from '@/lib/constants/shelfConfig';

export interface ShelfWallProps {
  walnutColor?: string;
  className?: string;
}

/**
 * <ShelfWall />
 * Declarative component for the tall 5-row x 3-section library wall.
 * In the Three.js scene, geometry is rendered via createShelfWall with dark walnut grain.
 */
export const ShelfWall: React.FC<ShelfWallProps> = ({
  walnutColor = '#241309',
  className = ''
}) => {
  return (
    <div
      className={`shelf-wall-spec ${className}`}
      data-rows={SHELF_CONFIG.rows}
      data-cols={SHELF_CONFIG.columns}
      data-walnut-color={walnutColor}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default ShelfWall;
