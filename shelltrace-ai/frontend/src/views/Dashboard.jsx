import { AlertTriangle, ShieldAlert, ArrowRightLeft, Users, FileLock2, Globe, Activity, Zap } from 'lucide-react';
import RiskMap from '../components/RiskMap';

export default function Dashboard({ onNavigate }) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitle}>
          <h1 style={styles.title}>Forensic Command Center</h1>
          <p style={styles.subtitle}>Real-time oversight of global financial intelligence networks</p>
        </div>
        <div style={styles.headerStatus} className="mono">
          <Activity size={14} color="#10b981" />
          SYSTEM_STATE: <span style={{ color: '#10b981' }}>OPTIMAL</span>
        </div>
      </header>

      {/* Primary Intelligence Row */}
      <div style={styles.metricsGrid}>
        <MetricCard 
          title="Total Entities" 
          value="1.2M" 
          change="+2,410" 
          icon={Users} 
          trend="up"
        />
        <MetricCard 
          title="Monitored Volume" 
          value="$42.5B" 
          change="+5.2%" 
          icon={ArrowRightLeft} 
          trend="up"
        />
        <MetricCard 
          title="Risk Alerts" 
          value="3,842" 
          change="+142" 
          icon={ShieldAlert} 
          trend="up"
          highlight
        />
        <MetricCard 
          title="Jurisdiction Risk" 
          value="18" 
          change="+2" 
          icon={Globe} 
          trend="up"
        />
      </div>

      <div style={styles.bentoGrid}>
        
        {/* Network Intelligence Preview */}
        <div style={{...styles.bentoItem, gridColumn: 'span 2'}} className="glass-card">
          <div style={styles.cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color="var(--primary-color)" />
              <h3 style={styles.cardTitle}>Global Risk Network Intelligence</h3>
            </div>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => onNavigate('Network Graph')}>
              ENTER ANALYSIS CENTER
            </button>
          </div>
          <div style={styles.networkPreviewBox}>
            <svg width="100%" height="100%" style={{opacity: 0.8}}>
              <circle cx="20%" cy="30%" r="6" fill="var(--primary-color)" />
              <circle cx="50%" cy="50%" r="10" fill="var(--alert-red)" className="pulse-danger" />
              <circle cx="70%" cy="40%" r="5" fill="var(--primary-color)" />
              <circle cx="80%" cy="70%" r="8" fill="var(--amber-color)" />
              <circle cx="40%" cy="80%" r="6" fill="var(--electric-blue)" />
              
              <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="var(--border-color)" strokeWidth="1.5" />
              <line x1="70%" y1="40%" x2="50%" y2="50%" stroke="var(--alert-red)" strokeWidth="2" opacity="0.4" />
              <line x1="80%" y1="70%" x2="70%" y2="40%" stroke="var(--border-color)" strokeWidth="1" />
              <line x1="40%" y1="80%" x2="50%" y2="50%" stroke="var(--border-color)" strokeWidth="1" />
            </svg>
            <div style={styles.heatmapOverlay}>
              <div style={styles.heatmapPulse}></div>
            </div>
          </div>
        </div>

        {/* Jurisdiction Map */}
        <div style={{...styles.bentoItem, gridColumn: 'span 1'}} className="glass-card">
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Geospatial Analysis</h3>
          </div>
          <div style={{ flex: 1, padding: '12px' }}>
            <RiskMap />
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon, trend, highlight }) {
  return (
    <div className="glass-card" style={{
      ...styles.metricCard,
      borderColor: highlight ? 'var(--accent-orange)' : 'var(--border-color)',
      boxShadow: highlight ? '0 0 15px rgba(245, 158, 11, 0.15)' : 'none',
    }}>
      <div style={styles.metricHeader}>
        <span style={styles.metricTitle} className="mono">{title}</span>
        <div style={{
          ...styles.iconWrap, 
          background: highlight ? 'rgba(245, 158, 11, 0.1)' : 'rgba(124, 92, 255, 0.1)',
          color: highlight ? 'var(--accent-orange)' : 'var(--primary-color)'
        }}>
          <Icon size={16} />
        </div>
      </div>
      <div style={styles.metricValue}>{value}</div>
      <div style={{
        ...styles.metricChange,
        color: trend === 'up' ? '#10b981' : 'var(--alert-red)'
      }}>
        {trend === 'up' ? '↑' : '↓'} {change} <span style={{color: 'var(--text-secondary)', marginLeft: '4px'}}>TREND_CONF</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '32px',
    height: '100%',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '24px',
  },
  headerTitle: { flex: 1 },
  headerStatus: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    fontSize: '0.75rem', 
    background: 'var(--bg-secondary)', 
    padding: '8px 16px', 
    borderRadius: '12px',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-heavy)',
    boxShadow: 'var(--inset-shadow)',
    fontWeight: 700,
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '4px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },
  metricCard: {
    padding: '24px',
    background: 'var(--card-gradient)',
    border: '1px solid var(--border-heavy)',
    boxShadow: 'var(--glass-shadow), var(--inset-shadow)',
    borderRadius: '12px',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  metricTitle: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    fontWeight: 800,
    letterSpacing: '0.1em',
  },
  iconWrap: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: '2.4rem',
    fontWeight: 800,
    fontFamily: 'JetBrains Mono, monospace',
    marginBottom: '8px',
    color: 'var(--text-primary)',
    letterSpacing: '-0.05em',
  },
  metricChange: {
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  bentoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    height: '400px',
  },
  bentoItem: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: '0.9rem',
    margin: 0,
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--text-secondary)',
  },
  networkPreviewBox: {
    flex: 1,
    position: 'relative',
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
    margin: '12px',
    border: '1px solid var(--border-heavy)',
    boxShadow: 'var(--inset-shadow)',
  },
  heatmapOverlay: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  heatmapPulse: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    animation: 'pulse-glow 3s infinite',
  }
};
