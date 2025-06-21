/**
 * Script para generar emails HTML con la respuesta de OpenAI
 * 
 * Este archivo muestra cómo puedes usar las plantillas HTML para generar 
 * emails personalizados con la respuesta generada por OpenAI.
 */

const fs = require('fs');
const path = require('path');

/**
 * Genera un email HTML a partir de la plantilla y los datos proporcionados
 * @param {string} language - Idioma del email ('es' o 'en')
 * @param {Object} data - Datos para rellenar la plantilla
 * @param {string} data.openaiResponse - Respuesta de OpenAI para insertar en el email
 * @returns {string} - HTML del email generado
 */
function generateEmail(language = 'es', data = {}) {
  try {
    // Determinar qué plantilla usar
    const templateFile = language === 'en' 
      ? path.join(__dirname, 'template_en.html')
      : path.join(__dirname, 'template_es.html');
    
    // Leer la plantilla
    let template = fs.readFileSync(templateFile, 'utf8');
    
    // Reemplazar el marcador de posición con la respuesta de OpenAI
    if (language === 'en') {
      template = template.replace('{{OPENAI_RESPONSE}}', data.openaiResponse || '');
    } else {
      template = template.replace('{{RESPUESTA_OPENAI}}', data.openaiResponse || '');
    }
    
    return template;
  } catch (error) {
    console.error('Error generando el email HTML:', error);
    return null;
  }
}

/**
 * Guarda el HTML generado en un archivo
 * @param {string} html - Contenido HTML a guardar
 * @param {string} outputPath - Ruta donde guardar el archivo
 * @returns {boolean} - true si se guardó correctamente, false en caso contrario
 */
function saveHtmlToFile(html, outputPath) {
  try {
    fs.writeFileSync(outputPath, html);
    return true;
  } catch (error) {
    console.error('Error guardando el archivo HTML:', error);
    return false;
  }
}

/**
 * Genera ejemplos de emails para pruebas
 */
function generateExamples() {
  const exampleData = {
    openaiResponse: `
    <p><strong>Análisis de tu situación:</strong></p>
    <p>Basado en la información que me has proporcionado, tu principal desafío parece estar relacionado con la optimización de conversiones en tu sitio web.</p>
    <p><strong>Recomendación:</strong></p>
    <p>Te recomendaría comenzar con una auditoría completa de tu embudo de ventas para identificar los puntos de fricción que están causando la caída en las conversiones. Podemos trabajar juntos para implementar mejoras específicas basadas en datos reales de comportamiento de usuarios.</p>
    `
  };
  
  // Generar ejemplos en español e inglés
  const spanishEmail = generateEmail('es', exampleData);
  const englishEmail = generateEmail('en', exampleData);
  
  // Guardar los ejemplos
  if (spanishEmail) {
    saveHtmlToFile(spanishEmail, path.join(__dirname, 'example_es.html'));
    console.log('Ejemplo en español generado correctamente');
  }
  
  if (englishEmail) {
    saveHtmlToFile(englishEmail, path.join(__dirname, 'example_en.html'));
    console.log('Ejemplo en inglés generado correctamente');
  }
}

// Exportar las funciones para uso en otros módulos
module.exports = {
  generateEmail,
  saveHtmlToFile,
  generateExamples
};

// Si se ejecuta directamente este archivo, generar ejemplos
if (require.main === module) {
  generateExamples();
} 