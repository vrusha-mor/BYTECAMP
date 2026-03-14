import { 
  Activity, 
  RotateCcw, 
  MousePointer2, 
  TrendingUp, 
  Layers, 
  UserCheck, 
  Users, 
  BarChart3, 
  FolderOpen, 
  Archive,
  ChevronDown
} from 'lucide-react';

export default function Sidebar({ activeView, onNavigate }) {
  
  const detectionSuite = [
    { name: 'Circular', icon: RotateCcw, view: 'Circular Flow' },
    { name: 'Smurfing', icon: MousePointer2, view: 'Smurfing' },
    { name: 'Velocity', icon: TrendingUp, view: 'Velocity' },
    { name: 'Layering', icon: Layers, view: 'Layering' },
    { name: 'PEP', icon: UserCheck, view: 'PEP' },
    { name: 'Codirect.', icon: Users, view: 'Codirect.' },
    { name: 'Anomalies', icon: BarChart3, view: 'Anomalies' },
  ];

  const caseCenter = [
    { name: 'OPEN', icon: FolderOpen, view: 'Cases' },
    { name: 'CLOSED', icon: Archive, view: 'Closed Cases' },
  ];

  return (
    <div style={styles.container}>
      {/* Network Pulse Status */}
      <div style={styles.pulseContainer}>
        <div style={styles.pulseHeader}>
          <span style={styles.pulseLabel} className="mono">Network Pulse</span>
          <div style={styles.liveIndicator}>
            <div style={styles.pulsePoint}></div>
            LIVE
          </div>
        </div>
        <div style={styles.pulseBar}>
          <div style={styles.pulseFill}></div>
        </div>
        <div style={styles.pulseStats} className="mono">
          <span>THREAT: <span className="accent-orange">LOW</span></span>
          <span>SENSORS: 94%</span>
        </div>
      </div>

      <div style={styles.navContent}>
        {/* Detection Suite */}
        <div style={styles.navGroup}>
          <div style={styles.groupHeader}>
            <span style={styles.groupLabel}>DETECTION SUITE</span>
            <ChevronDown size={14} color="var(--text-secondary)" />
          </div>
          {detectionSuite.map((item) => (
            <button 
              key={item.name}
              style={{
                ...styles.navItem,
                background: activeView === item.view ? 'var(--nav-active-bg)' : 'transparent',
                color: activeView === item.view ? 'var(--nav-active-text)' : 'var(--text-secondary)',
              }}
              onClick={() => onNavigate(item.view)}
              className="nav-hover"
            >
              <item.icon size={18} />
              <span>{item.name}</span>
              {item.name === 'Circular' && <div style={styles.badge}>3</div>}
            </button>
          ))}
        </div>

        {/* Case Center */}
        <div style={styles.navGroup}>
          <div style={styles.groupHeader}>
            <span style={styles.groupLabel}>CASE CENTER</span>
          </div>
          {caseCenter.map((item) => (
            <button 
              key={item.name}
              style={{
                ...styles.navItem,
                background: activeView === item.view ? 'var(--nav-active-bg)' : 'transparent',
                color: activeView === item.view ? 'var(--nav-active-text)' : 'var(--text-secondary)',
              }}
              onClick={() => onNavigate(item.view)}
              className="nav-hover"
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.systemInfo} className="mono">
          CORE_V: 8.4.2-STABLE
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid var(--border-heavy)',
    boxShadow: 'var(--inset-shadow)',
  },
  pulseContainer: {
    padding: '24px',
    borderBottom: '1px solid var(--border-heavy)',
    background: 'var(--bg-secondary)',
    boxShadow: 'var(--inset-shadow)',
  },
  pulseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  pulseLabel: {
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    letterSpacing: '0.1em',
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.65rem',
    fontWeight: 700,
    color: 'var(--status-low-text)',
  },
  pulsePoint: {
    width: '6px',
    height: '6px',
    background: '#10b981',
    borderRadius: '50%',
    boxShadow: '0 0 8px #10b981',
  },
  pulseBar: {
    height: '4px',
    background: 'var(--border-color)',
    borderRadius: '2px',
    marginBottom: '12px',
    overflow: 'hidden',
  },
  pulseFill: {
    width: '74%',
    height: '100%',
    background: 'var(--brand-gradient)',
  },
  pulseStats: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.6rem',
    color: 'var(--text-secondary)',
  },
  navContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  },
  navGroup: {
    marginBottom: '32px',
  },
  groupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 12px 12px 12px',
  },
  groupLabel: {
    fontSize: '0.65rem',
    fontWeight: 900,
    color: 'var(--text-secondary)',
    opacity: 0.5,
    letterSpacing: '0.15em',
  },
  navItem: {
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '4px',
    position: 'relative',
  },
  badge: {
    marginLeft: 'auto',
    background: 'var(--accent-orange)',
    color: 'var(--text-inverse)',
    fontSize: '0.65rem',
    fontWeight: 800,
    padding: '2px 6px',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)',
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid var(--border-heavy)',
    background: 'var(--bg-secondary)',
    boxShadow: 'var(--inset-shadow)',
  },
  systemInfo: {
    fontSize: '0.6rem',
    color: 'var(--text-secondary)',
    opacity: 0.3,
    textAlign: 'center',
  }
};
