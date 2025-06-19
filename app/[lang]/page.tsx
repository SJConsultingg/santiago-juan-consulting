'use client';

import { useScroll, useSpring } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import WhyMeSection from '@/components/WhyMeSection';
import CtaSection from '@/components/CtaSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import { useDictionary } from '@/context/DictionaryProvider';

export default function Home() {
  const { dictionary, lang } = useDictionary();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = [
    { id: 'services', label: dictionary.nav.services },
    { id: 'process', label: dictionary.nav.process },
    { id: 'why-me', label: dictionary.nav.whyMe || 'Why Me' },
    { id: 'contact', label: dictionary.nav.contact },
  ];

  return (
    <>
      <HeroSection dictionary={dictionary} />
      <ServicesSection dictionary={dictionary} sectionId={lang === 'es' ? 'servicios' : 'services'} />
      <ProcessSection dictionary={dictionary} sectionId={lang === 'es' ? 'proceso' : 'process'} />
      <WhyMeSection dictionary={dictionary} sectionId={lang === 'es' ? 'por-que-yo' : 'why-me'} />
      <CtaSection dictionary={dictionary} sectionId={lang === 'es' ? 'contacto' : 'contact'} />
      <ScrollIndicator sections={sections} lang={lang} scaleX={scaleX} />
    </>
  );
} 