/**
 * Trading Store
 * 
 * Manages trading operations, portfolio state, orders, positions,
 * price alerts, and balance calculations using Zustand.
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'
import type {
  Portfolio,
  Watchlist,
  TradingPair,
  PriceAlert,
  Order,
  Position,
  TradeHistory,
  OrderType,
  OrderSide,
  OrderStatus,
  AssetType
} from '@/types/trading'
import type { ApiResponse } from '@/types/api'

interface TradingStore {
  // State
  portfolio: Portfolio | null
  watchlists: Watchlist[]
  activeWatchlist: string | null
  tradingPairs: Record<string, TradingPair>
  priceAlerts: PriceAlert[]
  activeOrders: Order[]
  openPositions: Position[]
  tradeHistory: TradeHistory[]
  
  // UI state
  isLoading: boolean
  error: string | null
  selectedOrder: Order | null
  selectedPosition: Position | null
  
  // Actions - Portfolio
  fetchPortfolio: () => Promise<void>
  updatePortfolio: (updates: Partial<Portfolio>) => void
  calculatePortfolioValue: () => number
  calculatePnL: () => { realized: number; unrealized: number; total: number }
  
  // Actions - Watchlists
  createWatchlist: (name: string, symbols?: string[]) => Promise<void>
  deleteWatchlist: (watchlistId: string) => Promise<void>
  updateWatchlist: (watchlistId: string, updates: Partial<Watchlist>) => Promise<void>
  addSymbolToWatchlist: (watchlistId: string, symbol: string) => Promise<void>
  removeSymbolFromWatchlist: (watchlistId: string, symbol: string) => Promise<void>
  setActiveWatchlist: (watchlistId: string) => void
  
  // Actions - Trading Pairs
  fetchTradingPairs: () => Promise<void>
  getTradingPair: (symbol: string) => TradingPair | null
  
  // Actions - Price Alerts
  createPriceAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'triggeredAt' | 'triggerCount'>) => Promise<void>
  updatePriceAlert: (alertId: string, updates: Partial<PriceAlert>) => Promise<void>
  deletePriceAlert: (alertId: string) => Promise<void>
  managePriceAlerts: (symbol: string, currentPrice: number) => void
  
  // Actions - Orders
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'filledQuantity' | 'remainingQuantity'>) => Promise<void>
  cancelOrder: (orderId: string) => Promise<void>
  fetchActiveOrders: () => Promise<void>
  updateOrder: (orderId: string, updates: Partial<Order>) => void
  
  // Actions - Positions
  fetchOpenPositions: () => Promise<void>
  closePosition: (positionId: string) => Promise<void>
  updatePosition: (positionId: string, updates: Partial<Position>) => Promise<void>
  updateStopLoss: (positionId: string, stopLoss: number) => Promise<void>
  updateTakeProfit: (positionId: string, takeProfit: number) => Promise<void>
  
  // Actions - Trade History
  fetchTradeHistory: (limit?: number) => Promise<void>
  
  // Utility actions
  clearError: () => void
  refreshAll: () => Promise<void>
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const useTradingStore = create<TradingStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        portfolio: null,
        watchlists: [],
        activeWatchlist: null,
        tradingPairs: {},
        priceAlerts: [],
        activeOrders: [],
        openPositions: [],
        tradeHistory: [],
        isLoading: false,
        error: null,
        selectedOrder: null,
        selectedPosition: null,

        // Portfolio actions
        fetchPortfolio: async () => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.get<ApiResponse<Portfolio>>(
              `${API_BASE_URL}/trading/portfolio`
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.portfolio = response.data.data!
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch portfolio')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Failed to fetch portfolio'
            })
            throw error
          }
        },

        updatePortfolio: (updates: Partial<Portfolio>) => {
          set((state) => {
            if (state.portfolio) {
              state.portfolio = { ...state.portfolio, ...updates }
            }
          })
        },

        calculatePortfolioValue: () => {
          const { portfolio } = get()
          if (!portfolio) return 0

          return Object.values(portfolio.balances).reduce(
            (total, balance) => total + balance.valueInBaseCurrency,
            0
          )
        },

        calculatePnL: () => {
          const { portfolio } = get()
          if (!portfolio) return { realized: 0, unrealized: 0, total: 0 }

          const realized = portfolio.realizedPnL
          const unrealized = portfolio.unrealizedPnL
          const total = realized + unrealized

          return { realized, unrealized, total }
        },

        // Watchlist actions
        createWatchlist: async (name: string, symbols: string[] = []) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const newWatchlist: Omit<Watchlist, 'id' | 'createdAt' | 'updatedAt'> = {
              userId: '', // Will be set by backend
              name,
              symbols,
              description: '',
              isPublic: false,
              isDefault: false,
              color: '#98b5a4',
              sortOrder: get().watchlists.length,
            }

            const response = await axios.post<ApiResponse<Watchlist>>(
              `${API_BASE_URL}/trading/watchlists`,
              newWatchlist
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.watchlists.push(response.data.data!)
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to create watchlist')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Failed to create watchlist'
            })
            throw error
          }
        },

        deleteWatchlist: async (watchlistId: string) => {
          try {
            const response = await axios.delete<ApiResponse<{ message: string }>>(
              `${API_BASE_URL}/trading/watchlists/${watchlistId}`
            )

            if (response.data.success) {
              set((state) => {
                state.watchlists = state.watchlists.filter((wl: Watchlist) => wl.id !== watchlistId)
                if (state.activeWatchlist === watchlistId) {
                  state.activeWatchlist = state.watchlists[0]?.id || null
                }
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to delete watchlist')
            }
          } catch (error: any) {
            set((state) => {
              state.error = error.response?.data?.error?.message || error.message || 'Failed to delete watchlist'
            })
            throw error
          }
        },

        updateWatchlist: async (watchlistId: string, updates: Partial<Watchlist>) => {
          try {
            const response = await axios.patch<ApiResponse<Watchlist>>(
              `${API_BASE_URL}/trading/watchlists/${watchlistId}`,
              updates
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                const index = state.watchlists.findIndex((wl: Watchlist) => wl.id === watchlistId)
                if (index !== -1) {
                  state.watchlists[index] = response.data.data!
                }
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to update watchlist')
            }
          } catch (error: any) {
            set((state) => {
              state.error = error.response?.data?.error?.message || error.message || 'Failed to update watchlist'
            })
            throw error
          }
        },

        addSymbolToWatchlist: async (watchlistId: string, symbol: string) => {
          const watchlist = get().watchlists.find(wl => wl.id === watchlistId)
          if (!watchlist || watchlist.symbols.includes(symbol)) return

          const updatedSymbols = [...watchlist.symbols, symbol]
          await get().updateWatchlist(watchlistId, { symbols: updatedSymbols })
        },

        removeSymbolFromWatchlist: async (watchlistId: string, symbol: string) => {
          const watchlist = get().watchlists.find(wl => wl.id === watchlistId)
          if (!watchlist) return

          const updatedSymbols = watchlist.symbols.filter(s => s !== symbol)
          await get().updateWatchlist(watchlistId, { symbols: updatedSymbols })
        },

        setActiveWatchlist: (watchlistId: string) => {
          set((state) => {
            state.activeWatchlist = watchlistId
          })
        },

        // Trading pairs actions
        fetchTradingPairs: async () => {
          try {
            const response = await axios.get<ApiResponse<TradingPair[]>>(
              `${API_BASE_URL}/trading/pairs`
            )

            if (response.data.success && response.data.data) {
              const pairs = response.data.data.reduce((acc, pair) => {
                acc[pair.symbol] = pair
                return acc
              }, {} as Record<string, TradingPair>)

              set((state) => {
                state.tradingPairs = pairs
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch trading pairs')
            }
          } catch (error: any) {
            console.error('Failed to fetch trading pairs:', error)
          }
        },

        getTradingPair: (symbol: string) => {
          return get().tradingPairs[symbol] || null
        },

        // Price alerts actions
        createPriceAlert: async (alertData) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.post<ApiResponse<PriceAlert>>(
              `${API_BASE_URL}/trading/alerts`,
              alertData
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.priceAlerts.push(response.data.data!)
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to create price alert')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Failed to create price alert'
            })
            throw error
          }
        },

        updatePriceAlert: async (alertId: string, updates: Partial<PriceAlert>) => {
          try {
            const response = await axios.patch<ApiResponse<PriceAlert>>(
              `${API_BASE_URL}/trading/alerts/${alertId}`,
              updates
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                const index = state.priceAlerts.findIndex((alert: PriceAlert) => alert.id === alertId)
                if (index !== -1) {
                  state.priceAlerts[index] = response.data.data!
                }
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to update price alert')
            }
          } catch (error: any) {
            set((state) => {
              state.error = error.response?.data?.error?.message || error.message || 'Failed to update price alert'
            })
            throw error
          }
        },

        deletePriceAlert: async (alertId: string) => {
          try {
            const response = await axios.delete<ApiResponse<{ message: string }>>(
              `${API_BASE_URL}/trading/alerts/${alertId}`
            )

            if (response.data.success) {
              set((state) => {
                state.priceAlerts = state.priceAlerts.filter((alert: PriceAlert) => alert.id !== alertId)
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to delete price alert')
            }
          } catch (error: any) {
            set((state) => {
              state.error = error.response?.data?.error?.message || error.message || 'Failed to delete price alert'
            })
            throw error
          }
        },

        managePriceAlerts: (symbol: string, currentPrice: number) => {
          const { priceAlerts } = get()
          
          priceAlerts.forEach((alert) => {
            if (alert.symbol !== symbol || !alert.isActive || alert.isTriggered) return

            let shouldTrigger = false

            switch (alert.condition) {
              case 'ABOVE':
                shouldTrigger = currentPrice >= alert.targetPrice
                break
              case 'BELOW':
                shouldTrigger = currentPrice <= alert.targetPrice
                break
              case 'CROSSES_ABOVE':
                shouldTrigger = currentPrice >= alert.targetPrice && (alert.basePrice || 0) < alert.targetPrice
                break
              case 'CROSSES_BELOW':
                shouldTrigger = currentPrice <= alert.targetPrice && (alert.basePrice || 0) > alert.targetPrice
                break
              case 'PERCENT_CHANGE':
                if (alert.basePrice && alert.percentChange) {
                  const change = ((currentPrice - alert.basePrice) / alert.basePrice) * 100
                  shouldTrigger = Math.abs(change) >= Math.abs(alert.percentChange)
                }
                break
            }

            if (shouldTrigger) {
              // Update alert as triggered
              get().updatePriceAlert(alert.id, {
                isTriggered: true,
                triggeredAt: new Date(),
                triggerCount: alert.triggerCount + 1,
              })
            }
          })
        },

        // Order actions
        placeOrder: async (orderData) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.post<ApiResponse<Order>>(
              `${API_BASE_URL}/trading/orders`,
              orderData
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.activeOrders.push(response.data.data!)
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to place order')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Failed to place order'
            })
            throw error
          }
        },

        cancelOrder: async (orderId: string) => {
          try {
            const response = await axios.delete<ApiResponse<{ message: string }>>(
              `${API_BASE_URL}/trading/orders/${orderId}`
            )

            if (response.data.success) {
              set((state) => {
                const index = state.activeOrders.findIndex((order: Order) => order.id === orderId)
                if (index !== -1) {
                  state.activeOrders[index].status = 'CANCELLED' as OrderStatus
                }
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to cancel order')
            }
          } catch (error: any) {
            set((state) => {
              state.error = error.response?.data?.error?.message || error.message || 'Failed to cancel order'
            })
            throw error
          }
        },

        fetchActiveOrders: async () => {
          try {
            const response = await axios.get<ApiResponse<Order[]>>(
              `${API_BASE_URL}/trading/orders`
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.activeOrders = response.data.data!
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch orders')
            }
          } catch (error: any) {
            console.error('Failed to fetch orders:', error)
          }
        },

        updateOrder: (orderId: string, updates: Partial<Order>) => {
          set((state) => {
            const index = state.activeOrders.findIndex((order: Order) => order.id === orderId)
            if (index !== -1) {
              state.activeOrders[index] = { ...state.activeOrders[index], ...updates }
            }
          })
        },

        // Position actions
        fetchOpenPositions: async () => {
          try {
            const response = await axios.get<ApiResponse<Position[]>>(
              `${API_BASE_URL}/trading/positions`
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.openPositions = response.data.data!
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch positions')
            }
          } catch (error: any) {
            console.error('Failed to fetch positions:', error)
          }
        },

        closePosition: async (positionId: string) => {
          try {
            const response = await axios.post<ApiResponse<{ message: string }>>(
              `${API_BASE_URL}/trading/positions/${positionId}/close`
            )

            if (response.data.success) {
              set((state) => {
                state.openPositions = state.openPositions.filter((pos: Position) => pos.id !== positionId)
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to close position')
            }
          } catch (error: any) {
            set((state) => {
              state.error = error.response?.data?.error?.message || error.message || 'Failed to close position'
            })
            throw error
          }
        },

        updatePosition: async (positionId: string, updates: Partial<Position>) => {
          try {
            const response = await axios.patch<ApiResponse<Position>>(
              `${API_BASE_URL}/trading/positions/${positionId}`,
              updates
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                const index = state.openPositions.findIndex((pos: Position) => pos.id === positionId)
                if (index !== -1) {
                  state.openPositions[index] = response.data.data!
                }
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to update position')
            }
          } catch (error: any) {
            set((state) => {
              state.error = error.response?.data?.error?.message || error.message || 'Failed to update position'
            })
            throw error
          }
        },

        updateStopLoss: async (positionId: string, stopLoss: number) => {
          await get().updatePosition(positionId, { stopLoss })
        },

        updateTakeProfit: async (positionId: string, takeProfit: number) => {
          await get().updatePosition(positionId, { takeProfit })
        },

        // Trade history actions
        fetchTradeHistory: async (limit = 100) => {
          try {
            const response = await axios.get<ApiResponse<TradeHistory[]>>(
              `${API_BASE_URL}/trading/history`,
              { params: { limit } }
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.tradeHistory = response.data.data!
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch trade history')
            }
          } catch (error: any) {
            console.error('Failed to fetch trade history:', error)
          }
        },

        // Utility actions
        clearError: () => {
          set((state) => {
            state.error = null
          })
        },

        refreshAll: async () => {
          const promises = [
            get().fetchPortfolio(),
            get().fetchTradingPairs(),
            get().fetchActiveOrders(),
            get().fetchOpenPositions(),
            get().fetchTradeHistory(),
          ]

          await Promise.allSettled(promises)
        },
      })),
      {
        name: 'trading-storage',
        partialize: (state) => ({
          watchlists: state.watchlists,
          activeWatchlist: state.activeWatchlist,
          priceAlerts: state.priceAlerts,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Fetch initial data
            state.refreshAll()
          }
        },
      }
    ),
    {
      name: 'trading-store',
    }
  )
) 