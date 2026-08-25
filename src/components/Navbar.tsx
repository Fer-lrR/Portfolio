import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, Send, Download, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './react-bits/GooeyNav';
import GlassSurface from './react-bits/GlassSurface';

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
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={0}
        borderWidth={0.03}
        displace={0.3}
        distortionScale={-140}
        redOffset={0}
        greenOffset={8}
        blueOffset={16}
        brightness={isScrolled ? 98 : 12}
        opacity={isScrolled ? 0.72 : 0.45}
        backgroundOpacity={isScrolled ? 0.65 : 0.4}
        saturation={isScrolled ? 1.8 : 1.5}
        blur={14}
        style={{
          padding: isScrolled ? '0.45rem 0' : '0.75rem 0',
          borderBottom: isScrolled ? '1px solid rgba(226, 217, 207, 0.75)' : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.08)' : '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Brand: Logo Shield (Always visible) + Text (Hidden on mobile < 640px) */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            flexShrink: 0
          }}
          aria-label="Inicio - Luis Romano"
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: isScrolled ? 'rgba(241, 236, 223, 0.8)' : 'rgba(255, 255, 255, 0.15)',
              border: isScrolled ? '1px solid #d5c9bc' : '1px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.3s ease'
            }}
          >
            <img
              src="/images/rodevs-shield-3d.png"
              alt="RoDevs Shield Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="nav-brand-text">
            <span
              style={{
                fontWeight: 900,
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
                color: isScrolled ? '#181a1f' : '#ffffff',
                fontFamily: 'var(--font-heading)',
                transition: 'color 0.3s ease'
              }}
            >
              LUIS ROMANO<span style={{ color: isScrolled ? '#c25e00' : '#fbbf24' }}>.dev</span>
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
              color: isScrolled ? '#c25e00' : '#fbbf24',
              fontWeight: 700,
              fontSize: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderColor: isScrolled ? '#e2d9cf' : 'rgba(255, 255, 255, 0.25)',
              backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.12)',
              transition: 'all 0.3s ease'
            }}
          >
            <Download size={13} />
            <span>CV</span>
          </a>
        </nav>

        {/* Action Buttons: GitHub + LinkedIn + Contact Send + Hamburger Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.25rem, 1.2vw, 0.45rem)', flexShrink: 0 }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="solid-pill"
            style={{
              padding: '0.35rem',
              minWidth: '32px',
              minHeight: '32px',
              width: '32px',
              height: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isScrolled ? '#181a1f' : '#ffffff',
              backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.15)',
              borderColor: isScrolled ? '#e2d9cf' : 'rgba(255, 255, 255, 0.25)',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
            title="GitHub Profile"
            aria-label="Perfil de GitHub"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="solid-pill"
            style={{
              padding: '0.35rem',
              minWidth: '32px',
              minHeight: '32px',
              width: '32px',
              height: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isScrolled ? '#181a1f' : '#ffffff',
              backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.15)',
              borderColor: isScrolled ? '#e2d9cf' : 'rgba(255, 255, 255, 0.25)',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
            title="LinkedIn Profile"
            aria-label="Perfil de LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>

          <button
            onClick={onOpenContact}
            className="btn-heritage-primary"
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.78rem',
              borderRadius: '6px',
              minHeight: '32px',
              gap: '0.35rem'
            }}
            title="Enviar mensaje / Contactar"
            aria-label="Contactar a Luis Romano"
          >
            <Send size={13} />
            <span className="nav-contact-text" style={{ fontWeight: 700 }}>Contactar</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.15)',
              border: isScrolled ? '1px solid #e2d9cf' : '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '6px',
              color: isScrolled ? '#181a1f' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '0.35rem',
              minWidth: '32px',
              minHeight: '32px',
              width: '32px',
              height: '32px',
              transition: 'all 0.3s ease'
            }}
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      </GlassSurface>

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
