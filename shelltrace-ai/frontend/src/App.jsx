import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './views/Dashboard';
import NetworkGraph from './views/NetworkGraph';
import Alerts from './views/Alerts';
import InvestigationPanel from './components/InvestigationPanel';
import Simulation from './views/Simulation';
import Analytics from './views/Analytics';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Investigations from './views/Investigations';
import Reports from './views/Reports';
import Cases from './views/Cases';
import Entities from './views/Entities';
import Landing from './views/Landing';
import Home from './views/Home';
import RightPanel from './components/RightPanel';
import AadharVerification from './views/AadharVerification';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeView, setActiveView] = useState('Home');
  const [investigationOpen, setInvestigationOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setInvestigationOpen(true);
  };

  const handleLogin = (targetView = 'AadharVerification') => {
    setActiveView(targetView);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    switch(activeView) {
      case 'Dashboard': return <Dashboard onNavigate={setActiveView} />;
      case 'Circular Flow': 
      case 'Smurfing':
      case 'Velocity':
      case 'Layering':
      case 'PEP':
      case 'Codirect.':
      case 'Anomalies':
      case 'Network Graph': 
        return <NetworkGraph activeTab={activeView} onNodeSelect={handleNodeSelect} />;
      case 'Alerts': return <Alerts onInvestigate={handleNodeSelect} />;
      case 'Investigations': return <Investigations />;
      case 'Reports': return <Reports />;
      case 'Transaction Simulation': return <Simulation />;
      case 'Analytics': return <Analytics />;
      case 'Cases': return <Cases />;
      case 'Entities': return <Entities />;
      case 'Profile': return <Profile />;
      case 'Settings': return <Settings />;
      default: return <Dashboard onNavigate={setActiveView} />;
    }
  };

  if (activeView === 'Home') {
    return <Home onNavigate={setActiveView} />;
  }

  if (activeView === 'Landing') {
    return <Landing onLogin={handleLogin} />;
  }

  if (activeView === 'AadharVerification') {
    return <AadharVerification onComplete={() => setActiveView('Dashboard')} />;
  }

  return (
    <div className="nexara-grid">
      <header className="nexara-header">
        <TopNav theme={theme} toggleTheme={toggleTheme} activeView={activeView} />
      </header>
      
      <aside className="nexara-sidebar">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />
      </aside>
      
      <main className="nexara-center content-area">
        {renderView()}
      </main>

      <section className="nexara-right">
        <RightPanel onNavigate={setActiveView} />
      </section>

      <InvestigationPanel 
        isOpen={investigationOpen} 
        onClose={() => setInvestigationOpen(false)} 
        nodeData={selectedNode}
      />
    </div>
  );
}

export default App;
