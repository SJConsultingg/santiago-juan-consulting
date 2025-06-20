'use client';

import React, { useEffect } from 'react';

interface CtaSectionProps {
  dictionary: {
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  sectionId?: string;
}

export default function CtaSection({ dictionary, sectionId }: CtaSectionProps) {
  // Determinar si estamos en inglés o español
  const isEnglish = dictionary.cta.title.startsWith("Ready to take");
  
  // ID de la sección adaptado al idioma si no se proporciona sectionId
  const calculatedSectionId = sectionId || (isEnglish ? "contact" : "contacto");

  const benefitItems = [
    { 
      text: isEnglish ? 'No commitments' : 'Sin compromisos', 
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' 
    },
    { 
      text: isEnglish ? '30-minute meeting' : 'Reunión de 30 minutos', 
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' 
    },
    { 
      text: isEnglish ? 'Guaranteed immediate value' : 'Valor inmediato garantizado', 
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' 
    }
  ];

  // Efecto para cargar el script de Calendly
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id={calculatedSectionId} className="relative py-24">
      <div className="container relative max-w-6xl mx-auto">
        {/* Elementos de beneficios destacados */}
        <div className="grid grid-cols-1 gap-4 mb-16 md:grid-cols-3 md:gap-6">
          {benefitItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center px-7 py-4 space-x-3 bg-white shadow-lg backdrop-blur-sm rounded-xl border border-accent/10 group hover:border-accent/30 transition-all duration-300 w-full"
            >
              <div className="p-2 rounded-full bg-accent/10 text-accent flex-shrink-0">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-6 h-6 group-hover:text-primary transition-colors duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <span className="text-lg font-medium text-secondary group-hover:text-primary transition-colors duration-300">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="mb-6 text-4xl font-bold text-secondary md:text-5xl">
            {dictionary.cta.title}
          </h2>
          <p className="text-xl text-gray-600 md:text-2xl">
            {dictionary.cta.description}
          </p>
        </div>

        {/* Contenedor de Calendly con fondo blanco */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden z-10 relative">
          {/* Calendly inline widget */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/santiagojuanconsulting/first-meeting?hide_event_type_details=1&hide_gdpr_banner=1" 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
        </div>
      </div>
    </section>
  );
} 