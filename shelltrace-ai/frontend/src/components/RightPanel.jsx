import { 
  BarChart3, 
  ShieldAlert, 
  Bell, 
  Activity, 
  Sparkles, 
  FileText,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function RightPanel({ onNavigate }) {
  
  const metrics = [
    { name: 'TOTAL_FLOW', value: '$42.5B', icon: BarChart3, color: '#bc00ff' },
    { name: 'RISK_ENTITIES', value: '3,842', icon: ShieldAlert, color: '#f59e0b' },
    { name: 'ACTIVE_ALERTS', value: '415', icon: Bell, color: '#ff4155' },
    { name: 'NET_LATENCY', value: '14ms', icon: Activity, color: '#00d2ff' },
  ];

  const recentAlerts = [
    { id: 'TX-99', entity: 'Nexus Trading', type: 'Circular Flow', time: '144 ago', risk: 'Critical' },
    { id: 'TX-82', entity: 'Oasis Real Estate', type: 'Fan-In', time: '22 minute ago', risk: 'High' },
    { id: 'TX-41', entity: 'Global Tech', type: 'Layering', time: '13 mons ago', risk: 'Medium' },
    { id: 'TX-33', entity: 'Sphere Investments', type: 'Fan-Out', time: '11d ago', risk: 'Low' },
  ];

  return (
    <div style={styles.container}>
      {/* 4 Metric Cards */}
      <div style={styles.metricsGrid}>
        {metrics.map((m) => (
          <div key={m.name} className="glass-card" style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <m.icon size={12} color={m.color} />
              <span style={styles.metricName} className="mono">{m.name}</span>
            </div>
            <div style={styles.metricValue} className="mono">{m.value}</div>
          </div>
        ))}
      </div>

      {/* AI Compliance Officer Panel */}
      <div className="glass-card" style={styles.aiPanel}>
        <div style={styles.aiHeader}>
          <div style={styles.aiIcon}>
            <Sparkles size={16} color="white" />
          </div>
          <div style={styles.aiInfo}>
            <div style={styles.aiTitle}>AI COMPLIANCE OFFICER</div>
            <div style={styles.aiStatus} className="mono">ANALYZING_CLUSTER_991-99S</div>
          </div>
        </div>
        
        <div style={styles.aiContent}>
          <div style={styles.aiAlertHeader}>
            <AlertTriangle size={14} color="var(--alert-red)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--alert-red)', fontWeight: 800 }}>Suspicious Pattern Detected</span>
          </div>
          <h4 style={{ margin: '8px 0 4px 0', fontSize: '1rem', color: '#ffffff' }}>Circular Flow</h4>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0' }}>Accounts: 24 — 150 — 72 ~ 24</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px 0' }}>Risk Score: <span style={{ color: '#ffffff', fontWeight: 700 }}>92%</span></p>
          
          <button className="btn btn-primary" style={styles.sarBtn}>
            <FileText size={14} />
            DRAFT SAR REPORT
          </button>
        </div>
      </div>

      {/* Network Feed */}
      <div style={styles.feedColumn}>
        <div style={styles.feedHeader}>
          <span style={styles.feedTitle}>NETWORK FEED</span>
          <span style={styles.feedCount}>◆ NEW</span>
        </div>
        
        <div style={styles.alertList}>
          {recentAlerts.map((alert) => (
            <motion.div 
              key={alert.id}
              whileHover={{ x: 4 }}
              style={styles.alertItem}
              className="alert-item-hover"
            >
              <div style={styles.alertMain}>
                <div style={styles.alertEntity}>{alert.entity}</div>
                <div style={styles.alertMeta} className="mono">
                  {alert.type} • {alert.time}
                </div>
              </div>
              <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    borderLeft: '1px solid var(--border-heavy)',
    boxShadow: 'var(--inset-shadow)',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  metricCard: {
    padding: '16px',
    background: 'var(--card-gradient)',
    border: '1px solid var(--border-heavy)',
    boxShadow: 'var(--glass-shadow), var(--inset-shadow)',
    borderRadius: '8px',
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  metricName: {
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    letterSpacing: '0.05em',
    fontWeight: 700,
  },
  metricValue: {
    fontSize: '1.4rem',
    fontWeight: 900,
    color: 'var(--text-primary)',
    fontFamily: 'JetBrains Mono, monospace',
  },
  aiPanel: {
    padding: '20px',
    background: 'linear-gradient(135deg, rgba(188, 0, 255, 0.1) 0%, rgba(5, 5, 16, 0.9) 100%)',
    border: '1px solid rgba(188, 0, 255, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(188, 0, 255, 0.1)',
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  aiIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: '#bc00ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 15px rgba(188, 0, 255, 0.4)',
  },
  aiTitle: {
    fontSize: '0.7rem',
    fontWeight: 900,
    letterSpacing: '0.05em',
    color: '#ffffff',
  },
  aiStatus: {
    fontSize: '0.6rem',
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 700,
  },
  aiContent: {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '10px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  aiAlertHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  sarBtn: {
    width: '100%',
    height: '34px',
    fontSize: '0.7rem',
    gap: '8px',
    fontWeight: 800,
    background: 'var(--btn-primary)',
    boxShadow: '0 4px 12px rgba(188, 0, 255, 0.2)',
  },
  feedColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  feedHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px 12px 4px',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '12px',
  },
  feedTitle: {
    fontSize: '0.7rem',
    fontWeight: 800,
    letterSpacing: '0.1em',
    color: 'var(--text-secondary)',
  },
  feedCount: {
    fontSize: '0.65rem',
    color: 'var(--alert-red)',
    fontWeight: 700,
  },
  alertList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  alertItem: {
    padding: '12px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    border: '1px solid var(--border-color)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  },
  riskIndicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  alertMain: {
    flex: 1,
  },
  alertEntity: {
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '2px',
  },
  alertMeta: {
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
  },
  viewAll: {
    marginTop: '16px',
    background: 'none',
    border: 'none',
    color: 'var(--accent-orange)',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '8px',
  }
};
