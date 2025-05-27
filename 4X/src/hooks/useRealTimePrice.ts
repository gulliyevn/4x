'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface PriceData {
  symbol: string
  price: number
  previousPrice: number
  timestamp: number
  volume?: number
  change?: number
  changePercent?: number
}

interface UseRealTimePriceOptions {
  symbol: string
  enabled?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
  fallbackToRest?: boolean
}

interface UseRealTimePriceReturn {
  price: PriceData | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  subscribe: () => void
  unsubscribe: () => void
  reconnect: () => void
}

// Mock WebSocket for demo mode
class MockWebSocket {
  private callbacks: { [key: string]: Function[] } = {}
  private interval: NodeJS.Timeout | null = null
  private isOpen = false
  public readyState: number = 0 // WebSocket.CONNECTING

  constructor(private symbol: string) {
    this.readyState = 0 // WebSocket.CONNECTING
    // Simulate connection delay
    setTimeout(() => {
      this.isOpen = true
      this.readyState = 1 // WebSocket.OPEN
      this.emit('open')
      this.startPriceUpdates()
    }, 1000)
  }

  addEventListener(event: string, callback: Function) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = []
    }
    this.callbacks[event].push(callback)
  }

  removeEventListener(event: string, callback: Function) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback)
    }
  }

  close() {
    this.isOpen = false
    this.readyState = 3 // WebSocket.CLOSED
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.emit('close')
  }

  private emit(event: string, data?: any) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(data))
    }
  }

  private startPriceUpdates() {
    let basePrice = 1.2345 // Base EUR/USD price
    let previousPrice = basePrice

    this.interval = setInterval(() => {
      if (!this.isOpen) return

      // Generate realistic price movement
      const volatility = 0.001 // 0.1% volatility
      const change = (Math.random() - 0.5) * 2 * volatility
      const newPrice = basePrice * (1 + change)
      
      const priceData: PriceData = {
        symbol: this.symbol,
        price: Number(newPrice.toFixed(5)),
        previousPrice: Number(previousPrice.toFixed(5)),
        timestamp: Date.now(),
        volume: Math.floor(Math.random() * 1000000),
        change: newPrice - previousPrice,
        changePercent: ((newPrice - previousPrice) / previousPrice) * 100
      }

      this.emit('message', { data: JSON.stringify(priceData) })
      
      previousPrice = basePrice
      basePrice = newPrice
    }, 1000 + Math.random() * 2000) // Random interval between 1-3 seconds
  }
}

export const useRealTimePrice = ({
  symbol,
  enabled = true,
  reconnectInterval = 5000,
  maxReconnectAttempts = 5,
  fallbackToRest = true
}: UseRealTimePriceOptions): UseRealTimePriceReturn => {
  const [price, setPrice] = useState<PriceData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const wsRef = useRef<MockWebSocket | WebSocket | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isSubscribedRef = useRef(false)

  // Generate mock price data for demo mode
  const generateMockPrice = useCallback((): PriceData => {
    const basePrice = 1.2345
    const volatility = 0.001
    const change = (Math.random() - 0.5) * 2 * volatility
    const newPrice = basePrice * (1 + change)
    
    return {
      symbol,
      price: Number(newPrice.toFixed(5)),
      previousPrice: price?.price || basePrice,
      timestamp: Date.now(),
      volume: Math.floor(Math.random() * 1000000),
      change: price ? newPrice - price.price : 0,
      changePercent: price ? ((newPrice - price.price) / price.price) * 100 : 0
    }
  }, [symbol, price])

  // Fallback to REST API
  const fetchPriceFromRest = useCallback(async () => {
    try {
      // In demo mode, generate mock data
      if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
        const mockPrice = generateMockPrice()
        setPrice(mockPrice)
        return
      }

      // In production, this would be a real API call
      const response = await fetch(`/api/prices/${symbol}`)
      if (!response.ok) throw new Error('Failed to fetch price')
      
      const data = await response.json()
      setPrice(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price')
    }
  }, [symbol, generateMockPrice])

  // WebSocket connection
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    setIsConnecting(true)
    setError(null)

    try {
      // Use mock WebSocket in demo mode
      if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
        wsRef.current = new MockWebSocket(symbol)
      } else {
        // In production, use real WebSocket
        wsRef.current = new WebSocket(`wss://api.example.com/ws/prices/${symbol}`)
      }

      const ws = wsRef.current

      ws.addEventListener('open', () => {
        setIsConnected(true)
        setIsConnecting(false)
        setError(null)
        reconnectAttemptsRef.current = 0
      })

      ws.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data)
          setPrice(data)
        } catch (err) {
          console.error('Failed to parse price data:', err)
        }
      })

      ws.addEventListener('close', () => {
        setIsConnected(false)
        setIsConnecting(false)
        
        // Attempt reconnection if subscribed and under max attempts
        if (isSubscribedRef.current && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, reconnectInterval)
        } else if (fallbackToRest) {
          // Fallback to REST API
          fetchPriceFromRest()
        }
      })

      ws.addEventListener('error', (event) => {
        setError('WebSocket connection error')
        setIsConnecting(false)
        
        if (fallbackToRest) {
          fetchPriceFromRest()
        }
      })

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed')
      setIsConnecting(false)
      
      if (fallbackToRest) {
        fetchPriceFromRest()
      }
    }
  }, [symbol, maxReconnectAttempts, reconnectInterval, fallbackToRest, fetchPriceFromRest])

  // Subscribe to price updates
  const subscribe = useCallback(() => {
    isSubscribedRef.current = true
    if (enabled) {
      connect()
    }
  }, [enabled, connect])

  // Unsubscribe from price updates
  const unsubscribe = useCallback(() => {
    isSubscribedRef.current = false
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    setIsConnected(false)
    setIsConnecting(false)
  }, [])

  // Manual reconnect
  const reconnect = useCallback(() => {
    unsubscribe()
    setTimeout(() => {
      if (isSubscribedRef.current) {
        subscribe()
      }
    }, 100)
  }, [subscribe, unsubscribe])

  // Auto-subscribe on mount if enabled
  useEffect(() => {
    if (enabled) {
      subscribe()
    }

    return () => {
      unsubscribe()
    }
  }, [enabled, subscribe, unsubscribe])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unsubscribe()
    }
  }, [unsubscribe])

  return {
    price,
    isConnected,
    isConnecting,
    error,
    subscribe,
    unsubscribe,
    reconnect
  }
}

export default useRealTimePrice 