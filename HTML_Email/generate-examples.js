/**
 * Script para generar ejemplos de emails HTML
 */

const { generateEmail, saveHtmlToFile } = require('./email-generator');
const path = require('path');

/**
 * Genera ejemplos de emails con diferentes tipos de respuestas
 */
function generateExamples() {
  // Ejemplo 1: Respuesta estándar
  const standardResponse = {
    openaiResponse: `
    <p><strong>Análisis de tu situación:</strong></p>
    <p>Basado en la información que me has proporcionado, tu principal desafío parece estar relacionado con la optimización de conversiones en tu sitio web.</p>
    <p><strong>Recomendación:</strong></p>
    <p>Te recomendaría comenzar con una auditoría completa de tu embudo de ventas para identificar los puntos de fricción que están causando la caída en las conversiones. Podemos trabajar juntos para implementar mejoras específicas basadas en datos reales de comportamiento de usuarios.</p>
    `
  };
  
  // Ejemplo 2: Respuesta más detallada
  const detailedResponse = {
    openaiResponse: `
    <p><strong>Análisis de tu situación:</strong></p>
    <p>He analizado el problema que me describes sobre la caída de ventas en tu tienda online. Basado en la información proporcionada, identifico tres áreas principales que podrían estar afectando tu rendimiento:</p>
    <ol>
      <li><strong>Experiencia de usuario deficiente</strong> - Los usuarios abandonan el carrito antes de completar la compra</li>
      <li><strong>Estrategia de marketing fragmentada</strong> - Falta de coherencia entre canales</li>
      <li><strong>Proceso de checkout complicado</strong> - Demasiados pasos para finalizar la compra</li>
    </ol>
    <p><strong>Recomendación principal:</strong></p>
    <p>Te sugiero implementar un proceso de optimización de conversión (CRO) enfocado en simplificar el checkout y mejorar la experiencia de usuario. Esto incluiría:</p>
    <ul>
      <li>Rediseño del proceso de pago para reducirlo a máximo 3 pasos</li>
      <li>Implementación de opciones de pago rápido</li>
      <li>Mejora de la visualización de productos en dispositivos móviles</li>
    </ul>
    <p>Con estos cambios, podríamos esperar un aumento de conversiones de entre 15-25% en los próximos 2 meses.</p>
    `
  };
  
  // Generar ejemplos en español e inglés
  const examples = [
    {
      name: 'standard_es',
      html: generateEmail('es', standardResponse),
      path: path.join(__dirname, 'example_standard_es.html')
    },
    {
      name: 'standard_en',
      html: generateEmail('en', standardResponse),
      path: path.join(__dirname, 'example_standard_en.html')
    },
    {
      name: 'detailed_es',
      html: generateEmail('es', detailedResponse),
      path: path.join(__dirname, 'example_detailed_es.html')
    },
    {
      name: 'detailed_en',
      html: generateEmail('en', detailedResponse),
      path: path.join(__dirname, 'example_detailed_en.html')
    }
  ];
  
  // Guardar todos los ejemplos
  examples.forEach(example => {
    if (example.html) {
      saveHtmlToFile(example.html, example.path);
      console.log(`Ejemplo "${example.name}" generado correctamente`);
    }
  });
}

// Ejecutar la generación de ejemplos
generateExamples(); 