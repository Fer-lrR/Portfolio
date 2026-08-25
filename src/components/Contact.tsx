import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';

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
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#06b6d4', '#10b981']
    });

    // Construct mailto link as quick client dispatch
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
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <MessageSquare size={14} />
            <span>Contacto Directo & Oportunidades</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem', color: '#ffffff' }}>
            Iniciemos una <span style={{ color: '#38bdf8' }}>Conversación Técnica</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Disponible para roles de Software Engineer / Architect, consultoría técnica y desarrollo de plataformas de alta escala.
          </p>
        </div>

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
          {/* Left Column: Direct Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email Card */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Correo Principal</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>{PERSONAL_INFO.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="glass-pill"
                  style={{ cursor: 'pointer', padding: '0.35rem 0.65rem' }}
                  title="Copiar email"
                >
                  {copiedEmail ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span style={{ fontSize: '0.75rem' }}>{copiedEmail ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>WhatsApp / Teléfono</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>{PERSONAL_INFO.phone}</div>
                  </div>
                </div>

                <a
                  href={`https://api.whatsapp.com/send?phone=5493863537818&text=${encodeURIComponent('Hola Fernando! Me gustaría conversar sobre una oportunidad/proyecto.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                >
                  Abrir Chat
                </a>
              </div>
            </div>

            {/* Location & Socials */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ubicación</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>{PERSONAL_INFO.location} (Remoto Global)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  <LinkedinIcon size={16} color="#0a66c2" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div
            className="glass-card-static"
            style={{
              padding: '2rem',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
              Enviar Mensaje Directo
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Completá el formulario y te respondo en el día.
            </p>

            {isSubmitted ? (
              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ color: '#f8fafc', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  ¡Mensaje Enviado con Éxito!
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Se abrió tu cliente de correo para confirmar el despacho a {PERSONAL_INFO.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    Tu Nombre o Empresa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Martín González (Sparkling / Tech Lead)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      backgroundColor: 'rgba(2, 6, 23, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    Tu Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="martin@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      backgroundColor: 'rgba(2, 6, 23, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    Asunto / Motivo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Oportunidad Laboral / Consultoría de Software"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      backgroundColor: 'rgba(2, 6, 23, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    Mensaje o Detalle
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hola Fernando, vimos tu experiencia en arquitecturas en tiempo real y nos gustaría coordinar una entrevista..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      backgroundColor: 'rgba(2, 6, 23, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '0.65rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <Send size={16} />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            )}
          </div>
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
