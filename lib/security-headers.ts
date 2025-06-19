import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://www.santiagosg.com',
  'https://santiagosg.com',
  // Agrega aquí otros dominios permitidos si los hay
];

export function getSecurityHeaders(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isProd = process.env.NODE_ENV === 'production';
  
  // Definir orígenes permitidos
  const origin = req.headers.get('origin');
  const isAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin);
  const allowedOrigin = isAllowedOrigin ? origin : ALLOWED_ORIGINS[0];

  // Headers base que siempre se incluyen
  const headers = {
    // Política de seguridad de contenido
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com;
      frame-src 'self' https://www.google.com https://www.youtube.com;
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim(),
    
    // Prevención de clickjacking
    'X-Frame-Options': 'DENY',
    
    // Prevención de MIME sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Control de referrer
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Habilitar características del navegador de forma segura
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    
    // Forzar HTTPS
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    
    // Control de acceso
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  return headers;
} 