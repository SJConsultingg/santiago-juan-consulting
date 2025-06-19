# Configuración de la Integración con OpenAI

Este documento explica cómo terminar la configuración de la integración con OpenAI para el diagnóstico automatizado.

## Requisitos previos

- Node.js 18.0.0 o superior
- Una API Key de OpenAI

## Pasos para completar la configuración

### 1. Instalar las dependencias

Ejecutar el siguiente comando en la terminal:

```bash
npm install openai@4.0.0 --save
```

### 2. Configurar la API Key

Crear/editar el archivo `.env.local` en la raíz del proyecto y agregar lo siguiente:

```
# OpenAI API Key
OPENAI_API_KEY=your-api-key-here

# Límites y configuración
OPENAI_MONTHLY_BUDGET=2
OPENAI_MODEL=gpt-3.5-turbo
MAX_MONTHLY_REQUESTS=1000

# Flags de diagnóstico
ENABLE_FALLBACK_RESPONSES=true
```

### 3. Reiniciar el servidor de desarrollo

Detener el servidor actual con `Ctrl+C` y reiniciarlo con:

```bash
npm run dev
```

## Estructura de archivos

- `lib/rate-limit.ts` - Sistema de control de límites de uso
- `lib/fallback-responses.ts` - Respuestas predeterminadas por si falla la API
- `lib/openai-prompts.ts` - Configuración de los prompts para OpenAI
- `app/api/diagnostico/route.ts` - Endpoint de la API

## Funcionamiento

1. El usuario introduce su problema en el campo de texto.
2. La aplicación envía el texto a la API de OpenAI.
3. OpenAI analiza el problema y recomienda el servicio más adecuado.
4. La respuesta se muestra al usuario con el servicio principal y, si es aplicable, un servicio complementario.

## Configuración avanzada

### Ajustar el presupuesto mensual

Puedes modificar el valor de `OPENAI_MONTHLY_BUDGET` en el archivo `.env.local` para ajustar cuánto quieres gastar mensualmente. El sistema calculará automáticamente el número máximo de solicitudes basado en este presupuesto.

### Cambiar el modelo de OpenAI

Si quieres usar un modelo diferente, cambia `OPENAI_MODEL` en `.env.local`. Por ejemplo:
- `gpt-3.5-turbo` (predeterminado, más económico)
- `gpt-4o` (más potente pero más costoso)

### Respuestas de fallback

Si `ENABLE_FALLBACK_RESPONSES` está establecido en `true`, la aplicación mostrará respuestas predefinidas cuando la API no esté disponible o se haya alcanzado el límite de uso.

## Solución de problemas

Si encuentras algún problema, verifica:

1. Que la API key sea válida
2. Que tengas conexión a Internet
3. Que los logs del servidor no muestren errores

Si necesitas más ayuda, contacta al equipo de desarrollo.

## Próximos pasos y mejoras posibles

- Implementar un sistema de almacenamiento persistente para los límites de uso (KV, base de datos)
- Agregar análisis de sentimiento para mejorar las recomendaciones
- Integrar seguimiento de conversaciones para personalizar mejor las respuestas 