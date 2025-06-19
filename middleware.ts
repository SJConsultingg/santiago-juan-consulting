import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Idiomas soportados
export const locales = ['es', 'en'];
export const defaultLocale = 'es';

// Nombre de la cookie de idioma
const LANGUAGE_COOKIE_NAME = 'NEXT_LOCALE';

// Obtener el locale preferido del usuario basado en las cookies, headers o default
function getPreferredLocale(request: NextRequest): string {
  // 1. Primero intenta obtener el locale de las cookies (si el usuario ya eligió un idioma)
  const cookieLocale = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }
  
  // 2. Si no hay cookie, revisa los headers de accept-language
  const acceptLanguage = request.headers.get('accept-language') || '';
  const acceptedLanguages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().substring(0, 2));
  
  // Revisa si alguno de los idiomas aceptados está en nuestra lista de locales
  const matchedLocale = acceptedLanguages.find(lang => locales.includes(lang));
  if (matchedLocale) {
    return matchedLocale;
  }
  
  // 3. Si no hay coincidencia, usa el idioma predeterminado
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Comprobar si el pathname ya tiene un locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Si ya tiene un locale, actualizar la cookie y continuar
  if (pathnameHasLocale) {
    // Extraer el locale del pathname
    const locale = pathname.split('/')[1];
    
    // Crear una respuesta usando NextResponse.next() para continuar el proceso
    const response = NextResponse.next();
    
    // Establecer cookie con el locale elegido (1 año de duración)
    response.cookies.set(LANGUAGE_COOKIE_NAME, locale, { 
      maxAge: 60 * 60 * 24 * 365, // 1 año en segundos
      path: '/',
      sameSite: 'lax'
    });
    
    return response;
  }
  
  // Ignorar archivos y rutas de la API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/static/') ||
    pathname.includes('/images/') ||
    pathname.endsWith('.xml') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.txt') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.gif') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css')
  ) {
    return;
  }
  
  // Obtener el locale preferido
  const locale = getPreferredLocale(request);
  
  // Crear nueva URL con el locale
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  // Redireccionar a la nueva URL
  const response = NextResponse.redirect(request.nextUrl);
  
  // Establecer cookie con el locale elegido (1 año de duración)
  response.cookies.set(LANGUAGE_COOKIE_NAME, locale, { 
    maxAge: 60 * 60 * 24 * 365, // 1 año en segundos
    path: '/',
    sameSite: 'lax'
  });
  
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|static|.*\\..*).*)'],
}; 