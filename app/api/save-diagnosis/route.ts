import { NextRequest, NextResponse } from 'next/server';

// Airtable API token
const AIRTABLE_API_KEY = 'patYYgtBReShy6Wkz.86bbbd49e86e9f7230c5a88646a1666b5c86337b9c636dfb938a44ccea1c9e32';
const AIRTABLE_BASE_ID = 'appqgUSVpBkFjVlNv';
const AIRTABLE_TABLE_NAME = 'Diagnósticos';

export async function POST(request: NextRequest) {
  try {
    // Obtener el cuerpo de la solicitud
    const body = await request.json();
    
    // Validar que los campos requeridos estén presentes
    const { email, problem, recommendedService, language, aiResponse } = body;
    
    if (!email || !problem || !recommendedService) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Preparar los datos para Airtable
    const record = {
      fields: {
        'Email Address': email,
        'Problema': problem,
        'Servicio Recomendado': recommendedService,
        'Date Added': new Date().toISOString(),
        'Idioma': language || 'es',
        'JSON': aiResponse ? JSON.stringify(aiResponse) : '{}'
      }
    };
    
    // Enviar los datos a Airtable
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    });
    
    // Verificar la respuesta de Airtable
    if (!response.ok) {
      console.error('Error al guardar en Airtable:', await response.text());
      return NextResponse.json(
        { error: 'Failed to save to Airtable' },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    
    // Devolver una respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Diagnosis saved successfully',
      recordId: data.id
    });
    
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 