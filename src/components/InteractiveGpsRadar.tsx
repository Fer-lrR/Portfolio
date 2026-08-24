import React, { useState, useEffect } from 'react';
import { Shield, Volume2, Radio } from 'lucide-react';

export const InteractiveGpsRadar: React.FC = () => {
  const [speed, setSpeed] = useState(48.2);
  const [heading, setHeading] = useState(135);
  const [wakeLockActive, setWakeLockActive] = useState(true);
  const [isAlerting, setIsAlerting] = useState(false);
  const [pingCount, setPingCount] = useState(142);

  // Synthesizer chirp alert with native Web Audio API
  const triggerAudioChirp = (type: 'danger' | 'info' = 'danger') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type === 'danger' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(type === 'danger' ? 880 : 520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(type === 'danger' ? 440 : 880, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);

      setIsAlerting(true);
      setTimeout(() => setIsAlerting(false), 800);
    } catch {
      console.log('Audio Context unavailable');
    }
  };

  // Dynamic telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setHeading((prev) => (prev + 2) % 360);
      setPingCount((p) => p + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: 'rgba(11, 19, 41, 0.85)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              padding: '0.4rem',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.15)',
              color: '#06b6d4',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Radio size={20} className={isAlerting ? 'pulse-alert' : ''} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              Telemetría HUD Satelital (En Vivo)
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Transpondedor PWA en cabina de chofer • Transporte Santa Lucía
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            className="glass-pill"
            style={{
              color: wakeLockActive ? '#10b981' : '#f43f5e',
              borderColor: wakeLockActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'
            }}
          >
            <Shield size={13} /> WakeLock: {wakeLockActive ? 'ACTIVO (Anti-Sleep)' : 'INACTIVO'}
          </span>
        </div>
      </div>

      {/* Main HUD Gauge */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem'
        }}
      >
        <div
          style={{
            background: 'rgba(2, 6, 23, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '0.75rem',
            padding: '0.85rem',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Velocímetro GPS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
            {speed} <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>km/h</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: '#10b981', marginTop: '0.2rem' }}>● Smart Throttling 4s</div>
        </div>

        <div
          style={{
            background: 'rgba(2, 6, 23, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '0.75rem',
            padding: '0.85rem',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Rumbo / Heading</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#06b6d4', fontFamily: 'var(--font-mono)' }}>
            {heading}° <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>SE</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: '#38bdf8', marginTop: '0.2rem' }}>Brújula Gyro Sync</div>
        </div>

        <div
          style={{
            background: 'rgba(2, 6, 23, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '0.75rem',
            padding: '0.85rem',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Pings Satelitales</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#a855f7', fontFamily: 'var(--font-mono)' }}>
            {pingCount}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#a855f7', marginTop: '0.2rem' }}>Firestore Snapshot</div>
        </div>
      </div>

      {/* Action triggers */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => triggerAudioChirp('danger')}
          className="btn-secondary"
          style={{
            flex: 1,
            padding: '0.65rem',
            fontSize: '0.85rem',
            background: isAlerting ? 'rgba(239, 68, 68, 0.3)' : 'rgba(30, 41, 59, 0.8)',
            borderColor: isAlerting ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
            color: '#f8fafc'
          }}
        >
          <Volume2 size={16} color={isAlerting ? '#ef4444' : '#38bdf8'} />
          <span>Sonar Alerta Nativa (Web Audio API)</span>
        </button>

        <button
          onClick={() => setWakeLockActive(!wakeLockActive)}
          className="btn-secondary"
          style={{
            padding: '0.65rem 1rem',
            fontSize: '0.85rem'
          }}
        >
          <Shield size={16} color={wakeLockActive ? '#10b981' : '#f43f5e'} />
          <span>{wakeLockActive ? 'Desactivar WakeLock' : 'Activar WakeLock'}</span>
        </button>
      </div>

      <style>{`
        .pulse-alert {
          animation: pulse-red 0.5s ease infinite alternate;
        }
        @keyframes pulse-red {
          from { color: #06b6d4; transform: scale(1); }
          to { color: #ef4444; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
