import { useState } from 'react';
import { Shield, Bell, Database, Key, Monitor, Smartphone } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Account');

  const tabs = ['Account', 'Security', 'Theme', 'Notifications', 'Data Preferences'];

  return (
    <div style={styles.container}>
      
      <div style={styles.sidebar} className="glass-panel">
        <h2 style={styles.title}>Settings</h2>
        <div style={styles.tabList}>
          {tabs.map(tab => (
            <button 
              key={tab} 
              style={{
                ...styles.tabBtn,
                background: activeTab === tab ? 'var(--nav-hover-bg)' : 'transparent',
                color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
                borderLeft: activeTab === tab ? '3px solid var(--primary-color)' : '3px solid transparent'
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.content}>
        {activeTab === 'Security' && <SecurityTab />}
        {activeTab !== 'Security' && (
          <div className="glass-card" style={styles.placeholderCard}>
            <h3 style={styles.cardTitle}>{activeTab} Settings</h3>
            <p style={{color: 'var(--text-secondary)'}}>Configuration options for {activeTab.toLowerCase()} will appear here.</p>
          </div>
        )}
      </div>

    </div>
  );
}

function SecurityTab() {
  return (
    <div style={styles.tabContent}>
      <h2 style={{...styles.title, marginBottom: '24px'}}>Security & Access</h2>
      
      <div style={styles.section} className="glass-card">
        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.cardTitle}>Two-Factor Authentication (2FA)</h3>
            <p style={styles.cardSubtitle}>Add an extra layer of security to your account</p>
          </div>
          <button className="btn btn-primary">Enable 2FA</button>
        </div>
        <div style={styles.toggleRow}>
          <Smartphone size={18} color="var(--text-secondary)" />
          <span style={{flex: 1, fontSize: '0.9rem'}}>Authenticator App (Recommended)</span>
          <div style={styles.toggleTrack}><div style={styles.toggleThumb}></div></div>
        </div>
      </div>

      <div style={styles.section} className="glass-card">
        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.cardTitle}>Password Management</h3>
            <p style={styles.cardSubtitle}>Last changed 42 days ago</p>
          </div>
        </div>
        <div style={{...styles.toggleRow, borderBottom: 'none'}}>
          <Key size={18} color="var(--text-secondary)" />
          <span style={{flex: 1, fontSize: '0.9rem'}}>Change Password</span>
          <button className="btn btn-secondary">Update</button>
        </div>
      </div>

      <div style={styles.section} className="glass-card">
        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.cardTitle}>Active Sessions</h3>
            <p style={styles.cardSubtitle}>Manage your logged in devices</p>
          </div>
        </div>
        <div style={styles.sessionRow}>
          <Monitor size={20} color="var(--electric-blue)" />
          <div style={{flex: 1}}>
            <div style={{fontSize: '0.9rem', fontWeight: 500}}>Windows PC - Chrome</div>
            <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Current Session • IP: 192.168.1.42</div>
          </div>
          <span style={{color: 'var(--electric-blue)', fontSize: '0.8rem'}}>Active Now</span>
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    gap: '24px',
  },
  title: {
    margin: '0 0 24px 0',
    fontSize: '1.5rem',
  },
  sidebar: {
    width: '240px',
    padding: '24px',
  },
  tabList: {
    display: 'flex',
    flexDirection: 'column',
  },
  tabBtn: {
    padding: '12px 16px',
    border: 'none',
    borderBottom: '1px solid var(--border-color)',
    textAlign: 'left',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
  },
  placeholderCard: {
    padding: '32px',
  },
  tabContent: {
    paddingBottom: '40px',
  },
  section: {
    padding: '24px',
    marginBottom: '24px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '16px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    margin: '0 0 4px 0',
  },
  cardSubtitle: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid var(--border-color)',
  },
  toggleTrack: {
    width: '36px',
    height: '20px',
    background: 'var(--border-color)',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'pointer',
  },
  toggleThumb: {
    width: '16px',
    height: '16px',
    background: 'var(--text-secondary)',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: '2px',
  },
  sessionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
  }
};
