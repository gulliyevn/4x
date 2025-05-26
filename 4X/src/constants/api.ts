import { env } from '@/lib/env'

// API Base URLs
export const API_BASE_URLS = {
  BINANCE: env.NEXT_PUBLIC_BINANCE_API_URL,
  FINNHUB: 'https://finnhub.io/api/v1',
  NEWS_API: 'https://newsapi.org/v2',
  INTERNAL: `${env.NEXT_PUBLIC_APP_URL}/api`,
} as const

// REST API Endpoints
export const API_ENDPOINTS = {
  // Binance API endpoints
  BINANCE: {
    TICKER_24HR: '/ticker/24hr',
    TICKER_PRICE: '/ticker/price',
    KLINES: '/klines',
    EXCHANGE_INFO: '/exchangeInfo',
    ORDER_BOOK: '/depth',
    RECENT_TRADES: '/trades',
    HISTORICAL_TRADES: '/historicalTrades',
    AGG_TRADES: '/aggTrades',
  },
  
  // Finnhub API endpoints
  FINNHUB: {
    QUOTE: '/quote',
    CANDLES: '/stock/candle',
    COMPANY_PROFILE: '/stock/profile2',
    NEWS: '/company-news',
    ECONOMIC_CALENDAR: '/calendar/economic',
    FOREX_RATES: '/forex/rates',
  },
  
  // News API endpoints
  NEWS: {
    TOP_HEADLINES: '/top-headlines',
    EVERYTHING: '/everything',
    SOURCES: '/top-headlines/sources',
  },
  
  // Internal API endpoints
  INTERNAL: {
    MARKET_DATA: '/market-data',
    TRADES: '/trades',
    PORTFOLIO: '/portfolio',
    USER: '/user',
    AUTH: '/auth',
    WATCHLIST: '/watchlist',
    ALERTS: '/alerts',
    ORDERS: '/orders',
  },
} as const

// WebSocket URLs
export const WEBSOCKET_URLS = {
  BINANCE: {
    BASE: 'wss://stream.binance.com:9443/ws',
    STREAMS: 'wss://stream.binance.com:9443/stream',
  },
  FINNHUB: 'wss://ws.finnhub.io',
  INTERNAL: `${env.NEXT_PUBLIC_APP_URL.replace('http', 'ws')}/ws`,
} as const

// Request timeout configurations (in milliseconds)
export const TIMEOUT_CONFIG = {
  DEFAULT: 5000,
  FAST: 2000,
  SLOW: 15000,
  UPLOAD: 30000,
  WEBSOCKET_CONNECT: 10000,
  WEBSOCKET_RECONNECT: 5000,
} as const

// Rate limiting constants
export const RATE_LIMITS = {
  BINANCE: {
    REQUESTS_PER_MINUTE: 1200,
    REQUESTS_PER_SECOND: 10,
    ORDERS_PER_SECOND: 50,
    ORDERS_PER_DAY: 200000,
  },
  FINNHUB: {
    CALLS_PER_MINUTE: 60,
    CALLS_PER_MONTH: 1000000,
  },
  NEWS_API: {
    REQUESTS_PER_DAY: 1000,
    REQUESTS_PER_HOUR: 100,
  },
  INTERNAL: {
    REQUESTS_PER_MINUTE: 100,
    REQUESTS_PER_HOUR: 1000,
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
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

// Request headers
export const REQUEST_HEADERS = {
  CONTENT_TYPE: {
    JSON: 'application/json',
    FORM_DATA: 'multipart/form-data',
    URL_ENCODED: 'application/x-www-form-urlencoded',
  },
  ACCEPT: {
    JSON: 'application/json',
    TEXT: 'text/plain',
    HTML: 'text/html',
  },
} as const

// Cache configurations
export const CACHE_CONFIG = {
  MARKET_DATA: {
    TTL: 5000, // 5 seconds
    STALE_WHILE_REVALIDATE: 10000, // 10 seconds
  },
  NEWS: {
    TTL: 300000, // 5 minutes
    STALE_WHILE_REVALIDATE: 600000, // 10 minutes
  },
  USER_DATA: {
    TTL: 600000, // 10 minutes
    STALE_WHILE_REVALIDATE: 1200000, // 20 minutes
  },
  STATIC_DATA: {
    TTL: 3600000, // 1 hour
    STALE_WHILE_REVALIDATE: 7200000, // 2 hours
  },
} as const

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please try again later.',
  UNAUTHORIZED: 'Authentication required. Please log in.',
  FORBIDDEN: 'Access denied. You do not have permission.',
  NOT_FOUND: 'Resource not found.',
  INTERNAL_ERROR: 'Internal server error. Please try again later.',
  INVALID_DATA: 'Invalid data provided.',
  CONNECTION_TIMEOUT: 'Connection timeout. Please try again.',
} as const

// Trading specific constants
export const TRADING_CONFIG = {
  MIN_ORDER_SIZE: 0.00001,
  MAX_ORDER_SIZE: 1000000,
  DEFAULT_LEVERAGE: 1,
  MAX_LEVERAGE: 100,
  PRICE_PRECISION: 8,
  QUANTITY_PRECISION: 8,
  STOP_LOSS_PERCENTAGE: 2,
  TAKE_PROFIT_PERCENTAGE: 5,
} as const

// WebSocket event types
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  RECONNECT: 'reconnect',
  PRICE_UPDATE: 'price_update',
  ORDER_UPDATE: 'order_update',
  TRADE_EXECUTION: 'trade_execution',
  BALANCE_UPDATE: 'balance_update',
  NEWS_UPDATE: 'news_update',
} as const

// Data refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  REAL_TIME: 1000, // 1 second
  FAST: 5000, // 5 seconds
  NORMAL: 15000, // 15 seconds
  SLOW: 60000, // 1 minute
  HOURLY: 3600000, // 1 hour
  DAILY: 86400000, // 24 hours
} as const 