import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Airtable API token
const AIRTABLE_API_KEY = 'patYYgtBReShy6Wkz.86bbbd49e86e9f7230c5a88646a1666b5c86337b9c636dfb938a44ccea1c9e32';
const AIRTABLE_BASE_ID = 'appqgUSVpBkFjVlNv';
// Nombre de la tabla en Airtable
const AIRTABLE_TABLE_NAME = 'Email Registers';

// Inicializar OpenAI con la API key desde variables de entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    console.log('API save-diagnosis: Recibida solicitud POST');
    
    // Obtener el cuerpo de la solicitud
    const body = await request.json();
    
    // Validar que los campos requeridos estén presentes
    const { email, problem, recommendedService, language, aiResponse } = body;
    
    console.log('API save-diagnosis: Datos recibidos:', { 
      email, 
      problemLength: problem?.length, 
      recommendedService,
      language
    });
    
    if (!email || !problem || !recommendedService) {
      console.error('API save-diagnosis: Faltan campos requeridos');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generar un reporte detallado con OpenAI
    let detailedReport = '';
    try {
      console.log('API save-diagnosis: Generando reporte detallado con OpenAI');
      
      const prompt = language === 'en' 
        ? `Create a direct, professional email that summarizes a diagnosis for this business problem: "${problem}". The recommended service is "${recommendedService}".

GUIDELINES:
- Write in a direct, professional, and human style.
- Don't use any user names.
- Don't use asterisks or markdown formatting.
- CRITICAL: DO NOT claim to have seen or reviewed their website, business, or any other asset. Base your response ONLY on the problem statement provided.
- Avoid empty formalities like "Dear", "I remain at your disposal", "cordial greetings", etc.
- The tone should be that of a consultant with judgment who speaks clearly: approachable, without fluff.
- The goal of the email is to deliver a useful diagnosis + suggest a deeper conversation if the user wants to scale their business in an orderly way.
- Include 2-3 specific insights or action points they can implement immediately, based ONLY on the information provided.
- Keep it under 300 words.

End the email with this signature:

Santiago Juan
Business Process and Marketing Consultant`

        : `Crea un correo directo y profesional que resuma un diagnóstico para este problema de negocio: "${problem}". El servicio recomendado es "${recommendedService}".

PAUTAS:
- Escribe con un estilo directo, profesional y humano.
- No uses nombres de usuario.
- No uses asteriscos ni formato markdown.
- CRÍTICO: NO afirmes haber visto o revisado su sitio web, negocio o cualquier otro activo. Basa tu respuesta ÚNICAMENTE en la descripción del problema proporcionada.
- Evita formalidades vacías como "estimado/a", "quedo a su disposición", "saludos cordiales", etc.
- El tono debe ser de un consultor con criterio que habla claro: cercano, sin vender humo.
- El objetivo del correo es entregar un diagnóstico útil + sugerir una conversación más profunda si el usuario quiere escalar su negocio de forma ordenada.
- Incluye 2-3 ideas o puntos de acción específicos que puedan implementar de inmediato, basados ÚNICAMENTE en la información proporcionada.
- Mantenlo por debajo de 300 palabras.

Cierra el correo con esta firma:

Santiago Juan
Consultor en procesos y marketing`;
      
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a direct, professional business consultant who communicates clearly without unnecessary formalities. You NEVER claim to have reviewed materials you haven't seen. You base your advice ONLY on the information explicitly provided." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 600,
      });
      
      detailedReport = response.choices[0].message.content || '';
      console.log('API save-diagnosis: Reporte detallado generado');
    } catch (error: any) {
      console.error('API save-diagnosis: Error al generar reporte detallado:', error);
      // Si falla la generación del reporte, continuamos con un reporte vacío
      detailedReport = '';
    }
    
    // Preparar los datos para Airtable con los nombres de campos exactos
    const data = {
      records: [
        {
          fields: {
            'Email Address': email,
            'Problema': problem,
            'Servicio Recomendado': recommendedService,
            'Date Added': new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
            'Idioma': language || 'es',
            'JSON': JSON.stringify(aiResponse || {}),
            'Respuesta': detailedReport // Nuevo campo para el reporte detallado
          }
        }
      ],
      // Añadir typecast para permitir que Airtable convierta automáticamente los tipos de datos
      typecast: true
    };
    
    console.log('API save-diagnosis: Datos preparados para Airtable:', data);
    console.log('API save-diagnosis: URL de Airtable:', `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`);
    
    // Enviar los datos a Airtable
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    // Verificar la respuesta de Airtable
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API save-diagnosis: Error al guardar en Airtable:', {
        status: response.status,
        statusText: response.statusText,
        errorDetails: errorText
      });
      return NextResponse.json(
        { error: 'Failed to save to Airtable', details: errorText },
        { status: 500 }
      );
    }
    
    const responseData = await response.json();
    console.log('API save-diagnosis: Respuesta exitosa de Airtable:', responseData);
    
    // Devolver una respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Diagnosis saved successfully',
      recordId: responseData.records?.[0]?.id,
      detailedReport: detailedReport // Incluir el reporte en la respuesta
    });
    
  } catch (error: any) {
    console.error('API save-diagnosis: Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 