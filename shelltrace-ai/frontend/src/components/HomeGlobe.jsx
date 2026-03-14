import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const RADIUS = 22;

// ─── Wireframe Globe Grid (latitude + longitude lines) ───────────────────────
function GlobeGrid() {
  const segmentCount = 64;

  const { geoLon, geoLat, mat } = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: '#2B3860',
      transparent: true,
      opacity: 0.45,
    });

    // Longitude lines
    const lonPositions = [];
    for (let i = 0; i < 18; i++) {
      const theta = (i / 18) * Math.PI * 2;
      for (let j = 0; j <= segmentCount; j++) {
        const phi = (j / segmentCount) * Math.PI;
        lonPositions.push(
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta)
        );
        if (j > 0 && j < segmentCount) {
          lonPositions.push(
            RADIUS * Math.sin(phi) * Math.cos(theta),
            RADIUS * Math.cos(phi),
            RADIUS * Math.sin(phi) * Math.sin(theta)
          );
        }
      }
    }
    const geoLon = new THREE.BufferGeometry();
    geoLon.setAttribute('position', new THREE.Float32BufferAttribute(lonPositions, 3));

    // Latitude lines
    const latPositions = [];
    for (let i = 1; i < 12; i++) {
      const phi = (i / 12) * Math.PI;
      for (let j = 0; j <= segmentCount; j++) {
        const theta = (j / segmentCount) * Math.PI * 2;
        latPositions.push(
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta)
        );
        if (j > 0 && j < segmentCount) {
          latPositions.push(
            RADIUS * Math.sin(phi) * Math.cos(theta),
            RADIUS * Math.cos(phi),
            RADIUS * Math.sin(phi) * Math.sin(theta)
          );
        }
      }
    }
    const geoLat = new THREE.BufferGeometry();
    geoLat.setAttribute('position', new THREE.Float32BufferAttribute(latPositions, 3));

    return { geoLon, geoLat, mat };
  }, []);

  return (
    <group>
      <lineSegments geometry={geoLon} material={mat} />
      <lineSegments geometry={geoLat} material={mat} />
    </group>
  );
}

// ─── Orbital arcs + glowing nodes ─────────────────────────────────────────────
function Orbits() {
  const { arcGeo, dashMat, nodePositions } = useMemo(() => {
    const pts = [
      { phi: Math.PI * 0.28, theta: Math.PI * 0.15 },
      { phi: Math.PI * 0.65, theta: Math.PI * 0.42 },
      { phi: Math.PI * 0.42, theta: Math.PI * 0.85 },
      { phi: Math.PI * 0.58, theta: Math.PI * 1.48 },
      { phi: Math.PI * 0.22, theta: Math.PI * 1.82 },
    ];

    const nodePositions = pts.map(
      (p) =>
        new THREE.Vector3(
          RADIUS * Math.sin(p.phi) * Math.cos(p.theta),
          RADIUS * Math.cos(p.phi),
          RADIUS * Math.sin(p.phi) * Math.sin(p.theta)
        )
    );

    const connections = [
      [0, 1], [1, 2], [3, 4], [0, 4], [2, 3],
    ];

    const segments = 60;
    const allArcVerts = [];

    for (const [si, ei] of connections) {
      const startV = nodePositions[si];
      const endV = nodePositions[ei];
      const dist = startV.distanceTo(endV);
      const h = Math.min(dist * 0.18, RADIUS * 0.45);

      for (let k = 0; k < segments; k++) {
        for (const t of [k / segments, (k + 1) / segments]) {
          const v = new THREE.Vector3().lerpVectors(startV, endV, t).normalize();
          v.multiplyScalar(RADIUS + Math.sin(t * Math.PI) * h);
          allArcVerts.push(v.x, v.y, v.z);
        }
      }
    }

    const arcGeo = new THREE.BufferGeometry();
    arcGeo.setAttribute('position', new THREE.Float32BufferAttribute(allArcVerts, 3));

    const dashMat = new THREE.LineBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.55,
    });

    return { arcGeo, dashMat, nodePositions };
  }, []);

  return (
    <group>
      <lineSegments geometry={arcGeo} material={dashMat} />
      {nodePositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Core dot */}
          <mesh>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#facc15' : '#ffffff'} />
          </mesh>
          {/* Glow halo */}
          <mesh>
            <sphereGeometry args={[1.1, 16, 16]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#fbbf24' : '#e2e8f0'}
              transparent
              opacity={0.18}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function HomeGlobe() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y -= delta * 0.06;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.06;
  });

  return (
    <>
      <OrbitControls enableZoom={true} enablePan={false} />
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Occlusion sphere — hides far-side lines for depth illusion */}
        <mesh>
          <sphereGeometry args={[RADIUS - 0.3, 48, 48]} />
          <meshBasicMaterial color="#050B14" transparent opacity={0.85} />
        </mesh>

        <GlobeGrid />
        <Orbits />
      </group>
    </>
  );
}
