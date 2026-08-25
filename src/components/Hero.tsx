import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';
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
    <section style={{ paddingTop: '8.5rem', paddingBottom: '4.5rem', position: 'relative' }}>
      <div className="container">
        {/* Availability & RoDevs Badge Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          <div className="glass-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', padding: '0.4rem 1rem' }}>
            <span className="pulse-dot" />
            <span style={{ color: '#10b981', fontWeight: 600 }}>Disponible para Roles Full Stack & Consultoría</span>
          </div>

          <a
            href="https://rodevsoftware.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill"
            style={{
              borderColor: 'rgba(59, 130, 246, 0.35)',
              padding: '0.35rem 0.85rem',
              color: '#38bdf8',
              textDecoration: 'none'
            }}
          >
            <img
              src="/images/rodevs-shield-3d.png"
              alt="RoDevs Software"
              style={{ width: '18px', height: '18px', objectFit: 'contain' }}
            />
            <span style={{ fontWeight: 600 }}>RoDevs Software Solutions</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Main Grid: Headline & Photo Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="hero-main-grid"
        >
          {/* Left Column: Copy & Actions */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.18,
                marginBottom: '1.25rem',
                color: '#ffffff'
              }}
            >
              Arquitectura de Software, <br />
              <span style={{ color: '#38bdf8' }}>Full Stack</span> & Sistemas <br />
              en Tiempo Real.
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#94a3b8',
                maxWidth: '600px',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}
            >
              Soy <strong style={{ color: '#f8fafc' }}>Luis Fernando Romano</strong>. Lead Full Stack Developer & Co-Founder en <a href="https://rodevsoftware.com" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>RoDevs Software</a>, estudiante avanzado de Ingeniería en Sistemas de Información (UTN - FRT) y ayudante de cátedra en Algoritmos. Construyo aplicaciones web y móviles de alta disponibilidad con telemetría en tiempo real y arquitecturas cloud eficientes.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a
                href="#projects"
                className="btn-primary"
                style={{ padding: '0.8rem 1.6rem', fontSize: '0.925rem', minHeight: '44px' }}
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
                style={{ padding: '0.8rem 1.6rem', fontSize: '0.925rem', minHeight: '44px' }}
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

          {/* Right Column: Real Professional Photo Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass-card-static"
              style={{
                position: 'relative',
                padding: '1.25rem',
                borderRadius: '1.75rem',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.98) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7)',
                maxWidth: '380px',
                width: '100%'
              }}
            >
              {/* Photo Container with glowing rim */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img
                  src="/images/luis-romano.jpg"
                  alt="Luis Fernando Romano - Full Stack Developer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top'
                  }}
                />

                {/* Floating Role Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(2, 6, 23, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '0.85rem',
                    padding: '0.75rem 1rem'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc' }}>
                    Luis Fernando Romano
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>
                    Lead Full Stack Developer • RoDevs
                  </div>
                </div>
              </div>

              {/* Badges footer */}
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <GraduationCap size={14} color="#06b6d4" />
                  <span>Ingeniería UTN</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <Briefcase size={14} color="#10b981" />
                  <span>Ayudante Algoritmos</span>
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
