import { useState } from 'react';
import { Send, Play, Database, History, DollarSign, Calendar, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Simulation() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState({
    sender: 'Nexus Trading Ltd',
    receiver: 'Oasis Real Estate',
    amount: '450000',
    type: 'SWIFT Transfer',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSimulate = () => {
    setLoading(true);
    setComplete(false);
    setTimeout(() => {
      setLoading(false);
      setComplete(true);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Transaction Simulation Hub</h1>
        <p style={styles.subtitle}>Test AML rule sensitivity by injecting simulated transaction flows</p>
      </header>

      <div style={styles.grid}>
        {/* Simulation Form */}
        <div className="glass-card" style={styles.card}>
          <div style={styles.formHeader}>
            <div style={styles.iconWrap} className="glow-magenta"><Database size={20} color="var(--primary-color)" /></div>
            <h3 style={styles.cardTitle} className="mono">Injection Parameters</h3>
          </div>
          
          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label} className="mono">Sender Company / Entity</label>
              <input 
                type="text" 
                style={styles.input} 
                value={formData.sender}
                onChange={e => setFormData({...formData, sender: e.target.value})}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} className="mono">Receiver Company / Entity</label>
              <input 
                type="text" 
                style={styles.input} 
                value={formData.receiver}
                onChange={e => setFormData({...formData, receiver: e.target.value})}
              />
            </div>
            
            <div style={styles.row}>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label} className="mono">Amount (USD)</label>
                <div style={{position: 'relative'}}>
                  <DollarSign size={14} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)'}} />
                  <input 
                    type="number" 
                    style={{...styles.input, paddingLeft: '28px'}} 
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    className="mono"
                  />
                </div>
              </div>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label} className="mono">Transaction Type</label>
                <select 
                  style={styles.input}
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option>SWIFT Transfer</option>
                  <option>Crypto Settlement</option>
                  <option>Shell Invoice</option>
                  <option>Inter-company Loan</option>
                </select>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              style={styles.injectBtn}
              onClick={handleSimulate}
              disabled={loading}
            >
              {loading ? 'INITIALIZING...' : <><Send size={18} /> INJECT TRANSACTION</>}
            </button>
          </div>
        </div>

        {/* Visualization Output */}
        <div className="glass-card" style={styles.card}>
          <div style={styles.formHeader}>
            <div style={{...styles.iconWrap, background: 'rgba(245, 158, 11, 0.1)'}}><Play size={20} color="var(--accent-orange)" /></div>
            <h3 style={styles.cardTitle} className="mono">Live Execution View</h3>
          </div>
          
          <div style={styles.vizArea}>
            {!loading && !complete ? (
              <p style={styles.blankText} className="mono">Ready for injection...</p>
            ) : (
              <div style={styles.visContent}>
                <div style={styles.nodeColumn}>
                  <div style={styles.node} className="glass-card">
                    <span style={styles.nodeLabel} className="mono">SENDER</span>
                    <span style={styles.nodeName}>{formData.sender}</span>
                  </div>
                </div>
                
                <div style={styles.pathColumn}>
                  <svg width="100%" height="40">
                    <line x1="0" y1="20" x2="100%" y2="20" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5" />
                    {loading && (
                      <motion.circle 
                        cx="0" cy="20" r="5" 
                        fill="var(--accent-orange)"
                        animate={{ cx: "100%" }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </svg>
                  <div style={styles.amountDisplay} className="mono accent-orange">${formData.amount}</div>
                </div>

                <div style={styles.nodeColumn}>
                  <div style={{...styles.node, borderColor: complete ? 'var(--accent-orange)' : 'var(--border-color)'}} className="glass-card">
                    <span style={styles.nodeLabel} className="mono">RECEIVER</span>
                    <span style={styles.nodeName}>{formData.receiver}</span>
                    {complete && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={styles.alertFlag} 
                        className="mono"
                      >
                        SUSPICIOUS LINK
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={styles.historyList}>
             <div style={styles.historyItem}>
                <History size={14} color="var(--text-secondary)" />
                <span style={styles.historyText} className="mono">Last run: <span className="accent-orange">Circular Flow Detected</span></span>
                <span style={styles.historyTime} className="mono">2M AGO</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { paddingBottom: '40px' },
  header: { marginBottom: '32px' },
  title: { fontSize: '2rem', marginBottom: '8px', fontWeight: 700 },
  subtitle: { color: 'var(--text-secondary)', fontSize: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 1.5fr', gap: '24px' },
  card: { padding: '24px', display: 'flex', flexDirection: 'column' },
  formHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' },
  iconWrap: { width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(188, 0, 255, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontSize: '1rem', margin: 0, fontWeight: 700 },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 },
  input: { background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', width: '100%' },
  row: { display: 'flex', gap: '16px' },
  injectBtn: { marginTop: '12px', width: '100%', height: '48px', gap: '10px', fontWeight: 700, letterSpacing: '0.05em' },
  vizArea: { flex: 1, minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border-color)', position: 'relative' },
  blankText: { color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.5 },
  visContent: { display: 'flex', alignItems: 'center', width: '100%', padding: '0 40px', gap: '20px' },
  nodeColumn: { flex: 1 },
  pathColumn: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  node: { padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center', position: 'relative', background: 'var(--bg-secondary)' },
  nodeLabel: { fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 700 },
  nodeName: { fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' },
  amountDisplay: { fontSize: '0.9rem', fontWeight: 700 },
  alertFlag: { position: 'absolute', top: '-10px', right: '-10px', background: 'var(--accent-orange)', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800, boxShadow: '0 0 15px rgba(245, 158, 11, 0.5)' },
  historyList: { marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' },
  historyItem: { display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 },
  historyText: { fontSize: '0.75rem', flex: 1, color: 'var(--text-secondary)' },
  historyTime: { fontSize: '0.7rem', color: 'var(--text-secondary)' }
};
