import { locales } from '@/middleware';

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 