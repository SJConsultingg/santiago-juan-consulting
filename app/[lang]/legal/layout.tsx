import { getDictionary } from '@/i18n/dictionaries';
import LegalLayoutClient from '@/components/LegalLayoutClient';

export default async function LegalLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <LegalLayoutClient dictionary={dictionary} lang={lang}>
      {children}
    </LegalLayoutClient>
  );
} 