/**
 * Utilidad para detección básica de idioma
 */

// Palabras comunes en español para detección
const spanishCommonWords = [
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'y', 'o', 'pero', 'porque', 'como', 'que', 'cuando',
  'para', 'por', 'con', 'sin', 'sobre', 'bajo',
  'mi', 'tu', 'su', 'nuestro', 'vuestro',
  'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas',
  'tengo', 'tiene', 'tienen', 'quiero', 'quiere', 'quieren',
  'necesito', 'necesita', 'necesitan', 'problema', 'problemas',
  'negocio', 'empresa', 'sitio', 'web', 'página', 'cliente', 'clientes',
  'ayuda', 'mejorar', 'aumentar', 'reducir', 'optimizar'
];

// Palabras comunes en inglés para detección
const englishCommonWords = [
  'the', 'a', 'an', 'and', 'or', 'but', 'because', 'as', 'that', 'when',
  'for', 'with', 'without', 'about', 'under',
  'my', 'your', 'his', 'her', 'our', 'their',
  'this', 'these', 'that', 'those',
  'have', 'has', 'want', 'wants', 'need', 'needs',
  'problem', 'problems', 'business', 'company', 'site', 'website', 'page',
  'client', 'clients', 'customer', 'customers',
  'help', 'improve', 'increase', 'decrease', 'optimize'
];

// Caracteres especiales del español
const spanishSpecialChars = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ', '¿', '¡'];

/**
 * Detecta el idioma probable de un texto
 * @param text - Texto a analizar
 * @returns 'es' para español, 'en' para inglés, o undefined si no es claro
 */
export function detectLanguage(text: string): string | undefined {
  if (!text || text.trim().length < 5) {
    return undefined;
  }
  
  // Convertir a minúsculas y dividir en palabras
  const cleanText = text.toLowerCase();
  const words = cleanText.split(/\s+/);
  
  // Contar coincidencias con palabras en español e inglés
  let spanishCount = 0;
  let englishCount = 0;
  
  // Comprobar palabras
  for (const word of words) {
    // Limpiar la palabra de signos de puntuación
    const cleanWord = word.replace(/[.,;:!?¿¡"'()\[\]{}]/g, '');
    if (!cleanWord) continue;
    
    if (spanishCommonWords.includes(cleanWord)) {
      spanishCount++;
    }
    
    if (englishCommonWords.includes(cleanWord)) {
      englishCount++;
    }
  }
  
  // Comprobar caracteres especiales del español
  for (const char of spanishSpecialChars) {
    if (cleanText.includes(char)) {
      spanishCount += 2; // Dar más peso a los caracteres especiales
    }
  }
  
  console.log("Detección de idioma:", { spanishCount, englishCount, text: text.substring(0, 50) + "..." });
  
  // Determinar el idioma basado en las coincidencias
  if (spanishCount > englishCount) {
    return 'es';
  } else if (englishCount > spanishCount) {
    return 'en';
  }
  
  // Si no hay una clara distinción, devolver undefined
  return undefined;
} 