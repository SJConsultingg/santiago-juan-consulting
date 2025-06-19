import 'server-only';
import { Dictionary } from '@/types/dictionary';

const dictionaries: Record<string, () => Promise<Dictionary>> = {
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