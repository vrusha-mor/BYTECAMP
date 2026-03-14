import { Search, Bell, Sun, Moon, PlayCircle, Zap } from 'lucide-react';

export default function TopNav({ theme, toggleTheme, onNavigate }) {
  return (
    <div style={styles.container}>
      {/* Brand Identity */}
      <div style={styles.brand}>
        <div style={styles.logoIcon}>
          <div style={styles.logoCube}></div>
        </div>
        <h2 style={styles.brandName}>NEXARA <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.8rem' }}>AML INTELLIGENCE</span></h2>
      </div>

      {/* Search Bar */}
      <div style={styles.searchWrap}>
        <Search size={16} color="var(--text-secondary)" />
        <input 
          type="text" 
          placeholder="Global Forensic Search (Entity, Entity)" 
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
    width: '28px',
    height: '28px',
    background: 'var(--btn-primary)',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 15px rgba(188, 0, 255, 0.4)',
  },
  logoCube: {
    width: '12px',
    height: '12px',
    border: '2px solid white',
    transform: 'rotate(45deg)',
  },
  brandName: {
    fontSize: '0.9rem',
    margin: 0,
    letterSpacing: '0.08em',
    fontWeight: 800,
    color: '#ffffff',
  },
  searchWrap: {
    flex: 1,
    maxWidth: '400px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-heavy)',
    borderRadius: '8px',
    padding: '0 12px',
    height: '34px',
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '0.8rem',
    padding: '0 12px',
    outline: 'none',
  },
  searchShortcut: {
    fontSize: '0.65rem',
    background: 'rgba(255,255,255,0.1)',
    padding: '2px 6px',
    borderRadius: '4px',
    color: 'var(--text-secondary)',
    fontWeight: 700,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  scanBtn: {
    height: '32px',
    fontSize: '0.7rem',
    fontWeight: 800,
    background: 'var(--btn-primary)',
    boxShadow: '0 0 20px rgba(188, 0, 255, 0.3)',
    padding: '0 16px',
    borderRadius: '8px',
  },
  toolBtn: {
    height: '32px',
    fontSize: '0.7rem',
    fontWeight: 700,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-heavy)',
    padding: '0 16px',
    borderRadius: '8px',
    color: '#ffffff',
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
