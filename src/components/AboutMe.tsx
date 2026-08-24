import React from 'react';
import { SpotlightCard } from './SpotlightCard';
import { UserCheck, GraduationCap, Award, Download, Building2, Code2, Globe } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem', color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <UserCheck size={14} />
            <span>Perfil Profesional & Académico</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Sobre <span className="gradient-text-primary">Mí</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Ingeniería de software con bases sólidas en algoritmia, liderazgo técnico y desarrollo de productos escalables.
          </p>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'stretch'
          }}
          className="about-grid"
        >
          {/* Left Column: Bio & Core Philosophy */}
          <SpotlightCard
            spotlightColor="rgba(37, 99, 235, 0.15)"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(2, 6, 23, 0.95) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.25)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.5rem',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    color: '#38bdf8'
                  }}
                >
                  <Code2 size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#f8fafc', fontWeight: 800 }}>
                    Luis Fernando Romano
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
                    Lead Full Stack Developer & Systems Architect
                  </p>
                </div>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                Soy desarrollador Full Stack con mentalidad orientada a la resolución pragmática de problemas y estudiante avanzado de <strong>Ingeniería en Sistemas de Información</strong> en la <strong>Universidad Tecnológica Nacional (UTN - FRT)</strong>.
              </p>

              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Como cofundador y líder técnico en <strong style={{ color: '#38bdf8' }}>RoDevs Software Solutions</strong>, diseño e implemento soluciones web y móviles para empresas de transporte, plataformas de medios de comunicación y comercio electrónico, priorizando siempre la <strong>velocidad de carga, la sincronización en tiempo real y la optimización de costos en infraestructura cloud</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <a
                href="/cv/CV_Luis_Fernando_Romano.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.875rem', minHeight: '44px' }}
              >
                <Download size={16} />
                <span>Descargar CV (Formato Harvard / ATS)</span>
              </a>

              <a
                href="https://rodevsoftware.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.875rem', minHeight: '44px' }}
              >
                <Globe size={16} />
                <span>Visitar RoDevs</span>
              </a>
            </div>
          </SpotlightCard>

          {/* Right Column: Key Pillars & Academic Background */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Pillar 1: UTN Docencia */}
            <SpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.15)"
              style={{
                padding: '1.5rem',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 0.9) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: '10px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
                    Docencia Universitaria en Algoritmos (UTN)
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                    Ayudante de cátedra e instructor en <em>Algoritmos y Estructuras de Datos</em> y <em>Paradigmas de Programación</em> en la Universidad Tecnológica Nacional. Mentoría en Clean Code, POO y complejidad algorítmica.
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Pillar 2: English Instructor */}
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.15)"
              style={{
                padding: '1.5rem',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 0.9) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <Award size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
                    Instructor de Idioma Inglés (Bilingüe)
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                    Egresado oficial del Instituto Stratford ICLI con dominio fluido para comunicación técnica, documentación de arquitectura y trabajo colaborativo internacional.
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Pillar 3: RoDevs Solutions */}
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.15)"
              style={{
                padding: '1.5rem',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 0.9) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#38bdf8' }}>
                  <Building2 size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
                    Liderazgo en RoDevs Software Solutions
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                    Gestión integral de proyectos desde el relevamiento con clientes hasta el despliegue en producción, administración de infraestructura DNS, bases de datos y soporte continuo.
                  </p>
                </div>
              </div>
            </SpotlightCard>
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
