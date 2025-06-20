export const SEO_CONFIG = {
  SITE_NAME: 'Santiago Juan Consulting',
  SITE_URL: 'https://santiagojuanconsulting.com',
  SITE_IMAGE: 'https://opengraph.b-cdn.net/production/images/3e8f7ca7-c220-4d6b-a9af-65a48be2fe4c.png?token=xoXXhOSpCgm40eEiPa7Ify2MHrw7LGGVnWlpck-LpfQ&height=630&width=1200&expires=33286429856',
  TWITTER_HANDLE: '@santiagojuanconsulting',
  LINKEDIN_URL: 'https://www.linkedin.com/company/santiago-juan-consulting',
  TWITTER_URL: 'https://twitter.com/santiagojuanconsulting',
  FOUNDER_LINKEDIN: 'https://ar.linkedin.com/in/santiago-juan-673b06211',
  DEFAULT_LOCALE: 'es',
  SUPPORTED_LOCALES: ['es', 'en'] as const,
  GOOGLE_SITE_VERIFICATION: 'tu-id-de-verificacion-de-google',
  
  // SEO por página
  PAGES: {
    home: {
      es: {
        title: 'Santiago Juan Consulting | Consultoría en procesos y marketing para startups',
        description: 'Consultoría en procesos internos y marketing para startups y ecommerce que quieren escalar con cabeza.',
        keywords: ['consultoría', 'marketing', 'startups', 'procesos', 'automatización', 'ecommerce'],
      },
      en: {
        title: 'Santiago Juan Consulting | Process & Marketing Consulting for Startups',
        description: 'Internal process and marketing consulting for startups and ecommerce businesses looking to scale smartly.',
        keywords: ['consulting', 'marketing', 'startups', 'processes', 'automation', 'ecommerce'],
      }
    },
    diagnostico: {
      es: {
        title: 'Diagnóstico Gratuito | Santiago Juan Consulting',
        description: 'Obtén un diagnóstico personalizado de tu startup o ecommerce. Identifica áreas de mejora en tus procesos y marketing.',
        keywords: ['diagnóstico', 'consultoría', 'análisis', 'startup', 'ecommerce'],
      },
      en: {
        title: 'Free Assessment | Santiago Juan Consulting',
        description: 'Get a personalized assessment of your startup or ecommerce. Identify improvement areas in your processes and marketing.',
        keywords: ['assessment', 'consulting', 'analysis', 'startup', 'ecommerce'],
      }
    }
  }
} as const;

export type SupportedLocale = typeof SEO_CONFIG.SUPPORTED_LOCALES[number];
export type PageId = keyof typeof SEO_CONFIG.PAGES;

export const getPageSEO = (pageId: PageId, locale: SupportedLocale) => {
  return {
    ...SEO_CONFIG.PAGES[pageId][locale],
    keywords: [...SEO_CONFIG.PAGES[pageId][locale].keywords]
  };
};

export const getStructuredData = (pageId: PageId, locale: SupportedLocale, additionalData = {}) => {
  const pageSEO = getPageSEO(pageId, locale);
  
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': SEO_CONFIG.SITE_URL,
    name: SEO_CONFIG.SITE_NAME,
    description: pageSEO.description,
    url: SEO_CONFIG.SITE_URL,
    logo: `${SEO_CONFIG.SITE_URL}/logo_original.png`,
    image: SEO_CONFIG.SITE_IMAGE,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    sameAs: [
      SEO_CONFIG.LINKEDIN_URL,
      SEO_CONFIG.TWITTER_URL,
    ],
    founder: {
      '@type': 'Person',
      name: 'Santiago Juan',
      jobTitle: 'Founder & Consultant',
      sameAs: [SEO_CONFIG.FOUNDER_LINKEDIN],
    },
  };

  return {
    ...baseStructuredData,
    ...additionalData
  };
}; 