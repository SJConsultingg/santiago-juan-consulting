'use client';

import { useEffect, useState } from 'react';
import { useDictionary } from '@/context/DictionaryProvider';
import DiagnosticAssistant from '@/components/DiagnosticAssistant';
import BackgroundElements from '@/components/BackgroundElements';
import DiagnosticNavbar from '@/components/DiagnosticNavbar';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Componente para ocultar la barra de navegación global
const NavbarHider = () => {
  useEffect(() => {
    // Ocultar la barra de navegación global cuando se monta el componente
    const navbar = document.querySelector('nav:first-of-type');
    if (navbar && navbar instanceof HTMLElement) {
      navbar.style.display = 'none';
    }
    
    // Restaurar la barra de navegación cuando se desmonta el componente
    return () => {
      if (navbar && navbar instanceof HTMLElement) {
        navbar.style.display = '';
      }
    };
  }, []);
  
  return null;
};

export default function DiagnosisPage() {
  const { dictionary, lang } = useDictionary();
  const [mounted, setMounted] = useState(false);
  
  // Aseguramos que el componente se monte solo en el cliente para evitar errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  // Solo permitir acceso a esta página en inglés. Si estamos en español, redirigir a /es/diagnostico
  if (lang === 'es') {
    if (typeof window !== 'undefined') {
      console.log("DiagnosisPage: Redirigiendo de inglés a español");
      window.location.href = '/es/diagnostico';
    }
    return null;
  }
  
  return (
    <>
      <NavbarHider />
      <DiagnosticNavbar dictionary={dictionary} lang={lang} />
      <div className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white relative min-h-screen pb-24 md:pb-32">
        {/* Elementos decorativos de fondo */}
        <BackgroundElements variant="diagnosis" />
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">
            {/* Columna izquierda - Explicación del proceso */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 lg:mb-0"
            >
              <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 border border-gray-100 relative overflow-hidden lg:sticky lg:top-24">
                {/* Indicador visual del proceso */}
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-primary to-accent"></div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6">
                  Express Diagnosis
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Describe the current problem in your business and I will recommend the service that best fits your needs.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-primary font-bold shadow-sm">
                      1
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="font-medium text-base sm:text-lg text-secondary">Describe your problem</h3>
                      <p className="text-sm sm:text-base text-gray-600">Tell me what's happening in your business right now</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-primary font-bold shadow-sm">
                      2
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="font-medium text-base sm:text-lg text-secondary">Get a recommendation</h3>
                      <p className="text-sm sm:text-base text-gray-600">My system analyzes your situation and suggests the best service</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-primary font-bold shadow-sm">
                      3
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="font-medium text-base sm:text-lg text-secondary">Book a meeting</h3>
                      <p className="text-sm sm:text-base text-gray-600">Schedule a free consultation to discuss solutions</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Your information is secure and I won't share it with third parties
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Columna derecha - Herramienta de diagnóstico */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DiagnosticAssistant dictionary={dictionary} />
              
              <div className="mt-6 text-center">
                <Link 
                  href={`/${lang}`}
                  className="inline-flex items-center text-accent hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to home page
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
} 