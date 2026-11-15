'use client';

import React from 'react';
import { ShelfWall } from './ShelfWall';
import { Gallery } from './Gallery';
import { Furniture } from './Furniture';
import { Windows } from './Windows';
import { InstancedBooks } from './InstancedBooks';
import { FeaturedBook } from './FeaturedBook';
import { Lights } from './Lights';
import { Effects } from './Effects';
import { CameraRig } from './CameraRig';

export interface LibraryRoomProps {
  isMobile?: boolean;
}

/**
 * <LibraryRoom />
 * Master declarative representation of the 12m x 20m x 8.5m Grand Library interior.
 */
export const LibraryRoom: React.FC<LibraryRoomProps> = ({ isMobile = false }) => {
  return (
    <div className="library-room-container" aria-hidden="true" style={{ display: 'none' }}>
      <CameraRig />
      <Lights />
      <Windows />
      <Gallery />
      <ShelfWall />
      <InstancedBooks isMobile={isMobile} />
      <FeaturedBook />
      <Furniture />
      <Effects isMobile={isMobile} />
    </div>
  );
};

export default LibraryRoom;
