import '../globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleTagManager from '@/components/GoogleTagManager';
import CookieConsent from '@/components/CookieConsent';
import { getDictionary } from '@/i18n/dictionaries';
import { DictionaryProvider } from '@/context/DictionaryProvider';
import ClientLayout from './ClientLayout';
import { Dictionary } from '@/types/dictionary';

// Validación de idioma
import { locales } from '@/middleware';

const inter = Inter({ subsets: ['latin'] });

// Constantes globales
const SITE_NAME = 'Santiago Juan Consulting';
const SITE_URL = 'https://santiagojuanconsulting.com';
const SITE_IMAGE = 'https://opengraph.b-cdn.net/production/images/3e8f7ca7-c220-4d6b-a9af-65a48be2fe4c.png?token=xoXXhOSpCgm40eEiPa7Ify2MHrw7LGGVnWlpck-LpfQ&height=630&width=1200&expires=33286429856';
const TWITTER_HANDLE = '@santiagojuanconsulting';

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  
  const title = 'Santiago Juan Consulting | Consultoría en procesos y marketing para startups';
  const description = 'Consultoría en procesos internos y marketing para startups y ecommerce que quieren escalar con cabeza.';

  return {
    title,
    description,
    keywords: dictionary.meta.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    manifest: '/Favicons/site.webmanifest',
    icons: {
      icon: [
        { url: '/Favicons/favicon.ico', sizes: 'any', type: 'image/x-icon' },
        { url: '/Favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/Favicons/favicon.svg', type: 'image/svg+xml' }
      ],
      apple: [
        { url: '/Favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
      ]
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    verification: {
      google: 'tu-id-de-verificacion-de-google',
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: params.lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: SITE_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Santiago Juan Consulting - Consultoría en procesos y marketing para startups',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
      images: [
        {
          url: SITE_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Santiago Juan Consulting - Consultoría en procesos y marketing para startups',
        }
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(params.lang);
  
  // Servicios traducidos según el idioma
  const serviceTypes = params.lang === 'es' 
    ? ["Consultoría de procesos", "Marketing para startups", "Automatización"]
    : ["Process Consulting", "Startup Marketing", "Automation"];
    
  // Servicios detallados traducidos según el idioma
  const serviceDetails = params.lang === 'es' 
    ? [
        {
          "name": "Optimización de procesos internos",
          "description": "Análisis y mejora de flujos de trabajo para eliminar ineficiencias y reducir costes operativos mientras escalas."
        },
        {
          "name": "Automatización de marketing",
          "description": "Implementación de estrategias de email, SMS y CRM para nutrir prospectos y retener clientes sin más esfuerzo manual."
        },
        {
          "name": "Auditoría de embudos de conversión",
          "description": "Identificación de oportunidades en tus embudos de venta para aumentar conversiones y reducir abandonos."
        }
      ]
    : [
        {
          "name": "Internal Process Optimization",
          "description": "Analysis and improvement of workflows to eliminate inefficiencies and reduce operational costs while scaling."
        },
        {
          "name": "Marketing Automation",
          "description": "Implementation of email, SMS and CRM strategies to nurture prospects and retain customers without additional manual effort."
        },
        {
          "name": "Conversion Funnel Audit",
          "description": "Identification of opportunities in your sales funnels to increase conversions and reduce abandonment."
        }
      ];
      
  // Nombre del catálogo de servicios según idioma
  const catalogName = params.lang === 'es' ? "Servicios de Consultoría" : "Consulting Services";

  // Schema.org markup
  const schemaOrgWebPage = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': SITE_URL,
    name: SITE_NAME,
    description: dictionary.meta.description,
    url: SITE_URL,
    logo: `${SITE_URL}/logo_original.png`,
    image: SITE_IMAGE,
    priceRange: '$$',
    serviceType: serviceTypes,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    sameAs: [
      'https://www.linkedin.com/company/santiago-juan-consulting',
      'https://twitter.com/santiagojuanconsulting',
    ],
    founder: {
      '@type': 'Person',
      name: 'Santiago Juan',
      jobTitle: 'Founder & Consultant',
      sameAs: ['https://ar.linkedin.com/in/santiago-juan-673b06211'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: catalogName,
      itemListElement: serviceDetails.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
      })),
    },
    areaServed: {
      '@type': 'Country',
      name: 'Spain',
    },
    knowsLanguage: ['es', 'en'],
  };

  return (
    <html lang={params.lang}>
      <head>
        {/* HTML Meta Tags */}
        <meta name="description" content="Consultoría en procesos internos y marketing para startups y ecommerce que quieren escalar con cabeza." />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://santiagojuanconsulting.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Santiago Juan Consulting | Consultoría en procesos y marketing para startups" />
        <meta property="og:description" content="Consultoría en procesos internos y marketing para startups y ecommerce que quieren escalar con cabeza." />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/3e8f7ca7-c220-4d6b-a9af-65a48be2fe4c.png?token=xoXXhOSpCgm40eEiPa7Ify2MHrw7LGGVnWlpck-LpfQ&height=630&width=1200&expires=33286429856" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="santiagojuanconsulting.com" />
        <meta property="twitter:url" content="https://santiagojuanconsulting.com" />
        <meta name="twitter:title" content="Santiago Juan Consulting | Consultoría en procesos y marketing para startups" />
        <meta name="twitter:description" content="Consultoría en procesos internos y marketing para startups y ecommerce que quieren escalar con cabeza." />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/3e8f7ca7-c220-4d6b-a9af-65a48be2fe4c.png?token=xoXXhOSpCgm40eEiPa7Ify2MHrw7LGGVnWlpck-LpfQ&height=630&width=1200&expires=33286429856" />

        {/* Favicon Tags */}
        <meta name="apple-mobile-web-app-title" content="SJC" />
        <link rel="manifest" href="/Favicons/site.webmanifest" />
        <link rel="icon" type="image/png" href="/Favicons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/Favicons/favicon.svg" />
        <link rel="shortcut icon" href="/Favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Favicons/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#00A6B2" />
        <meta name="theme-color" content="#00A6B2" />
        
        {/* Etiquetas hreflang para SEO multilingüe */}
        <link rel="alternate" hrefLang="es" href="https://santiagojuanconsulting.com/es" />
        <link rel="alternate" hrefLang="en" href="https://santiagojuanconsulting.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://santiagojuanconsulting.com/es" />
        
        {/* Schema.org markup */}
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify(schemaOrgWebPage)}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Google Analytics y Google Tag Manager */}
        <GoogleAnalytics />
        <GoogleTagManager />
        
        <DictionaryProvider dictionary={dictionary} lang={params.lang}>
          <ClientLayout dictionary={dictionary} lang={params.lang}>
            {children}
          </ClientLayout>
        </DictionaryProvider>

        {/* Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
} 