'use client';

import React from 'react';
import { LIBRARY_CONFIG } from '@/lib/constants/libraryRoomConfig';

export interface FurnitureProps {
  includeLadder?: boolean;
  tableCount?: number;
}

/**
 * <Furniture />
 * Central aisle furnishings: rolling library ladder on brass rail, heavy oak reading tables,
 * green glass banker's lamps, and oxblood leather Chesterfield armchairs.
 */
export const Furniture: React.FC<FurnitureProps> = ({
  includeLadder = true,
  tableCount = LIBRARY_CONFIG.furniture.tables.length
}) => {
  return (
    <div
      className="library-furniture-spec"
      data-ladder={includeLadder}
      data-tables={tableCount}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default Furniture;
