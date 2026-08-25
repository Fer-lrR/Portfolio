import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { TechSkill } from '../types/portfolio';
import { Layout, Cloud, Smartphone, Cpu, Sparkles, Terminal } from 'lucide-react';

export const TechRadar: React.FC = () => {
  // Store active/hovered skill per category index or globally
  const [hoveredSkills, setHoveredSkills] = useState<{ [categoryIdx: number]: TechSkill | null }>({});

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout size={20} color="#38bdf8" />;
      case 'Cloud':
        return <Cloud size={20} color="#06b6d4" />;
      case 'Smartphone':
        return <Smartphone size={20} color="#10b981" />;
      case 'Cpu':
        return <Cpu size={20} color="#a855f7" />;
      default:
        return <Sparkles size={20} color="#38bdf8" />;
    }
  };

  const handleMouseEnter = (catIdx: number, skill: TechSkill) => {
    setHoveredSkills((prev) => ({ ...prev, [catIdx]: skill }));
  };

  const handleMouseLeave = (catIdx: number) => {
    setHoveredSkills((prev) => ({ ...prev, [catIdx]: null }));
  };

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <div
            className="glass-pill"
            style={{
              marginBottom: '1rem',
              color: '#38bdf8',
              borderColor: 'rgba(56, 189, 248, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Sparkles size={14} />
            <span>Ecosistema & Stack Tecnológico</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem', color: '#ffffff' }}>
            Stack Tecnológico <span style={{ color: '#38bdf8' }}>& Herramientas</span>
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Arquitecturas escalables, tecnologías en tiempo real y desarrollo frontend de alta gama. Pasa el cursor sobre los íconos para explorar cada tecnología.
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
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '1.25rem',
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
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {getCategoryIcon(category.icon)}
                      </div>
                      <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: 600 }}>
                        {category.title}
                      </h3>
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#64748b',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
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
                              scale: 1.25,
                              y: -6,
                              transition: { type: 'spring', stiffness: 450, damping: 20 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              borderColor: isHovered ? skill.brandColor : 'rgba(255, 255, 255, 0.08)',
                              boxShadow: isHovered
                                ? `0 12px 24px -4px ${skill.brandColor}45, 0 0 16px ${skill.brandColor}30`
                                : '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              padding: '0.75rem'
                            }}
                          >
                            <TechIcon name={skill.iconKey} size={32} />
                          </motion.div>

                          {/* Floating Animated Tooltip with Name */}
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
                                    boxShadow: `0 0 8px ${skill.brandColor}`,
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
                    borderColor: activeSkill ? `${activeSkill.brandColor}40` : 'rgba(255, 255, 255, 0.05)',
                    backgroundColor: activeSkill ? `${activeSkill.brandColor}0a` : 'rgba(2, 6, 23, 0.6)'
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
                            boxShadow: `0 0 10px ${activeSkill.brandColor}`,
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
                                color: '#ffffff',
                                fontFamily: 'var(--font-heading)'
                              }}
                            >
                              {activeSkill.name}
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: '0.78rem',
                              color: '#94a3b8',
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
                        style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#64748b' }}
                      >
                        <Terminal size={14} color="#38bdf8" />
                        <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
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
