import { useState, useEffect } from 'react';
import NexaraGraph from './NexaraGraph';
import DetailViewPanel from '../components/DetailViewPanel';
import { motion, AnimatePresence } from 'framer-motion';

const mockDetectionData = {
  'Circular Flow': [
    { entity: 'Nexus Trading Ltd', hop_count: 3, total_flow: '$4.2M', status: 'SUSPICIOUS', frame: 0 },
    { entity: 'Global Tech Ventures', hop_count: 5, total_flow: '$8.1M', status: 'SUSPICIOUS', frame: 0 },
  ],
  'Smurfing': [
    { entity: 'Viktor Volkov', transaction_count: 142, total_value: '$2.1M', status: 'SUSPICIOUS' },
    { entity: 'Baltic Investments', transaction_count: 89, total_value: '$4.2M', status: 'SUSPICIOUS' },
  ],
  'Velocity': [
    { start_id: 'Wallet_A', end_id: 'Wallet_B', velocity_score: 'High', status: 'SUSPICIOUS' },
    { start_id: 'User_902', end_id: 'Market_01', velocity_score: 'Medium', status: 'CLEARED' },
  ],
  'Codirect.': [
    { entity: 'Shell Co A', director_name: 'John Doe', shared_count: 14, status: 'SUSPICIOUS' },
    { entity: 'Shell Co B', director_name: 'John Doe', shared_count: 14, status: 'SUSPICIOUS' },
  ]
};

const mockGraphElements = [
  { data: { id: 'a', label: 'Nexus Trading', risk: 'Critical', frame: 0 } },
  { data: { id: 'b', label: 'Global Tech', risk: 'High', frame: 1 } },
  { data: { id: 'c', label: 'Oasis Real Estate', risk: 'Medium', frame: 2 } },
  { data: { id: 'ab', source: 'a', target: 'b', type: 'circular', frame: 0 } },
  { data: { id: 'bc', source: 'b', target: 'c', type: 'circular', frame: 1 } },
  { data: { id: 'ca', source: 'c', target: 'a', type: 'circular', frame: 2 } },
];

export default function AnalysisCenter({ activeTab = 'Circular Flow' }) {
  const [viewMode, setViewMode] = useState('table');
  const [activeFrame, setActiveFrame] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Sync data when active tab changes from sidebar
    setData(mockDetectionData[activeTab] || []);
    setViewMode('table');
    setActiveFrame(null);
  }, [activeTab]);

  const handleAction = (type, row) => {
    if (type === 'Circular') {
      setViewMode('timelapse');
      setActiveFrame(0);
    } else {
      console.log('Action triggered:', type, row);
    }
  };

  const handleFrameChange = (frame) => {
    setActiveFrame(frame);
  };

  return (
    <div style={styles.container}>
      {/* Top Half: Graph Visualization */}
      <div style={styles.graphArea}>
        <NexaraGraph 
          elements={mockGraphElements} 
          activeFrame={activeFrame}
          onNodeClick={(node) => console.log('Node selected:', node)}
        />
      </div>

      {/* Bottom Half: Detail Panel */}
      <DetailViewPanel 
        type={activeTab.replace(' Flow', '')}
        data={data}
        viewMode={viewMode}
        onFrameChange={handleFrameChange}
        onAction={handleAction}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  graphArea: {
    flex: 1,
    minHeight: '200px',
    position: 'relative',
    borderBottom: '1px solid var(--border-color)',
  }
};
