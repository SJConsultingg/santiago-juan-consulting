'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Dictionary } from '@/types/dictionary';

interface LanguageSelectorProps {
  dictionary: Dictionary;
  lang: string;
}

export default function LanguageSelector({ dictionary, lang }: LanguageSelectorProps) {
  const router = useRouter();

  const handleLanguageChange = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    const newPath = window.location.pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLanguageChange}
      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </motion.button>
  );
} 