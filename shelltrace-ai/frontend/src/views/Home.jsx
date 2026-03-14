import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Shield, ArrowRight, Activity, Globe, Lock, Search } from 'lucide-react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Globe3D from '../components/Globe3D';

export default function Home({ onNavigate }) {
  return (
    <div style={styles.container}>
      {/* Top Navigation */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <Shield size={24} color="var(--accent-orange)" fill="var(--accent-orange)" fillOpacity={0.2} />
          </div>
          <span style={styles.logoText}>ShellTrace AI</span>
        </div>
        <button 
          style={styles.loginBtnTop} 
          onClick={() => onNavigate('Landing')}
        >
          <Lock size={14} /> Secure Investigator Login
        </button>
      </nav>

      {/* Hero Section */}
      <main style={styles.hero}>
        <div style={styles.heroContent}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={styles.badge}>
              <div style={styles.badgePulse}></div>
              AI-POWERED AML INTELLIGENCE PLATFORM
            </div>
            <h1 style={styles.title}>
              Unmask Hidden <br /><span style={styles.highlight}>Financial Crime</span> <br />Networks
            </h1>
            <p style={styles.subtitle}>
              ShellTrace AI detects money laundering hidden within shell company networks using graph intelligence and AI — empowering investigators at the speed of financial crime.
            </p>

            <div style={styles.buttonGroup}>
              <button 
                className="btn btn-primary" 
                style={styles.mainBtn}
                onClick={() => onNavigate('Landing')}
              >
                + LAUNCH INTELLIGENCE DASHBOARD
              </button>
              <button 
                className="btn btn-secondary" 
                style={styles.secondaryBtn}
                onClick={() => onNavigate('Landing')}
              >
                <Search size={18} /> VIEW INVESTIGATION DEMO
              </button>
            </div>

            {/* Stats */}
            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <div style={styles.statValue}>2.4M+</div>
                <div style={styles.statLabel}>ENTITIES MONITORED</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>18,340</div>
                <div style={styles.statLabel}>ILLICIT CODES DETECTED</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Globe Section */}
        <div style={styles.globeContainer}>
          <Canvas camera={{ position: [0, 0, 58], fov: 45 }}>
            <Suspense fallback={null}>
              <Globe3D />
              <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.1} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </div>
      </main>

      {/* Footer Info */}
      <div style={styles.footerHud} className="mono">
        <div style={styles.hudItem}>SYSTEM_PROTOCOL: <span className="accent-orange">ACTIVE</span></div>
        <div style={styles.hudItem}>ENCRYPTION: AES-256-GCM</div>
        <div style={styles.hudItem}>SECURE_TUNNEL: [STABLE]</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: '#050510',
    color: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    height: '80px',
    padding: '0 60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  loginBtnTop: {
    padding: '10px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '100px',
    color: '#ffffff',
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  },
  hero: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr',
    padding: '0 60px',
    alignItems: 'center',
    gap: '40px',
  },
  heroContent: {
    zIndex: 10,
    maxWidth: '640px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '100px',
    fontSize: '0.7rem',
    fontWeight: 700,
    color: 'var(--accent-orange)',
    marginBottom: '32px',
    letterSpacing: '0.05em',
  },
  badgePulse: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--accent-orange)',
    boxShadow: '0 0 8px var(--accent-orange)',
    animation: 'pulse 1.5s infinite',
  },
  title: {
    fontSize: '4.8rem',
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: '32px',
    letterSpacing: '-0.04em',
  },
  highlight: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #bc00ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    lineHeight: 1.6,
    marginBottom: '48px',
    maxWidth: '500px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    marginBottom: '64px',
  },
  mainBtn: {
    height: '56px',
    padding: '0 32px',
    fontSize: '0.95rem',
    fontWeight: 700,
  },
  secondaryBtn: {
    height: '56px',
    padding: '0 32px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '0.95rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px 60px',
  },
  statItem: {},
  statValue: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '4px',
    color: 'var(--accent-orange)',
  },
  statLabel: {
    fontSize: '0.7rem',
    color: '#475569',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
  globeContainer: {
    height: '100%',
    position: 'relative',
  },
  globeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, transparent 0%, #050510 70%)',
    pointerEvents: 'none',
  },
  footerHud: {
    height: '60px',
    padding: '0 60px',
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    fontSize: '0.7rem',
    color: '#475569',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  }
};
