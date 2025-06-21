# Plantillas de Email HTML para Santiago Juan Consulting

Este directorio contiene plantillas de email HTML para enviar diagnósticos personalizados a los clientes de Santiago Juan Consulting. Las plantillas están diseñadas para coincidir con la estética de la landing page, utilizando los mismos colores y estilos.

## Estructura del proyecto

- `template_es.html`: Plantilla de email en español
- `template_en.html`: Plantilla de email en inglés
- `email-generator.js`: Script para generar emails a partir de las plantillas
- `generate-examples.js`: Script para generar ejemplos de emails
- `README.md`: Este archivo

## Paleta de colores

Las plantillas utilizan la misma paleta de colores que la landing page:

- Primario: `#74C1BF` (Teal claro)
- Secundario: `#0B3C49` (Azul petróleo)
- Acento: `#F4A261` (Naranja suave)
- Fondo: `#F5F5F5`
- Texto: `#333333`

## Cómo generar emails

Para generar emails HTML a partir de las plantillas, puedes utilizar el módulo `email-generator.js`:

```javascript
const { generateEmail, saveHtmlToFile } = require('./email-generator');

// Datos para el email
const data = {
  openaiResponse: '<p>Contenido del diagnóstico personalizado...</p>'
};

// Generar email en español
const emailHtml = generateEmail('es', data);

// Guardar el email en un archivo
saveHtmlToFile(emailHtml, 'email-personalizado.html');
```

## Generar ejemplos

Para generar ejemplos de emails, puedes ejecutar el script `generate-examples.js`:

```bash
node generate-examples.js
```

Esto generará varios archivos HTML de ejemplo en el directorio actual:
- `example_standard_es.html`: Ejemplo estándar en español
- `example_standard_en.html`: Ejemplo estándar en inglés
- `example_detailed_es.html`: Ejemplo detallado en español
- `example_detailed_en.html`: Ejemplo detallado en inglés

## Personalización de las plantillas

Si necesitas personalizar las plantillas, puedes editar los archivos `template_es.html` y `template_en.html`. Los marcadores de posición que se reemplazan son:

- `{{RESPUESTA_OPENAI}}`: En la plantilla en español
- `{{OPENAI_RESPONSE}}`: En la plantilla en inglés

## Integración con la API

Para integrar estas plantillas con la API de diagnóstico, puedes importar el módulo `email-generator.js` en tu código y utilizarlo para generar emails HTML a partir de las respuestas de OpenAI.

Ejemplo de integración:

```javascript
const { generateEmail } = require('./HTML_Email/email-generator');

// En tu controlador de API
async function handleDiagnosis(req, res) {
  // ... código para obtener la respuesta de OpenAI ...
  
  // Generar el email HTML
  const emailHtml = generateEmail(userLanguage, {
    openaiResponse: openaiResponse
  });
  
  // Enviar el email al usuario
  await sendEmail({
    to: userEmail,
    subject: userLanguage === 'en' ? 'Your Personalized Report' : 'Tu diagnóstico personalizado',
    html: emailHtml
  });
  
  // ... resto del código ...
}
```

## Consideraciones de compatibilidad

Las plantillas están diseñadas para ser compatibles con la mayoría de los clientes de correo electrónico, incluyendo:

- Gmail
- Outlook
- Apple Mail
- Clientes de correo móviles

Se utilizan estilos en línea para garantizar la compatibilidad máxima. 