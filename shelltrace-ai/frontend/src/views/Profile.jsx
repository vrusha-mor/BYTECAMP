import { User, Mail, Shield, ShieldCheck, FileCheck, Search } from 'lucide-react';

export default function Profile() {
  return (
    <div style={styles.container}>
      
      <div style={styles.profileHeader} className="glass-panel">
        <div style={styles.avatar}>
           <User size={48} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={styles.name}>Alex Sterling</h1>
          <p style={styles.role}>Senior AML Investigator</p>
          <div style={styles.tagLine}>
            <span style={styles.tag}><ShieldCheck size={14} /> Security Level: L-4 (Admin)</span>
            <span style={styles.tag}><span style={styles.dot}></span> Global Intelligence Division</span>
          </div>
        </div>
        <button className="btn btn-secondary">Edit Profile</button>
      </div>

      <div style={styles.grid}>
        <div style={styles.card} className="glass-card">
          <h3 style={styles.cardTitle}>Contact & Organization</h3>
          
          <div style={styles.infoList}>
            <div style={styles.infoRow}>
              <Mail size={16} color="var(--text-secondary)" />
              <span style={styles.infoText}>a.sterling@shelltrace.ai</span>
            </div>
            <div style={styles.infoRow}>
              <Shield size={16} color="var(--text-secondary)" />
              <span style={styles.infoText}>Financial Operations Authority (FOA)</span>
            </div>
          </div>
        </div>

        <div style={{...styles.card, gridColumn: 'span 2'}} className="glass-card">
          <h3 style={styles.cardTitle}>Activity Statistics</h3>
          
          <div style={styles.statsGrid}>
            <div style={styles.statBox}>
              <div style={styles.statIcon}><Search size={24} color="var(--primary-color)" /></div>
              <div style={styles.statValue}>1,402</div>
              <div style={styles.statLabel}>Cases Investigated</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statIcon}><FileCheck size={24} color="var(--neon-violet)" /></div>
              <div style={styles.statValue}>384</div>
              <div style={styles.statLabel}>Reports Generated</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statIcon}><Shield size={24} color="var(--electric-blue)" /></div>
              <div style={styles.statValue}>12,400</div>
              <div style={styles.statLabel}>Alerts Reviewed</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '24px 0',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '32px',
    marginBottom: '32px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'var(--brand-gradient)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 10px 25px rgba(124, 92, 255, 0.4)',
  },
  name: {
    fontSize: '2rem',
    margin: '0 0 4px 0',
  },
  role: {
    color: 'var(--brand-gradient)', // wait, gradients don't work on color directly unless text clip, we'll use text-gradient class
    fontSize: '1.1rem',
    margin: '0 0 12px 0',
    background: 'var(--brand-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 600,
  },
  tagLine: {
    display: 'flex',
    gap: '12px',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--status-low-text)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '24px',
  },
  card: {
    padding: '24px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    margin: '0 0 24px 0',
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  infoText: {
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  statBox: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
  },
  statIcon: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 700,
    fontFamily: 'JetBrains Mono, monospace',
    marginBottom: '4px',
  },
  statLabel: {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
  }
};
