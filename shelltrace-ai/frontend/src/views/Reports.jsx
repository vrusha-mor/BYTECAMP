import { FileText, Download, CheckCircle, Clock } from 'lucide-react';

const mockReports = [
  { id: 'REP-2024-001', entity: 'Nexus Trading Ltd', risk: 'Critical', date: '2024-03-14', status: 'Finalized' },
  { id: 'REP-2024-002', entity: 'Global Tech Ventures', risk: 'High', date: '2024-03-13', status: 'Pending Review' },
  { id: 'REP-2024-003', entity: 'Oasis Real Estate', risk: 'Medium', date: '2024-03-12', status: 'Finalized' },
  { id: 'REP-2024-004', entity: 'Viktor Volkov', risk: 'High', date: '2024-03-11', status: 'Finalized' },
];

export default function Reports() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Compliance Reports</h1>
          <p style={styles.subtitle}>Generated AI AML investigation reports and SAR filings</p>
        </div>
        <button className="btn btn-secondary"><Download size={16} /> Bulk Export (CSV/PDF)</button>
      </header>

      <div style={styles.grid}>
        {mockReports.map((report) => (
          <div key={report.id} className="glass-card" style={styles.reportCard}>
            <div style={styles.cardHeader}>
              <FileText size={24} color="var(--primary-color)" />
              <div style={styles.statusBadge}>
                {report.status === 'Finalized' ? <CheckCircle size={14} color="var(--status-low-text)" /> : <Clock size={14} color="var(--accent-orange)" />}
                <span style={{ fontSize: '0.75rem', color: report.status === 'Finalized' ? 'var(--status-low-text)' : 'var(--accent-orange)' }}>{report.status}</span>
              </div>
            </div>
            
            <div style={styles.cardBody}>
              <h3 style={styles.entityName}>{report.entity}</h3>
              <p style={styles.reportId}>{report.id}</p>
              
              <div style={styles.metaRow}>
                <span style={styles.metaLabel}>Risk Level:</span>
                <span style={{ 
                  color: report.risk === 'Critical' ? 'var(--accent-orange)' : report.risk === 'High' ? 'var(--amber-color)' : 'var(--electric-blue)',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>{report.risk}</span>
              </div>
              <div style={styles.metaRow}>
                <span style={styles.metaLabel}>Date:</span>
                <span style={styles.metaValue}>{report.date}</span>
              </div>
            </div>

            <div style={styles.cardActions}>
              <button className="btn btn-secondary" style={{ flex: 1 }}>View PDF</button>
              <button className="btn btn-primary" style={{ padding: '8px' }}><Download size={16} /></button>
            </div>
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
    marginBottom: '32px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  reportCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    border: '1px solid var(--border-color)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
  },
  cardBody: {
    flex: 1,
  },
  entityName: {
    fontSize: '1.2rem',
    marginBottom: '4px',
    color: '#ffffff',
  },
  reportId: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    fontFamily: 'JetBrains Mono, monospace',
    marginBottom: '16px',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  metaLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  metaValue: {
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
  cardActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '12px',
  }
};
