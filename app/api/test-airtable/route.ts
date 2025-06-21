import { NextRequest, NextResponse } from 'next/server';

// Airtable API token
const AIRTABLE_API_KEY = 'patYYgtBReShy6Wkz.86bbbd49e86e9f7230c5a88646a1666b5c86337b9c636dfb938a44ccea1c9e32';
const AIRTABLE_BASE_ID = 'appqgUSVpBkFjVlNv';

interface TableResult {
  success: boolean;
  records?: number;
  fields?: string[];
  status?: number;
  error?: string;
}

export async function GET(request: NextRequest) {
  try {
    console.log('API test-airtable: Iniciando prueba de conexión con Airtable');
    
    // Intentar listar las bases disponibles
    console.log('API test-airtable: Intentando listar bases...');
    let basesResponse;
    try {
      basesResponse = await fetch('https://api.airtable.com/v0/meta/bases', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (basesResponse.ok) {
        const basesData = await basesResponse.json();
        console.log('API test-airtable: Bases disponibles:', basesData);
      } else {
        const errorText = await basesResponse.text();
        console.error('API test-airtable: Error al listar bases:', {
          status: basesResponse.status,
          statusText: basesResponse.statusText,
          errorDetails: errorText
        });
      }
    } catch (error) {
      console.error('API test-airtable: Error al listar bases:', error);
    }
    
    // Intentar listar las tablas de la base específica
    console.log('API test-airtable: Intentando listar tablas...');
    let tablesResponse;
    try {
      tablesResponse = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (tablesResponse.ok) {
        const tablesData = await tablesResponse.json();
        console.log('API test-airtable: Tablas disponibles:', tablesData);
      } else {
        const errorText = await tablesResponse.text();
        console.error('API test-airtable: Error al listar tablas:', {
          status: tablesResponse.status,
          statusText: tablesResponse.statusText,
          errorDetails: errorText
        });
      }
    } catch (error) {
      console.error('API test-airtable: Error al listar tablas:', error);
    }
    
    // Intentar listar los registros de cada tabla
    console.log('API test-airtable: Intentando listar registros de cada tabla...');
    const tableNames = [
      'Email Registers',
      'Email Register',
      'Emails',
      'Email',
      'Registros',
      'Diagnósticos',
      'Diagnosticos',
      'Diagnoses',
      'Diagnosis'
    ];
    
    const tableResults: Record<string, TableResult> = {};
    
    for (const tableName of tableNames) {
      try {
        console.log(`API test-airtable: Intentando listar registros de la tabla "${tableName}"...`);
        const recordsResponse = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (recordsResponse.ok) {
          const recordsData = await recordsResponse.json();
          console.log(`API test-airtable: Registros de la tabla "${tableName}":`, recordsData);
          tableResults[tableName] = {
            success: true,
            records: recordsData.records?.length || 0,
            fields: recordsData.records?.[0]?.fields ? Object.keys(recordsData.records[0].fields) : []
          };
        } else {
          const errorText = await recordsResponse.text();
          console.error(`API test-airtable: Error al listar registros de la tabla "${tableName}":`, {
            status: recordsResponse.status,
            statusText: recordsResponse.statusText,
            errorDetails: errorText
          });
          tableResults[tableName] = {
            success: false,
            status: recordsResponse.status,
            error: errorText
          };
        }
      } catch (error: any) {
        console.error(`API test-airtable: Error al listar registros de la tabla "${tableName}":`, error);
        tableResults[tableName] = {
          success: false,
          error: error.message
        };
      }
    }
    
    // Devolver resultados
    return NextResponse.json({
      message: 'Test de Airtable completado',
      tableResults
    });
    
  } catch (error: any) {
    console.error('API test-airtable: Error general:', error);
    return NextResponse.json(
      { error: 'Error en la prueba de Airtable', details: error.message },
      { status: 500 }
    );
  }
} 