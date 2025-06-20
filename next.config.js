/** @type {import('next').NextConfig} */
const { ANALYZE } = process.env;
const PERFORMANCE_CONFIG = require('./lib/performance-config.js');

// Importar el analizador de bundle solo cuando es necesario
const withBundleAnalyzer = ANALYZE
  ? require('@next/bundle-analyzer')({
      enabled: true,
    })
  : (config) => config;

// Importar optimizador de PWA
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: PERFORMANCE_CONFIG.serviceWorker.register,
  scope: PERFORMANCE_CONFIG.serviceWorker.scope,
  sw: 'service-worker.js',
  exclude: PERFORMANCE_CONFIG.serviceWorker.exclude,
  runtimeCaching: PERFORMANCE_CONFIG.serviceWorker.runtimeCaching,
});

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: PERFORMANCE_CONFIG.images,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  // Optimizaciones para mejor rendimiento
  poweredByHeader: false,
  compress: true,
  
  // Configuración de headers para caché y seguridad
  headers: async () => {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ];

    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: `public, max-age=${PERFORMANCE_CONFIG.cache.staticPages.maxAge}, s-maxage=${PERFORMANCE_CONFIG.cache.staticPages.maxAge}, stale-while-revalidate=${PERFORMANCE_CONFIG.cache.staticPages.staleWhileRevalidate}`,
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: `public, max-age=${PERFORMANCE_CONFIG.cache.api.maxAge}, s-maxage=${PERFORMANCE_CONFIG.cache.api.maxAge}, stale-while-revalidate=${PERFORMANCE_CONFIG.cache.api.staleWhileRevalidate}`,
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${PERFORMANCE_CONFIG.cache.staticAssets.maxAge}, s-maxage=${PERFORMANCE_CONFIG.cache.staticAssets.maxAge}, stale-while-revalidate=${PERFORMANCE_CONFIG.cache.staticAssets.staleWhileRevalidate}`,
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|gif|ico|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${PERFORMANCE_CONFIG.cache.staticAssets.maxAge}, s-maxage=${PERFORMANCE_CONFIG.cache.staticAssets.maxAge}, stale-while-revalidate=${PERFORMANCE_CONFIG.cache.staticAssets.staleWhileRevalidate}`,
          },
        ],
      },
      {
        source: '/(.*).(js|css|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${PERFORMANCE_CONFIG.cache.staticAssets.maxAge}, s-maxage=${PERFORMANCE_CONFIG.cache.staticAssets.maxAge}, stale-while-revalidate=${PERFORMANCE_CONFIG.cache.staticAssets.staleWhileRevalidate}`,
          },
        ],
      },
    ];
  },
};

// Exportar la configuración con PWA y analizador de bundle
module.exports = withBundleAnalyzer(withPWA(nextConfig)); 