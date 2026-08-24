import React, { useState } from 'react';
import { ENGINEERING_TOPICS } from '../data/portfolioData';
import { Code2, Check, Copy, CheckCheck, Layers } from 'lucide-react';

export const Architectures: React.FC = () => {
  const [activeTab, setActiveTab] = useState(ENGINEERING_TOPICS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeTopic = ENGINEERING_TOPICS.find((t) => t.id === activeTab) || ENGINEERING_TOPICS[0];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="architecture" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <Layers size={14} />
            <span>Enfoque de Ingeniería</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Arquitectura de Software <span className="gradient-text-accent">& Rendimiento</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Patrones y soluciones técnicas implementadas para garantizar estabilidad, baja latencia y uso eficiente de recursos cloud.
          </p>
        </div>

        {/* Navigation Tabs */}
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
                  borderRadius: '0.75rem',
                  background: isActive ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(6, 182, 212, 0.3))' : 'rgba(15, 23, 42, 0.6)',
                  border: isActive ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.08)',
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

        {/* Active Topic Deep Dive */}
        <div
          className="glass-card-static"
          style={{
            padding: '2.5rem',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '2.5rem',
              alignItems: 'start'
            }}
            className="arch-content-grid"
          >
            {/* Left Column: Description & Key Points */}
            <div>
              <span
                style={{
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
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

              <h3 style={{ fontSize: '1.6rem', color: '#f8fafc', marginBottom: '1rem' }}>
                {activeTopic.title}
              </h3>

              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {activeTopic.description}
              </p>

              {/* Key points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {activeTopic.keyPoints.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <div style={{ padding: '0.2rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', marginTop: '2px', flexShrink: 0 }}>
                      <Check size={13} />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {activeTopic.techStack.map((tech, idx) => (
                  <span key={idx} className="glass-pill" style={{ fontSize: '0.8rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Code Snippet */}
            <div>
              <div
                style={{
                  backgroundColor: '#030712',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    padding: '0.75rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Code2 size={16} color="#38bdf8" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {activeTopic.codeTitle}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(activeTopic.codeSnippet, activeTopic.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: copiedId === activeTopic.id ? '#10b981' : '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      minHeight: '32px'
                    }}
                  >
                    {copiedId === activeTopic.id ? <CheckCheck size={14} /> : <Copy size={14} />}
                    <span>{copiedId === activeTopic.id ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>

                <pre
                  style={{
                    padding: '1.25rem',
                    margin: 0,
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1.65,
                    color: '#e2e8f0',
                    overflowX: 'auto',
                    backgroundColor: '#020617'
                  }}
                >
                  <code>{activeTopic.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .arch-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
