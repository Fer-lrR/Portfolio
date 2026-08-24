import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Shield, Volume2, Radio, Navigation } from 'lucide-react';

// Route Waypoints: Monteros ↔ Acheral ↔ Santa Lucía (Tucumán, Argentina)
const ROUTE_COORDINATES: [number, number][] = [
  [-65.4983, -27.1674], // Terminal de Monteros
  [-65.4850, -27.1550], // Salida Ruta 38 Monteros
  [-65.4620, -27.1320], // Parada Km 750
  [-65.4450, -27.1150], // Cruce Acheral
  [-65.4280, -27.1020], // Acceso Este
  [-65.4124, -27.0950], // Entrada Santa Lucía
  [-65.4050, -27.0910]  // Plaza Principal Santa Lucía
];

export const LiveGpsMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const marker104 = useRef<maplibregl.Marker | null>(null);
  const marker108 = useRef<maplibregl.Marker | null>(null);

  const [currentSpeed, setCurrentSpeed] = useState(58);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [wakeLockActive, setWakeLockActive] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedBus, setSelectedBus] = useState<'104' | '108'>('104');

  // Sonar Chime (Luxury dual-sine chime)
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      masterGain.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.12);
      osc1.connect(masterGain);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, ctx.currentTime);
      osc2.connect(masterGain);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.55);
      osc2.stop(ctx.currentTime + 0.55);

      setIsAudioPlaying(true);
      setTimeout(() => setIsAudioPlaying(false), 550);
    } catch {
      console.log('Audio Context unavailable');
    }
  };

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Initialize MapLibre GL with CartoDB Dark Matter tile style
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
      center: [-65.4500, -27.1300], // Center between Monteros and Santa Lucía
      zoom: 12.2,
      pitch: 35,
      bearing: -20,
      attributionControl: false
    });

    map.on('load', () => {
      // 1. Add Route Polyline
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: ROUTE_COORDINATES
          }
        }
      });

      // Route Glow Outline Layer
      map.addLayer({
        id: 'route-glow',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#06b6d4',
          'line-width': 8,
          'line-opacity': 0.4,
          'line-blur': 4
        }
      });

      // Route Core Line Layer
      map.addLayer({
        id: 'route-core',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#38bdf8',
          'line-width': 4
        }
      });

      // 2. Add Stop Markers
      ROUTE_COORDINATES.forEach((coord, idx) => {
        const el = document.createElement('div');
        el.className = 'map-stop-pin';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = idx === 0 || idx === ROUTE_COORDINATES.length - 1 ? '#10b981' : '#64748b';
        el.style.border = '2px solid #ffffff';
        el.style.boxShadow = '0 0 8px rgba(0,0,0,0.8)';

        new maplibregl.Marker({ element: el })
          .setLngLat(coord)
          .addTo(map);
      });

      // 3. Add Custom Vehicle Marker for UNIDAD #104
      const el104 = document.createElement('div');
      el104.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(6, 182, 212, 0.35); animation: pulse-ring 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;"></div>
          <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #06b6d4); border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 800; font-size: 11px; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.8);">
            104
          </div>
        </div>
      `;
      marker104.current = new maplibregl.Marker({ element: el104 })
        .setLngLat(ROUTE_COORDINATES[0])
        .addTo(map);

      // 4. Add Custom Vehicle Marker for UNIDAD #108
      const el108 = document.createElement('div');
      el108.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(16, 185, 129, 0.35); animation: pulse-ring 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 0.5s;"></div>
          <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #06b6d4); border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 800; font-size: 11px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.8);">
            108
          </div>
        </div>
      `;
      marker108.current = new maplibregl.Marker({ element: el108 })
        .setLngLat(ROUTE_COORDINATES[ROUTE_COORDINATES.length - 1])
        .addTo(map);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Real-time Vehicle Movement Simulator along coordinates
  useEffect(() => {
    let step = 0;
    const totalWaypoints = ROUTE_COORDINATES.length;

    const interval = setInterval(() => {
      step = (step + 1) % (totalWaypoints * 10);
      const index104 = Math.floor(step / 10);
      const nextIndex104 = (index104 + 1) % totalWaypoints;
      const progress104 = (step % 10) / 10;

      // Linear interpolation between waypoints
      const startCoord104 = ROUTE_COORDINATES[index104];
      const endCoord104 = ROUTE_COORDINATES[nextIndex104];

      const lng104 = startCoord104[0] + (endCoord104[0] - startCoord104[0]) * progress104;
      const lat104 = startCoord104[1] + (endCoord104[1] - startCoord104[1]) * progress104;

      if (marker104.current) {
        marker104.current.setLngLat([lng104, lat104]);
      }

      // Reverse direction for #108
      const revIndex108 = totalWaypoints - 1 - index104;
      const revNextIndex108 = Math.max(0, revIndex108 - 1);
      const startCoord108 = ROUTE_COORDINATES[revIndex108];
      const endCoord108 = ROUTE_COORDINATES[revNextIndex108];

      const lng108 = startCoord108[0] + (endCoord108[0] - startCoord108[0]) * progress104;
      const lat108 = startCoord108[1] + (endCoord108[1] - startCoord108[1]) * progress104;

      if (marker108.current) {
        marker108.current.setLngLat([lng108, lat108]);
      }

      setCurrentStopIndex(index104);
      setCurrentSpeed(Math.floor(45 + Math.sin(step) * 18));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const handleCenterBus = (busId: '104' | '108') => {
    setSelectedBus(busId);
    if (!mapInstance.current) return;
    const targetMarker = busId === '104' ? marker104.current : marker108.current;
    if (targetMarker) {
      const pos = targetMarker.getLngLat();
      mapInstance.current.flyTo({ center: [pos.lng, pos.lat], zoom: 13.5, speed: 1.2 });
    }
  };

  const stopNames = [
    'Terminal de Monteros',
    'Salida Ruta 38 (Monteros)',
    'Parada Km 750',
    'Cruce Acheral',
    'Acceso Este',
    'Entrada Santa Lucía',
    'Plaza Principal Santa Lucía'
  ];

  return (
    <div
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        background: '#020617',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
        position: 'relative'
      }}
    >
      {/* Top HUD Telemetry Bar */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(2, 6, 23, 0.98))',
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
              backgroundColor: 'rgba(6, 182, 212, 0.15)',
              color: '#06b6d4',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}
          >
            <Radio size={18} className={isAudioPlaying ? 'pulse-radar' : ''} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc' }}>
                Simulador Satelital GIS en Tiempo Real
              </span>
              <span className="glass-pill" style={{ color: '#10b981', fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                ● 60 FPS
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Transporte Santa Lucía SRL • Línea Monteros ↔ Santa Lucía
            </p>
          </div>
        </div>

        {/* Bus Selector & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleCenterBus('104')}
            className="glass-pill"
            style={{
              cursor: 'pointer',
              borderColor: selectedBus === '104' ? '#06b6d4' : 'rgba(255,255,255,0.08)',
              color: selectedBus === '104' ? '#ffffff' : '#94a3b8',
              backgroundColor: selectedBus === '104' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem'
            }}
          >
            <Navigation size={13} />
            <span>Unidad #104 ({currentSpeed} km/h)</span>
          </button>

          <button
            onClick={() => handleCenterBus('108')}
            className="glass-pill"
            style={{
              cursor: 'pointer',
              borderColor: selectedBus === '108' ? '#10b981' : 'rgba(255,255,255,0.08)',
              color: selectedBus === '108' ? '#ffffff' : '#94a3b8',
              backgroundColor: selectedBus === '108' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem'
            }}
          >
            <Navigation size={13} />
            <span>Unidad #108 (52 km/h)</span>
          </button>

          <button
            onClick={playChime}
            className="btn-primary"
            style={{
              padding: '0.4rem 0.85rem',
              fontSize: '0.75rem',
              borderRadius: '0.5rem',
              background: isAudioPlaying ? 'linear-gradient(135deg, #06b6d4, #10b981)' : 'linear-gradient(135deg, #2563eb, #06b6d4)'
            }}
          >
            <Volume2 size={13} />
            <span>{isAudioPlaying ? 'Chime...' : 'Audio Chime'}</span>
          </button>
        </div>
      </div>

      {/* MapLibre GL Map Viewport */}
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '420px',
          backgroundColor: '#020617',
          position: 'relative'
        }}
      />

      {/* Floating Bottom Telemetry Widget */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          zIndex: 10,
          background: 'rgba(2, 6, 23, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '0.85rem',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>
            Próxima Parada Estimada
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
            {stopNames[currentStopIndex]}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Velocidad GPS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              {currentSpeed} <span style={{ fontSize: '0.75rem' }}>km/h</span>
            </div>
          </div>

          <button
            onClick={() => setWakeLockActive(!wakeLockActive)}
            className="glass-pill"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              color: wakeLockActive ? '#10b981' : '#f43f5e',
              borderColor: wakeLockActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)',
              cursor: 'pointer'
            }}
          >
            <Shield size={13} />
            <span>WakeLock: {wakeLockActive ? 'Activo' : 'Inactivo'}</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pulse-radar {
          animation: pulse-radar-anim 0.5s ease infinite alternate;
        }
        @keyframes pulse-radar-anim {
          from { transform: scale(1); }
          to { transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};
