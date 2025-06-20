import { Metadata } from 'next';
import Script from 'next/script';
import { SEO_CONFIG, PageId, SupportedLocale, getPageSEO, getStructuredData } from '@/lib/seo-config';

interface SEOProps {
  pageId: PageId;
  locale: SupportedLocale;
  additionalStructuredData?: Record<string, any>;
}

export const generateMetadata = ({ pageId, locale }: SEOProps): Metadata => {
  const pageSEO = getPageSEO(pageId, locale);
  
  return {
    title: pageSEO.title,
    description: pageSEO.description,
    keywords: pageSEO.keywords,
    metadataBase: new URL(SEO_CONFIG.SITE_URL),
    alternates: {
      canonical: SEO_CONFIG.SITE_URL,
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
      google: SEO_CONFIG.GOOGLE_SITE_VERIFICATION,
    },
    openGraph: {
      title: pageSEO.title,
      description: pageSEO.description,
      url: SEO_CONFIG.SITE_URL,
      siteName: SEO_CONFIG.SITE_NAME,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: SEO_CONFIG.SITE_IMAGE,
          width: 1200,
          height: 630,
          alt: pageSEO.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSEO.title,
      description: pageSEO.description,
      creator: SEO_CONFIG.TWITTER_HANDLE,
      site: SEO_CONFIG.TWITTER_HANDLE,
      images: [
        {
          url: SEO_CONFIG.SITE_IMAGE,
          width: 1200,
          height: 630,
          alt: pageSEO.title,
        }
      ],
    },
  };
};

export default function SEO({ pageId, locale, additionalStructuredData = {} }: SEOProps) {
  const structuredData = getStructuredData(pageId, locale, additionalStructuredData);

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
} 