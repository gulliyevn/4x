/**
 * Mock Data for 4X Trading Platform Demo Mode
 * 
 * Contains realistic trading data including market symbols, prices,
 * news articles, user portfolio, and trading history.
 */

import type { User } from '@/types/auth'
import type { MarketData, Ticker, Symbol, OrderBook, PricePoint } from '@/types/market'
import type { NewsArticle, NewsCategory } from '@/types/news'
import type { Position, Order, Portfolio, PortfolioSummary, Trade } from '@/types/trading'
import { UserRole, AccountStatus, AccountType, TwoFactorMethod } from '@/types/auth'
import {
  OrderType,
  OrderSide,
  OrderStatus,
  TimeInForce
} from '@/types/trading'
import {
  SymbolStatus,
  OrderBookSide
} from '@/types/market'
import { PositionStatus } from '@/types/trading'

// Fixed timestamp for consistent SSR/client rendering
const FIXED_TIMESTAMP = new Date('2024-01-15T12:00:00Z')
const now = FIXED_TIMESTAMP
const dayMs = 24 * 60 * 60 * 1000

// Seeded random number generator for consistent results
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }
}

const rng = new SeededRandom(12345)

/**
 * Mock User Data
 */
export const mockUser: User = {
  id: 'demo-user-1',
  email: 'demo@4xtrading.com',
  name: 'Demo User',
  firstName: 'Demo',
  lastName: 'User',
  avatar: 'https://ui-avatars.com/api/?name=Demo+User',
  role: UserRole.USER,
  status: AccountStatus.ACTIVE,
  premiumStatus: false,
  emailVerified: true,
  twoFactorEnabled: false,
  timezone: 'UTC',
  locale: 'en',
  preferredCurrency: 'USD',
  termsAccepted: true,
  termsAcceptedAt: new Date('2024-01-01'),
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  lastLoginAt: new Date('2024-01-01'),
  lastSeenAt: new Date('2024-01-01'),
  failedLoginAttempts: 0,
  accountType: AccountType.DEMO,
  isEmailVerified: true,
  isPhoneVerified: false,
  preferences: {
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false,
      priceAlerts: true,
      news: true,
      system: true
    },
    trading: {
      defaultLeverage: 1,
      confirmTrades: true,
      autoClose: false
    },
    dashboard: {
      defaultChartInterval: '1h',
      widgets: ['portfolio', 'market-overview', 'news'],
      layout: 'grid'
    },
    language: 'en',
    timezone: 'UTC',
    currency: 'USD'
  }
}

export const demoCredentials = {
  email: 'demo@4xtrading.com',
  password: 'demo123'
}

// Additional test users for development
export const testUsers: User[] = [
  mockUser, // Demo user
  {
    id: 'test-user-1',
    email: 'test@4xtrading.com',
    name: 'Test User',
    firstName: 'Test',
    lastName: 'User',
    avatar: 'https://ui-avatars.com/api/?name=Test+User',
    role: UserRole.USER,
    status: AccountStatus.ACTIVE,
    premiumStatus: true,
    emailVerified: true,
    twoFactorEnabled: false,
    timezone: 'UTC',
    locale: 'en',
    preferredCurrency: 'USD',
    termsAccepted: true,
    termsAcceptedAt: new Date('2024-01-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLoginAt: new Date('2024-01-01'),
    lastSeenAt: new Date('2024-01-01'),
    failedLoginAttempts: 0,
    accountType: AccountType.PRO,
    isEmailVerified: true,
    isPhoneVerified: true,
    preferences: {
      theme: 'dark',
      notifications: {
        email: true,
        push: true,
        sms: true,
        priceAlerts: true,
        news: true,
        system: true
      },
      trading: {
        defaultLeverage: 2,
        confirmTrades: false,
        autoClose: true
      },
      dashboard: {
        defaultChartInterval: '4h',
        widgets: ['portfolio', 'market-overview', 'news', 'watchlist'],
        layout: 'list'
      },
      language: 'en',
      timezone: 'UTC',
      currency: 'USD'
    }
  },
  {
    id: 'admin-user-1',
    email: 'admin@4xtrading.com',
    name: 'Admin User',
    firstName: 'Admin',
    lastName: 'User',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User',
    role: UserRole.ADMIN,
    status: AccountStatus.ACTIVE,
    premiumStatus: true,
    emailVerified: true,
    twoFactorEnabled: true,
    timezone: 'UTC',
    locale: 'en',
    preferredCurrency: 'USD',
    termsAccepted: true,
    termsAcceptedAt: new Date('2024-01-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLoginAt: new Date('2024-01-01'),
    lastSeenAt: new Date('2024-01-01'),
    failedLoginAttempts: 0,
    accountType: AccountType.ENTERPRISE,
    isEmailVerified: true,
    isPhoneVerified: true,
    preferences: {
      theme: 'dark',
      notifications: {
        email: true,
        push: true,
        sms: true,
        priceAlerts: true,
        news: true,
        system: true
      },
      trading: {
        defaultLeverage: 5,
        confirmTrades: true,
        autoClose: false
      },
      dashboard: {
        defaultChartInterval: '1h',
        widgets: ['portfolio', 'market-overview', 'news', 'watchlist', 'admin-panel'],
        layout: 'grid'
      },
      language: 'en',
      timezone: 'UTC',
      currency: 'USD'
    }
  }
]

// Test credentials for development
export const testCredentials = [
  { email: 'demo@4xtrading.com', password: 'demo123' },
  { email: 'test@4xtrading.com', password: 'test123' },
  { email: 'admin@4xtrading.com', password: 'admin123' }
]

/**
 * Generate realistic price with trend (deterministic)
 */
function generatePrice(basePrice: number, volatility = 0.02, trend = 0): number {
  const change = (rng.next() - 0.5) * 2 * volatility + trend
  return Math.max(basePrice * (1 + change), 0.01)
}

/**
 * Generate price history (deterministic)
 */
function generatePriceHistory(basePrice: number, days = 30): PricePoint[] {
  const points: PricePoint[] = []
  let currentPrice = basePrice
  
  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * dayMs)
    const dailyVolatility = rng.next() * 0.05 + 0.01
    
    currentPrice = generatePrice(currentPrice, dailyVolatility)
    
    points.push({
      time: timestamp.getTime(),
      open: currentPrice,
      high: currentPrice * (1 + rng.next() * 0.03),
      low: currentPrice * (1 - rng.next() * 0.03),
      close: currentPrice,
      volume: Math.floor(rng.next() * 1000000 + 100000),
    })
  }
  
  return points
}

/**
 * Mock Market Symbols with realistic data
 */
export const mockSymbols: Symbol[] = [
  // Cryptocurrencies
  { 
    symbol: 'BTCUSDT',
    name: 'Bitcoin',
    baseAsset: 'BTC',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 6,
    minOrderQty: 0.00001,
    maxOrderQty: 1000,
    stepSize: 0.00001,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'ETHUSDT',
    name: 'Ethereum',
    baseAsset: 'ETH',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 6,
    minOrderQty: 0.0001,
    maxOrderQty: 5000,
    stepSize: 0.0001,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'BNBUSDT',
    name: 'Binance Coin',
    baseAsset: 'BNB',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 4,
    minOrderQty: 0.01,
    maxOrderQty: 10000,
    stepSize: 0.01,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'ADAUSDT',
    name: 'Cardano',
    baseAsset: 'ADA',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 4,
    quantityPrecision: 2,
    minOrderQty: 1,
    maxOrderQty: 1000000,
    stepSize: 1,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.0001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'DOTUSDT',
    name: 'Polkadot',
    baseAsset: 'DOT',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 3,
    quantityPrecision: 2,
    minOrderQty: 0.1,
    maxOrderQty: 100000,
    stepSize: 0.1,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'XRPUSDT',
    name: 'Ripple',
    baseAsset: 'XRP',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 4,
    quantityPrecision: 1,
    minOrderQty: 0.1,
    maxOrderQty: 1000000,
    stepSize: 0.1,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.0001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'LINKUSDT',
    name: 'Chainlink',
    baseAsset: 'LINK',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 3,
    quantityPrecision: 2,
    minOrderQty: 0.1,
    maxOrderQty: 100000,
    stepSize: 0.1,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'LTCUSDT',
    name: 'Litecoin',
    baseAsset: 'LTC',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 3,
    minOrderQty: 0.001,
    maxOrderQty: 10000,
    stepSize: 0.001,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'BCHUSDT',
    name: 'Bitcoin Cash',
    baseAsset: 'BCH',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 3,
    minOrderQty: 0.001,
    maxOrderQty: 10000,
    stepSize: 0.001,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  { 
    symbol: 'UNIUSDT',
    name: 'Uniswap',
    baseAsset: 'UNI',
    quoteAsset: 'USDT',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 2,
    pricePrecision: 3,
    quantityPrecision: 2,
    minOrderQty: 0.1,
    maxOrderQty: 100000,
    stepSize: 0.1,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Crypto',
    isActive: true
  },
  
  // US Stocks
  { 
    symbol: 'AAPL',
    name: 'Apple Inc.',
    baseAsset: 'AAPL',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    baseAsset: 'MSFT',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    baseAsset: 'GOOGL',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    baseAsset: 'TSLA',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    baseAsset: 'AMZN',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    baseAsset: 'META',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    baseAsset: 'NVDA',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    baseAsset: 'NFLX',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    baseAsset: 'AMD',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  { 
    symbol: 'INTC',
    name: 'Intel Corporation',
    baseAsset: 'INTC',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 2,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 0,
    minOrderQty: 1,
    maxOrderQty: 10000,
    stepSize: 1,
    minNotional: 1,
    maxNotional: 1000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Stocks',
    isActive: true
  },
  
  // Forex
  { 
    symbol: 'EURUSD',
    name: 'Euro/US Dollar',
    baseAsset: 'EUR',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 5,
    quoteAssetPrecision: 5,
    pricePrecision: 5,
    quantityPrecision: 2,
    minOrderQty: 0.01,
    maxOrderQty: 10000000,
    stepSize: 0.01,
    minNotional: 1000,
    maxNotional: 10000000,
    tickSize: 0.00001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  { 
    symbol: 'GBPUSD',
    name: 'British Pound/US Dollar',
    baseAsset: 'GBP',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 5,
    quoteAssetPrecision: 5,
    pricePrecision: 5,
    quantityPrecision: 2,
    minOrderQty: 0.01,
    maxOrderQty: 10000000,
    stepSize: 0.01,
    minNotional: 1000,
    maxNotional: 10000000,
    tickSize: 0.00001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  { 
    symbol: 'USDJPY',
    name: 'US Dollar/Japanese Yen',
    baseAsset: 'USD',
    quoteAsset: 'JPY',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 3,
    quoteAssetPrecision: 3,
    pricePrecision: 3,
    quantityPrecision: 2,
    minOrderQty: 0.01,
    maxOrderQty: 10000000,
    stepSize: 0.01,
    minNotional: 1000,
    maxNotional: 10000000,
    tickSize: 0.001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  { 
    symbol: 'AUDUSD',
    name: 'Australian Dollar/US Dollar',
    baseAsset: 'AUD',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 5,
    quoteAssetPrecision: 5,
    pricePrecision: 5,
    quantityPrecision: 2,
    minOrderQty: 0.01,
    maxOrderQty: 10000000,
    stepSize: 0.01,
    minNotional: 1000,
    maxNotional: 10000000,
    tickSize: 0.00001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  { 
    symbol: 'USDCAD',
    name: 'US Dollar/Canadian Dollar',
    baseAsset: 'USD',
    quoteAsset: 'CAD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 5,
    quoteAssetPrecision: 5,
    pricePrecision: 5,
    quantityPrecision: 2,
    minOrderQty: 0.01,
    maxOrderQty: 10000000,
    stepSize: 0.01,
    minNotional: 1000,
    maxNotional: 10000000,
    tickSize: 0.00001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  { 
    symbol: 'USDCHF',
    name: 'US Dollar/Swiss Franc',
    baseAsset: 'USD',
    quoteAsset: 'CHF',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 5,
    quoteAssetPrecision: 5,
    pricePrecision: 5,
    quantityPrecision: 2,
    minOrderQty: 0.01,
    maxOrderQty: 10000000,
    stepSize: 0.01,
    minNotional: 1000,
    maxNotional: 10000000,
    tickSize: 0.00001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  { 
    symbol: 'NZDUSD',
    name: 'New Zealand Dollar/US Dollar',
    baseAsset: 'NZD',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 5,
    quoteAssetPrecision: 5,
    pricePrecision: 5,
    quantityPrecision: 2,
    minOrderQty: 0.01,
    maxOrderQty: 10000000,
    stepSize: 0.01,
    minNotional: 1000,
    maxNotional: 10000000,
    tickSize: 0.00001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  
  // Commodities
  { 
    symbol: 'GOLD',
    name: 'Gold',
    baseAsset: 'XAU',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 3,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 3,
    minOrderQty: 0.001,
    maxOrderQty: 1000,
    stepSize: 0.001,
    minNotional: 100,
    maxNotional: 10000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Commodities',
    isActive: true
  },
  { 
    symbol: 'SILVER',
    name: 'Silver',
    baseAsset: 'XAG',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 3,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 3,
    minOrderQty: 0.001,
    maxOrderQty: 5000,
    stepSize: 0.001,
    minNotional: 100,
    maxNotional: 10000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Commodities',
    isActive: true
  },
  { 
    symbol: 'CRUDE',
    name: 'Crude Oil',
    baseAsset: 'CL',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 3,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 3,
    minOrderQty: 0.001,
    maxOrderQty: 10000,
    stepSize: 0.001,
    minNotional: 100,
    maxNotional: 10000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Commodities',
    isActive: true
  },
  { 
    symbol: 'NATGAS',
    name: 'Natural Gas',
    baseAsset: 'NG',
    quoteAsset: 'USD',
    status: SymbolStatus.TRADING,
    baseAssetPrecision: 3,
    quoteAssetPrecision: 2,
    pricePrecision: 2,
    quantityPrecision: 3,
    minOrderQty: 0.001,
    maxOrderQty: 10000,
    stepSize: 0.001,
    minNotional: 100,
    maxNotional: 10000000,
    tickSize: 0.01,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Commodities',
    isActive: true
  }
]

/**
 * Base prices for symbols
 */
const basePrices: Record<string, number> = {
  // Crypto
  'BTCUSDT': 43250.00,
  'ETHUSDT': 2580.75,
  'BNBUSDT': 315.20,
  'ADAUSDT': 0.52,
  'DOTUSDT': 6.85,
  'XRPUSDT': 0.61,
  'LINKUSDT': 14.25,
  'LTCUSDT': 73.40,
  'BCHUSDT': 245.80,
  'UNIUSDT': 7.65,
  
  // Stocks
  'AAPL': 195.50,
  'MSFT': 375.25,
  'GOOGL': 142.80,
  'TSLA': 248.75,
  'AMZN': 155.30,
  'META': 345.60,
  'NVDA': 485.20,
  'NFLX': 465.85,
  'AMD': 145.90,
  'INTC': 48.75,
  
  // Forex
  'EURUSD': 1.0875,
  'GBPUSD': 1.2650,
  'USDJPY': 148.75,
  'AUDUSD': 0.6725,
  'USDCAD': 1.3485,
  'USDCHF': 0.8865,
  'NZDUSD': 0.6185,
  
  // Commodities
  'GOLD': 2045.80,
  'SILVER': 24.65,
  'CRUDE': 78.45,
  'NATGAS': 2.85,
}

/**
 * Generate mock market data for all symbols
 */
export const mockMarketData: Record<string, MarketData> = {}
export const mockTickers: Record<string, Ticker> = {}
export const mockPriceHistory: Record<string, PricePoint[]> = {}

// Generate data for each symbol
mockSymbols.forEach(symbol => {
  const basePrice = basePrices[symbol.symbol] || 100
  const currentPrice = generatePrice(basePrice, 0.05)
  const prevPrice = generatePrice(basePrice, 0.03)
  const change = currentPrice - prevPrice
  const changePercent = (change / prevPrice) * 100
  
  // Market Data
  mockMarketData[symbol.symbol] = {
    symbol: symbol.symbol,
    price: currentPrice,
    prevPrice,
    change24h: change,
    changePercent24h: changePercent,
    high24h: currentPrice * (1 + rng.next() * 0.05),
    low24h: currentPrice * (1 - rng.next() * 0.05),
    volume24h: Math.floor(rng.next() * 10000000 + 1000000),
    quoteVolume24h: Math.floor(rng.next() * 1000000000 + 100000000),
    bidPrice: currentPrice * 0.999,
    askPrice: currentPrice * 1.001,
    spread: currentPrice * 0.002,
    timestamp: now,
    tradeCount24h: Math.floor(rng.next() * 10000 + 1000),
    marketCap: symbol.category === 'Crypto' ? Math.floor(rng.next() * 500000000000 + 10000000000) : undefined,
    circulatingSupply: symbol.category === 'Crypto' ? Math.floor(rng.next() * 100000000 + 1000000) : undefined,
    totalSupply: symbol.category === 'Crypto' ? Math.floor(rng.next() * 200000000 + 1000000) : undefined,
    isMarketOpen: true
  }
  
  // Ticker Data
  mockTickers[symbol.symbol] = {
    symbol: symbol.symbol,
    price: currentPrice,
    priceChange: change,
    priceChangePercent: changePercent,
    weightedAvgPrice: currentPrice * (1 + (rng.next() - 0.5) * 0.01),
    prevClosePrice: prevPrice,
    lastQty: rng.next() * 10,
    bidPrice: currentPrice * 0.999,
    bidQty: rng.next() * 100,
    askPrice: currentPrice * 1.001,
    askQty: rng.next() * 100,
    openPrice: prevPrice,
    highPrice: currentPrice * (1 + rng.next() * 0.03),
    lowPrice: currentPrice * (1 - rng.next() * 0.03),
    volume: Math.floor(rng.next() * 1000000 + 100000),
    quoteVolume: Math.floor(rng.next() * 1000000000 + 100000000),
    openTime: now.getTime() - 24 * 60 * 60 * 1000,
    closeTime: now.getTime(),
    firstId: Math.floor(rng.next() * 1000000),
    lastId: Math.floor(rng.next() * 1000000) + 1000000,
    count: Math.floor(rng.next() * 10000 + 1000),
  }
  
  // Price History
  mockPriceHistory[symbol.symbol] = generatePriceHistory(basePrice)
})

/**
 * Mock User Portfolio
 */
export const mockPortfolio: Portfolio = {
  id: 'portfolio-demo-001',
  userId: mockUser.id,
  name: 'Demo Portfolio',
  description: 'Demo trading portfolio for testing',
  totalValue: 125750.85,
  availableBalance: 15420.50,
  marginUsed: 45000.00,
  freeMargin: 80750.85,
  marginLevel: 279.44,
  unrealizedPnL: 2250.75,
  realizedPnL: 6500.10,
  totalPnLPercent: 7.48,
  totalPnL: 8750.85,
  currency: 'USD',
  lastUpdated: now,
  balances: {
    USD: {
      available: 15420.50,
      locked: 5000.00,
      total: 20420.50,
      valueInBaseCurrency: 20420.50
    },
    BTC: {
      available: 2.5,
      locked: 0,
      total: 2.5,
      valueInBaseCurrency: 107625.00
    },
    ETH: {
      available: 15.0,
      locked: 0,
      total: 15.0,
      valueInBaseCurrency: 38711.25
    }
  },
  positions: [],
  orders: [],
  createdAt: new Date('2024-01-01'),
  updatedAt: now,
  statistics: {
    totalTrades: 45,
    winningTrades: 28,
    losingTrades: 17,
    winRate: 62.22,
    averageWin: 485.50,
    averageLoss: -275.30,
    profitFactor: 1.76,
    maxDrawdown: 8.5,
    sharpeRatio: 1.45
  }
}

/**
 * Mock Portfolio Summary
 */
export const mockPortfolioSummary: PortfolioSummary = {
  totalValue: mockPortfolio.totalValue,
  totalPnL: mockPortfolio.totalPnL,
  totalPnLPercent: mockPortfolio.totalPnLPercent,
  dayPnL: 1250.75,
  dayPnLPercent: 1.01,
  positions: 12,
  availableBalance: mockPortfolio.availableBalance,
  marginUsed: 45000.00,
  marginAvailable: 80750.85,
  equity: mockPortfolio.totalValue,
}

/**
 * Mock Positions
 */
export const mockPositions: Position[] = [
  {
    id: 'pos-001',
    userId: mockUser.id,
    symbol: 'BTCUSDT',
    side: OrderSide.BUY,
    status: PositionStatus.OPEN,
    size: 2.5,
    entryPrice: 42850.00,
    currentPrice: mockMarketData['BTCUSDT'].price,
    unrealizedPnL: (mockMarketData['BTCUSDT'].price - 42850.00) * 2.5,
    realizedPnL: 0,
    pnl: (mockMarketData['BTCUSDT'].price - 42850.00) * 2.5,
    pnlPercent: ((mockMarketData['BTCUSDT'].price - 42850.00) / 42850.00) * 100,
    leverage: 10,
    margin: 10712.50,
    liquidationPrice: 38565.00,
    openedAt: new Date(now.getTime() - 5 * dayMs),
    updatedAt: now,
    orders: [],
    fees: 0,
    feeCurrency: 'USDT'
  },
  {
    id: 'pos-002',
    userId: mockUser.id,
    symbol: 'ETHUSDT',
    side: OrderSide.BUY,
    status: PositionStatus.OPEN,
    size: 15.0,
    entryPrice: 2525.50,
    currentPrice: mockMarketData['ETHUSDT'].price,
    unrealizedPnL: (mockMarketData['ETHUSDT'].price - 2525.50) * 15.0,
    realizedPnL: 0,
    pnl: (mockMarketData['ETHUSDT'].price - 2525.50) * 15.0,
    pnlPercent: ((mockMarketData['ETHUSDT'].price - 2525.50) / 2525.50) * 100,
    leverage: 5,
    margin: 7576.50,
    liquidationPrice: 2020.40,
    openedAt: new Date(now.getTime() - 3 * dayMs),
    updatedAt: now,
    orders: [],
    fees: 0,
    feeCurrency: 'USDT'
  },
  {
    id: 'pos-003',
    userId: mockUser.id,
    symbol: 'AAPL',
    side: OrderSide.BUY,
    status: PositionStatus.OPEN,
    size: 100,
    entryPrice: 192.25,
    currentPrice: mockMarketData['AAPL'].price,
    unrealizedPnL: (mockMarketData['AAPL'].price - 192.25) * 100,
    realizedPnL: 0,
    pnl: (mockMarketData['AAPL'].price - 192.25) * 100,
    pnlPercent: ((mockMarketData['AAPL'].price - 192.25) / 192.25) * 100,
    leverage: 1,
    margin: 19225.00,
    liquidationPrice: 0,
    openedAt: new Date(now.getTime() - 7 * dayMs),
    updatedAt: now,
    orders: [],
    fees: 0,
    feeCurrency: 'USDT'
  }
]

/**
 * Mock Orders
 */
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    userId: mockUser.id,
    symbol: 'BTCUSDT',
    side: OrderSide.BUY,
    type: OrderType.LIMIT,
    quantity: 1.0,
    price: 42000.00,
    stopPrice: undefined,
    status: OrderStatus.PENDING,
    timeInForce: TimeInForce.GTC,
    filledQuantity: 0,
    remainingQuantity: 1.0,
    fees: 0,
    feeCurrency: 'USDT',
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000)
  },
  {
    id: 'order-002',
    userId: mockUser.id,
    symbol: 'ETHUSDT',
    side: OrderSide.SELL,
    type: OrderType.STOP_LOSS,
    quantity: 5.0,
    price: 2400.00,
    stopPrice: 2450.00,
    status: OrderStatus.PENDING,
    timeInForce: TimeInForce.GTC,
    filledQuantity: 0,
    remainingQuantity: 5.0,
    fees: 0,
    feeCurrency: 'USDT',
    createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000)
  }
]

/**
 * Mock Recent Trades
 */
export const mockRecentTrades: Trade[] = [
  {
    id: 'trade-001',
    symbol: 'BTCUSDT',
    price: 43100.00,
    quantity: 0.75,
    side: 'BUY',
    timestamp: new Date(now.getTime() - 15 * 60 * 1000),
    isBuyerMaker: false
  },
  {
    id: 'trade-002',
    symbol: 'ETHUSDT',
    price: 2575.25,
    quantity: 2.5,
    side: 'SELL',
    timestamp: new Date(now.getTime() - 32 * 60 * 1000),
    isBuyerMaker: true,
  },
  {
    id: 'trade-003',
    symbol: 'AAPL',
    price: 195.80,
    quantity: 50,
    side: 'BUY',
    timestamp: new Date(now.getTime() - 85 * 60 * 1000),
    isBuyerMaker: false,
  },
]

/**
 * Mock News Articles
 */
export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'news-001',
    title: 'Bitcoin Reaches New Monthly High as Institutional Interest Grows',
    description: 'Bitcoin surged to a new monthly high as institutional investors continue to show strong interest in cryptocurrency markets.',
    content: 'Bitcoin (BTC) has reached a new monthly high of $43,500, driven by increased institutional adoption...',
    url: 'https://example.com/news/bitcoin-monthly-high',
    image: 'https://images.unsplash.com/photo-1518544866330-4b9fe0c60b7b?w=800',
    publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    source: {
      id: 'crypto-news',
      name: 'Crypto News',
      url: 'https://cryptonews.com',
      category: 'CRYPTO' as NewsCategory,
      language: 'en',
      isActive: true,
      isPremium: false,
    },
    author: 'Sarah Johnson',
    category: 'CRYPTO' as NewsCategory,
    type: 'ARTICLE',
    priority: 'HIGH',
    relatedSymbols: ['BTCUSDT'],
    tags: ['bitcoin', 'institutional', 'adoption'],
    language: 'en',
    isTrending: true,
    isFeatured: true,
    isPremium: false,
  },
  {
    id: 'news-002',
    title: 'Federal Reserve Signals Potential Interest Rate Changes',
    description: 'The Federal Reserve hints at potential monetary policy adjustments in upcoming meetings.',
    content: 'The Federal Reserve has signaled potential changes to interest rates in the coming months...',
    url: 'https://example.com/news/fed-interest-rates',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    publishedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    source: {
      id: 'financial-times',
      name: 'Financial Times',
      url: 'https://ft.com',
      category: 'GENERAL' as NewsCategory,
      language: 'en',
      isActive: true,
      isPremium: true,
    },
    author: 'Michael Chen',
    category: 'GENERAL' as NewsCategory,
    type: 'ARTICLE',
    priority: 'HIGH',
    relatedSymbols: ['EURUSD', 'GBPUSD', 'USDJPY'],
    tags: ['federal-reserve', 'interest-rates', 'monetary-policy'],
    language: 'en',
    isTrending: true,
    isFeatured: false,
    isPremium: true,
  },
  {
    id: 'news-003',
    title: 'Apple Reports Strong Quarterly Earnings Despite Market Headwinds',
    description: 'Apple Inc. delivers better-than-expected quarterly results, boosting tech sector confidence.',
    content: 'Apple Inc. (AAPL) reported strong quarterly earnings that exceeded analyst expectations...',
    url: 'https://example.com/news/apple-quarterly-earnings',
    image: 'https://images.unsplash.com/photo-1611532736942-7a07b4a8b85d?w=800',
    publishedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
    source: {
      id: 'bloomberg',
      name: 'Bloomberg',
      url: 'https://bloomberg.com',
      category: 'STOCKS' as NewsCategory,
      language: 'en',
      isActive: true,
      isPremium: false,
    },
    author: 'Lisa Wang',
    category: 'STOCKS' as NewsCategory,
    type: 'ARTICLE',
    priority: 'MEDIUM',
    relatedSymbols: ['AAPL'],
    tags: ['apple', 'earnings', 'tech', 'quarterly-results'],
    language: 'en',
    isTrending: false,
    isFeatured: true,
    isPremium: false,
  },
  {
    id: 'news-004',
    title: 'Gold Prices Surge Amid Global Economic Uncertainty',
    description: 'Gold reaches new highs as investors seek safe-haven assets amid global economic concerns.',
    content: 'Gold prices have surged to new highs as global economic uncertainty drives investors...',
    url: 'https://example.com/news/gold-prices-surge',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
    publishedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000),
    source: {
      id: 'reuters',
      name: 'Reuters',
      url: 'https://reuters.com',
      category: 'COMMODITIES' as NewsCategory,
      language: 'en',
      isActive: true,
      isPremium: false,
    },
    author: 'David Miller',
    category: 'COMMODITIES' as NewsCategory,
    type: 'ARTICLE',
    priority: 'MEDIUM',
    relatedSymbols: ['GOLD', 'SILVER'],
    tags: ['gold', 'commodities', 'safe-haven', 'uncertainty'],
    language: 'en',
    isTrending: false,
    isFeatured: false,
    isPremium: false,
  },
  {
    id: 'news-005',
    title: 'Ethereum Network Upgrade Shows Promising Results',
    description: 'Recent Ethereum network improvements demonstrate enhanced scalability and reduced transaction costs.',
    content: 'The Ethereum network upgrade has shown promising results with improved transaction speeds...',
    url: 'https://example.com/news/ethereum-upgrade',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    publishedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
    source: {
      id: 'coindesk',
      name: 'CoinDesk',
      url: 'https://coindesk.com',
      category: 'CRYPTO' as NewsCategory,
      language: 'en',
      isActive: true,
      isPremium: false,
    },
    author: 'Emma Rodriguez',
    category: 'CRYPTO' as NewsCategory,
    type: 'ARTICLE',
    priority: 'MEDIUM',
    relatedSymbols: ['ETHUSDT'],
    tags: ['ethereum', 'upgrade', 'scalability', 'crypto'],
    language: 'en',
    isTrending: true,
    isFeatured: false,
    isPremium: false,
  },
]

/**
 * Mock Watchlist
 */
export const mockWatchlist: string[] = [
  'BTCUSDT',
  'ETHUSDT',
  'AAPL',
  'TSLA',
  'EURUSD',
  'GOLD',
]

/**
 * Mock Price Alerts
 */
export const mockPriceAlerts = [
  {
    id: 'alert-001',
    symbol: 'BTCUSDT',
    condition: 'above',
    price: 45000,
    isActive: true,
    createdAt: new Date(now.getTime() - 2 * dayMs),
  },
  {
    id: 'alert-002',
    symbol: 'ETHUSDT',
    condition: 'below',
    price: 2400,
    isActive: true,
    createdAt: new Date(now.getTime() - dayMs),
  },
]

/**
 * Demo mode helper functions
 */
export const demoHelpers = {
  /**
   * Get market data for symbol with realistic price updates
   */
  getMarketData: (symbol: string): MarketData | undefined => {
    if (!mockMarketData[symbol]) return undefined
    
    // Add small random price movement for live feel
    const data = { ...mockMarketData[symbol] }
    const priceChange = (rng.next() - 0.5) * 0.001 // 0.1% max change
    data.price = data.price * (1 + priceChange)
    data.timestamp = FIXED_TIMESTAMP
    
    return data
  },
  
  /**
   * Get random market data updates
   */
  getRandomUpdates: (count = 5): { symbol: string; data: MarketData }[] => {
    const symbols = Object.keys(mockMarketData)
    // Use a deterministic shuffle based on seeded random
    const shuffled = symbols.slice()
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng.next() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    const randomSymbols = shuffled.slice(0, count)
    
    return randomSymbols.map(symbol => ({
      symbol,
      data: demoHelpers.getMarketData(symbol)!
    }))
  },
  
  /**
   * Generate random news article
   */
  generateNewsUpdate: (): NewsArticle => {
    const templates = [
      'Market Analysis: {} Shows Strong Performance',
      'Breaking: {} Reaches New Trading Milestone', 
      'Technical Update: {} Network Enhancement',
      'Market Alert: {} Price Movement Detected',
    ]
    
    const symbols = Object.keys(mockMarketData)
    const randomSymbol = symbols[Math.floor(rng.next() * symbols.length)]
    const template = templates[Math.floor(rng.next() * templates.length)]
    
    return {
      ...mockNewsArticles[0],
      id: `news-${FIXED_TIMESTAMP.getTime()}`,
      title: template.replace('{}', randomSymbol),
      publishedAt: FIXED_TIMESTAMP,
      relatedSymbols: [randomSymbol],
    }
  }
}

export default {
  user: mockUser,
  symbols: mockSymbols,
  marketData: mockMarketData,
  tickers: mockTickers,
  priceHistory: mockPriceHistory,
  portfolio: mockPortfolio,
  portfolioSummary: mockPortfolioSummary,
  positions: mockPositions,
  orders: mockOrders,
  recentTrades: mockRecentTrades,
  newsArticles: mockNewsArticles,
  watchlist: mockWatchlist,
  priceAlerts: mockPriceAlerts,
  helpers: demoHelpers,
} 