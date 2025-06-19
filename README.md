# Santiago Juan Consulting - Landing Page

Página web para la consultora Santiago Juan Consulting, especializada en procesos internos y marketing para startups y ecommerce.

## Tecnologías

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Framer Motion para animaciones
- Diseño responsive

## Estructura

La landing page está organizada en componentes modulares:

- **HeroSection**: Sección principal con mensaje clave y CTA
- **ServicesSection**: Servicios ofrecidos con iconos y descripciones
- **ProcessSection**: Proceso de trabajo en tres pasos
- **WhyMeSection**: Ventajas de trabajar con Santiago Juan
- **CtaSection**: Call to action final con integración Calendly
- **Navbar**: Barra de navegación con detección de secciones activas

## Colores

La paleta de colores se ha configurado tanto en Tailwind como en variables CSS:

- Primario: `#74C1BF` (Teal claro)
- Secundario: `#0B3C49` (Azul petróleo)
- Acento: `#F4A261` (Naranja suave)
- Fondo: `#F5F5F5`
- Texto: `#333333`

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

## Integración Calendly

La integración con Calendly utiliza el método avanzado recomendado por Calendly para desarrolladores. El componente `CtaSection.tsx` implementa una versión React personalizada de Calendly usando `useRef` y `useEffect`.

Para personalizar la integración:

1. Modifica la URL en el componente `Calendly` dentro de `CtaSection.tsx`
2. Ajusta las propiedades de estilo según sea necesario
3. Para cambiar parámetros de configuración, actualiza el objeto `prefill` y `utm` en el método `initInlineWidget`

## SEO

La configuración SEO básica se encuentra en `app/layout.tsx`. Personaliza los metadatos según necesites.

## Características avanzadas

- **Detección de sección activa**: La barra de navegación detecta automáticamente en qué sección está el usuario y resalta el elemento correspondiente.
- **Animaciones avanzadas**: Se utilizan animaciones con Framer Motion para mejorar la experiencia del usuario.
- **Diseño adaptativo**: La interfaz se adapta perfectamente a dispositivos móviles, tablets y escritorio.
- **Efectos de hover**: Elementos interactivos con efectos de hover para mejorar la experiencia de usuario.

## Despliegue

Este proyecto está optimizado para desplegarse en Vercel o Netlify:

- **Vercel**: Conecta el repositorio y despliega automáticamente
- **Netlify**: Configura el comando de construcción como `npm run build` y el directorio de publicación como `.next` 