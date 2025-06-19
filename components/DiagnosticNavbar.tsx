'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import StaticLogo from './StaticLogo';

interface NavbarProps {
  dictionary?: {
    navbar?: {
      services: string;
      process: string;
      whyMe: string;
      contact: string;
      diagnosis?: string;
    };
    language?: {
      switchTo: string;
    };
  };
  lang?: string;
}

export default function DiagnosticNavbar({ dictionary, lang }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);

  // Valores por defecto en español si no hay diccionario
  const defaultLabels = {
    switchTo: 'Switch to English'
  };

  // Crear URL base para redirecciones a la página principal
  const baseUrl = lang === 'es' ? '/es' : '/en';
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determinar si mostrar el selector de idioma
  const showLanguageSelector = !!lang;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 md:py-3 bg-white/80 backdrop-blur-lg shadow-[0_8px_32px_-15px_rgba(0,0,0,0.1)]' 
          : 'py-4 md:py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo y nombre */}
        <motion.a 
          href={baseUrl}
          className="group relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <StaticLogo />
        </motion.a>

        {/* Solo selector de idioma */}
        {showLanguageSelector && lang && (
          <div className="mx-2">
            <LanguageSelector 
              dictionary={{ 
                language: { 
                  switchTo: dictionary?.language?.switchTo || defaultLabels.switchTo 
                } 
              }}
              lang={lang}
            />
          </div>
        )}
      </div>
    </motion.nav>
  );
} 