import { Building2, User, Globe, Shield, ExternalLink, Search } from 'lucide-react';

const entities = [
  { name: 'Nexus Trading Ltd', type: 'Corporation', jurisdiction: 'Seychelles', risk: 88, status: 'Active', owners: 3 },
  { name: 'Alex Sterling', type: 'Individual', jurisdiction: 'United Kingdom', risk: 12, status: 'Verified', owners: 0 },
  { name: 'Oasis Real Estate', type: 'Corporation', jurisdiction: 'Panama', risk: 65, status: 'Investigating', owners: 5 },
  { name: 'Titan Group', type: 'Corporation', jurisdiction: 'BVI', risk: 92, status: 'Suspended', owners: 8 },
  { name: 'Vancorp Ltd', type: 'Corporation', jurisdiction: 'Cayman Islands', risk: 45, status: 'Active', owners: 2 },
  { name: 'Crimson Holdings', type: 'Corporation', jurisdiction: 'Malta', risk: 78, status: 'Active', owners: 4 },
];

export default function Entities() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ flex: 1 }}>
          <h1 style={styles.title}>Entity Directory</h1>
          <p style={styles.subtitle}>Comprehensive database of individuals and corporate structures</p>
        </div>
        <div style={styles.searchBar}>
          <Search size={18} color="var(--text-secondary)" />
          <input type="text" placeholder="Filter entities..." style={styles.searchInput} />
        </div>
      </header>

      <div style={styles.grid}>
        {entities.map((e) => (
          <div key={e.name} className="glass-card" style={styles.entityCard}>
            <div style={styles.cardHeader}>
              <div style={{ ...styles.typeBadge, background: e.type === 'Individual' ? 'rgba(91, 156, 255, 0.1)' : 'rgba(124, 92, 255, 0.1)' }}>
                {e.type === 'Individual' ? <User size={14} /> : <Building2 size={14} />}
                {e.type}
              </div>
              <div style={{ ...styles.riskTag, color: e.risk > 70 ? 'var(--alert-red)' : e.risk > 40 ? 'var(--amber-color)' : 'var(--status-low-text)' }}>
                 Risk: {e.risk}
              </div>
            </div>
            
            <h3 style={styles.entityName}>{e.name}</h3>
            
            <div style={styles.details}>
              <div style={styles.detailRow}>
                <Globe size={14} color="var(--text-secondary)" />
                <span>{e.jurisdiction}</span>
              </div>
              <div style={styles.detailRow}>
                <Shield size={14} color="var(--text-secondary)" />
                <span>{e.status}</span>
              </div>
            </div>

            <div style={styles.cardFooter}>
              <div style={styles.ownershipInfo}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>UBO Count:</span>
                <span style={{ fontWeight: 600 }}>{e.owners || 'N/A'}</span>
              </div>
              <button className="btn btn-secondary" style={{ padding: '6px' }}>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { paddingBottom: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' },
  title: { fontSize: '2rem', marginBottom: '8px' },
  subtitle: { color: 'var(--text-secondary)', fontSize: '1rem' },
  searchBar: { display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 16px', height: '44px', width: '300px' },
  searchInput: { background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none', width: '100%' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' },
  entityCard: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  typeBadge: { display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)' },
  riskTag: { fontSize: '0.8rem', fontWeight: 700, fontFamily: 'JetBrains Mono' },
  entityName: { fontSize: '1.2rem', fontWeight: 700, margin: 0 },
  details: { display: 'flex', flexDirection: 'column', gap: '8px' },
  detailRow: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' },
  ownershipInfo: { display: 'flex', gap: '8px', alignItems: 'center' }
};
