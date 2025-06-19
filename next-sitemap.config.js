/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.santiagosg.com',
  generateRobotsTxt: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/404', '/500'],
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
    // Personalizar la prioridad según la ruta
    let priority = 0.7;
    if (path === '/es' || path === '/en') {
      priority = 1.0;
    } else if (path.includes('/diagnostico') || path.includes('/diagnosis')) {
      priority = 0.9;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
}; 