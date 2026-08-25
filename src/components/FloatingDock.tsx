import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { WhatsappIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const FloatingDock: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Fernando, vi tu portfolio y me gustaría conversar sobre una oportunidad/proyecto.')}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        alignItems: 'center'
      }}
    >
      {/* Back to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="solid-pill"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#181a1f',
            backgroundColor: '#ffffff',
            border: '1px solid #e2d9cf',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
            cursor: 'pointer'
          }}
        >
          <ArrowUp size={18} color="#c25e00" />
        </button>
      )}

      {/* Official WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(37, 211, 102, 0.55)',
          textDecoration: 'none',
          position: 'relative',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 14px 35px rgba(37, 211, 102, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 211, 102, 0.55)';
        }}
        title="Enviar WhatsApp a Luis Fernando Romano"
      >
        <WhatsappIcon size={30} color="#ffffff" />
      </a>
    </div>
  );
};
