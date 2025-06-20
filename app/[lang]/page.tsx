'use client';

import HeroSection from '../../components/HeroSection';
import ServicesSection from '../../components/ServicesSection';
import ProcessSection from '../../components/ProcessSection';
import WhyMeSection from '../../components/WhyMeSection';
import CtaSection from '../../components/CtaSection';
import ScrollIndicator from '../../components/ScrollIndicator';
import { useDictionary } from '@/context/DictionaryProvider';
import { useEffect, useState } from 'react';

export default function Home() {
  const { dictionary, lang } = useDictionary();
  const [mounted, setMounted] = useState(false);
  
  // Aseguramos que el componente se monte solo en el cliente para evitar errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Secciones para el indicador de scroll, ajustando IDs según idioma
  const sections = [
    {
      id: lang === 'es' ? 'servicios' : 'services',
      label: dictionary.navbar.services
    },
    {
      id: lang === 'es' ? 'proceso' : 'process',
      label: dictionary.navbar.process
    },
    {
      id: lang === 'es' ? 'por-qué-yo' : 'why-me',
      label: dictionary.navbar.whyMe
    },
    {
      id: lang === 'es' ? 'contacto' : 'contact',
      label: dictionary.navbar.contact
    }
  ];
  
  if (!mounted) return null;
  
  return (
    <>
      <HeroSection dictionary={dictionary} lang={lang} />
      <ServicesSection dictionary={dictionary} sectionId={lang === 'es' ? 'servicios' : 'services'} />
      <ProcessSection dictionary={dictionary} sectionId={lang === 'es' ? 'proceso' : 'process'} />
      <WhyMeSection dictionary={dictionary} sectionId={lang === 'es' ? 'por-qué-yo' : 'why-me'} />
      <CtaSection dictionary={dictionary} sectionId={lang === 'es' ? 'contacto' : 'contact'} />
      <ScrollIndicator sections={sections} lang={lang} />
    </>
  );
} 