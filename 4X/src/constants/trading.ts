export const CURRENCY_PAIRS = [
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'USD/CHF',
  'AUD/USD',
  'USD/CAD',
  'NZD/USD',
] as const

export const TRADE_TYPES = {
  BUY: 'buy',
  SELL: 'sell',
} as const

export const TRADE_STATUS = {
  PENDING: 'pending',
  EXECUTED: 'executed',
  CANCELLED: 'cancelled',
} as const

export const API_ENDPOINTS = {
  MARKET_DATA: '/api/market-data',
  TRADES: '/api/trades',
  PORTFOLIO: '/api/portfolio',
  USER: '/api/user',
} as const

export const COLORS = {
  PRIMARY: '#98b5a4',
  SECONDARY: '#162A2C',
  ACCENT: '#02d1fe',
} as const 