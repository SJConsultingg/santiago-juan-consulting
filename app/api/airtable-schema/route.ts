import { NextRequest, NextResponse } from 'next/server';

// Airtable API token
const AIRTABLE_API_KEY = 'patYYgtBReShy6Wkz.86bbbd49e86e9f7230c5a88646a1666b5c86337b9c636dfb938a44ccea1c9e32';
const AIRTABLE_BASE_ID = 'appqgUSVpBkFjVlNv';

export async function GET(request: NextRequest) {
  try {
    console.log('API airtable-schema: Obteniendo estructura de la base');
    
    // Obtener el schema de la base
    const schemaResponse = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/schema`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!schemaResponse.ok) {
      const errorText = await schemaResponse.text();
      console.error('API airtable-schema: Error al obtener schema:', {
        status: schemaResponse.status,
        statusText: schemaResponse.statusText,
        errorDetails: errorText
      });
      return NextResponse.json(
        { error: 'Failed to get Airtable schema', details: errorText },
        { status: schemaResponse.status }
      );
    }
    
    const schemaData = await schemaResponse.json();
    console.log('API airtable-schema: Schema obtenido correctamente');
    
    // Extraer información relevante
    const tables = schemaData.tables.map((table: any) => {
      return {
        id: table.id,
        name: table.name,
        primaryFieldId: table.primaryFieldId,
        fields: table.fields.map((field: any) => {
          return {
            id: field.id,
            name: field.name,
            type: field.type
          };
        })
      };
    });
    
    return NextResponse.json({
      baseId: AIRTABLE_BASE_ID,
      tables
    });
    
  } catch (error: any) {
    console.error('API airtable-schema: Error general:', error);
    return NextResponse.json(
      { error: 'Error al obtener schema de Airtable', details: error.message },
      { status: 500 }
    );
  }
} 