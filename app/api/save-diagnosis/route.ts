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
        ? `Based on the user's problem: "${problem}", create a detailed report that explains what they should do to solve their issue related to "${recommendedService}". The report should be informative and helpful, but leave them wanting more so they schedule a call. Include 3-4 specific action points they can implement immediately, but hint that a personalized consultation would provide much more value. Keep it under 400 words and make it sound professional but conversational. Sign it as "Santiago Juan, Business Consultant".`
        : `Basado en el problema del usuario: "${problem}", crea un reporte detallado que explique lo que deberían hacer para resolver su problema relacionado con "${recommendedService}". El reporte debe ser informativo y útil, pero dejarlos con ganas de más para que agenden una llamada. Incluye 3-4 puntos de acción específicos que puedan implementar inmediatamente, pero insinúa que una consultoría personalizada les proporcionaría mucho más valor. Mantenlo por debajo de 400 palabras y hazlo sonar profesional pero conversacional. Fírmalo como "Santiago Juan, Consultor de Negocios".`;
      
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful business consultant specializing in marketing, processes, and web optimization." },
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