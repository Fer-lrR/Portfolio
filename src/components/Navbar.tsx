import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, Send, ExternalLink, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { motion } from 'framer-motion';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  // Staged entrance: Navbar appears with smooth downward slide
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavVisible(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={navVisible ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background-color 0.25s ease, border-color 0.25s ease, padding 0.25s ease, box-shadow 0.25s ease',
        padding: isScrolled ? '0.65rem 0' : '1rem 0',
        backgroundColor: isScrolled ? '#ffffff' : 'rgba(248, 246, 240, 0.85)',
        borderBottom: isScrolled ? '1px solid #e2d9cf' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand with RoDevs Shield */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}
          aria-label="Inicio"
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '6px',
              background: '#f1ecdf',
              border: '1px solid #d5c9bc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}
          >
            <img
              src="/images/rodevs-shield-3d.png"
              alt="RoDevs Shield Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#181a1f' }}>
              LUIS ROMANO<span style={{ color: '#c25e00' }}>.dev</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', letterSpacing: '0.04em', fontWeight: 600 }}>
              Lead Developer @ <span style={{ color: '#c25e00' }}>RoDevs</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: '#4b5563',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'color 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#c25e00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
            >
              {link.name}
            </a>
          ))}

          <a
            href="/cv/CV_Luis_Fernando_Romano.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="solid-pill"
            style={{
              color: '#c25e00',
              fontWeight: 700,
              fontSize: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderColor: '#e2d9cf'
            }}
          >
            <Download size={13} />
            <span>CV</span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="solid-pill"
            style={{ padding: '0.5rem 0.75rem', minWidth: '40px', minHeight: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#181a1f' }}
            title="GitHub Profile"
            aria-label="Perfil de GitHub"
          >
            <GithubIcon size={18} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="solid-pill"
            style={{ padding: '0.5rem 0.75rem', minWidth: '40px', minHeight: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#181a1f' }}
            title="LinkedIn Profile"
            aria-label="Perfil de LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>

          <button
            onClick={onOpenContact}
            className="btn-heritage-primary"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.85rem',
              borderRadius: '6px',
              minHeight: '40px'
            }}
          >
            <Send size={14} />
            <span className="contact-btn-text">Contactar</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#181a1f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '0.5rem',
              minWidth: '40px',
              minHeight: '40px'
            }}
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2d9cf',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#181a1f',
                fontSize: '1.05rem',
                fontWeight: 700,
                padding: '0.5rem 0'
              }}
            >
              {link.name}
            </a>
          ))}

          <a
            href="/cv/CV_Luis_Fernando_Romano.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#c25e00',
              fontSize: '1rem',
              fontWeight: 700,
              padding: '0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Download size={16} />
            <span>Descargar CV (PDF)</span>
          </a>

          <a
            href="https://rodevsoftware.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#c25e00',
              fontSize: '1rem',
              fontWeight: 700,
              padding: '0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Visitar rodevsoftware.com</span>
            <ExternalLink size={16} />
          </a>

          <div style={{ height: '1px', backgroundColor: '#e2d9cf', margin: '0.5rem 0' }} />
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="btn-heritage-primary"
            style={{ width: '100%', justifyContent: 'center', minHeight: '44px' }}
          >
            <Send size={16} /> Contactar Directamente
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 500px) {
          .contact-btn-text {
            display: none;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Navbar;
