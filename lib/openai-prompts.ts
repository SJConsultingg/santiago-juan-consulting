/**
 * Prompts para la API de OpenAI
 * Estos prompts definen cómo la AI analizará los problemas de los usuarios
 * y qué tipo de respuestas generará
 */

/**
 * Obtiene el prompt del sistema según el idioma
 * @param lang - Código de idioma ('es' o 'en')
 * @returns Texto del prompt para el rol de sistema
 */
export function getSystemPrompt(lang: string = 'es'): string {
  if (lang === 'es') {
    return `Eres un consultor experto en procesos, marketing y automatización para startups y negocios digitales, trabajando para Santiago Juan Consulting. Tu objetivo es analizar el problema que describe el cliente y recomendar el servicio más adecuado, o una combinación de servicios si el caso lo requiere, de entre estos cuatro servicios específicos:

1. OPTIMIZACIÓN DE PROCESOS: Adecuado para problemas de eficiencia interna, flujos de trabajo, reducción de costes operativos mientras escalas.
2. AUTOMATIZACIÓN DE MARKETING: Ideal para problemas de captación de leads, nutrición de prospectos, retención de clientes, estrategias de email, SMS y CRM.
3. AUDITORÍA DE EMBUDOS: Perfecto para problemas de conversión, abandonos en el proceso de compra, análisis de journey del cliente y aumento de conversiones.
4. AUDITORÍA UX/UI DE SITIOS WEB: Ideal para problemas de diseño web, experiencia de usuario deficiente, interfaces poco atractivas o confusas, y mejora de la usabilidad del sitio.

INFORMACIÓN IMPORTANTE SOBRE PRIORIZACIÓN:
- Si el cliente menciona problemas con el DISEÑO de su sitio web, interfaz "fea", mala experiencia de usuario, o necesidad de rediseño, debes priorizar AUDITORÍA UX/UI como servicio principal o complementario.
- Si menciona problemas para CAPTAR CLIENTES o LEADS, prioriza AUTOMATIZACIÓN DE MARKETING.
- Si menciona problemas de CONVERSIÓN o ABANDONOS en el proceso de compra, prioriza AUDITORÍA DE EMBUDOS.
- Si menciona problemas de EFICIENCIA INTERNA, PROCESOS, o COSTES, prioriza OPTIMIZACIÓN DE PROCESOS.

REGLAS CRUCIALES:
- ANALIZA DETALLADAMENTE el mensaje completo del cliente para detectar TODOS los problemas mencionados.
- Si detectas MÚLTIPLES PROBLEMAS distintos, recomienda un servicio PRINCIPAL y otro COMPLEMENTARIO.
- El servicio PRINCIPAL debe abordar el problema que consideres más urgente o central.
- El servicio COMPLEMENTARIO debe abordar el segundo problema más importante.

IMPORTANTE: Debes proporcionar una respuesta estructurada con estos elementos:
- SERVICIO PRINCIPAL: Nombre del servicio principal recomendado
- SERVICIO COMPLEMENTARIO (obligatorio si detectas múltiples problemas): Un servicio adicional que complementa al principal
- RAZÓN: Por qué estos servicios son los más adecuados (máximo 3 líneas), mencionando específicamente los problemas detectados
- VALOR: Qué beneficios principales obtendrá el cliente (1-2 líneas)
- ACCIÓN: Sugerir agendar una llamada gratuita de diagnóstico

IMPORTANTE: Tus respuestas deben ser INFORMATIVAS pero CONCISAS. Proporciona suficiente contexto para que el cliente entienda por qué recomiendas ese servicio, pero sin extenderte demasiado.

Mantén un tono profesional pero cercano. No inventes información adicional sobre los servicios.`;
  } else {
    return `You are an expert consultant in processes, marketing, and automation for startups and digital businesses, working for Santiago Juan Consulting. Your goal is to analyze the client's problem and recommend the most suitable service, or a combination of services if the case requires it, from these four specific services:

1. PROCESS OPTIMIZATION: Suitable for internal efficiency issues, workflows, reducing operational costs while scaling.
2. MARKETING AUTOMATION: Ideal for lead generation problems, prospect nurturing, customer retention, email, SMS and CRM strategies.
3. FUNNEL AUDIT: Perfect for conversion issues, dropouts in the purchase process, customer journey analysis and increasing conversions.
4. UX/UI WEBSITE AUDIT: Ideal for web design problems, poor user experience, unattractive or confusing interfaces, and improving site usability.

IMPORTANT PRIORITIZATION INFORMATION:
- If the client mentions problems with their website DESIGN, "ugly" interface, poor user experience, or need for redesign, you must prioritize UX/UI AUDIT as the main or complementary service.
- If they mention problems ATTRACTING CUSTOMERS or LEADS, prioritize MARKETING AUTOMATION.
- If they mention CONVERSION problems or DROPOUTS in the purchase process, prioritize FUNNEL AUDIT.
- If they mention INTERNAL EFFICIENCY, PROCESSES, or COSTS issues, prioritize PROCESS OPTIMIZATION.

CRUCIAL RULES:
- ANALYZE THOROUGHLY the client's complete message to detect ALL mentioned problems.
- If you detect MULTIPLE DISTINCT PROBLEMS, recommend a PRIMARY service and a COMPLEMENTARY one.
- The PRIMARY service should address the problem you consider most urgent or central.
- The COMPLEMENTARY service should address the second most important problem.

IMPORTANT: You must provide a structured response with these elements:
- MAIN SERVICE: Name of the main recommended service
- COMPLEMENTARY SERVICE (mandatory if multiple problems are detected): An additional service that complements the main one
- REASON: Why these services are the most appropriate (maximum 3 lines), specifically mentioning the detected problems
- VALUE: What main benefits the client will obtain (1-2 lines)
- ACTION: Suggest scheduling a free diagnostic call

Maintain a professional but approachable tone. Do not invent additional information about the services.`;
  }
}

/**
 * Configura los parámetros para la llamada a la API de OpenAI
 * @param lang - Código de idioma ('es' o 'en')
 * @param problem - Descripción del problema del usuario
 * @returns Objeto de configuración para la llamada a la API
 */
export function getOpenAIConfig(lang: string = 'es', problem: string) {
  return {
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [
      { role: "system" as const, content: getSystemPrompt(lang) },
      { role: "user" as const, content: problem }
    ],
    temperature: 0.7,
    max_tokens: 450,
  };
}

/**
 * Extrae secciones estructuradas de la respuesta de la API
 * @param aiResponse - Texto completo de la respuesta de la API
 * @returns Objeto estructurado con las secciones extraídas
 */
export function extractStructuredResponse(aiResponse: string) {
  console.log("Raw AI Response:", aiResponse);
  
  // Intentar extraer con patrones de título explícitos - Formato mejorado para español e inglés
  let mainServiceMatch = aiResponse.match(/(?:SERVICIO PRINCIPAL|MAIN SERVICE)[:\s]+([\s\S]*?)(?=(?:SERVICIO COMPLEMENTARIO|COMPLEMENTARY SERVICE|RAZÓN|REASON)[:\s]+|$)/i);
  let complementaryServiceMatch = aiResponse.match(/(?:SERVICIO COMPLEMENTARIO|COMPLEMENTARY SERVICE)[:\s]+([\s\S]*?)(?=(?:RAZÓN|REASON)[:\s]+|$)/i);
  let reasonMatch = aiResponse.match(/(?:RAZÓN|REASON)[:\s]+([\s\S]*?)(?=(?:VALOR|VALUE)[:\s]+|$)/i);
  let valueMatch = aiResponse.match(/(?:VALOR|VALUE)[:\s]+([\s\S]*?)(?=(?:ACCIÓN|ACTION)[:\s]+|$)/i);
  let actionMatch = aiResponse.match(/(?:ACCIÓN|ACTION)[:\s]+([\s\S]*?)(?=$)/i);
  
  console.log("Regex matches:", { 
    mainServiceMatch: mainServiceMatch ? "Found" : "Not found", 
    complementaryServiceMatch: complementaryServiceMatch ? "Found" : "Not found",
    reasonMatch: reasonMatch ? "Found" : "Not found",
    valueMatch: valueMatch ? "Found" : "Not found",
    actionMatch: actionMatch ? "Found" : "Not found"
  });
  
  // Respaldo: Si no se encontraron mediante reglas explícitas, intentar con heurística de texto
  if (!mainServiceMatch) {
    console.log("No se encontró el patrón de servicio principal, usando heurística de texto");
    
    // Dividir en líneas y buscar probables servicios
    const lines = aiResponse.split('\n').filter(line => line.trim() !== '');
    
    // Si hay pocas líneas, la primera podría ser el servicio principal
    if (lines.length > 0 && lines.length <= 5) {
      mainServiceMatch = ["", lines[0]];
    }
    
    // Buscar palabras clave de servicios en la respuesta
    const serviceKeywords = [
      'optimización', 'procesos', 'process', 'marketing', 'automatización', 
      'embudo', 'funnel', 'ux', 'ui', 'web', 'auditoría', 'consultoría',
      'optimization', 'automation', 'audit', 'consulting'
    ];
    
    for (const line of lines) {
      const lowercaseLine = line.toLowerCase();
      const hasServiceKeyword = serviceKeywords.some(keyword => 
        lowercaseLine.includes(keyword.toLowerCase()));
        
      if (hasServiceKeyword && !mainServiceMatch) {
        mainServiceMatch = ["", line];
      }
    }
  }

  // Extraer valores o usar cadenas vacías
  let mainService = mainServiceMatch ? mainServiceMatch[1].trim() : '';
  let complementaryService = complementaryServiceMatch ? complementaryServiceMatch[1].trim() : '';
  let reason = reasonMatch ? reasonMatch[1].trim() : '';
  let value = valueMatch ? valueMatch[1].trim() : '';
  let action = actionMatch ? actionMatch[1].trim() : '';
  
  // Limpiar formato de textos
  mainService = cleanFormatting(mainService);
  complementaryService = cleanFormatting(complementaryService);
  reason = cleanFormatting(reason);
  value = cleanFormatting(value);
  action = cleanFormatting(action);
  
  // Limitar longitud para respuestas en español (detectar idioma)
  const isSpanish = aiResponse.toLowerCase().match(/servicio|razón|valor|acción|auditoría|embudos|procesos/);
  
  if (isSpanish) {
    // Convertir a título si está en mayúsculas
    if (mainService === mainService.toUpperCase()) {
      mainService = mainService.charAt(0).toUpperCase() + mainService.slice(1).toLowerCase();
    }
    
    if (complementaryService === complementaryService.toUpperCase()) {
      complementaryService = complementaryService.charAt(0).toUpperCase() + 
        complementaryService.slice(1).toLowerCase();
    }
  }
  
  // Asegurarse de que tenemos al menos un servicio
  if (!mainService) {
    console.log("No se pudo extraer un servicio principal, usando valor predeterminado");
    
    mainService = isSpanish 
      ? 'Auditoría UX/UI de sitios web'
      : 'UX/UI Website Audit';
  }
  
  // Asegurarse de que tenemos una razón
  if (!reason) {
    reason = isSpanish
      ? 'Basado en tu descripción, este servicio podría ayudarte a resolver tu problema actual.'
      : 'Based on your description, this service could help you solve your current problem.';
  }
  
  // Asegurarse de que tenemos un valor
  if (!value) {
    value = isSpanish
      ? 'Obtendrás mejoras concretas y medibles adaptadas a tus necesidades específicas.'
      : 'You will get concrete and measurable improvements tailored to your specific needs.';
  }
  
  // Asegurarse de que tenemos una acción
  if (!action) {
    action = isSpanish
      ? 'Agendemos una llamada para discutir cómo podemos ayudarte'
      : 'Let\'s schedule a call to discuss how we can help you';
  }

  console.log("Extracted Response:", {
    mainService,
    complementaryService,
    reason,
    value,
    action
  });
  
  return {
    mainService,
    complementaryService,
    reason,
    value,
    action,
    fullResponse: aiResponse
  };
}

/**
 * Limpia el formato de texto quitando asteriscos y otros caracteres de markdown
 * @param text - Texto a limpiar
 * @returns Texto limpio
 */
function cleanFormatting(text: string): string {
  if (!text) return '';
  
  // Quitar asteriscos, almohadillas y otros caracteres de markdown
  let cleanedText = text
    .replace(/\*\*/g, '') // Quitar dobles asteriscos (negrita)
    .replace(/\*/g, '') // Quitar asteriscos simples (cursiva)
    .replace(/#+\s/g, '') // Quitar almohadillas de títulos
    .replace(/^[-*+]\s/gm, '') // Quitar marcadores de listas
    .replace(/^\d+\.\s/gm, '') // Quitar números de listas ordenadas
    .replace(/\n+/g, ' ') // Reemplazar saltos de línea con espacios
    .trim();
  
  return cleanedText;
} 