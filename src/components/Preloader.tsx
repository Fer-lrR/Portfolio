import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Iniciando RoDevs Engine...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 12) + 6;
        if (next >= 30 && next < 65) {
          setStatusText('Cargando Módulos de Telemetría & PWA...');
        } else if (next >= 65 && next < 95) {
          setStatusText('Sincronizando Arquitecturas Cloud...');
        } else if (next >= 95) {
          setStatusText('Sistemas Listos • Bienvenido');
        }
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#020617',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: isFading ? 'none' : 'auto'
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 1,
          animation: 'pulse-glow 2s ease-in-out infinite alternate'
        }}
      />

      {/* RoDevs 3D Metallic Shield Logo */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Animated Neon Ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '24px',
              border: '2px solid rgba(6, 182, 212, 0.4)',
              borderTopColor: '#38bdf8',
              borderRightColor: 'transparent',
              animation: 'spin 2.5s linear infinite'
            }}
          />

          <img
            src="/images/rodevs-shield-3d.png"
            alt="RoDevs Shield"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.5))'
            }}
          />
        </div>

        {/* Brand Name */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)'
            }}
          >
            RODEVS<span style={{ color: '#38bdf8' }}> SOFTWARE</span>
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              color: '#94a3b8',
              textTransform: 'uppercase',
              marginTop: '0.25rem'
            }}
          >
            Engineering Portfolio 2026
          </div>
        </div>

        {/* Progress Bar Container */}
        <div style={{ width: '280px', marginTop: '0.5rem' }}>
          <div
            style={{
              width: '100%',
              height: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #2563eb, #06b6d4, #10b981)',
                borderRadius: '9999px',
                transition: 'width 0.15s ease-out',
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.8)'
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.75rem',
              fontSize: '0.75rem',
              color: '#64748b',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span style={{ color: '#94a3b8' }}>{statusText}</span>
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>{progress}%</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          from { transform: scale(0.9); opacity: 0.5; }
          to { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
