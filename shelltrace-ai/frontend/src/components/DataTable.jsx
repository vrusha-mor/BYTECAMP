import { Search, Download, FileJson, Calendar } from 'lucide-react';

export default function DataTable({ type, data, onAction }) {
  
  const getColumns = () => {
    switch(type) {
      case 'Smurfing':
        return [
          { key: 'entity', label: 'Entity' },
          { key: 'transaction_count', label: 'TX Count' },
          { key: 'total_value', label: 'Total Value' },
          { key: 'status', label: 'Status' }
        ];
      case 'Velocity':
        return [
          { key: 'start_id', label: 'Source' },
          { key: 'end_id', label: 'Target' },
          { key: 'velocity_score', label: 'Velocity' },
          { key: 'status', label: 'Status' }
        ];
      case 'Codirect.':
        return [
          { key: 'entity', label: 'Company' },
          { key: 'director_name', label: 'Director' },
          { key: 'shared_count', label: 'Connections' },
          { key: 'status', label: 'Status' }
        ];
      case 'Circular':
        return [
          { key: 'entity', label: 'Starting Node' },
          { key: 'hop_count', label: 'Hops' },
          { key: 'total_flow', label: 'Total Flow' },
          { key: 'status', label: 'Status' }
        ];
      default:
        return [
          { key: 'entity', label: 'Entity' },
          { key: 'type', label: 'Category' },
          { key: 'risk', label: 'Risk' },
          { key: 'status', label: 'Status' }
        ];
    }
  };

  const columns = getColumns();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.search}>
          <Search size={14} color="var(--text-secondary)" />
          <input type="text" placeholder={`Filter ${type} forensic data...`} style={styles.input} />
        </div>
        <div style={styles.actions}>
          <button style={styles.toolBtn}><Calendar size={14} /> DATE</button>
          <button style={styles.toolBtn}><FileJson size={14} /> EXPORT</button>
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={styles.th}>{col.label}</th>
              ))}
              <th style={styles.th}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} style={styles.empty}>
                  NO FORENSIC DATA DETECTED FOR {type.toUpperCase()}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} style={styles.tr}>
                  {columns.map(col => (
                    <td key={col.key} style={styles.td}>
                      {col.key === 'status' ? (
                        <span style={{
                          ...styles.status,
                          color: row[col.key] === 'SUSPICIOUS' ? 'var(--alert-red)' : 'var(--text-secondary)'
                        }}>
                          {row[col.key]}
                        </span>
                      ) : (
                        <span style={col.key === 'entity' || col.key === 'start_id' ? styles.entity : styles.value}>
                          {row[col.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td style={styles.td}>
                    <button 
                      className="btn btn-secondary" 
                      style={styles.actionBtn}
                      onClick={() => onAction(type, row)}
                    >
                      {type === 'Circular' ? 'TIMELINE' : type === 'Smurfing' ? 'DRAFT SAR' : 'DETAIL'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '0 24px 24px 24px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '12px 0',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-heavy)',
    borderRadius: '10px',
    padding: '0 12px',
    height: '36px',
    width: '320px',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
  },
  input: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '0.75rem',
    outline: 'none',
    width: '100%',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  toolBtn: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    color: 'var(--text-secondary)',
    fontSize: '0.65rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0 10px',
    height: '32px',
    cursor: 'pointer',
  },
  tableWrap: {
    flex: 1,
    overflowY: 'auto',
    border: '1px solid var(--border-heavy)',
    borderRadius: '12px',
    background: 'var(--bg-primary)',
    boxShadow: 'var(--glass-shadow), var(--inset-shadow)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    fontSize: '0.7rem',
    fontWeight: 900,
    color: 'var(--text-secondary)',
    borderBottom: '1px solid var(--border-heavy)',
    letterSpacing: '0.1em',
    background: 'var(--bg-secondary)',
    textTransform: 'uppercase',
  },
  tr: {
    borderBottom: '1px solid var(--border-color)',
  },
  td: {
    padding: '12px 16px',
    fontSize: '0.8rem',
  },
  entity: {
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  value: {
    fontFamily: 'JetBrains Mono, monospace',
    color: 'var(--text-secondary)',
  },
  status: {
    fontSize: '0.7rem',
    fontWeight: 800,
  },
  actionBtn: {
    fontSize: '0.65rem',
    fontWeight: 800,
    height: '28px',
    padding: '0 12px',
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: 'var(--text-secondary)',
    opacity: 0.2,
    fontSize: '0.85rem',
    fontWeight: 800,
    letterSpacing: '0.2em',
  }
};
