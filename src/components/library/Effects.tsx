'use client';

import React from 'react';

export interface EffectsProps {
  bloom?: boolean;
  depthOfField?: boolean;
  vignette?: boolean;
  filmGrain?: boolean;
  isMobile?: boolean;
}

/**
 * <Effects />
 * Cinematic post-processing specification:
 * - Bloom for lamp glints & magical spine glow
 * - Depth of field blurring distant library shelves
 * - 35mm anamorphic vignette
 * - Subtle film grain
 */
export const Effects: React.FC<EffectsProps> = ({
  bloom = true,
  depthOfField = true,
  vignette = true,
  filmGrain = true,
  isMobile = false
}) => {
  return (
    <div
      className="library-effects-spec"
      data-bloom={bloom}
      data-dof={!isMobile && depthOfField}
      data-vignette={vignette}
      data-grain={filmGrain}
      data-mobile={isMobile}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default Effects;
