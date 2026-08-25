import React, { useRef, useEffect, useState } from 'react';

export interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  onItemClick?: (item: GooeyNavItem, index: number) => void;
}

export const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  onItemClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };
  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--gooey-color-${p.color}, #c25e00)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            if (element.contains(particle)) {
              element.removeChild(particle);
            }
          } catch {}
        }, t);
      }, 30);
    }
  };
  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const liEl = e.currentTarget.parentElement;
    if (!liEl) return;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => {
        if (filterRef.current?.contains(p)) {
          filterRef.current.removeChild(p);
        }
      });
    }
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
    onItemClick?.(items[index], index);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(
        e as unknown as React.MouseEvent<HTMLAnchorElement>,
        index
      );
    }
  };
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
          :root {
            --gooey-color-1: #c25e00;
            --gooey-color-2: #9a3412;
            --gooey-color-3: #d97706;
            --gooey-color-4: #fbbf24;
          }
          .gooey-container {
            position: relative;
            display: inline-flex;
            align-items: center;
          }
          .gooey-nav-list {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            list-style: none;
            padding: 0.25rem;
            margin: 0;
            position: relative;
            z-index: 3;
          }
          .gooey-nav-item {
            position: relative;
            border-radius: 6px;
            cursor: pointer;
            transition: color 0.25s ease;
            color: var(--nav-link-color, #181a1f);
            font-weight: 700;
            font-size: 0.88rem;
            text-shadow: var(--nav-link-shadow, none);
          }
          .gooey-nav-item:hover a {
            color: var(--nav-link-hover, #c25e00);
          }
          .gooey-nav-item a {
            display: inline-block;
            padding: 0.45rem 0.95rem;
            color: inherit;
            text-decoration: none;
            outline: none;
            position: relative;
            z-index: 4;
            transition: color 0.2s ease;
          }
          .gooey-nav-item.active a {
            color: #ffffff !important;
            font-weight: 800;
            text-shadow: none !important;
          }
          .gooey-nav-item::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 6px;
            background: #c25e00;
            opacity: 0;
            transform: scale(0.85);
            transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
            z-index: 1;
            box-shadow: 0 4px 12px rgba(194, 94, 0, 0.35);
          }
          .gooey-nav-item.active::after {
            opacity: 1;
            transform: scale(1);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 2;
          }
          .effect.text {
            color: transparent;
            font-weight: 700;
            font-size: 0.88rem;
            transition: color 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .effect.filter {
            filter: blur(4px) contrast(15);
            pointer-events: none;
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 7px);
            left: calc(50% - 7px);
            animation: gooey-particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: gooey-point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes gooey-particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 0;
            }
          }
          @keyframes gooey-point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="gooey-container" ref={containerRef}>
        <nav style={{ transform: 'translate3d(0,0,0.01px)' }}>
          <ul ref={navRef} className="gooey-nav-list">
            {items.map((item, index) => (
              <li
                key={index}
                className={`gooey-nav-item ${activeIndex === index ? 'active' : ''}`}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;
