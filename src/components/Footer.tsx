import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="solid-pill"
              style={{ color: '#ffffff', backgroundColor: '#262930', borderColor: '#374151', padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="solid-pill"
              style={{ color: '#ffffff', backgroundColor: '#262930', borderColor: '#374151', padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="solid-pill"
              style={{ color: '#ffffff', backgroundColor: '#262930', borderColor: '#374151', padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
            >
              <Mail size={14} />
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
          >
            <ArrowUp size={14} />
            <span>Volver Arriba</span>
          </button>
        </motion.div>

        {/* Copyright & Technical Signature */}
        <div
          style={{
            borderTop: '1px solid #2d3139',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.78rem',
            color: '#9ca3af'
          }}
        >
          <div>
            © {new Date().getFullYear()} Luis Fernando Romano. Desarrollado con <strong>React 19, TypeScript & Web Audio API</strong>.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
            STATUS: <span style={{ color: '#34d399' }}>OPERATIONAL • 100% DISPONIBLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
