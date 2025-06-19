'use client';

import { motion } from 'framer-motion';
import BackgroundElements from '@/components/BackgroundElements';
import Navbar from '@/components/Navbar';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <BackgroundElements variant="primary" />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-4xl mx-auto px-6 md:px-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  );
} 