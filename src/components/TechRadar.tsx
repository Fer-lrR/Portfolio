import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code, Cloud, Smartphone, Cpu, Sparkles } from 'lucide-react';

export const TechRadar: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Code size={20} color="#38bdf8" />;
      case 'Cloud': return <Cloud size={20} color="#06b6d4" />;
      case 'Smartphone': return <Smartphone size={20} color="#10b981" />;
      case 'Cpu': return <Cpu size={20} color="#8b5cf6" />;
      default: return <Sparkles size={20} color="#38bdf8" />;
    }
  };

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem', color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <Cpu size={14} />
            <span>Matriz de Tecnologías & Dominio Técnico</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Stack Tecnológico <span className="gradient-text-primary">& Herramientas</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Especialización en desarrollo web de alto rendimiento, arquitecturas serverless, GIS satelital y soluciones multiplataforma.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1.75rem',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getIcon(cat.icon)}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#f8fafc' }}>
                  {cat.title}
                </h3>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      backgroundColor: skill.highlight ? 'rgba(59, 130, 246, 0.08)' : 'rgba(2, 6, 23, 0.4)',
                      border: skill.highlight ? '1px solid rgba(59, 130, 246, 0.25)' : '1px solid rgba(255, 255, 255, 0.04)'
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', color: skill.highlight ? '#f8fafc' : '#cbd5e1', fontWeight: skill.highlight ? 600 : 400 }}>
                      {skill.name}
                    </span>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: skill.level === 'Master' ? '#34d399' : '#38bdf8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
