'use client';

import React from 'react';

interface ProcessSectionProps {
  dictionary: {
    process: {
      title: string;
      description: string;
      step1: {
        title: string;
        description: string;
      };
      step2: {
        title: string;
        description: string;
      };
      step3: {
        title: string;
        description: string;
      };
    };
    cta: {
      button: string;
    };
  };
  sectionId?: string;
}

export default function ProcessSection({ dictionary, sectionId = "proceso" }: ProcessSectionProps) {
  // Determinar si estamos en inglés o español basado en el contenido
  const isEnglish = dictionary.process.title === "How I Work";
  
  // Pasos del proceso con iconos
  const steps = [
    {
      title: dictionary.process.step1.title,
      description: dictionary.process.step1.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: dictionary.process.step2.title,
      description: dictionary.process.step2.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: dictionary.process.step3.title,
      description: dictionary.process.step3.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section id={sectionId} className="relative py-16 md:py-24">
      <div className="container relative px-6 md:px-8 max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">
            {dictionary.process.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 px-4">
            {dictionary.process.description}
          </p>
        </div>

        <div className="grid gap-12 md:gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Línea conectora entre pasos (solo en desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(100%_-_16px)] w-[calc(100%_-_32px)] h-0.5 bg-primary/20 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-primary"></div>
                </div>
              )}
              
              <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-8 relative z-10 h-full hover:border-accent/20 transition-all duration-200">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mr-4">
                      {step.icon}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xl font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-secondary mb-4">{step.title}</h3>
                  <p className="text-gray-600/90 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-16 md:mt-20 px-4">
          <div className="p-6 md:p-8 text-center bg-white rounded-2xl border border-gray-100 shadow-lg">
            <h4 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold text-secondary">
              {isEnglish ? "Not sure what you need?" : "¿No estás seguro de lo que necesitas?"}
            </h4>
            <p className="mb-6 text-gray-600/90 leading-relaxed text-base md:text-lg">
              {isEnglish 
                ? "My AI-powered diagnostic tool will analyze your business problem and recommend the most suitable service for you."
                : "Mi herramienta de diagnóstico con IA analizará el problema de tu negocio y te recomendará el servicio más adecuado para ti."}
            </p>
            <a 
              href={isEnglish ? "/en/diagnosis" : "/es/diagnostico"}
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium text-white bg-gradient-to-r from-accent to-primary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isEnglish ? "Try the diagnostic tool" : "Probar herramienta de diagnóstico"}
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 