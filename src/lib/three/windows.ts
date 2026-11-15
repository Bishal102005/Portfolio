import * as THREE from 'three';

export function createArchedWindows(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'library-arched-windows';

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x181512,
    roughness: 0.88,
    metalness: 0.04
  });

  // Stained glass / nocturnal deep midnight sky
  const glassMat = new THREE.MeshBasicMaterial({
    color: 0x1b283d
  });

  // Cool volumetric moonlight shaft material
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xa8c4e6,
    transparent: true,
    opacity: 0.045,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const windowPositions = [-3.8, 0, 3.8];
  const windowZ = 14.5;
  const windowH = 5.2;
  const windowW = 2.2;
  const archR = windowW / 2;

  windowPositions.forEach((wx, idx) => {
    const winGroup = new THREE.Group();
    winGroup.position.set(wx, 1.2, windowZ);

    // Main rectangular lower window
    const lowerRect = new THREE.Mesh(
      new THREE.PlaneGeometry(windowW, windowH - archR),
      glassMat
    );
    lowerRect.position.y = (windowH - archR) / 2;
    lowerRect.rotation.y = Math.PI;
    winGroup.add(lowerRect);

    // Arched top half-circle
    const archTop = new THREE.Mesh(
      new THREE.CircleGeometry(archR, 20, 0, Math.PI),
      glassMat
    );
    archTop.position.y = windowH - archR;
    archTop.rotation.y = Math.PI;
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

    // Diagonal Volumetric God Ray cutting down through the hall
    const godRayGeo = new THREE.CylinderGeometry(0.4, 2.8, 16.0, 16, 1, true);
    const godRay = new THREE.Mesh(godRayGeo, beamMat);
    godRay.position.set(0, windowH / 2 - 3.5, -7.0);
    godRay.rotation.x = 0.42; // Angled down toward reading tables
    godRay.rotation.y = idx === 0 ? 0.12 : idx === 2 ? -0.12 : 0;
    winGroup.add(godRay);

    group.add(winGroup);
  });

  return group;
}
