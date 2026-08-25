import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface ContactProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Contact: React.FC<ContactProps> = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c25e00', '#9a3412', '#d97706', '#181a1f']
    });

    // Construct mailto link
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Contacto desde Portfolio')}&body=${encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )}`;
    window.location.href = mailto;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', background: '#f1ecdf' }}>
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}
        >
          <div className="solid-pill" style={{ marginBottom: '1rem', color: '#c25e00' }}>
            <MessageSquare size={14} color="#c25e00" />
            <span>Contacto Directo & Oportunidades</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3rem)', marginBottom: '1rem', color: '#181a1f', fontWeight: 800 }}>
            Iniciemos una <span style={{ color: '#c25e00' }}>Conversación Técnica</span>
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Disponible para roles de Lead Full Stack Developer, Systems Architect y consultoría técnica de alta disponibilidad.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '2.5rem',
            alignItems: 'start',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
          className="contact-main-grid"
        >
          {/* Left Column: Direct Info Cards with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Email Card */}
            <div className="solid-card" style={{ padding: '1.5rem', backgroundColor: '#ffffff', border: '1px solid #e2d9cf' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '6px', background: '#eff6ff', color: '#1d4ed8' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>Correo Principal</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#181a1f' }}>{PERSONAL_INFO.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="solid-pill"
                  style={{ cursor: 'pointer', padding: '0.35rem 0.65rem' }}
                  title="Copiar email"
                >
                  {copiedEmail ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  <span style={{ fontSize: '0.75rem' }}>{copiedEmail ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="solid-card" style={{ padding: '1.5rem', backgroundColor: '#ffffff', border: '1px solid #e2d9cf' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>WhatsApp / Teléfono</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#181a1f' }}>{PERSONAL_INFO.phone}</div>
                  </div>
                </div>

                <a
                  href={`https://api.whatsapp.com/send?phone=5493863537818&text=${encodeURIComponent('Hola Fernando! Me gustaría conversar sobre una oportunidad/proyecto.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage-secondary"
                  style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', minHeight: '36px' }}
                >
                  Abrir Chat
                </a>
              </div>
            </div>

            {/* Location & Socials */}
            <div className="solid-card" style={{ padding: '1.5rem', backgroundColor: '#ffffff', border: '1px solid #e2d9cf' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '6px', background: '#fdf4ff', color: '#9333ea' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>Ubicación</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#181a1f' }}>{PERSONAL_INFO.location} (Remoto Global)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  <LinkedinIcon size={16} color="#0a66c2" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-heritage-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Message Form with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="solid-card"
            style={{
              padding: '2rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e2d9cf'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', color: '#181a1f', marginBottom: '0.5rem', fontWeight: 800 }}>
              Enviar Mensaje Directo
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Completá el formulario para iniciar la consulta técnica directa por correo.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Martín González"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontSize: '0.9rem',
                    color: '#181a1f'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nombre@empresa.com"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontSize: '0.9rem',
                    color: '#181a1f'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                  Asunto / Proyecto
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Ej. Proyecto de Telemetría Web / Oportunidad Laboral"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontSize: '0.9rem',
                    color: '#181a1f'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                  Mensaje Detallado
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describí los requerimientos técnicos, stack o propuesta..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontSize: '0.9rem',
                    color: '#181a1f',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-heritage-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  marginTop: '0.5rem'
                }}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>¡Listo para Enviar!</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
