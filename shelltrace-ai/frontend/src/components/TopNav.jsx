import { Search, Bell, Sun, Moon, PlayCircle, Zap } from 'lucide-react';

export default function TopNav({ theme, toggleTheme, onNavigate }) {
  return (
    <div style={styles.container}>
      {/* Brand Identity */}
      <div style={styles.brand}>
        <div style={styles.logoIcon}>N</div>
        <h2 style={styles.brandName}>NEXARA <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>AML INTELLIGENCE</span></h2>
      </div>

      {/* Search Bar */}
      <div style={styles.searchWrap}>
        <Search size={18} color="var(--text-secondary)" />
        <input 
          type="text" 
          placeholder="Global Forensic Search (Entity, TXID, Wallet...)" 
          style={styles.searchInput} 
        />
        <div style={styles.searchShortcut} className="mono">/</div>
      </div>

      {/* Global Actions & Tools */}
      <div style={styles.actions}>
        <button className="btn btn-primary" style={styles.scanBtn}>
          <Zap size={16} fill="white" />
          RUN FULL SCAN
        </button>
        
        <button className="btn btn-secondary" style={styles.toolBtn} onClick={() => onNavigate && onNavigate('Transaction Simulation')}>
          <PlayCircle size={16} />
          SIMULATE
        </button>

        <div style={styles.divider}></div>

        <button style={styles.iconBtn} onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div style={styles.notifyWrap}>
          <button style={styles.iconBtn}>
            <Bell size={20} />
          </button>
          <div style={styles.badge}></div>
        </div>

        <div style={styles.userProfile}>
          <div style={styles.avatar}>A</div>
          <span style={styles.userName}>ANALYST_01</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    borderBottom: '1px solid var(--border-heavy)',
    boxShadow: 'var(--inset-shadow)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '280px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    background: 'var(--btn-primary)',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 800,
    boxShadow: '0 0 15px rgba(188, 0, 255, 0.3)',
  },
  brandName: {
    fontSize: '1rem',
    margin: 0,
    letterSpacing: '0.05em',
    fontWeight: 700,
  },
  searchWrap: {
    flex: 1,
    maxWidth: '500px',
    display: 'flex',
    alignItems: 'center',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-heavy)',
    borderRadius: '8px',
    padding: '0 12px',
    height: '40px',
    position: 'relative',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
  },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    padding: '0 12px',
    outline: 'none',
  },
  searchShortcut: {
    fontSize: '0.7rem',
    background: 'var(--border-color)',
    padding: '2px 8px',
    borderRadius: '4px',
    color: 'var(--text-secondary)',
    fontWeight: 700,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  scanBtn: {
    height: '36px',
    fontSize: '0.75rem',
    fontWeight: 700,
    background: 'var(--btn-primary)',
    boxShadow: '0 4px 12px rgba(188, 0, 255, 0.2)',
    padding: '0 16px',
  },
  toolBtn: {
    height: '36px',
    fontSize: '0.75rem',
    borderColor: 'var(--border-color)',
    padding: '0 16px',
  },
  divider: {
    width: '1px',
    height: '24px',
    background: 'var(--border-color)',
    margin: '0 8px',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  notifyWrap: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '8px',
    height: '8px',
    background: 'var(--accent-orange)',
    borderRadius: '50%',
    border: '2px solid var(--bg-secondary)',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '8px',
    padding: '4px 12px',
    borderRadius: '12px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    background: 'var(--accent-orange)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-inverse)',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  userName: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    fontFamily: 'JetBrains Mono, monospace',
    letterSpacing: '0.05em',
  }
};
