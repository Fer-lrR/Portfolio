import React, { useState, useEffect, useRef } from 'react';
import { motion, Easing } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // stagger in ms per char
  duration?: number;
  ease?: Easing | Easing[];
  splitType?: 'chars' | 'words';
  from?: { opacity?: number; y?: number; x?: number; scale?: number };
  to?: { opacity?: number; y?: number; x?: number; scale?: number };
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
  startDelay?: number; // Initial wait before animating in
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 45,
  duration = 0.8,
  ease = [0.22, 1, 0.36, 1], // Power3 out equivalent
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = 'h1',
  textAlign = 'center',
  onLetterAnimationComplete,
  startDelay = 0
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(startDelay === 0);
  const completedCount = useRef(0);

  useEffect(() => {
    if (startDelay > 0) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, startDelay);
      return () => clearTimeout(timer);
    }
  }, [startDelay]);

  // Break text into words, and words into characters to preserve word wrapping
  const words = text.split(' ');
  const totalChars = text.replace(/\s+/g, '').length;

  let globalCharIndex = 0;

  const Tag = motion[tag || 'h1'] as React.ElementType;

  return (
    <Tag
      className={`split-parent overflow-hidden inline-flex flex-wrap ${className}`}
      style={{
        textAlign,
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
        rowGap: '0.2em',
        columnGap: '0.28em',
        wordBreak: 'break-word',
        lineHeight: 1.15
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="split-word inline-flex overflow-hidden"
          style={{ whiteSpace: 'nowrap', display: 'inline-flex' }}
        >
          {splitType === 'words' ? (
            <motion.span
              initial={from}
              animate={shouldAnimate ? to : from}
              transition={{
                duration,
                delay: (startDelay / 1000) + (wordIndex * delay) / 1000,
                ease
              }}
              onAnimationComplete={() => {
                if (wordIndex === words.length - 1) {
                  onLetterAnimationComplete?.();
                }
              }}
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            >
              {word}
            </motion.span>
          ) : (
            word.split('').map((char, charIndex) => {
              const currentGlobalIndex = globalCharIndex++;
              return (
                <motion.span
                  key={charIndex}
                  className="split-char inline-block"
                  initial={from}
                  animate={shouldAnimate ? to : from}
                  transition={{
                    duration,
                    delay: (startDelay / 1000) + (currentGlobalIndex * delay) / 1000,
                    ease
                  }}
                  onAnimationComplete={() => {
                    completedCount.current += 1;
                    if (completedCount.current >= totalChars) {
                      onLetterAnimationComplete?.();
                    }
                  }}
                  style={{
                    display: 'inline-block',
                    willChange: 'transform, opacity'
                  }}
                >
                  {char}
                </motion.span>
              );
            })
          )}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
