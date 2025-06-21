// Script para probar la API de diagnóstico
const fetch = require('node-fetch');

async function testSaveDiagnosis() {
  try {
    console.log('Enviando solicitud a la API de diagnóstico...');
    
    const response = await fetch('http://localhost:3000/api/save-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        problem: 'Mi sitio web no está generando suficientes ventas y tengo una tasa de rebote muy alta. Los usuarios no encuentran fácilmente lo que buscan.',
        recommendedService: 'Auditoría UX/UI de sitios web',
        language: 'es',
        aiResponse: {
          mainService: 'Auditoría UX/UI de sitios web',
          complementaryService: 'Automatización de marketing',
          reason: 'Tu sitio web necesita mejorar la experiencia de usuario para reducir la tasa de rebote.',
          value: 'Con una mejor UX/UI, aumentarás las conversiones y retendrás más visitantes.',
          action: 'Agenda una llamada para analizar en detalle tu sitio web.'
        }
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Respuesta exitosa:', data);
      
      // Mostrar el reporte detallado
      if (data.detailedReport) {
        console.log('\n--- REPORTE DETALLADO ---\n');
        console.log(data.detailedReport);
        console.log('\n------------------------\n');
      }
    } else {
      const errorText = await response.text();
      console.error('Error en la respuesta:', {
        status: response.status,
        statusText: response.statusText,
        errorDetails: errorText
      });
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

// Ejecutar la prueba
testSaveDiagnosis(); 