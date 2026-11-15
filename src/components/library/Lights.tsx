'use client';

import React from 'react';
import { LIBRARY_CONFIG } from '@/lib/constants/libraryRoomConfig';

export interface LightsProps {
  ambientIntensity?: number;
  heroSpotIntensity?: number;
}

/**
 * <Lights />
 * Master library lighting rig:
 * - Low-key dim warm ambient baseline
 * - Dedicated hero spotlight focused on the featured book
 * - Flickering banker lamps & shelf candles
 * - Hanging brass chandeliers
 */
export const Lights: React.FC<LightsProps> = ({
  ambientIntensity = LIBRARY_CONFIG.lighting.ambientIntensity,
  heroSpotIntensity = LIBRARY_CONFIG.lighting.heroSpotIntensity
}) => {
  return (
    <div
      className="library-lights-spec"
      data-ambient-intensity={ambientIntensity}
      data-hero-intensity={heroSpotIntensity}
      data-chandeliers={LIBRARY_CONFIG.lighting.chandeliers.length}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default Lights;
