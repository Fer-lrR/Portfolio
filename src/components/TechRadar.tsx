import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { TechSkill } from '../types/portfolio';
import { Wrench } from 'lucide-react';

export const TechRadar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Flatten all skills or filter by selected category
  const categories = [
    { id: 'all', label: 'Todos' },
    ...SKILL_CATEGORIES.map((cat, idx) => ({ id: String(idx), label: cat.title }))
  ];

  const displayedSkills: { skill: TechSkill; categoryTitle: string }[] = [];

  SKILL_CATEGORIES.forEach((cat, idx) => {
    if (selectedCategory === 'all' || selectedCategory === String(idx)) {
      cat.skills.forEach((skill) => {
        displayedSkills.push({ skill, categoryTitle: cat.title });
      });
    }
  });

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative', background: '#f8f6f0' }}>
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}
        >
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

          <h2 style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.4rem)', marginBottom: '0.75rem', color: '#181a1f', fontWeight: 900 }}>
            Stack Tecnológico
          </h2>

          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Tecnologías y herramientas con las que desarrollo aplicaciones y sistemas de alto rendimiento.
          </p>
        </motion.div>

        {/* Category Filter Pills with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.4rem',
            flexWrap: 'wrap',
            marginBottom: 'clamp(1.5rem, 4vw, 3rem)'
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '30px',
                  fontSize: 'clamp(0.75rem, 2.2vw, 0.82rem)',
                  fontWeight: isSelected ? 800 : 600,
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #c25e00' : '1px solid #e2d9cf',
                  backgroundColor: isSelected ? '#181a1f' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#4b5563',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Interactive Logo Grid with Scroll Reveal */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(85px, 24vw, 130px), 1fr))',
            gap: 'clamp(0.6rem, 2vw, 1.25rem)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {displayedSkills.map(({ skill }, idx) => (
            <motion.div
              layout
              key={skill.id}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.025, 0.4) }}
              whileHover={{
                scale: 1.1,
                y: -4,
                transition: { type: 'spring', stiffness: 450, damping: 18 }
              }}
              whileTap={{ scale: 0.96 }}
              className="solid-card"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2d9cf',
                borderRadius: '10px',
                padding: 'clamp(0.75rem, 2.5vw, 1.25rem) clamp(0.35rem, 1.5vw, 0.75rem)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                userSelect: 'none',
                position: 'relative'
              }}
            >
              {/* Tech Icon */}
              <div
                style={{
                  width: 'clamp(36px, 9vw, 50px)',
                  height: 'clamp(36px, 9vw, 50px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.5rem'
                }}
              >
                <TechIcon name={skill.iconKey} size={36} />
              </div>

              {/* Skill Name */}
              <span
                style={{
                  fontSize: 'clamp(0.75rem, 2.2vw, 0.85rem)',
                  fontWeight: 700,
                  color: '#181a1f',
                  marginBottom: '0.2rem',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1.2
                }}
              >
                {skill.name}
              </span>

              {/* Category Subtitle */}
              <span
                style={{
                  fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
                  color: '#6b7280',
                  fontWeight: 600
                }}
              >
                {skill.level || 'Avanzado'}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechRadar;
