'use client';

import { useState, useEffect, memo } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  lowQualitySrc?: string;
  className?: string;
}

// Componente de imagen optimizado con lazy loading, blur placeholder y manejo de errores
const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/image-placeholder.png',
  lowQualitySrc,
  className = '',
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Resetear estado cuando cambia la fuente
  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
    setError(false);
  }, [src]);

  // Manejar errores de carga
  const handleError = () => {
    setError(true);
    if (fallbackSrc && fallbackSrc !== imgSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  // Manejar carga exitosa
  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={props.fill ? { width: '100%', height: '100%' } : {}}>
      {/* Imagen de baja calidad como placeholder */}
      {lowQualitySrc && !isLoaded && !error && (
        <Image
          src={lowQualitySrc}
          alt={alt}
          className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 blur-md"
          {...props}
          onLoadingComplete={handleLoad}
        />
      )}

      {/* Imagen principal */}
      <Image
        src={imgSrc}
        alt={alt}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
        onLoadingComplete={handleLoad}
        onError={handleError}
      />

      {/* Estado de carga */}
      {!isLoaded && !error && !lowQualitySrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <span className="sr-only">Cargando...</span>
        </div>
      )}

      {/* Estado de error */}
      {error && imgSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
});

// Añadir displayName para herramientas de desarrollo
OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 