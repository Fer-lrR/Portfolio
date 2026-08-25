import React, { useEffect, useRef, useState } from 'react';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'INGENIERÍA ROBUSTA Y CONFIABLE',
  manualMode = false,
  blurAmount = 4,
  borderColor = '#d97706',
  glowColor = 'rgba(217, 119, 6, 0.45)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.2
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(currentIndex);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        gap: '0.65rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => { wordRefs.current[index] = el; }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              cursor: 'pointer',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              fontFamily: 'inherit',
              color: isActive ? '#ffffff' : '#64748b',
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease`,
              userSelect: 'none'
            }}
          >
            {word}
          </span>
        );
      })}

      {/* Focus Box & Corner brackets */}
      <div
        style={{
          position: 'absolute',
          left: `${focusRect.x - 6}px`,
          top: `${focusRect.y - 4}px`,
          width: `${focusRect.width + 12}px`,
          height: `${focusRect.height + 8}px`,
          border: `2px solid ${borderColor}`,
          borderRadius: '4px',
          boxShadow: `0 0 16px ${glowColor}`,
          pointerEvents: 'none',
          transition: `all ${animationDuration}s cubic-bezier(0.25, 1, 0.5, 1)`
        }}
      >
        {/* Top-left corner dot */}
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            width: '6px',
            height: '6px',
            backgroundColor: borderColor,
            borderRadius: '1px'
          }}
        />
        {/* Bottom-right corner dot */}
        <span
          style={{
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            width: '6px',
            height: '6px',
            backgroundColor: borderColor,
            borderRadius: '1px'
          }}
        />
      </div>
    </div>
  );
};
export default TrueFocus;
