import { z } from 'zod'

// Define the environment schema
const envSchema = z.object({
  // Public environment variables (available on client-side)
  NEXT_PUBLIC_BINANCE_API_URL: z.string().url().default('https://api.binance.com/api/v3'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  
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
    return envSchema.parse({
      // Public variables
      NEXT_PUBLIC_BINANCE_API_URL: process.env.NEXT_PUBLIC_BINANCE_API_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      
      // Server-side variables
      NEWS_API_KEY: process.env.NEWS_API_KEY,
      FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
      TRANSLATION_API_KEY: process.env.TRANSLATION_API_KEY,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      
      // System variables
      NODE_ENV: process.env.NODE_ENV,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:')
      error.errors.forEach((err) => {
        console.error(`  ${err.path.join('.')}: ${err.message}`)
      })
      process.exit(1)
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Type for environment variables
export type Env = z.infer<typeof envSchema>

// Utility functions for environment checking
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'

// Client-safe environment variables (only includes NEXT_PUBLIC_* variables)
export const clientEnv = {
  NEXT_PUBLIC_BINANCE_API_URL: env.NEXT_PUBLIC_BINANCE_API_URL,
  NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
} as const 