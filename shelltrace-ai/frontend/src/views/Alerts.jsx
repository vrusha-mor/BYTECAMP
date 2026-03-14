import { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const mockAlerts = [
  { id: 'AL-1042', entity: 'Nexus Trading Ltd', country: 'Cayman Islands', risk: 'Critical', score: 95, type: 'Layering / Circular Flow', txCount: 142, volume: '$12.4M', status: 'Open' },
  { id: 'AL-1041', entity: 'Viktor Volkov', country: 'Russia', risk: 'High', score: 88, type: 'PEP Interaction', txCount: 14, volume: '$2.1M', status: 'Open' },
  { id: 'AL-1040', entity: 'Global Tech Ventures', country: 'BVI', risk: 'High', score: 82, type: 'Shell Match', txCount: 89, volume: '$8.4M', status: 'In Review' },
  { id: 'AL-1039', entity: 'Oasis Real Estate', country: 'UAE', risk: 'Medium', score: 65, type: 'Structuring', txCount: 412, volume: '$1.2M', status: 'Open' },
  { id: 'AL-1038', entity: 'Apex Holdings', country: 'UK', risk: 'Low', score: 35, type: 'Volume Spike', txCount: 45, volume: '$500K', status: 'Closed' },
  { id: 'AL-1037', entity: 'Baltic Investments', country: 'Estonia', risk: 'High', score: 78, type: 'Beneficial Owner Hidden', txCount: 22, volume: '$4.2M', status: 'Open' },
];

export default function Alerts({ onInvestigate }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={styles.container}>
      
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Suspicious Entity Alerts</h1>
          <p style={styles.subtitle}>AI-detected anomalies and AML rule violations</p>
        </div>
        
        <div style={styles.actions}>
          <div style={styles.searchBox}>
            <Search size={16} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search alerts..." 
              style={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary"><Filter size={16} /> Filter</button>
          <button className="btn btn-primary">Export CSV</button>
        </div>
      </div>

      <div className="glass-panel" style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Entity <ArrowUpDown size={12} /></th>
              <th style={styles.th}>Country <ArrowUpDown size={12} /></th>
              <th style={styles.th}>Risk Level <ArrowUpDown size={12} /></th>
              <th style={styles.th}>Alert Type</th>
              <th style={styles.th}>Transactions</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockAlerts.filter(a => a.entity.toLowerCase().includes(searchTerm.toLowerCase())).map((alert, i) => (
              <tr key={alert.id} style={{
                ...styles.tr,
                background: alert.risk === 'Critical' ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.1), transparent)' : i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent',
                borderLeft: alert.risk === 'Critical' ? '4px solid var(--accent-orange)' : '4px solid transparent'
              }}>
                <td style={styles.td}>
                  <div style={styles.entityName}>{alert.entity}</div>
                  <div style={styles.entityId}>{alert.id}</div>
                </td>
                <td style={styles.td}>{alert.country}</td>
                <td style={styles.td}>
                  <RiskBadge risk={alert.risk} score={alert.score} />
                </td>
                <td style={styles.td}>{alert.type}</td>
                <td style={styles.td}>
                  <div>{alert.txCount}</div>
                  <div style={styles.txVol}>{alert.volume}</div>
                </td>
                <td style={styles.td}>
                  <StatusBadge status={alert.status} />
                </td>
                <td style={styles.td}>
                  <button 
                    className="btn btn-secondary" 
                    style={{padding: '4px 12px', fontSize: '0.8rem'}}
                    onClick={() => onInvestigate({
                      id: alert.id,
                      name: alert.entity,
                      country: alert.country,
                      industry: 'Unknown',
                      riskRating: alert.risk,
                      riskScore: alert.score,
                      txVolume: alert.volume,
                      totalTx: alert.txCount
                    })}
                  >
                    Investigate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function RiskBadge({ risk, score }) {
  let colors = { bg: 'var(--status-low-bg)', text: 'var(--status-low-text)', border: 'rgba(0, 210, 255, 0.3)' };
  if (risk === 'Medium') colors = { bg: 'var(--status-med-bg)', text: 'var(--status-med-text)', border: 'rgba(245, 158, 11, 0.3)' };
  if (risk === 'High' || risk === 'Critical') colors = { bg: 'rgba(245, 158, 11, 0.1)', text: 'var(--accent-orange)', border: 'rgba(245, 158, 11, 0.4)' };

  return (
    <div style={{...styles.riskBadge, background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`}}>
      <span style={{fontWeight: 600}}>{score}</span>
      <span style={{margin: '0 4px', opacity: 0.5}}>|</span>
      {risk}
    </div>
  );
}

function StatusBadge({ status }) {
  const isClosed = status === 'Closed';
  return (
    <div style={{
      ...styles.statusBadge,
      background: isClosed ? 'var(--bg-secondary)' : 'rgba(139, 92, 246, 0.1)',
      color: isClosed ? 'var(--text-secondary)' : '#a855f7',
      border: isClosed ? '1px solid var(--border-color)' : '1px solid rgba(139, 92, 246, 0.3)'
    }}>
      {status}
    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    padding: '0 12px',
    borderRadius: '8px',
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '200px',
    height: '36px',
    fontSize: '0.9rem',
  },
  tableContainer: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '16px 24px',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--text-secondary)',
    borderBottom: '1px solid var(--border-color)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  tr: {
    borderBottom: '1px solid var(--border-color)',
    transition: 'background 0.2s',
  },
  td: {
    padding: '16px 24px',
    fontSize: '0.9rem',
    verticalAlign: 'middle',
  },
  entityName: {
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  entityId: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontFamily: 'JetBrains Mono, monospace',
  },
  txVol: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  },
  riskBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.8rem',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 500,
  }
};
