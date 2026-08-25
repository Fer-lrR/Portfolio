import React, { useState, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Volume2, VolumeX, Play, Pause, Compass, Shield, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DecryptedText } from './react-bits/DecryptedText';
import { ShinyText } from './react-bits/ShinyText';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#d97706', '#38bdf8', '#ffffff']
    });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '6.5rem',
        paddingBottom: '4.5rem',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #07090e 0%, #0c0f16 50%, #06080d 100%)'
      }}
    >
      {/* Background Cinematic Video with Vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        <video
          ref={videoRef}
          src="/video/motoloop.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            filter: 'brightness(0.55) contrast(1.15) saturate(0.85)',
            transform: 'scale(1.03)',
            transition: 'filter 0.5s ease'
          }}
        />

        {/* Multi-layer Dark Vignette & Film Overlays */}
        <div className="video-hero-vignette" />
        <div className="film-scanlines" />

        {/* Ambient Warm Filament Glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Top Mechanical Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}
        >
          {/* Stamps Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div className="heritage-stamp">
              <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>●</span>
              <span>EST. 2024 • RODEVS ENGINEERING</span>
            </div>

            <div
              className="glass-pill"
              style={{
                borderColor: 'rgba(217, 119, 6, 0.35)',
                background: 'rgba(15, 20, 30, 0.75)',
                color: '#f8fafc',
                padding: '0.35rem 0.85rem'
              }}
            >
              <Shield size={13} color="#f59e0b" />
              <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>Arquitectura de Alta Resistencia</span>
            </div>
          </div>

          {/* Video Controls & Telemetry HUD Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(8, 11, 17, 0.85)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              borderRadius: '6px',
              padding: '0.3rem 0.6rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <button
              onClick={togglePlay}
              title={isPlaying ? 'Pausar video' : 'Reproducir video'}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#f8fafc',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.2rem',
                borderRadius: '4px'
              }}
            >
              {isPlaying ? <Pause size={14} color="#f59e0b" /> : <Play size={14} color="#f59e0b" />}
            </button>

            <button
              onClick={toggleMute}
              title={isMuted ? 'Activar audio' : 'Silenciar'}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.2rem'
              }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} color="#38bdf8" />}
            </button>

            <div
              style={{
                height: '14px',
                width: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                margin: '0 0.25rem'
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#94a3b8'
              }}
            >
              <Compass size={12} color="#f59e0b" />
              <span>RN 38 • TUCUMÁN</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Headline & Presentation Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="hero-main-grid"
        >
          {/* Left Column: Hero Copy with React Bits DecryptedText */}
          <div>
            {/* Tagline Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#fbbf24',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              <Sparkles size={14} color="#f59e0b" />
              <span>Made to Endure • Built Tough Software</span>
            </div>

            {/* Main Headline with DecryptedText Animation */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.6vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.14,
                marginBottom: '1.4rem',
                color: '#ffffff',
                textShadow: '0 4px 24px rgba(0, 0, 0, 0.8)'
              }}
            >
              Ingeniería Forjada para Resistir. <br />
              <span style={{ color: '#f59e0b' }}>
                <DecryptedText
                  text="Sistemas en Tiempo Real"
                  speed={38}
                  animateOn="mount"
                  className="gradient-text-amber"
                  encryptedClassName="text-amber-600 opacity-60"
                />
              </span> <br />
              & <ShinyText text="Arquitectura de Precisión" speed={3.5} />
            </h1>

            {/* Presentation Message */}
            <div
              className="mechanical-frame"
              style={{
                padding: '1.35rem 1.6rem',
                marginBottom: '2rem',
                maxWidth: '640px',
                borderLeft: '4px solid #d97706'
              }}
            >
              <p
                style={{
                  fontSize: '1.02rem',
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                  margin: 0
                }}
              >
                Soy <strong style={{ color: '#ffffff', fontWeight: 700 }}>Luis Fernando Romano</strong>. Lead Full Stack Developer & Systems Architect en <strong style={{ color: '#fbbf24' }}>RoDevs Software</strong>, estudiante de Ingeniería en Sistemas (UTN - FRT) y Ayudante de Cátedra en Algoritmos. Construimos plataformas de telemetría vehicular en vivo, streaming de audio continuo y aplicaciones cloud con la tenacidad mecánica de los grandes motores.
              </p>
            </div>

            {/* Action Buttons with Heritage Theme */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a href="#projects" className="btn-heritage-primary" style={{ minHeight: '48px' }}>
                <span>Explorar Proyectos en Producción</span>
                <ArrowRight size={17} />
              </a>

              <button
                onClick={() => {
                  triggerConfetti();
                  onOpenContact();
                }}
                className="btn-heritage-secondary"
                style={{ minHeight: '48px' }}
              >
                <span>Iniciar Contacto Directo</span>
              </button>
            </div>

            {/* Mechanical Telemetry Gauges (ATS Metrics) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                gap: '0.85rem',
                background: 'rgba(10, 14, 22, 0.8)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: '8px',
                padding: '1.15rem 1.35rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)'
              }}
            >
              {PERSONAL_INFO.metrics.map((metric, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div
                    style={{
                      fontSize: '1.65rem',
                      fontWeight: 800,
                      color: '#f8fafc',
                      fontFamily: 'var(--font-mono)',
                      lineHeight: 1.1
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#fbbf24',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginTop: '0.2rem'
                    }}
                  >
                    {metric.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.1rem' }}>
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-End Rugged Photo & Identity Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="mechanical-frame"
              style={{
                padding: '1.25rem',
                maxWidth: '380px',
                width: '100%',
                border: '1px solid rgba(217, 119, 6, 0.4)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 25px rgba(217, 119, 6, 0.15)'
              }}
            >
              {/* Photo Container with Bronze/Amber Bezel */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7)'
                }}
              >
                <img
                  src="/images/luis-romano.jpg"
                  alt="Luis Fernando Romano - Systems Architect & Full Stack Lead"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    filter: 'contrast(1.05) brightness(0.96)'
                  }}
                />

                {/* Floating Rugged Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    left: '0.85rem',
                    right: '0.85rem',
                    backgroundColor: 'rgba(8, 11, 17, 0.92)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(217, 119, 6, 0.35)',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc', letterSpacing: '-0.01em' }}>
                    Luis Fernando Romano
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#fbbf24',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    Lead Full Stack • Co-Founder RoDevs
                  </div>
                </div>
              </div>

              {/* Bottom Badges */}
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 0.4rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                  <Award size={14} color="#f59e0b" />
                  <span>Ingeniería UTN</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                  <Shield size={14} color="#38bdf8" />
                  <span>Ayudante Algoritmos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
