import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(2, 6, 23, 0.95)',
        padding: '3rem 0 2rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Terminal size={18} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#f8fafc' }}>
                LUIS ROMANO<span style={{ color: '#38bdf8' }}>.dev</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Senior FullStack & Software Architect
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill"
              style={{ color: '#94a3b8' }}
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill"
              style={{ color: '#94a3b8' }}
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="glass-pill"
              style={{ color: '#94a3b8' }}
            >
              <Mail size={15} />
              <span>Email</span>
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="btn-secondary"
            style={{
              padding: '0.5rem 0.85rem',
              fontSize: '0.8rem',
              borderRadius: '9999px'
            }}
            title="Volver arriba"
          >
            <span>Subir</span>
            <ArrowUp size={14} />
          </button>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: '#64748b'
          }}
        >
          <div>
            © 2026 <strong>Luis Fernando Romano</strong> — {PERSONAL_INFO.company}. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Diseñado con <span style={{ color: '#38bdf8' }}>React 19 & TypeScript</span> • Jamstack High Performance
          </div>
        </div>
      </div>
    </footer>
  );
};
