'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import type { Dictionary } from '@/types/dictionary';

interface NavbarProps {
  dictionary: Dictionary;
  lang: string;
}

export default function Navbar({ dictionary, lang }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: dictionary.nav.services },
    { href: '#process', label: dictionary.nav.process },
    { href: '#why-me', label: dictionary.nav.whyMe || 'Why Me' },
    { href: '#contact', label: dictionary.nav.contact },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center">
            <Logo className="h-12 w-auto" variant={isScrolled ? 'dark' : 'light'} />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {isHome && navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-accent' : 'text-white hover:text-accent/90'
                }`}
              >
                {label}
              </Link>
            ))}
            <LanguageSelector dictionary={dictionary} lang={lang} />
          </div>

          <button
            className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => {/* TODO: Implementar menú móvil */}}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
} 