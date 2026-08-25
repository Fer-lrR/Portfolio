import React from 'react';

interface TechIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 32, className = '' }) => {
  switch (name) {
    case 'typescript':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path
            d="M58.5 73.8c-2.4 3.7-6 6.3-10.8 6.3-8 0-14.2-5.7-14.2-15.3 0-9.8 6.5-15.7 14.8-15.7 4.6 0 8.1 2.2 10.3 5.4l-6.3 4.5c-1.3-2-2.9-3.2-5-3.2-3.8 0-6.7 3.3-6.7 9 0 5.6 2.8 8.8 6.5 8.8 2.2 0 3.8-1.2 5.1-3.2l6.3 4.4zm16.4-23.7h29.2v7.5H89.5v28.8H81.3V57.6H74.9v-7.5z"
            fill="#FFFFFF"
          />
          <path
            d="M37.5 70.4c1.6 2.8 4.7 4.8 8.7 4.8 4.6 0 7.8-2.3 7.8-6.1 0-3.6-2.5-5.2-6.9-6.9-6-2.3-10.1-5-10.1-10.8 0-6.1 4.9-10.6 12.3-10.6 4.7 0 8.5 1.8 11 5.1l-5.3 4.8c-1.6-2-3.5-3.1-6.1-3.1-3.3 0-5.3 1.8-5.3 4.1 0 2.8 2.2 4.1 6.5 5.7 6.6 2.5 10.6 5.3 10.6 11.7 0 7-5.5 11.5-14.1 11.5-6 0-10.9-2.5-13.8-6.6l4.7-5.6z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'react':
      return (
        <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'javascript':
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#F7DF1E" />
          <path
            d="M38.5 98.2c2.4 4 6.7 6.8 13.5 6.8 8.5 0 13.9-4.8 13.9-15.4V43.2H52.5v46.1c0 4.2-1.9 6.2-5.4 6.2-2.8 0-4.6-1.5-6-4.5l-2.6 7.2zm38.2-1.5c4 6.6 11.2 10.3 20.6 10.3 12.3 0 20.4-6.3 20.4-16.7 0-9.8-6.4-13.9-17-18.6-7.3-3.2-10.4-5.2-10.4-9.3 0-3.9 3.2-6.8 8.4-6.8 4.7 0 7.8 1.9 10.2 6.1l9.6-6.4c-4.8-7.8-12.2-11.2-19.8-11.2-11.7 0-19.6 6.8-19.6 16.4 0 9.8 6 14.3 16.2 18.7 7.7 3.4 11.1 5.6 11.1 10.1 0 4.6-4 7.6-9.9 7.6-6.5 0-10.6-3.4-13.3-8.8l-10.4 6.6z"
            fill="#000000"
          />
        </svg>
      );

    case 'vite':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
          <defs>
            <linearGradient id="viteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#41D1FF" />
              <stop offset="100%" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="viteBolt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFEA83" />
              <stop offset="100%" stopColor="#FFDD35" />
            </linearGradient>
          </defs>
          <path
            d="M29.5 5.8L16.7 29.3c-.3.6-1.1.6-1.4 0L2.5 5.8c-.4-.7.1-1.6.9-1.5l13.1 1.9c.3 0 .7 0 1 0L28.6 4.3c.8-.1 1.3.8.9 1.5z"
            fill="url(#viteGrad)"
          />
          <path
            d="M20.9 4.3L12.4 16.2c-.2.3.1.8.5.7l4.3-1.1-3.2 9.1c-.2.6.6 1 .9.5l9.2-12.7c.3-.4-.1-.9-.5-.8l-4.7 1.2 3.1-7.8c.2-.7-.5-1.3-1.1-.9z"
            fill="url(#viteBolt)"
          />
        </svg>
      );

    case 'tailwind':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#38BDF8">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );

    case 'pwa':
      return (
        <svg width={size} height={size} viewBox="0 0 512 512" className={className}>
          <defs>
            <linearGradient id="pwaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5A0FC8" />
              <stop offset="100%" stopColor="#8A2BE2" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" rx="90" fill="url(#pwaGrad)" />
          <path
            d="M136 296l-32 96H48l88-256h72l88 256h-56l-32-96h-72zm18-52h36l-18-58-18 58zm190 148h-50V136h50v256zm96 0h-50V136h50v256z"
            fill="#FFFFFF"
          />
          <circle cx="369" cy="200" r="28" fill="#00E5FF" />
          <circle cx="440" cy="300" r="28" fill="#FF4081" />
        </svg>
      );

    case 'html5_css3':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
          <path d="M6 6l5 46 21 6 21-6 5-46H6z" fill="#E44D26" />
          <path d="M32 10v44.2l17-4.8 4.2-39.4H32z" fill="#F16529" />
          <path d="M32 20h14.5l-.6 6.5H32v6.5h13.2l-1.2 13.5-12 3.3V44l7-1.9.5-5.6H32v-6.5h12.5" fill="#EBEBEB" />
          <path d="M32 20H17.5l.6 6.5H32v6.5H18.7l1.2 13.5 12.1 3.3V44l-7-1.9-.5-5.6H32" fill="#FFFFFF" />
        </svg>
      );

    case 'firebase':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
          <path
            d="M3.89 15.672L6.255.94a.8.8 0 0 1 1.482-.249l3.528 6.586-7.375 8.395zm16.22 0l-2.072-13.1a.8.8 0 0 0-1.417-.384l-12.73 13.484 7.828 4.414a1.867 1.867 0 0 0 1.79 0l6.6-4.414z"
            fill="#FFC400"
          />
          <path
            d="M14.07 8.528l-2.734-5.242a.8.8 0 0 0-1.424 0L3.89 15.672l7.734-4.38a1.867 1.867 0 0 1 1.789 0l.657.372v-3.136z"
            fill="#FFA000"
          />
          <path
            d="M3.89 15.672l7.734 4.36a1.867 1.867 0 0 0 1.789 0l6.6-4.36-4.04-6.44-1.246-.704a1.867 1.867 0 0 0-1.789 0l-9.048 7.144z"
            fill="#FF6F00"
          />
        </svg>
      );

    case 'realtime_db':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#FFA000" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="#FFA000" fillOpacity="0.2" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <circle cx="12" cy="12" r="2" fill="#FFA000" />
          <path d="M12 10v4" stroke="#FFF" strokeWidth="1.5" />
          <path d="M10 12h4" stroke="#FFF" strokeWidth="1.5" />
        </svg>
      );

    case 'supabase':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M13.2 2L3 14.4h8.4L10.8 22 21 9.6h-8.4L13.2 2z"
            fill="#3ECF8E"
          />
          <path
            d="M13.2 2L7 9.6h5.4L10.8 22l7.2-9.6h-5.4L13.2 2z"
            fill="#249361"
            fillOpacity="0.4"
          />
        </svg>
      );

    case 'sql':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#0284C7" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="#0284C7" fillOpacity="0.25" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M7 10h4v4H7z" fill="#0284C7" fillOpacity="0.4" stroke="none" />
          <path d="M13 10h4v4h-4z" fill="#0284C7" fillOpacity="0.6" stroke="none" />
        </svg>
      );

    case 'netlify':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#00C7B7">
          <path d="M16.92 11.23l-3.69-3.69a1.06 1.06 0 0 0-1.5 0l-.75.75 4.44 4.44.75-.75a1.06 1.06 0 0 0 0-1.5l.75.75zm-6.69-2.19l-4.44 4.44a1.06 1.06 0 0 0 0 1.5l3.69 3.69a1.06 1.06 0 0 0 1.5 0l4.44-4.44-5.19-5.19zM22 6.54l-2.46-2.46a1.06 1.06 0 0 0-1.5 0l-1.37 1.37 3.96 3.96 1.37-1.37a1.06 1.06 0 0 0 0-1.5zM2 17.46l2.46 2.46a1.06 1.06 0 0 0 1.5 0l1.37-1.37-3.96-3.96L2 15.96a1.06 1.06 0 0 0 0 1.5z" />
        </svg>
      );

    case 'cloudflare':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#F38020">
          <path d="M18.2 9.5c-.4-2.8-2.8-5-5.7-5-2.2 0-4.1 1.2-5.1 3-.3 0-.6-.1-.9-.1-2.5 0-4.5 2-4.5 4.5 0 .3 0 .6.1.9C.9 13.5 0 14.8 0 16.4 0 18.9 2.1 21 4.6 21h13.8c3.1 0 5.6-2.5 5.6-5.6 0-2.8-2.1-5.1-4.8-5.5v-.4z" />
        </svg>
      );

    case 'serverless':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#FD5750" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#FD5750" fillOpacity="0.15" />
          <path d="M13 11l-3 4h4l-2 5" stroke="#FD5750" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'leaflet':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2C7.5 2 4 5.5 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.5-3.5-8-8-8z"
            fill="#199900"
            fillOpacity="0.2"
            stroke="#199900"
            strokeWidth="2"
          />
          <path
            d="M12 6c-2.21 0-4 1.79-4 4 0 2.5 4 6 4 6s4-3.5 4-6c0-2.21-1.79-4-4-4z"
            fill="#199900"
          />
          <circle cx="12" cy="10" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'wakelock':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#F59E0B" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="3" fill="#F59E0B" fillOpacity="0.15" />
          <circle cx="12" cy="11" r="3" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="12" cy="11" r="1" fill="#F59E0B" />
          <path d="M12 18h.01" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M9 5h6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'webaudio':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#EC4899" strokeWidth="2">
          <path d="M2 10v4" strokeLinecap="round" />
          <path d="M6 6v12" strokeLinecap="round" />
          <path d="M10 3v18" strokeLinecap="round" />
          <path d="M14 8v8" strokeLinecap="round" />
          <path d="M18 5v14" strokeLinecap="round" />
          <path d="M22 10v4" strokeLinecap="round" />
        </svg>
      );

    case 'websockets':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#06B6D4" strokeWidth="2">
          <circle cx="6" cy="12" r="3" fill="#06B6D4" fillOpacity="0.3" />
          <circle cx="18" cy="12" r="3" fill="#06B6D4" fillOpacity="0.3" />
          <path d="M9 10l3-2 3 2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 14l-3 2-3-2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12h6" strokeDasharray="2 2" />
        </svg>
      );

    case 'sonicpanel':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#8B5CF6" strokeWidth="2">
          <circle cx="12" cy="12" r="2" fill="#8B5CF6" />
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" strokeLinecap="round" />
        </svg>
      );

    case 'nodejs':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
          <path
            d="M16 2L3 9.5v15L16 32l13-7.5v-15L16 2z"
            fill="#5FA04E"
          />
          <path
            d="M16 4.5l10.8 6.2v12.5L16 29.5 5.2 23.2V10.7L16 4.5z"
            fill="#333333"
          />
          <path
            d="M15.5 10v12l4-2.3v-7.4l4-2.3-8-4.5v4.5z"
            fill="#5FA04E"
          />
        </svg>
      );

    case 'polyglot':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#E76F00" strokeWidth="2">
          <path d="M16 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 4l-4 16" stroke="#FFA726" strokeLinecap="round" />
        </svg>
      );

    case 'algorithms':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#6366F1" strokeWidth="2">
          <circle cx="12" cy="5" r="3" fill="#6366F1" fillOpacity="0.3" />
          <circle cx="6" cy="18" r="3" fill="#6366F1" fillOpacity="0.3" />
          <circle cx="18" cy="18" r="3" fill="#6366F1" fillOpacity="0.3" />
          <path d="M10 7.5L7.5 15.5" strokeLinecap="round" />
          <path d="M14 7.5l2.5 8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.5" fill="#6366F1" />
        </svg>
      );

    case 'git':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#F05032">
          <path d="M21.62 10.66L13.34 2.38a2.12 2.12 0 0 0-3 0L8.4 4.32l3.78 3.78a2.52 2.52 0 0 1 3.18 3.19l3.64 3.64a2.53 2.53 0 0 1 2.62 4.29 2.53 2.53 0 0 1-4.29-2.62l-3.39-3.39v5.15a2.53 2.53 0 1 1-2 0V9.43a2.52 2.52 0 0 1-1.35-3.31L6.82 4.34 2.38 8.78a2.12 2.12 0 0 0 0 3l8.28 8.28a2.12 2.12 0 0 0 3 0l7.96-7.96a2.12 2.12 0 0 0 0-3.01l-.02-.43z" />
        </svg>
      );

    case 'cicd':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#10B981" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" fill="#10B981" fillOpacity="0.2" />
        </svg>
      );

    case 'cleancode':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="2">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="#38BDF8" fillOpacity="0.15" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
  }
};
