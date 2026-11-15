// ============================================================================
// Library Bookshelf Wall Configuration & Seeded Random Utility
// ============================================================================

export interface ShelfConfig {
  rows: number;
  columns: number;
  totalWidth: number;
  totalHeight: number;
  depth: number;
  plankThickness: number;
  dividerThickness: number;
  rowSpacing: number;
  shelfZ: number;
  backZ: number;
  featuredBook: {
    row: number; // 0-indexed, 2 is middle row (eye level)
    section: number; // 0-indexed, 1 is middle section
    slotWidth: number;
    position: { x: number; y: number; z: number };
  };
  leatherPalette: {
    burgundy: number[];
    forestGreen: number[];
    navy: number[];
    brown: number[];
    vellum: number[];
    goldFoil: number;
  };
  seed: number;
}

export const SHELF_CONFIG: ShelfConfig = {
  rows: 5,
  columns: 3,
  totalWidth: 14.8,
  totalHeight: 9.4,
  depth: 1.35,
  plankThickness: 0.10,
  dividerThickness: 0.12,
  rowSpacing: 1.80,
  shelfZ: -2.05,
  backZ: -2.85,
  featuredBook: {
    row: 2, // Middle row (Y = 0.0)
    section: 1, // Center section (X = 0.0)
    slotWidth: 0.44, // Generous gap for clean hover & pull-out animation
    position: { x: 0.0, y: 0.0, z: -2.05 }
  },
  leatherPalette: {
    burgundy: [0x421018, 0x340b12, 0x4e141e, 0x2d080e],
    forestGreen: [0x0d2818, 0x143822, 0x091e12, 0x184228],
    navy: [0x0f1c2d, 0x15253b, 0x0b1420, 0x182c46],
    brown: [0x2c170c, 0x3a1f10, 0x1f1008, 0x442514, 0x24130a],
    vellum: [0xd2c4a5, 0xdfd5bc, 0xb8a987],
    goldFoil: 0xd4a559
  },
  seed: 1337
};

// Seeded Pseudo-Random Number Generator (Mulberry32)
// Guarantees deterministic, identical bookshelf layouts on every render
export function createSeededRandom(seed: number = SHELF_CONFIG.seed) {
  let s = seed >>> 0;
  return function next(): number {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface QualitySettings {
  isMobile: boolean;
  booksPerBay: number;
  enableDOF: boolean;
  enableDustMotes: boolean;
  candleLights: number;
}

export function getQualitySettings(isMobile: boolean): QualitySettings {
  return {
    isMobile,
    booksPerBay: isMobile ? 12 : 24,
    enableDOF: !isMobile,
    enableDustMotes: true,
    candleLights: isMobile ? 1 : 2
  };
}
