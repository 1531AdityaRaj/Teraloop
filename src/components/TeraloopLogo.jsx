import React from 'react';

/**
 * TeraloopLogo Component
 * Renders the official Teraloop logo with scalable vectors and gradients.
 * 
 * Props:
 * - variant: 'horizontal' (default, header friendly) | 'full' (stacked) | 'icon' (emblem only)
 * - size: number or string (height in px)
 * - className: optional CSS classes
 */
export function TeraloopLogo({ variant = 'horizontal', size, className = '' }) {
  if (variant === 'icon') {
    return (
      <svg
        className={`teraloop-logo-svg teraloop-logo-icon ${className}`}
        viewBox="0 0 100 100"
        width={size || 38}
        height={size || 38}
        role="img"
        aria-label="Teraloop Logo"
      >
        <defs>
          <linearGradient id="tlStem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#057a55" />
            <stop offset="50%" stop-color="#045a3f" />
            <stop offset="100%" stop-color="#023a28" />
          </linearGradient>
          <linearGradient id="tlBar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#02422e" />
            <stop offset="50%" stop-color="#057a55" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
          <linearGradient id="tlRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#047857" />
            <stop offset="40%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#4ade80" />
          </linearGradient>
          <linearGradient id="tlLeaf" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#059669" />
            <stop offset="100%" stop-color="#34d399" />
          </linearGradient>
        </defs>
        <g transform="translate(5, 5) scale(0.9)">
          <path d="M 15 20 C 15 15, 20 12, 28 12 L 72 12 C 80 12, 85 15, 85 20 C 85 25, 80 28, 72 28 L 58 28 L 58 30 L 42 30 L 42 28 L 28 28 C 20 28, 15 25, 15 20 Z" fill="url(#tlBar)" />
          <path d="M 44 26 L 56 26 C 58 26, 60 28, 60 30 L 60 82 C 60 86, 56 90, 52 90 L 48 90 C 44 90, 40 86, 40 82 L 40 30 C 40 28, 42 26, 44 26 Z" fill="url(#tlStem)" />
          <path d="M 45 42 C 32 30, 14 38, 10 52 C 6 68, 20 80, 35 78 C 46 76, 56 65, 68 55 C 80 45, 92 46, 96 55 C 99 62, 97 70, 90 76 C 82 82, 72 78, 68 70 C 72 76, 80 78, 85 76 C 90 73, 92 68, 90 62 C 88 56, 80 54, 72 60 C 60 70, 50 82, 36 84 C 18 86, 2 74, 4 54 C 6 36, 24 24, 40 32 Z" fill="url(#tlRibbon)" />
          <path d="M 88 52 C 88 38, 98 25, 110 20 C 112 32, 106 48, 95 54 Z" fill="url(#tlLeaf)" />
          <path d="M 72 45 C 72 34, 80 24, 90 23 C 92 33, 86 44, 78 48 Z" fill="url(#tlLeaf)" />
        </g>
      </svg>
    );
  }

  return (
    <div className={`teraloop-brand-container ${variant} ${className}`}>
      <div className="teraloop-emblem-wrap">
        <svg
          className="teraloop-logo-icon"
          viewBox="0 0 100 100"
          width={size || 44}
          height={size || 44}
          role="img"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="tlStem2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#057a55" />
              <stop offset="50%" stopColor="#045a3f" />
              <stop offset="100%" stopColor="#023a28" />
            </linearGradient>
            <linearGradient id="tlBar2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#02422e" />
              <stop offset="50%" stopColor="#057a55" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="tlRibbon2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            <linearGradient id="tlLeaf2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <g transform="translate(5, 5) scale(0.9)">
            <path d="M 15 20 C 15 15, 20 12, 28 12 L 72 12 C 80 12, 85 15, 85 20 C 85 25, 80 28, 72 28 L 58 28 L 58 30 L 42 30 L 42 28 L 28 28 C 20 28, 15 25, 15 20 Z" fill="url(#tlBar2)" />
            <path d="M 44 26 L 56 26 C 58 26, 60 28, 60 30 L 60 82 C 60 86, 56 90, 52 90 L 48 90 C 44 90, 40 86, 40 82 L 40 30 C 40 28, 42 26, 44 26 Z" fill="url(#tlStem2)" />
            <path d="M 45 42 C 32 30, 14 38, 10 52 C 6 68, 20 80, 35 78 C 46 76, 56 65, 68 55 C 80 45, 92 46, 96 55 C 99 62, 97 70, 90 76 C 82 82, 72 78, 68 70 C 72 76, 80 78, 85 76 C 90 73, 92 68, 90 62 C 88 56, 80 54, 72 60 C 60 70, 50 82, 36 84 C 18 86, 2 74, 4 54 C 6 36, 24 24, 40 32 Z" fill="url(#tlRibbon2)" />
            <path d="M 88 52 C 88 38, 98 25, 110 20 C 112 32, 106 48, 95 54 Z" fill="url(#tlLeaf2)" />
            <path d="M 72 45 C 72 34, 80 24, 90 23 C 92 33, 86 44, 78 48 Z" fill="url(#tlLeaf2)" />
          </g>
        </svg>
      </div>

      <div className="teraloop-typography">
        <div className="teraloop-wordmark">
          <span className="teraloop-letters-front">Tera</span>
          <span className="teraloop-infinity-oo">
            <svg viewBox="0 0 54 26" width="30" height="15" aria-hidden="true">
              <defs>
                <linearGradient id="ooGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              <path
                d="M 13 2 C 6 2, 1 7, 1 13 C 1 19, 6 24, 13 24 C 19 24, 23 20, 27 15 C 31 20, 35 24, 41 24 C 48 24, 53 19, 53 13 C 53 7, 48 2, 41 2 C 35 2, 31 6, 27 11 C 23 6, 19 2, 13 2 Z M 13 8 C 17 8, 20 10, 20 13 C 20 16, 17 18, 13 18 C 9 18, 7 16, 7 13 C 7 10, 9 8, 13 8 Z M 41 8 C 45 8, 47 10, 47 13 C 47 16, 45 18, 41 18 C 37 18, 34 16, 34 13 C 34 10, 37 8, 41 8 Z"
                fill="url(#ooGrad)"
              />
            </svg>
          </span>
          <span className="teraloop-letters-back">p</span>
        </div>
        <div className="teraloop-tagline">SUSTAINABLE TOMORROW, TOGETHER</div>
      </div>
    </div>
  );
}

export default TeraloopLogo;
