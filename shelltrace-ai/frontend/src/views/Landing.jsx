import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Zap, UserPlus, Fingerprint } from 'lucide-react';
import Network3D from '../components/Network3D';

export default function Landing({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={styles.container}>
      
      {/* Background 3D Network */}
      <div style={styles.backgroundWrap}>
        <Network3D />
      </div>

      {/* Static HUD Elements - Top Left */}
      <div style={styles.topLeftHud} className="mono">
        <div>SEC_PROTOCOL: <span className="accent-orange">ENABLED</span></div>
        <div>ENCR_LEVEL: AES-256-GCM</div>
        <div>TRACE_ROUTE: ACTIVE</div>
      </div>

      {/* Static HUD Elements - Bottom Stats */}
      <div style={styles.bottomHud} className="mono">
        <div style={styles.statusRow}>
          <div style={styles.statusIndicator}></div>
          <span>SYSTEM OPERATIONAL</span>
          <span style={{ marginLeft: '40px' }}>NODE ID: <span style={{ color: '#fff' }}>SH-992-TRACE</span></span>
          <span style={{ marginLeft: '40px' }}>LATENCY: <span style={{ color: '#fff' }}>14MS</span></span>
          <span style={{ marginLeft: '40px' }}>© 2026 SHELLTRACE AI</span>
        </div>
      </div>

      {/* Static HUD Elements - Bottom Right */}
      <div className="mono" style={styles.bottomRightHud}>
        <div>LOC: <span className="accent-orange">12.9716° N, 77.5946° E</span></div>
        <div>CLIENT_V: <span className="accent-orange">4.2.0-STABLE</span></div>
        <div>UPTIME: <span className="accent-orange">99.998%</span></div>
      </div>

      {/* Main Login Interface */}
      <div style={styles.mainInterface}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.logoWrap}
        >
          <div style={styles.logoIconBg}>
            <Shield size={32} color="var(--accent-orange)" fill="var(--accent-orange)" fillOpacity={0.2} />
          </div>
          <h1 style={styles.logoText}>ShellTrace <span style={{ color: 'var(--accent-orange)' }}>AI</span></h1>
        </motion.div>
        
        <p style={styles.tagline} className="mono">INTELLIGENT FINANCIAL SECURITY</p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={styles.loginCard}
          className="glass-panel"
        >
          <div style={styles.cardAccent}></div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label} className="mono">IDENTITY ACCESS</label>
            <div style={styles.inputWrap} className="input-glow">
              <span style={styles.inputIcon}>@</span>
              <input type="text" placeholder="Username or Email" style={styles.input} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={styles.label} className="mono">SECURITY KEY</label>
              <span style={styles.forgotText} className="accent-orange">Forgot Access?</span>
            </div>
            <div style={styles.inputWrap} className="input-glow">
              <Lock size={18} color="#94a3b8" style={styles.inputIcon} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                style={styles.input} 
                defaultValue="password"
              />
              <button style={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                <Eye size={18} color="#94a3b8" />
              </button>
            </div>
          </div>

          <div style={styles.checkboxRow}>
            <input type="checkbox" id="persist" style={styles.checkbox} />
            <label htmlFor="persist" style={styles.checkboxLabel}>Maintain session persistence</label>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={styles.loginBtn}
            onClick={onLogin}
          >
            INITIALIZE LOGIN <Zap size={18} fill="white" />
          </motion.button>

          <div style={styles.divider}>
             <div style={styles.dividerLine}></div>
             <p style={styles.dividerText}>New to the network?</p>
          </div>

          <div style={styles.secondaryActions}>
            <button style={styles.secBtn} className="sec-btn">
              <UserPlus size={18} color="var(--accent-orange)" />
              CREATE
            </button>
            <button 
              style={styles.secBtn} 
              className="sec-btn"
              onClick={() => onLogin('AadharVerification')}
            >
              <Fingerprint size={18} color="var(--accent-orange)" />
              AADHAAR
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  topLeftHud: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    fontSize: '0.7rem',
    color: '#475569',
    lineHeight: 1.8,
    zIndex: 10,
  },
  bottomHud: {
    position: 'absolute',
    bottom: '40px',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.75rem',
    color: '#475569',
    zIndex: 10,
  },
  statusIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#10b981',
    marginRight: '12px',
    boxShadow: '0 0 10px #10b981',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
  },
  bottomRightHud: {
    position: 'absolute',
    bottom: '40px',
    right: '40px',
    textAlign: 'right',
    fontSize: '0.7rem',
    lineHeight: 1.8,
    color: '#475569',
    zIndex: 10,
  },
  mainInterface: {
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '440px',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '12px',
  },
  logoIconBg: {
    width: '48px',
    height: '48px',
    background: 'rgba(245, 158, 11, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(245, 158, 11, 0.2)',
  },
  logoText: {
    fontSize: '2.4rem',
    fontWeight: 700,
    margin: 0,
    fontFamily: 'Space Grotesk, sans-serif',
  },
  tagline: {
    fontSize: '0.75rem',
    color: '#64748b',
    letterSpacing: '0.3em',
    marginBottom: '40px',
  },
  loginCard: {
    width: '100%',
    padding: '48px',
    background: 'var(--card-gradient)',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'var(--glass-shadow)',
    backdropFilter: 'blur(20px)',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '60px',
    height: '2px',
    background: 'var(--brand-gradient)',
  },
  inputGroup: {
    marginBottom: '32px',
  },
  label: {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#64748b',
    marginBottom: '12px',
    letterSpacing: '0.1em',
  },
  inputWrap: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '0 16px',
    height: '56px',
    transition: 'all 0.2s',
  },
  inputIcon: {
    marginRight: '12px',
    color: 'var(--text-secondary)',
  },
  input: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    flex: 1,
    height: '100%',
    outline: 'none',
    fontSize: '1rem',
  },
  forgotText: {
    fontSize: '0.75rem',
    cursor: 'pointer',
    fontWeight: 600,
  },
  eyeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: 'var(--primary-color)',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    cursor: 'pointer',
  },
  loginBtn: {
    width: '100%',
    height: '60px',
    background: 'var(--btn-primary)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 700,
    fontFamily: 'Space Grotesk, sans-serif',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 20px rgba(188, 0, 255, 0.3)',
  },
  divider: {
    textAlign: 'center',
    margin: '32px 0 24px 0',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  dividerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '1px',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  dividerText: {
    background: 'var(--bg-primary)', 
    padding: '0 16px',
    display: 'inline-block',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    position: 'relative',
    zIndex: 2,
  },
  secondaryActions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  secBtn: {
    height: '48px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    color: '#f1f5f9',
    fontSize: '0.8rem',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }
};
