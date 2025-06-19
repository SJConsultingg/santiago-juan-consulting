import '../globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getDictionary } from '@/i18n/dictionaries';
import { DictionaryProvider } from '@/context/DictionaryProvider';
import ClientLayout from './ClientLayout';

// Validación de idioma
import { locales } from '@/middleware';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  // Cargar diccionario según el idioma
  const dictionary = await getDictionary(params.lang);
  
  // Definimos las constantes para la metadata
  const SITE_NAME = 'Santiago Juan Consulting';
  const SITE_URL = 'https://www.santiagosg.com';

  // Titulos adaptados según el idioma
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
      canonical: params.lang === 'es' ? '/es' : '/en',
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    viewport: 'width=device-width, initial-scale=1.0',
    creator: 'Santiago Juan',
    publisher: SITE_NAME,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
        { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
        { url: '/icon0.svg', type: 'image/svg+xml' },
        { url: '/icon1.png', sizes: '256x256', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      title: ogTitle,
      description: dictionary.meta.description,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: params.lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Santiago Juan Consulting',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: dictionary.meta.description,
      creator: '@santiagojuanconsulting',
      images: [`${SITE_URL}/twitter-image.jpg`],
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
  // Cargar diccionario según el idioma
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

  return (
    <html lang={params.lang}>
      <head>
        <meta name="apple-mobile-web-app-title" content="SJC" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Etiquetas hreflang para SEO multilingüe */}
        <link rel="alternate" hrefLang="es" href="https://www.santiagosg.com/es" />
        <link rel="alternate" hrefLang="en" href="https://www.santiagosg.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.santiagosg.com/es" />
        
        {/* Marcado de esquema (Schema.org) para datos estructurados */}
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Santiago Juan Consulting",
              "description": "${dictionary.meta.description}",
              "url": "https://www.santiagosg.com",
              "logo": "https://www.santiagosg.com/logo.png",
              "image": "https://www.santiagosg.com/og-image.jpg",
              "priceRange": "$$",
              "serviceType": ${JSON.stringify(serviceTypes)},
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ES"
              },
              "sameAs": [
                "https://www.linkedin.com/company/santiago-juan-consulting",
                "https://twitter.com/santiagojuanconsulting"
              ],
              "founder": {
                "@type": "Person",
                "name": "Santiago Juan"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "${catalogName}",
                "itemListElement": [
                  ${serviceDetails.map((service, index) => `
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "${service.name}",
                        "description": "${service.description}"
                      }
                    }${index < serviceDetails.length - 1 ? ',' : ''}
                  `).join('')}
                ]
              }
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <GoogleAnalytics />
        
        <DictionaryProvider dictionary={dictionary} lang={params.lang}>
          <ClientLayout dictionary={dictionary} lang={params.lang}>
            {children}
          </ClientLayout>
        </DictionaryProvider>
      </body>
    </html>
  );
} 