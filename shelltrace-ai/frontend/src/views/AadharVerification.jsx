import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Camera, ShieldCheck, User, Cpu, ChevronRight, Zap, RefreshCcw, FileText, CheckCircle2, Upload } from 'lucide-react';

export default function AadharVerification({ onComplete }) {
  const [step, setStep] = useState('qr-scan'); // 'qr-scan' | 'photo-match' | 'details' | 'verified'
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isScanning && step === 'qr-scan') {
      const interval = setInterval(() => {
        setScanProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            return 100;
          }
          return p + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isScanning, step]);

  const handleUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setStep('photo-match');
      }
    }, 50);
  };

  const handleNext = () => {
    if (step === 'qr-scan') setStep('photo-match');
    else if (step === 'photo-match') setStep('details');
    else if (step === 'details') {
      setStep('verified');
      setTimeout(() => onComplete && onComplete(), 2500);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background forensic elements */}
      <div style={styles.backgroundText} className="mono">IDENTITY_FORENSICS_NODE_772</div>
      
      <AnimatePresence mode="wait">
        {step === 'qr-scan' && (
          <motion.div 
            key="qr"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={styles.pageCard}
            className="glass-panel"
          >
            <div style={styles.header}>
              <h1 style={styles.pageTitle} className="mono">PHASE_01: SCAN_AADHAAR_QR</h1>
              <p style={styles.pageSubtitle}>Target the forensic QR code for real-time decryption</p>
            </div>

            <div style={styles.viewport}>
              {(!isScanning && !isUploading) ? (
                <div style={styles.options}>
                  <button style={styles.optionBtn} onClick={() => setIsScanning(true)}>
                    <Camera size={24} />
                    <span>START SCANNER</span>
                  </button>
                  <label style={styles.optionBtn}>
                    <input type="file" style={{ display: 'none' }} onChange={handleUpload} />
                    <Upload size={24} />
                    <span>UPLOAD IDENTITY</span>
                  </label>
                </div>
              ) : (
                <div style={styles.scanTarget}>
                  <div style={styles.cornerTL}></div><div style={styles.cornerTR}></div>
                  <div style={styles.cornerBL}></div><div style={styles.cornerBR}></div>
                  
                  {isScanning && (
                    <>
                      <motion.div 
                        style={styles.scanLine}
                        animate={{ top: ['10%', '90%', '10%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                      <div style={styles.hologram}>
                        <QrCode size={100} color="var(--primary-color)" style={{opacity: 0.3}} />
                      </div>
                    </>
                  )}

                  {isUploading && (
                    <motion.div 
                      style={styles.uploadOverlay}
                    >
                      <RefreshCcw size={48} color="var(--primary-color)" className="spin" />
                      <div className="mono" style={{marginTop: '16px'}}>PROCESSING_FILE...</div>
                    </motion.div>
                  )}
                </div>
              )}

              {(isScanning || isUploading) && (
                <div style={styles.statusPanel}>
                  <div style={styles.statusHeader} className="mono">
                    <span>{isScanning ? 'SIGNAL_STRENGTH: 98%' : 'FILE_DATA_PARSE'}</span>
                    <span>{isScanning ? scanProgress : uploadProgress}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <motion.div style={{...styles.progressFill, width: `${isScanning ? scanProgress : uploadProgress}%`}} />
                  </div>
                </div>
              )}
            </div>

            {!isScanning && (
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="btn btn-primary" style={styles.mainBtn} onClick={handleNext}
              >
                PROCEED TO PHOTO MATCH <ChevronRight size={18} />
              </motion.button>
            )}
          </motion.div>
        )}

        {step === 'photo-match' && (
          <motion.div 
            key="photo"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={styles.pageCard}
            className="glass-panel"
          >
            <div style={styles.header}>
              <h1 style={styles.pageTitle} className="mono">PHASE_02: BIOMETRIC_RECON</h1>
              <p style={styles.pageSubtitle}>Verifying live capture against system records</p>
            </div>

            <div style={styles.matchGrid}>
              <div style={styles.pBox}>
                <div style={styles.pLabel} className="mono">SYSTEM_RECORD</div>
                <div style={styles.pFrame}>
                  <User size={64} color="var(--text-secondary)" />
                  <div style={styles.pTag} className="mono">ID: 4902-8812</div>
                </div>
              </div>

              <div style={styles.matchStats}>
                <Zap size={24} color="var(--accent-orange)" />
                <div style={styles.matchValue} className="mono">98.4%</div>
                <div style={styles.matchLabel} className="mono">CONFIDENCE</div>
              </div>

              <div style={styles.pBox}>
                <div style={styles.pLabel} className="mono">LIVE_CAPTURE</div>
                <div style={{...styles.pFrame, borderColor: 'var(--accent-orange)'}}>
                  <User size={64} color="var(--accent-orange)" />
                  <motion.div 
                    style={{...styles.scanLine, background: 'var(--accent-orange)', boxShadow: '0 0 10px var(--accent-orange)'}}
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{...styles.mainBtn, background: 'var(--brand-gradient)'}} onClick={handleNext}>
              VERIFY BIOMETRICS <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div 
            key="details"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            style={styles.pageCard}
            className="glass-panel"
          >
            <div style={styles.header}>
              <h1 style={styles.pageTitle} className="mono">PHASE_03: IDENTITY_VALIDATED</h1>
              <p style={styles.pageSubtitle}>Finalizing verified credentials for system access</p>
            </div>

            <div style={styles.detailsList}>
              <DetailRow label="FULL_NAME" value="ARJUN_V_SHARMA" />
              <DetailRow label="AADHAAR_UID" value="XXXX-XXXX-4902" />
              <DetailRow label="DOB" value="12-05-1992" />
              <DetailRow label="GENDER" value="MALE" />
              <DetailRow label="STATUS" value="VERIFIED_FORENSIC" highlight />
            </div>

            <button className="btn btn-primary" style={styles.mainBtn} onClick={handleNext}>
              ENTER NEXARA COMMAND CENTER <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 'verified' && (
          <motion.div 
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{...styles.pageCard, textAlign: 'center', justifyContent: 'center'}}
          >
            <div style={styles.successPulse}>
              <ShieldCheck size={80} color="var(--accent-orange)" />
            </div>
            <h1 style={{fontSize: '2rem', marginTop: '24px'}} className="mono">ACCESS_GRANTED</h1>
            <p style={{color: 'var(--text-secondary)', marginTop: '8px'}}>Redirecting to secure forensic terminal...</p>
            <div style={{marginTop: '40px'}}><RefreshCcw size={32} color="var(--primary-color)" className="spin" /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({ label, value, highlight }) {
  return (
    <div style={styles.detailRow} className="mono">
      <span style={styles.detailLabel}>{label}</span>
      <span style={{...styles.detailValue, color: highlight ? 'var(--accent-orange)' : 'var(--text-primary)'}}>{value}</span>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'var(--bg-primary)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundText: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    opacity: 0.3,
    letterSpacing: '0.4em',
  },
  pageCard: {
    width: '640px',
    padding: '48px',
    borderRadius: '16px',
    background: 'var(--card-gradient)',
    border: '1px solid var(--border-heavy)',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    boxShadow: 'var(--glass-shadow), var(--inset-shadow)',
    backdropFilter: 'blur(20px)',
  },
  header: { textAlign: 'center' },
  pageTitle: { fontSize: '1.6rem', letterSpacing: '0.1em', margin: 0 },
  pageSubtitle: { color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px' },
  viewport: {
    height: '340px',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--border-heavy)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'var(--inset-shadow)',
  },
  scanTarget: {
    width: '200px',
    height: '200px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerTL: { position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', borderTop: '4px solid var(--primary-color)', borderLeft: '4px solid var(--primary-color)' },
  cornerTR: { position: 'absolute', top: 0, right: 0, width: '30px', height: '30px', borderTop: '4px solid var(--primary-color)', borderRight: '4px solid var(--primary-color)' },
  cornerBL: { position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', borderBottom: '4px solid var(--primary-color)', borderLeft: '4px solid var(--primary-color)' },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderBottom: '4px solid var(--primary-color)', borderRight: '4px solid var(--primary-color)' },
  scanLine: { position: 'absolute', left: '5%', right: '5%', height: '2px', background: 'var(--primary-color)', boxShadow: '0 0 15px var(--primary-color)', zIndex: 5 },
  statusPanel: { width: '80%', marginTop: '32px' },
  statusHeader: { display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 },
  progressBar: { height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--brand-gradient)' },
  mainBtn: { height: '60px', borderRadius: '18px', fontSize: '1rem', fontWeight: 800, gap: '12px' },
  options: { display: 'flex', gap: '32px' },
  optionBtn: {
    width: '180px',
    height: '180px',
    borderRadius: '16px',
    background: 'var(--bg-panel)',
    border: '1px solid var(--border-heavy)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: 'var(--glass-shadow), var(--inset-shadow)',
  },
  uploadOverlay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'var(--text-primary)',
  },
  matchGrid: { display: 'grid', gridTemplateColumns: '1fr 120px 1fr', gap: '32px', alignItems: 'center' },
  pBox: { textAlign: 'center' },
  pLabel: { fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: 600 },
  pFrame: { 
    height: '200px', 
    background: 'var(--bg-secondary)', 
    borderRadius: '12px', 
    border: '1px solid var(--border-heavy)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative', 
    overflow: 'hidden',
    boxShadow: 'var(--inset-shadow)',
  },
  pTag: { position: 'absolute', bottom: '12px', fontSize: '0.6rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '4px 12px', borderRadius: '4px', fontWeight: 700, border: '1px solid var(--border-heavy)' },
  matchStats: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' },
  matchValue: { fontSize: '1.8rem', color: 'var(--accent-orange)', fontWeight: 900 },
  matchLabel: { fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 700 },
  detailsList: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '16px', 
    background: 'var(--bg-secondary)', 
    padding: '32px', 
    borderRadius: '12px', 
    border: '1px solid var(--border-heavy)',
    boxShadow: 'var(--inset-shadow)', 
  },
  detailRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid var(--border-heavy)', paddingBottom: '12px' },
  detailLabel: { color: 'var(--text-secondary)', fontWeight: 600 },
  successPulse: { animation: 'pulse-glow 2s infinite', display: 'inline-block' }
};
