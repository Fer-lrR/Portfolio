import React, { useState, useEffect } from 'react';
import { Shield, Volume2, Radio, MapPin, Compass } from 'lucide-react';

export const InteractiveGpsRadar: React.FC = () => {
  const [speed, setSpeed] = useState(54.6);
  const [heading, setHeading] = useState(142);
  const [lat, setLat] = useState(-27.1584);
  const [lng, setLng] = useState(-65.4124);
  const [wakeLockActive, setWakeLockActive] = useState(true);
  const [isAlerting, setIsAlerting] = useState(false);
  const [pings, setPings] = useState(284);
  const [audioWave, setAudioWave] = useState([12, 24, 18, 30, 15, 28, 20, 32]);

  // Web Audio API Synthesizer Chirp with dynamic wave simulation
  const triggerAudioChirp = (type: 'danger' | 'info' = 'danger') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type === 'danger' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(type === 'danger' ? 880 : 580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(type === 'danger' ? 440 : 880, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);

      setIsAlerting(true);
      setAudioWave([45, 60, 52, 70, 48, 65, 55, 68]);

      setTimeout(() => {
        setIsAlerting(false);
        setAudioWave([12, 24, 18, 30, 15, 28, 20, 32]);
      }, 700);
    } catch {
      console.log('Audio Context unavailable');
    }
  };

  // Continuous Telemetry Stream Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const delta = (Math.random() * 3 - 1.5);
        const newSpeed = +(prev + delta).toFixed(1);
        return Math.max(30, Math.min(85, newSpeed));
      });
      setHeading((prev) => (prev + 1) % 360);
      setLat((prev) => +(prev + 0.0001).toFixed(4));
      setLng((prev) => -(Math.abs(prev) + 0.00008).toFixed(4));
      setPings((p) => p + 1);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, rgba(11, 19, 41, 0.95) 0%, rgba(2, 6, 23, 0.98) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* HUD Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.5rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(6, 182, 212, 0.2))',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              color: '#06b6d4'
            }}
          >
            <Radio size={20} className={isAlerting ? 'pulse-alert' : ''} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                HUD Telemétrico Satelital
              </h4>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#34d399',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                ● EN VIVO (4s)
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Unidad #104 • Línea Santa Lucía ↔ Monteros • Transporte Santa Lucía SRL
            </p>
          </div>
        </div>

        {/* WakeLock Pill */}
        <button
          onClick={() => setWakeLockActive(!wakeLockActive)}
          className="glass-pill"
          style={{
            cursor: 'pointer',
            padding: '0.4rem 0.85rem',
            color: wakeLockActive ? '#10b981' : '#f43f5e',
            borderColor: wakeLockActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)',
            backgroundColor: wakeLockActive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)'
          }}
          title="Alternar estado de WakeLock"
        >
          <Shield size={14} />
          <span>WakeLock: {wakeLockActive ? 'ACTIVO (Pantalla Bloqueada)' : 'INACTIVO'}</span>
        </button>
      </div>

      {/* Main Telemetry Cockpit */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          gap: '1.5rem',
          alignItems: 'center',
          background: 'rgba(2, 6, 23, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}
        className="cockpit-grid"
      >
        {/* Speedometer Radial Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <svg width="130" height="130" viewBox="0 0 100 100">
            {/* Background Arc */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="8"
              strokeDasharray="212"
              strokeDashoffset="0"
              transform="rotate(135 50 50)"
            />
            {/* Value Arc */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#speedGradient)"
              strokeWidth="8"
              strokeDasharray="212"
              strokeDashoffset={212 - (212 * (speed / 100) * 0.75)}
              strokeLinecap="round"
              transform="rotate(135 50 50)"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="60%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Speed Number Inside Gauge */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f8fafc', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {speed}
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#06b6d4', textTransform: 'uppercase', marginTop: '2px' }}>
              km/h GPS
            </div>
          </div>
        </div>

        {/* Real-time Indicators & Coordinates */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0.6rem',
              padding: '0.75rem'
            }}
          >
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={12} color="#38bdf8" /> Coordenadas GPS
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
              {lat}, {lng}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#10b981', marginTop: '0.2rem' }}>
              Precisión: 2.8m (Satelital)
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0.6rem',
              padding: '0.75rem'
            }}
          >
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Compass size={12} color="#06b6d4" /> Rumbo & Pings
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
              {heading}° SE • #{pings}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#38bdf8', marginTop: '0.2rem' }}>
              Firestore Snapshots Sync
            </div>
          </div>
        </div>
      </div>

      {/* Audio Wave Visualizer & Alert Trigger */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: 'rgba(2, 6, 23, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '0.85rem',
          padding: '0.85rem 1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Dynamic Audio Bars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
            {audioWave.map((h, i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: `${h}px`,
                  backgroundColor: isAlerting ? '#ef4444' : '#06b6d4',
                  borderRadius: '2px',
                  transition: 'height 0.15s ease, background-color 0.2s ease'
                }}
              />
            ))}
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
              Sintetizador Acústico Nativo (Web Audio API)
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              Generación de sonido en cliente sin latencia de red ni archivos .MP3
            </div>
          </div>
        </div>

        <button
          onClick={() => triggerAudioChirp('danger')}
          className="btn-primary"
          style={{
            padding: '0.55rem 1.15rem',
            fontSize: '0.825rem',
            borderRadius: '0.6rem',
            background: isAlerting ? 'linear-gradient(135deg, #dc2626, #f97316)' : 'linear-gradient(135deg, #2563eb, #06b6d4)'
          }}
        >
          <Volume2 size={15} />
          <span>{isAlerting ? '¡Emitiendo Alarma!' : 'Probar Alerta Sonora'}</span>
        </button>
      </div>

      <style>{`
        .pulse-alert {
          animation: pulse-alert-anim 0.4s ease infinite alternate;
        }
        @keyframes pulse-alert-anim {
          from { transform: scale(1); color: #06b6d4; }
          to { transform: scale(1.3); color: #ef4444; }
        }
        @media (max-width: 650px) {
          .cockpit-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
