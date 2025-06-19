import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { rateLimit } from '@/lib/rate-limit';
import { getFallbackResponse } from '@/lib/fallback-responses';
import { getOpenAIConfig, extractStructuredResponse } from '@/lib/openai-prompts';
import { detectLanguage } from '@/lib/language-detection';

// Inicializar OpenAI con la API key desde variables de entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("API diagnostico: Inicializando con API key desde variables de entorno");

/**
 * Endpoint POST para analizar el problema del usuario con OpenAI
 * y recomendar servicios adecuados
 */
export async function POST(request: Request) {
  console.log("API diagnostico: Recibida nueva solicitud POST");
  try {
    // Verificar límites de uso
    const limiter = await rateLimit.check();
    console.log("API diagnostico: Verificación de límites:", limiter);
    if (!limiter.success) {
      console.log("API diagnostico: Límite excedido, usando respuesta de fallback");
      return NextResponse.json({ 
        error: 'Límite de diagnósticos alcanzado',
        fallbackResponse: getFallbackResponse('es') 
      }, { status: 429 });
    }

    // Obtener datos de la petición
    const body = await request.json();
    const { problem, lang = 'es' } = body;
    console.log("API diagnostico: Datos recibidos:", { 
      problemLength: problem?.length, 
      lang, 
      detectedLanguage: detectLanguage(problem)
    });
    
    // Detectar el idioma si no se especificó o para confirmar
    const detectedLang = detectLanguage(problem);
    const finalLang = lang || detectedLang || 'es';
    console.log("API diagnostico: Idioma a usar:", finalLang);
    
    // Validar entrada
    if (!problem || problem.trim().length < 10) {
      console.log("API diagnostico: Entrada inválida - texto demasiado corto");
      return NextResponse.json({ 
        error: finalLang === 'es' 
          ? 'Por favor proporciona una descripción detallada de tu problema' 
          : 'Please provide a detailed description of your problem' 
      }, { status: 400 });
    }
    
    // Configurar parámetros para OpenAI
    const config = getOpenAIConfig(finalLang, problem);
    console.log("API diagnostico: Configuración de OpenAI:", { 
      model: config.model, 
      messagesCount: config.messages.length,
      language: finalLang
    });
    
    // Llamar a la API de OpenAI
    console.log("API diagnostico: Llamando a OpenAI...");
    const response = await openai.chat.completions.create(config);
    console.log("API diagnostico: Respuesta recibida de OpenAI");
    
    // Verificar si se obtuvo una respuesta válida
    if (!response.choices || response.choices.length === 0) {
      console.log("API diagnostico: No se encontraron opciones en la respuesta");
      throw new Error(finalLang === 'es' 
        ? 'No se recibió respuesta de OpenAI' 
        : 'No response received from OpenAI');
    }
    
    // Extraer el contenido de la respuesta
    const aiResponse = response.choices[0].message.content || '';
    
    console.log("API diagnostico: Respuesta completa de OpenAI:", aiResponse);
    
    // Procesar la respuesta para obtener un formato estructurado
    const structuredResponse = extractStructuredResponse(aiResponse);
    
    // Verificar si la respuesta estructurada contiene un servicio principal
    if (!structuredResponse.mainService) {
      console.log("API diagnostico: Error - No se pudo extraer un servicio principal válido");
      throw new Error(finalLang === 'es'
        ? 'No pudimos identificar un servicio recomendado de la respuesta'
        : 'We could not identify a recommended service from the response');
    }
    
    console.log("API diagnostico: Respuesta estructurada final:", JSON.stringify(structuredResponse, null, 2));
    
    // Incrementar contador de uso
    await rateLimit.increment();
    console.log("API diagnostico: Contador de uso incrementado");
    
    // Devolver respuesta estructurada
    return NextResponse.json(structuredResponse);
    
  } catch (error: any) {
    console.error('API diagnostico: Error llamando a OpenAI:', error);
    
    // Determinar el idioma para la respuesta de error
    let lang = 'es';
    try {
      const body = await request.json();
      lang = body.lang || 'es';
    } catch (e) {
      console.error('API diagnostico: Error al parsear el cuerpo de la solicitud', e);
      // Si hay error al parsear el cuerpo, usar idioma por defecto
    }
    
    // Respuesta de error con fallback
    console.log("API diagnostico: Devolviendo respuesta de fallback debido a error");
    return NextResponse.json({ 
      error: error.message || 'Error al procesar la solicitud',
      fallbackResponse: getFallbackResponse(lang)
    }, { 
      status: 500 
    });
  }
} 