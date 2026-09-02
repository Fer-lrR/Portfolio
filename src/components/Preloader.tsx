import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronRight } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [rpm, setRpm] = useState(0); // 0 to 100
  const [isRevving, setIsRevving] = useState(false);
  const [isDecelerating, setIsDecelerating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [throttleAngle, setThrottleAngle] = useState(0); // 0 to 35 deg

  // Audio Context refs for realistic Royal Enfield engine synthesis
  const audioCtxRef = useRef<AudioContext | null>(null);
  const engineGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isRevvingRef = useRef(false);
  const isCompletedRef = useRef(false);

  // Initialize Web Audio Engine
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(soundEnabled ? 0.28 : 0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      engineGainRef.current = masterGain;

      // Lowpass Filter for deep mechanical exhaust rumble
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Primary Cylinder Thump Oscillator (Sawtooth)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(30, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      // Secondary Harmonic Oscillator (Triangle)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(60, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;

      audioCtxRef.current = ctx;
    } catch {
      // Audio fallback
    }
  }, [soundEnabled]);

  // Generate short acoustic exhaust pop / petardeo de caño de escape
  const playExhaustPop = useCallback((ctx: AudioContext, delayMs: number, intensity: number) => {
    setTimeout(() => {
      if (!ctx || ctx.state === 'closed') return;
      try {
        const now = ctx.currentTime;
        // White noise buffer for exhaust pressure burst
        const bufferSize = ctx.sampleRate * 0.08;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const popFilter = ctx.createBiquadFilter();
        popFilter.type = 'bandpass';
        popFilter.frequency.setValueAtTime(140 + Math.random() * 80, now);
        popFilter.Q.setValueAtTime(3.5, now);

        const popGain = ctx.createGain();
        popGain.gain.setValueAtTime(0.35 * intensity, now);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        noise.connect(popFilter);
        popFilter.connect(popGain);
        popGain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.09);
      } catch {
        // audio fallback
      }
    }, delayMs);
  }, []);

  // Trigger realistic throttle-chop / exhaust over-run when reaching 100%
  const triggerExhaustDeceleration = useCallback(() => {
    if (!audioCtxRef.current || !soundEnabled) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Drop engine frequency down rapidly
    if (osc1Ref.current) {
      osc1Ref.current.frequency.cancelScheduledValues(now);
      osc1Ref.current.frequency.setValueAtTime(116, now);
      osc1Ref.current.frequency.exponentialRampToValueAtTime(26, now + 0.65);
    }
    if (osc2Ref.current) {
      osc2Ref.current.frequency.cancelScheduledValues(now);
      osc2Ref.current.frequency.setValueAtTime(232, now);
      osc2Ref.current.frequency.exponentialRampToValueAtTime(52, now + 0.65);
    }
    if (filterRef.current) {
      filterRef.current.frequency.cancelScheduledValues(now);
      filterRef.current.frequency.setValueAtTime(700, now);
      filterRef.current.frequency.exponentialRampToValueAtTime(160, now + 0.7);
    }

    // Sequence of 4 authentic exhaust pops / petardeos al cortar gas
    playExhaustPop(ctx, 80, 1.0);
    playExhaustPop(ctx, 220, 0.85);
    playExhaustPop(ctx, 380, 0.65);
    playExhaustPop(ctx, 540, 0.45);
  }, [soundEnabled, playExhaustPop]);

  // Update engine sound pitch based on RPM
  const updateEngineAudio = useCallback((currentRpm: number) => {
    if (!audioCtxRef.current || !soundEnabled || isCompletedRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // RPM 0-100 maps to frequencies
    const baseFreq = 28 + (currentRpm / 100) * 88; // 28Hz idle -> 116Hz max roar
    const filterFreq = 150 + (currentRpm / 100) * 580; // 150Hz -> 730Hz open throttle
    const gainLevel = 0.2 + (currentRpm / 100) * 0.25;

    if (osc1Ref.current) {
      osc1Ref.current.frequency.setTargetAtTime(baseFreq, now, 0.04);
    }
    if (osc2Ref.current) {
      osc2Ref.current.frequency.setTargetAtTime(baseFreq * 2, now, 0.04);
    }
    if (filterRef.current) {
      filterRef.current.frequency.setTargetAtTime(filterFreq, now, 0.04);
    }
    if (engineGainRef.current) {
      engineGainRef.current.gain.setTargetAtTime(gainLevel, now, 0.04);
    }
  }, [soundEnabled]);

  // Toggle sound
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (engineGainRef.current && audioCtxRef.current) {
      engineGainRef.current.gain.setTargetAtTime(next ? 0.28 : 0, audioCtxRef.current.currentTime, 0.05);
    }
  };

  // Start accelerating
  const startRevving = () => {
    if (isCompletedRef.current) return;
    initAudio();
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    isRevvingRef.current = true;
    setIsRevving(true);
  };

  // Stop accelerating
  const stopRevving = () => {
    if (isCompletedRef.current) return;
    isRevvingRef.current = false;
    setIsRevving(false);
  };

  // Main RPM physics loop
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      if (isCompletedRef.current) return;

      setRpm((prev) => {
        let next: number;
        if (isRevvingRef.current) {
          // Accelerate smoothly
          next = prev + 1.85;
          if (next >= 100) {
            next = 100;
            isCompletedRef.current = true;
            isRevvingRef.current = false;
            setIsRevving(false);
            setIsDecelerating(true);

            // Trigger the iconic deceleration burble & throttle snapback!
            triggerExhaustDeceleration();

            // Animate fadeout smoothly over 1.2s into Hero section
            setTimeout(() => {
              setIsFadingOut(true);
              setTimeout(() => {
                if (audioCtxRef.current) {
                  audioCtxRef.current.close().catch(() => {});
                }
                onComplete();
              }, 800);
            }, 650);
          }
        } else {
          // Decay when throttle released before completion
          next = prev - 2.2;
          if (next < 0) next = 0;
        }

        // Throttle handlebar visual rotation
        setThrottleAngle((next / 100) * 32);
        updateEngineAudio(next);
        return next;
      });
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete, updateEngineAudio, triggerExhaustDeceleration]);

  // Keyboard accessibility: hold Spacebar or ArrowUp / ArrowRight to rev
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowRight') {
        e.preventDefault();
        startRevving();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowRight') {
        e.preventDefault();
        stopRevving();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Speedometer Needle Angle (-125 deg at 0 km/h to +125 deg at 100 km/h)
  const needleDeg = isDecelerating ? -125 + (rpm * 0.15 - 125) : -125 + (rpm / 100) * 250;

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
            backgroundColor: '#0a080c',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'clamp(0.4rem, 1.5vh, 1.25rem) clamp(0.5rem, 2vw, 1rem)',
            overflow: 'hidden',
            userSelect: 'none',
            boxSizing: 'border-box'
          }}
        >
          {/* Background Tank Image with Studio Ambient Lighting */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/preloader/royal-enfield-tank.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              filter: isRevving ? 'brightness(1.08) contrast(1.05)' : isDecelerating ? 'brightness(0.98)' : 'brightness(0.95)',
              transform: isRevving ? `scale(${1 + (rpm / 100) * 0.03})` : 'scale(1)',
              transition: 'transform 0.15s ease-out, filter 0.2s ease-out',
              zIndex: 1
            }}
          />

          {/* Vignette & Spotlight Overlays */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.12) 0%, rgba(10,8,12,0.88) 85%)',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />

          {/* Top Bar: Luis Fernando Romano Branding & Controls */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '1200px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', gap: '0.4rem' }}>
              {/* Luis Fernando Romano Badge with Fixed Round Aspect Ratio */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0, flexShrink: 1 }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    minWidth: '34px',
                    minHeight: '34px',
                    flexShrink: 0,
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    backgroundColor: '#c25e00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(194, 94, 0, 0.45)',
                    border: '1px solid #fed7aa'
                  }}
                >
                  <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>LR</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                  <span style={{ fontSize: 'clamp(0.72rem, 3.2vw, 0.95rem)', fontWeight: 900, letterSpacing: '0.04em', color: '#ffffff', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    LUIS FERNANDO ROMANO
                  </span>
                  <span style={{ fontSize: 'clamp(0.55rem, 2.2vw, 0.64rem)', color: '#fed7aa', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Full Stack Developer • RoDevs
                  </span>
                </div>
              </div>

              {/* Controls: Audio Toggle & Quick Skip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                <button
                  onClick={toggleSound}
                  style={{
                    background: 'rgba(24, 26, 31, 0.85)',
                    border: '1px solid #4b5563',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    minHeight: '32px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: soundEnabled ? '#fed7aa' : '#9ca3af',
                    cursor: 'pointer'
                  }}
                  title={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
                >
                  {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>

                <button
                  onClick={() => {
                    isCompletedRef.current = true;
                    setIsFadingOut(true);
                    setTimeout(onComplete, 400);
                  }}
                  style={{
                    background: 'rgba(24, 26, 31, 0.85)',
                    border: '1px solid #4b5563',
                    borderRadius: '20px',
                    padding: '0.3rem 0.65rem',
                    color: '#e5e7eb',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>Entrar</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

            {/* Title: BIENVENIDO */}
            <div style={{ marginTop: 'clamp(0.25rem, 0.8vh, 0.75rem)', textAlign: 'center' }}>
              <h1
                style={{
                  fontSize: 'clamp(1.15rem, 3.2vw, 2.4rem)',
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  color: '#f8f6f0',
                  textTransform: 'uppercase',
                  fontFamily: 'serif',
                  textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 30px rgba(254, 215, 170, 0.25)',
                  margin: 0
                }}
              >
                BIENVENIDO
              </h1>
            </div>
          </div>

          {/* Bottom Interactive Dashboard: Speedometer + Realistic Throttle Handlebar */}
          <div
            className="preloader-dashboard-grid"
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 2vh, 3.5rem)',
              width: '100%',
              maxWidth: '980px',
              paddingBottom: '0.25rem'
            }}
          >
            {/* Speedometer (Velocímetro Royal Enfield Vintage) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <div
                className="preloader-speedometer-box"
                style={{
                  width: 'clamp(125px, 17vh, 195px)',
                  height: 'clamp(125px, 17vh, 195px)',
                  borderRadius: '50%',
                  backgroundColor: '#0c0a0e',
                  border: '4px solid #27221e',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.9), inset 0 0 16px rgba(0,0,0,0.9), 0 0 12px rgba(217, 119, 6, 0.25)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                {/* Vintage Cream Gauge Face */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#f1e6d4',
                    backgroundImage: 'radial-gradient(circle, #fbf7ee 50%, #d8caa7 100%)',
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.45)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Gauge SVG Marks & Numbers */}
                  <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0 }}>
                    {/* Tick Marks (0 to 100 km/h) */}
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((val, idx) => {
                      const angle = -125 + (idx / 10) * 250;
                      const rad = ((angle - 90) * Math.PI) / 180;
                      const x1 = 100 + 74 * Math.cos(rad);
                      const y1 = 100 + 74 * Math.sin(rad);
                      const x2 = 100 + 84 * Math.cos(rad);
                      const y2 = 100 + 84 * Math.sin(rad);
                      const textX = 100 + 60 * Math.cos(rad);
                      const textY = 100 + 60 * Math.sin(rad);

                      return (
                        <g key={val}>
                          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#181a1f" strokeWidth="2.5" strokeLinecap="round" />
                          <text
                            x={textX}
                            y={textY + 4}
                            fill="#181a1f"
                            fontSize="10.5"
                            fontWeight="800"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {/* Small subdivision ticks */}
                    {Array.from({ length: 21 }).map((_, idx) => {
                      const angle = -125 + (idx / 20) * 250;
                      const rad = ((angle - 90) * Math.PI) / 180;
                      const x1 = 100 + 79 * Math.cos(rad);
                      const y1 = 100 + 79 * Math.sin(rad);
                      const x2 = 100 + 84 * Math.cos(rad);
                      const y2 = 100 + 84 * Math.sin(rad);
                      return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth="1.2" />;
                    })}

                    {/* Clean Centered Gauge Branding without number collision */}
                    <text
                      x="100"
                      y="74"
                      fill="#8a2b0e"
                      fontSize="9"
                      fontWeight="900"
                      letterSpacing="1"
                      textAnchor="middle"
                      fontFamily="serif"
                    >
                      ROYAL ENFIELD
                    </text>
                    <text
                      x="100"
                      y="85"
                      fill="#6b7280"
                      fontSize="6.5"
                      fontStyle="italic"
                      letterSpacing="0.5"
                      textAnchor="middle"
                      fontFamily="serif"
                    >
                      Gun-badge
                    </text>
                    <text
                      x="100"
                      y="142"
                      fill="#181a1f"
                      fontSize="9.5"
                      fontWeight="800"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      km/h
                    </text>
                  </svg>

                  {/* Glass reflections */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '12px',
                      width: '45px',
                      height: '26px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 80%)',
                      borderRadius: '50%',
                      transform: 'rotate(-25deg)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Speedometer Red Needle */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '3px',
                      height: '42%',
                      bottom: '50%',
                      left: 'calc(50% - 1.5px)',
                      backgroundColor: '#dc2626',
                      borderRadius: '2px',
                      transformOrigin: 'bottom center',
                      transform: `rotate(${needleDeg}deg)`,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                      transition: isDecelerating ? 'transform 0.4s cubic-bezier(0.3, 1, 0.4, 1)' : 'transform 0.06s cubic-bezier(0.1, 0.9, 0.2, 1)',
                      zIndex: 5
                    }}
                  >
                    {/* Needle point arrow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        left: '-2px',
                        width: '7px',
                        height: '7px',
                        backgroundColor: '#dc2626',
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                      }}
                    />
                  </div>

                  {/* Brass Center Cap */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: '#1f1b18',
                      border: '2px solid #b45309',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.7)',
                      zIndex: 6
                    }}
                  />
                </div>
              </div>

              {/* Gauge Telemetry Percentage Indicator */}
              <div
                style={{
                  marginTop: '0.3rem',
                  fontSize: 'clamp(0.68rem, 1.8vh, 0.78rem)',
                  fontFamily: 'var(--font-mono)',
                  color: isDecelerating ? '#34d399' : rpm > 80 ? '#fbbf24' : '#e5e7eb',
                  fontWeight: 700
                }}
              >
                {isDecelerating ? '¡MOTOR LISTO!' : `${Math.round(rpm)}% VELOCIDAD`}
              </div>
            </div>

            {/* Ultra-Realistic Throttle Handlebar & Glowing Arc */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                maxWidth: '100%'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'grab',
                  touchAction: 'none'
                }}
                onMouseDown={startRevving}
                onMouseUp={stopRevving}
                onMouseLeave={stopRevving}
                onTouchStart={startRevving}
                onTouchEnd={stopRevving}
              >
                {/* Precision Glowing Golden Halo Arc */}
                <div
                  style={{
                    position: 'absolute',
                    right: '-14px',
                    top: '-12px',
                    bottom: '-12px',
                    width: '38px',
                    pointerEvents: 'none',
                    zIndex: 4,
                    overflow: 'visible'
                  }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 40 100"
                    style={{ overflow: 'visible' }}
                  >
                    {/* Background Track Arc */}
                    <path
                      d="M 4,8 C 34,16 38,50 38,50 C 38,50 34,84 4,92"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.14)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Active Glowing Golden Progress Arc */}
                    <path
                      d="M 4,8 C 34,16 38,50 38,50 C 38,50 34,84 4,92"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="130"
                      strokeDashoffset={130 - (rpm / 100) * 130}
                      style={{
                        transition: 'stroke-dashoffset 0.04s linear',
                        filter: isRevving
                          ? 'drop-shadow(0 0 6px #f59e0b) drop-shadow(0 0 14px rgba(245, 158, 11, 0.9))'
                          : 'drop-shadow(0 0 3px rgba(245, 158, 11, 0.4))'
                      }}
                    />
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fde68a" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Left Aluminum Switchgear Housing & Clamp Bracket */}
                <div
                  style={{
                    width: 'clamp(22px, 5vw, 34px)',
                    height: 'clamp(48px, 6.8vh, 76px)',
                    backgroundColor: '#44403c',
                    backgroundImage: 'linear-gradient(180deg, #78716c 0%, #292524 50%, #1c1917 100%)',
                    borderRadius: '6px 0 0 6px',
                    border: '1.5px solid #a8a29e',
                    borderRight: '1.5px solid #292524',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 6px 16px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px 2px',
                    zIndex: 3
                  }}
                >
                  {/* Metallic hex bolts */}
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#d6d3d1', border: '1px solid #78716c' }} />
                  <div style={{ width: '8px', height: '2px', backgroundColor: '#a8a29e' }} />
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#d6d3d1', border: '1px solid #78716c' }} />
                </div>

                {/* Textured Diamond Knurl Rubber Grip with Realistic 3D Twist */}
                <motion.div
                  animate={{
                    rotateX: isRevving ? throttleAngle : 0,
                    y: isRevving ? [0, -1.5, 1.5, 0] : 0
                  }}
                  transition={{
                    rotateX: isDecelerating ? { type: 'spring', stiffness: 500, damping: 25 } : { duration: 0.05 },
                    y: { repeat: isRevving ? Infinity : 0, duration: 0.07 }
                  }}
                  style={{
                    width: 'clamp(118px, 32vw, 175px)',
                    height: 'clamp(46px, 6.2vh, 68px)',
                    backgroundColor: '#181615',
                    borderRadius: '3px 0 0 3px',
                    border: isRevving ? '2px solid #f59e0b' : '1.5px solid #44403c',
                    borderRight: 'none',
                    boxShadow: isRevving
                      ? '0 0 22px rgba(245, 158, 11, 0.7), inset 0 0 12px rgba(0,0,0,0.95)'
                      : '0 8px 20px rgba(0,0,0,0.85), inset 0 0 10px rgba(0,0,0,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    // Realistic motorcycle waffle knurling pattern
                    backgroundImage: `
                      radial-gradient(#292524 15%, transparent 16%),
                      radial-gradient(#292524 15%, transparent 16%)
                    `,
                    backgroundSize: '8px 8px',
                    backgroundPosition: '0 0, 4px 4px',
                    cursor: isRevving ? 'grabbing' : 'grab',
                    zIndex: 2
                  }}
                >
                  {/* Subtle highlight sheen */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: '4px',
                      right: '4px',
                      height: '4px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                      borderRadius: '2px',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Clean text */}
                  <span
                    style={{
                      color: isRevving ? '#fef08a' : '#e5e7eb',
                      fontSize: 'clamp(0.66rem, 2vw, 0.78rem)',
                      fontWeight: 900,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-heading)',
                      textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                      pointerEvents: 'none',
                      textAlign: 'center',
                      padding: '0 4px'
                    }}
                  >
                    {isDecelerating ? '¡DESPEGANDO!' : isRevving ? '¡ACELERANDO!' : 'MANTÉN PRESIONADO'}
                  </span>
                </motion.div>

                {/* Right Machined Chrome Bar-End Counterweight */}
                <div
                  style={{
                    width: 'clamp(18px, 4.5vw, 26px)',
                    height: 'clamp(48px, 6.5vh, 70px)',
                    background: 'linear-gradient(90deg, #57534e 0%, #e7e5e4 40%, #a8a29e 70%, #44403c 100%)',
                    borderRadius: '0 14px 14px 0',
                    border: '1.5px solid #78716c',
                    borderLeft: '1.5px solid #292524',
                    boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.6), 0 5px 14px rgba(0,0,0,0.7)',
                    zIndex: 3
                  }}
                />
              </div>

              {/* Instruction Label */}
              <div style={{ marginTop: 'clamp(0.25rem, 0.8vh, 0.65rem)', textAlign: 'center', maxWidth: '280px' }}>
                <span
                  style={{
                    fontSize: 'clamp(0.68rem, 1.4vh, 0.82rem)',
                    fontWeight: 900,
                    color: isRevving ? '#fbbf24' : '#f8f6f0',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                  }}
                >
                  GIRA EL ACELERADOR PARA CONTINUAR
                </span>
                <span style={{ display: 'block', fontSize: 'clamp(0.58rem, 1.1vh, 0.68rem)', color: '#9ca3af', marginTop: '0.1rem' }}>
                  (O mantén pulsada la barra espaciadora)
                </span>
              </div>
            </div>
          </div>

          <style>{`
            .preloader-dashboard-grid {
              flex-direction: row;
            }
            @media (max-width: 640px) {
              .preloader-dashboard-grid {
                flex-direction: column !important;
                gap: clamp(0.5rem, 1.6vh, 1.25rem) !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
