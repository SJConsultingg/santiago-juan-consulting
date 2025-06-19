'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Mostrar el banner solo si no hay consentimiento previo
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Guardar el consentimiento
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);

    // Actualizar el consentimiento en GA4
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    });
  };

  const handleReject = () => {
    // Guardar el rechazo
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);

    // Mantener el consentimiento denegado en GA4
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700 flex-1">
          <p>
            Utilizamos cookies para mejorar tu experiencia y analizar el uso del sitio. 
            Puedes leer más sobre nuestro uso de cookies en nuestra política de privacidad.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-accent text-white rounded hover:bg-opacity-90 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
} 