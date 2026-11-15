import * as THREE from 'three';

export function createArchedWindows(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'library-arched-windows';

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0xe0d6c8,
    roughness: 0.82,
    metalness: 0.04
  });

  // Luminous morning sky daylight glass
  const glassMat = new THREE.MeshBasicMaterial({
    color: 0xebf3fc
  });

  // Soft volumetric daylight sun ray material
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xfff6e8,
    transparent: true,
    opacity: 0.055,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const windowPositions = [-3.8, 0, 3.8];
  const windowZ = -13.0;
  const windowH = 4.8;
  const windowW = 2.2;
  const archR = windowW / 2;

  windowPositions.forEach((wx, idx) => {
    const winGroup = new THREE.Group();
    winGroup.position.set(wx, 2.4, windowZ);

    // Main rectangular lower window
    const lowerRect = new THREE.Mesh(
      new THREE.PlaneGeometry(windowW, windowH - archR),
      glassMat
    );
    lowerRect.position.y = (windowH - archR) / 2;
    winGroup.add(lowerRect);

    // Arched top half-circle
    const archTop = new THREE.Mesh(
      new THREE.CircleGeometry(archR, 24, 0, Math.PI),
      glassMat
    );
    archTop.position.y = windowH - archR;
    winGroup.add(archTop);

    // Stone Frame
    const frameGeo = new THREE.BoxGeometry(0.12, windowH, 0.22);
    [-windowW / 2, windowW / 2].forEach((fx) => {
      const frameSide = new THREE.Mesh(frameGeo, stoneMat);
      frameSide.position.set(fx, windowH / 2, 0);
      winGroup.add(frameSide);
    });

    // Central Stone Mullion
    const mullion = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, windowH, 0.16),
      stoneMat
    );
    mullion.position.set(0, windowH / 2, 0);
    winGroup.add(mullion);

    // Diagonal Volumetric Sun Beam cutting forward and down through the hall
    const godRayGeo = new THREE.CylinderGeometry(0.35, 2.6, 14.0, 16, 1, true);
    const godRay = new THREE.Mesh(godRayGeo, beamMat);
    godRay.position.set(0, windowH / 2 - 2.8, 6.0);
    godRay.rotation.x = -0.38; // Angled down and forward toward reading tables
    godRay.rotation.y = idx === 0 ? -0.10 : idx === 2 ? 0.10 : 0;
    winGroup.add(godRay);

    group.add(winGroup);
  });

  return group;
}
