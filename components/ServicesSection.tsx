'use client';

import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';
import FallbackWrapper from './FallbackWrapper';
import { useState, useEffect } from 'react';

interface ServicesSectionProps {
  dictionary: {
    services: {
      title: string;
      description: string;
      service1: {
        title: string;
        description: string;
      };
      service2: {
        title: string;
        description: string;
      };
      service3: {
        title: string;
        description: string;
      };
      service4: {
        title: string;
        description: string;
      };
    };
  };
  sectionId?: string;
}

export default function ServicesSection({ dictionary, sectionId = "servicios" }: ServicesSectionProps) {
  // Estado para controlar si usamos las animaciones o el fallback
  const [useAnimations, setUseAnimations] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Intentar detectar problemas con las animaciones
    const checkAnimationSupport = () => {
      try {
        // Si estamos en un entorno que podría tener problemas, usar fallback
        const isLowPowerDevice = 
          window.navigator.userAgent.includes('Mobile') && 
          navigator.hardwareConcurrency <= 4;
          
        setUseAnimations(!isLowPowerDevice);
      } catch (error) {
        // Si hay algún error, mejor usar el fallback
        setUseAnimations(false);
      }
    };
    
    checkAnimationSupport();
  }, []);

  // Configuración de animaciones
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  // Servicios con iconos
  const services = [
    {
      title: dictionary.services.service1.title,
      description: dictionary.services.service1.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: dictionary.services.service2.title,
      description: dictionary.services.service2.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: dictionary.services.service3.title,
      description: dictionary.services.service3.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: dictionary.services.service4.title,
      description: dictionary.services.service4.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    },
  ];

  // Si no estamos en el cliente todavía, mostrar un div vacío para evitar errores de hidratación
  if (!isClient) {
    return <div id={sectionId} className="relative py-24"></div>;
  }

  // Elegir el componente wrapper basado en si usamos animaciones o no
  const Wrapper = useAnimations ? AnimationWrapper : FallbackWrapper;

  return (
    <section id={sectionId} className="relative py-24">
      <div className="container relative">
        <Wrapper
          animation="fade"
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-secondary md:text-5xl">{dictionary.services.title}</h2>
          <p className="text-xl text-gray-600">
            {dictionary.services.description}
          </p>
        </Wrapper>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <Wrapper
              key={index}
              animation="slide-up"
              delay={index * 0.1}
              className="p-8 bg-white rounded-xl border border-gray-100 shadow-lg hover:border-accent/20 transition-all duration-200"
            >
              <div className="flex flex-col h-full">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  }}
                  className="p-4 mb-6 rounded-full w-fit bg-primary/10 text-primary"
                >
                  {service.icon}
                </motion.div>
                <h3 className="mb-4 text-2xl font-bold text-secondary">{service.title}</h3>
                <p className="text-gray-600/90 leading-relaxed">{service.description}</p>
              </div>
            </Wrapper>
          ))}
        </div>
        
        {/* Indicador sutil de scroll para indicar que hay más contenido */}
        <Wrapper
          animation="fade"
          delay={0.8}
          className="flex justify-center mt-12"
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="flex flex-col items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 text-accent/60" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </Wrapper>
      </div>
    </section>
  );
} 