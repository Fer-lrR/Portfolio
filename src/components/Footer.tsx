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
        borderTop: '1px solid #e2d9cf',
        backgroundColor: '#181a1f',
        color: '#f8fafc',
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
                borderRadius: '6px',
                background: '#c25e00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Terminal size={18} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff' }}>
                LUIS ROMANO<span style={{ color: '#fbbf24' }}>.dev</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600 }}>
                Lead Full Stack Developer & Systems Architect
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="solid-pill"
              style={{ color: '#ffffff', backgroundColor: '#262930', borderColor: '#374151' }}
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="solid-pill"
              style={{ color: '#ffffff', backgroundColor: '#262930', borderColor: '#374151' }}
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="solid-pill"
              style={{ color: '#ffffff', backgroundColor: '#262930', borderColor: '#374151' }}
            >
              <Mail size={15} />
              <span>Email</span>
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="btn-heritage-secondary"
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.8rem',
              borderRadius: '4px',
              minHeight: '36px'
            }}
            title="Volver arriba"
          >
            <span>Subir</span>
            <ArrowUp size={14} />
          </button>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: '#9ca3af'
          }}
        >
          <div>
            © 2026 <strong>Luis Fernando Romano</strong> — {PERSONAL_INFO.company}. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Construido con <span style={{ color: '#fbbf24', fontWeight: 600 }}>React 19 & TypeScript</span> • Jamstack High Performance
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
