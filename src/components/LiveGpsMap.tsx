import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { 
  Radio, 
  Navigation, 
  AlertTriangle, 
  Wrench, 
  CheckCircle2, 
  XOctagon, 
  Play, 
  Activity, 
  Volume2,
  User, 
  Server
} from 'lucide-react';

// Route Waypoints along real roads: Santa Lucía ➔ RP 307 ➔ Acheral ➔ RN 38 ➔ Terminal de Monteros
const SANTA_LUCIA_TO_MONTEROS_COORDS: [number, number][] = [
  // 1. Santa Lucía (Plaza Principal y salida RP 307)
  [-65.5175, -27.0988],
  [-65.5132, -27.0995],
  [-65.5080, -27.1002],
  [-65.5020, -27.1015],
  [-65.4950, -27.1030],
  [-65.4880, -27.1050],
  [-65.4800, -27.1080],
  [-65.4720, -27.1110],
  [-65.4650, -27.1135],
  [-65.4580, -27.1160],
  
  // 2. Acheral (Acceso, Estación y Cruce RN 38)
  [-65.4520, -27.1185],
  [-65.4490, -27.1200],
  [-65.4475, -27.1225],

  // 3. RN 38 hacia el Sur rumbo a Monteros
  [-65.4510, -27.1270],
  [-65.4560, -27.1340],
  [-65.4610, -27.1405],
  [-65.4665, -27.1465],
  [-65.4720, -27.1515],
  [-65.4780, -27.1560],
  [-65.4835, -27.1595],

  // 4. Ingreso a Monteros (Av. Avellaneda / Leandro Aráoz / 24 de Septiembre ➔ Terminal)
  [-65.4880, -27.1625],
  [-65.4920, -27.1645],
  [-65.4955, -27.1660],
  [-65.4983, -27.1674] // Terminal de Ómnibus de Monteros
];

// Generate dense sub-waypoints for smooth movement along the road
function generateDensePath(points: [number, number][], stepsPerSegment: number = 8): [number, number][] {
  const dense: [number, number][] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    for (let s = 0; s < stepsPerSegment; s++) {
      const t = s / stepsPerSegment;
      dense.push([
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t
      ]);
    }
  }
  dense.push(points[points.length - 1]);
  return dense;
}

// Calculate bearing angle in degrees between two coordinates
function calculateBearing(start: [number, number], end: [number, number]): number {
  const dLng = end[0] - start[0];
  const dLat = end[1] - start[1];
  const angle = (Math.atan2(dLng, dLat) * 180) / Math.PI;
  return (angle + 360) % 360;
}

type BusState = 'NORMAL' | 'ALERT_RISK' | 'CRITICAL_BREAKDOWN' | 'IN_INSPECTION';

interface LogEvent {
  id: string;
  time: string;
  unit: string;
  type: 'info' | 'warning' | 'danger' | 'inspection';
  text: string;
}

export const LiveGpsMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const marker104 = useRef<maplibregl.Marker | null>(null);
  const marker108 = useRef<maplibregl.Marker | null>(null);
  const el104Ref = useRef<HTMLDivElement | null>(null);
  const el108Ref = useRef<HTMLDivElement | null>(null);

  const [activeTabMode, setActiveTabMode] = useState<'driver' | 'admin'>('driver');
  const [selectedBus, setSelectedBus] = useState<'104' | '108'>('104');
  
  // Status of the units
  const [status104, setStatus104] = useState<BusState>('NORMAL');
  const [status108, setStatus108] = useState<BusState>('NORMAL');

  const [currentSpeed, setCurrentSpeed] = useState(54);
  const [currentBearing, setCurrentBearing] = useState(135);
  const [wakeLockActive] = useState(true);
  const [eventLogs, setEventLogs] = useState<LogEvent[]>([
    {
      id: 'init-1',
      time: '18:30:00',
      unit: '#104',
      type: 'info',
      text: 'Unidad en ruta regular: Santa Lucía ➔ Monteros (Línea 104)'
    }
  ]);

  const densePath = useMemo(() => generateDensePath(SANTA_LUCIA_TO_MONTEROS_COORDS, 10), []);

  const addLog = (unit: string, type: LogEvent['type'], text: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setEventLogs((prev) => [{ id: Math.random().toString(), time: timeStr, unit, type, text }, ...prev.slice(0, 7)]);
  };

  // Sound Synthesizer via Web Audio API
  const playSound = (type: 'chime' | 'warning' | 'alarm' | 'neutral') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'alarm') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'warning') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // Audio context unavailable
    }
  };

  // Helper to get visual theme based on BusStatus
  const getStatusTheme = (status: BusState) => {
    switch (status) {
      case 'ALERT_RISK':
        return {
          color: '#f59e0b',
          bg: '#78350f',
          badgeText: 'EN ALERTA / RIESGO',
          pulseClass: 'pulse-amber',
          label: '🟡 Alerta Chofer (Avería / Riesgo)'
        };
      case 'CRITICAL_BREAKDOWN':
        return {
          color: '#ef4444',
          bg: '#7f1d1d',
          badgeText: 'ROTURA GRAVE',
          pulseClass: 'pulse-red',
          label: '🔴 Rotura Grave (Auxilio Solicitado)'
        };
      case 'IN_INSPECTION':
        return {
          color: '#94a3b8',
          bg: '#1e293b',
          badgeText: 'EN REVISIÓN TÉCNICA',
          pulseClass: '',
          label: '🔘 En Revisión Técnica (Central)'
        };
      case 'NORMAL':
      default:
        return {
          color: '#38bdf8',
          bg: '#0c4a6e',
          badgeText: 'EN RUTA',
          pulseClass: 'pulse-blue',
          label: '🔵 En Marcha Regular'
        };
    }
  };

  // Render SVG Bus Icon Marker Element
  const createBusMarkerElement = (unitNumber: string, status: BusState, heading: number) => {
    const theme = getStatusTheme(status);
    const el = document.createElement('div');
    el.className = 'bus-marker-wrapper';
    el.style.position = 'relative';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    el.style.cursor = 'pointer';

    el.innerHTML = `
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: ${theme.bg};
        border: 2px solid ${theme.color};
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(0,0,0,0.8);
        transition: all 0.3s ease;
      " class="${theme.pulseClass}">
        <!-- SVG Bus Icon rotated to heading -->
        <div style="transform: rotate(${heading}deg); transition: transform 0.3s ease; display: flex; align-items: center; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${theme.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 6v6"></path>
            <path d="M16 6v6"></path>
            <path d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
            <circle cx="7" cy="18" r="2"></circle>
            <circle cx="17" cy="18" r="2"></circle>
          </svg>
        </div>
      </div>
      <div style="
        margin-top: 3px;
        background: rgba(6, 9, 17, 0.9);
        border: 1px solid ${theme.color};
        color: #ffffff;
        font-family: var(--font-mono, monospace);
        font-size: 10px;
        font-weight: 800;
        padding: 1px 6px;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.6);
        white-space: nowrap;
      ">
        #${unitNumber}
      </div>
    `;
    return el;
  };

  // Update marker visuals whenever status changes
  useEffect(() => {
    if (el104Ref.current) {
      const newEl104 = createBusMarkerElement('104', status104, currentBearing);
      el104Ref.current.innerHTML = newEl104.innerHTML;
    }
  }, [status104, currentBearing]);

  useEffect(() => {
    if (el108Ref.current) {
      const newEl108 = createBusMarkerElement('108', status108, (currentBearing + 180) % 360);
      el108Ref.current.innerHTML = newEl108.innerHTML;
    }
  }, [status108, currentBearing]);

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'dark-tiles': {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
              'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
              'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '&copy; CartoDB &copy; OpenStreetMap'
          }
        },
        layers: [
          {
            id: 'dark-tiles-layer',
            type: 'raster',
            source: 'dark-tiles',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [-65.4800, -27.1350], // Center between Santa Lucía, Acheral and Monteros
      zoom: 12.1,
      pitch: 30,
      bearing: 15,
      attributionControl: false
    });

    map.on('load', () => {
      // Add Road Route Polyline (Santa Lucía ➔ Acheral ➔ Monteros)
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: SANTA_LUCIA_TO_MONTEROS_COORDS
          }
        }
      });

      // Route Glow Outline
      map.addLayer({
        id: 'route-glow',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#0284c7',
          'line-width': 6,
          'line-opacity': 0.35,
          'line-blur': 3
        }
      });

      // Route Core Line
      map.addLayer({
        id: 'route-core',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#38bdf8',
          'line-width': 3
        }
      });

      // Add Waypoint Stop Dots
      const stops = [
        { name: 'Santa Lucía (Terminal / Plaza)', coord: SANTA_LUCIA_TO_MONTEROS_COORDS[0] },
        { name: 'Acheral (Cruce RN 38 / RP 307)', coord: SANTA_LUCIA_TO_MONTEROS_COORDS[11] },
        { name: 'Monteros (Terminal de Ómnibus)', coord: SANTA_LUCIA_TO_MONTEROS_COORDS[SANTA_LUCIA_TO_MONTEROS_COORDS.length - 1] }
      ];

      stops.forEach((stop, idx) => {
        const pin = document.createElement('div');
        pin.style.width = '12px';
        pin.style.height = '12px';
        pin.style.borderRadius = '50%';
        pin.style.backgroundColor = idx === 0 ? '#38bdf8' : idx === 2 ? '#10b981' : '#f59e0b';
        pin.style.border = '2px solid #ffffff';
        pin.style.boxShadow = '0 0 10px rgba(0,0,0,0.9)';

        new maplibregl.Marker({ element: pin })
          .setLngLat(stop.coord)
          .addTo(map);
      });

      // Unit #104 Marker
      const el104 = createBusMarkerElement('104', 'NORMAL', 135);
      el104Ref.current = el104;
      marker104.current = new maplibregl.Marker({ element: el104 })
        .setLngLat(SANTA_LUCIA_TO_MONTEROS_COORDS[0])
        .addTo(map);

      // Unit #108 Marker
      const el108 = createBusMarkerElement('108', 'NORMAL', 315);
      el108Ref.current = el108;
      marker108.current = new maplibregl.Marker({ element: el108 })
        .setLngLat(SANTA_LUCIA_TO_MONTEROS_COORDS[SANTA_LUCIA_TO_MONTEROS_COORDS.length - 1])
        .addTo(map);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Real-time Vehicle Position Simulation Step-by-Step on Street Network
  useEffect(() => {
    let step = 0;
    const totalSteps = densePath.length;

    const interval = setInterval(() => {
      // If Unit 104 is not stopped by critical breakdown or inspection, advance along Santa Lucía ➔ Monteros
      const is104Moving = status104 === 'NORMAL' || status104 === 'ALERT_RISK';
      const speed104 = status104 === 'ALERT_RISK' ? 18 : 54;

      if (is104Moving) {
        step = (step + 1) % totalSteps;
        const currentCoord104 = densePath[step];
        const nextCoord104 = densePath[(step + 1) % totalSteps];
        const bearing104 = calculateBearing(currentCoord104, nextCoord104);

        if (marker104.current) {
          marker104.current.setLngLat(currentCoord104);
        }

        setCurrentBearing(Math.round(bearing104));
        setCurrentSpeed(speed104 + Math.floor(Math.sin(step / 3) * 4));
      } else {
        setCurrentSpeed(0);
      }

      // Unit 108 travels in opposite direction (Monteros ➔ Santa Lucía)
      const is108Moving = status108 === 'NORMAL' || status108 === 'ALERT_RISK';
      if (is108Moving) {
        const revStep = (totalSteps - 1 - (step % totalSteps)) % totalSteps;
        const currentCoord108 = densePath[revStep];
        if (marker108.current) {
          marker108.current.setLngLat(currentCoord108);
        }
      }
    }, 450);

    return () => clearInterval(interval);
  }, [densePath, status104, status108]);

  // Handlers for Driver & Admin actions
  const handleDriverAction = (action: 'risk' | 'breakdown' | 'resume') => {
    const setTargetStatus = selectedBus === '104' ? setStatus104 : setStatus108;

    if (action === 'risk') {
      setTargetStatus('ALERT_RISK');
      playSound('warning');
      addLog(`#${selectedBus}`, 'warning', `Chofer activó ALERTA PREVENTIVA (Riesgo en ruta / Avería menor). Velocidad reducida.`);
    } else if (action === 'breakdown') {
      setTargetStatus('CRITICAL_BREAKDOWN');
      playSound('alarm');
      addLog(`#${selectedBus}`, 'danger', `Chofer reportó ROTURA GRAVE. Unidad inmovilizada. Solicitando auxilio a central.`);
    } else if (action === 'resume') {
      setTargetStatus('NORMAL');
      playSound('chime');
      addLog(`#${selectedBus}`, 'info', `Chofer reanudó el servicio. Unidad en marcha normal.`);
    }
  };

  const handleAdminAction = (action: 'inspect' | 'authorize') => {
    const setTargetStatus = selectedBus === '104' ? setStatus104 : setStatus108;

    if (action === 'inspect') {
      setTargetStatus('IN_INSPECTION');
      playSound('neutral');
      addLog(`#${selectedBus}`, 'inspection', `Central marcó unidad en REVISIÓN TÉCNICA (Mecánicos en taller). Pin en mapa en gris.`);
    } else if (action === 'authorize') {
      setTargetStatus('NORMAL');
      playSound('chime');
      addLog(`#${selectedBus}`, 'info', `Central AUTORIZÓ SALIDA a servicio. Pin en mapa en azul.`);
    }
  };

  const handleCenterBus = (busId: '104' | '108') => {
    setSelectedBus(busId);
    if (!mapInstance.current) return;
    const targetMarker = busId === '104' ? marker104.current : marker108.current;
    if (targetMarker) {
      const pos = targetMarker.getLngLat();
      mapInstance.current.flyTo({ center: [pos.lng, pos.lat], zoom: 13.2, speed: 1.1 });
    }
  };

  const currentActiveStatus = selectedBus === '104' ? status104 : status108;
  const activeTheme = getStatusTheme(currentActiveStatus);

  return (
    <div
      style={{
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: '#060911',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
        position: 'relative'
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: 'rgba(12, 18, 32, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.45rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(37, 99, 235, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            <Radio size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                Sistema GIS & Telemetría Vehicular en Vivo
              </span>
              <span className="glass-pill" style={{ color: '#10b981', fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                ● 60 FPS Satelital
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Recorrido Vial Real: Santa Lucía ➔ Acheral ➔ Monteros (Tucumán)
            </p>
          </div>
        </div>

        {/* Unit Selector & Audio Test */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleCenterBus('104')}
            className="glass-pill"
            style={{
              cursor: 'pointer',
              borderColor: selectedBus === '104' ? '#38bdf8' : 'rgba(255,255,255,0.08)',
              color: selectedBus === '104' ? '#ffffff' : '#94a3b8',
              backgroundColor: selectedBus === '104' ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem'
            }}
          >
            <Navigation size={13} />
            <span>Unidad #104 ({selectedBus === '104' ? currentSpeed : 54} km/h)</span>
          </button>

          <button
            onClick={() => handleCenterBus('108')}
            className="glass-pill"
            style={{
              cursor: 'pointer',
              borderColor: selectedBus === '108' ? '#10b981' : 'rgba(255,255,255,0.08)',
              color: selectedBus === '108' ? '#ffffff' : '#94a3b8',
              backgroundColor: selectedBus === '108' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem'
            }}
          >
            <Navigation size={13} />
            <span>Unidad #108 (Monteros ➔ Santa Lucía)</span>
          </button>

          <button
            onClick={() => playSound('chime')}
            className="glass-pill"
            style={{
              cursor: 'pointer',
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
              color: '#38bdf8'
            }}
            title="Sonar Chime"
          >
            <Volume2 size={13} />
            <span>Chime</span>
          </button>
        </div>
      </div>

      {/* Map Viewport */}
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '380px',
          backgroundColor: '#060911',
          position: 'relative'
        }}
      />

      {/* Real-time Interactive Control Center (Driver Terminal ↔ Central Dispatch) */}
      <div
        style={{
          padding: '1.25rem',
          background: 'rgba(12, 18, 32, 0.98)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '1.25rem'
        }}
        className="map-control-grid"
      >
        {/* Left Column: Interactive State Controls */}
        <div>
          {/* Tab Switcher: Modo Chofer vs Modo Central */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.65rem' }}>
            <button
              onClick={() => setActiveTabMode('driver')}
              style={{
                background: activeTabMode === 'driver' ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
                border: activeTabMode === 'driver' ? '1px solid #38bdf8' : '1px solid transparent',
                color: activeTabMode === 'driver' ? '#ffffff' : '#94a3b8',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <User size={14} />
              <span>Consola del Chofer (Unidad #{selectedBus})</span>
            </button>

            <button
              onClick={() => setActiveTabMode('admin')}
              style={{
                background: activeTabMode === 'admin' ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
                border: activeTabMode === 'admin' ? '1px solid #38bdf8' : '1px solid transparent',
                color: activeTabMode === 'admin' ? '#ffffff' : '#94a3b8',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Server size={14} />
              <span>Central de Despacho & Taller</span>
            </button>
          </div>

          {/* Active State Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Estado Actual en Mapa:</span>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                backgroundColor: activeTheme.bg,
                border: `1px solid ${activeTheme.color}`,
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeTheme.color }} />
              <span>{activeTheme.badgeText}</span>
            </div>
          </div>

          {/* Driver Buttons */}
          {activeTabMode === 'driver' && (
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleDriverAction('risk')}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid #f59e0b',
                  color: '#f59e0b',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <AlertTriangle size={15} />
                <span>⚠️ Alerta / En Riesgo (Amarillo)</span>
              </button>

              <button
                onClick={() => handleDriverAction('breakdown')}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <XOctagon size={15} />
                <span>🚨 Rotura Grave (Rojo)</span>
              </button>

              <button
                onClick={() => handleDriverAction('resume')}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(37, 99, 235, 0.2)',
                  border: '1px solid #38bdf8',
                  color: '#38bdf8',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Play size={15} />
                <span>▶️ Reanudar Marcha (Azul)</span>
              </button>
            </div>
          )}

          {/* Central / Admin Buttons */}
          {activeTabMode === 'admin' && (
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleAdminAction('inspect')}
                style={{
                  flex: 1,
                  minWidth: '150px',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(100, 116, 139, 0.2)',
                  border: '1px solid #94a3b8',
                  color: '#e2e8f0',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Wrench size={15} />
                <span>🛠️ Marcar en Revisión Técnica (Gris)</span>
              </button>

              <button
                onClick={() => handleAdminAction('authorize')}
                style={{
                  flex: 1,
                  minWidth: '150px',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#10b981',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <CheckCircle2 size={15} />
                <span>✅ Autorizar y Despachar a Ruta (Azul)</span>
              </button>
            </div>
          )}

          {/* Live Telemetry Info */}
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Velocidad GPS</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                {currentSpeed} km/h
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Rumbo (Bearing)</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                {currentBearing}° SE
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Wake Lock API</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: wakeLockActive ? '#10b981' : '#ef4444' }}>
                {wakeLockActive ? 'Activo (Pantalla ON)' : 'Inactivo'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Event Log */}
        <div
          style={{
            backgroundColor: 'rgba(6, 9, 17, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '0.75rem',
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Bitácora de Eventos en Tiempo Real
              </span>
              <Activity size={13} color="#38bdf8" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '140px', overflowY: 'auto' }}>
              {eventLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    fontSize: '0.725rem',
                    color: log.type === 'danger' ? '#f87171' : log.type === 'warning' ? '#fbbf24' : log.type === 'inspection' ? '#cbd5e1' : '#94a3b8',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.4rem',
                    lineHeight: 1.4
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#64748b', flexShrink: 0 }}>[{log.time}]</span>
                  <span>{log.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.35rem' }}>
            Sincronizado con Firestore Serverless • Transporte Santa Lucía SRL
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .map-control-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
