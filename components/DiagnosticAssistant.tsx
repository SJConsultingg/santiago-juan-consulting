'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Dictionary {
  services: {
    title: string;
    service1: { title: string };
    service2: { title: string };
    service3: { title: string };
    service4: { title: string };
  };
}

interface ServiceContent {
  title: string;
  description: string;
  action: string;
  calendlyUrl: string;
  icon: JSX.Element;
}

export default function DiagnosticAssistant({ dictionary }: { dictionary: Dictionary }) {
  const [problem, setProblem] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  
  // Determinar si estamos en inglés o español
  const isEnglish = dictionary.services.title === "Services";
  const locale = isEnglish ? 'en' : 'es';
  
  const analyzeInput = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    console.log("DiagnosticAssistant: Analizando problema...", { problem, locale });
    
    // Simulamos el progreso del análisis
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 60);
    
    try {
      // Llamar a la API
      console.log("DiagnosticAssistant: Enviando solicitud a /api/diagnostico...");
      
      const response = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          problem,
          lang: locale
        }),
      });
      
      console.log("DiagnosticAssistant: Respuesta recibida:", { status: response.status, ok: response.ok });
      
      // Procesar la respuesta
      const data = await response.json();
      console.log("DiagnosticAssistant: Datos de respuesta:", data);
      
      if (!response.ok) {
        // Si hay un error pero tenemos respuesta de fallback, usarla
        if (data.fallbackResponse) {
          console.log("DiagnosticAssistant: Usando respuesta de fallback:", data.fallbackResponse);
          setAiResponse(data.fallbackResponse);
          // Mapear el servicio de fallback a uno de los servicios predefinidos
          const serviceId = mapServiceNameToId(data.fallbackResponse.mainService);
          console.log("DiagnosticAssistant: ID de servicio de fallback mapeado:", serviceId);
          
          // Mostrar el modal de email antes de mostrar el resultado
          setIsAnalyzing(false);
          setProgress(0);
          setShowEmailModal(true);
          return;
        }
        
        throw new Error(data.error || (isEnglish ? 'Error analyzing your problem' : 'Error al analizar tu problema'));
      }
      
      // Validar que la respuesta tenga los campos necesarios
      if (!data.mainService) {
        console.error("DiagnosticAssistant: Error - La respuesta no contiene un servicio principal");
        throw new Error(isEnglish 
          ? 'The response from my system was incomplete. Please try again.' 
          : 'La respuesta de mi sistema fue incompleta. Por favor, inténtalo de nuevo.');
      }
      
      // Procesar y limpiar la respuesta para español
      if (!isEnglish) {
        // Asegurarse de que el servicio principal tenga un formato limpio
        if (data.mainService) {
          // Convertir a título si está en mayúsculas
          if (data.mainService === data.mainService.toUpperCase()) {
            data.mainService = data.mainService.charAt(0).toUpperCase() + data.mainService.slice(1).toLowerCase();
          }
        }
        
        // Limpiar el servicio complementario si existe
        if (data.complementaryService) {
          if (data.complementaryService === data.complementaryService.toUpperCase()) {
            data.complementaryService = data.complementaryService.charAt(0).toUpperCase() + 
              data.complementaryService.slice(1).toLowerCase();
          }
        }
      }
      
      // Guardar la respuesta completa de la IA
      console.log("DiagnosticAssistant: Respuesta válida de la API:", data);
      setAiResponse(data);
      
      // Mapear el nombre del servicio al ID usado en la UI
      const serviceId = mapServiceNameToId(data.mainService);
      console.log("DiagnosticAssistant: ID de servicio mapeado:", serviceId);
      
      // Simular un pequeño retraso para completar la animación
      setTimeout(() => {
        setIsAnalyzing(false);
        setProgress(0);
        // Mostrar el modal de email antes de mostrar el resultado
        setShowEmailModal(true);
      }, 500);
      
    } catch (error: any) {
      console.error('DiagnosticAssistant: Error:', error);
      setError(error.message || (isEnglish ? 'Error analyzing your problem' : 'Error al analizar tu problema'));
      console.log("DiagnosticAssistant: Error establecido:", error.message);
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  // Función para mapear nombres de servicios a IDs de la UI
  const mapServiceNameToId = (serviceName: string): string => {
    if (!serviceName) return 'optimizacion-procesos'; // Default

    const name = serviceName.toLowerCase();
    
    if (name.includes('proceso') || name.includes('process')) {
      return 'optimizacion-procesos';
    } else if (name.includes('marketing') || name.includes('automat')) {
      return 'automatizacion-marketing';
    } else if (name.includes('embudo') || name.includes('funnel') || name.includes('conver')) {
      return 'auditoria-embudos';
    } else if (name.includes('web') || name.includes('ux') || name.includes('ui') || 
               name.includes('diseño') || name.includes('design') || name.includes('usab') ||
               name.includes('audit')) {
      return 'auditoria-ux-ui';
    }
    
    // Log para depuración
    console.log("DiagnosticAssistant: No se pudo mapear el servicio:", serviceName);
    
    return 'optimizacion-procesos'; // Default
  };
  
  // Mapeo de servicios a textos según el idioma
  const serviceContent: Record<string, ServiceContent> = {
    'optimizacion-procesos': {
      title: dictionary.services.service1.title,
      description: isEnglish 
        ? 'It seems you need help with process optimization'
        : 'Parece que necesitas ayuda con la optimización de procesos',
      action: isEnglish 
        ? 'Talk to me about this problem' 
        : 'Habla conmigo sobre este problema',
      calendlyUrl: "https://calendly.com/santiagojuanconsulting/first-meeting?hide_event_type_details=1&hide_gdpr_banner=1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    'automatizacion-marketing': {
      title: dictionary.services.service2.title,
      description: isEnglish 
        ? 'It seems you need help with marketing automation'
        : 'Parece que necesitas ayuda con la automatización de marketing',
      action: isEnglish 
        ? 'Talk to me about this problem' 
        : 'Habla conmigo sobre este problema',
      calendlyUrl: "https://calendly.com/santiagojuanconsulting/first-meeting?hide_event_type_details=1&hide_gdpr_banner=1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    'auditoria-embudos': {
      title: dictionary.services.service3.title,
      description: isEnglish 
        ? 'It seems you need help with conversion funnel audit'
        : 'Parece que necesitas ayuda con la auditoría de embudos de conversión',
      action: isEnglish 
        ? 'Talk to me about this problem' 
        : 'Habla conmigo sobre este problema',
      calendlyUrl: "https://calendly.com/santiagojuanconsulting/first-meeting?hide_event_type_details=1&hide_gdpr_banner=1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    'auditoria-ux-ui': {
      title: dictionary.services.service4.title,
      description: isEnglish 
        ? 'It seems you need help with UX/UI website audit'
        : 'Parece que necesitas ayuda con la auditoría UX/UI de tu sitio web',
      action: isEnglish 
        ? 'Talk to me about this problem' 
        : 'Habla conmigo sobre este problema',
      calendlyUrl: "https://calendly.com/santiagojuanconsulting/first-meeting?hide_event_type_details=1&hide_gdpr_banner=1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (problem.trim().length > 10) {
      analyzeInput();
    }
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };
  
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid) return;
    
    setIsEmailSubmitting(true);
    
    try {
      // Guardar en Airtable
      const serviceId = mapServiceNameToId(aiResponse?.mainService);
      const recommendedService = serviceContent[serviceId]?.title || aiResponse?.mainService;
      
      const saveResponse = await fetch('/api/save-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          problem,
          recommendedService,
          language: locale,
          aiResponse
        }),
      });
      
      if (!saveResponse.ok) {
        console.error('Error al guardar en Airtable');
      }
      
      // Cerrar modal y mostrar resultado
      setShowEmailModal(false);
      setRecommendation(serviceId);
      
    } catch (error) {
      console.error('Error al enviar el email:', error);
      // Mostrar el resultado de todas formas si hay un error
      setShowEmailModal(false);
      setRecommendation(mapServiceNameToId(aiResponse?.mainService));
    } finally {
      setIsEmailSubmitting(false);
    }
  };
  
  const skipEmailCollection = () => {
    setShowEmailModal(false);
    setRecommendation(mapServiceNameToId(aiResponse?.mainService));
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.3 }
    }
  };
  
  const resultVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const celebrationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 1.1, 0],
      transition: { 
        duration: 1.5,
        times: [0, 0.2, 0.8, 1]
      }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <div className="bg-white p-5 sm:p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden">
      {/* Borde decorativo superior */}
      <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-primary to-accent"></div>
      
      {/* Modal de Email */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {isEnglish 
                    ? 'Get your complete diagnosis' 
                    : 'Obtén tu diagnóstico completo'}
                </h3>
                <p className="text-gray-600">
                  {isEnglish 
                    ? 'Enter your email to receive a detailed report with additional insights and recommendations.' 
                    : 'Ingresa tu email para recibir un informe detallado con insights y recomendaciones adicionales.'}
                </p>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {isEnglish ? 'Email address' : 'Dirección de email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder={isEnglish ? 'Your email address' : 'Tu dirección de email'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={skipEmailCollection}
                    className="order-2 sm:order-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {isEnglish ? 'Skip' : 'Omitir'}
                  </button>
                  <button
                    type="submit"
                    disabled={!isEmailValid || isEmailSubmitting}
                    className={`order-1 sm:order-2 flex-1 px-4 py-2 rounded-lg flex items-center justify-center
                              transition-all ${!isEmailValid || isEmailSubmitting
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-accent text-white hover:bg-accent/90'}`}
                  >
                    {isEmailSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 border-t-2 border-white rounded-full animate-spin"></span>
                        {isEnglish ? 'Sending...' : 'Enviando...'}
                      </>
                    ) : (
                      isEnglish ? 'Send me the diagnosis' : 'Enviarme el diagnóstico'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!recommendation ? (
          <motion.form 
            key="form"
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="text-base sm:text-lg font-medium text-gray-800">
                {isEnglish 
                  ? 'What is the current problem in your business?' 
                  : '¿Cuál es el problema actual en tu negocio?'}
              </h3>
            </div>
            
            <div className="mb-4 sm:mb-6 relative">
              <textarea 
                className={`w-full p-3 sm:p-4 border bg-gray-50 border-gray-300 rounded-lg 
                          transition-all duration-200 resize-none
                          ${isFocused 
                            ? 'ring-2 ring-accent border-accent shadow-sm bg-white' 
                            : 'hover:border-gray-400 focus:ring-accent focus:border-accent'}`}
                rows={5}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isEnglish 
                  ? 'Describe your current situation... (E.g.: My website conversion has dropped 15% in the last month...)' 
                  : 'Describe tu situación actual... (Ej.: Las ventas de mi sitio web han caído un 15% en el último mes...)'}
              ></textarea>
              
              {/* Indicador de longitud */}
              <div className="flex justify-between items-center mt-2 text-xs sm:text-sm">
                <div className="flex items-center">
                  <span className="text-gray-500">{problem.length} </span>
                  <span className="mx-1 text-gray-400">/</span>
                  <span className="text-gray-500">10 {isEnglish ? 'min' : 'mín'}</span>
                  
                  {/* Barra de progreso de caracteres */}
                  <div className="ml-2 bg-gray-200 rounded-full h-1.5 w-12 sm:w-16 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        problem.length >= 10 ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${Math.min(100, (problem.length / 10) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <span className={problem.length >= 10 
                  ? "text-green-600 font-medium" 
                  : "text-gray-500"}>
                  {problem.length >= 10 
                    ? '✓' 
                    : isEnglish ? 'Enter at least 10 characters' : 'Introduce al menos 10 caracteres'}
                </span>
              </div>
            </div>
            
            {/* Mostrar mensaje de error si existe */}
            {error && (
              <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm sm:text-base">
                <p>{error}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: isAnalyzing || problem.length < 10 ? 1 : 1.02 }}
                whileTap={{ scale: isAnalyzing || problem.length < 10 ? 1 : 0.98 }}
                type="submit"
                disabled={isAnalyzing || problem.length < 10}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center text-sm sm:text-base
                          transition-all ${isAnalyzing || problem.length < 10 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-accent text-white shadow-md hover:shadow-lg'}`}
                title={problem.length < 10 ? (isEnglish ? 'Please enter at least 10 characters' : 'Por favor ingresa al menos 10 caracteres') : ''}
              >
                {isAnalyzing ? (
                  <>
                    <span className="mr-2 h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-white rounded-full animate-spin"></span>
                    {isEnglish ? 'Analyzing...' : 'Analizando...'}
                  </>
                ) : (
                  <>
                    {isEnglish ? 'Get diagnosis' : 'Obtener diagnóstico'}
                    <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
            
            {/* Barra de progreso */}
            {isAnalyzing && (
              <div className="w-full mt-4 sm:mt-6">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">{isEnglish ? 'I\'m processing your data...' : 'Estoy procesando tus datos...'}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <motion.div 
                    className="bg-accent h-1.5 sm:h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            )}
          </motion.form>
        ) : (
          <motion.div 
            key="result"
            className="text-center"
            variants={resultVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Animación de celebración */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              variants={celebrationVariants}
              initial="hidden"
              animate="visible"
            >
              <svg className="w-36 h-36 sm:w-48 sm:h-48 text-accent/20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21C20,22.1 19.1,23 18,23Z" />
              </svg>
            </motion.div>

            <motion.div 
              className="relative mb-4 sm:mb-6 inline-block" 
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-accent/10 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 text-accent rounded-full p-4 sm:p-5 shadow-lg border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12">
                  {serviceContent[recommendation].icon}
                </div>
              </div>
            </motion.div>
            
            <motion.h3 
              className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-secondary" 
              variants={itemVariants}
            >
              {/* Mostrar el título del servicio recomendado */}
              {isEnglish ? 
                (aiResponse?.mainService || serviceContent[recommendation].title) :
                (serviceContent[recommendation].title || aiResponse?.mainService)
              }
            </motion.h3>
            
            {/* Servicio complementario (si existe) */}
            {aiResponse?.complementaryService && (
              <motion.div 
                className="mb-4 sm:mb-5"
                variants={itemVariants}
              >
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium">
                  {isEnglish ? aiResponse.complementaryService : `+ ${aiResponse.complementaryService}`}
                </span>
              </motion.div>
            )}
            
            <motion.p 
              className="mb-4 sm:mb-5 text-gray-600 text-base sm:text-lg leading-relaxed" 
              variants={itemVariants}
            >
              {/* Mostrar la razón de la recomendación */}
              {aiResponse?.reason || serviceContent[recommendation].description}
            </motion.p>
            
            {/* Valor - mostrado solo si viene de la IA */}
            {aiResponse?.value && (
              <motion.div 
                className="p-4 sm:p-6 bg-primary/5 rounded-lg mb-5 sm:mb-6 text-gray-600 border border-primary/20"
                variants={itemVariants}
              >
                <p className="text-left italic text-sm sm:text-base leading-relaxed">
                  "{aiResponse.value}"
                </p>
              </motion.div>
            )}
            
            <motion.a
              href={serviceContent[recommendation].calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white rounded-lg shadow-md font-medium text-base"
              variants={itemVariants}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isEnglish ? 'Schedule a consultation call' : 'Agendar una llamada de consulta'}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
            
            <motion.button
              onClick={() => {
                setProblem('');
                setRecommendation(null);
                setAiResponse(null);
                setError(null);
                setEmail('');
                setIsEmailValid(false);
              }}
              className="block mx-auto mt-5 text-gray-500 underline hover:text-accent transition-colors"
              variants={itemVariants}
            >
              {isEnglish ? 'Start over' : 'Volver a empezar'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 