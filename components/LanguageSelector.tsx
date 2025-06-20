'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LanguageSelectorProps {
  dictionary: {
    language: {
      switchTo: string;
    };
  };
  lang: string;
}

export default function LanguageSelector({ dictionary, lang }: LanguageSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  // Asegurar que lang siempre tenga un valor, por defecto 'es'
  const currentLang = lang || 'es';
  
  // Determinar el idioma alternativo
  const newLang = currentLang === 'es' ? 'en' : 'es';
  
  // Función para cambiar el idioma
  const handleLanguageChange = () => {
    if (!pathname) return;
    
    // Obtiene la ruta sin el prefijo de idioma
    const pathWithoutLang = pathname.replace(`/${currentLang}`, '');
    
    // Construye la nueva ruta con el nuevo idioma
    const newPath = `/${newLang}${pathWithoutLang}`;
    
    // Navega a la nueva ruta
    router.push(newPath);
  };

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleLanguageChange}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50/70 hover:bg-gray-100/80 backdrop-blur-sm rounded-full transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-[15px]">{dictionary.language.switchTo}</span>
      <motion.span
        animate={{ rotate: isHovered ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-4 h-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
          />
        </svg>
      </motion.span>
    </motion.button>
  );
} 