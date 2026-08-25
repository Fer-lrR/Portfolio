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
    accentColor: '#1d4ed8',
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
    accentColor: '#c25e00',
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
    accentColor: '#059669',
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
    <section id="projects" className="section-padding" style={{ position: 'relative', background: '#f1ecdf' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3rem auto' }}>
          <div className="solid-pill" style={{ marginBottom: '1rem', color: '#c25e00' }}>
            <Activity size={14} color="#c25e00" />
            <span>Aplicaciones Desplegadas en Producción</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', marginBottom: '1rem', color: '#181a1f', fontWeight: 800 }}>
            Proyectos & <span style={{ color: '#c25e00' }}>Sistemas en Vivo</span>
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.65 }}>
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
                  border: isActive ? `1px solid #c25e00` : '1px solid #d5c9bc',
                  backgroundColor: isActive ? '#ffffff' : '#f8f6f0',
                  color: isActive ? '#c25e00' : '#4b5563',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(194, 94, 0, 0.12)' : 'none'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#c25e00' : '#9ca3af'
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 0.95fr',
              gap: '2.5rem',
              alignItems: 'stretch',
              backgroundColor: '#ffffff',
              border: '1px solid #e2d9cf',
              borderRadius: '8px',
              padding: '2.25rem',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)'
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
                      color: '#c25e00',
                      backgroundColor: '#fff7ed',
                      border: '1px solid #ffedd5',
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
                      fontWeight: 700,
                      color: '#059669',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px'
                    }}
                  >
                    <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                    PRODUCCIÓN EN VIVO
                  </span>
                </div>

                <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)', color: '#181a1f', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.25 }}>
                  {currentProject.title}
                </h3>

                <p style={{ color: '#374151', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {currentProject.description}
                </p>

                {/* Metrics Badges */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    background: '#f8f6f0',
                    border: '1px solid #e2d9cf',
                    borderRadius: '6px',
                    padding: '0.85rem'
                  }}
                >
                  {currentProject.metrics.map((m, mIdx) => (
                    <div key={mIdx} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#181a1f', fontFamily: 'var(--font-mono)' }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#c25e00', fontWeight: 700, textTransform: 'uppercase' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
                  {currentProject.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: '#4b5563' }}>
                      <CheckCircle2 size={15} color="#c25e00" style={{ flexShrink: 0, marginTop: '3px' }} />
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
                        color: '#4b5563',
                        backgroundColor: '#f8f6f0',
                        border: '1px solid #e2d9cf',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600
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
                    fontSize: '0.9rem'
                  }}
                >
                  <ExternalLink size={16} />
                  <span>Abrir Aplicación en Vivo ({currentProject.displayUrl})</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean Light Browser Frame Mockup */}
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
                  background: '#ffffff',
                  border: '1px solid #d5c9bc',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Browser Top Titlebar */}
                <div
                  style={{
                    padding: '0.65rem 1rem',
                    background: '#f1ecdf',
                    borderBottom: '1px solid #e2d9cf',
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
                      color: '#4b5563',
                      backgroundColor: '#ffffff',
                      padding: '0.2rem 0.8rem',
                      borderRadius: '4px',
                      border: '1px solid #e2d9cf',
                      fontWeight: 600
                    }}
                  >
                    https://{currentProject.displayUrl}
                  </div>

                  <ShieldCheck size={14} color="#059669" />
                </div>

                {/* Mockup Canvas Screen */}
                <div
                  style={{
                    padding: '2rem',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#faf9f5',
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
                          backgroundColor: '#eff6ff',
                          border: '2px solid #1d4ed8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(29, 78, 216, 0.15)'
                        }}
                      >
                        <MapPin size={34} color="#1d4ed8" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#181a1f' }}>
                          Monitoreo Satelital Activo
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#1d4ed8', fontFamily: 'var(--font-mono)', marginTop: '0.25rem', fontWeight: 600 }}>
                          Unidades #104 & #108 • Ruta RP 307 ➔ RN 38
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          background: '#ffffff',
                          border: '1px solid #e2d9cf',
                          fontSize: '0.75rem',
                          color: '#4b5563',
                          fontWeight: 600
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
                          backgroundColor: '#fff7ed',
                          border: '2px solid #c25e00',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(194, 94, 0, 0.15)'
                        }}
                      >
                        <Radio size={34} color="#c25e00" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#181a1f' }}>
                          Transmisión HD en Directo
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#c25e00', fontFamily: 'var(--font-mono)', marginTop: '0.25rem', fontWeight: 600 }}>
                          Sonic Panel Audio Server • 24/7 En Línea
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          background: '#ffffff',
                          border: '1px solid #e2d9cf',
                          fontSize: '0.75rem',
                          color: '#4b5563',
                          fontWeight: 600
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
                          backgroundColor: '#ecfdf5',
                          border: '2px solid #059669',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(5, 150, 105, 0.15)'
                        }}
                      >
                        <Zap size={34} color="#059669" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#181a1f' }}>
                          E-Commerce & Showroom 360°
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#059669', fontFamily: 'var(--font-mono)', marginTop: '0.25rem', fontWeight: 600 }}>
                          Simulador Cuotas DNI • Compresor Canvas
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          background: '#ffffff',
                          border: '1px solid #e2d9cf',
                          fontSize: '0.75rem',
                          color: '#4b5563',
                          fontWeight: 600
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

                <div style={{ fontSize: '0.78rem', color: '#6b7280', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
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
