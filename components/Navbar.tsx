'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import SVGLogo from './SVGLogo';

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

export default function Navbar({ dictionary, lang }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Valores por defecto en español si no hay diccionario
  const defaultLabels = {
    services: 'Servicios',
    process: 'Proceso',
    whyMe: 'Por qué yo',
    contact: 'Contactar',
    diagnosis: 'Diagnóstico',
    switchTo: 'Switch to English'
  };

  // Usar valores del diccionario o los predeterminados si no existen
  const navItems = [
    { 
      text: dictionary?.navbar?.services || defaultLabels.services, 
      href: lang === 'es' ? 'servicios' : 'services', 
      id: lang === 'es' ? 'servicios' : 'services' 
    },
    { 
      text: dictionary?.navbar?.process || defaultLabels.process, 
      href: lang === 'es' ? 'proceso' : 'process', 
      id: lang === 'es' ? 'proceso' : 'process' 
    },
    { 
      text: dictionary?.navbar?.whyMe || defaultLabels.whyMe, 
      href: lang === 'es' ? 'por-qué-yo' : 'why-me', 
      id: lang === 'es' ? 'por-qué-yo' : 'why-me' 
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Encontrar la sección activa con un offset más preciso
      const currentSection = navItems.find(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = window.innerHeight * 0.3;
          return rect.top <= offset && rect.bottom >= offset;
        }
        return false;
      });

      setActiveSection(currentSection ? currentSection.id : '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

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
          href="/"
          className="group relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SVGLogo />
        </motion.a>

        {/* Menú de navegación - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <div className="bg-gray-50/50 backdrop-blur-sm p-1.5 rounded-full flex items-center gap-1">
            {navItems.map((item) => (
              <motion.div key={item.id} className="relative">
                <motion.a
                  href={`#${item.id}`}
                  className={`px-5 py-2 text-[15px] font-medium tracking-wide transition-all duration-300 rounded-full relative z-10 ${
                    activeSection === item.id 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-secondary'
                  }`}
                  whileHover={activeSection !== item.id ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.text}
                </motion.a>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Selector de idioma (solo si se proporciona lang) */}
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
          
          {/* Enlace a herramienta de diagnóstico */}
          <div className="relative mx-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <a
                href={lang === 'es' ? '/es/diagnostico' : '/en/diagnosis'}
                className="relative flex items-center gap-1 px-4 py-2 text-[15px] font-medium text-primary border border-primary/30 rounded-lg group overflow-hidden hover:bg-primary/5 transition-all duration-300"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>
                  {lang === 'es' ? 'Diagnóstico' : 'Diagnosis'}
                </span>
              </a>
            </motion.div>
          </div>

          {/* Botón CTA */}
          <div className="relative ml-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <a
                href={`#${lang === 'es' ? 'contacto' : 'contact'}`}
                className="relative flex items-center gap-2 px-6 py-2.5 text-[15px] font-medium text-white bg-gradient-to-r from-primary to-accent rounded-lg group overflow-hidden shadow-lg shadow-primary/5 hover:shadow-primary/20 transition-all duration-500"
              >
                <span className="relative z-10">{dictionary?.navbar?.contact || defaultLabels.contact}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Botón de menú móvil */}
        <motion.button
          className="relative z-10 p-2 rounded-xl bg-gray-50/50 backdrop-blur-sm md:hidden hover:bg-gray-100/50 transition-colors duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-6 h-6 text-secondary transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            style={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'none' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </motion.button>

        {/* Menú móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] md:hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block w-full px-4 py-3.5 text-[15px] font-medium rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-primary to-accent text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.text}
                  </motion.a>
                ))}
                
                {/* Selector de idioma móvil (solo si se proporciona lang) */}
                {showLanguageSelector && lang && (
                  <div className="py-2 px-4">
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
                
                {/* Enlace a la herramienta de diagnóstico */}
                <motion.a
                  href={lang === 'es' ? '/es/diagnostico' : '/en/diagnosis'}
                  className="flex items-center gap-2 w-full px-4 py-3.5 mt-1 mb-2 text-[15px] font-medium rounded-xl border border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  {lang === 'es' ? 'Diagnóstico Express' : 'Express Diagnosis'}
                </motion.a>
                
                <motion.a
                  href={`#${lang === 'es' ? 'contacto' : 'contact'}`}
                  className="block w-full px-4 py-3.5 mt-4 text-[15px] font-medium text-white bg-gradient-to-r from-primary to-accent rounded-xl text-center shadow-lg shadow-primary/10"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {dictionary?.navbar?.contact || defaultLabels.contact}
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 