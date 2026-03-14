import { useState } from 'react';
import DataTable from './DataTable';
import TimeLapsePlayer from './TimeLapsePlayer';

export default function DetailViewPanel({ 
  type, 
  data, 
  viewMode = 'table', // 'table' or 'timelapse'
  onFrameChange,
  onAction 
}) {
  
  return (
    <div style={styles.container} className="glass-panel">
      <div style={styles.content}>
        {viewMode === 'table' ? (
          <DataTable 
            type={type} 
            data={data} 
            onAction={onAction} 
          />
        ) : (
          <div style={styles.playerContainer}>
            <div style={styles.playerHeader}>
              <h3 style={styles.playerTitle} className="mono">TEMPORAL_ANALYSIS_VIEW: {type.toUpperCase()}</h3>
              <p style={styles.playerDesc}>Reconstructing transactional sequence for forensic playback</p>
            </div>
            <TimeLapsePlayer 
              maxFrames={10} 
              onFrameChange={onFrameChange} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '350px',
    borderTop: '1px solid var(--border-color)',
    background: 'var(--bg-secondary)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflowHeight: 'hidden',
    position: 'relative',
  },
  playerContainer: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  playerHeader: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  playerTitle: {
    fontSize: '1rem',
    color: 'var(--primary-color)',
    letterSpacing: '0.15em',
    margin: 0,
  },
  playerDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  }
};
