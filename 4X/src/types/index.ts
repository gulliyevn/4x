/**
 * 4X Trading Platform - Type Definitions
 * 
 * This module serves as the main entry point for all TypeScript type definitions
 * used throughout the 4X trading platform. It exports all types from individual
 * modules for convenient importing.
 */

// Authentication and User Types
export type {
  User,
  LoginCredentials,
  RegisterData,
  AuthState,
  JWTPayload,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePassword,
  ProfileUpdate,
  TwoFactorSetup,
  SessionInfo,
  UserPreferences,
} from './auth'

export {
  UserRole,
  AccountStatus,
  TwoFactorMethod,
} from './auth'

// Market Data Types
export type {
  MarketData,
  PricePoint,
  Symbol,
  Ticker,
  OrderBookEntry,
  OrderBook,
  MarketStats,
  TradingSession,
  MarketHours,
  Trade,
  AggregatedTrade,
  ExchangeInfo,
  MarketDepth,
  PriceStats,
} from './market'

export {
  ChartInterval,
  MarketStatus,
  SymbolStatus,
  OrderBookSide,
} from './market'

// News and Media Types
export type {
  NewsArticle,
  NewsSource,
  NewsFilter,
  NewsState,
  NewsSubscription,
  NewsAnalytics,
  NewsAlert,
  NewsComment,
  NewsRecommendation,
} from './news'

export type {
  NewsCategory,
  NewsSentiment,
  NewsPriority,
  NewsType,
} from './news'

// API Response Types
export type {
  ApiResponse,
  ApiError,
  ValidationError,
  RetryInfo,
  ApiResponseMeta,
  RateLimitInfo,
  PaginatedResponse,
  WebSocketMessage,
  WebSocketError,
  WebSocketSubscription,
  ApiRequestOptions,
  BatchRequest,
  BatchResponse,
  FileUploadResponse,
  HealthCheckResponse,
  SearchResponse,
} from './api'

export {
  RequestStatus,
  HttpMethod,
  WebSocketState,
  ApiErrorCode,
} from './api'

// Trading and Portfolio Types
export type {
  TradingPair,
  Order,
  Position,
  Portfolio,
  Watchlist,
  PriceAlert,
  TradeHistory,
  TradingStrategy,
  RiskMetrics,
  TradingSignal,
  MarketAnalysis,
} from './trading'

export {
  OrderType,
  OrderSide,
  OrderStatus,
  PositionStatus,
  TimeInForce,
  AssetType,
} from './trading'

// Import types that we'll use in interfaces below
import type { ChartInterval } from './market'
import type { AuthState } from './auth'
import type { NewsState } from './news'
import type { Portfolio, Watchlist, PriceAlert, Order, Position, TradeHistory } from './trading'
import type { MarketData, OrderBook } from './market'

// Utility type helpers for common patterns
export type ID = string
export type Timestamp = Date
export type Currency = string
export type Percentage = number
export type Price = number
export type Quantity = number
export type Volume = number

/**
 * Generic key-value pair interface
 */
export interface KeyValuePair<T = unknown> {
  key: string
  value: T
}

/**
 * Generic option interface for dropdowns and selects
 */
export interface Option<T = string> {
  label: string
  value: T
  disabled?: boolean
  group?: string
}

/**
 * Generic time series data point
 */
export interface TimeSeriesPoint<T = number> {
  timestamp: Date
  value: T
}

/**
 * Common filter interface for list operations
 */
export interface BaseFilter {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/**
 * Common entity interface with timestamps
 */
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Generic loading state interface
 */
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

/**
 * Generic form state interface
 */
export interface FormState<T = Record<string, unknown>> {
  data: T
  errors: Record<string, string>
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
}

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system'
  primaryColor: string
  secondaryColor: string
  accentColor: string
  borderRadius: number
  fontSize: number
}

/**
 * Notification interface
 */
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  timestamp: Date
  read: boolean
  actions?: Array<{
    label: string
    action: () => void
  }>
}

/**
 * Application configuration interface
 */
export interface AppConfig {
  name: string
  version: string
  environment: 'development' | 'staging' | 'production'
  features: {
    [key: string]: boolean
  }
  limits: {
    maxWatchlists: number
    maxAlerts: number
    maxPositions: number
    maxOrdersPerDay: number
  }
  defaults: {
    currency: string
    language: string
    timezone: string
    chartInterval: ChartInterval
  }
}

/**
 * Permission interface for role-based access control
 */
export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

/**
 * Feature flag interface
 */
export interface FeatureFlag {
  name: string
  enabled: boolean
  description?: string
  rolloutPercentage?: number
  userGroups?: string[]
}

/**
 * Audit log interface
 */
export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId?: string
  details?: Record<string, unknown>
  ipAddress: string
  userAgent: string
  timestamp: Date
}

/**
 * System status interface
 */
export interface SystemStatus {
  overall: 'operational' | 'degraded' | 'major_outage'
  services: Array<{
    name: string
    status: 'operational' | 'degraded' | 'outage'
    lastUpdated: Date
    description?: string
  }>
  incidents: Array<{
    id: string
    title: string
    status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
    impact: 'minor' | 'major' | 'critical'
    startedAt: Date
    resolvedAt?: Date
    updates: Array<{
      timestamp: Date
      message: string
      status: string
    }>
  }>
}

/**
 * Export a type that combines all major state interfaces for global state management
 */
export interface GlobalState {
  auth: AuthState
  news: NewsState
  trading: {
    portfolio: Portfolio | null
    watchlists: Watchlist[]
    alerts: PriceAlert[]
    orders: Order[]
    positions: Position[]
    tradeHistory: TradeHistory[]
  }
  market: {
    selectedSymbol: string | null
    marketData: Record<string, MarketData>
    orderBooks: Record<string, OrderBook>
  }
  ui: {
    theme: ThemeConfig
    notifications: Notification[]
    loading: Record<string, boolean>
    errors: Record<string, string | null>
  }
} 