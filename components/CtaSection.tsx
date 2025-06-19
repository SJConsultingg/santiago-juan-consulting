'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

type CalendlyProps = {
  url: string;
  prefill?: Record<string, any>;
  utm?: Record<string, string>;
  styles?: React.CSSProperties;
};

// Componente Calendly con lazy loading
function Calendly({ url, styles }: CalendlyProps) {
  const calendlyRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Usar Intersection Observer para detectar cuando el componente es visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Cargar cuando al menos 10% del elemento es visible
    );

    if (calendlyRef.current) {
      observer.observe(calendlyRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Solo cargar Calendly cuando el componente sea visible
    if (!shouldLoad) return;

    // Cargar el script de Calendly
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    head?.appendChild(script);

    script.onload = () => {
      // Una vez cargado el script, inicializar Calendly
      if (calendlyRef.current && window.Calendly) {
        window.Calendly.initInlineWidget({
          url: url,
          parentElement: calendlyRef.current,
          prefill: {},
          utm: {}
        });
      }
    };

    return () => {
      // Limpieza
      if (head?.contains(script)) {
        head.removeChild(script);
      }
    };
  }, [url, shouldLoad]);

  return (
    <div ref={calendlyRef} style={styles}>
      {!shouldLoad && (
        <div 
          className="flex items-center justify-center w-full h-full bg-gray-100 animate-pulse" 
          style={{ height: styles?.height || '700px' }}
        >
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-4 border-t-4 border-accent rounded-full animate-spin"></div>
            <p className="text-gray-600">Cargando calendario...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Declaramos el tipo global para TypeScript
declare global {
  interface Window {
    Calendly: any;
  }
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

  return (
    <section id={calculatedSectionId} className="relative py-24">
      <div className="container relative max-w-6xl mx-auto">
        {/* Elementos de beneficios destacados */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-4 mb-16 md:grid-cols-3 md:gap-6"
        >
          {benefitItems.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="mb-6 text-4xl font-bold text-secondary md:text-5xl">
            {dictionary.cta.title}
          </h2>
          <p className="text-xl text-gray-600 md:text-2xl">
            {dictionary.cta.description}
          </p>
        </motion.div>

        {/* Contenedor de Calendly con fondo blanco y lazy loading */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden z-10 relative">
          <Calendly 
            url="https://calendly.com/santiagojuanconsulting/first-meeting?hide_event_type_details=1&hide_gdpr_banner=1"
            styles={{ height: '700px', width: '100%' }} 
          />
        </div>
      </div>
    </section>
  );
} 