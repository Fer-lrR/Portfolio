import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Building2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AccordionGallery, { AccordionGalleryItem } from './react-bits/AccordionGallery';

interface ProjectDetail extends AccordionGalleryItem {
  client: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  impact: string;
  accentColor: string;
}

const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: 'transporte-santa-lucia',
    image: '/images/projects/transporte-santa-lucia.png',
    label: 'Transporte Santa Lucía GPS',
    link: 'https://transportesantaluciaconnect.netlify.app',
    badge: 'Producción • Telemetría',
    client: 'Transporte Santa Lucía SRL',
    category: 'Logística & Telemetría Vehicular',
    tagline: 'PWA de alta disponibilidad para rastreo satelital de colectivos y monitoreo en ruta activa.',
    description: 'Plataforma integral de seguimiento satelital desarrollada para el transporte público. Incorpora Wake Lock API para mantener activa la pantalla del chofer sin apagarse durante todo el trayecto, sincronización Firestore de ultrabaja latencia y trazado de rutas viales.',
    stack: ['React', 'TypeScript', 'Leaflet GIS', 'Firebase Firestore', 'Wake Lock API', 'PWA', 'TailwindCSS'],
    highlights: [
      'Wake Lock API activa para operación ininterrumpida en cabina sin bloqueo de pantalla.',
      'Cálculo de rumbo dinámico (Bearing) y rotación vectorial de unidades en mapa.',
      'Sincronización en tiempo real con Firestore sin saturar cuotas de lectura/escritura.',
      'Alertas acústicas nativas con Web Audio API para notificaciones en ruta.'
    ],
    impact: 'Monitoreo continuo de frecuencias con alta disponibilidad y 0 caídas de servicio.',
    accentColor: '#1d4ed8'
  },
  {
    id: 'somos-santa-lucenos',
    image: '/images/projects/somos-santalucenos.png',
    label: 'Somos Santa Luceños Radio',
    link: 'https://somossantalucenosbyjorgebarrera.com.ar',
    badge: 'Streaming 24/7',
    client: 'Somos Santa Luceños / Emisora Regional',
    category: 'Media Streaming & Audiencia Concurrente',
    tagline: 'Solución completa de audio streaming con chat en vivo y soporte de alta concurrencia.',
    description: 'Emisora multiplataforma con transmisión continua de audio 24/7. Conexión directa a servidores Sonic Panel Radio, reproducción en segundo plano mediante Service Workers y chat comunitario en tiempo real.',
    stack: ['React', 'TypeScript', 'Firebase Realtime DB', 'Sonic Panel Server', 'Web Audio API', 'PWA', 'Netlify'],
    highlights: [
      'Streaming ininterrumpido con enlace dedicado a servidor Sonic Panel.',
      'Reproducción de audio en segundo plano optimizada para dispositivos móviles.',
      'Chat comunitario y grilla de programas sincronizados en tiempo real.',
      'Despliegue Jamstack con soporte SPA sin caídas de señal.'
    ],
    impact: 'Disponibilidad ininterrumpida de audio en vivo para cientos de oyentes concurrentes.',
    accentColor: '#c25e00'
  },
  {
    id: 'seamos-puente-ong',
    image: '/images/projects/seamos-puente.png',
    label: 'Seamos Puente ONG Argentina',
    link: 'https://seamospuente.netlify.app',
    badge: 'Comunidad & ONG',
    client: 'Asociación Civil Seamos Puente',
    category: 'Acción Social & Plataforma Institucional',
    tagline: 'Plataforma web para vinculación comunitaria, campañas solidarias y transparencia institucional.',
    description: 'Portal digital institucional para la gestión y difusión de iniciativas comunitarias, voluntariado y proyectos de desarrollo social en el Chaco Salteño. Diseñado con altos estándares de accesibilidad y rendimiento en redes móviles.',
    stack: ['React 19', 'TypeScript', 'TailwindCSS', 'Cloudflare Pages', 'SEO Optimization'],
    highlights: [
      'Estructura accesible y optimizada para lectura rápida en cualquier dispositivo móvil.',
      'Gestión dinámica de campañas de donación y llamados a voluntariado.',
      'Arquitectura Jamstack de alta velocidad con 100% de disponibilidad.'
    ],
    impact: 'Mayor alcance y visibilidad institucional para convocatorias comunitarias y donaciones.',
    accentColor: '#059669'
  },
  {
    id: 'rodevs-solutions',
    image: '/images/projects/rodevs-software.png',
    label: 'RoDevs Software Solutions',
    link: 'https://rodevsoftware.com',
    badge: 'Sitio Web Empresa',
    client: 'RoDevs Software Solutions',
    category: 'Ingeniería de Software & Arquitectura Cloud',
    tagline: 'Sitio web oficial de la empresa con presentación de servicios tecnológicos y contacto comercial.',
    description: 'Plataforma web corporativa de RoDevs Software Solutions. Expone la propuesta de valor de ingeniería, catálogo de soluciones web a medida, arquitectura serverless de ultra-baja latencia y canal directo de captación de clientes.',
    stack: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Cloudflare Pages', 'EmailJS SDK'],
    highlights: [
      'Diseño interactivo de alto impacto visual con micro-animaciones fluidas.',
      'Optimización de carga frontend con tiempos de respuesta instantáneos (< 0.01s).',
      'Integración directa con WhatsApp Business y despacho de emails transaccionales.'
    ],
    impact: 'Canal principal de adquisición de clientes corporativos y posicionamiento de marca técnica.',
    accentColor: '#9333ea'
  }
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleItemClick = (item: AccordionGalleryItem) => {
    const fullProject = PROJECTS_DATA.find((p) => p.id === item.id || p.label === item.label || p.image === item.image) || (item as ProjectDetail);
    setSelectedProject(fullProject);
  };

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative', background: '#f8f6f0' }}>
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: '#181a1f', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Proyectos
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Aplicaciones y plataformas en producción. Pasá el mouse para desplegar cada sistema o hacé click para ver detalles y abrir la app en vivo.
          </p>
        </motion.div>

        {/* Accordion Gallery Component with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}
        >
          <AccordionGallery
            items={PROJECTS_DATA}
            defaultIndex={0}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#c25e00"
            overlayColor="#181a1f"
            textColor="#ffffff"
            grayscale={false}
            showLabels={true}
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={480}
            gap={12}
            radius={16}
            orientation="horizontal"
            onItemClick={handleItemClick}
          />
        </motion.div>
      </div>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(24, 26, 31, 0.65)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(0.5rem, 2.5vw, 1.25rem)'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2d9cf',
                borderRadius: '12px',
                padding: 'clamp(1rem, 3.5vw, 1.75rem)',
                maxWidth: '640px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '0.85rem',
                  right: '0.85rem',
                  background: '#f8f6f0',
                  border: '1px solid #e2d9cf',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#181a1f',
                  zIndex: 10
                }}
                aria-label="Cerrar modal"
              >
                <X size={16} />
              </button>

              {/* Project Screenshot Banner */}
              <div
                style={{
                  width: '100%',
                  height: 'clamp(150px, 24vh, 210px)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '1rem',
                  border: '1px solid #e2d9cf',
                  backgroundColor: '#181a1f'
                }}
              >
                <img
                  src={selectedProject.image}
                  alt={selectedProject.label || 'Project screenshot'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top'
                  }}
                />
              </div>

              {/* Client & Production Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: selectedProject.accentColor || '#c25e00',
                    backgroundColor: '#fff7ed',
                    border: '1px solid #fed7aa',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  <Building2 size={12} />
                  {selectedProject.client || selectedProject.label}
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#059669',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px'
                  }}
                >
                  <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                  PRODUCCIÓN EN VIVO
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', fontWeight: 800, color: '#181a1f', marginBottom: '0.25rem', lineHeight: 1.25 }}>
                {selectedProject.label}
              </h3>

              {selectedProject.tagline && (
                <p style={{ fontSize: '0.85rem', color: '#c25e00', fontWeight: 700, marginBottom: '0.85rem' }}>
                  {selectedProject.tagline}
                </p>
              )}

              {/* Description */}
              {selectedProject.description && (
                <p style={{ color: '#4b5563', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {selectedProject.description}
                </p>
              )}

              {/* Highlights Checklist */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                  {selectedProject.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.82rem', color: '#374151' }}>
                      <CheckCircle2 size={14} color={selectedProject.accentColor || '#c25e00'} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Stack Tags */}
              {selectedProject.stack && selectedProject.stack.length > 0 && (
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {selectedProject.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.7rem',
                        color: '#4b5563',
                        backgroundColor: '#f8f6f0',
                        border: '1px solid #e2d9cf',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-heritage-primary"
                    style={{ flex: '1 1 180px', justifyContent: 'center', minHeight: '42px', fontSize: '0.84rem', padding: '0.65rem 1rem' }}
                  >
                    <ExternalLink size={14} />
                    <span>Abrir Aplicación en Vivo</span>
                  </a>
                )}

                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-heritage-secondary"
                  style={{ padding: '0.65rem 1rem', fontSize: '0.84rem', flex: '0 0 auto' }}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
