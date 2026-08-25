import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
  style = {}
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text-element ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        animationDuration,
        ...style
      }}
    >
      {text}
    </span>
  );
};
export default ShinyText;
