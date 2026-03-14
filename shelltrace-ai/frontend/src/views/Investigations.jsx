import { Search, Filter, AlertCircle, Clock, CheckCircle2, MoreVertical, User } from 'lucide-react';

const mockCases = [
  { id: 'CASE-001', entity: 'Nexus Trading Ltd', status: 'Investigating', priority: 'Critical', investigator: 'Sarah Chen' },
  { id: 'CASE-002', entity: 'Viktor Volkov', status: 'Open', priority: 'High', investigator: 'Unassigned' },
  { id: 'CASE-003', entity: 'Global Tech Ventures', status: 'Escalated', priority: 'High', investigator: 'Marcus Roe' },
  { id: 'CASE-004', entity: 'Oasis Real Estate', status: 'Closed', priority: 'Medium', investigator: 'Sarah Chen' },
  { id: 'CASE-005', entity: 'Apex Holdings', status: 'Open', priority: 'Low', investigator: 'Unassigned' },
];

export default function Investigations() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerInfo}>
          <h1 style={styles.title}>Case Management</h1>
          <p style={styles.subtitle}>Track and manage ongoing AML investigations</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.searchBox}>
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search cases..." style={styles.searchInput} />
          </div>
          <button className="btn btn-primary">New Case</button>
        </div>
      </header>

      <div style={styles.caseGrid}>
        {mockCases.map((caseItem) => (
          <div key={caseItem.id} className="glass-card" style={styles.caseCard}>
            <div style={styles.cardTop}>
              <span style={styles.caseId}>{caseItem.id}</span>
              <span style={{ 
                ...styles.priorityBadge, 
                color: caseItem.priority === 'Critical' ? 'var(--accent-orange)' : caseItem.priority === 'High' ? 'var(--amber-color)' : 'var(--electric-blue)',
                background: caseItem.priority === 'Critical' ? 'rgba(245, 158, 11, 0.1)' : caseItem.priority === 'High' ? 'rgba(245, 185, 66, 0.1)' : 'rgba(0, 210, 255, 0.1)'
              }}>
                {caseItem.priority}
              </span>
            </div>

            <h3 style={styles.entityTitle}>{caseItem.entity}</h3>

            <div style={styles.metaSection}>
              <div style={styles.metaItem}>
                <Clock size={14} color="var(--text-secondary)" />
                <span style={styles.metaValue}>{caseItem.status}</span>
              </div>
              <div style={styles.metaItem}>
                <User size={14} color="var(--text-secondary)" />
                <span style={styles.metaValue}>{caseItem.investigator}</span>
              </div>
            </div>

            <div style={styles.cardFooter}>
              <button className="btn btn-secondary" style={styles.actionBtn}>Open Details</button>
              <button style={styles.moreBtn}><MoreVertical size={18} /></button>
            </div>
            
            <div style={{
              ...styles.progressBar,
              background: caseItem.status === 'Closed' ? 'var(--status-low-text)' : 'var(--primary-color)',
              width: caseItem.status === 'Closed' ? '100%' : caseItem.status === 'Investigating' ? '65%' : caseItem.status === 'Escalated' ? '85%' : '15%',
              boxShadow: `0 0 10px ${caseItem.status === 'Closed' ? 'var(--status-low-text)' : 'var(--primary-color)'}`
            }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingBottom: '40px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: '2rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
  },
  headerActions: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    height: '44px',
    width: '280px',
  },
  searchInput: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '100%',
    fontSize: '0.9rem',
  },
  caseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },
  caseCard: {
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'transform 0.2s ease',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caseId: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontFamily: 'JetBrains Mono, monospace',
    letterSpacing: '0.05em',
  },
  priorityBadge: {
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '0.02em',
  },
  entityTitle: {
    fontSize: '1.25rem',
    color: '#ffffff',
    margin: 0,
  },
  metaSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  metaValue: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  actionBtn: {
    flex: 1,
    marginRight: '12px',
    fontSize: '0.8rem',
  },
  moreBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    opacity: 0.6,
    boxShadow: '0 0 10px var(--primary-color)',
  }
};
