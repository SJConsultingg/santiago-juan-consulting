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
}

export default function Logo({ 
  width = 40, 
  height = 40, 
  className = '', 
  priority = false,
  showText = true,
  textColor = 'text-secondary'
}: LogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <Image
          src={error ? '/Logo_blanco.png' : '/logo.png'}
          alt="Santiago Juan Consulting"
          width={width}
          height={height}
          className={`w-${width/4} h-${height/4} md:w-${width/4 + 1} md:h-${height/4 + 1} relative z-10 transition-all duration-500 group-hover:rotate-6 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setError(true);
            setIsLoaded(true);
          }}
        />
        {!isLoaded && (
          <div className={`w-${width/4} h-${height/4} md:w-${width/4 + 1} md:h-${height/4 + 1} bg-gray-200 rounded-full animate-pulse`} />
        )}
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