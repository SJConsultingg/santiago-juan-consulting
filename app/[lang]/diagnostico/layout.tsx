import { locales } from '@/middleware';
import { Metadata } from 'next';
import { SupportedLocale, getPageSEO, SEO_CONFIG } from '@/lib/seo-config';

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = params.lang as SupportedLocale;
  const pageSEO = getPageSEO('diagnostico', locale);
  
  return {
    title: pageSEO.title,
    description: pageSEO.description,
    keywords: pageSEO.keywords,
    metadataBase: new URL(SEO_CONFIG.SITE_URL),
    alternates: {
      canonical: `${SEO_CONFIG.SITE_URL}/${locale}/diagnostico`,
      languages: {
        'es': '/es/diagnostico',
        'en': '/en/diagnosis',
      },
    },
    openGraph: {
      title: pageSEO.title,
      description: pageSEO.description,
      url: `${SEO_CONFIG.SITE_URL}/${locale}/diagnostico`,
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

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 