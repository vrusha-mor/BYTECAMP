import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const riskData = [
  { name: '0-20', count: 120400 },
  { name: '21-40', count: 45000 },
  { name: '41-60', count: 12400 },
  { name: '61-80', count: 4200 },
  { name: '81-100', count: 854 },
];

const timelineData = [
  { time: '00:00', vol: 400 },
  { time: '04:00', vol: 300 },
  { time: '08:00', vol: 550 },
  { time: '12:00', vol: 850 },
  { time: '16:00', vol: 1200 },
  { time: '20:00', vol: 600 },
  { time: '24:00', vol: 450 },
];

const densityData = [
  { name: 'Mon', density: 0.12 },
  { name: 'Tue', density: 0.15 },
  { name: 'Wed', density: 0.35 },
  { name: 'Thu', density: 0.28 },
  { name: 'Fri', density: 0.45 },
  { name: 'Sat', density: 0.22 },
  { name: 'Sun', density: 0.18 },
];

export default function Analytics() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Advanced AML Analytics</h1>
        <p style={styles.subtitle}>In-depth statistical analysis of financial networks</p>
      </header>

      <div style={styles.grid}>
        
        {/* Risk Distribution Chart */}
        <div style={styles.chartCard} className="glass-card">
          <h3 style={styles.chartTitle}>Entity Risk Score Distribution</h3>
          <div style={styles.chartArea}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => v >= 1000 ? `${v/1000}k` : v} />
                <Tooltip 
                  cursor={{fill: 'rgba(124, 92, 255, 0.05)'}} 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '12px', backdropFilter: 'blur(8px)' }} 
                />
                <Bar dataKey="count" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Volume Timeline */}
        <div style={styles.chartCard} className="glass-card">
          <h3 style={styles.chartTitle}>Transaction Volume anomaly (Electric Blue)</h3>
          <div style={styles.chartArea}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--electric-blue)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--electric-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '12px', backdropFilter: 'blur(8px)' }} />
                <Area type="monotone" dataKey="vol" stroke="var(--electric-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Jurisdiction Risk Breakdown placeholder */}
        <div style={styles.chartCard} className="glass-card">
          <h3 style={styles.chartTitle}>Jurisdiction Risk Breakdown</h3>
          <div style={styles.heatmapPlaceholder}>
            <div style={styles.mapGrid}>
              {[...Array(30)].map((_, i) => (
                <div key={i} style={{
                  ...styles.mapCell,
                  background: Math.random() > 0.8 ? 'var(--alert-red)' : Math.random() > 0.6 ? 'var(--amber-color)' : 'rgba(255,255,255,0.05)',
                  opacity: 0.6
                }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Entity Network Density */}
        <div style={styles.chartCard} className="glass-card">
          <h3 style={styles.chartTitle}>Entity Network Density</h3>
          <div style={styles.chartArea}>
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={densityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
                <Line type="step" dataKey="density" stroke="var(--neon-violet)" strokeWidth={3} dot={{ r: 4, fill: 'var(--neon-violet)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingBottom: '40px',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  chartCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
  },
  chartTitle: {
    fontSize: '1.1rem',
    marginBottom: '24px',
    margin: '0 0 24px 0',
  },
  chartArea: {
    flex: 1,
    minHeight: 0,
  },
  heatmapPlaceholder: {
    flex: 1,
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '4px',
    width: '100%',
    height: '100%',
    padding: '20px',
    opacity: 0.5,
  },
  mapCell: {
    borderRadius: '4px',
  },
  overlayText: {
    position: 'absolute',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  }
};
