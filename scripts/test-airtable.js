// Importar Airtable
const Airtable = require('airtable');

// Configurar Airtable
const AIRTABLE_API_KEY = 'patYYgtBReShy6Wkz.86bbbd49e86e9f7230c5a88646a1666b5c86337b9c636dfb938a44ccea1c9e32';
const AIRTABLE_BASE_ID = 'appqgUSVpBkFjVlNv';
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Función para listar bases disponibles
async function listBases() {
  console.log('Listando bases disponibles...');
  try {
    const response = await fetch('https://api.airtable.com/v0/meta/bases', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Bases listadas correctamente:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.error('Error al listar bases:', await response.text());
    }
  } catch (error) {
    console.error('Error al listar bases:', error);
  }
}

// Función para obtener registros de una tabla
async function getRecords(tableName) {
  console.log(`Obteniendo registros de la tabla "${tableName}"...`);
  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`Registros de la tabla "${tableName}" obtenidos correctamente:`);
      console.log(JSON.stringify(data, null, 2));
      return data;
    } else {
      console.error(`Error al obtener registros de la tabla "${tableName}":`, await response.text());
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener registros de la tabla "${tableName}":`, error);
    return null;
  }
}

// Función para crear un registro en una tabla
async function createRecord(tableName, fields) {
  console.log(`Intentando crear registro en tabla "${tableName}" con campos:`, fields);
  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{ fields }],
        typecast: true
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Registro creado correctamente:');
      console.log(JSON.stringify(data, null, 2));
      return data;
    } else {
      const errorText = await response.text();
      console.error('Error al crear registro:', {
        statusCode: response.status,
        data: errorText
      });
      return null;
    }
  } catch (error) {
    console.error('Error al crear registro:', error);
    return null;
  }
}

// Ejecutar pruebas
async function runTests() {
  // Listar bases disponibles
  await listBases();
  
  // Obtener registros de la tabla "Email Registers"
  await getRecords('Email Registers');
  
  // Probar específicamente el campo "Respuesta"
  console.log('\nProbando el campo "Respuesta"...');
  await createRecord('Email Registers', {
    'Email Address': 'test-respuesta@example.com',
    'Problema': 'Prueba del campo Respuesta',
    'Servicio Recomendado': 'Test',
    'Date Added': new Date().toISOString().split('T')[0],
    'Idioma': 'es',
    'JSON': '{}',
    'Respuesta': 'Este es un texto de prueba para el campo Respuesta. Estamos verificando si este campo existe y puede almacenar correctamente un reporte detallado generado por OpenAI.'
  });
}

// Ejecutar las pruebas
runTests(); 