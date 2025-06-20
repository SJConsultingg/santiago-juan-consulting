'use client';

import React from 'react';

interface FallbackWrapperProps {
  children: React.ReactNode;
  className?: string;
}

// Este es un componente de respaldo simple que muestra el contenido sin animaciones
// para casos donde las animaciones puedan estar causando problemas
export default function FallbackWrapper({
  children,
  className = '',
}: FallbackWrapperProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
} 