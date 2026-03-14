import { X, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, entityName }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal} className="glass-panel">
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={styles.aiIcon}>
              <Cpu size={24} color="white" />
            </div>
            <div>
              <h2 style={styles.title}>AI Compliance Report</h2>
              <p style={styles.subtitle}>Generated for: {entityName}</p>
            </div>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.riskBanner}>
            <ShieldAlert size={24} color="var(--alert-red)" />
            <div>
              <div style={styles.riskTitle}>CRITICAL RISK DETECTED</div>
              <div style={styles.riskDesc}>98% probability of layered money laundering network</div>
            </div>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Key Red Flags</h4>
            <ul style={styles.redFlagList}>
              <li>Rapid movement of funds across multiple high-risk jurisdictions within 24 hours.</li>
              <li>Entity shares registered business address with 142 other unknown entities.</li>
              <li>Ultimate Beneficial Owner (UBO) matches known PEP associates in restricted regions.</li>
              <li>Transaction volume is 4,000% higher than industry average.</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Suspicious Transaction Pattern: Circular Flow</h4>
            <div style={styles.flowDiagram}>
              <FlowBox label="Nexus Trading Ltd" sub="Cayman" color="var(--alert-red)" />
              <Arrow />
              <FlowBox label="Global Tech Ven." sub="BVI" />
              <Arrow />
              <FlowBox label="Oasis Real Estate" sub="UAE" />
              <Arrow />
              <div style={styles.flowReturnLabel}>Returns via loan mechanism</div>
              <FlowBox label="Nexus Trading Ltd" sub="Cayman" color="var(--alert-red)" />
            </div>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Jurisdictions Involved</h4>
            <div style={styles.tags}>
              <span style={styles.tag}>Cayman Islands</span>
              <span style={styles.tag}>British Virgin Islands (BVI)</span>
              <span style={styles.tag}>United Arab Emirates (UAE)</span>
              <span style={styles.tag}>Cyprus</span>
            </div>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Recommended Action</h4>
            <div style={styles.recommendation}>
              <p>IMMEDIATE ACTION REQUIRED: Freeze accounts associated with entity {entityName} pending enhanced due diligence (EDD) review. File Suspicious Activity Report (SAR) with relevant financial intelligence unit.</p>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary">Download PDF</button>
            <button className="btn btn-primary">File SAR Automatically</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowBox({ label, sub, color = 'var(--bg-secondary)' }) {
  return (
    <div style={{...styles.flowBox, borderColor: color === '#ef4444' ? color : 'var(--border-color)'}}>
      <div style={styles.flowLabel}>{label}</div>
      <div style={styles.flowSub}>{sub}</div>
    </div>
  );
}

function Arrow() {
  return (
    <div style={{ padding: '0 8px', color: 'var(--text-secondary)' }}>
      <ArrowRight size={20} />
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '800px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '24px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'var(--brand-gradient)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(124, 92, 255, 0.4)',
  },
  title: {
    margin: 0,
    fontSize: '1.4rem',
  },
  subtitle: {
    margin: '4px 0 0 0',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
  },
  content: {
    padding: '24px',
    overflowY: 'auto',
    flex: 1,
  },
  riskBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '32px',
  },
  riskTitle: {
    color: 'var(--alert-red)',
    fontWeight: 700,
    fontSize: '1rem',
    letterSpacing: '0.05em',
  },
  riskDesc: {
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    marginTop: '4px',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '1rem',
    marginBottom: '16px',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  redFlagList: {
    background: 'var(--bg-secondary)',
    padding: '20px 20px 20px 40px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    lineHeight: 1.6,
  },
  flowDiagram: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--bg-secondary)',
    padding: '32px 24px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    position: 'relative',
    flexWrap: 'wrap',
    gap: '8px',
  },
  flowBox: {
    padding: '12px 16px',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    background: 'var(--bg-panel)',
    textAlign: 'center',
  },
  flowLabel: {
    fontWeight: 600,
    fontSize: '0.85rem',
  },
  flowSub: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  },
  flowReturnLabel: {
    position: 'absolute',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.75rem',
    color: 'var(--alert-red)',
    background: 'rgba(255, 77, 109, 0.1)',
    padding: '4px 12px',
    borderRadius: '12px',
  },
  tags: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '6px 16px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    fontSize: '0.85rem',
  },
  recommendation: {
    padding: '16px',
    borderLeft: '4px solid #f59e0b',
    background: 'rgba(245, 158, 11, 0.05)',
    borderRadius: '0 8px 8px 0',
    lineHeight: 1.6,
  },
  footer: {
    padding: '24px',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
  }
};
