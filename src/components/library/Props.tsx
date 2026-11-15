'use client';

import React from 'react';

export interface PropsComponentProps {
  includeCandles?: boolean;
  includeGlobe?: boolean;
  includePlant?: boolean;
  includeScrolls?: boolean;
}

/**
 * <Props />
 * Declarative component for vintage library shelf props:
 * - Brass celestial armillary globe
 * - Flickering wax candles with point lights
 * - Stack of flat horizontal leather folio books
 * - Small plant urn with trailing ivy
 * - Rolled parchment scrolls
 */
export const Props: React.FC<PropsComponentProps> = ({
  includeCandles = true,
  includeGlobe = true,
  includePlant = true,
  includeScrolls = true
}) => {
  return (
    <div
      className="shelf-props-spec"
      data-candles={includeCandles}
      data-globe={includeGlobe}
      data-plant={includePlant}
      data-scrolls={includeScrolls}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default Props;
