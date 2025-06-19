'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  showText?: boolean;
  textColor?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ 
  width = 40, 
  height = 40, 
  className = '', 
  priority = false,
  showText = true,
  textColor = 'text-secondary',
  variant = 'light'
}: LogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  
  // Lista de logos a intentar en orden
  const logoOptions = [
    '/logo.png',
    '/logo_acento.png',
    '/logo_blanco.png',
    '/logo_negro.png'
  ];

  const handleError = () => {
    // Si hay error, intentar el siguiente logo
    if (currentLogoIndex < logoOptions.length - 1) {
      setCurrentLogoIndex(currentLogoIndex + 1);
    }
    setIsLoaded(true);
  };

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        {/* Placeholder mientras carga */}
        {!isLoaded && (
          <div 
            className={`w-[${width}px] h-[${height}px] bg-gray-200 rounded-full animate-pulse absolute inset-0`} 
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        )}
        <Image
          src={logoOptions[currentLogoIndex]}
          alt="Santiago Juan Consulting"
          width={width}
          height={height}
          className={`relative z-10 transition-all duration-500 group-hover:rotate-6 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
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