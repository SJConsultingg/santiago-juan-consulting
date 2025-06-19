'use client';

import { useState, useEffect } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface ScrollIndicatorProps {
  sections: {
    id: string;
    label: string;
  }[];
  lang: string;
  scaleX: MotionValue<number>;
}

export default function ScrollIndicator({ sections, lang, scaleX }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calcular el progreso general del scroll
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);

      // Determinar la sección activa
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
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
    handleScroll(); // Inicializar
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, lang]);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex flex-col items-center gap-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100"
      >
        {/* Indicador de progreso general */}
        <div className="w-1 h-24 bg-gray-100 rounded-full relative overflow-hidden">
          <motion.div 
            className="absolute bottom-0 w-full bg-accent" 
            style={{ height: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        {/* Puntos para cada sección */}
        {sections.map((section) => (
          <motion.a
            key={section.id}
            href={`#${section.id}`}
            className="relative w-3 h-3 rounded-full bg-gray-200 transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={section.label}
          >
            {activeSection === section.id && (
              <motion.div
                layoutId="activeSectionIndicator"
                className="absolute inset-0 bg-accent rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
} 