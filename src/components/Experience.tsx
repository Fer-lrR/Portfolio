import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, GraduationCap, Award, MapPin, Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem', color: '#8b5cf6', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
            <Award size={14} />
            <span>Trayectoria Profesional & Académica</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Experiencia & <span className="gradient-text-accent">Liderazgo de Ingeniería</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Desde la arquitectura y co-fundación de RoDevs hasta la docencia universitaria de algoritmos en la UTN y consultoría para plantas industriales.
          </p>
        </div>

        {/* Timeline Layout */}
        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '20px',
              width: '2px',
              background: 'linear-gradient(to bottom, #3b82f6, #06b6d4, #8b5cf6, rgba(255,255,255,0.05))'
            }}
            className="timeline-bar"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: '1.5rem',
                  position: 'relative'
                }}
                className="timeline-item"
              >
                {/* Node Icon */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#020617',
                    border: '2px solid #06b6d4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                    zIndex: 2,
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
                  }}
                >
                  {idx === 0 ? <Briefcase size={18} /> : idx === 2 ? <GraduationCap size={18} /> : <Award size={18} />}
                </div>

                {/* Card Content */}
                <div
                  className="glass-card"
                  style={{
                    padding: '1.75rem',
                    border: idx === 0 ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {/* Period & Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>

                    {exp.badge && (
                      <span
                        style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.15)',
                          color: '#60a5fa',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: '#f8fafc', marginBottom: '0.35rem' }}>
                    {exp.role}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <strong style={{ color: '#cbd5e1' }}>{exp.company}</strong>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={13} /> {exp.location}
                    </span>
                  </div>

                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {exp.description}
                  </p>

                  {/* Bullet list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#06b6d4', marginTop: '7px', flexShrink: 0 }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {exp.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: 'rgba(2, 6, 23, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          color: '#94a3b8',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
