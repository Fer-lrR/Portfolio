import React from 'react';
import { SpotlightCard } from './SpotlightCard';
import { UserCheck, GraduationCap, Award, Download, Building2, Code2, Globe, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutMe: React.FC = () => {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative', background: '#080b11' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="moto-tank-badge" style={{ marginBottom: '1rem', color: '#fbbf24' }}>
            <UserCheck size={14} color="#f59e0b" />
            <span>Perfil Profesional & Académico</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3rem)', marginBottom: '1rem', color: '#ffffff', fontWeight: 800 }}>
            Sobre <span style={{ color: '#f59e0b' }}>Mí</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Ingeniería de software con bases firmes en algoritmia, sistemas reactivos y telemetría de alta resistencia.
          </p>
        </div>

        {/* Main Grid: Photo & Credentials Column + Bio & Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.85fr 1.15fr',
            gap: '2.5rem',
            alignItems: 'stretch'
          }}
          className="about-grid"
        >
          {/* Left Column: Real Professional Photo Card + ATS Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div
              className="mechanical-frame"
              style={{
                padding: '1.35rem',
                border: '1px solid rgba(217, 119, 6, 0.35)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(217, 119, 6, 0.12)',
                background: 'rgba(12, 16, 24, 0.92)'
              }}
            >
              {/* Photo Container */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
                  marginBottom: '1.25rem'
                }}
              >
                <img
                  src="/images/luis-romano.jpg"
                  alt="Luis Fernando Romano - Systems Architect & Full Stack Lead"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top'
                  }}
                />

                {/* Floating Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    left: '0.85rem',
                    right: '0.85rem',
                    backgroundColor: 'rgba(6, 9, 15, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(217, 119, 6, 0.4)',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#f8fafc' }}>
                    Luis Fernando Romano
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Lead Full Stack Developer • Co-Founder RoDevs
                  </div>
                </div>
              </div>

              {/* Quick Tags */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <Award size={14} color="#f59e0b" />
                  <span>Ingeniería UTN</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <Shield size={14} color="#38bdf8" />
                  <span>Ayudante Algoritmos</span>
                </div>
              </div>
            </div>

            {/* Metrics Tacometer */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.85rem',
                background: 'rgba(10, 14, 22, 0.85)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: '8px',
                padding: '1.25rem',
                backdropFilter: 'blur(12px)'
              }}
            >
              {PERSONAL_INFO.metrics.map((metric, idx) => (
                <div key={idx} style={{ padding: '0.25rem' }}>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase' }}>
                    {metric.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bio & Core Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Bio Card */}
            <SpotlightCard
              spotlightColor="rgba(217, 119, 6, 0.12)"
              style={{
                padding: '2.25rem',
                background: 'rgba(12, 16, 26, 0.85)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.55rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(217, 119, 6, 0.15)',
                    color: '#fbbf24'
                  }}
                >
                  <Code2 size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', color: '#f8fafc', fontWeight: 800 }}>
                    Ingeniería de Software & Arquitectura
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
                    Enfoque Pragmático de Alto Rendimiento
                  </p>
                </div>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.75, marginBottom: '1.15rem' }}>
                Soy desarrollador Full Stack con mentalidad orientada a la ingeniería de sistemas y estudiante avanzado de <strong>Ingeniería en Sistemas de Información</strong> en la <strong>Universidad Tecnológica Nacional (UTN - FRT)</strong>.
              </p>

              <p style={{ color: '#94a3b8', fontSize: '0.96rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Como cofundador y arquitecto técnico en <strong style={{ color: '#fbbf24' }}>RoDevs Software Solutions</strong>, diseño e implemento plataformas web y móviles para flotas de transporte en vivo, streaming continuo de radio y comercio electrónico, priorizando siempre la <strong>velocidad de carga instantánea, la sincronización en tiempo real y la máxima disponibilidad</strong>.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <a
                  href="/cv/CV_Luis_Fernando_Romano.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage-primary"
                  style={{ padding: '0.75rem 1.4rem', fontSize: '0.85rem', minHeight: '44px' }}
                >
                  <Download size={15} />
                  <span>Descargar CV (Harvard / ATS)</span>
                </a>

                <a
                  href="https://rodevsoftware.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage-secondary"
                  style={{ padding: '0.75rem 1.4rem', fontSize: '0.85rem', minHeight: '44px' }}
                >
                  <Globe size={15} />
                  <span>Visitar RoDevs</span>
                </a>
              </div>
            </SpotlightCard>

            {/* 3 Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Pillar 1: UTN Ayudantía */}
              <SpotlightCard
                spotlightColor="rgba(6, 182, 212, 0.12)"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px solid rgba(6, 182, 212, 0.22)',
                  background: 'rgba(10, 14, 22, 0.85)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.25rem' }}>
                      Ayudantía en Algoritmos (UTN - FRT)
                    </h4>
                    <p style={{ fontSize: '0.83rem', color: '#94a3b8', lineHeight: 1.55 }}>
                      Ayudante de cátedra en <em>Algoritmos y Estructuras de Datos</em> y <em>Paradigmas de Programación</em> (UTN - FRT). Tutoría en POO, estructuras de datos y buenas prácticas de desarrollo.
                    </p>
                  </div>
                </div>
              </SpotlightCard>

              {/* Pillar 2: English Instructor */}
              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.12)"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px solid rgba(16, 185, 129, 0.22)',
                  background: 'rgba(10, 14, 22, 0.85)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.25rem' }}>
                      Instructor de Idioma Inglés (Bilingüe)
                    </h4>
                    <p style={{ fontSize: '0.83rem', color: '#94a3b8', lineHeight: 1.55 }}>
                      Egresado oficial del Instituto Stratford ICLI con capacidad bilingüe fluida para comunicación técnica, documentación y trabajo remoto internacional.
                    </p>
                  </div>
                </div>
              </SpotlightCard>

              {/* Pillar 3: RoDevs Solutions */}
              <SpotlightCard
                spotlightColor="rgba(217, 119, 6, 0.12)"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px solid rgba(217, 119, 6, 0.22)',
                  background: 'rgba(10, 14, 22, 0.85)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'rgba(217, 119, 6, 0.15)', color: '#fbbf24' }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.25rem' }}>
                      Desarrollo & Co-Fundación en RoDevs
                    </h4>
                    <p style={{ fontSize: '0.83rem', color: '#94a3b8', lineHeight: 1.55 }}>
                      Liderazgo técnico en arquitectura de software, gestión de infraestructura serverless y desarrollo de soluciones de alto impacto comercial.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutMe;
