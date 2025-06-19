'use client';

import { motion } from 'framer-motion';

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
      step4: {
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
  // Determinar si estamos en inglés o español
  const isEnglish = dictionary.process.title === "How I Work";
  
  const steps = [
    {
      number: '01',
      title: dictionary.process.step1.title,
      description: isEnglish 
        ? "I analyze together with you the main weaknesses of your business and identify immediate improvement opportunities. No commitment."
        : "Analizo junto contigo los principales puntos débiles de tu negocio y detecto oportunidades de mejora inmediatas. Sin compromiso."
    },
    {
      number: '02',
      title: dictionary.process.step2.title,
      description: isEnglish
        ? "I develop a specific plan with measurable objectives, realistic timeline, and clear priorities. You'll know exactly what we'll do and why."
        : "Elaboro un plan específico con objetivos medibles, calendario realista y prioridades claras. Sabrás exactamente qué haremos y por qué."
    },
    {
      number: '03',
      title: dictionary.process.step3.title,
      description: isEnglish
        ? "If you want, I can support you in implementing the solutions, either with advisory sessions or by getting directly involved in the project."
        : "Si quieres, puedo acompañarte en la implementación de las soluciones, ya sea con sesiones de asesoría o implicándome directamente en el proyecto."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id={sectionId} className="relative py-16 md:py-24">
      <div className="container relative px-6 md:px-8 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">
            {dictionary.process.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 px-4">
            {dictionary.process.description}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 md:gap-6 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              className="relative p-6 md:p-8 transition-all duration-300 bg-white rounded-2xl border border-gray-100 shadow-lg hover:border-accent/20 group"
            >
              <div className="absolute -top-6 left-6 md:-left-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
                    {step.number}
                  </div>
                  <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl transform scale-75 group-hover:scale-125 transition-transform duration-300"></div>
                </div>
              </div>
              
              <div className="relative pt-8 md:pt-4">
                <h3 className="mb-3 text-xl md:text-2xl font-bold text-secondary">{step.title}</h3>
                <p className="text-gray-600/90 leading-relaxed text-base md:text-lg">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto mt-16 md:mt-20 px-4"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 md:p-8 text-center bg-white rounded-2xl border border-gray-100 shadow-lg"
          >
            <h4 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold text-secondary">
              {isEnglish ? "Not sure what you need?" : "¿No estás seguro de lo que necesitas?"}
            </h4>
            <p className="mb-6 text-gray-600/90 leading-relaxed text-base md:text-lg">
              {isEnglish 
                ? "My AI-powered diagnostic tool will analyze your business problem and recommend the most suitable service for you."
                : "Mi herramienta de diagnóstico con IA analizará el problema de tu negocio y te recomendará el servicio más adecuado para ti."}
            </p>
            <motion.a 
              href={isEnglish ? "/en/diagnosis" : "/es/diagnostico"}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
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
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 