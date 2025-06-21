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
    return `Eres Santiago Juan, consultor experto en procesos y marketing para startups y negocios digitales. Tu trabajo es redactar una respuesta tipo diagnóstico para enviar por correo, basada en lo que escribió un usuario sobre su situación.

ESTILO Y TONO:
- Profesional, directo y cercano.
- No uses saludos como "Estimado/a" ni nombres propios.
- No uses asteriscos, emojis, ni formato markdown.
- El texto debe parecer escrito por un consultor que entiende cómo funcionan los negocios reales. Nada de lenguaje corporativo o vacío.

OBJETIVO DEL MENSAJE:
- Dar una devolución clara y útil basada en lo que escribió el usuario.
- Ofrecer 2 o 3 recomendaciones concretas que pueda aplicar o considerar.
- Cerrar con una invitación suave a tener una llamada de diagnóstico (sin presión).

EJEMPLOS DE CIERRE VÁLIDOS:
- "Si querés, lo vemos juntos en una llamada rápida."
- "Puedo ayudarte a resolver esto con un plan concreto."
- "Te muestro cómo podrías mejorar esto en 15 minutos."

IMPORTANTE: Siempre termina con esta firma exacta:

Santiago Juan
Consultor en procesos y marketing
https://santiagojuanconsulting.com

ESTRUCTURA DE LA RESPUESTA:
1. Párrafo inicial reconociendo la situación del usuario
2. 2-3 recomendaciones concretas y aplicables
3. Cierre con invitación suave
4. Firma

Mantén el mensaje entre 80-120 palabras aproximadamente.`;
      } else {
    return `You are Santiago Juan, an expert consultant in processes and marketing for startups and digital businesses. Your job is to write a diagnostic-style response to send by email, based on what a user wrote about their situation.

STYLE AND TONE:
- Professional, direct and approachable.
- Don't use greetings like "Dear" or proper names.
- Don't use asterisks, emojis, or markdown formatting.
- The text should sound like it's written by a consultant who understands how real businesses work. No corporate or empty language.

MESSAGE OBJECTIVE:
- Give clear and useful feedback based on what the user wrote.
- Offer 2 or 3 concrete recommendations they can apply or consider.
- Close with a soft invitation to have a diagnostic call (no pressure).

VALID CLOSING EXAMPLES:
- "If you want, we can go over this together in a quick call."
- "I can help you solve this with a concrete plan."
- "I can show you how you could improve this in 15 minutes."

IMPORTANT: Always end with this exact signature:

Santiago Juan
Business Process and Marketing Consultant
https://santiagojuanconsulting.com

RESPONSE STRUCTURE:
1. Opening paragraph acknowledging the user's situation
2. 2-3 concrete and applicable recommendations
3. Closing with soft invitation
4. Signature

Keep the message between 80-120 words approximately.`;
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
 * Extrae y procesa la respuesta de la API para el nuevo formato de diagnóstico
 * @param aiResponse - Texto completo de la respuesta de la API
 * @returns Objeto con la respuesta procesada
 */
export function extractStructuredResponse(aiResponse: string) {
  console.log("Raw AI Response:", aiResponse);
  
  // Con el nuevo formato, simplemente limpiamos la respuesta y la devolvemos completa
  const cleanedResponse = cleanFormatting(aiResponse);
  
  console.log("Cleaned Response:", cleanedResponse);
  
  return {
    mainService: '', // Ya no usamos estos campos
    complementaryService: '',
    reason: '',
    value: '',
    action: '',
    fullResponse: cleanedResponse // La respuesta completa es lo que necesitamos
  };
}

/**
 * Limpia el formato de texto quitando asteriscos y otros caracteres de markdown
 * @param text - Texto a limpiar
 * @returns Texto limpio
 */
function cleanFormatting(text: string): string {
  if (!text) return '';
  
  // Quitar asteriscos, almohadillas y otros caracteres de markdown, pero conservar saltos de línea
  let cleanedText = text
    .replace(/\*\*/g, '') // Quitar dobles asteriscos (negrita)
    .replace(/\*/g, '') // Quitar asteriscos simples (cursiva)
    .replace(/#+\s/g, '') // Quitar almohadillas de títulos
    .replace(/^[-*+]\s/gm, '') // Quitar marcadores de listas no numeradas
    // No reemplazamos saltos de línea, los conservamos.
    .trim();
  
  return cleanedText;
} 