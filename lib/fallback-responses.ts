/**
 * Respuestas predeterminadas para cuando la API de OpenAI no está disponible
 * o cuando se ha alcanzado el límite de uso
 */

interface FallbackResponse {
  mainService: string;
  complementaryService?: string;
  reason: string;
  value: string;
  action: string;
}

/**
 * Obtiene una respuesta predeterminada según el idioma
 * @param lang - Código de idioma ('es' o 'en')
 * @returns Respuesta predeterminada estructurada
 */
export function getFallbackResponse(lang: string = 'es'): FallbackResponse {
  // Comprobar si las respuestas predeterminadas están habilitadas
  const enableFallback = process.env.ENABLE_FALLBACK_RESPONSES !== 'false';
  
  if (!enableFallback) {
    // Si están deshabilitadas, devolver un objeto vacío que será manejado por el cliente
    return {
      mainService: '',
      reason: '',
      value: '',
      action: ''
    };
  }
  
  // Respuestas según el idioma
  if (lang === 'es') {
    return {
      mainService: 'Consultoría Estratégica',
      complementaryService: '',
      reason: 'Basado en los problemas comunes de los negocios digitales, te recomendamos comenzar con una sesión de consultoría estratégica para identificar las áreas prioritarias a mejorar.',
      value: 'Obtendrás una hoja de ruta clara con acciones específicas para impulsar tu negocio.',
      action: 'Agenda una llamada gratuita de diagnóstico para discutir tu situación particular.'
    };
  } else {
    return {
      mainService: 'Strategic Consulting',
      complementaryService: '',
      reason: 'Based on common digital business challenges, we recommend starting with a strategic consulting session to identify priority areas for improvement.',
      value: 'You will get a clear roadmap with specific actions to boost your business.',
      action: 'Schedule a free diagnostic call to discuss your particular situation.'
    };
  }
}

/**
 * Obtiene una lista de respuestas aleatorias predeterminadas según el idioma
 * Útil para cuando se quiere mostrar una variedad de respuestas
 * @param lang - Código de idioma ('es' o 'en')
 * @returns Lista de respuestas predeterminadas
 */
export function getRandomFallbackResponses(lang: string = 'es'): FallbackResponse[] {
  if (lang === 'es') {
    return [
      {
        mainService: 'Optimización de Procesos',
        complementaryService: 'Automatización de Marketing',
        reason: 'Los desafíos de eficiencia interna suelen ir acompañados de necesidades de automatización de comunicaciones con clientes para maximizar el impacto.',
        value: 'Optimizarás tu operativa interna mientras mejoras la captación y retención de clientes.',
        action: 'Agenda una llamada para analizar tu caso específico.'
      },
      {
        mainService: 'Auditoría de Embudos de Conversión',
        reason: 'Muchas empresas experimentan problemas de conversión que afectan directamente a sus resultados. Una auditoría detallada puede identificar los puntos de fricción.',
        value: 'Incrementarás tus tasas de conversión y reducirás el abandono en tu proceso de compra.',
        action: 'Descubre las oportunidades ocultas en tu embudo de ventas.'
      },
      {
        mainService: 'Automatización de Marketing',
        reason: 'La gestión manual de comunicaciones con clientes consume tiempo valioso y reduce la consistencia de tu mensaje.',
        value: 'Ahorrarás tiempo mientras mantienes una comunicación constante y efectiva con tus clientes.',
        action: 'Hablemos sobre cómo automatizar tus comunicaciones de marketing.'
      }
    ];
  } else {
    return [
      {
        mainService: 'Process Optimization',
        complementaryService: 'Marketing Automation',
        reason: 'Internal efficiency challenges often come with needs to automate customer communications to maximize impact.',
        value: 'You will optimize your internal operations while improving customer acquisition and retention.',
        action: 'Schedule a call to analyze your specific case.'
      },
      {
        mainService: 'Conversion Funnel Audit',
        reason: 'Many businesses experience conversion issues that directly affect their results. A detailed audit can identify friction points.',
        value: 'You will increase your conversion rates and reduce abandonment in your purchase process.',
        action: 'Discover the hidden opportunities in your sales funnel.'
      },
      {
        mainService: 'Marketing Automation',
        reason: 'Manual management of customer communications consumes valuable time and reduces the consistency of your message.',
        value: 'You will save time while maintaining consistent and effective communication with your customers.',
        action: 'Let\'s talk about how to automate your marketing communications.'
      }
    ];
  }
}

/**
 * Obtiene una respuesta aleatoria de la lista de respuestas predeterminadas
 * @param lang - Código de idioma ('es' o 'en')
 * @returns Una respuesta predeterminada aleatoria
 */
export function getRandomFallbackResponse(lang: string = 'es'): FallbackResponse {
  const responses = getRandomFallbackResponses(lang);
  return responses[Math.floor(Math.random() * responses.length)];
} 