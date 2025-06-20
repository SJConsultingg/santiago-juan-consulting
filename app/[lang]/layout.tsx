import '../globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleTagManager from '@/components/GoogleTagManager';
import CookieConsent from '@/components/CookieConsent';
import { getDictionary } from '@/i18n/dictionaries';
import { DictionaryProvider } from '@/context/DictionaryProvider';
import ClientLayout from './ClientLayout';
import { Dictionary } from '@/types/dictionary';
import SEO from '@/components/SEO';
import { locales } from '@/middleware';
import { Metadata } from 'next';
import { PageId, SupportedLocale, getPageSEO, SEO_CONFIG } from '@/lib/seo-config';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = params.lang as SupportedLocale;
  const pageId: PageId = 'home';
  
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
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(params.lang);
  
  return (
    <html lang={params.lang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <GoogleTagManager />
        <DictionaryProvider dictionary={dictionary} lang={params.lang}>
          <SEO pageId="home" locale={params.lang as 'es' | 'en'} />
          <ClientLayout dictionary={dictionary} lang={params.lang}>
            {children}
          </ClientLayout>
          <CookieConsent />
        </DictionaryProvider>
      </body>
    </html>
  );
} 