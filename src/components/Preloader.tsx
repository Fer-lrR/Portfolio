import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 500);
          }, 250);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 10;
        return next > 100 ? 100 : next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#07090e',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Subtle Ambient Amber Glow */}
          <div
            style={{
              position: 'absolute',
              width: '260px',
              height: '260px',
              background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* Minimalist Motorcycle Engine / Gauge Icon */}
          <div style={{ position: 'relative', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                border: '2px dashed rgba(245, 158, 11, 0.35)',
                borderTopColor: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            {/* Center Compass / Spark Indicator */}
            <div
              style={{
                position: 'absolute',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'rgba(217, 119, 6, 0.2)',
                border: '1px solid #fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b'
                }}
              />
            </div>
          </div>

          {/* Clean "Loading..." Text */}
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#f8fafc',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            <span>Loading</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              style={{ color: '#fbbf24' }}
            >
              ...
            </motion.span>
          </div>

          {/* Ultra Minimalist Amber Progress Line */}
          <div
            style={{
              width: '180px',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#f59e0b',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)',
                transition: 'width 0.1s ease-out'
              }}
            />
          </div>

          {/* Discreet Monospace Percentage */}
          <div
            style={{
              marginTop: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#64748b',
              letterSpacing: '0.08em'
            }}
          >
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
