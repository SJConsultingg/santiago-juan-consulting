'use client';

import { motion } from 'framer-motion';

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
  // Determinar si estamos en inglés o español
  const isEnglish = dictionary.whyMe.title === "Why Work With Me";

  const reasons = [
    {
      title: isEnglish ? 'I am not an agency' : 'No soy una agencia',
      description: isEnglish 
        ? 'You work directly with me, without intermediaries or junior accounts. All my attention is on your project.'
        : 'Trabajas directamente conmigo, sin intermediarios ni cuentas junior. Toda mi atención está en tu proyecto.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: isEnglish ? 'Real startup experience' : 'Experiencia real en startups',
      description: isEnglish
        ? 'I have worked in and with startups for years, I understand their unique challenges and resource limitations.'
        : 'He trabajado en y con startups durante años, entiendo sus retos únicos y limitaciones de recursos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: isEnglish ? 'No smoke, just results' : 'Sin humo, solo resultados',
      description: isEnglish
        ? 'Forget about the pretty PowerPoint and buzzwords. I focus on what will really move the needle in your business.'
        : 'Olvídate del PowerPoint bonito y los términos de moda. Me centro en lo que realmente moverá la aguja en tu negocio.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: isEnglish ? 'Focus on return' : 'Enfoque en retorno',
      description: isEnglish
        ? 'I prioritize actions with clear, fast and measurable return. Your investment must be reflected in concrete results.'
        : 'Priorizo acciones con retorno claro, rápido y medible. Tu inversión debe verse reflejada en resultados concretos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id={sectionId} className="relative py-24">
      <div className="container relative max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-secondary md:text-5xl">{dictionary.whyMe.title}</h2>
          <p className="text-xl text-gray-600">
            {dictionary.whyMe.description}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
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
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-[2px] bg-accent/30"></span>
                <p className="font-medium text-secondary">{dictionary.whyMe.founder}</p>
                <span className="w-8 h-[2px] bg-accent/30"></span>
              </div>
              
              <a href="https://ar.linkedin.com/in/santiago-juan-673b06211" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center px-4 py-2 mt-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-accent hover:bg-accent/90 w-fit">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                {dictionary.whyMe.linkedin}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 