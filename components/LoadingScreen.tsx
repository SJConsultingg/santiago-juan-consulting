'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SimpleLogo from './SimpleLogo';

export default function LoadingScreen() {
  const shouldReduceMotion = useReducedMotion();

  const initialAnimation = shouldReduceMotion 
    ? { opacity: 1, scale: 1 }
    : { scale: 0.5, opacity: 0 };

  const loadingBarAnimation = shouldReduceMotion
    ? { width: "200px" }
    : { width: ["0%", "100%", "0%"] };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="text-center">
        <motion.div
          initial={initialAnimation}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <SimpleLogo width={64} height={64} showText={false} variant="original" />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={loadingBarAnimation}
          transition={{ 
            duration: shouldReduceMotion ? 0.3 : 0.8,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear"
          }}
          className="h-1 bg-accent/20 rounded-full mx-auto overflow-hidden"
          style={{ width: "200px" }}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: shouldReduceMotion ? 0.3 : 0.8,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "linear"
            }}
            className="h-full w-1/2 bg-accent rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
} 