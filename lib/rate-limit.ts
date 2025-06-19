/**
 * Sistema de control de límites para la API de OpenAI
 * Implementación simple basada en memoria para desarrollo
 * En producción, se recomienda usar KV o una base de datos
 */

// Valores por defecto
const MONTHLY_BUDGET = Number(process.env.OPENAI_MONTHLY_BUDGET) || 2; // $2 por defecto
const COST_PER_REQUEST = 0.002; // Costo estimado por solicitud con gpt-3.5-turbo
const MAX_REQUESTS = Number(process.env.MAX_MONTHLY_REQUESTS) || 
                    Math.floor(MONTHLY_BUDGET / COST_PER_REQUEST);

// Contador en memoria (solo para desarrollo)
let requestCount = 0;

// Interface para los verificadores de límite
interface RateLimiter {
  check: () => Promise<{ success: boolean; remaining?: number }>;
  increment: () => Promise<boolean>;
  getRemainingRequests: () => Promise<number>;
}

// Implementación simple para desarrollo que almacena en memoria
// (se reinicia con cada despliegue)
const inMemoryRateLimit: RateLimiter = {
  check: async () => {
    return { 
      success: requestCount < MAX_REQUESTS,
      remaining: MAX_REQUESTS - requestCount
    };
  },
  increment: async () => {
    requestCount++;
    return true;
  },
  getRemainingRequests: async () => {
    return MAX_REQUESTS - requestCount;
  }
};

// En el futuro, se podría implementar una versión basada en KV o una base de datos
// Ejemplo de implementación para Vercel KV:
/*
import { kv } from '@vercel/kv';

const kvRateLimit: RateLimiter = {
  check: async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
      const count = await kv.get(`diagnostico:${currentMonth}`) || 0;
      return { 
        success: count < MAX_REQUESTS,
        remaining: MAX_REQUESTS - count
      };
    } catch (error) {
      console.error('Error checking rate limit:', error);
      return { success: true }; // En caso de error, permitir la solicitud
    }
  },
  increment: async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
      await kv.incr(`diagnostico:${currentMonth}`);
      return true;
    } catch (error) {
      console.error('Error incrementing rate limit:', error);
      return false;
    }
  },
  getRemainingRequests: async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
      const count = await kv.get(`diagnostico:${currentMonth}`) || 0;
      return MAX_REQUESTS - Number(count);
    } catch (error) {
      console.error('Error getting remaining requests:', error);
      return MAX_REQUESTS; // En caso de error, devolver el máximo
    }
  }
};
*/

// Exportar la implementación adecuada
export const rateLimit = inMemoryRateLimit; 