/** @type {import('next').NextConfig} */
const { ANALYZE } = process.env;

// Importar el analizador de bundle solo cuando es necesario
const withBundleAnalyzer = ANALYZE
  ? require('@next/bundle-analyzer')({
      enabled: true,
    })
  : (config) => config;

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['assets.calendly.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  // Optimizaciones para mejor rendimiento
  poweredByHeader: false,
  compress: true,
  // Si el sitio se despliega en una ruta subdirectorio, configura la base path
  // basePath: '',
  
  // Configuración de i18n (no necesario con App Router, lo gestionamos con middleware)
  // i18n: {
  //   locales: ['es', 'en'],
  //   defaultLocale: 'es',
  // },
  
  // Configuración específica para analíticas y SEO
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
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
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// Exportar la configuración con el analizador de bundle cuando está habilitado
module.exports = withBundleAnalyzer(nextConfig); 