import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover' | 'mount';
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 14,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/█▓▒░',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<number | null>(null);

  const getNextIndex = (revealed: Set<number>, textLength: number): number => {
    if (revealDirection === 'start') {
      return revealed.size;
    }
    if (revealDirection === 'end') {
      return textLength - 1 - revealed.size;
    }
    if (revealDirection === 'center') {
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealed.size / 2);
      const nextIndex = revealed.size % 2 === 0 ? middle + offset : middle - offset - 1;
      if (nextIndex >= 0 && nextIndex < textLength && !revealed.has(nextIndex)) {
        return nextIndex;
      }
      for (let i = 0; i < textLength; i++) {
        if (!revealed.has(i)) return i;
      }
    }
    return revealed.size;
  };

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    const textLength = text.length;
    let iteration = 0;
    const revealed = new Set<number>();
    setRevealedIndices(new Set());

    const charSet = useOriginalCharsOnly
      ? Array.from(new Set(text)).join('')
      : characters;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (sequential) {
        if (revealed.size < textLength) {
          const nextIndex = getNextIndex(revealed, textLength);
          revealed.add(nextIndex);
          setRevealedIndices(new Set(revealed));
        } else {
          clearInterval(intervalRef.current!);
          setDisplayText(text);
          setIsScrambling(false);
          return;
        }
      } else {
        iteration++;
        if (iteration >= maxIterations) {
          clearInterval(intervalRef.current!);
          setDisplayText(text);
          setIsScrambling(false);
          return;
        }
      }

      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (revealed.has(index)) return text[index];
            return charSet[Math.floor(Math.random() * charSet.length)];
          })
          .join('');
      });
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'mount') {
      startScramble();
    } else if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startScramble();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        observer.disconnect();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !isScrambling) {
      setIsHovering(true);
      startScramble();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: animateOn === 'hover' ? 'pointer' : 'default' }}
    >
      {displayText.split('').map((char, index) => {
        const isRevealed = revealedIndices.has(index) || !isScrambling;
        return (
          <span
            key={index}
            className={isRevealed ? className : encryptedClassName}
            style={{
              transition: 'color 0.15s ease',
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};
export default DecryptedText;
