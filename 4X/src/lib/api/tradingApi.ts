/**
 * Trading API Client
 * 
 * Provides trading functions:
 * - Portfolio management
 * - Order operations
 * - Position management
 * - Price alerts
 * - Trading history
 */

import { apiClient, createApiCall, createCancellableRequest, ApiClientError } from './client'
import type { 
  Portfolio,
  Watchlist,
  TradingPair,
  PriceAlert,
  Order,
  Position,
  TradeHistory,
  OrderType,
  OrderSide
} from '@/types/trading'
import type { ApiResponse, PaginatedResponse } from '@/types/api'

// Portfolio operations
export const getPortfolio = createApiCall<Portfolio>(
  () => apiClient.get<ApiResponse<Portfolio>>('/trading/portfolio')
)

export const updatePortfolioSettings = async (settings: {
  baseCurrency?: string
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  autoRebalance?: boolean
}): Promise<Portfolio> => {
  try {
    const response = await apiClient.patch<ApiResponse<Portfolio>>(
      '/trading/portfolio/settings',
      settings
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to update portfolio settings',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'PORTFOLIO_UPDATE_ERROR'
      )
    }
  } catch (error) {
    console.error('Portfolio update error:', error)
    throw error
  }
}

// Watchlist operations
export const getWatchlists = createApiCall<Watchlist[]>(
  () => apiClient.get<ApiResponse<Watchlist[]>>('/trading/watchlists')
)

export const createWatchlist = async (data: {
  name: string
  description?: string
  symbols?: string[]
  isPublic?: boolean
  color?: string
}): Promise<Watchlist> => {
  try {
    const response = await apiClient.post<ApiResponse<Watchlist>>(
      '/trading/watchlists',
      data
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to create watchlist',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'WATCHLIST_CREATE_ERROR'
      )
    }
  } catch (error) {
    console.error('Watchlist creation error:', error)
    throw error
  }
}

export const updateWatchlist = async (
  watchlistId: string,
  updates: Partial<Watchlist>
): Promise<Watchlist> => {
  try {
    const response = await apiClient.patch<ApiResponse<Watchlist>>(
      `/trading/watchlists/${watchlistId}`,
      updates
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to update watchlist',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'WATCHLIST_UPDATE_ERROR'
      )
    }
  } catch (error) {
    console.error('Watchlist update error:', error)
    throw error
  }
}

export const deleteWatchlist = async (watchlistId: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/trading/watchlists/${watchlistId}`
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to delete watchlist',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'WATCHLIST_DELETE_ERROR'
      )
    }
  } catch (error) {
    console.error('Watchlist deletion error:', error)
    throw error
  }
}

// Trading pairs
export const getTradingPairs = createApiCall<TradingPair[]>(
  () => apiClient.get<ApiResponse<TradingPair[]>>('/trading/pairs')
)

export const getTradingPair = async (symbol: string): Promise<TradingPair> => {
  try {
    const response = await apiClient.get<ApiResponse<TradingPair>>(
      `/trading/pairs/${symbol}`
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to fetch trading pair',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'TRADING_PAIR_ERROR'
      )
    }
  } catch (error) {
    console.error('Trading pair fetch error:', error)
    throw error
  }
}

// Price alerts
export const getPriceAlerts = createApiCall<PriceAlert[]>(
  () => apiClient.get<ApiResponse<PriceAlert[]>>('/trading/alerts')
)

export const createPriceAlert = async (alert: {
  symbol: string
  condition: 'ABOVE' | 'BELOW' | 'CROSSES_ABOVE' | 'CROSSES_BELOW' | 'PERCENT_CHANGE'
  targetPrice: number
  basePrice?: number
  percentChange?: number
  message?: string
  isActive?: boolean
}): Promise<PriceAlert> => {
  try {
    const response = await apiClient.post<ApiResponse<PriceAlert>>(
      '/trading/alerts',
      alert
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to create price alert',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'PRICE_ALERT_CREATE_ERROR'
      )
    }
  } catch (error) {
    console.error('Price alert creation error:', error)
    throw error
  }
}

export const updatePriceAlert = async (
  alertId: string,
  updates: Partial<PriceAlert>
): Promise<PriceAlert> => {
  try {
    const response = await apiClient.patch<ApiResponse<PriceAlert>>(
      `/trading/alerts/${alertId}`,
      updates
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to update price alert',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'PRICE_ALERT_UPDATE_ERROR'
      )
    }
  } catch (error) {
    console.error('Price alert update error:', error)
    throw error
  }
}

export const deletePriceAlert = async (alertId: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/trading/alerts/${alertId}`
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to delete price alert',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'PRICE_ALERT_DELETE_ERROR'
      )
    }
  } catch (error) {
    console.error('Price alert deletion error:', error)
    throw error
  }
}

// Order operations
export const getActiveOrders = createApiCall<Order[]>(
  () => apiClient.get<ApiResponse<Order[]>>('/trading/orders')
)

export const getOrderHistory = async (
  limit: number = 100,
  offset: number = 0
): Promise<{ orders: Order[]; total: number }> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Order>>(
      '/trading/orders/history',
      { params: { limit, offset } }
    )
    
    if (response.data.success && response.data.data) {
      return {
        orders: response.data.data,
        total: response.data.pagination.total,
      }
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to fetch order history',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'ORDER_HISTORY_ERROR'
      )
    }
  } catch (error) {
    console.error('Order history fetch error:', error)
    throw error
  }
}

export const placeOrder = async (order: {
  symbol: string
  type: OrderType
  side: OrderSide
  quantity: number
  price?: number
  stopPrice?: number
  timeInForce?: 'GTC' | 'IOC' | 'FOK'
  reduceOnly?: boolean
}): Promise<Order> => {
  try {
    const response = await apiClient.post<ApiResponse<Order>>(
      '/trading/orders',
      order
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to place order',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'ORDER_PLACE_ERROR'
      )
    }
  } catch (error) {
    console.error('Order placement error:', error)
    throw error
  }
}

export const cancelOrder = async (orderId: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/trading/orders/${orderId}`
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to cancel order',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'ORDER_CANCEL_ERROR'
      )
    }
  } catch (error) {
    console.error('Order cancellation error:', error)
    throw error
  }
}

export const cancelAllOrders = async (symbol?: string): Promise<{ message: string; cancelled: number }> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string; cancelled: number }>>(
      '/trading/orders/all',
      { params: symbol ? { symbol } : {} }
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to cancel all orders',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'ORDER_CANCEL_ALL_ERROR'
      )
    }
  } catch (error) {
    console.error('Cancel all orders error:', error)
    throw error
  }
}

// Position operations
export const getOpenPositions = createApiCall<Position[]>(
  () => apiClient.get<ApiResponse<Position[]>>('/trading/positions')
)

export const getPositionHistory = async (
  limit: number = 100,
  offset: number = 0
): Promise<{ positions: Position[]; total: number }> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Position>>(
      '/trading/positions/history',
      { params: { limit, offset } }
    )
    
    if (response.data.success && response.data.data) {
      return {
        positions: response.data.data,
        total: response.data.pagination.total,
      }
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to fetch position history',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'POSITION_HISTORY_ERROR'
      )
    }
  } catch (error) {
    console.error('Position history fetch error:', error)
    throw error
  }
}

export const closePosition = async (positionId: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      `/trading/positions/${positionId}/close`
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to close position',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'POSITION_CLOSE_ERROR'
      )
    }
  } catch (error) {
    console.error('Position close error:', error)
    throw error
  }
}

export const updatePosition = async (
  positionId: string,
  updates: {
    stopLoss?: number
    takeProfit?: number
    leverage?: number
  }
): Promise<Position> => {
  try {
    const response = await apiClient.patch<ApiResponse<Position>>(
      `/trading/positions/${positionId}`,
      updates
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to update position',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'POSITION_UPDATE_ERROR'
      )
    }
  } catch (error) {
    console.error('Position update error:', error)
    throw error
  }
}

// Trade history
export const getTradeHistory = async (
  limit: number = 100,
  offset: number = 0,
  symbol?: string
): Promise<{ trades: TradeHistory[]; total: number }> => {
  try {
    const params: any = { limit, offset }
    if (symbol) params.symbol = symbol
    
    const response = await apiClient.get<PaginatedResponse<TradeHistory>>(
      '/trading/history',
      { params }
    )
    
    if (response.data.success && response.data.data) {
      return {
        trades: response.data.data,
        total: response.data.pagination.total,
      }
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to fetch trade history',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'TRADE_HISTORY_ERROR'
      )
    }
  } catch (error) {
    console.error('Trade history fetch error:', error)
    throw error
  }
}

// Performance analytics
export const getPerformanceAnalytics = async (
  period: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL' = '1M'
): Promise<{
  totalReturn: number
  totalReturnPercent: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  profitFactor: number
  totalTrades: number
  averageWin: number
  averageLoss: number
  largestWin: number
  largestLoss: number
  dailyReturns: Array<{ date: Date; return: number }>
}> => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(
      '/trading/analytics/performance',
      { params: { period } }
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to fetch performance analytics',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'ANALYTICS_ERROR'
      )
    }
  } catch (error) {
    console.error('Performance analytics error:', error)
    throw error
  }
}

// Risk management
export const getRiskMetrics = createApiCall<{
  portfolioValue: number
  totalExposure: number
  availableMargin: number
  marginLevel: number
  unrealizedPnL: number
  dailyPnL: number
  maxRiskPerTrade: number
  currentRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
}>(
  () => apiClient.get<ApiResponse<any>>('/trading/risk/metrics')
)

export const updateRiskSettings = async (settings: {
  maxRiskPerTrade?: number
  maxDailyLoss?: number
  stopLossPercent?: number
  takeProfitPercent?: number
  maxOpenPositions?: number
}): Promise<{ message: string }> => {
  try {
    const response = await apiClient.patch<ApiResponse<{ message: string }>>(
      '/trading/risk/settings',
      settings
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to update risk settings',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'RISK_SETTINGS_ERROR'
      )
    }
  } catch (error) {
    console.error('Risk settings update error:', error)
    throw error
  }
}

// Cancellable requests for better UX
export const getCancellablePortfolio = () => {
  return createCancellableRequest<Portfolio>(async (signal) => {
    const response = await apiClient.get('/trading/portfolio', { signal })
    return response.data.data
  })
}

export const getCancellableOrders = () => {
  return createCancellableRequest<Order[]>(async (signal) => {
    const response = await apiClient.get('/trading/orders', { signal })
    return response.data.data
  })
}

export const getCancellablePositions = () => {
  return createCancellableRequest<Position[]>(async (signal) => {
    const response = await apiClient.get('/trading/positions', { signal })
    return response.data.data
  })
} 