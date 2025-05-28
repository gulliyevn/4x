/**
 * Market Data Store
 * 
 * Manages market data state, symbol selection, watchlists,
 * price history, and real-time WebSocket connections using Zustand.
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'
import type { MarketData, PricePoint, Ticker, Symbol, OrderBook, Trade, ChartInterval, SymbolStatus } from '@/types/market'
import type { ApiResponse, WebSocketMessage } from '@/types/api'
import { WebSocketState } from '@/types/api'

interface PriceChangeAnimation {
  symbol: string
  direction: 'up' | 'down' | 'neutral'
  timestamp: number
}

interface MarketStore {
  // State
  selectedSymbol: string | null
  marketData: Record<string, MarketData>
  symbols: Symbol[]
  watchlist: string[]
  priceHistory: Record<string, Record<ChartInterval, PricePoint[]>>
  orderBooks: Record<string, OrderBook>
  recentTrades: Record<string, Trade[]>
  tickers: Record<string, Ticker>
  isLoading: boolean
  isConnected: boolean
  wsState: WebSocketState
  error: string | null
  lastUpdate: Date | null

  // Real-time features
  priceChangeAnimations: Record<string, PriceChangeAnimation>
  batchUpdateQueue: { symbol: string; data: MarketData }[]
  batchUpdateTimer: NodeJS.Timeout | null
  connectionQuality: 'excellent' | 'good' | 'poor' | 'disconnected'
  latency: number

  // WebSocket connection
  ws: WebSocket | null
  wsSubscriptions: Set<string>
  reconnectAttempts: number
  maxReconnectAttempts: number

  // Demo mode
  demoMode: boolean
  demoIntervals: Record<string, NodeJS.Timeout>

  // Actions
  setSelectedSymbol: (symbol: string) => void
  fetchMarketData: (symbol: string) => Promise<void>
  fetchSymbols: () => Promise<void>
  fetchPriceHistory: (symbol: string, interval: ChartInterval, limit?: number) => Promise<void>
  addToWatchlist: (symbol: string) => void
  removeFromWatchlist: (symbol: string) => void
  clearWatchlist: () => void
  
  // WebSocket actions
  connectWebSocket: () => void
  disconnectWebSocket: () => void
  subscribeToSymbol: (symbol: string) => void
  unsubscribeFromSymbol: (symbol: string) => void
  subscribeToOrderBook: (symbol: string) => void
  subscribeToTrades: (symbol: string) => void
  
  // Real-time actions
  triggerPriceAnimation: (symbol: string, direction: 'up' | 'down' | 'neutral') => void
  clearPriceAnimation: (symbol: string) => void
  batchUpdateMarketData: (updates: { symbol: string; data: MarketData }[]) => void
  processBatchUpdates: () => void
  updateConnectionQuality: () => void
  
  // Demo mode actions
  startDemoMode: () => void
  stopDemoMode: () => void
  generateDemoPrice: (symbol: string) => MarketData
  
  // Utility actions
  clearError: () => void
  refreshData: () => Promise<void>

  initializeMarketData: (data: Record<string, MarketData>) => void
  updateMarketData: (symbol: string, data: MarketData) => void
  updateMultipleMarketData: (updates: { symbol: string; data: MarketData }[]) => void
  
  setSymbols: (symbols: Symbol[]) => void
  setTickers: (tickers: Record<string, Ticker>) => void
  updateTicker: (symbol: string, ticker: Ticker) => void
  
  setPriceHistory: (symbol: string, history: PricePoint[]) => void
  appendPricePoint: (symbol: string, point: PricePoint) => void
  
  setLoading: (isLoading: boolean) => void
  reset: () => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// Demo data for symbols
const DEMO_SYMBOLS: Symbol[] = [
  { 
    symbol: 'EURUSD', 
    baseAsset: 'EUR', 
    quoteAsset: 'USD', 
    name: 'Euro/US Dollar',
    status: 'TRADING' as SymbolStatus,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 8,
    pricePrecision: 5,
    quantityPrecision: 8,
    minOrderQty: 0.01,
    maxOrderQty: 1000000,
    stepSize: 0.01,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.00001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  { 
    symbol: 'GBPUSD', 
    baseAsset: 'GBP', 
    quoteAsset: 'USD', 
    name: 'British Pound/US Dollar',
    status: 'TRADING' as SymbolStatus,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 8,
    pricePrecision: 5,
    quantityPrecision: 8,
    minOrderQty: 0.01,
    maxOrderQty: 1000000,
    stepSize: 0.01,
    minNotional: 10,
    maxNotional: 1000000,
    tickSize: 0.00001,
    marginTradingAllowed: true,
    spotTradingAllowed: true,
    category: 'Forex',
    isActive: true
  },
  { 
    symbol: 'BTCUSD', 
    baseAsset: 'BTC', 
    quoteAsset: 'USD', 
    name: 'Bitcoin/US Dollar',
    status: 'TRADING' as SymbolStatus,
    baseAssetPrecision: 8,
    quoteAssetPrecision: 8,
    pricePrecision: 2,
    quantityPrecision: 8,
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
]

export const useMarketStore = create<MarketStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        selectedSymbol: null,
        marketData: {},
        symbols: DEMO_MODE ? DEMO_SYMBOLS : [],
        watchlist: ['EURUSD', 'GBPUSD', 'BTCUSD'], // Default watchlist
        priceHistory: {},
        orderBooks: {},
        recentTrades: {},
        tickers: {},
        isLoading: false,
        isConnected: DEMO_MODE,
        wsState: DEMO_MODE ? WebSocketState.CONNECTED : WebSocketState.DISCONNECTED,
        error: null,
        lastUpdate: null,
        
        // Real-time features
        priceChangeAnimations: {},
        batchUpdateQueue: [],
        batchUpdateTimer: null,
        connectionQuality: DEMO_MODE ? 'excellent' : 'disconnected',
        latency: 0,
        
        // WebSocket state
        ws: null,
        wsSubscriptions: new Set(),
        reconnectAttempts: 0,
        maxReconnectAttempts: 5,

        // Demo mode
        demoMode: DEMO_MODE,
        demoIntervals: {},

        // Actions
        setSelectedSymbol: (symbol: string) => {
          set((state) => {
            if (state.selectedSymbol) {
              // Unsubscribe from previous symbol
              get().unsubscribeFromSymbol(state.selectedSymbol)
            }
            
            state.selectedSymbol = symbol
            
            // Subscribe to new symbol
            get().subscribeToSymbol(symbol)
            get().subscribeToOrderBook(symbol)
            get().subscribeToTrades(symbol)
          })
        },

        fetchMarketData: async (symbol: string) => {
          if (DEMO_MODE) {
            // Generate demo data
            const demoData = get().generateDemoPrice(symbol)
            set((state) => {
              state.marketData[symbol] = demoData
              state.lastUpdate = new Date()
            })
            return
          }

          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.get<ApiResponse<MarketData>>(
              `${API_BASE_URL}/market/data/${symbol}`
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.marketData[symbol] = response.data.data!
                state.lastUpdate = new Date()
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch market data')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Failed to fetch market data'
            })
            throw error
          }
        },

        fetchSymbols: async () => {
          if (DEMO_MODE) {
            set((state) => {
              state.symbols = DEMO_SYMBOLS
            })
            return
          }

          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.get<ApiResponse<Symbol[]>>(
              `${API_BASE_URL}/market/symbols`
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.symbols = response.data.data!
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch symbols')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Failed to fetch symbols'
            })
            throw error
          }
        },

        fetchPriceHistory: async (symbol: string, interval: ChartInterval, limit = 500) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.get<ApiResponse<PricePoint[]>>(
              `${API_BASE_URL}/market/history/${symbol}`,
              {
                params: { interval, limit }
              }
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                if (!state.priceHistory[symbol]) {
                  state.priceHistory[symbol] = {} as Record<ChartInterval, PricePoint[]>
                }
                state.priceHistory[symbol][interval] = response.data.data!
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch price history')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Failed to fetch price history'
            })
            throw error
          }
        },

        addToWatchlist: (symbol: string) => {
          set((state) => {
            if (!state.watchlist.includes(symbol)) {
              state.watchlist.push(symbol)
              // Subscribe to real-time updates for watchlist items
              get().subscribeToSymbol(symbol)
            }
          })
        },

        removeFromWatchlist: (symbol: string) => {
          set((state) => {
            const index = state.watchlist.indexOf(symbol)
            if (index !== -1) {
              state.watchlist.splice(index, 1)
              // Unsubscribe if not the selected symbol
              if (state.selectedSymbol !== symbol) {
                get().unsubscribeFromSymbol(symbol)
              }
            }
          })
        },

        clearWatchlist: () => {
          set((state) => {
            // Unsubscribe from all watchlist symbols except selected
            state.watchlist.forEach((symbol: string) => {
              if (symbol !== state.selectedSymbol) {
                get().unsubscribeFromSymbol(symbol)
              }
            })
            state.watchlist = []
          })
        },

        // WebSocket actions
        connectWebSocket: () => {
          // Skip WebSocket connection in demo mode
          if (DEMO_MODE) {
            set((state) => {
              state.wsState = WebSocketState.CONNECTED
              state.isConnected = true
              state.connectionQuality = 'excellent'
            })
            return
          }

          const { ws, wsState } = get()
          
          if (ws && wsState === WebSocketState.CONNECTED) {
            return // Already connected
          }

          set((state) => {
            state.wsState = WebSocketState.CONNECTING
            state.error = null
          })

          try {
            const websocket = new WebSocket(`${WS_URL}/market`)
            
            websocket.onopen = () => {
              set((state) => {
                state.ws = websocket
                state.wsState = WebSocketState.CONNECTED
                state.isConnected = true
                state.reconnectAttempts = 0
                state.error = null
              })

              // Resubscribe to existing subscriptions
              const { watchlist, selectedSymbol } = get()
              watchlist.forEach(symbol => get().subscribeToSymbol(symbol))
              if (selectedSymbol) {
                get().subscribeToOrderBook(selectedSymbol)
                get().subscribeToTrades(selectedSymbol)
              }
            }

            websocket.onmessage = (event) => {
              try {
                const message: WebSocketMessage = JSON.parse(event.data)
                handleWebSocketMessage(message)
              } catch (error) {
                console.error('Failed to parse WebSocket message:', error)
              }
            }

            websocket.onerror = (error) => {
              console.error('WebSocket error:', error)
              set((state) => {
                state.wsState = WebSocketState.ERROR
                state.error = 'WebSocket connection error'
              })
            }

            websocket.onclose = () => {
              set((state) => {
                state.ws = null
                state.wsState = WebSocketState.DISCONNECTED
                state.isConnected = false
              })

              // Attempt reconnection
              const { reconnectAttempts, maxReconnectAttempts } = get()
              if (reconnectAttempts < maxReconnectAttempts) {
                set((state) => {
                  state.reconnectAttempts += 1
                })
                
                setTimeout(() => {
                  get().connectWebSocket()
                }, Math.pow(2, reconnectAttempts) * 1000) // Exponential backoff
              }
            }

          } catch (error) {
            console.error('Failed to create WebSocket connection:', error)
            set((state) => {
              state.wsState = WebSocketState.ERROR
              state.error = error instanceof Error ? error.message : 'Failed to create WebSocket connection'
            })
          }
        },

        disconnectWebSocket: () => {
          const { ws } = get()
          if (ws) {
            ws.close()
            set((state) => {
              state.ws = null
              state.wsState = WebSocketState.DISCONNECTED
              state.isConnected = false
              state.wsSubscriptions.clear()
            })
          }
        },

        subscribeToSymbol: (symbol: string) => {
          const { ws, wsSubscriptions } = get()
          if (ws && ws.readyState === WebSocket.OPEN && !wsSubscriptions.has(`ticker:${symbol}`)) {
            ws.send(JSON.stringify({
              type: 'subscribe',
              channel: 'ticker',
              symbol
            }))
            
            set((state) => {
              state.wsSubscriptions.add(`ticker:${symbol}`)
            })
          }
        },

        unsubscribeFromSymbol: (symbol: string) => {
          const { ws, wsSubscriptions } = get()
          if (ws && ws.readyState === WebSocket.OPEN && wsSubscriptions.has(`ticker:${symbol}`)) {
            ws.send(JSON.stringify({
              type: 'unsubscribe',
              channel: 'ticker',
              symbol
            }))
            
            set((state) => {
              state.wsSubscriptions.delete(`ticker:${symbol}`)
            })
          }
        },

        subscribeToOrderBook: (symbol: string) => {
          const { ws, wsSubscriptions } = get()
          if (ws && ws.readyState === WebSocket.OPEN && !wsSubscriptions.has(`orderbook:${symbol}`)) {
            ws.send(JSON.stringify({
              type: 'subscribe',
              channel: 'orderbook',
              symbol
            }))
            
            set((state) => {
              state.wsSubscriptions.add(`orderbook:${symbol}`)
            })
          }
        },

        subscribeToTrades: (symbol: string) => {
          const { ws, wsSubscriptions } = get()
          if (ws && ws.readyState === WebSocket.OPEN && !wsSubscriptions.has(`trades:${symbol}`)) {
            ws.send(JSON.stringify({
              type: 'subscribe',
              channel: 'trades',
              symbol
            }))
            
            set((state) => {
              state.wsSubscriptions.add(`trades:${symbol}`)
            })
          }
        },

        clearError: () => {
          set((state) => {
            state.error = null
          })
        },

        refreshData: async () => {
          const { watchlist, selectedSymbol } = get()
          
          // Refresh symbols list
          await get().fetchSymbols()
          
          // Refresh market data for watchlist
          const promises = watchlist.map(symbol => get().fetchMarketData(symbol))
          if (selectedSymbol && !watchlist.includes(selectedSymbol)) {
            promises.push(get().fetchMarketData(selectedSymbol))
          }
          
          await Promise.allSettled(promises)
        },

        initializeMarketData: (data) => set({ marketData: data }),

        updateMarketData: (symbol, data) => set((state) => ({
          marketData: {
            ...state.marketData,
            [symbol]: data,
          },
        })),

        updateMultipleMarketData: (updates) => set((state) => ({
          marketData: updates.reduce(
            (acc, { symbol, data }) => ({
              ...acc,
              [symbol]: data,
            }),
            state.marketData
          ),
        })),

        setSymbols: (symbols) => set({ symbols }),

        setTickers: (tickers) => set({ tickers }),

        updateTicker: (symbol, ticker) => set((state) => ({
          tickers: {
            ...state.tickers,
            [symbol]: ticker,
          },
        })),

        setPriceHistory: (symbol, history) => set((state) => {
          if (!state.priceHistory[symbol]) {
            state.priceHistory[symbol] = {} as Record<ChartInterval, PricePoint[]>
          }
          state.priceHistory[symbol]['1d' as ChartInterval] = history
        }),

        appendPricePoint: (symbol, point) => set((state) => {
          if (!state.priceHistory[symbol]) {
            state.priceHistory[symbol] = {} as Record<ChartInterval, PricePoint[]>
          }
          if (!state.priceHistory[symbol]['1d' as ChartInterval]) {
            state.priceHistory[symbol]['1d' as ChartInterval] = []
          }
          state.priceHistory[symbol]['1d' as ChartInterval].push(point)
        }),

        setLoading: (isLoading) => set({ isLoading }),
        reset: () => set({
          symbols: [],
          marketData: {},
          tickers: {},
          priceHistory: {},
          selectedSymbol: null,
          isLoading: false,
          error: null,
        }),

        // Real-time actions
        triggerPriceAnimation: (symbol: string, direction: 'up' | 'down' | 'neutral') => {
          set((state) => {
            state.priceChangeAnimations[symbol] = {
              symbol,
              direction,
              timestamp: Date.now(),
            }
          })
        },
        clearPriceAnimation: (symbol: string) => {
          set((state) => {
            delete state.priceChangeAnimations[symbol]
          })
        },
        batchUpdateMarketData: (updates) => {
          set((state) => {
            state.batchUpdateQueue = [...state.batchUpdateQueue, ...updates]
          })
        },
        processBatchUpdates: () => {
          const { batchUpdateQueue } = get()
          if (batchUpdateQueue.length === 0) return
          
          set((state) => {
            state.batchUpdateQueue = []
            batchUpdateQueue.forEach(({ symbol, data }) => {
              state.marketData[symbol] = data
            })
          })
        },
        updateConnectionQuality: () => {
          set((state) => {
            state.connectionQuality = 'excellent'
          })
        },
        
        // Demo mode actions
        startDemoMode: () => {
          set((state) => {
            state.demoMode = true
          })
        },
        stopDemoMode: () => {
          set((state) => {
            state.demoMode = false
          })
        },
        generateDemoPrice: (symbol: string): MarketData => {
          const basePrice = symbol.includes('USD') ? 1.2345 : 50000
          const volatility = 0.001
          const change = (Math.random() - 0.5) * 2 * volatility
          const price = basePrice * (1 + change)
          const prevPrice = basePrice
          
          return {
            symbol,
            price: Number(price.toFixed(5)),
            prevPrice: Number(prevPrice.toFixed(5)),
            change24h: price - prevPrice,
            changePercent24h: ((price - prevPrice) / prevPrice) * 100,
            high24h: price * 1.02,
            low24h: price * 0.98,
            volume24h: Math.floor(Math.random() * 1000000),
            quoteVolume24h: Math.floor(Math.random() * 1000000),
            bidPrice: price * 0.9999,
            askPrice: price * 1.0001,
            spread: price * 0.0002,
            timestamp: new Date(),
            tradeCount24h: Math.floor(Math.random() * 10000),
            isMarketOpen: true,
          }
        },
      })),
      {
        name: 'market-storage',
        partialize: (state) => ({
          selectedSymbol: state.selectedSymbol,
          watchlist: state.watchlist,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Auto-connect WebSocket on app initialization (only in production mode)
            if (!DEMO_MODE) {
              state.connectWebSocket()
            }
            
            // Fetch initial data
            state.fetchSymbols()
            state.refreshData()
          }
        },
      }
    ),
    {
      name: 'market-store',
    }
  )
)

// WebSocket message handler
const handleWebSocketMessage = (message: WebSocketMessage) => {
  const { type, data, channel } = message

  if (type === 'ticker' && channel === 'ticker') {
    const ticker = data as Ticker
    useMarketStore.setState((state) => {
      state.tickers[ticker.symbol] = ticker
      
      // Update market data if exists
      if (state.marketData[ticker.symbol]) {
        state.marketData[ticker.symbol] = {
          ...state.marketData[ticker.symbol],
          price: ticker.price,
          prevPrice: ticker.prevClosePrice,
          change24h: ticker.priceChange,
          changePercent24h: ticker.priceChangePercent,
          high24h: ticker.highPrice,
          low24h: ticker.lowPrice,
          volume24h: ticker.volume,
          timestamp: new Date(),
        }
      }
      
      state.lastUpdate = new Date()
    })
  } else if (type === 'orderbook' && channel === 'orderbook') {
    const orderBook = data as OrderBook
    useMarketStore.setState((state) => {
      state.orderBooks[orderBook.symbol] = orderBook
      state.lastUpdate = new Date()
    })
  } else if (type === 'trade' && channel === 'trades') {
    const trade = data as Trade
    useMarketStore.setState((state) => {
      if (!state.recentTrades[trade.symbol]) {
        state.recentTrades[trade.symbol] = []
      }
      
      // Add new trade to the beginning and keep only last 100 trades
      state.recentTrades[trade.symbol].unshift(trade)
      if (state.recentTrades[trade.symbol].length > 100) {
        state.recentTrades[trade.symbol] = state.recentTrades[trade.symbol].slice(0, 100)
      }
      
      state.lastUpdate = new Date()
    })
  }
}

// Auto-connect WebSocket when store is created (only in production mode)
if (!DEMO_MODE) {
  setTimeout(() => {
    useMarketStore.getState().connectWebSocket()
  }, 1000)
} 