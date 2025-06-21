import { NextRequest, NextResponse } from 'next/server';

// Airtable API token
const AIRTABLE_API_KEY = 'patYYgtBReShy6Wkz.86bbbd49e86e9f7230c5a88646a1666b5c86337b9c636dfb938a44ccea1c9e32';
const AIRTABLE_BASE_ID = 'appqgUSVpBkFjVlNv';
const TABLE_NAME = 'Diagnoses';

export async function GET(request: NextRequest) {
  try {
    console.log('API create-table: Intentando crear tabla en Airtable');
    
    // Definir la estructura de la tabla
    const tableData = {
      name: TABLE_NAME,
      description: 'Tabla para almacenar diagnósticos de clientes',
      fields: [
        {
          name: 'Email',
          type: 'singleLineText',
          description: 'Email del cliente'
        },
        {
          name: 'Problem',
          type: 'multilineText',
          description: 'Problema descrito por el cliente'
        },
        {
          name: 'Service',
          type: 'singleLineText',
          description: 'Servicio recomendado'
        },
        {
          name: 'Date',
          type: 'dateTime',
          description: 'Fecha de creación'
        },
        {
          name: 'Language',
          type: 'singleLineText',
          description: 'Idioma del diagnóstico'
        },
        {
          name: 'Response',
          type: 'multilineText',
          description: 'Respuesta completa de la IA'
        }
      ]
    };
    
    // Intentar crear la tabla
    const response = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tableData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API create-table: Error al crear tabla:', {
        status: response.status,
        statusText: response.statusText,
        errorDetails: errorText
      });
      
      // Si el error es porque la tabla ya existe, intentamos obtener su estructura
      if (response.status === 422 || response.status === 409) {
        console.log('API create-table: La tabla posiblemente ya existe, intentando obtener su estructura');
        
        // Intentar obtener el schema de la base
        try {
          const schemaResponse = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/schema`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (schemaResponse.ok) {
            const schemaData = await schemaResponse.json();
            const existingTable = schemaData.tables.find((table: any) => table.name === TABLE_NAME);
            
            if (existingTable) {
              console.log('API create-table: Tabla encontrada en el schema:', existingTable);
              return NextResponse.json({
                message: 'La tabla ya existe',
                table: existingTable
              });
            } else {
              console.log('API create-table: Tabla no encontrada en el schema');
              return NextResponse.json(
                { error: 'La tabla no existe y no se pudo crear', details: errorText },
                { status: 404 }
              );
            }
          } else {
            const schemaErrorText = await schemaResponse.text();
            console.error('API create-table: Error al obtener schema:', {
              status: schemaResponse.status,
              statusText: schemaResponse.statusText,
              errorDetails: schemaErrorText
            });
          }
        } catch (schemaError: any) {
          console.error('API create-table: Error al obtener schema:', schemaError);
        }
      }
      
      return NextResponse.json(
        { error: 'Failed to create table', details: errorText },
        { status: response.status }
      );
    }
    
    const responseData = await response.json();
    console.log('API create-table: Tabla creada correctamente:', responseData);
    
    return NextResponse.json({
      success: true,
      message: 'Table created successfully',
      table: responseData
    });
    
  } catch (error: any) {
    console.error('API create-table: Error general:', error);
    return NextResponse.json(
      { error: 'Error al crear tabla en Airtable', details: error.message },
      { status: 500 }
    );
  }
} 