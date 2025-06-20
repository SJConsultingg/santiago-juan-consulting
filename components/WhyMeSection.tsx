'use client';

import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';

interface WhyMeSectionProps {
  dictionary: {
    whyMe: {
      title: string;
      description: string;
      reason1: {
        title: string;
        description: string;
      };
      reason2: {
        title: string;
        description: string;
      };
      reason3: {
        title: string;
        description: string;
      };
      quote: string;
      founder: string;
      linkedin: string;
    };
  };
  sectionId?: string;
}

export default function WhyMeSection({ dictionary, sectionId = "por-qué-yo" }: WhyMeSectionProps) {
  // Configuración de animaciones
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
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

  // Razones con iconos
  const reasons = [
    {
      title: dictionary.whyMe.reason1.title,
      description: dictionary.whyMe.reason1.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: dictionary.whyMe.reason2.title,
      description: dictionary.whyMe.reason2.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: dictionary.whyMe.reason3.title,
      description: dictionary.whyMe.reason3.description,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    },
  ];

  return (
    <section id={sectionId} className="relative py-24">
      <div className="container relative max-w-6xl mx-auto">
        <AnimationWrapper
          animation="fade"
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-secondary md:text-5xl">{dictionary.whyMe.title}</h2>
          <p className="text-xl text-gray-600">
            {dictionary.whyMe.description}
          </p>
        </AnimationWrapper>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <AnimationWrapper
              key={index}
              animation="slide-up"
              delay={index * 0.15}
              className="flex gap-6 p-8 transition-all duration-300 bg-white rounded-xl border border-gray-100 shadow-lg hover:border-accent/20 group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-4 rounded-xl bg-accent/10 text-accent h-fit"
              >
                {reason.icon}
              </motion.div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-secondary">{reason.title}</h3>
                <p className="text-gray-600/90 leading-relaxed">{reason.description}</p>
              </div>
            </AnimationWrapper>
          ))}
        </div>

        <AnimationWrapper
          animation="fade"
          delay={0.4}
          className="max-w-2xl mx-auto mt-20"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 text-center bg-white rounded-xl border border-gray-100 shadow-lg"
          >
            <svg className="w-12 h-12 mx-auto mb-6 text-accent opacity-80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="mb-6 text-xl italic text-gray-700 leading-relaxed">
              "{dictionary.whyMe.quote}"
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                <span className="text-accent font-bold text-lg">SJ</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">{dictionary.whyMe.founder}</p>
                <a 
                  href={dictionary.whyMe.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </AnimationWrapper>
      </div>
    </section>
  );
} 