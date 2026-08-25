import React, { useState } from 'react';
import { ENGINEERING_TOPICS } from '../data/portfolioData';
import { LiveGpsMap } from './LiveGpsMap';
import { InteractiveCanvasDemo } from './InteractiveCanvasDemo';
import { SpotlightCard } from './SpotlightCard';
import { Check, Layers, Radio, Image as ImageIcon, Zap } from 'lucide-react';

export const Architectures: React.FC = () => {
  const [activeTab, setActiveTab] = useState(ENGINEERING_TOPICS[0].id);

  const activeTopic = ENGINEERING_TOPICS.find((t) => t.id === activeTab) || ENGINEERING_TOPICS[0];

  return (
    <section id="architecture" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <Layers size={14} />
            <span>Enfoque de Desarrollo</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem', color: '#ffffff' }}>
            Arquitectura & <span style={{ color: '#38bdf8' }}>Rendimiento</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Patrones probados en producción para telemetría continua, compresión en cliente y arquitecturas Serverless.
          </p>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2rem',
            justifyContent: 'center'
          }}
        >
          {ENGINEERING_TOPICS.map((topic) => {
            const isActive = topic.id === activeTab;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTab(topic.id)}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.65rem',
                  background: isActive ? 'rgba(37, 99, 235, 0.25)' : 'rgba(12, 18, 32, 0.6)',
                  border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  minHeight: '44px'
                }}
              >
                {topic.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Topic Details */}
        <SpotlightCard
          spotlightColor="rgba(37, 99, 235, 0.1)"
          style={{
            padding: '2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '2.5rem',
            background: 'rgba(12, 18, 32, 0.85)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '2.5rem',
              alignItems: 'center'
            }}
            className="arch-overview-grid"
          >
            <div>
              <span
                style={{
                  backgroundColor: 'rgba(6, 182, 212, 0.12)',
                  color: '#06b6d4',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'inline-block',
                  marginBottom: '0.75rem'
                }}
              >
                {activeTopic.category}
              </span>

              <h3 style={{ fontSize: '1.5rem', color: '#f8fafc', marginBottom: '0.75rem' }}>
                {activeTopic.title}
              </h3>

              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {activeTopic.description}
              </p>

              {/* Key points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {activeTopic.keyPoints.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
                    <div style={{ padding: '0.2rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', marginTop: '2px', flexShrink: 0 }}>
                      <Check size={13} />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {activeTopic.techStack.map((tech, idx) => (
                  <span key={idx} className="glass-pill" style={{ fontSize: '0.75rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Feature Card (Clean Graphic Overview instead of Wall of Code) */}
            <div>
              <div
                style={{
                  backgroundColor: 'rgba(2, 6, 23, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '1rem',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#38bdf8' }}>
                  {activeTab === 'telemetry-pwa' && <Radio size={24} />}
                  {activeTab === 'streaming-realtime' && <Zap size={24} />}
                  {activeTab === 'client-optimization' && <ImageIcon size={24} />}
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f8fafc' }}>
                    Aspectos Destacados
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  {activeTab === 'telemetry-pwa' && (
                    <>
                      • <strong>Baja latencia:</strong> Transmisión periódica cada 4 segundos.<br />
                      • <strong>Modo continuo:</strong> Pantalla encendida con Wake Lock API.<br />
                      • <strong>Offline-ready:</strong> Caché de mapas locales para zonas sin señal.
                    </>
                  )}
                  {activeTab === 'streaming-realtime' && (
                    <>
                      • <strong>Emisión 24/7:</strong> Servidores Sonic Panel dedicados.<br />
                      • <strong>Sincronización:</strong> Chat y programación en tiempo real.<br />
                      • <strong>PWA en background:</strong> Audio activo con pantalla bloqueada.
                    </>
                  )}
                  {activeTab === 'client-optimization' && (
                    <>
                      • <strong>Canvas Compression:</strong> Reducción de 8MB a 15KB en ~18ms.<br />
                      • <strong>Ahorro en Firestore:</strong> 99.9% menos lecturas por caché versionada.<br />
                      • <strong>Jamstack:</strong> Distribución global en CDN de baja latencia.
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Live Interactive MapCN Simulator for Telemetry */}
        {activeTab === 'telemetry-pwa' && (
          <div>
            <LiveGpsMap />
          </div>
        )}

        {/* Live Canvas Compressor Simulator */}
        {activeTab === 'client-optimization' && (
          <div>
            <InteractiveCanvasDemo />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .arch-overview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
