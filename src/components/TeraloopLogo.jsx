import React from 'react';
import logoImg from '../assets/teraloop-logo.png';

/**
 * TeraloopLogo Component
 * Renders the exact official Teraloop logo image provided by the team.
 */
export function TeraloopLogo({ className = '', height = 48, alt = 'Teraloop - Sustainable Tomorrow, Together' }) {
  return (
    <div className={`teraloop-brand-wrapper ${className}`}>
      <img
        src={logoImg}
        alt={alt}
        className="teraloop-official-logo"
        style={{ height: `${height}px`, width: 'auto', display: 'block', objectFit: 'contain' }}
      />
    </div>
  );
}

export default TeraloopLogo;
