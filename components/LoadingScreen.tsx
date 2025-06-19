import React from 'react';
import { motion } from 'framer-motion';
import SimpleLogo from './SimpleLogo';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <SimpleLogo width={64} height={64} showText={false} variant="original" />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-1 bg-accent/20 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/2 bg-accent rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
} 