/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.santiagosg.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  alternateRefs: [
    {
      href: 'https://www.santiagosg.com/es',
      hreflang: 'es',
    },
    {
      href: 'https://www.santiagosg.com/en',
      hreflang: 'en',
    },
  ],
  transform: async (config, path) => {
    // Personalizar prioridad para diferentes rutas
    // Las URLs de la raíz con idioma son las más importantes
    if (path === '/es' || path === '/en') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Páginas de diagnóstico/diagnóstico
    if (path.includes('/diagnosis') || path.includes('/diagnostico')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Excluir páginas de error y páginas específicas
    if (
      path.includes('/404') ||
      path.includes('/500') ||
      path.includes('/_')
    ) {
      return null;
    }

    // Configuración predeterminada para otras rutas
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/500', '/_*'],
      },
    ],
    additionalSitemaps: [],
  },
}; 