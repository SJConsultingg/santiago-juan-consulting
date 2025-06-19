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
const SITE_URL = 'https://www.santiagosg.com';
const SITE_IMAGE = `${SITE_URL}/og_image.png`;
const TWITTER_HANDLE = '@santiagojuanconsulting';

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  
  const ogTitle = params.lang === 'es' 
    ? 'Santiago Juan Consulting | Consultoría en procesos y marketing para startups'
    : 'Santiago Juan Consulting | Process and Marketing Consulting for Startups';
    
  const twitterTitle = params.lang === 'es'
    ? 'Santiago Juan Consulting | Consultoría para startups'
    : 'Santiago Juan Consulting | Consulting for startups';

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${params.lang}`,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
        { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' }
      ],
      apple: [
        { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' }
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
    creator: 'Santiago Juan',
    publisher: SITE_NAME,
    authors: [{ name: 'Santiago Juan' }],
    category: 'Business Consulting',
    openGraph: {
      title: ogTitle,
      description: dictionary.meta.description,
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
      title: twitterTitle,
      description: dictionary.meta.description,
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
        <meta name="apple-mobile-web-app-title" content="SJC" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <meta name="msapplication-TileColor" content="#00A6B2" />
        <meta name="theme-color" content="#00A6B2" />
        
        {/* Etiquetas hreflang para SEO multilingüe */}
        <link rel="alternate" hrefLang="es" href="https://www.santiagosg.com/es" />
        <link rel="alternate" hrefLang="en" href="https://www.santiagosg.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.santiagosg.com/es" />
        
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