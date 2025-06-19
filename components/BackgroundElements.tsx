'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

interface BackgroundElementsProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'diagnosis';
}

// Usando React.memo para evitar re-renderizados innecesarios cuando las props no cambian
const BackgroundElements = memo(function BackgroundElements({ variant = 'primary' }: BackgroundElementsProps) {
  // Colores según la variante
  const colors = {
    primary: {
      color1: 'from-primary/5 to-primary/10',
      color2: 'from-secondary/5 to-secondary/10',
      color3: 'from-accent/5 to-accent/10',
    },
    secondary: {
      color1: 'from-secondary/5 to-secondary/10',
      color2: 'from-primary/5 to-primary/10',
      color3: 'from-accent/5 to-accent/10',
    },
    accent: {
      color1: 'from-accent/5 to-accent/10',
      color2: 'from-primary/5 to-primary/10',
      color3: 'from-secondary/5 to-secondary/10',
    },
    diagnosis: {
      color1: 'from-primary/5 to-primary/10',
      color2: 'from-accent/5 to-accent/10',
      color3: 'from-secondary/5 to-secondary/10',
    },
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Elementos decorativos variante 1 */}
      <motion.div
        className={`absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-br ${colors[variant].color1} blur-[120px] opacity-70`}
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Elementos decorativos variante 2 */}
      <motion.div
        className={`absolute top-[60%] -right-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-bl ${colors[variant].color2} blur-[110px] opacity-70`}
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      
      {/* Elementos decorativos variante 3 */}
      <motion.div
        className={`absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr ${colors[variant].color3} blur-[100px] opacity-60`}
        animate={{
          x: [0, 15, 0],
          y: [0, 5, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
});

// Agregar displayName para facilitar la depuración
BackgroundElements.displayName = 'BackgroundElements';

export default BackgroundElements; 