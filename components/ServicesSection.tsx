'use client';

import { motion } from 'framer-motion';

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
  sectionId?: string; // Hacemos esta prop opcional para mantener compatibilidad
}

export default function ServicesSection({ dictionary, sectionId = "servicios" }: ServicesSectionProps) {
  // Iconos para los servicios
  const serviceIcons = [
    // Icono para optimización de procesos
    <svg key="icon1" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>,
    // Icono para automatización de marketing
    <svg key="icon2" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>,
    // Icono para auditoría de embudos
    <svg key="icon3" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
    // Icono para auditoría UX/UI
    <svg key="icon4" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>,
  ];

  // Determinar si estamos en inglés o español basándonos en el contenido del diccionario
  const isEnglish = dictionary.services.title === "Services";

  // Crear los servicios con traducciones
  const services = [
    {
      title: dictionary.services.service1.title,
      description: dictionary.services.service1.description,
      icon: serviceIcons[0],
    },
    {
      title: dictionary.services.service2.title,
      description: dictionary.services.service2.description,
      icon: serviceIcons[1],
    },
    {
      title: dictionary.services.service3.title,
      description: dictionary.services.service3.description,
      icon: serviceIcons[2],
    },
    {
      title: dictionary.services.service4.title,
      description: dictionary.services.service4.description,
      icon: serviceIcons[3],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Microinteracciones mejoradas con Framer Motion
  const cardHoverVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02, 
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const iconHoverVariants = {
    rest: { 
      scale: 1,
      rotate: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: { 
      scale: 1.05, 
      rotate: 3,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  return (
    <section id={sectionId} className="relative py-24">
      <div className="container relative">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-secondary md:text-5xl">{dictionary.services.title}</h2>
          <p className="text-xl text-gray-600">
            {dictionary.services.description}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.08)",
              }}
              className="p-8 bg-white rounded-xl border border-gray-100 shadow-lg hover:border-accent/20 transition-all duration-200"
              style={{ minHeight: "280px" }}
            >
              <div className="flex flex-col h-full">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 mb-6 rounded-full w-fit bg-primary/10 text-primary"
                >
                  {service.icon}
                </motion.div>
                <h3 className="mb-4 text-2xl font-bold text-secondary">{service.title}</h3>
                <p className="text-gray-600/90 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Indicador sutil de scroll para indicar que hay más contenido */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
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
        </motion.div>
      </div>
    </section>
  );
} 