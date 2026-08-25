import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, Send, Download, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './react-bits/GooeyNav';

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

  const navItems = [
    { label: 'Sobre Mí', href: '#about' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Contacto', href: '#contact' },
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
        padding: isScrolled ? '0.5rem 0' : '0.75rem 0',
        backgroundColor: isScrolled ? '#ffffff' : 'rgba(248, 246, 240, 0.94)',
        borderBottom: isScrolled ? '1px solid #e2d9cf' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand: Logo Shield (Always visible) + Text (Hidden on mobile < 640px) */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            flexShrink: 0
          }}
          aria-label="Inicio - Luis Romano"
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#f1ecdf',
              border: '1px solid #d5c9bc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <img
              src="/images/rodevs-shield-3d.png"
              alt="RoDevs Shield Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="nav-brand-text">
            <span style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#181a1f', fontFamily: 'var(--font-heading)' }}>
              LUIS ROMANO<span style={{ color: '#c25e00' }}>.dev</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation with Gooey Particle Effect */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }} className="desktop-nav">
          <GooeyNav
            items={navItems}
            particleCount={14}
            particleDistances={[70, 10]}
            particleR={80}
            animationTime={500}
            timeVariance={250}
            colors={[1, 2, 3, 4, 1, 2]}
            initialActiveIndex={0}
          />

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

        {/* Action Buttons: GitHub + LinkedIn + Contact Send + Hamburger Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="solid-pill"
            style={{
              padding: '0.45rem',
              minWidth: '36px',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#181a1f',
              borderRadius: '6px'
            }}
            title="GitHub Profile"
            aria-label="Perfil de GitHub"
          >
            <GithubIcon size={17} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="solid-pill"
            style={{
              padding: '0.45rem',
              minWidth: '36px',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#181a1f',
              borderRadius: '6px'
            }}
            title="LinkedIn Profile"
            aria-label="Perfil de LinkedIn"
          >
            <LinkedinIcon size={17} />
          </a>

          <button
            onClick={onOpenContact}
            className="btn-heritage-primary"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              borderRadius: '6px',
              minHeight: '36px',
              gap: '0.4rem'
            }}
            title="Enviar mensaje / Contactar"
            aria-label="Contactar a Luis Romano"
          >
            <Send size={14} />
            <span className="nav-contact-text" style={{ fontWeight: 700 }}>Contactar</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: '#ffffff',
              border: '1px solid #e2d9cf',
              borderRadius: '6px',
              color: '#181a1f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '0.45rem',
              minWidth: '36px',
              minHeight: '36px'
            }}
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              backgroundColor: '#ffffff',
              borderBottom: '2px solid #c25e00',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
              overflow: 'hidden'
            }}
          >
            {/* Full Luis Romano Header inside Drawer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingBottom: '0.85rem',
                borderBottom: '1px solid #e2d9cf'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
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
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#181a1f', fontFamily: 'var(--font-heading)' }}>
                  LUIS ROMANO<span style={{ color: '#c25e00' }}>.dev</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>
                  Full Stack Developer • <span style={{ color: '#c25e00' }}>RoDevs</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: '#181a1f',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    padding: '0.4rem 0',
                    borderBottom: '1px solid #f8f6f0',
                    textDecoration: 'none'
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Extra Drawer Links: CV & Company */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e2d9cf' }}>
              <a
                href="/cv/CV_Luis_Fernando_Romano.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#c25e00',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  padding: '0.35rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textDecoration: 'none'
                }}
              >
                <Download size={15} />
                <span>Descargar CV (PDF)</span>
              </a>

              <a
                href="https://rodevsoftware.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#4b5563',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  textDecoration: 'none'
                }}
              >
                <span>Visitar RoDevs Software</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
