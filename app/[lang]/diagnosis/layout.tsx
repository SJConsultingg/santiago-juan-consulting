import { locales } from '@/middleware';

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export default function DiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 