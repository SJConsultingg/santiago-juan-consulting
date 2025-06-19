'use client';

import { createContext, useContext, ReactNode } from 'react';

// Define el tipo para el contexto
interface DictionaryContextType {
  dictionary: any;
  lang: string;
}

// Crea el contexto
const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

// Hook personalizado para acceder al contexto
export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error('useDictionary debe ser usado dentro de un DictionaryProvider');
  }
  return context;
}

// Provider component
interface DictionaryProviderProps {
  dictionary: any;
  lang: string;
  children: ReactNode;
}

export function DictionaryProvider({ dictionary, lang, children }: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={{ dictionary, lang }}>
      {children}
    </DictionaryContext.Provider>
  );
} 