import React from 'react';
import { UserCheck, GraduationCap, Award, Download, Building2, Code2, Globe, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { motion } from 'framer-motion';

export const AboutMe: React.FC = () => {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative', background: '#f8f6f0' }}>
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}
        >
          <div className="solid-pill" style={{ marginBottom: '1rem', color: '#c25e00' }}>
            <UserCheck size={14} color="#c25e00" />
            <span>Perfil Profesional & Académico</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3rem)', marginBottom: '1rem', color: '#181a1f', fontWeight: 800 }}>
            Sobre <span style={{ color: '#c25e00' }}>Mí</span>
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Ingeniería de software con bases firmes en algoritmia, sistemas reactivos y telemetría de alta resistencia.
          </p>
        </motion.div>

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
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div
              className="solid-card"
              style={{
                padding: '1.25rem',
                border: '1px solid #e2d9cf',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Photo Container */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  border: '1px solid #e2d9cf',
                  marginBottom: '1.25rem',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)'
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
                    bottom: '0.75rem',
                    left: '0.75rem',
                    right: '0.75rem',
                    backgroundColor: 'rgba(24, 26, 31, 0.94)',
                    border: '1px solid #c25e00',
                    borderRadius: '6px',
                    padding: '0.65rem 0.85rem'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>
                    Luis Fernando Romano
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Lead Full Stack Developer • Co-Founder RoDevs
                  </div>
                </div>
              </div>

              {/* Quick Tags */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#4b5563', fontWeight: 600 }}>
                  <Award size={14} color="#c25e00" />
                  <span>Ingeniería UTN</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#4b5563', fontWeight: 600 }}>
                  <Shield size={14} color="#1d4ed8" />
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
                backgroundColor: '#ffffff',
                border: '1px solid #e2d9cf',
                borderRadius: '8px',
                padding: '1.25rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
              }}
            >
              {PERSONAL_INFO.metrics.map((metric, idx) => (
                <div key={idx} style={{ padding: '0.25rem' }}>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#181a1f', fontFamily: 'var(--font-mono)' }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c25e00', textTransform: 'uppercase' }}>
                    {metric.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#6b7280' }}>
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Bio & Core Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Bio Card */}
            <div
              className="solid-card"
              style={{
                padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
                backgroundColor: '#ffffff',
                border: '1px solid #e2d9cf',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.55rem',
                    borderRadius: '6px',
                    backgroundColor: '#f1ecdf',
                    color: '#c25e00',
                    flexShrink: 0
                  }}
                >
                  <Code2 size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)', color: '#181a1f', fontWeight: 800 }}>
                    Ingeniería de Software & Arquitectura
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#c25e00', fontWeight: 700 }}>
                    Enfoque Pragmático de Alto Rendimiento
                  </p>
                </div>
              </div>

              <p style={{ color: '#374151', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.15rem' }}>
                Soy desarrollador Full Stack con mentalidad orientada a la ingeniería de sistemas y estudiante avanzado de <strong>Ingeniería en Sistemas de Información</strong> en la <strong>Universidad Tecnológica Nacional (UTN - FRT)</strong>.
              </p>

              <p style={{ color: '#4b5563', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.35rem' }}>
                Como cofundador y arquitecto técnico en <strong style={{ color: '#c25e00' }}>RoDevs Software Solutions</strong>, diseño e implemento plataformas web y móviles para flotas de transporte en vivo, streaming continuo de radio y comercio electrónico, priorizando siempre la <strong>velocidad de carga instantánea, la sincronización en tiempo real y la máxima disponibilidad</strong>.
              </p>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid #e2d9cf' }}>
                <a
                  href="/cv/CV_Luis_Fernando_Romano.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage-primary"
                  style={{ flex: '1 1 180px', justifyContent: 'center', padding: '0.7rem 1.1rem', fontSize: '0.82rem', minHeight: '44px' }}
                >
                  <Download size={14} />
                  <span>Descargar CV (Harvard / ATS)</span>
                </a>

                <a
                  href="https://rodevsoftware.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage-secondary"
                  style={{ flex: '1 1 140px', justifyContent: 'center', padding: '0.7rem 1.1rem', fontSize: '0.82rem', minHeight: '44px' }}
                >
                  <Globe size={14} />
                  <span>Visitar RoDevs</span>
                </a>
              </div>
            </div>

            {/* 3 Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Pillar 1: UTN Ayudantía */}
              <div
                className="solid-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px solid #e2d9cf',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#181a1f', marginBottom: '0.25rem' }}>
                      Ayudantía en Algoritmos (UTN - FRT)
                    </h4>
                    <p style={{ fontSize: '0.83rem', color: '#4b5563', lineHeight: 1.55 }}>
                      Ayudante estudiantil de cátedra en <em>Algoritmos y Estructuras de Datos</em> y <em>Paradigmas de Programación</em> (UTN - FRT). Tutoría en POO, estructuras de datos y buenas prácticas de desarrollo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 2: English Instructor */}
              <div
                className="solid-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px solid #e2d9cf',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: '#ecfdf5', color: '#059669' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#181a1f', marginBottom: '0.25rem' }}>
                      Instructor de Idioma Inglés (Bilingüe)
                    </h4>
                    <p style={{ fontSize: '0.83rem', color: '#4b5563', lineHeight: 1.55 }}>
                      Egresado oficial del Instituto Stratford ICLI con capacidad bilingüe fluida para comunicación técnica, documentación y trabajo remoto internacional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 3: RoDevs Solutions */}
              <div
                className="solid-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px solid #e2d9cf',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: '#fff7ed', color: '#c25e00' }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#181a1f', marginBottom: '0.25rem' }}>
                      Desarrollo & Co-Fundación en RoDevs
                    </h4>
                    <p style={{ fontSize: '0.83rem', color: '#4b5563', lineHeight: 1.55 }}>
                      Liderazgo técnico en arquitectura de software, gestión de infraestructura serverless y desarrollo de soluciones de alto impacto comercial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
