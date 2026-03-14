import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TimeLapsePlayer({ maxFrames = 10, onFrameChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame(prev => {
          if (prev >= maxFrames - 1) {
            setIsPlaying(false);
            return prev;
          }
          const next = prev + 1;
          if (onFrameChange) onFrameChange(next);
          return next;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, maxFrames, onFrameChange]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const reset = () => {
    setIsPlaying(false);
    setCurrentFrame(0);
    if (onFrameChange) onFrameChange(0);
  };

  const setFrame = (f) => {
    setCurrentFrame(f);
    if (onFrameChange) onFrameChange(f);
  };

  return (
    <div style={styles.container} className="glass-card">
      <div style={styles.controls}>
        <button style={styles.iconBtn} onClick={reset} title="Reset">
          <RotateCcw size={16} />
        </button>
        
        <button style={styles.iconBtn} onClick={() => setFrame(Math.max(0, currentFrame - 1))}>
          <ChevronLeft size={18} />
        </button>

        <button 
          style={{...styles.playBtn, background: isPlaying ? 'rgba(255, 77, 109, 0.2)' : 'rgba(124, 92, 255, 0.2)'}} 
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={20} color="var(--alert-red)" /> : <Play size={20} color="var(--primary-color)" />}
        </button>

        <button style={styles.iconBtn} onClick={() => setFrame(Math.min(maxFrames - 1, currentFrame + 1))}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div style={styles.timeline}>
        <div style={styles.sliderWrap}>
          <input 
            type="range" 
            min="0" 
            max={maxFrames - 1} 
            value={currentFrame}
            onChange={(e) => setFrame(parseInt(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.ticks}>
            {Array.from({ length: maxFrames }).map((_, i) => (
              <div 
                key={i} 
                style={{
                  ...styles.tick,
                  background: i <= currentFrame ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'
                }} 
              />
            ))}
          </div>
        </div>
        <div style={styles.frameInfo} className="mono">
          <span>STEP {currentFrame + 1} / {maxFrames}</span>
          <span style={{ color: 'var(--text-secondary)' }}>TEMPORAL_RESOLUTION: 800MS</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    margin: '12px 24px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
  playBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  timeline: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sliderWrap: {
    position: 'relative',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: '4px',
    appearance: 'none',
    background: 'transparent',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 2,
  },
  ticks: {
    position: 'absolute',
    top: '10px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 4px',
    zIndex: 1,
  },
  tick: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
  },
  frameInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.65rem',
    color: '#fff',
    letterSpacing: '0.05em',
  }
};
