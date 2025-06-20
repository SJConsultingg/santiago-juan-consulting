export const PERFORMANCE_CONFIG = {
  // Configuración de imágenes
  images: {
    domains: ['opengraph.b-cdn.net'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 días
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Configuración de caché
  cache: {
    // Páginas estáticas
    staticPages: {
      maxAge: 60 * 60 * 24 * 7, // 7 días
      staleWhileRevalidate: 60 * 60 * 24, // 1 día
    },
    // Recursos estáticos (CSS, JS, imágenes)
    staticAssets: {
      maxAge: 60 * 60 * 24 * 30, // 30 días
      staleWhileRevalidate: 60 * 60 * 24 * 7, // 7 días
    },
    // API endpoints
    api: {
      maxAge: 60 * 60, // 1 hora
      staleWhileRevalidate: 60 * 5, // 5 minutos
    }
  },

  // Configuración de Service Worker
  serviceWorker: {
    enable: true,
    scope: '/',
    precacheUrls: [
      '/',
      '/es',
      '/en',
      '/diagnostico',
      '/diagnosis',
      '/favicon.ico',
      '/manifest.json',
    ],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
          },
        },
      },
      {
        urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-font-assets',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 días
          },
        },
      },
      {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-image-assets',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
          },
        },
      },
      {
        urlPattern: /\.(?:js)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-js-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 días
          },
        },
      },
      {
        urlPattern: /\.(?:css|less)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-style-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 días
          },
        },
      },
      {
        urlPattern: /\.(?:json|xml|csv)$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'static-data-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60 * 24, // 24 horas
          },
        },
      },
    ],
  },

  // Configuración de lazy loading
  lazyLoading: {
    // Distancia del viewport para empezar a cargar
    rootMargin: '50px 0px',
    // Umbral de visibilidad para activar la carga
    threshold: 0.1,
    // Elementos a cargar de forma lazy por defecto
    defaultElements: ['img', 'iframe', 'video'],
  },
}; 