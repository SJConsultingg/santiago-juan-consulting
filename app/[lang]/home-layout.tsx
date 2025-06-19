'use client';

import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrollIndicator from '@/components/ScrollIndicator';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const pathname = usePathname();
  const { currentLocale } = useLanguage();

  // Efecto para el scroll suave
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <ScrollIndicator scaleX={scaleX} />
      <div className="min-h-screen flex flex-col">
        {children}
        
        <footer className="mt-auto bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Columna 1: Logo y descripción */}
              <div>
                <Link href={`/${currentLocale}`} className="text-2xl font-bold">
                  Santiago Juan
                </Link>
                <p className="mt-4 text-gray-400">
                  Consultoría estratégica para startups y empresas en crecimiento.
                </p>
              </div>
              
              {/* Columna 2: Enlaces rápidos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href={`/${currentLocale}#services`} className="text-gray-400 hover:text-white transition-colors">
                      Servicios
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${currentLocale}#process`} className="text-gray-400 hover:text-white transition-colors">
                      Proceso
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${currentLocale}#contact`} className="text-gray-400 hover:text-white transition-colors">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Columna 3: Legal */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href={`/${currentLocale}/legal/privacy`} className="text-gray-400 hover:text-white transition-colors">
                      Política de Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${currentLocale}/legal/terms`} className="text-gray-400 hover:text-white transition-colors">
                      Términos y Condiciones
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${currentLocale}/legal/cookies`} className="text-gray-400 hover:text-white transition-colors">
                      Política de Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-center text-gray-400">
                © {new Date().getFullYear()} Santiago Juan Consulting. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
      
      <CookieConsent />
      <GoogleAnalytics />
    </>
  );
} 