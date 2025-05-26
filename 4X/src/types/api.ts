/**
 * API Response and Communication Types
 * 
 * This module contains all type definitions related to API responses,
 * error handling, WebSocket communication, and request management
 * for the 4X trading platform.
 */

/**
 * Request status enumeration for tracking API request states
 */
export enum RequestStatus {
  /** Request has not been initiated */
  IDLE = 'IDLE',
  /** Request is currently in progress */
  LOADING = 'LOADING',
  /** Request completed successfully */
  SUCCESS = 'SUCCESS',
  /** Request failed with an error */
  ERROR = 'ERROR',
  /** Request was cancelled */
  CANCELLED = 'CANCELLED',
}

/**
 * HTTP method enumeration
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

/**
 * WebSocket connection state enumeration
 */
export enum WebSocketState {
  /** WebSocket is connecting */
  CONNECTING = 'CONNECTING',
  /** WebSocket is connected and ready */
  CONNECTED = 'CONNECTED',
  /** WebSocket is disconnecting */
  DISCONNECTING = 'DISCONNECTING',
  /** WebSocket is disconnected */
  DISCONNECTED = 'DISCONNECTED',
  /** WebSocket connection failed */
  ERROR = 'ERROR',
}

/**
 * API error code enumeration
 */
export enum ApiErrorCode {
  // General errors (1000-1999)
  /** Unknown error occurred */
  UNKNOWN_ERROR = 1000,
  /** Invalid request format */
  INVALID_REQUEST = 1001,
  /** Missing required parameters */
  MISSING_PARAMETERS = 1002,
  /** Invalid parameters provided */
  INVALID_PARAMETERS = 1003,
  /** Request timeout */
  REQUEST_TIMEOUT = 1004,
  /** Network connection error */
  NETWORK_ERROR = 1005,
  /** Server unavailable */
  SERVER_UNAVAILABLE = 1006,
  /** Maintenance mode */
  MAINTENANCE_MODE = 1007,

  // Authentication errors (2000-2999)
  /** Authentication required */
  UNAUTHORIZED = 2000,
  /** Invalid credentials */
  INVALID_CREDENTIALS = 2001,
  /** Token expired */
  TOKEN_EXPIRED = 2002,
  /** Invalid token */
  INVALID_TOKEN = 2003,
  /** Account locked */
  ACCOUNT_LOCKED = 2004,
  /** Two-factor authentication required */
  TWO_FACTOR_REQUIRED = 2005,
  /** Invalid two-factor code */
  INVALID_TWO_FACTOR = 2006,

  // Authorization errors (3000-3999)
  /** Insufficient permissions */
  FORBIDDEN = 3000,
  /** Premium account required */
  PREMIUM_REQUIRED = 3001,
  /** Feature not available in region */
  REGION_RESTRICTED = 3002,
  /** Account verification required */
  VERIFICATION_REQUIRED = 3003,

  // Resource errors (4000-4999)
  /** Resource not found */
  NOT_FOUND = 4000,
  /** Resource already exists */
  ALREADY_EXISTS = 4001,
  /** Resource conflict */
  CONFLICT = 4002,
  /** Resource limit exceeded */
  RESOURCE_LIMIT = 4003,
  /** Invalid resource state */
  INVALID_STATE = 4004,

  // Rate limiting errors (5000-5999)
  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED = 5000,
  /** Too many requests */
  TOO_MANY_REQUESTS = 5001,
  /** API quota exceeded */
  QUOTA_EXCEEDED = 5002,

  // Trading errors (6000-6999)
  /** Invalid trading pair */
  INVALID_TRADING_PAIR = 6000,
  /** Insufficient funds */
  INSUFFICIENT_FUNDS = 6001,
  /** Order size too small */
  ORDER_SIZE_TOO_SMALL = 6002,
  /** Order size too large */
  ORDER_SIZE_TOO_LARGE = 6003,
  /** Market closed */
  MARKET_CLOSED = 6004,
  /** Trading halted */
  TRADING_HALTED = 6005,
  /** Invalid order type */
  INVALID_ORDER_TYPE = 6006,

  // Data errors (7000-7999)
  /** Data not available */
  DATA_NOT_AVAILABLE = 7000,
  /** Invalid date range */
  INVALID_DATE_RANGE = 7001,
  /** Data limit exceeded */
  DATA_LIMIT_EXCEEDED = 7002,
  /** Stale data */
  STALE_DATA = 7003,

  // Validation errors (8000-8999)
  /** Email validation failed */
  INVALID_EMAIL = 8000,
  /** Password validation failed */
  INVALID_PASSWORD = 8001,
  /** Phone number validation failed */
  INVALID_PHONE = 8002,
  /** Name validation failed */
  INVALID_NAME = 8003,
  /** Date validation failed */
  INVALID_DATE = 8004,
  /** Currency validation failed */
  INVALID_CURRENCY = 8005,
  /** Amount validation failed */
  INVALID_AMOUNT = 8006,
}

/**
 * Generic API response interface
 */
export interface ApiResponse<T = unknown> {
  /** Whether the request was successful */
  success: boolean
  /** Response data */
  data?: T
  /** Error information if request failed */
  error?: ApiError
  /** Additional metadata */
  meta?: ApiResponseMeta
  /** Response timestamp */
  timestamp: Date
  /** Request ID for tracking */
  requestId: string
}

/**
 * API error interface with detailed error information
 */
export interface ApiError {
  /** Error code */
  code: ApiErrorCode
  /** Human-readable error message */
  message: string
  /** Detailed error description */
  details?: string
  /** Field-specific validation errors */
  validationErrors?: ValidationError[]
  /** Additional error context */
  context?: Record<string, unknown>
  /** Retry information */
  retryInfo?: RetryInfo
  /** Documentation link for error */
  docUrl?: string
  /** Stack trace (only in development) */
  stack?: string
}

/**
 * Validation error interface for field-specific errors
 */
export interface ValidationError {
  /** Field name that failed validation */
  field: string
  /** Validation error message */
  message: string
  /** Error code specific to validation */
  code: string
  /** Field value that failed validation */
  value?: unknown
}

/**
 * Retry information interface
 */
export interface RetryInfo {
  /** Whether the request can be retried */
  canRetry: boolean
  /** Recommended retry delay in milliseconds */
  retryAfter?: number
  /** Maximum number of retry attempts */
  maxRetries?: number
  /** Current retry attempt number */
  currentAttempt?: number
}

/**
 * API response metadata interface
 */
export interface ApiResponseMeta {
  /** Total number of items (for paginated responses) */
  total?: number
  /** Current page number */
  page?: number
  /** Items per page */
  limit?: number
  /** Total number of pages */
  totalPages?: number
  /** Whether there are more items */
  hasMore?: boolean
  /** Next page cursor */
  nextCursor?: string
  /** Previous page cursor */
  prevCursor?: string
  /** Request processing time in milliseconds */
  processingTime?: number
  /** Server version */
  version?: string
  /** Rate limit information */
  rateLimit?: RateLimitInfo
}

/**
 * Rate limit information interface
 */
export interface RateLimitInfo {
  /** Maximum requests allowed */
  limit: number
  /** Remaining requests */
  remaining: number
  /** Rate limit reset timestamp */
  resetTime: Date
  /** Rate limit window in seconds */
  windowSize: number
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  /** Pagination metadata */
  pagination: {
    /** Current page number */
    page: number
    /** Items per page */
    limit: number
    /** Total number of items */
    total: number
    /** Total number of pages */
    totalPages: number
    /** Whether there are more pages */
    hasNext: boolean
    /** Whether there are previous pages */
    hasPrev: boolean
    /** Next page number */
    nextPage?: number
    /** Previous page number */
    prevPage?: number
  }
}

/**
 * WebSocket message interface
 */
export interface WebSocketMessage<T = unknown> {
  /** Message type/event name */
  type: string
  /** Message payload */
  data: T
  /** Message timestamp */
  timestamp: Date
  /** Message ID for tracking */
  id?: string
  /** Channel or topic */
  channel?: string
  /** Message correlation ID */
  correlationId?: string
  /** Whether message requires acknowledgment */
  requiresAck?: boolean
  /** Message priority */
  priority?: 'low' | 'normal' | 'high' | 'critical'
}

/**
 * WebSocket error interface
 */
export interface WebSocketError {
  /** Error code */
  code: number
  /** Error message */
  message: string
  /** Error type */
  type: 'connection' | 'authentication' | 'subscription' | 'data' | 'unknown'
  /** Additional error details */
  details?: string
  /** Whether connection should be retried */
  shouldRetry: boolean
  /** Timestamp of error */
  timestamp: Date
}

/**
 * WebSocket subscription interface
 */
export interface WebSocketSubscription {
  /** Subscription ID */
  id: string
  /** Channel name */
  channel: string
  /** Subscription parameters */
  params?: Record<string, unknown>
  /** Whether subscription is active */
  isActive: boolean
  /** Subscription timestamp */
  subscribedAt: Date
  /** Last message timestamp */
  lastMessage?: Date
  /** Message count received */
  messageCount: number
  /** Error count */
  errorCount: number
}

/**
 * API request options interface
 */
export interface ApiRequestOptions {
  /** Request timeout in milliseconds */
  timeout?: number
  /** Whether to retry on failure */
  retry?: boolean
  /** Maximum number of retries */
  maxRetries?: number
  /** Retry delay in milliseconds */
  retryDelay?: number
  /** Custom headers */
  headers?: Record<string, string>
  /** Request priority */
  priority?: 'low' | 'normal' | 'high'
  /** Whether to use cache */
  useCache?: boolean
  /** Cache TTL in milliseconds */
  cacheTtl?: number
  /** Whether to abort on navigation */
  abortOnNavigation?: boolean
}

/**
 * Batch request interface
 */
export interface BatchRequest {
  /** Batch ID */
  id: string
  /** Individual requests in the batch */
  requests: Array<{
    /** Request ID */
    id: string
    /** HTTP method */
    method: HttpMethod
    /** Request URL */
    url: string
    /** Request body */
    body?: unknown
    /** Request headers */
    headers?: Record<string, string>
  }>
  /** Batch options */
  options?: {
    /** Whether to stop on first error */
    stopOnError?: boolean
    /** Maximum concurrent requests */
    maxConcurrency?: number
    /** Batch timeout */
    timeout?: number
  }
}

/**
 * Batch response interface
 */
export interface BatchResponse {
  /** Batch ID */
  id: string
  /** Individual responses */
  responses: Array<{
    /** Request ID */
    id: string
    /** Response status */
    status: number
    /** Response data */
    data?: unknown
    /** Response error */
    error?: ApiError
  }>
  /** Batch metadata */
  meta: {
    /** Number of successful requests */
    successCount: number
    /** Number of failed requests */
    errorCount: number
    /** Total processing time */
    processingTime: number
  }
}

/**
 * File upload response interface
 */
export interface FileUploadResponse {
  /** Upload ID */
  id: string
  /** File name */
  filename: string
  /** File size in bytes */
  size: number
  /** File MIME type */
  mimeType: string
  /** File URL */
  url: string
  /** File hash */
  hash?: string
  /** Upload timestamp */
  uploadedAt: Date
  /** File metadata */
  metadata?: Record<string, unknown>
}

/**
 * Health check response interface
 */
export interface HealthCheckResponse {
  /** Service status */
  status: 'healthy' | 'degraded' | 'unhealthy'
  /** Service version */
  version: string
  /** Timestamp of check */
  timestamp: Date
  /** Service uptime in milliseconds */
  uptime: number
  /** Individual component checks */
  checks: Array<{
    /** Component name */
    name: string
    /** Component status */
    status: 'healthy' | 'degraded' | 'unhealthy'
    /** Response time in milliseconds */
    responseTime?: number
    /** Additional details */
    details?: string
  }>
}

/**
 * Search response interface
 */
export interface SearchResponse<T> extends PaginatedResponse<T> {
  /** Search query */
  query: string
  /** Search filters applied */
  filters?: Record<string, unknown>
  /** Search suggestions */
  suggestions?: string[]
  /** Search facets */
  facets?: Array<{
    /** Facet name */
    name: string
    /** Facet values */
    values: Array<{
      /** Value */
      value: string
      /** Count */
      count: number
    }>
  }>
  /** Search metadata */
  searchMeta: {
    /** Search time in milliseconds */
    searchTime: number
    /** Total results found */
    totalResults: number
    /** Whether results are approximate */
    approximate: boolean
  }
} 