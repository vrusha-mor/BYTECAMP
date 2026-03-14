import { Globe } from 'lucide-react';

const hotspots = [
  { name: 'Seychelles', risk: 'Critical', x: '70%', y: '60%' },
  { name: 'Panama', risk: 'High', x: '25%', y: '50%' },
  { name: 'Malta', risk: 'Medium', x: '51%', y: '40%' },
  { name: 'BVI', risk: 'Critical', x: '30%', y: '45%' },
  { name: 'Cayman Islands', risk: 'High', x: '28%', y: '48%' },
];

export default function RiskMap() {
  return (
    <div style={styles.container}>
      {/* Stylized World Map SVG Background (Abstract) */}
      <svg width="100%" height="100%" viewBox="0 0 800 400" style={styles.svg}>
        <path 
          d="M150,100 Q200,80 250,120 T400,100 T600,150 T750,120 L750,300 Q600,350 400,300 T150,250 Z" 
          fill="rgba(124, 92, 255, 0.05)" 
          stroke="rgba(124, 92, 255, 0.1)" 
        />
        {/* Abstract landmasses */}
        <rect x="120" y="150" width="80" height="40" rx="20" fill="rgba(255,255,255,0.02)" />
        <rect x="450" y="80" width="120" height="60" rx="30" fill="rgba(255,255,255,0.02)" />
        <rect x="600" y="200" width="100" height="50" rx="25" fill="rgba(255,255,255,0.02)" />
      </svg>

      {/* Hotspot markers */}
      {hotspots.map(spot => (
        <div key={spot.name} style={{ 
          position: 'absolute', 
          left: spot.x, 
          top: spot.y, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          transform: 'translate(-50%, -50%)'
        }}>
          <div style={{ 
            width: spot.risk === 'Critical' ? '12px' : '8px', 
            height: spot.risk === 'Critical' ? '12px' : '8px', 
            borderRadius: '50%', 
            background: spot.risk === 'Critical' ? 'var(--alert-red)' : spot.risk === 'High' ? 'var(--amber-color)' : 'var(--electric-blue)',
            boxShadow: spot.risk === 'Critical' ? '0 0 15px var(--alert-red)' : spot.risk === 'High' ? '0 0 10px var(--amber-color)' : '0 0 10px var(--electric-blue)',
            animation: 'pulse-glow 2s infinite'
          }}></div>
          <span style={styles.spotLabel}>{spot.name}</span>
        </div>
      ))}

      <div style={styles.legend}>
        <div style={styles.legendItem}><div style={{...styles.dot, background: 'var(--alert-red)'}}></div> Critical</div>
        <div style={styles.legendItem}><div style={{...styles.dot, background: 'var(--amber-color)'}}></div> High</div>
        <div style={styles.legendItem}><div style={{...styles.dot, background: 'var(--electric-blue)'}}></div> Medium</div>
      </div>
    </div>
  );
}

const styles = {
  container: { position: 'relative', width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden' },
  svg: { position: 'absolute', top: 0, left: 0 },
  spotLabel: { fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '4px', whiteSpace: 'nowrap', textShadow: '0 2px 4px rgba(0,0,0,0.8)' },
  legend: { position: 'absolute', bottom: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backdropFilter: 'blur(4px)' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' },
  dot: { width: '8px', height: '8px', borderRadius: '50%' }
};
