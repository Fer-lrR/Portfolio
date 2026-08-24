import React, { useState, useEffect } from 'react';
import { Shield, Volume2, Radio, MapPin, Compass } from 'lucide-react';

export const InteractiveGpsRadar: React.FC = () => {
  const [speed, setSpeed] = useState(54.6);
  const [heading, setHeading] = useState(142);
  const [lat, setLat] = useState(-27.1584);
  const [lng, setLng] = useState(-65.4124);
  const [wakeLockActive, setWakeLockActive] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [pings, setPings] = useState(284);
  const [audioWave, setAudioWave] = useState([10, 18, 14, 22, 12, 20, 16, 24]);

  // High-End Luxury Sonar Ping & Telemetry Chime (Gentle dual sine chord with exponential decay)
  const playTelemetryChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      // Master Gain for smooth volume control
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      masterGain.connect(ctx.destination);

      // Primary Harmonious Tone (C5 - 523.25 Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.12); // Bell-like sparkle
      osc1.connect(masterGain);

      // Secondary Overtone (G5 - 783.99 Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, ctx.currentTime);
      osc2.connect(masterGain);

      osc1.start();
      osc2.start();

      osc1.stop(ctx.currentTime + 0.55);
      osc2.stop(ctx.currentTime + 0.55);

      setIsPlayingAudio(true);
      setAudioWave([30, 48, 40, 56, 38, 50, 42, 54]);

      setTimeout(() => {
        setIsPlayingAudio(false);
        setAudioWave([10, 18, 14, 22, 12, 20, 16, 24]);
      }, 550);
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
            <Radio size={20} className={isPlayingAudio ? 'pulse-alert' : ''} />
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

      {/* Audio Wave Visualizer & Luxury Sonar Ping Trigger */}
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
                  backgroundColor: isPlayingAudio ? '#38bdf8' : '#06b6d4',
                  borderRadius: '2px',
                  transition: 'height 0.15s ease, background-color 0.2s ease'
                }}
              />
            ))}
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
              Telemetría Acústica Digital (Web Audio API)
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              Tono armónico C5 + G5 con decaimiento exponencial suave en cliente
            </div>
          </div>
        </div>

        <button
          onClick={playTelemetryChime}
          className="btn-primary"
          style={{
            padding: '0.55rem 1.15rem',
            fontSize: '0.825rem',
            borderRadius: '0.6rem',
            background: isPlayingAudio ? 'linear-gradient(135deg, #06b6d4, #10b981)' : 'linear-gradient(135deg, #2563eb, #06b6d4)'
          }}
        >
          <Volume2 size={15} />
          <span>{isPlayingAudio ? 'Emitiendo Chime...' : 'Probar Tono Digital'}</span>
        </button>
      </div>

      <style>{`
        .pulse-alert {
          animation: pulse-alert-anim 0.5s ease infinite alternate;
        }
        @keyframes pulse-alert-anim {
          from { transform: scale(1); color: #06b6d4; }
          to { transform: scale(1.25); color: #38bdf8; }
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
