/**
 * API Client Central Exports
 * 
 * This file provides a centralized export point for all API clients
 * used in the 4X trading platform application.
 */

// Base client exports
export { 
  apiClient, 
  createApiCall, 
  createCancellableRequest, 
  ApiClientError,
  healthCheck
} from './client'

// Authentication API
export * as authApi from './authApi'

// Market data API
export * as marketApi from './marketApi'

// News API
export * as newsApi from './newsApi'

// Trading API
export * as tradingApi from './tradingApi'

// Import for internal use in utility functions
import { ApiClientError, healthCheck } from './client'
import * as marketApi from './marketApi'
import * as newsApi from './newsApi'
import * as tradingApi from './tradingApi'

// Re-export specific commonly used functions for convenience
export {
  // Authentication
  login,
  register,
  logout,
  refreshToken,
  changePassword,
  getCurrentUser,
  validateEmail,
  validatePassword,
} from './authApi'

export {
  // Market data
  getMarketData,
  getChartData,
  getTicker,
  getOrderBook,
  getRecentTrades,
  subscribeToTicker,
  subscribeToOrderBook,
  subscribeToTrades,
  connectMarketWebSocket,
  disconnectMarketWebSocket,
  marketWebSocket,
} from './marketApi'

export {
  // News
  getNews,
  getNewsByCategory,
  searchNews,
  clearNewsCache,
  checkNewsSourceHealth,
} from './newsApi'

export {
  // Trading
  getPortfolio,
  getWatchlists,
  createWatchlist,
  getPriceAlerts,
  createPriceAlert,
  getActiveOrders,
  placeOrder,
  cancelOrder,
  getOpenPositions,
  closePosition,
  getTradeHistory,
  getPerformanceAnalytics,
  getRiskMetrics,
} from './tradingApi'

// Type exports for external use
export type { ApiResponse, PaginatedResponse, ApiError } from '@/types/api'

// Common API constants and utilities
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    SESSIONS: '/auth/sessions',
    TWO_FACTOR: {
      ENABLE: '/auth/2fa/enable',
      VERIFY: '/auth/2fa/verify',
      DISABLE: '/auth/2fa/disable',
    },
  },
  MARKET: {
    DATA: '/market/data',
    SYMBOLS: '/market/symbols',
    CHART: '/market/chart',
    TICKER: '/market/ticker',
    ORDER_BOOK: '/market/orderbook',
    TRADES: '/market/trades',
  },
  NEWS: {
    LIST: '/news',
    SOURCES: '/news/sources',
    SEARCH: '/news/search',
    CATEGORY: '/news/category',
    HEALTH: '/news/health',
  },
  TRADING: {
    PORTFOLIO: '/trading/portfolio',
    WATCHLISTS: '/trading/watchlists',
    PAIRS: '/trading/pairs',
    ALERTS: '/trading/alerts',
    ORDERS: '/trading/orders',
    POSITIONS: '/trading/positions',
    HISTORY: '/trading/history',
    ANALYTICS: '/trading/analytics',
    RISK: '/trading/risk',
  },
} as const

// API configuration constants
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const

// External API configurations
export const EXTERNAL_APIS = {
  BINANCE: {
    API_URL: 'https://api.binance.com/api/v3',
    WS_URL: 'wss://stream.binance.com:9443/ws',
    RATE_LIMIT: 1200, // requests per minute
  },
  FINNHUB: {
    API_URL: 'https://finnhub.io/api/v1',
    RATE_LIMIT: 60, // requests per minute
  },
  NEWSAPI: {
    API_URL: 'https://newsapi.org/v2',
    RATE_LIMIT: 500, // requests per day (free tier)
  },
} as const

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

// Error codes
export const ERROR_CODES = {
  // Generic
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  CONFIG_ERROR: 'CONFIG_ERROR',
  
  // Authentication
  LOGIN_ERROR: 'LOGIN_ERROR',
  REGISTER_ERROR: 'REGISTER_ERROR',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  REFRESH_ERROR: 'REFRESH_ERROR',
  PASSWORD_CHANGE_ERROR: 'PASSWORD_CHANGE_ERROR',
  
  // Market
  MARKET_DATA_ERROR: 'MARKET_DATA_ERROR',
  BINANCE_ERROR: 'BINANCE_ERROR',
  
  // News
  NEWS_ERROR: 'NEWS_ERROR',
  FINNHUB_ERROR: 'FINNHUB_ERROR',
  NEWSAPI_ERROR: 'NEWSAPI_ERROR',
  
  // Trading
  PORTFOLIO_ERROR: 'PORTFOLIO_ERROR',
  WATCHLIST_ERROR: 'WATCHLIST_ERROR',
  ORDER_ERROR: 'ORDER_ERROR',
  POSITION_ERROR: 'POSITION_ERROR',
  TRADING_PAIR_ERROR: 'TRADING_PAIR_ERROR',
  PRICE_ALERT_ERROR: 'PRICE_ALERT_ERROR',
} as const

// Utility functions
export const isApiError = (error: any): error is ApiClientError => {
  return error instanceof ApiClientError
}

export const getErrorMessage = (error: any): string => {
  if (isApiError(error)) {
    return error.message
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unknown error occurred'
}

export const getErrorCode = (error: any): string => {
  if (isApiError(error)) {
    return error.code || ERROR_CODES.UNKNOWN_ERROR
  }
  
  return ERROR_CODES.UNKNOWN_ERROR
}

// API health check utility
export const checkAllServicesHealth = async (): Promise<{
  api: boolean
  market: boolean
  news: boolean
  trading: boolean
  overall: boolean
}> => {
  const health = {
    api: false,
    market: false,
    news: false,
    trading: false,
    overall: false,
  }
  
  try {
    // Check main API
    health.api = await healthCheck()
    
    // Check market service
    try {
      await marketApi.getTicker('BTCUSDT')
      health.market = true
    } catch (error) {
      console.warn('Market service health check failed:', error)
    }
    
    // Check news service
    health.news = (await newsApi.checkNewsSourceHealth()).internal
    
    // Check trading service
    try {
      await tradingApi.getTradingPairs()
      health.trading = true
    } catch (error) {
      console.warn('Trading service health check failed:', error)
    }
    
    // Overall health
    health.overall = health.api && health.market && health.news && health.trading
  } catch (error) {
    console.error('Health check failed:', error)
  }
  
  return health
} 