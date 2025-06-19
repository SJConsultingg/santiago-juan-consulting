'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Comprobar si ya se aceptaron las cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);

    // Actualizar el consentimiento en GA4
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    });
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);

    // Mantener el consentimiento denegado en GA4
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    });
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 flex-1">
                <p>
                  Utilizamos cookies para mejorar tu experiencia en nuestro sitio. 
                  Al continuar navegando, aceptas nuestra{' '}
                  <Link href="/es/legal/cookies" className="text-accent hover:text-accent/80 underline">
                    Política de Cookies
                  </Link>
                  {' '}y{' '}
                  <Link href="/es/legal/privacy" className="text-accent hover:text-accent/80 underline">
                    Política de Privacidad
                  </Link>.
                </p>
              </div>
              <div className="flex gap-4">
                <Link 
                  href="/es/legal/cookies"
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Más información
                </Link>
                <button
                  onClick={rejectCookies}
                  className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-200"
                >
                  Rechazar
                </button>
                <button
                  onClick={acceptCookies}
                  className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-200"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 