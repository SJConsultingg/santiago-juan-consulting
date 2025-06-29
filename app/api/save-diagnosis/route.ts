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
        ? `Create a direct, professional response that addresses this business problem: "${problem}". The recommended service is "${recommendedService}".

GUIDELINES:
- Write in a direct, professional, and human style.
- Don't use any user names.
- Don't use asterisks or markdown formatting.
- CRITICAL: DO NOT claim to have seen or reviewed their website, business, or any other asset. Base your response ONLY on the problem statement provided.
- DO NOT include any subject line or email header.
- DO NOT include ANY phrases like "I remain at your disposal", "at your service", "feel free to contact me", "don't hesitate to reach out", etc.
- The tone should be that of a consultant who speaks clearly: approachable, without fluff.
- Be brief and direct. Get straight to the point.
- Include 2-3 specific insights or action points they can implement immediately, based ONLY on the information provided.
- End with a simple invitation to schedule a call to discuss further - nothing more.
- Keep it under 250 words.

End the response with ONLY this signature:

Santiago Juan
Business Process and Marketing Consultant`

        : `Crea una respuesta directa y profesional que aborde este problema de negocio: "${problem}". El servicio recomendado es "${recommendedService}".

PAUTAS:
- Escribe con un estilo directo, profesional y humano.
- No uses nombres de usuario.
- No uses asteriscos ni formato markdown.
- CRÍTICO: NO afirmes haber visto o revisado su sitio web, negocio o cualquier otro activo. Basa tu respuesta ÚNICAMENTE en la descripción del problema proporcionada.
- NO incluyas asunto ni encabezado de correo.
- NO incluyas NINGUNA frase como "quedo a su disposición", "a su servicio", "no dudes en contactarme", "estoy a tu disposición", etc.
- El tono debe ser de un consultor que habla claro: cercano, sin vender humo.
- Sé breve y directo. Ve al grano.
- Incluye 2-3 ideas o puntos de acción específicos que puedan implementar de inmediato, basados ÚNICAMENTE en la información proporcionada.
- Termina con una simple invitación a agendar una llamada para discutir más a fondo - nada más.
- Mantenlo por debajo de 250 palabras.

Termina la respuesta ÚNICAMENTE con esta firma:

Santiago Juan
Consultor en procesos y marketing`;
      
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a direct, professional business consultant who communicates clearly without unnecessary formalities. You NEVER claim to have reviewed materials you haven't seen. You base your advice ONLY on the information explicitly provided. You NEVER include phrases like 'at your disposal' or 'feel free to contact me'. You are brief and to the point." },
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