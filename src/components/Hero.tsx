import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Code } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#06b6d4', '#10b981']
    });
  };

  return (
    <section style={{ paddingTop: '8rem', paddingBottom: '4.5rem', position: 'relative' }}>
      <div className="container">
        {/* Availability Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div className="glass-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', padding: '0.4rem 1rem' }}>
            <span className="pulse-dot" />
            <span style={{ color: '#10b981', fontWeight: 600 }}>Disponible para Roles Full Stack & Consultoría</span>
          </div>
        </div>

        {/* Main Grid: Headline & Profile Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="hero-main-grid"
        >
          {/* Left Column: Copy & Actions */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: '1.25rem'
              }}
            >
              Desarrollo Full Stack, <br />
              <span className="gradient-text-primary">React & Arquitecturas</span> <br />
              <span className="gradient-text-accent">en Tiempo Real.</span>
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                color: '#94a3b8',
                maxWidth: '600px',
                lineHeight: 1.65,
                marginBottom: '2rem'
              }}
            >
              Soy <strong style={{ color: '#f8fafc' }}>Luis Fernando Romano</strong>. Lead Full Stack Developer en <strong style={{ color: '#38bdf8' }}>RoDevs</strong>, estudiante avanzado de Ingeniería en Sistemas de Información (UTN) y docente universitario de Algoritmos. Construyo aplicaciones web y móviles de alta disponibilidad con telemetría en tiempo real y arquitecturas cloud eficientes.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a
                href="#projects"
                className="btn-primary"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem', minHeight: '44px' }}
              >
                <span>Ver Proyectos en Producción</span>
                <ArrowRight size={17} />
              </a>

              <button
                onClick={() => {
                  triggerConfetti();
                  onOpenContact();
                }}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem', minHeight: '44px' }}
              >
                <span>Contactar Directamente</span>
              </button>
            </div>

            {/* Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1.5rem'
              }}
            >
              {PERSONAL_INFO.metrics.map((metric, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38bdf8' }}>
                    {metric.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Engineering Highlights Card */}
          <div>
            <div
              className="glass-card-static"
              style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.98) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code size={18} color="#38bdf8" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Perfil Profesional
                  </span>
                </div>
                <span className="glass-pill" style={{ fontSize: '0.75rem', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  UTN - FRT
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Rol Principal</div>
                  <div style={{ fontWeight: 700, color: '#f8fafc' }}>Lead Full Stack Developer & Arquitecto</div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>RoDevs Software Solutions</div>
                </div>

                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Formación Universitaria</div>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>Ingeniería en Sistemas de Información</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Universidad Tecnológica Nacional (3° Año)</div>
                </div>

                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Docencia & Idiomas</div>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>Ayudante de Cátedra (Algoritmos) • English Instructor</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Stack Central</div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['TypeScript', 'React.js', 'Firebase', 'Leaflet GIS', 'PWA', 'TailwindCSS'].map((tech, i) => (
                      <span key={i} className="glass-pill" style={{ fontSize: '0.75rem' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
