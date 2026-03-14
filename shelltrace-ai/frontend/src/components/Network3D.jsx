import { useRef, useEffect, useState, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
// Generate complex initial network data
const generateNetworkData = () => {
  const nodes = [];
  const links = [];
  
  // Core high-risk nodes (represented as red/orange glowing)
  const coreNodes = ['core-1', 'core-2', 'core-3'];
  coreNodes.forEach(id => {
    nodes.push({ id, group: 'suspicious', val: 12 });
  });

  // Layered Shell nodes
  const shellOffset = 100;
  for(let i=0; i<8; i++) {
    nodes.push({ id: `shell-${i}`, group: 'shell', val: 8 });
    // Connect to core
    links.push({ source: `shell-${i}`, target: coreNodes[i % 3], type: 'layer' });
  }

  // Normal nodes scattered like a universe
  const numNormal = 80;
  for(let i=0; i<numNormal; i++) {
    nodes.push({ id: `n-${i}`, group: 'normal', val: 3 + Math.random() * 4 });
  }

  // Random normal connections
  for(let i=0; i<numNormal * 1.5; i++) {
    links.push({
      source: `n-${Math.floor(Math.random()*numNormal)}`,
      target: `n-${Math.floor(Math.random()*numNormal)}`,
      type: 'normal'
    });
  }

  // Connect shell network to normal economy
  for(let i=0; i<20; i++) {
    links.push({
      source: `shell-${Math.floor(Math.random()*8)}`,
      target: `n-${Math.floor(Math.random()*numNormal)}`,
      type: 'suspicious'
    });
  }

  return { nodes, links };
};

export default function Network3D({ scrollYProgress }) {
  const [data, setData] = useState({ nodes: [], links: [] });
  const graphRef = useRef();

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setData(generateNetworkData());
    setMounted(true);
  }, []);

  // Set up camera rotation and scroll-based zoom effects
  useEffect(() => {
    if (!mounted) return;
    let animationId;
    let angle = 0;

    const animate = () => {
      if (graphRef.current) {
        
        // Base auto-rotation
        angle += 0.001;
        
        // Distance zoom affected by framer-motion scroll progress 
        // Get the current distance based on scroll progress (0 to 1)
        // At 0 scroll, distance is 400. At 1 scroll, distance is 150 (zoom in).
        const currentProgress = scrollYProgress ? scrollYProgress.get() : 0;
        const distance = 400 - (currentProgress * 250);
        
        graphRef.current.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle),
          // slightly tilt up
          y: 50 + (currentProgress * 100)
        });
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mounted, scrollYProgress]);

  // Material helpers
  const materials = useMemo(() => {
    return {
      normal: new THREE.MeshPhongMaterial({
        color: 0xbc00ff, // magenta
        transparent: true,
        opacity: 0.8,
        shininess: 100,
      }),
      suspicious: new THREE.MeshPhongMaterial({
        color: 0xf59e0b, // amber orange
        emissive: 0xd97706,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9,
      }),
      shell: new THREE.MeshPhongMaterial({
        color: 0xbc00ff, // magenta
        emissive: 0xbc00ff,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.6,
      })
    }
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
      {mounted && data.nodes.length > 0 && (
         <ForceGraph3D
          ref={graphRef}
          graphData={data}
          backgroundColor="rgba(0,0,0,0)" // Transparent to show cosmic background styling
          showNavInfo={false}
          enableNodeDrag={false}
          enablePointerInteraction={false} // purely cinematic
          nodeThreeObject={node => {
            const material = node.group === 'suspicious' 
              ? materials.suspicious 
              : node.group === 'shell' ? materials.shell : materials.normal;

            const mesh = new THREE.Mesh(
              new THREE.SphereGeometry(node.val),
              material
            );
            return mesh;
          }}
          linkWidth={link => link.type === 'suspicious' ? 1.5 : 0.5}
          linkColor={link => link.type === 'suspicious' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(188, 0, 255, 0.2)'}
          linkDirectionalParticles={link => link.type === 'suspicious' ? 4 : 2}
          linkDirectionalParticleWidth={link => link.type === 'suspicious' ? 3 : 1.5}
          linkDirectionalParticleSpeed={link => link.type === 'suspicious' ? 0.015 : 0.005}
          linkDirectionalParticleColor={link => link.type === 'suspicious' ? '#f59e0b' : '#bc00ff'}
        />
      )}
    </div>
  );
}
