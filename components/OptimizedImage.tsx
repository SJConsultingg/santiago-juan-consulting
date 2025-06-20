'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { PERFORMANCE_CONFIG } from '@/lib/performance-config';
import LazyLoad from './LazyLoad';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'loading' | 'placeholder'> {
  lazyLoad?: boolean;
  withBlur?: boolean;
}

// Componente de imagen optimizado con lazy loading, blur placeholder y manejo de errores
export default function OptimizedImage({
  src,
  alt,
  width = 0,
  height = 0,
  className = '',
  lazyLoad = true,
  withBlur = true,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const imageWidth = typeof width === 'number' ? width : parseInt(width.toString(), 10) || 0;
  const imageHeight = typeof height === 'number' ? height : parseInt(height.toString(), 10) || 0;

  // Placeholder blur para imágenes
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="0%" />
          <stop stop-color="#edeef1" offset="20%" />
          <stop stop-color="#f6f7f8" offset="40%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

  const imageComponent = (
    <Image
      src={src}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className={`transition-opacity duration-300 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      } ${className}`}
      onLoadingComplete={() => setIsLoading(false)}
      priority={priority}
      placeholder={withBlur ? `data:image/svg+xml;base64,${toBase64(shimmer(imageWidth, imageHeight))}` : 'empty'}
      {...props}
    />
  );

  if (!lazyLoad || priority) {
    return imageComponent;
  }

  return (
    <LazyLoad
      rootMargin={PERFORMANCE_CONFIG.lazyLoading.rootMargin}
      threshold={PERFORMANCE_CONFIG.lazyLoading.threshold}
      placeholder={
        <div
          style={{ width: imageWidth, height: imageHeight }}
          className="animate-pulse bg-gray-200 rounded"
          role="presentation"
        />
      }
    >
      {imageComponent}
    </LazyLoad>
  );
}

// Añadir displayName para herramientas de desarrollo
OptimizedImage.displayName = 'OptimizedImage'; 