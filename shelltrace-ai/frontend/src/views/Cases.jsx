import { Briefcase, AlertCircle, Clock, CheckCircle2, MoreVertical, Filter } from 'lucide-react';

const cases = [
  { id: 'CAS-8821', title: 'Circular Flow: Nexus Trading', status: 'Investigating', priority: 'Critical', assignee: 'Alex Sterling', date: '2026-03-12' },
  { id: 'CAS-8819', title: 'UBO Discrepancy: Oasis Real Estate', status: 'Open', priority: 'High', assignee: 'Sarah Chen', date: '2026-03-14' },
  { id: 'CAS-8790', title: 'Rapid Entity Creation: Titan Group', status: 'Escalated', priority: 'High', assignee: 'Michael Ross', date: '2026-03-10' },
  { id: 'CAS-8755', title: 'PEP Transaction: Vancorp Ltd', status: 'Closed', priority: 'Medium', assignee: 'Alex Sterling', date: '2026-03-05' },
  { id: 'CAS-8825', title: 'Sanction Hit: Crimson Holdings', status: 'Open', priority: 'Critical', assignee: 'Unassigned', date: '2026-03-15' },
];

export default function Cases() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ flex: 1 }}>
          <h1 style={styles.title}>Case Management</h1>
          <p style={styles.subtitle}>Track and manage AML investigations and law enforcement escalations</p>
        </div>
        <div style={styles.actions}>
          <button className="btn btn-secondary"><Filter size={16} /> Filter</button>
          <button className="btn btn-primary">Create New Case</button>
        </div>
      </header>

      <div style={styles.statsRow}>
        <StatBox label="Total Open" value="12" color="var(--primary-color)" />
        <StatBox label="Critical" value="3" color="var(--alert-red)" />
        <StatBox label="Due Today" value="5" color="var(--amber-color)" />
        <StatBox label="Resolved (Month)" value="48" color="var(--status-low-text)" />
      </div>

      <div className="glass-panel" style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Case ID</th>
              <th style={styles.th}>Subject / Title</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Assignee</th>
              <th style={styles.th}>Date Created</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} style={styles.tr}>
                <td style={styles.td}><span style={styles.idBadge}>{c.id}</span></td>
                <td style={styles.td}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Briefcase size={14} color="var(--primary-color)" />
                      <span style={{ fontWeight: 600 }}>{c.title}</span>
                   </div>
                </td>
                <td style={styles.td}><StatusBadge status={c.status} /></td>
                <td style={styles.td}><PriorityBadge priority={c.priority} /></td>
                <td style={styles.td}>{c.assignee}</td>
                <td style={styles.td}>{c.date}</td>
                <td style={styles.td}>
                  <button style={styles.iconBtn}><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className="glass-card" style={styles.statBox}>
      <span style={styles.statLabel}>{label}</span>
      <span style={{ ...styles.statValue, color }}>{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const getStyle = () => {
    switch(status) {
      case 'Open': return { bg: 'rgba(91, 156, 255, 0.1)', text: 'var(--electric-blue)' };
      case 'Investigating': return { bg: 'rgba(124, 92, 255, 0.1)', text: 'var(--primary-color)' };
      case 'Escalated': return { bg: 'rgba(245, 185, 66, 0.1)', text: 'var(--amber-color)' };
      case 'Closed': return { bg: 'rgba(16, 185, 129, 0.1)', text: 'var(--status-low-text)' };
      default: return { bg: 'rgba(255,255,255,0.05)', text: 'var(--text-secondary)' };
    }
  };
  const s = getStyle();
  return (
    <span style={{ 
      background: s.bg, 
      color: s.text, 
      padding: '4px 8px', 
      borderRadius: '4px', 
      fontSize: '0.75rem', 
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>{status}</span>
  );
}

function PriorityBadge({ priority }) {
  let color = 'var(--text-secondary)';
  if (priority === 'Critical') color = 'var(--alert-red)';
  if (priority === 'High') color = 'var(--amber-color)';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color, fontSize: '0.85rem', fontWeight: 500 }}>
       <AlertCircle size={14} />
       {priority}
    </div>
  );
}

const styles = {
  container: { paddingBottom: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' },
  title: { fontSize: '2rem', marginBottom: '8px' },
  subtitle: { color: 'var(--text-secondary)', fontSize: '1rem' },
  actions: { display: 'flex', gap: '12px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' },
  statBox: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' },
  statLabel: { fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  statValue: { fontSize: '1.8rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' },
  tableCard: { overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '16px 24px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' },
  tr: { borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' },
  td: { padding: '16px 24px', fontSize: '0.85rem' },
  idBadge: { background: 'rgba(124, 92, 255, 0.1)', color: 'var(--primary-color)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 600 },
  iconBtn: { background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }
};
