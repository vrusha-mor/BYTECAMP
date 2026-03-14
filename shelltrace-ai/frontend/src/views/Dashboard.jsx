import { AlertTriangle, ShieldAlert, ArrowRightLeft, Users, FileLock2, Globe, Activity, Zap, TrendingUp, TrendingDown, LogIn } from 'lucide-react';
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
          color="rgba(188, 0, 255, 0.4)"
        />
        <MetricCard 
          title="Monitored Volume" 
          value="$42.5B" 
          change="+1.62%" 
          icon={ArrowRightLeft} 
          trend="up"
          color="rgba(16, 185, 129, 0.4)"
        />
        <MetricCard 
          title="Risk Alerts" 
          value="3,842" 
          change="-1.42" 
          icon={ShieldAlert} 
          trend="down"
          highlight
          color="rgba(245, 158, 11, 0.4)"
        />
        <MetricCard 
          title="Jurisdiction Risk" 
          value="18" 
          change="+2" 
          icon={Globe} 
          trend="up"
          color="rgba(188, 0, 255, 0.4)"
        />
      </div>

      <div style={styles.bentoGrid}>
        {/* Global Risk Network Intelligence */}
        <div style={{...styles.bentoItem, gridColumn: 'span 2'}} className="glass-card">
          <div style={styles.cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color="var(--primary-color)" />
              <h3 style={styles.cardTitle}>Global Risk Network Intelligence</h3>
            </div>
            <button className="btn btn-secondary" style={{ fontSize: '0.65rem', border: '1px solid var(--border-heavy)', background: 'rgba(255,255,255,0.02)' }} onClick={() => onNavigate('Network Graph')}>
              ENTER ANALYSIS CENTER
            </button>
          </div>
          <div style={styles.networkPreviewBox}>
            <svg width="100%" height="100%" viewBox="0 0 400 200" style={{opacity: 0.9}}>
              {/* Network Graph Simulation */}
              <circle cx="100" cy="120" r="4" fill="#6366f1" />
              <circle cx="150" cy="150" r="4" fill="#22d3ee" />
              <circle cx="200" cy="130" r="6" fill="#f87171" />
              <circle cx="280" cy="140" r="4" fill="#a855f7" />
              <circle cx="180" cy="80" r="4" fill="#fb923c" />
              
              <line x1="100" y1="120" x2="200" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="150" y1="150" x2="200" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="280" y1="140" x2="200" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="180" y1="80" x2="200" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </svg>
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div> CRITICAL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div> HIGH</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div> MEDIUM</div>
            </div>
          </div>
        </div>

        {/* Pattern Insights Today */}
        <div style={{...styles.bentoItem, gridColumn: 'span 1'}} className="glass-card">
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Pattern Insights Today</h3>
          </div>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Circular Flow', value: 12 },
              { label: 'Mirror Transactions', value: 8 },
              { label: 'Fan-In', value: 15 },
              { label: 'Fan-Out', value: 9 },
              { label: 'Structuring', value: 11 },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Geospatial Analysis */}
        <div style={{...styles.bentoItem, gridColumn: 'span 1', gridRow: 'span 1'}} className="glass-card">
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Geospatial Analysis</h3>
          </div>
          <div style={{ flex: 1, padding: '12px', minHeight: '180px' }}>
            <RiskMap />
          </div>
        </div>

      </div>

      {/* Global Risk Intelligence Bottom Section */}
      <div className="glass-card" style={{ marginTop: '32px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <ShieldAlert size={20} color="var(--primary-color)" />
          <h3 style={{...styles.cardTitle, color: '#ffffff', fontSize: '1rem' }}>Global Risk Intelligence</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Zap size={16} color="#6366f1" />
              <span style={{ fontSize: '0.9rem' }}>Full Flow Analysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CRITICAL</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ArrowRightLeft size={16} color="#fb923c" />
              <span style={{ fontSize: '0.9rem' }}>Mirror Transactions Detected</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>HIGH</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <LogIn size={16} color="#22d3ee" />
              <span style={{ fontSize: '0.9rem' }}>Fan-In Clustering</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>MEDIUM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon, trend, highlight, color }) {
  return (
    <div className="glass-card" style={{
      ...styles.metricCard,
      borderColor: highlight ? 'var(--accent-orange)' : 'var(--border-heavy)',
      borderWidth: highlight ? '2px' : '1px',
    }}>
      <div style={styles.metricHeader}>
        <span style={styles.metricTitle} className="mono">{title}</span>
        <div style={{
          ...styles.iconWrap, 
          background: color || 'rgba(124, 92, 255, 0.1)',
          color: highlight ? 'var(--accent-orange)' : 'var(--primary-color)'
        }}>
          <Icon size={14} />
        </div>
      </div>
      <div style={styles.metricValue}>{value}</div>
      <div style={{
        ...styles.metricChange,
        color: trend === 'up' ? '#10b981' : 'var(--alert-red)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {change} <span style={{color: 'var(--text-secondary)', marginLeft: '4px'}}>TREND_CONF</span>
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
    gap: '20px',
    height: 'auto',
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
