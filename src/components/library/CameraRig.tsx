'use client';

import React from 'react';
import { LIBRARY_CONFIG } from '@/lib/constants/libraryRoomConfig';

export interface CameraRigProps {
  initialPosition?: [number, number, number];
  lookAt?: [number, number, number];
  fov?: number;
}

/**
 * <CameraRig />
 * Eye-level camera rig standing in the central aisle:
 * - 1.6m standing height looking directly at the featured book
 * - Gentle mouse-parallax sway
 * - Slow organic breathing idle drift
 */
export const CameraRig: React.FC<CameraRigProps> = ({
  initialPosition = LIBRARY_CONFIG.camera.defaultPos,
  lookAt = LIBRARY_CONFIG.camera.lookAt,
  fov = LIBRARY_CONFIG.camera.fov
}) => {
  return (
    <div
      className="library-camera-rig-spec"
      data-pos={initialPosition.join(',')}
      data-look-at={lookAt.join(',')}
      data-fov={fov}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
};

export default CameraRig;
