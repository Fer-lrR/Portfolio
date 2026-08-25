import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX, Play, Pause, ChevronDown, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from './react-bits/SplitText';
import ShinyText from './react-bits/ShinyText';

interface HeroProps {
  onOpenContact: () => void;
  onHeroAnimated?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onHeroAnimated }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showCenterMessage, setShowCenterMessage] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Staged Arrival: First pure clean bright video, then reveal central motorcycle title at ~1.1s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCenterMessage(true);
      onHeroAnimated?.();
    }, 1100);
    return () => clearTimeout(timer);
  }, [onHeroAnimated]);

  // Track scroll to reveal action buttons upon slight scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      colors: ['#c25e00', '#9a3412', '#d97706', '#181a1f']
    });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#07090e'
      }}
    >
      {/* Background Video: 100% Crisp, Natural & Bright */}
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
            filter: 'none',
            transform: 'scale(1.01)'
          }}
        />

        {/* Natural Smooth Blend into Light Canvas at the very bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '180px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(248, 246, 240, 0.6) 65%, #f8f6f0 100%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />
      </div>

      {/* Video Control Pill (Clean Placement Below Navbar Clearance) */}
      <div
        style={{
          position: 'absolute',
          top: '5.25rem',
          right: '1.5rem',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(24, 26, 31, 0.9)',
          border: '1px solid #c25e00',
          borderRadius: '6px',
          padding: '0.4rem 0.85rem',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)'
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
            padding: '0.2rem'
          }}
        >
          {isPlaying ? <Pause size={14} color="#fbbf24" /> : <Play size={14} color="#fbbf24" />}
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
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} color="#fbbf24" />}
        </button>

        <div
          style={{
            height: '14px',
            width: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
            color: '#ffffff',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)'
          }}
        >
          <Compass size={12} color="#fbbf24" />
          <span>RN 38 • TUCUMÁN</span>
        </div>
      </div>

      {/* Main Center Stage: Motorcycle Style Welcome Emblem */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem 1.5rem',
          maxWidth: '960px'
        }}
      >
        <AnimatePresence>
          {showCenterMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '2rem 1.5rem',
                borderRadius: '12px'
              }}
            >
              {/* Big Motorcycle Typography Animated with SplitText */}
              <div
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <SplitText
                  text="Bienvenido, Soy Romano Luis Fernando"
                  className="moto-title-main"
                  delay={40}
                  duration={0.85}
                  ease={[0.22, 1, 0.36, 1]}
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  tag="h1"
                  textAlign="center"
                />
              </div>

              {/* Sub-Headline / Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '2.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  textShadow: '0 2px 16px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                <span>Lead Full Stack Developer</span>
                <span style={{ color: '#fbbf24' }}>•</span>
                <ShinyText text="Systems Architect @ RoDevs" speed={3.5} />
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hasScrolled ? 1 : 0.9,
                  y: 0,
                  scale: hasScrolled ? 1.04 : 1
                }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <a href="#about" className="btn-heritage-primary" style={{ minHeight: '50px', padding: '0.9rem 2.2rem' }}>
                  <span>Ver Proyectos & Perfil</span>
                  <ArrowRight size={18} />
                </a>

                <button
                  onClick={() => {
                    triggerConfetti();
                    onOpenContact();
                  }}
                  className="btn-heritage-secondary"
                  style={{ minHeight: '50px', padding: '0.9rem 2.2rem' }}
                >
                  <span>Contactar Directamente</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Scroll Indicator */}
      <AnimatePresence>
        {showCenterMessage && !hasScrolled && (
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="scroll-indicator-pulse"
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#181a1f',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              fontWeight: 800,
              textTransform: 'uppercase'
            }}
          >
            <span>Deslizá para explorar</span>
            <ChevronDown size={18} color="#c25e00" />
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
