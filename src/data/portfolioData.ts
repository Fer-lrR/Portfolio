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
  companyRole: 'Full Stack Developer / Fundador',
  bio: 'Desarrollador Full Stack y estudiante avanzado de Ingeniería en Sistemas de Información (UTN). Experiencia en la creación de aplicaciones web progresivas (PWAs), arquitecturas cloud y telemetría en tiempo real. Ayudante de cátedra universitario en Algoritmos y Estructuras de Datos, con formación como instructor de idioma inglés.',
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
    impact: 'Monitoreo en tiempo real de frecuencias de viaje con alta disponibilidad y arquitectura serverless eficiente.',
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
    role: 'Full Stack Developer / Fundador',
    company: 'RoDevs Software Solutions',
    location: 'Tucumán, Argentina',
    badge: 'Desarrollo & Arquitectura',
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
      'Lectura técnica, documentación de arquitectura y comunicación internacional.',
      'Redacción de especificaciones técnicas y requerimientos en idioma inglés.'
    ],
    tags: ['Inglés Técnico', 'Documentación']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend & UI',
    icon: 'Layout',
    skills: [
      {
        id: 'typescript',
        name: 'TypeScript',
        iconKey: 'typescript',
        brandColor: '#3178C6',
        description: 'Tipado estático riguroso y contratos de datos para arquitecturas web escalables.',
        highlight: true
      },
      {
        id: 'react',
        name: 'React.js (React 19 / 18)',
        iconKey: 'react',
        brandColor: '#61DAFB',
        description: 'Desarrollo de SPA reactivas de alto rendimiento y arquitectura modular de componentes.',
        highlight: true
      },
      {
        id: 'javascript',
        name: 'JavaScript (ES6+)',
        iconKey: 'javascript',
        brandColor: '#F7DF1E',
        description: 'Programación asíncrona avanzada, Event Loop, Closures y manipulación de Canvas API.'
      },
      {
        id: 'vite',
        name: 'Vite',
        iconKey: 'vite',
        brandColor: '#BD34FE',
        description: 'Bundling ultrarrápido con Hot Module Replacement (HMR) y compilación optimizada.',
        highlight: true
      },
      {
        id: 'tailwind',
        name: 'TailwindCSS',
        iconKey: 'tailwind',
        brandColor: '#38BDF8',
        description: 'Diseño de interfaces modernas, utilidades atómicas y sistemas de diseño adaptables.'
      },
      {
        id: 'pwa',
        name: 'Progressive Web Apps (PWA)',
        iconKey: 'pwa',
        brandColor: '#A855F7',
        description: 'Capacidades offline, Service Workers, instalación móvil nativa y Wake Lock API.',
        highlight: true
      },
      {
        id: 'html5_css3',
        name: 'HTML5 & CSS3 Modular',
        iconKey: 'html5_css3',
        brandColor: '#E44D26',
        description: 'Estructura semántica, accesibilidad web (a11y) y animaciones fluidas a 60 FPS.'
      }
    ]
  },
  {
    title: 'Cloud & Bases de Datos',
    icon: 'Cloud',
    skills: [
      {
        id: 'firebase',
        name: 'Google Firebase (Firestore, Auth)',
        iconKey: 'firebase',
        brandColor: '#FFA611',
        description: 'Persistencia NoSQL en tiempo real, autenticación segura y reglas estrictas de seguridad.',
        highlight: true
      },
      {
        id: 'realtime_db',
        name: 'Firebase Realtime Database',
        iconKey: 'realtime_db',
        brandColor: '#FFA000',
        description: 'Sincronización instantánea de estados concurrentes y telemetría vehicular de baja latencia.',
        highlight: true
      },
      {
        id: 'supabase_postgres',
        name: 'Supabase / PostgreSQL',
        iconKey: 'supabase',
        brandColor: '#3ECF8E',
        description: 'Bases de datos relacionales robustas, Row Level Security (RLS) y APIs automáticas.'
      },
      {
        id: 'sql',
        name: 'SQL (SQL Server, MySQL)',
        iconKey: 'sql',
        brandColor: '#0284C7',
        description: 'Consultas relacionales complejas, optimización de índices, normalización y modelado de datos.'
      },
      {
        id: 'netlify_cloudflare',
        name: 'Netlify / Cloudflare Pages',
        iconKey: 'netlify',
        brandColor: '#00C7B7',
        description: 'Despliegue Jamstack continuo en Edge CDN con protección contra ataques y 0.01s TTFB.',
        highlight: true
      },
      {
        id: 'serverless',
        name: 'Arquitecturas Serverless',
        iconKey: 'serverless',
        brandColor: '#FD5750',
        description: 'Infraestructura elástica de alta concurrencia, escalabilidad automática y máxima eficiencia cloud.',
        highlight: true
      }
    ]
  },
  {
    title: 'Web APIs & Tiempo Real',
    icon: 'Smartphone',
    skills: [
      {
        id: 'leaflet_gis',
        name: 'Leaflet GIS / OpenStreetMap',
        iconKey: 'leaflet',
        brandColor: '#199900',
        description: 'Renderizado de capas satelitales, trazado de rutas viales reales y seguimiento GPS en vivo.',
        highlight: true
      },
      {
        id: 'wakelock',
        name: 'Wake Lock API',
        iconKey: 'wakelock',
        brandColor: '#F59E0B',
        description: 'Prevención del apagado de pantalla en smartphones durante trayectos de telemetría.',
        highlight: true
      },
      {
        id: 'webaudio',
        name: 'Web Audio API',
        iconKey: 'webaudio',
        brandColor: '#EC4899',
        description: 'Sintetizador de alertas acústicas y ecualizadores nativos sin consumo de archivos de audio pesados.'
      },
      {
        id: 'websockets_rest',
        name: 'REST APIs & WebSockets',
        iconKey: 'websockets',
        brandColor: '#06B6D4',
        description: 'Comunicación full-duplex de alta concurrencia y contratos API estructurados en tiempo real.',
        highlight: true
      },
      {
        id: 'sonicpanel',
        name: 'Sonic Panel Streaming Audio',
        iconKey: 'sonicpanel',
        brandColor: '#8B5CF6',
        description: 'Integración y reproducción de streams de audio 24/7 con reconexión automática y tolerancia a fallos.'
      }
    ]
  },
  {
    title: 'Ingeniería & Metodologías',
    icon: 'Cpu',
    skills: [
      {
        id: 'nodejs',
        name: 'Node.js & Express',
        iconKey: 'nodejs',
        brandColor: '#5FA04E',
        description: 'Servicios de backend asíncronos, middlewares y automatización de procesos.'
      },
      {
        id: 'polyglot',
        name: 'Java, C#, C++',
        iconKey: 'polyglot',
        brandColor: '#E76F00',
        description: 'Paradigmas orientados a objetos, robustez empresarial y optimización de memoria.'
      },
      {
        id: 'algorithms',
        name: 'Algoritmos & Estructuras de Datos',
        iconKey: 'algorithms',
        brandColor: '#6366F1',
        description: 'Análisis de complejidad Big-O, grafos, árboles y ayudantía de cátedra en UTN.',
        highlight: true
      },
      {
        id: 'git_github',
        name: 'Git & GitHub Workflows',
        iconKey: 'git',
        brandColor: '#F05032',
        description: 'Control de versiones profesional, ramas GitFlow, pull requests y +370 contribuciones anuales.',
        highlight: true
      },
      {
        id: 'cicd',
        name: 'CI/CD & Despliegue Continuo',
        iconKey: 'cicd',
        brandColor: '#10B981',
        description: 'Pipelines automatizados de construcción, validación de tipos y publicación inmediata.'
      },
      {
        id: 'cleancode',
        name: 'Clean Code & Patrones de Diseño',
        iconKey: 'cleancode',
        brandColor: '#38BDF8',
        description: 'Principios SOLID, arquitectura modular limpia, código autodocumentado y alta mantenibilidad.',
        highlight: true
      }
    ]
  }
];
