import React, { useState } from 'react';
import { Building2, ExternalLink, Activity, Radio, MapPin, ShieldCheck, ChevronLeft, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppProject {
  id: string;
  title: string;
  client: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  displayUrl: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  accentColor: string;
  previewType: 'gps' | 'radio' | 'showroom';
}

const APPS_DATA: AppProject[] = [
  {
    id: 'transporte-santa-lucia',
    title: 'Sistema de Tracking GPS y Telemetría Vehicular',
    client: 'Transporte Santa Lucía SRL',
    category: 'Logística & Telemetría en Tiempo Real',
    tagline: 'PWA de alta disponibilidad para rastreo satelital de colectivos y monitoreo en ruta activa.',
    description: 'Plataforma integral de seguimiento satelital desarrollada para el transporte público. Incorpora Wake Lock API para mantener activa la pantalla del chofer sin apagarse durante todo el trayecto, sincronización Firestore de ultrabaja latencia y trazado de rutas viales.',
    url: 'https://transportesantaluciaconnect.netlify.app',
    displayUrl: 'transportesantaluciaconnect.netlify.app',
    stack: ['React', 'TypeScript', 'Leaflet GIS', 'Firebase Firestore', 'Wake Lock API', 'PWA', 'TailwindCSS'],
    metrics: [
      { label: 'Latencia Sync', value: '< 200ms' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Consumo Datos', value: '-65%' }
    ],
    highlights: [
      'Wake Lock API activa para operación ininterrumpida en cabina.',
      'Cálculo de rumbo dinámico (Bearing) y rotación vectorial de unidades.',
      'Sincronización en tiempo real con Firestore sin saturar cuotas.',
      'Alertas acústicas nativas con Web Audio API sin archivos pesados.'
    ],
    accentColor: '#38bdf8',
    previewType: 'gps'
  },
  {
    id: 'somos-santa-lucenos',
    title: 'Plataforma de Streaming & Radio App 24/7',
    client: 'Somos Santa Luceños / Emisora Regional (Jorge Barrera)',
    category: 'Media Streaming & Audiencia Concurrente',
    tagline: 'Solución completa de audio streaming con chat en vivo y soporte de alta concurrencia.',
    description: 'Emisora multiplataforma con transmisión continua de audio 24/7. Conexión directa a servidores Sonic Panel Radio, reproducción en segundo plano mediante Service Workers y chat comunitario en tiempo real.',
    url: 'https://somossantalucenosbyjorgebarrera.com.ar',
    displayUrl: 'somossantalucenosbyjorgebarrera.com.ar',
    stack: ['React', 'TypeScript', 'Firebase Realtime DB', 'Sonic Panel Server', 'Web Audio API', 'PWA', 'Netlify'],
    metrics: [
      { label: 'Disponibilidad', value: '100% 24/7' },
      { label: 'Concurrencia', value: '+500 Oyentes' },
      { label: 'Carga App', value: '0.01s' }
    ],
    highlights: [
      'Streaming ininterrumpido con enlace a Sonic Panel Server.',
      'Reproducción de audio en segundo plano optimizada para móviles.',
      'Chat comunitario y grilla de programas sincronizados en vivo.',
      'Despliegue Jamstack sin caídas por ruteo SPA en Netlify.'
    ],
    accentColor: '#f59e0b',
    previewType: 'radio'
  },
  {
    id: 'rodevs-showroom-engine',
    title: 'RoDevs Motos Showroom & E-Commerce Engine',
    client: 'Zareto Motos Bikes & E-Commerce Network',
    category: 'Showroom 360° & Lead Preservation',
    tagline: 'Catálogo de alta velocidad con simulador de cuotas DNI, compresión Canvas y captación comercial.',
    description: 'Motor de comercio digital y showroom vehicular diseñado bajo la filosofía Zero-Cost. Compresor de imágenes en navegador que reduce fotos de 8MB a ~15KB, simulador crediticio interactivo y embudo de conversión a WhatsApp.',
    url: 'https://rodevsoftware.com',
    displayUrl: 'rodevsoftware.com/showroom',
    stack: ['React 19', 'TypeScript', 'HTML5 Canvas Engine', 'Firebase Serverless', 'EmailJS SDK', 'Framer Motion'],
    metrics: [
      { label: 'Compresión Fotos', value: '8MB ➔ 15KB' },
      { label: 'Costo Servidor', value: '$0 USD/mes' },
      { label: 'Conversión Lead', value: '+40%' }
    ],
    highlights: [
      'Compresor Canvas automático en cliente (450x450px a 0.75 quality).',
      'Centinela de versión config/metadata (99.9% ahorro de lecturas).',
      'Embudo Lead Preservation (Captura EmailJS + WhatsApp Business).',
      'Simulador financiero en cuotas fijas en pesos argentinos.'
    ],
    accentColor: '#10b981',
    previewType: 'showroom'
  }
];

export const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentProject = APPS_DATA[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % APPS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + APPS_DATA.length) % APPS_DATA.length);
  };

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative', background: '#07090e' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3rem auto' }}>
          <div className="moto-tank-badge" style={{ marginBottom: '1rem', color: '#fbbf24' }}>
            <Activity size={14} color="#f59e0b" />
            <span>Aplicaciones Desplegadas en Producción</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', marginBottom: '1rem', color: '#ffffff', fontWeight: 800 }}>
            Proyectos & <span style={{ color: '#f59e0b' }}>Sistemas en Vivo</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Sistemas reales desarrollados para empresas, operando en tiempo real con alta concurrencia y máxima disponibilidad.
          </p>
        </div>

        {/* Carousel / Tab Switcher Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}
        >
          {APPS_DATA.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '6px',
                  border: isActive ? `1px solid ${proj.accentColor}` : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: isActive ? 'rgba(18, 24, 36, 0.95)' : 'rgba(10, 14, 22, 0.65)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? `0 4px 20px ${proj.accentColor}25` : 'none'
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? proj.accentColor : '#64748b'
                  }}
                />
                <span>{proj.client.split('/')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 0.95fr',
              gap: '2.5rem',
              alignItems: 'stretch',
              background: 'linear-gradient(145deg, rgba(14, 18, 28, 0.92) 0%, rgba(8, 11, 17, 0.96) 100%)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              borderRadius: '12px',
              padding: '2.25rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)'
            }}
            className="project-showcase-grid"
          >
            {/* Left Column: Details, Highlights & Live Link */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Header Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: currentProject.accentColor,
                      backgroundColor: `${currentProject.accentColor}18`,
                      border: `1px solid ${currentProject.accentColor}35`,
                      padding: '0.3rem 0.8rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <Building2 size={13} />
                    {currentProject.client}
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#10b981',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px'
                    }}
                  >
                    <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                    PRODUCCIÓN EN VIVO
                  </span>
                </div>

                <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)', color: '#ffffff', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.25 }}>
                  {currentProject.title}
                </h3>

                <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {currentProject.description}
                </p>

                {/* Metrics Badges */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    background: 'rgba(6, 9, 15, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '0.85rem'
                  }}
                >
                  {currentProject.metrics.map((m, mIdx) => (
                    <div key={mIdx} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: currentProject.accentColor, fontWeight: 700, textTransform: 'uppercase' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
                  {currentProject.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: '#94a3b8' }}>
                      <CheckCircle2 size={15} color={currentProject.accentColor} style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Tech Tags */}
              <div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {currentProject.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.72rem',
                        color: '#cbd5e1',
                        backgroundColor: 'rgba(6, 9, 15, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    minHeight: '48px',
                    fontSize: '0.92rem'
                  }}
                >
                  <ExternalLink size={16} />
                  <span>Abrir Aplicación en Vivo ({currentProject.displayUrl})</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Tech App UI Mockup / Preview Frame */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* Browser Window Device Frame */}
              <div
                style={{
                  background: 'rgba(6, 9, 15, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(217, 119, 6, 0.12)'
                }}
              >
                {/* Browser Top Titlebar */}
                <div
                  style={{
                    padding: '0.65rem 1rem',
                    background: 'rgba(15, 20, 30, 0.95)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#94a3b8',
                      backgroundColor: 'rgba(6, 9, 15, 0.8)',
                      padding: '0.2rem 0.8rem',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    https://{currentProject.displayUrl}
                  </div>

                  <ShieldCheck size={14} color="#10b981" />
                </div>

                {/* Mockup Canvas Screen */}
                <div
                  style={{
                    padding: '1.75rem',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'radial-gradient(circle at 50% 30%, rgba(18, 24, 38, 0.8) 0%, rgba(6, 9, 15, 0.98) 100%)',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  {currentProject.previewType === 'gps' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(56, 189, 248, 0.15)',
                          border: '2px solid #38bdf8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 30px rgba(56, 189, 248, 0.35)'
                        }}
                      >
                        <MapPin size={34} color="#38bdf8" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#f8fafc' }}>
                          Monitoreo Satelital Activo
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                          Unidades #104 & #108 • Ruta RP 307 ➔ RN 38
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          fontSize: '0.75rem',
                          color: '#cbd5e1'
                        }}
                      >
                        <span>📡 GPS: 54 km/h</span>
                        <span>⚡ WakeLock: ON</span>
                      </div>
                    </div>
                  )}

                  {currentProject.previewType === 'radio' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(245, 158, 11, 0.15)',
                          border: '2px solid #f59e0b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 30px rgba(245, 158, 11, 0.35)'
                        }}
                      >
                        <Radio size={34} color="#f59e0b" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#f8fafc' }}>
                          Transmisión HD en Directo
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                          Sonic Panel Audio Server • 24/7 En Línea
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          fontSize: '0.75rem',
                          color: '#cbd5e1'
                        }}
                      >
                        <span>📻 192 Kbps Stereo</span>
                        <span>💬 Chat en Vivo: Activo</span>
                      </div>
                    </div>
                  )}

                  {currentProject.previewType === 'showroom' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          border: '2px solid #10b981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 30px rgba(16, 185, 129, 0.35)'
                        }}
                      >
                        <Zap size={34} color="#10b981" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#f8fafc' }}>
                          E-Commerce & Showroom 360°
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#34d399', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                          Simulador Cuotas DNI • Compresor Canvas
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          fontSize: '0.75rem',
                          color: '#cbd5e1'
                        }}
                      >
                        <span>🚀 Carga: 0.01s</span>
                        <span>📲 Lead Preservation</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Carousel Next / Prev Controls */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1.25rem'
                }}
              >
                <button
                  onClick={handlePrev}
                  className="btn-heritage-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', minHeight: '38px' }}
                >
                  <ChevronLeft size={16} />
                  <span>Anterior</span>
                </button>

                <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  0{activeIndex + 1} / 0{APPS_DATA.length}
                </div>

                <button
                  onClick={handleNext}
                  className="btn-heritage-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', minHeight: '38px' }}
                >
                  <span>Siguiente</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .project-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
