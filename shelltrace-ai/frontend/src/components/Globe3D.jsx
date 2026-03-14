import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame }     from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE        from 'three';

const R = 20;

function geo2xyz(lon, lat, r = R) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

// ─── Dense lat/lon wireframe grid ─────────────────────────────────────────────
function GlobeGrid() {
  const { geometry, material } = useMemo(() => {
    const verts = [], seg = 180;
    for (let lat = -90; lat <= 90; lat += 10) {
      for (let j = 0; j < seg; j++) {
        const lo0 = (j / seg) * 360 - 180, lo1 = ((j + 1) / seg) * 360 - 180;
        const v0 = geo2xyz(lo0, lat), v1 = geo2xyz(lo1, lat);
        verts.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z);
      }
    }
    for (let lon = -180; lon < 180; lon += 10) {
      for (let j = 0; j < seg; j++) {
        const la0 = -90 + (j / seg) * 180, la1 = -90 + ((j + 1) / seg) * 180;
        const v0 = geo2xyz(lon, la0), v1 = geo2xyz(lon, la1);
        verts.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    const material = new THREE.LineBasicMaterial({ color: '#7c4a03', transparent: true, opacity: 0.25 });
    return { geometry, material };
  }, []);
  return <lineSegments geometry={geometry} material={material} />;
}

// ─── Country borders + coastlines ─────────────────────────────────────────────
function CountryBorders() {
  const [outlineGeo, setOutlineGeo] = useState(null);
  const [coastGeo,   setCoastGeo]   = useState(null);

  useEffect(() => {
    let dead = false;
    Promise.all([
      fetch('/countries-50m.json').then(r => r.json()),
      import('topojson-client'),
    ]).then(([world, topo]) => {
      if (dead) return;
      function ring(coords, buf, r) {
        for (let i = 0; i < coords.length - 1; i++) {
          const [lo0, la0] = coords[i], [lo1, la1] = coords[i + 1];
          if (!isFinite(lo0 + la0 + lo1 + la1)) continue;
          const v0 = geo2xyz(lo0, la0, r), v1 = geo2xyz(lo1, la1, r);
          buf.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z);
        }
      }

      // Country outlines
      const outBuf = [];
      topo.feature(world, world.objects.countries).features.forEach(f => {
        const g = f.geometry; if (!g) return;
        if (g.type === 'Polygon')      g.coordinates.forEach(c => ring(c, outBuf, R + 0.06));
        if (g.type === 'MultiPolygon') g.coordinates.forEach(p => p.forEach(c => ring(c, outBuf, R + 0.06)));
      });
      setOutlineGeo(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(outBuf), 3)));

      // Coastlines
      const coastBuf = [];
      const land = topo.feature(world, world.objects.land);
      const lg = land.geometry;
      if (lg.type === 'Polygon')      lg.coordinates.forEach(c => ring(c, coastBuf, R + 0.1));
      if (lg.type === 'MultiPolygon') lg.coordinates.forEach(p => p.forEach(c => ring(c, coastBuf, R + 0.1)));
      setCoastGeo(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(coastBuf), 3)));
    }).catch(e => console.error('Globe data error:', e));
    return () => { dead = true; };
  }, []);

  const borderMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#b45309', transparent: true, opacity: 0.6 }), []);
  const coastMat  = useMemo(() => new THREE.LineBasicMaterial({ color: '#fbbf24', transparent: true, opacity: 0.85 }), []);

  return (
    <>
      {outlineGeo && <lineSegments geometry={outlineGeo} material={borderMat} />}
      {coastGeo   && <lineSegments geometry={coastGeo}   material={coastMat}  />}
    </>
  );
}

// ─── Financial hub nodes (instanced + pulsing halos) ──────────────────────────
const HUBS = [
  [40.7, -74.0],   // New York
  [51.5, -0.1],    // London
  [22.3, 114.2],   // Hong Kong
  [25.2, 55.3],    // Dubai
  [50.1, 8.7],     // Frankfurt
  [1.3, 103.8],    // Singapore
  [47.4, 8.5],     // Zurich
  [19.3, -81.4],   // Cayman Islands
  [8.9, -79.5],    // Panama
  [-20.2, 57.5],   // Mauritius
  [35.7, 139.7],   // Tokyo
];

const ARCS = [
  [0, 7], [7, 8], [1, 4], [2, 5], [3, 9],
  [4, 6], [0, 1], [2, 3], [5, 10], [8, 9],
];

function HubNodes() {
  const coreRef = useRef();
  const haloRef = useRef();
  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const pos     = useMemo(() => HUBS.map(([lat, lon]) => geo2xyz(lon, lat, R + 0.3)), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    pos.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      coreRef.current?.setMatrixAt(i, dummy.matrix);

      // Pulsing halo
      const pulse = 2.5 + Math.sin(t * 2.5 + i * 0.8) * 1.0;
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      haloRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (coreRef.current) coreRef.current.instanceMatrix.needsUpdate = true;
    if (haloRef.current) haloRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={coreRef} args={[null, null, HUBS.length]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#e0f4ff" />
      </instancedMesh>
      <instancedMesh ref={haloRef} args={[null, null, HUBS.length]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.22} />
      </instancedMesh>
    </>
  );
}

// ─── Animated transaction arcs ────────────────────────────────────────────────
function TransactionArcs() {
  const ref = useRef();
  const { geometry } = useMemo(() => {
    const verts = [], seg = 80;
    for (const [ai, bi] of ARCS) {
      const sv = geo2xyz(HUBS[ai][1], HUBS[ai][0], R + 0.2);
      const ev = geo2xyz(HUBS[bi][1], HUBS[bi][0], R + 0.2);
      const h  = sv.distanceTo(ev) * 0.22;
      for (let k = 0; k < seg; k++) {
        for (const t of [k / seg, (k + 1) / seg]) {
          const v = new THREE.Vector3().lerpVectors(sv, ev, t).normalize();
          v.multiplyScalar(R + Math.sin(t * Math.PI) * h);
          verts.push(v.x, v.y, v.z);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return { geometry };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.25;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#fcd34d" transparent opacity={0.5} />
    </lineSegments>
  );
}

// ─── Orbital rings ────────────────────────────────────────────────────────────
function Ring({ radius, tiltX = 0, tiltZ = 0, speed, color, opacity, dashed = false }) {
  const groupRef = useRef();
  const { geo, mat } = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 512; i++) {
      const a = (i / 512) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = dashed
      ? new THREE.LineDashedMaterial({ color, transparent: true, opacity, dashSize: 1.2, gapSize: 0.6 })
      : new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return { geo, mat };
  }, [radius, color, opacity, dashed]);

  useFrame((_, dt) => { if (groupRef.current) groupRef.current.rotation.y += dt * speed; });

  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      <lineSegments geometry={geo} material={mat} />
    </group>
  );
}

// ─── Main Globe export ────────────────────────────────────────────────────────
export default function Globe3D() {
  const globeRef = useRef();

  useFrame((_, dt) => {
    if (globeRef.current) globeRef.current.rotation.y += dt * 0.06;
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate />

      <ambientLight intensity={0.15} />
      <pointLight position={[60, 40, 60]}  intensity={1.8} color="#f59e0b" />
      <pointLight position={[-30, 20, 40]} intensity={0.8} color="#7c3aed" />

      <group ref={globeRef} rotation={[0, Math.PI, 0]}>
        {/* Dark core sphere */}
        <mesh>
          <sphereGeometry args={[R, 72, 72]} />
          <meshPhongMaterial color="#0a0501" emissive="#1a0f05" emissiveIntensity={0.6} shininess={10} />
        </mesh>

        {/* Purple atmosphere glow */}
        <mesh>
          <sphereGeometry args={[R + 0.8, 48, 48]} />
          <meshBasicMaterial color="#6d28d9" transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>

        <GlobeGrid />
        <CountryBorders />
        <TransactionArcs />
        <HubNodes />
      </group>

      {/* Three orbital rings at different tilts */}
      <Ring radius={R + 3.5} tiltX={0.52} tiltZ={0.10}  speed={0.20}  color="#fbbf24" opacity={0.45} />
      <Ring radius={R + 6}   tiltX={1.08} tiltZ={-0.28} speed={-0.12} color="#f59e0b" opacity={0.20} dashed />
      <Ring radius={R + 1.8} tiltX={0.18} tiltZ={0.95}  speed={0.25}  color="#7c3aed" opacity={0.25} dashed />
    </>
  );
}
