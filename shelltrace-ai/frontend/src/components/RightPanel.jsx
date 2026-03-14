import { 
  BarChart3, 
  ShieldAlert, 
  Bell, 
  Activity, 
  Sparkles, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function RightPanel({ onNavigate }) {
  
  const metrics = [
    { name: 'TOTAL_FLOW', value: '$42.5B', icon: BarChart3, color: 'var(--primary-color)' },
    { name: 'RISK_ENTITIES', value: '3,842', icon: ShieldAlert, color: 'var(--accent-orange)' },
    { name: 'ACTIVE_ALERTS', value: '415', icon: Bell, color: 'var(--alert-red)' },
    { name: 'NET_LATENCY', value: '14ms', icon: Activity, color: 'var(--electric-blue)' },
  ];

  const recentAlerts = [
    { id: 'TX-99', entity: 'Nexus Trading', type: 'Circular Flow', risk: 'Critical', time: '2m ago' },
    { id: 'TX-82', entity: 'Oasis Real Estate', type: 'Smurfing', risk: 'High', time: '12m ago' },
    { id: 'TX-41', entity: 'Global Tech', type: 'Layering', risk: 'Medium', time: '41m ago' },
  ];

  return (
    <div style={styles.container}>
      {/* 4 Metric Cards */}
      <div style={styles.metricsGrid}>
        {metrics.map((m) => (
          <div key={m.name} className="glass-card" style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <m.icon size={14} color={m.color} />
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
            <div style={styles.aiStatus} className="mono">ANALYZING_CLUSTER_SH-992</div>
          </div>
        </div>
        
        <div style={styles.aiContent}>
          <div style={styles.aiDraft}>
            <p style={styles.aiText}>
              Suspicious 3-hop circular flow detected between <span style={{color: 'var(--accent-orange)', fontWeight: 700}}>Nexus Trading</span> and shell offshore entities. 
              Layering depth exceeds risk threshold (7.2/10).
            </p>
            <button className="btn btn-primary" style={styles.sarBtn}>
              <FileText size={14} />
              DRAFT SAR REPORT
            </button>
          </div>
        </div>
      </div>

      {/* Network Feed */}
      <div style={styles.feedColumn}>
        <div style={styles.feedHeader}>
          <span style={styles.feedTitle}>NETWORK FEED</span>
          <span style={styles.feedCount}>12 NEW</span>
        </div>
        
        <div style={styles.alertList}>
          {recentAlerts.map((alert) => (
            <motion.div 
              key={alert.id}
              whileHover={{ x: 4 }}
              style={styles.alertItem}
              className="alert-item-hover"
            >
              <div style={{
                ...styles.riskIndicator,
                background: alert.risk === 'Critical' ? 'var(--alert-red)' : alert.risk === 'High' ? 'var(--accent-orange)' : 'var(--electric-blue)'
              }}></div>
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
        
        <button style={styles.viewAll} onClick={() => onNavigate('Alerts')}>
          VIEW ALL FORENSIC ALERTS
        </button>
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
    padding: '24px',
    background: 'var(--card-gradient)',
    border: '1px solid var(--border-heavy)',
    borderRadius: '12px',
    boxShadow: 'var(--glass-shadow), var(--inset-shadow)',
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  aiIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    background: 'var(--brand-gradient)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(188, 0, 255, 0.3)',
  },
  aiTitle: {
    fontSize: '0.8rem',
    fontWeight: 900,
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
  },
  aiStatus: {
    fontSize: '0.65rem',
    color: 'var(--accent-orange)',
    fontWeight: 800,
  },
  aiContent: {
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid var(--border-color)',
  },
  aiText: {
    fontSize: '0.8rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)',
    margin: '0 0 16px 0',
  },
  sarBtn: {
    width: '100%',
    height: '36px',
    fontSize: '0.7rem',
    gap: '8px',
    fontWeight: 700,
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
