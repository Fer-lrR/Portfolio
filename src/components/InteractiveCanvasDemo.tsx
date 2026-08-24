import React, { useState } from 'react';
import { Zap, CheckCircle2, Sliders, ArrowRight, RefreshCw } from 'lucide-react';

export const InteractiveCanvasDemo: React.FC = () => {
  const [quality, setQuality] = useState(0.75);
  const [maxDimension, setMaxDimension] = useState(450);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  // Simulated metrics for interactive preview
  const originalSizeKb = 8450; // ~8.4 MB
  const compressedSizeKb = Math.round((maxDimension * maxDimension * 0.00007 * quality) + 12);
  const reductionPercent = Math.round(((originalSizeKb - compressedSizeKb) / originalSizeKb) * 100);
  const timeMs = 18;

  const handleSimulateCompression = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessed(true);
    }, 250);
  };

  return (
    <div
      style={{
        background: 'rgba(11, 19, 41, 0.85)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
            <Zap size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              Simulador Interactivo: Compresor HTML5 Canvas
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Procesamiento de imagen en memoria del cliente antes del envío cloud
            </p>
          </div>
        </div>

        <span className="glass-pill" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <CheckCircle2 size={14} /> Latencia: ~{timeMs}ms
        </span>
      </div>

      {/* Interactive Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
          background: 'rgba(2, 6, 23, 0.6)',
          padding: '1rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
            <span>Resolución Máxima:</span>
            <strong style={{ color: '#38bdf8' }}>{maxDimension}px × {maxDimension}px</strong>
          </div>
          <input
            type="range"
            min="300"
            max="800"
            step="50"
            value={maxDimension}
            onChange={(e) => {
              setMaxDimension(Number(e.target.value));
              setProcessed(false);
            }}
            style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
            <span>Factor de Calidad:</span>
            <strong style={{ color: '#38bdf8' }}>{quality * 100}% (0.{quality * 100})</strong>
          </div>
          <input
            type="range"
            min="0.5"
            max="0.9"
            step="0.05"
            value={quality}
            onChange={(e) => {
              setQuality(Number(e.target.value));
              setProcessed(false);
            }}
            style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}
        className="canvas-compare-grid"
      >
        {/* Original */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '0.75rem',
            padding: '1rem',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Entrada (Cámara Celular)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
            8.45 MB
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            4000 × 3000 px (Raw Payload)
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#38bdf8' }}>
          <ArrowRight size={24} />
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#06b6d4', marginTop: '0.2rem' }}>
            -{reductionPercent}%
          </span>
        </div>

        {/* Compressed */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '0.75rem',
            padding: '1rem',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Salida Canvas Engine
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
            ~{compressedSizeKb} KB
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            {maxDimension} × {Math.round(maxDimension * 0.75)} px (Base64 Safe)
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <button
        onClick={handleSimulateCompression}
        disabled={isProcessing}
        className="btn-primary"
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '0.9rem',
          borderRadius: '0.65rem'
        }}
      >
        {isProcessing ? (
          <>
            <RefreshCw size={16} className="spin-animation" />
            <span>Dibujando en Canvas Virtual...</span>
          </>
        ) : processed ? (
          <>
            <CheckCircle2 size={16} />
            <span>¡Optimizado a ~{compressedSizeKb}KB! (Listo para Firestore)</span>
          </>
        ) : (
          <>
            <Sliders size={16} />
            <span>Procesar y Comprimir en Navegador</span>
          </>
        )}
      </button>

      <style>{`
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 550px) {
          .canvas-compare-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
