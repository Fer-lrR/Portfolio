import React from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { Building2, CheckCircle2, ExternalLink, Activity } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <Activity size={14} />
            <span>Sistemas en Producción</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Proyectos & <span className="gradient-text-primary">Aplicaciones en Vivo</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Plataformas desarrolladas y desplegadas en producción para transporte público y transmisión de medios.
          </p>
        </div>

        {/* 2 Flagship Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}
          className="projects-flagship-grid"
        >
          {FEATURED_PROJECTS.map((project) => (
            <SpotlightCard
              key={project.id}
              spotlightColor="rgba(6, 182, 212, 0.15)"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(2, 6, 23, 0.95) 100%)'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#38bdf8',
                      backgroundColor: 'rgba(56, 189, 248, 0.12)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px'
                    }}
                  >
                    <Building2 size={14} />
                    {project.client}
                  </span>

                  <span className="glass-pill" style={{ fontSize: '0.75rem', color: '#10b981' }}>
                    <span className="pulse-dot" style={{ width: '6px', height: '6px' }} /> Producción
                  </span>
                </div>

                <h3 style={{ fontSize: '1.5rem', color: '#f8fafc', marginBottom: '0.75rem' }}>
                  {project.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {project.description}
                </p>

                {/* Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                  {project.architectureHighlights.map((highlight, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      <CheckCircle2 size={15} color="#06b6d4" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Impact */}
                <div
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '0.65rem',
                    padding: '0.85rem',
                    fontSize: '0.85rem',
                    color: '#34d399',
                    marginBottom: '1.5rem'
                  }}
                >
                  <strong>Impacto:</strong> {project.impact}
                </div>
              </div>

              {/* Action Buttons & Stack */}
              <div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {project.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        color: '#cbd5e1',
                        backgroundColor: 'rgba(2, 6, 23, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', minHeight: '44px' }}
                  >
                    <ExternalLink size={16} />
                    <span>Abrir Aplicación en Vivo ({project.demoUrl.replace('https://', '')})</span>
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-flagship-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
