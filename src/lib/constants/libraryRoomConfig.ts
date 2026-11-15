// ============================================================================
// Grand 3D Library Room Configuration
// Room dimensions: 12m wide, 20m long, 8.5m tall
// 2,000+ Instanced Books across 2 levels of gallery shelves
// ============================================================================

export interface LibraryRoomConfig {
  room: {
    width: number;
    length: number;
    height: number;
    floorY: number;
    ceilingY: number;
  };
  gallery: {
    height: number; // 3.85m above floor
    walkwayWidth: number; // 1.2m
    railingHeight: number; // 0.9m
    columnCount: number; // 6 columns per long side
  };
  stairs: {
    position: { x: number; y: number; z: number };
    radius: number;
    treads: number;
  };
  ladder: {
    railY: number;
    railX: number;
    ladderAngle: number;
  };
  books: {
    totalTarget: number;
    focalCount: number;
    sideWallCount: number;
    galleryCount: number;
    seed: number;
  };
  featuredBook: {
    wall: 'focal';
    row: number; // Eye-level row index
    slotWidth: number;
    position: { x: number; y: number; z: number };
  };
  furniture: {
    tables: { x: number; y: number; z: number }[];
    armchairs: { x: number; y: number; z: number; rotY: number }[];
  };
  lighting: {
    ambientColor: number;
    ambientIntensity: number;
    heroSpotColor: number;
    heroSpotIntensity: number;
    chandeliers: { x: number; y: number; z: number }[];
    fogColor: number;
    fogDensity: number;
  };
  camera: {
    defaultPos: [number, number, number];
    lookAt: [number, number, number];
    fov: number;
  };
}

export const LIBRARY_CONFIG: LibraryRoomConfig = {
  room: {
    width: 12.0,
    length: 20.0,
    height: 8.5,
    floorY: -4.6,
    ceilingY: 5.2
  },
  gallery: {
    height: 3.85,
    walkwayWidth: 1.25,
    railingHeight: 0.92,
    columnCount: 6
  },
  stairs: {
    position: { x: -4.8, y: -4.6, z: 2.5 },
    radius: 0.95,
    treads: 18
  },
  ladder: {
    railY: -2.2,
    railX: 5.2,
    ladderAngle: 0.18
  },
  books: {
    totalTarget: 2160,
    focalCount: 360,
    sideWallCount: 900,
    galleryCount: 900,
    seed: 1337
  },
  featuredBook: {
    wall: 'focal',
    row: 2,
    slotWidth: 0.44,
    position: { x: 0.0, y: 0.0, z: -2.05 }
  },
  furniture: {
    tables: [
      { x: -1.6, y: -4.6, z: 3.8 },
      { x: 1.6, y: -4.6, z: 7.2 }
    ],
    armchairs: [
      { x: -1.6, y: -4.6, z: 2.2, rotY: 0.25 },
      { x: 1.6, y: -4.6, z: 5.6, rotY: -0.32 }
    ]
  },
  lighting: {
    ambientColor: 0xffeed8,
    ambientIntensity: 0.58,
    heroSpotColor: 0xfff6e4,
    heroSpotIntensity: 2.2,
    chandeliers: [
      { x: 0, y: 3.4, z: -6.0 },
      { x: -3.2, y: 3.4, z: -9.0 },
      { x: 3.2, y: 3.4, z: -9.0 }
    ],
    fogColor: 0x3a2c1f,
    fogDensity: 0.010
  },
  camera: {
    defaultPos: [0, 0.16, 2.38],
    lookAt: [0, 0.04, -2.05],
    fov: 48
  }
};
