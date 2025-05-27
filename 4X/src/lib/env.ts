import { z } from 'zod'

// Check if we're running on the client side
const isClient = typeof window !== 'undefined'

// Define the client-side environment schema (only NEXT_PUBLIC_* variables)
const clientEnvSchema = z.object({
  NEXT_PUBLIC_BINANCE_API_URL: z.string().url().default('https://api.binance.com/api/v3'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_DEMO_MODE: z.string().optional().transform(val => val === 'true'),
})

// Define the full server-side environment schema
const serverEnvSchema = clientEnvSchema.extend({
  // Server-side only environment variables
  NEWS_API_KEY: z.string().min(1, 'NEWS_API_KEY is required'),
  FINNHUB_API_KEY: z.string().min(1, 'FINNHUB_API_KEY is required'),
  TRANSLATION_API_KEY: z.string().min(1, 'TRANSLATION_API_KEY is required'),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  
  // Optional environment variables
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// Validate environment variables
function validateEnv() {
  try {
    if (isClient) {
      // On client side, only validate public environment variables
      const env = clientEnvSchema.parse({
        NEXT_PUBLIC_BINANCE_API_URL: process.env.NEXT_PUBLIC_BINANCE_API_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
      })

      // Log demo mode status
      console.log('🔧 Demo Mode:', env.NEXT_PUBLIC_DEMO_MODE ? 'Enabled' : 'Disabled')

      // Return client env with defaults for server-side variables
      return {
        ...env,
        NEWS_API_KEY: 'client-side-not-available',
        FINNHUB_API_KEY: 'client-side-not-available',
        TRANSLATION_API_KEY: 'client-side-not-available',
        NEXTAUTH_SECRET: 'client-side-not-available',
        NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
      }
    } else {
      // On server side, validate all environment variables
      const env = serverEnvSchema.parse({
        // Public variables
        NEXT_PUBLIC_BINANCE_API_URL: process.env.NEXT_PUBLIC_BINANCE_API_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
        
        // Server-side variables
        NEWS_API_KEY: process.env.NEWS_API_KEY,
        FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
        TRANSLATION_API_KEY: process.env.TRANSLATION_API_KEY,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        
        // System variables
        NODE_ENV: process.env.NODE_ENV,
      })

      // Log demo mode status
      console.log('🔧 Demo Mode:', env.NEXT_PUBLIC_DEMO_MODE ? 'Enabled' : 'Disabled')

      return env
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:')
      error.errors.forEach((err) => {
        console.error(`  ${err.path.join('.')}: ${err.message}`)
      })
      
      // Only call process.exit on server side
      if (!isClient && typeof process !== 'undefined' && process.exit) {
        process.exit(1)
      } else {
        // On client side, throw the error instead
        throw new Error('Environment validation failed')
      }
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Type for environment variables
export type Env = z.infer<typeof serverEnvSchema>

// Utility functions for environment checking
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'

// Client-safe environment variables (only includes NEXT_PUBLIC_* variables)
export const clientEnv = {
  NEXT_PUBLIC_BINANCE_API_URL: env.NEXT_PUBLIC_BINANCE_API_URL,
  NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_DEMO_MODE: env.NEXT_PUBLIC_DEMO_MODE,
} as const

export const DEMO_MODE = env.NEXT_PUBLIC_DEMO_MODE 