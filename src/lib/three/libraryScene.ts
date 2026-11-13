import * as THREE from 'three';

export function createLibraryScene(): THREE.Group {
  const library = new THREE.Group();
  library.name = 'virtual-library';

  // Materials
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x2e180d, // Dark aged walnut / mahogany
    roughness: 0.75,
    metalness: 0.08
  });

  const shelfMat = new THREE.MeshStandardMaterial({
    color: 0x381f12, // Rich warm shelf wood
    roughness: 0.65,
    metalness: 0.05
  });

  const backboardMat = new THREE.MeshStandardMaterial({
    color: 0x180b06, // Deep shadowy backboard
    roughness: 0.9,
    metalness: 0.02
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x1c0e07, // Dark polished parquet floor
    roughness: 0.55,
    metalness: 0.1
  });

  // 1. Back Wall / Bookcase Backing
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 12),
    backboardMat
  );
  backWall.position.set(0, 0.4, -2.55);
  library.add(backWall);

  // 2. Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(16, 0.2, 8),
    floorMat
  );
  floor.position.set(0, -2.15, -0.6);
  library.add(floor);

  // 3. Shelves (Horizontal Boards)
  // Shelf depths: 1.05
  // The center shelf where Bishal's book sits is at y = -0.96 (base) and y = 1.15 (top)
  const shelfYPositions = [1.85, 1.15, -0.96, -1.8];
  shelfYPositions.forEach((y) => {
    const shelf = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.07, 1.05),
      shelfMat
    );
    shelf.position.set(0, y, -2.05);
    library.add(shelf);
  });

  // 4. Vertical Uprights / Columns
  const columnXPositions = [-4.6, -1.5, 1.5, 4.6];
  columnXPositions.forEach((x) => {
    const col = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 4.2, 1.12),
      woodMat
    );
    col.position.set(x, 0, -2.02);
    library.add(col);
  });

  // 5. Crown Molding / Top Header
  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(12.4, 0.22, 1.2),
    woodMat
  );
  crown.position.set(0, 2.15, -1.98);
  library.add(crown);

  // 6. Realistic 3D Books on the Shelves
  const bookColors = [
    0x54181f, // Deep vintage wine red
    0x1c3a27, // Antique hunter green
    0x172b43, // Midnight navy leather
    0x613418, // Warm cognac leather
    0x78562d, // Aged parchment ochre
    0x2c1d38, // Plum obsidian
    0x6e2819, // Terracotta morocco
    0x261d18  // Espresso buckram
  ];

  // Helper to create a row of books on a shelf between xStart and xEnd at shelfY
  function fillShelfWithBooks(
    shelfY: number,
    xStart: number,
    xEnd: number,
    skipCenter = false
  ) {
    let curX = xStart;
    while (curX < xEnd) {
      // If skipCenter is true, leave a generous open centerpiece slot (-0.85 to 0.85) for Bishal's book!
      if (skipCenter && curX > -0.85 && curX < 0.85) {
        curX = 0.85;
        continue;
      }

      const bookW = 0.055 + Math.random() * 0.075; // Thickness
      const bookH = 0.65 + Math.random() * 0.22;   // Height
      const bookD = 0.55 + Math.random() * 0.12;   // Depth
      const color = bookColors[Math.floor(Math.random() * bookColors.length)];

      const bookMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.65 + Math.random() * 0.2,
        metalness: 0.05
      });

      const bookGeo = new THREE.BoxGeometry(bookW, bookH, bookD);
      const book = new THREE.Mesh(bookGeo, bookMat);

      // Book position resting on shelf
      const bY = shelfY + 0.035 + bookH / 2;
      const bZ = -2.1 + Math.random() * 0.06;

      // Subtle tilt variation
      const isTilted = Math.random() < 0.12 && curX < xEnd - 0.25;
      const tiltZ = isTilted ? (Math.random() > 0.5 ? 0.09 : -0.09) : 0;

      book.position.set(curX + bookW / 2, bY, bZ);
      book.rotation.z = tiltZ;
      library.add(book);

      curX += bookW + 0.008;
    }
  }

  // Fill shelves with books:
  // Top shelf (y = 1.15 to 1.85):
  fillShelfWithBooks(1.15, -4.5, -1.55);
  fillShelfWithBooks(1.15, -1.45, 1.45);
  fillShelfWithBooks(1.15, 1.55, 4.5);

  // Middle shelf (y = -0.96 to 1.15):
  // Left bay:
  fillShelfWithBooks(-0.96, -4.5, -1.55);
  // Center bay: leave slot in the middle for Bishal's 3D book!
  fillShelfWithBooks(-0.96, -1.45, 1.45, true);
  // Right bay:
  fillShelfWithBooks(-0.96, 1.55, 4.5);

  // Bottom shelf (y = -1.8 to -0.96):
  fillShelfWithBooks(-1.8, -4.5, -1.55);
  fillShelfWithBooks(-1.8, -1.45, 1.45);
  fillShelfWithBooks(-1.8, 1.55, 4.5);

  // 7. Warm Atmospheric Library Lighting
  // Left brass desk lamp
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-1.8, -0.65, -1.4);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4a054,
    metalness: 0.85,
    roughness: 0.3
  });
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.05, 16), brassMat);
  const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.42, 12), brassMat);
  lampStem.position.y = 0.22;

  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0xffeed2,
    roughness: 0.5,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.55
  });
  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.2, 16, 1, true), shadeMat);
  lampShade.position.y = 0.42;
  lampShade.rotation.x = Math.PI;

  lampGroup.add(lampBase, lampStem, lampShade);
  library.add(lampGroup);

  // Point light inside reading lamp
  const lampLight = new THREE.PointLight(0xffb74d, 2.0, 7.0);
  lampLight.position.set(-1.8, -0.22, -1.35);
  library.add(lampLight);

  // Soft warm right chandelier fill light
  const rightLight = new THREE.PointLight(0xf59e0b, 1.3, 8.0);
  rightLight.position.set(2.4, 0.8, -1.2);
  library.add(rightLight);

  // Warm spotlight focused directly onto Bishal's book showcase slot
  const bookSpot = new THREE.SpotLight(0xffeedd, 1.6, 6.5, Math.PI / 4, 0.45);
  bookSpot.position.set(0, 1.4, -0.6);
  bookSpot.target.position.set(0, 0.05, -2.0);
  library.add(bookSpot);
  library.add(bookSpot.target);

  return library;
}
