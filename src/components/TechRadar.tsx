import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { TechSkill } from '../types/portfolio';
import { Layout, Cloud, Smartphone, Cpu, Sparkles, Terminal, Wrench } from 'lucide-react';

export const TechRadar: React.FC = () => {
  const [hoveredSkills, setHoveredSkills] = useState<{ [categoryIdx: number]: TechSkill | null }>({});

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout size={20} color="#c25e00" />;
      case 'Cloud':
        return <Cloud size={20} color="#1d4ed8" />;
      case 'Smartphone':
        return <Smartphone size={20} color="#059669" />;
      case 'Cpu':
        return <Cpu size={20} color="#9333ea" />;
      default:
        return <Sparkles size={20} color="#c25e00" />;
    }
  };

  const handleMouseEnter = (catIdx: number, skill: TechSkill) => {
    setHoveredSkills((prev) => ({ ...prev, [catIdx]: skill }));
  };

  const handleMouseLeave = (catIdx: number) => {
    setHoveredSkills((prev) => ({ ...prev, [catIdx]: null }));
  };

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative', background: '#f8f6f0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <div
            className="solid-pill"
            style={{
              marginBottom: '1rem',
              color: '#c25e00',
              borderColor: '#e2d9cf',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Wrench size={14} color="#c25e00" />
            <span>Herramientas & Maquinaria de Código</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3rem)', marginBottom: '1rem', color: '#181a1f', fontWeight: 800 }}>
            Stack Tecnológico <span style={{ color: '#c25e00' }}>& Dominio Técnico</span>
          </h2>

          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Arquitecturas sólidas, sincronización en tiempo real y desarrollo de alto rendimiento. Pasa el cursor sobre los íconos para inspeccionar cada tecnología.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const activeSkill = hoveredSkills[catIdx];

            return (
              <div
                key={catIdx}
                className="solid-card"
                style={{
                  padding: '1.75rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2d9cf',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  position: 'relative'
                }}
              >
                {/* Category Header */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                      paddingBottom: '0.85rem',
                      borderBottom: '1px solid #e2d9cf'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          backgroundColor: '#f8f6f0',
                          border: '1px solid #e2d9cf',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {getCategoryIcon(category.icon)}
                      </div>
                      <h3 style={{ fontSize: '1.15rem', color: '#181a1f', fontWeight: 700 }}>
                        {category.title}
                      </h3>
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#6b7280',
                        backgroundColor: '#f8f6f0',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        border: '1px solid #e2d9cf',
                        fontWeight: 600
                      }}
                    >
                      {category.skills.length} techs
                    </span>
                  </div>

                  {/* Interactive Tech Icons Grid */}
                  <div className="tech-tile-grid">
                    {category.skills.map((skill) => {
                      const isHovered = activeSkill?.id === skill.id;

                      return (
                        <div
                          key={skill.id}
                          style={{ position: 'relative' }}
                          onMouseEnter={() => handleMouseEnter(catIdx, skill)}
                          onMouseLeave={() => handleMouseLeave(catIdx)}
                          onFocus={() => handleMouseEnter(catIdx, skill)}
                          onBlur={() => handleMouseLeave(catIdx)}
                          tabIndex={0}
                          role="button"
                          aria-label={skill.name}
                        >
                          <motion.div
                            className="tech-icon-tile"
                            whileHover={{
                              scale: 1.15,
                              y: -4,
                              transition: { type: 'spring', stiffness: 450, damping: 20 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              borderColor: isHovered ? '#c25e00' : '#e2d9cf',
                              boxShadow: isHovered
                                ? `0 8px 20px -4px rgba(194, 94, 0, 0.25)`
                                : '0 1px 3px rgba(0, 0, 0, 0.05)'
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              padding: '0.75rem',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            <TechIcon name={skill.iconKey} size={32} />
                          </motion.div>

                          {/* Floating Tooltip */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                className="tech-floating-tooltip"
                                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                              >
                                <span
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: skill.brandColor,
                                    display: 'inline-block'
                                  }}
                                />
                                <span>{skill.name}</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Telemetry / Role Inspector Bar */}
                <div
                  className="tech-telemetry-bar"
                  style={{
                    borderColor: activeSkill ? '#c25e00' : '#e2d9cf',
                    backgroundColor: activeSkill ? '#fff7ed' : '#f8f6f0'
                  }}
                >
                  <AnimatePresence mode="wait">
                    {activeSkill ? (
                      <motion.div
                        key={activeSkill.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 6 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', width: '100%' }}
                      >
                        <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: activeSkill.brandColor,
                            marginTop: '0.35rem',
                            flexShrink: 0
                          }}
                        />
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                            <span
                              style={{
                                fontSize: '0.88rem',
                                fontWeight: 700,
                                color: '#181a1f',
                                fontFamily: 'var(--font-heading)'
                              }}
                            >
                              {activeSkill.name}
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: '0.78rem',
                              color: '#4b5563',
                              lineHeight: 1.4,
                              margin: 0
                            }}
                          >
                            {activeSkill.description}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#6b7280' }}
                      >
                        <Terminal size={14} color="#c25e00" />
                        <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          Pasa el cursor sobre los íconos para inspeccionar el stack
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechRadar;
