import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';

cytoscape.use(cola);

export default function NexaraGraph({ elements, onNodeClick, activeFrame = null }) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'var(--primary-color)',
            'label': 'data(label)',
            'color': 'var(--text-primary)',
            'font-size': '10px',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '32px',
            'height': '32px',
            'border-width': '2px',
            'border-color': 'var(--border-color)',
            'overlay-opacity': 0,
          }
        },
        {
          selector: 'node[risk="Critical"], node[risk="High"]',
          style: {
            'background-color': 'var(--alert-red)',
            'border-color': 'var(--alert-red)',
            'border-opacity': 0.5,
            'box-shadow': '0 0 10px var(--alert-red)',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1.5,
            'line-color': 'var(--border-color)',
            'target-arrow-color': 'var(--border-color)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'opacity': 0.4,
            'arrow-scale': 0.8,
          }
        },
        {
          selector: 'edge[type="circular"]',
          style: {
            'line-color': 'var(--accent-orange)',
            'target-arrow-color': 'var(--accent-orange)',
            'width': 2.5,
            'opacity': 0.8,
          }
        }
      ],
      layout: {
        name: 'cola',
        infinite: true,
        fit: true,
        padding: 50,
        nodeSpacing: 60,
      }
    });

    cyRef.current.on('tap', 'node', (evt) => {
      const nodeData = evt.target.data();
      if (onNodeClick) onNodeClick(nodeData);
    });

    return () => {
      if (cyRef.current) cyRef.current.destroy();
    };
  }, [elements, onNodeClick]);

  // Handle Temporal Playback (Active Frame filtering)
  useEffect(() => {
    if (!cyRef.current || activeFrame === null) return;
    
    // In a real app, elements would have a 'timestamp' or 'frame' property
    // For now, we simulate filter by opacity
    cyRef.current.elements().removeClass('temporal-active');
    cyRef.current.elements(`[frame <= ${activeFrame}]`).addClass('temporal-active');
    
    cyRef.current.style()
      .selector('edge:not(.temporal-active), node:not(.temporal-active)')
      .style('opacity', 0.1)
      .selector('.temporal-active')
      .style('opacity', 1)
      .update();

  }, [activeFrame]);

  return (
    <div style={styles.outer}>
      <div ref={containerRef} style={styles.container} />
      {activeFrame !== null && (
        <div style={styles.overlay} className="mono">
          TEMPORAL PLAYBACK ACTIVE: STEP {activeFrame + 1}
        </div>
      )}
    </div>
  );
}

const styles = {
  outer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: 'var(--card-gradient)',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(188, 0, 255, 0.1)',
    border: '1px solid var(--primary-color)',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '0.8rem',
    color: 'var(--primary-color)',
    fontWeight: 700,
    zIndex: 10,
    pointerEvents: 'none',
  }
};
