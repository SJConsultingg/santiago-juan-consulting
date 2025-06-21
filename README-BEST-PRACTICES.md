# Buenas Prácticas y Organización del Proyecto

Este documento resume las mejores prácticas y recomendaciones para mantener el proyecto limpio, seguro y fácil de mantener.

---

## 1. Estructura de carpetas
- Mantén todo el código fuente y recursos de la web dentro de una sola carpeta principal (`sjc-landing-page/`).
- Usa subcarpetas claras: `components/`, `public/`, `lib/`, `scripts/`, `HTML_Email/`, etc.
- Evita carpetas anidadas innecesarias o duplicadas.

## 2. Variables de entorno
- Usa siempre archivos `.env.local` (o `.env`) para tus claves y configuraciones sensibles.
- Nunca subas claves API a repositorios públicos ni las dejes en archivos de texto sueltos.
- Agrega `.env*` a tu `.gitignore`.

## 3. Dependencias
- Solo debe haber un `package.json` y `node_modules` en la raíz del proyecto real (`sjc-landing-page/`).
- Elimina cualquier otro `package.json` fuera de esa carpeta.

## 4. Versionado y limpieza
- Haz commits frecuentes y descriptivos.
- Borra archivos de ejemplo, pruebas o scripts temporales antes de subir a producción.
- Usa ramas para features grandes y mergea solo cuando esté probado.

## 5. Seguridad
- No dejes archivos con claves o tokens en el repo.
- Si alguna clave se filtró, reemplázala en el proveedor (OpenAI, Airtable, etc).

## 6. Documentación
- Mantén un `README.md` actualizado con instrucciones claras de instalación, desarrollo y despliegue.
- Documenta cualquier script especial o integración externa.

## 7. Automatización
- Usa scripts (`npm run ...`) para tareas repetitivas: limpiar, instalar, testear, desplegar.
- Considera usar herramientas como Husky para hooks de pre-commit (lint, test, etc).

---

**¿Dudas? ¿Ves algo raro? Consulta este archivo antes de modificar la estructura o agregar dependencias.** 