'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  dictionary: {
    hero: {
      title: string;
      subtitle: string;
    };
    hero_dynamic: {
      part1: string;
      part2: string;
      part3: string;
      caption: string;
    };
    cta: {
      button: string;
    };
  };
  lang?: string;
}

export default function HeroSection({ dictionary, lang = 'es' }: HeroSectionProps) {
  const contactSectionId = lang === 'es' ? 'contacto' : 'contact';

  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 md:pt-32">
      <div className="container relative">
        <div className="max-w-4xl mx-auto pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-6"
            >
              {dictionary.hero_dynamic.part1}
              <br className="hidden sm:block" />
              <span className="text-accent"> {dictionary.hero_dynamic.part2} </span>
              {dictionary.hero_dynamic.part3}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              {dictionary.hero.subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col items-center gap-8 mb-16"
            >
              <motion.a
                href={`#${contactSectionId}`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-accent rounded-lg shadow-lg hover:bg-accent/90 transition-all duration-300 group"
              >
                {dictionary.cta.button}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </motion.a>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <span className="inline-block px-6 py-3 text-sm font-medium text-accent bg-accent/5 rounded-full border border-accent/10 hover:bg-accent/10 transition-colors duration-300">
                  {dictionary.hero_dynamic.caption}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Indicador de scroll */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ bottom: '2rem' }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center p-2"
            >
              <div className="w-1 h-1 bg-accent/50 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 