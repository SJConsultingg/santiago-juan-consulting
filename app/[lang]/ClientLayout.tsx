'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import BackgroundElements from '@/components/BackgroundElements';
import Navbar from '@/components/Navbar';
import SimpleLogo from '@/components/SimpleLogo';
import { Dictionary } from '@/types/dictionary';

interface ClientLayoutProps {
  children: React.ReactNode;
  dictionary: Dictionary;
  lang: string;
}

export default function ClientLayout({ children, dictionary, lang }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Simular un tiempo de carga mínimo para evitar parpadeos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {(isLoading || isNavigating) && <LoadingScreen />}
      </AnimatePresence>

      <div className={`transition-opacity duration-300 ${(isLoading || isNavigating) ? 'opacity-0' : 'opacity-100'}`}>
        <div className="fixed inset-0 pointer-events-none">
          <BackgroundElements variant="primary" />
        </div>
        <Navbar dictionary={dictionary} lang={lang} />
        <main className="relative z-10">{children}</main>
        <footer className="py-12 text-white bg-secondary relative z-10">
          <div className="container">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div>
                <div className="flex items-center mb-4">
                  <SimpleLogo width={32} height={32} showText={false} textColor="text-white" variant="blanco" />
                  <h3 className="text-xl font-bold ml-2">Santiago Juan Consulting</h3>
                </div>
                <p className="text-gray-300">{dictionary.meta.description}</p>
                
                {/* LinkedIn Personalizado */}
                <div className="mt-4 flex items-center">
                  <p className="text-gray-300 mr-2">{dictionary.footer.founder}</p>
                  <a href="https://ar.linkedin.com/in/santiago-juan-673b06211" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-accent transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>Santiago Juan</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-medium">{dictionary.footer.quickLinks}</h3>
                <ul className="space-y-2">
                  <li><a href={`#${lang === 'es' ? 'servicios' : 'services'}`} className="text-gray-300 hover:text-white">{dictionary.navbar.services}</a></li>
                  <li><a href={`#${lang === 'es' ? 'proceso' : 'process'}`} className="text-gray-300 hover:text-white">{dictionary.navbar.process}</a></li>
                  <li><a href={`#${lang === 'es' ? 'por-qué-yo' : 'why-me'}`} className="text-gray-300 hover:text-white">{dictionary.navbar.whyMe}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-medium">{dictionary.footer.contact}</h3>
                <p className="text-gray-300 mb-4">{dictionary.footer.readyToScale}</p>
                <a 
                  href={`#${lang === 'es' ? 'contacto' : 'contact'}`}
                  className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  {dictionary.footer.scheduleCall}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-300">
              <p>&copy; {new Date().getFullYear()} Santiago Juan Consulting. {dictionary.footer.allRightsReserved}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 