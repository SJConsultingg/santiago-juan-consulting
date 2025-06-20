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
import SEO, { generateMetadata } from '@/components/SEO';
import { locales } from '@/middleware';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export { generateMetadata };

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