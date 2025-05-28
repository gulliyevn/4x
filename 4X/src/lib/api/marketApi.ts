/**
 * Market API Client
 * 
 * Provides market data functions with Binance API integration:
 * - Real-time market data
 * - Chart data with multiple intervals
 * - Order book data
 * - Ticker information
 * - WebSocket connection management
 */

import { apiClient, createApiCall, createCancellableRequest, ApiClientError } from './client'
import { 
  MarketData, 
  Symbol, 
  PricePoint, 
  Ticker, 
  OrderBook, 
  Trade,
  ChartInterval,
  OrderBookSide
} from '@/types/market'
import type { ApiResponse, PaginatedResponse } from '@/types/api'

// Add API_BASE_URL constant
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com'

// Binance API configuration
const BINANCE_API_URL = 'https://api.binance.com/api/v3'
const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'

// Rate limiting for Binance API
const BINANCE_RATE_LIMIT = {
  weight: 1200, // requests per minute
  orders: 10,   // orders per second
  current: 0,
  resetTime: Date.now() + 60000,
}

// Chart interval mapping
const INTERVAL_MAP: Record<ChartInterval, string> = {
  '1m': '1m',
  '3m': '3m',
  '5m': '5m',
  '15m': '15m',
  '30m': '30m',
  '1h': '1h',
  '2h': '2h',
  '4h': '4h',
  '6h': '6h',
  '8h': '8h',
  '12h': '12h',
  '1d': '1d',
  '3d': '3d',
  '1w': '1w',
  '1M': '1M',
}

// WebSocket connection manager
class MarketWebSocket {
  private ws: WebSocket | null = null
  private subscriptions = new Set<string>()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private messageHandlers = new Map<string, (data: any) => void>()

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(BINANCE_WS_URL)
        
        this.ws.onopen = () => {
          this.reconnectAttempts = 0
          
          // Resubscribe to all streams
          this.subscriptions.forEach(stream => {
            if (this.messageHandlers.has(stream)) {
              const handler = this.messageHandlers.get(stream)!
              this.subscribe(stream, handler)
            }
          })
          
          resolve()
        }
        
        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.handleMessage(data)
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        }
        
        this.ws.onerror = (error) => {
          console.error('Market WebSocket error:', error)
          reject(error)
        }
        
        this.ws.onclose = () => {
          this.ws = null
          this.attemptReconnect()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      
      setTimeout(() => {
        this.connect().catch(() => {
          // Continue attempting to reconnect
        })
      }, delay)
    }
  }

  private handleMessage(data: any): void {
    const { stream, data: streamData } = data
    
    if (stream && this.messageHandlers.has(stream)) {
      const handler = this.messageHandlers.get(stream)
      if (handler) handler(streamData)
    }
  }

  subscribe(stream: string, handler: (data: any) => void): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const subscribeMessage = {
        method: 'SUBSCRIBE',
        params: [stream],
        id: Date.now(),
      }
      
      this.ws.send(JSON.stringify(subscribeMessage))
      this.subscriptions.add(stream)
      this.messageHandlers.set(stream, handler)
    }
  }

  unsubscribe(stream: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const unsubscribeMessage = {
        method: 'UNSUBSCRIBE',
        params: [stream],
        id: Date.now(),
      }
      
      this.ws.send(JSON.stringify(unsubscribeMessage))
      this.subscriptions.delete(stream)
      this.messageHandlers.delete(stream)
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
      this.subscriptions.clear()
      this.messageHandlers.clear()
    }
  }

  get connected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN || false
  }
}

// Global WebSocket instance
export const marketWebSocket = new MarketWebSocket()

// Rate limiting utility for Binance
const checkBinanceRateLimit = (): Promise<void> => {
  return new Promise((resolve) => {
    const now = Date.now()
    
    if (now >= BINANCE_RATE_LIMIT.resetTime) {
      BINANCE_RATE_LIMIT.current = 0
      BINANCE_RATE_LIMIT.resetTime = now + 60000
    }
    
    if (BINANCE_RATE_LIMIT.current < BINANCE_RATE_LIMIT.weight) {
      BINANCE_RATE_LIMIT.current++
      resolve()
    } else {
      const waitTime = BINANCE_RATE_LIMIT.resetTime - now
      setTimeout(() => {
        BINANCE_RATE_LIMIT.current = 1
        BINANCE_RATE_LIMIT.resetTime = Date.now() + 60000
        resolve()
      }, waitTime)
    }
  })
}

// Market data functions
export const getMarketData = createApiCall<MarketData>(
  () => apiClient.get<ApiResponse<MarketData>>('/market/data')
)

export const getSymbols = createApiCall<Symbol[]>(
  () => apiClient.get<ApiResponse<Symbol[]>>('/market/symbols')
)

export const getMarketDataForSymbol = async (symbol: string): Promise<MarketData> => {
  try {
    const response = await apiClient.get<ApiResponse<MarketData>>(`/market/data/${symbol}`)
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to fetch market data',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'MARKET_DATA_ERROR'
      )
    }
  } catch (error) {
    console.error(`Failed to fetch market data for ${symbol}:`, error)
    throw error
  }
}

export const getChartData = async (
  symbol: string,
  interval: ChartInterval,
  limit: number = 500,
  startTime?: number,
  endTime?: number
): Promise<PricePoint[]> => {
  await checkBinanceRateLimit()
  
  try {
    const params = new URLSearchParams({
      symbol: symbol.toUpperCase(),
      interval: INTERVAL_MAP[interval],
      limit: limit.toString(),
    })
    
    if (startTime) params.append('startTime', startTime.toString())
    if (endTime) params.append('endTime', endTime.toString())
    
    const response = await fetch(`${BINANCE_API_URL}/klines?${params}`)
    
    if (!response.ok) {
      throw new ApiClientError(
        `Binance API error: ${response.statusText}`,
        response.status,
        'BINANCE_ERROR'
      )
    }
    
    const data = await response.json()
    
    return data.map((kline: any[]): PricePoint => ({
      time: new Date(kline[0]).getTime(),
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      volume: parseFloat(kline[5]),
      quoteVolume: parseFloat(kline[7]),
      tradeCount: parseInt(kline[8]),
      takerBuyVolume: parseFloat(kline[9]),
      takerBuyQuoteVolume: parseFloat(kline[10])
    }))
  } catch (error) {
    console.error(`Failed to fetch chart data for ${symbol}:`, error)
    throw error
  }
}

export const getTicker = async (symbol?: string): Promise<Ticker | Ticker[]> => {
  await checkBinanceRateLimit()
  
  try {
    const url = symbol 
      ? `${BINANCE_API_URL}/ticker/24hr?symbol=${symbol.toUpperCase()}`
      : `${BINANCE_API_URL}/ticker/24hr`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new ApiClientError(
        `Binance API error: ${response.statusText}`,
        response.status,
        'BINANCE_ERROR'
      )
    }
    
    const data = await response.json()
    
    const mapTicker = (ticker: any): Ticker => ({
      symbol: ticker.symbol,
      price: parseFloat(ticker.lastPrice),
      priceChange: parseFloat(ticker.priceChange),
      priceChangePercent: parseFloat(ticker.priceChangePercent),
      weightedAvgPrice: parseFloat(ticker.weightedAvgPrice),
      prevClosePrice: parseFloat(ticker.prevClosePrice),
      lastQty: parseFloat(ticker.lastQty),
      bidPrice: parseFloat(ticker.bidPrice),
      bidQty: parseFloat(ticker.bidQty),
      askPrice: parseFloat(ticker.askPrice),
      askQty: parseFloat(ticker.askQty),
      openPrice: parseFloat(ticker.openPrice),
      highPrice: parseFloat(ticker.highPrice),
      lowPrice: parseFloat(ticker.lowPrice),
      volume: parseFloat(ticker.volume),
      quoteVolume: parseFloat(ticker.quoteVolume),
      openTime: new Date(ticker.openTime).getTime(),
      closeTime: new Date(ticker.closeTime).getTime(),
      firstId: parseInt(ticker.firstId),
      lastId: parseInt(ticker.lastId),
      count: parseInt(ticker.count),
    })
    
    return Array.isArray(data) ? data.map(mapTicker) : mapTicker(data)
  } catch (error) {
    console.error(`Failed to fetch ticker data:`, error)
    throw error
  }
}

export const getOrderBook = async (symbol: string, limit: number = 100): Promise<OrderBook> => {
  await checkBinanceRateLimit()
  
  try {
    const response = await fetch(
      `${BINANCE_API_URL}/depth?symbol=${symbol.toUpperCase()}&limit=${limit}`
    )
    
    if (!response.ok) {
      throw new ApiClientError(
        `Binance API error: ${response.statusText}`,
        response.status,
        'BINANCE_ERROR'
      )
    }
    
    const data = await response.json()
    
    return {
      symbol: symbol.toUpperCase(),
      bids: data.bids.map((bid: [string, string]) => ({
        price: parseFloat(bid[0]),
        quantity: parseFloat(bid[1]),
      })),
      asks: data.asks.map((ask: [string, string]) => ({
        price: parseFloat(ask[0]),
        quantity: parseFloat(ask[1]),
      })),
      timestamp: new Date(),
      lastUpdateId: parseInt(data.lastUpdateId),
    }
  } catch (error) {
    console.error(`Failed to fetch order book for ${symbol}:`, error)
    throw error
  }
}

export const getRecentTrades = async (symbol: string, limit: number = 100): Promise<Trade[]> => {
  await checkBinanceRateLimit()
  
  try {
    const response = await fetch(
      `${BINANCE_API_URL}/trades?symbol=${symbol.toUpperCase()}&limit=${limit}`
    )
    
    if (!response.ok) {
      throw new ApiClientError(
        `Binance API error: ${response.statusText}`,
        response.status,
        'BINANCE_ERROR'
      )
    }
    
    const data = await response.json()
    
    return data.map((trade: any): Trade => ({
      id: trade.id,
      symbol,
      price: parseFloat(trade.price),
      quantity: parseFloat(trade.qty),
      side: trade.isBuyerMaker ? OrderBookSide.SELL : OrderBookSide.BUY,
      timestamp: new Date(trade.time),
      isBuyerMaker: trade.isBuyerMaker,
    }))
  } catch (error) {
    console.error(`Failed to fetch recent trades for ${symbol}:`, error)
    throw error
  }
}

// WebSocket subscription functions
export const subscribeToTicker = (symbol: string, onUpdate: (ticker: Ticker) => void): void => {
  const stream = `${symbol.toLowerCase()}@ticker`
  
  marketWebSocket.subscribe(stream, (data) => {
    const ticker: Ticker = {
      symbol: data.s,
      price: parseFloat(data.c),
      priceChange: parseFloat(data.P),
      priceChangePercent: parseFloat(data.p),
      weightedAvgPrice: parseFloat(data.w),
      prevClosePrice: parseFloat(data.x),
      lastQty: parseFloat(data.q),
      bidPrice: parseFloat(data.b),
      bidQty: parseFloat(data.B),
      askPrice: parseFloat(data.a),
      askQty: parseFloat(data.A),
      openPrice: parseFloat(data.o),
      highPrice: parseFloat(data.h),
      lowPrice: parseFloat(data.l),
      volume: parseFloat(data.v),
      quoteVolume: parseFloat(data.q),
      openTime: new Date(data.O).getTime(),
      closeTime: new Date(data.C).getTime(),
      firstId: parseInt(data.f),
      lastId: parseInt(data.L),
      count: parseInt(data.n),
    }
    
    onUpdate(ticker)
  })
}

export const subscribeToOrderBook = (symbol: string, onUpdate: (orderBook: OrderBook) => void): void => {
  const stream = `${symbol.toLowerCase()}@depth`
  
  marketWebSocket.subscribe(stream, (data) => {
    const orderBook: OrderBook = {
      symbol: data.s,
      bids: data.b.map((bid: [string, string]) => ({
        price: parseFloat(bid[0]),
        quantity: parseFloat(bid[1]),
      })),
      asks: data.a.map((ask: [string, string]) => ({
        price: parseFloat(ask[0]),
        quantity: parseFloat(ask[1]),
      })),
      timestamp: new Date(),
      lastUpdateId: parseInt(data.U),
    }
    
    onUpdate(orderBook)
  })
}

export const subscribeToTrades = (symbol: string, onUpdate: (trade: Trade) => void): void => {
  const stream = `${symbol.toLowerCase()}@trade`
  
  marketWebSocket.subscribe(stream, (data) => {
    const trade: Trade = {
      id: data.t,
      symbol: data.s,
      price: parseFloat(data.p),
      quantity: parseFloat(data.q),
      side: data.m ? OrderBookSide.SELL : OrderBookSide.BUY,
      timestamp: new Date(data.T),
      isBuyerMaker: data.m,
    }
    
    onUpdate(trade)
  })
}

export const unsubscribeFromSymbol = (symbol: string, type: 'ticker' | 'depth' | 'trade'): void => {
  const stream = `${symbol.toLowerCase()}@${type}`
  marketWebSocket.unsubscribe(stream)
}

// WebSocket connection management
export const connectMarketWebSocket = async (): Promise<void> => {
  if (!marketWebSocket.connected) {
    await marketWebSocket.connect()
  }
}

export const disconnectMarketWebSocket = (): void => {
  marketWebSocket.disconnect()
}

// Cancellable requests for better UX
export const getCancellableMarketData = (symbol: string) => {
  return createCancellableRequest<MarketData>(async (signal) => {
    const response = await fetch(`${API_BASE_URL}/market/data/${symbol}`, { signal })
    if (!response.ok) throw new Error('Failed to fetch market data')
    const data = await response.json()
    return data.data
  })
}

export const getCancellableChartData = (
  symbol: string, 
  interval: ChartInterval, 
  limit?: number
) => {
  return createCancellableRequest<PricePoint[]>(async (signal) => {
    return getChartData(symbol, interval, limit)
  })
}

// Export WebSocket instance for advanced usage
export { marketWebSocket as marketWS } 