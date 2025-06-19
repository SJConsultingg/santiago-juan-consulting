'use client';

import { useState } from 'react';

interface StaticLogoProps {
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
  variant?: 'acento' | 'secundario';
}

export default function StaticLogo({ 
  width = 40, 
  height = 40, 
  className = '', 
  showText = true,
  textColor = 'text-secondary',
  variant = 'acento'
}: StaticLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Elegir el logo según la variante o usar fallback en caso de error
  const logoSrc = hasError 
    ? '/logo_acento.png' 
    : variant === 'acento' 
      ? '/logo_acento.png' 
      : '/logo_secundario.png';

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        {/* Placeholder mientras carga */}
        {!isLoaded && (
          <div 
            className="bg-gray-200 rounded-full animate-pulse absolute inset-0" 
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        )}
        <img
          src={logoSrc}
          alt="Santiago Juan Consulting"
          width={width}
          height={height}
          className={`relative z-10 transition-all duration-500 group-hover:rotate-6 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`text-base md:text-lg font-bold ${textColor} tracking-tight`}>
            Santiago Juan
          </span>
          <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wider">
            CONSULTING
          </span>
        </div>
      )}
    </div>
  );
} 