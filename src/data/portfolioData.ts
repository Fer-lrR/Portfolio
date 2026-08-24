import { Project, ExperienceItem, SkillCategory } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Luis Fernando Romano',
  shortName: 'Fernando Romano',
  title: 'Full Stack Developer & Software Architect',
  headline: 'Desarrollo de aplicaciones web de alto rendimiento, sistemas en tiempo real y arquitecturas cloud escalables.',
  location: 'Tucumán, Argentina',
  email: 'RomanoDevs@gmail.com',
  secondaryEmail: 'fer2024developer@gmail.com',
  phone: '+54 9 3863 537818',
  linkedin: 'https://www.linkedin.com/in/luis-fernando-romano-76a20b3a4',
  github: 'https://github.com/Fer-lrR',
  web: 'https://rodevsoftware.com',
  company: 'RoDevs Software Solutions',
  companyRole: 'Lead Full Stack Developer / Fundador',
  bio: 'Desarrollador Full Stack y estudiante avanzado de Ingeniería en Sistemas de Información (UTN). Experiencia en la creación de aplicaciones web progresivas (PWAs), arquitecturas cloud y telemetría en tiempo real. Ayudante de cátedra universitario en Algoritmos y Estructuras de Datos, con formación bilingüe como instructor de idioma inglés.',
  metrics: [
    { value: '+370', label: 'Contribuciones Anuales', detail: 'Actividad en repositorios' },
    { value: '0.01s', label: 'Carga Frontend', detail: 'Optimización de caché Edge' },
    { value: '45%', label: 'Reducción de Carga Manual', detail: 'Optimización de procesos' },
    { value: '100%', label: 'Disponibilidad de Servicio', detail: 'Sistemas en producción' }
  ]
};

export interface EngineeringTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  keyPoints: string[];
  techStack: string[];
  codeTitle: string;
  codeSnippet: string;
}

export const ENGINEERING_TOPICS: EngineeringTopic[] = [
  {
    id: 'telemetry-pwa',
    title: 'Telemetría y Seguimiento GPS en Tiempo Real',
    category: 'Arquitectura PWA & Web APIs',
    description: 'Implementación de aplicaciones web orientadas a dispositivos móviles para rastreo continuo de flotas. Integración de Wake Lock API para evitar la suspensión de la pantalla en ruta y transmisión eficiente de coordenadas con bajo consumo de datos móviles.',
    keyPoints: [
      'Uso de Wake Lock API para mantener activa la pantalla durante el recorrido.',
      'Sincronización reactiva con Firebase Firestore y actualización en tiempo real.',
      'Manejo de estado de conexión y reconexión automática en zonas de baja cobertura.',
      'Visualización cartográfica fluida mediante Leaflet GIS y capas OpenStreetMap.'
    ],
    techStack: ['React', 'TypeScript', 'Leaflet GIS', 'Firebase Firestore', 'Wake Lock API', 'TailwindCSS'],
    codeTitle: 'useWakeLock.ts',
    codeSnippet: `import { useEffect, useRef } from 'react';

export const useWakeLock = () => {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      console.warn('Wake Lock no disponible:', err);
    }
  };

  useEffect(() => {
    requestWakeLock();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') requestWakeLock();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      wakeLockRef.current?.release();
    };
  }, []);
};`
  },
  {
    id: 'streaming-realtime',
    title: 'Transmisión de Audio y Concurrencia en Vivo',
    category: 'Media Streaming & Infraestructura',
    description: 'Desarrollo de plataforma multiplataforma para emisión de audio en vivo de alta concurrencia. Configuración de servidores de streaming dedicados con Sonic Panel y sincronización en tiempo real para interacción comunitaria.',
    keyPoints: [
      'Configuración y enlace con servidores de transmisión de audio Sonic Panel.',
      'Reproducción de audio en segundo plano mediante Web Audio y Service Workers.',
      'Sincronización en tiempo real de agenda y chat con Firebase Realtime Database.',
      'Despliegue continuo con ruteo SPA sin caídas en producción.'
    ],
    techStack: ['React', 'TypeScript', 'Firebase Realtime DB', 'Sonic Panel', 'PWA', 'Netlify'],
    codeTitle: 'audioStreamService.ts',
    codeSnippet: `// Controlador de streaming con fallback de conexión
export class AudioStreamController {
  private audio: HTMLAudioElement;

  constructor(private streamUrl: string) {
    this.audio = new Audio();
    this.audio.preload = 'none';
  }

  public play() {
    this.audio.src = \`\${this.streamUrl}?nocache=\${Date.now()}\`;
    return this.audio.play();
  }

  public pause() {
    this.audio.pause();
    this.audio.src = '';
  }
}`
  },
  {
    id: 'client-optimization',
    title: 'Optimización de Rendimiento en Cliente & Serverless',
    category: 'Rendimiento & Frontend',
    description: 'Técnicas de reducción de payload y gestión de caché local para minimizar lecturas de base de datos y acelerar la carga en redes móviles 4G.',
    keyPoints: [
      'Procesamiento y compresión de imágenes en el navegador mediante HTML5 Canvas.',
      'Estrategias de invalidación de caché por versión para reducir lecturas de base de datos.',
      'Componentes desacoplados con TypeScript estricto y estilos modulares.',
      'Despliegues Jamstack en Cloudflare Pages y Netlify con latencias mínimas.'
    ],
    techStack: ['React 19', 'TypeScript', 'Vite', 'HTML5 Canvas API', 'Cloudflare', 'Firestore'],
    codeTitle: 'canvasCompressor.ts',
    codeSnippet: `export async function compressImageClient(
  dataUrl: string,
  maxWidth = 450,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });
}`
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'transporte-santa-lucia',
    title: 'Sistema de Tracking GPS y Telemetría',
    category: 'realtime',
    client: 'Transporte Santa Lucía SRL',
    tagline: 'Aplicación web orientada a móviles (PWA) para el seguimiento de flotas de transporte público en tiempo real.',
    description: 'Diseño y desarrollo de una plataforma integral de telemetría vehicular. Utiliza Wake Lock API para mantener activa la pantalla del conductor durante los trayectos, optimiza la sincronización de datos con Firebase Firestore y renderiza recorridos interactivos con mapas GIS.',
    architectureHighlights: [
      'Persistencia y sincronización de datos de baja latencia con Firebase Firestore.',
      'Integración de Wake Lock API para evitar la suspensión del dispositivo en ruta.',
      'Visualización cartográfica en tiempo real de unidades en recorrido con Leaflet GIS.',
      'Diseño responsive optimizado para uso táctil y pantallas móviles.'
    ],
    impact: 'Monitoreo en tiempo real de frecuencias de viaje con cero costo de servidores dedicados.',
    stack: ['React', 'TypeScript', 'Leaflet GIS', 'Firebase Firestore', 'PWA', 'TailwindCSS'],
    demoUrl: 'https://transportesantaluciaconnect.netlify.app',
    featured: true
  },
  {
    id: 'streaming-radio-app',
    title: 'Plataforma de Streaming & Radio App',
    category: 'mobile',
    client: 'Somos Santa Luceños / Emisora Regional',
    tagline: 'Aplicación web y móvil para transmisión ininterrumpida de audio en vivo y soporte de alta concurrencia.',
    description: 'Desarrollo de una solución completa de streaming con soporte para cientos de oyentes concurrentes. Integra infraestructura de transmisión administrada con Sonic Panel Radio y sincronización en tiempo real mediante Firebase Realtime Database.',
    architectureHighlights: [
      'Integración con servidores de audio Sonic Panel Radio para transmisión 24/7.',
      'Sincronización en tiempo real de agenda y chat con Firebase Realtime Database.',
      'Administración integral de infraestructura: dominios, hosting y configuración DNS.',
      'PWA instalable con reproducción de audio en segundo plano.'
    ],
    impact: 'Disponibilidad continua del 100% de la señal en dispositivos móviles y web.',
    stack: ['React', 'TypeScript', 'Firebase Realtime DB', 'Sonic Panel', 'PWA', 'Netlify'],
    demoUrl: 'https://somossantalucenosbyjorgebarrera.com.ar',
    featured: true
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: 'Enero 2024 – Presente',
    role: 'Lead Full Stack Developer / Fundador',
    company: 'RoDevs Software Solutions',
    location: 'Tucumán, Argentina',
    badge: 'Liderazgo Técnico',
    description: 'Liderazgo técnico y desarrollo de soluciones de software para clientes comerciales y de transporte. Diseño de arquitecturas web, integración de bases de datos y administración de infraestructura cloud.',
    bullets: [
      'Diseño y desarrollo del Sistema de Tracking GPS para Transporte Santa Lucía SRL con Wake Lock API y Firebase.',
      'Desarrollo de la Plataforma de Streaming para Somos Santa Luceños con Sonic Panel y Realtime Database.',
      'Construcción de sistemas de gestión empresarial, reduciendo tiempos de carga manual de datos en un 45%.',
      'Configuración de flujos de integración y despliegue continuo (CI/CD) en Netlify y Cloudflare.'
    ],
    tags: ['React 19', 'TypeScript', 'Firebase', 'Leaflet', 'PWA', 'TailwindCSS', 'CI/CD']
  },
  {
    period: '2022 – 2024',
    role: 'Desarrollador de Software',
    company: 'Consultoría IT y Proyectos Académicos/Industriales',
    location: 'Tucumán, Argentina',
    badge: 'Industria & Consultoría',
    description: 'Relevamiento de requerimientos técnicos y desarrollo de soluciones de software orientadas a la optimización de procesos operativos y trazabilidad.',
    bullets: [
      'Proyectos de optimización en Ingenio Famaillá y Salta Refrescos S.A., mejorando la eficiencia del área en un 30%.',
      'Desarrollo de soluciones aplicando paradigmas orientados a objetos en Java, C# y C++.',
      'Modelado de bases de datos relacionales SQL con altos estándares de integridad.'
    ],
    tags: ['Java', 'C#', '.NET', 'C++', 'SQL', 'UML', 'Modelado de Datos']
  },
  {
    period: '2019 – Presente',
    role: 'Ayudante Académico / Instructor',
    company: 'Universidad Tecnológica Nacional (UTN - FRT)',
    location: 'Tucumán, Argentina',
    badge: 'Docencia Universitaria',
    description: 'Mentoría y soporte técnico a estudiantes de ingeniería en asignaturas troncales de ciencias de la computación.',
    bullets: [
      'Soporte técnico y mentoría en Paradigmas de la Programación.',
      'Tutoría en Algoritmos y Estructuras de Datos.',
      'Enfoque en Clean Code, buenas prácticas de desarrollo y análisis de complejidad de algoritmos.'
    ],
    tags: ['Algoritmos', 'Estructuras de Datos', 'OOP', 'Mentoría', 'Clean Code']
  },
  {
    period: '2013 – 2019',
    role: 'English Instructor (Egresado)',
    company: 'Instituto Stratford ICLI',
    location: 'Monteros, Tucumán',
    badge: 'Certificación Profesional',
    description: 'Formación integral y certificación oficial como Instructor de Idioma Inglés con fluidez en lectura técnica y comunicación profesional.',
    bullets: [
      'Capacidad bilingüe para lectura técnica, documentación de arquitectura y comunicación internacional.',
      'Redacción de especificaciones técnicas y requerimientos en idioma inglés.'
    ],
    tags: ['Inglés Técnico', 'Bilingüe', 'Documentación']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend & UI',
    icon: 'Layout',
    skills: [
      { name: 'TypeScript', level: 'Master', highlight: true },
      { name: 'React.js (React 19 / 18)', level: 'Master', highlight: true },
      { name: 'JavaScript (ES6+)', level: 'Master' },
      { name: 'Vite', level: 'Advanced', highlight: true },
      { name: 'TailwindCSS', level: 'Master' },
      { name: 'Progressive Web Apps (PWA)', level: 'Master', highlight: true },
      { name: 'HTML5 & CSS3 Modular', level: 'Master' }
    ]
  },
  {
    title: 'Cloud & Bases de Datos',
    icon: 'Cloud',
    skills: [
      { name: 'Google Firebase (Firestore, Auth)', level: 'Master', highlight: true },
      { name: 'Firebase Realtime Database', level: 'Master', highlight: true },
      { name: 'Supabase / PostgreSQL', level: 'Advanced' },
      { name: 'SQL (SQL Server, MySQL)', level: 'Advanced' },
      { name: 'Netlify / Cloudflare Pages', level: 'Master', highlight: true },
      { name: 'Arquitecturas Serverless', level: 'Master', highlight: true }
    ]
  },
  {
    title: 'Web APIs & Tiempo Real',
    icon: 'Smartphone',
    skills: [
      { name: 'Leaflet GIS / OpenStreetMap', level: 'Master', highlight: true },
      { name: 'Wake Lock API', level: 'Master', highlight: true },
      { name: 'Web Audio API', level: 'Master' },
      { name: 'REST APIs & WebSockets', level: 'Master' },
      { name: 'Sonic Panel Streaming Audio', level: 'Advanced' }
    ]
  },
  {
    title: 'Ingeniería & Metodologías',
    icon: 'Cpu',
    skills: [
      { name: 'Node.js & Express', level: 'Advanced' },
      { name: 'Java, C#, C++', level: 'Advanced' },
      { name: 'Algoritmos & Estructuras de Datos', level: 'Master', highlight: true },
      { name: 'Git & GitHub Workflows', level: 'Master', highlight: true },
      { name: 'CI/CD & Despliegue Continuo', level: 'Advanced' },
      { name: 'Clean Code & Patrones de Diseño', level: 'Master', highlight: true }
    ]
  }
];
