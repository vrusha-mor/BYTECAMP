import { useState } from 'react';
import { X, Activity, Globe, MapPin, AlertCircle, FileText, ChevronDown, History, UserCheck } from 'lucide-react';
import ReportModal from './ReportModal';

export default function InvestigationPanel({ isOpen, onClose, nodeData }) {
  const [showReport, setShowReport] = useState(false);
  
  if (!isOpen) return null;

  // Placeholder data if no nodeData is passed
  const data = nodeData || {
    id: 'ENT-8921',
    name: 'Obscura Holdings Ltd.',
    country: 'Cayman Islands',
    industry: 'Real Estate / Shell',
    riskRating: 'High',
    riskScore: 92,
    txVolume: '$14.2M',
    totalTx: 148
  };

  return (
    <div style={styles.panelOverlay}>
      <div style={styles.panel} className="glass-panel">
        <div style={styles.header}>
          <div>
            <h3 style={styles.title}>{data.name}</h3>
            <span style={styles.subtitle}>{data.id}</span>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={styles.content}>
          
          <div style={styles.riskCard}>
            <div style={styles.riskHeader}>
              <span style={{ color: 'var(--text-secondary)' }}>FATF Risk Rating</span>
              <span style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>{data.riskRating}</span>
            </div>
            <div style={styles.riskScoreContainer}>
              <div style={styles.riskScoreCircle}>
                <span style={styles.scoreText}>{data.riskScore}</span>
              </div>
              <p style={styles.riskDesc}>Critical risk level detected due to circular flow patterns and layered ownership.</p>
            </div>
          </div>

          <div style={styles.detailsGrid}>
            <DetailItem icon={Globe} label="Jurisdiction" value={data.country} />
            <DetailItem icon={Activity} label="Industry" value={data.industry} />
            <DetailItem icon={MapPin} label="Total TX Vol" value={data.txVolume} />
            <DetailItem icon={FileText} label="Total TX" value={data.totalTx} />
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}><UserCheck size={16} color="var(--primary-color)" /> Beneficial Ownership Trace</h4>
            <div style={styles.chain}>
              <ChainNode name="Viktor Volkov" type="Ultimate Beneficiary" risk="Low" />
              <ChainLink />
              <ChainNode name="Baltic Investments" type="Holding Company" jurisdiction="BVI" />
              <ChainLink />
              <ChainNode name="Nordic Alpha Trust" type="Trust / Layer" />
              <ChainLink />
              <ChainNode name={data.name} type="Target Entity" highlight />
            </div>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}><History size={16} color="var(--primary-color)" /> Activity Timeline</h4>
            <div style={styles.timeline}>
               <TimelineItem date="Mar 12, 2026" event="Suspicious transfer: $450k from Nexus Trading" status="Alert" />
               <TimelineItem date="Feb 28, 2026" event="Director multi-layered change detected" />
               <TimelineItem date="Jan 15, 2026" event="Entity incorporation in Cayman Islands" />
            </div>
          </div>

        </div>

        <div style={styles.actions}>
          <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px' }}>
            Trace Ultimate Beneficial Owner
          </button>
          <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px' }}>
            View Transactions
          </button>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowReport(true)}>
            Generate AI Compliance Report
          </button>
        </div>
      </div>
      
      <ReportModal 
        isOpen={showReport} 
        onClose={() => setShowReport(false)} 
        entityName={data.name} 
      />
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div style={styles.detailItem}>
      <div style={styles.detailIconWrap}>
        <Icon size={16} />
      </div>
      <div>
        <div style={styles.detailLabel}>{label}</div>
        <div style={styles.detailValue}>{value}</div>
      </div>
    </div>
  );
}

function ChainNode({ name, type, highlight, risk, jurisdiction }) {
  return (
    <div style={{
      ...styles.chainNode,
      borderColor: highlight ? 'var(--primary-color)' : 'var(--border-color)',
      background: highlight ? 'rgba(124, 92, 255, 0.1)' : 'var(--bg-panel)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <div style={styles.chainType}>{type}</div>
        {risk && <div style={{ fontSize: '0.6rem', color: risk === 'High' ? 'var(--alert-red)' : 'var(--status-low-text)', fontWeight: 700 }}>{risk}</div>}
      </div>
      <div style={styles.chainName}>{name}</div>
      {jurisdiction && <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{jurisdiction}</div>}
    </div>
  );
}

function ChainLink() {
  return (
    <div style={styles.chainLink}>
      <ChevronDown size={14} color="var(--text-secondary)" />
    </div>
  );
}

function TimelineItem({ date, event, status }) {
  return (
    <div style={styles.timelineItem}>
      <div style={styles.timelinePoint}></div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={styles.timelineDate}>{date}</span>
          {status && <span style={{ fontSize: '0.6rem', color: 'var(--accent-orange)', fontWeight: 700 }}>{status}</span>}
        </div>
        <div style={styles.timelineEvent}>{event}</div>
      </div>
    </div>
  );
}

const styles = {
  panelOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '400px',
    zIndex: 100,
    pointerEvents: 'none', // let clicks pass through overlay
  },
  panel: {
    width: '100%',
    height: '100%',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-secondary)',
    pointerEvents: 'auto',
    borderLeft: '1px solid var(--border-color)',
    boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
    animation: 'slideIn 0.3s forwards',
  },
  header: {
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid var(--border-color)',
  },
  title: {
    margin: 0,
    fontSize: '1.2rem',
    color: 'var(--text-primary)',
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontFamily: 'JetBrains Mono, monospace',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '4px',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
  },
  riskCard: {
    background: 'var(--status-high-bg)',
    border: '1px solid var(--status-high-border)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
  },
  riskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
    fontSize: '0.9rem',
  },
  riskScoreContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  riskScoreCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '4px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 20px rgba(124, 92, 255, 0.1)',
    position: 'relative',
    background: 'rgba(0,0,0,0.2)',
  },
  scoreText: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  riskDesc: {
    flex: 1,
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '32px',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '10px',
    border: '1px solid var(--glass-border)',
  },
  detailIconWrap: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(124, 92, 255, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--primary-color)',
  },
  detailLabel: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    marginBottom: '2px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  detailValue: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '0.9rem',
    fontWeight: 600,
    marginBottom: '16px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  chain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  chainNode: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.02)',
    transition: 'all 0.2s ease',
  },
  chainType: {
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '2px',
  },
  chainName: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  chainLink: {
    display: 'flex',
    justifyContent: 'center',
    margin: '-2px 0',
    opacity: 0.5,
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingLeft: '12px',
    borderLeft: '1px solid var(--border-color)',
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: '20px',
  },
  timelinePoint: {
    position: 'absolute',
    left: '-5px',
    top: '4px',
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    background: 'var(--primary-color)',
    border: '2px solid var(--bg-secondary)',
  },
  timelineDate: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    marginBottom: '2px',
    display: 'block',
  },
  timelineEvent: {
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
    lineHeight: 1.4,
  },
  actions: {
    padding: '24px',
    borderTop: '1px solid var(--border-color)',
    background: 'rgba(5, 5, 16, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }
};
