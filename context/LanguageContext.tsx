'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LanguageContextType {
  currentLocale: string;
  setCurrentLocale: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLocale: 'es',
  setCurrentLocale: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState('es');
  const pathname = usePathname();

  useEffect(() => {
    // Extraer el idioma de la URL
    const locale = pathname?.split('/')[1] || 'es';
    setCurrentLocale(locale);
  }, [pathname]);

  return (
    <LanguageContext.Provider value={{ currentLocale, setCurrentLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
