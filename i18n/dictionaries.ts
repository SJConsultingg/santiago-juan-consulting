import 'server-only';

interface DictionaryEntry {
  [key: string]: any;
}

const dictionaries: Record<string, () => Promise<DictionaryEntry>> = {
  es: () => import('./locales/es.json').then((module) => module.default),
  en: () => import('./locales/en.json').then((module) => module.default)
};

export const getDictionary = async (locale: string) => {
  // Verificamos que el idioma solicitado exista en nuestro diccionario
  // Si no existe, devolvemos español por defecto
  if (!dictionaries[locale]) {
    return dictionaries.es();
  }
  
  return dictionaries[locale]();
}; 