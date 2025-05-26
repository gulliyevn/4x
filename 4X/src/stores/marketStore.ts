/**
 * Market Data Store
 * 
 * Manages market data state, symbol selection, watchlists,
 * price history, and real-time WebSocket connections using Zustand.
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'
import type {
  MarketData,
  Symbol,
  Ticker,
  ChartInterval,
  PricePoint,
  OrderBook,
  Trade
} from '@/types/market'
import type { ApiResponse, WebSocketMessage, WebSocketState } from '@/types/api'

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

  // WebSocket connection
  ws: WebSocket | null
  wsSubscriptions: Set<string>
  reconnectAttempts: number
  maxReconnectAttempts: number

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
  
  // Utility actions
  clearError: () => void
  refreshData: () => Promise<void>
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'

export const useMarketStore = create<MarketStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        selectedSymbol: null,
        marketData: {},
        symbols: [],
        watchlist: ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'], // Default watchlist
        priceHistory: {},
        orderBooks: {},
        recentTrades: {},
        tickers: {},
        isLoading: false,
        isConnected: false,
        wsState: 'DISCONNECTED' as WebSocketState,
        error: null,
        lastUpdate: null,
        
        // WebSocket state
        ws: null,
        wsSubscriptions: new Set(),
        reconnectAttempts: 0,
        maxReconnectAttempts: 5,

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
          const { ws, wsState } = get()
          
          if (ws && wsState === 'CONNECTED') {
            return // Already connected
          }

          set((state) => {
            state.wsState = 'CONNECTING'
            state.error = null
          })

          try {
            const websocket = new WebSocket(`${WS_URL}/market`)
            
            websocket.onopen = () => {
              console.log('WebSocket connected')
              set((state) => {
                state.ws = websocket
                state.wsState = 'CONNECTED'
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
                state.wsState = 'ERROR'
                state.error = 'WebSocket connection error'
              })
            }

            websocket.onclose = () => {
              console.log('WebSocket disconnected')
              set((state) => {
                state.ws = null
                state.wsState = 'DISCONNECTED'
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
              state.wsState = 'ERROR'
              state.error = 'Failed to create WebSocket connection'
            })
          }
        },

        disconnectWebSocket: () => {
          const { ws } = get()
          if (ws) {
            ws.close()
            set((state) => {
              state.ws = null
              state.wsState = 'DISCONNECTED'
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
      })),
      {
        name: 'market-storage',
        partialize: (state) => ({
          selectedSymbol: state.selectedSymbol,
          watchlist: state.watchlist,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Auto-connect WebSocket on app initialization
            state.connectWebSocket()
            
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

// Auto-connect WebSocket when store is created
setTimeout(() => {
  useMarketStore.getState().connectWebSocket()
}, 1000) 