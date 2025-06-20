'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface AnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export default function AnimationWrapper({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.2,
  rootMargin = '-50px',
}: AnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: rootMargin,
    amount: threshold,
  });
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  
  // Detectar si estamos en un dispositivo móvil
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    // Detectar si es un dispositivo móvil basado en el ancho de pantalla
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Si no estamos en el cliente o el usuario prefiere movimiento reducido, renderizar sin animación
  if (!isMounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  // Configurar las variantes de animación según el tipo
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === 'slide-up' ? 20 : 0,
      x: animation === 'slide-left' ? 20 : animation === 'slide-right' ? -20 : 0,
      scale: animation === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
        // Optimizaciones para evitar parpadeos en móviles
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0 : delay,
        // Usar valores de hardware acelerado para evitar parpadeos
        type: "tween",
      }
    }
  };
  
  // Aplicar optimizaciones CSS para evitar parpadeos
  const style = {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
    WebkitFontSmoothing: 'subpixel-antialiased' as const,
    perspective: 1000,
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      viewport={{ once, margin: rootMargin, amount: threshold }}
    >
      {children}
    </motion.div>
  );
} 