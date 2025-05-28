/**
 * Base API Client
 * 
 * Provides a configured axios instance with interceptors for:
 * - Authentication token injection
 * - Request/response logging
 * - Error handling with ApiError types
 * - Rate limiting support
 * - Retry logic for failed requests
 */

import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import type { ApiResponse, ApiError } from '@/types/api'

// Environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000')
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second base delay

// Rate limiting configuration
interface RateLimitConfig {
  requests: number
  period: number // in milliseconds
  queue: Array<() => void>
  count: number
  resetTime: number
}

const rateLimiter: RateLimitConfig = {
  requests: 100, // requests per period
  period: 60000, // 1 minute
  queue: [],
  count: 0,
  resetTime: Date.now() + 60000,
}

// Custom error class for API errors
export class ApiClientError extends Error {
  public readonly status?: number
  public readonly code?: string
  public readonly details?: any

  constructor(message: string, status?: number, code?: string, details?: any) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
    this.details = details
  }
}

// Request retry utility
const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

const shouldRetry = (error: AxiosError): boolean => {
  if (!error.response) return true // Network error
  
  const status = error.response.status
  // Retry on server errors and rate limiting
  return status >= 500 || status === 429
}

const calculateRetryDelay = (attempt: number): number => {
  // Exponential backoff with jitter
  const delay = RETRY_DELAY * Math.pow(2, attempt)
  const jitter = Math.random() * 0.1 * delay
  return delay + jitter
}

// Rate limiting utility
const checkRateLimit = (): Promise<void> => {
  return new Promise((resolve) => {
    const now = Date.now()
    
    // Reset counter if period has passed
    if (now >= rateLimiter.resetTime) {
      rateLimiter.count = 0
      rateLimiter.resetTime = now + rateLimiter.period
    }
    
    // If under limit, proceed immediately
    if (rateLimiter.count < rateLimiter.requests) {
      rateLimiter.count++
      resolve()
      return
    }
    
    // Queue the request
    rateLimiter.queue.push(() => {
      rateLimiter.count++
      resolve()
    })
    
    // Process queue when rate limit resets
    setTimeout(() => {
      rateLimiter.count = 0
      rateLimiter.resetTime = Date.now() + rateLimiter.period
      
      // Process queued requests
      const toProcess = Math.min(rateLimiter.queue.length, rateLimiter.requests)
      for (let i = 0; i < toProcess; i++) {
        const request = rateLimiter.queue.shift()
        if (request) request()
      }
    }, rateLimiter.resetTime - now)
  })
}

// Create base axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })

  // Request interceptor
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Rate limiting
      await checkRateLimit()
      
      // Auth token injection
      if (typeof window !== 'undefined') {
        try {
          const authStore = JSON.parse(localStorage.getItem('auth-storage') || '{}')
          const accessToken = authStore.state?.accessToken
          
          if (accessToken && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${accessToken}`
          }
        } catch (error) {
          // Silently fail auth token injection
        }
      }
      
      // Add request timestamp
      config.metadata = { startTime: Date.now() }
      
      return config
    },
    (error: AxiosError) => {
      console.error('❌ Request interceptor error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    async (error: AxiosError) => {
      const config = error.config as InternalAxiosRequestConfig & { 
        _retryCount?: number
        _isRetry?: boolean 
      }
      
      // Handle auth errors
      if (error.response?.status === 401 && !config?._isRetry) {
        // Try to refresh token
        if (typeof window !== 'undefined') {
          try {
            const authStore = JSON.parse(localStorage.getItem('auth-storage') || '{}')
            const refreshToken = authStore.state?.refreshToken
            
            if (refreshToken) {
              const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken
              })
              
              if (refreshResponse.data.success) {
                const { accessToken } = refreshResponse.data.data
                
                // Update stored token
                authStore.state.accessToken = accessToken
                localStorage.setItem('auth-storage', JSON.stringify(authStore))
                
                // Retry original request with new token
                if (config) {
                  config.headers.Authorization = `Bearer ${accessToken}`
                  config._isRetry = true
                  return client(config)
                }
              }
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError)
            // Redirect to login or trigger logout
            window.dispatchEvent(new CustomEvent('auth:logout'))
          }
        }
      }
      
      // Retry logic for retryable errors
      if (shouldRetry(error) && config && !config._isRetry) {
        const retryCount = config._retryCount || 0
        
        if (retryCount < MAX_RETRIES) {
          config._retryCount = retryCount + 1
          
          const delay = calculateRetryDelay(retryCount)
          
          await sleep(delay)
          return client(config)
        }
      }
      
      // Transform error to ApiClientError
      const apiError = transformError(error)
      return Promise.reject(apiError)
    }
  )

  return client
}

// Error transformation utility
const transformError = (error: AxiosError): ApiClientError => {
  if (error.response) {
    // Server responded with error status
    const data = error.response.data as ApiResponse<any>
    const message = data?.error?.message || error.message || 'Request failed'
    const code = data?.error?.code ? String(data.error.code) : 'API_ERROR'
    
    return new ApiClientError(
      message,
      error.response.status,
      code,
      data?.error?.details
    )
  } else if (error.request) {
    // Network error
    return new ApiClientError(
      'Network error - please check your connection',
      undefined,
      'NETWORK_ERROR'
    )
  } else {
    // Request configuration error
    return new ApiClientError(
      error.message || 'Request configuration error',
      undefined,
      'CONFIG_ERROR'
    )
  }
}

// Create and export the configured client
export const apiClient = createApiClient()

// Utility functions for common operations
export const createApiCall = <T>(
  fn: () => Promise<AxiosResponse<ApiResponse<T>>>
) => {
  return async (): Promise<T> => {
    try {
      const response = await fn()
      
      if (response.data.success && response.data.data) {
        return response.data.data
      } else {
        throw new ApiClientError(
          response.data.error?.message || 'API call failed',
          response.status,
          response.data.error?.code ? String(response.data.error.code) : 'API_ERROR'
        )
      }
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error
      } else if (axios.isAxiosError(error)) {
        throw transformError(error)
      } else {
        throw new ApiClientError(
          error instanceof Error ? error.message : 'Unknown error',
          undefined,
          'UNKNOWN_ERROR'
        )
      }
    }
  }
}

// Request cancellation utility
export const createCancellableRequest = <T>(
  requestFn: (signal: AbortSignal) => Promise<T>
) => {
  const controller = new AbortController()
  
  const request = requestFn(controller.signal)
  
  return {
    request,
    cancel: () => controller.abort(),
    signal: controller.signal,
  }
}

// Health check utility
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health')
    return response.data.success === true
  } catch (error) {
    console.error('Health check failed:', error)
    return false
  }
}

// Export types
export type { ApiResponse, ApiError }

// Extend axios config interface for metadata
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: number
    }
  }
} 