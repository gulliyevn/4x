import { create } from 'zustand'
import type { Portfolio, Position, Trade } from '@/types/trading'

interface PortfolioStore {
  portfolio: Portfolio | null
  positions: Position[]
  recentTrades: Trade[]
  isLoading: boolean
  error: string | null
  
  initializePortfolio: (data: { 
    portfolio: Portfolio
    positions: Position[]
    trades: Trade[]
  }) => void
  
  updatePortfolio: (portfolio: Portfolio) => void
  updatePositions: (positions: Position[]) => void
  updateRecentTrades: (trades: Trade[]) => void
  
  addPosition: (position: Position) => void
  removePosition: (positionId: string) => void
  updatePosition: (positionId: string, updates: Partial<Position>) => void
  
  addTrade: (trade: Trade) => void
  clearTrades: () => void
  
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolio: null,
  positions: [],
  recentTrades: [],
  isLoading: false,
  error: null,

  initializePortfolio: (data) => set({
    portfolio: data.portfolio,
    positions: data.positions,
    recentTrades: data.trades,
    isLoading: false,
    error: null,
  }),

  updatePortfolio: (portfolio) => set({ portfolio }),
  updatePositions: (positions) => set({ positions }),
  updateRecentTrades: (trades) => set({ recentTrades: trades }),

  addPosition: (position) => set((state) => ({
    positions: [...state.positions, position],
  })),

  removePosition: (positionId) => set((state) => ({
    positions: state.positions.filter((p) => p.id !== positionId),
  })),

  updatePosition: (positionId, updates) => set((state) => ({
    positions: state.positions.map((p) =>
      p.id === positionId ? { ...p, ...updates } : p
    ),
  })),

  addTrade: (trade) => set((state) => ({
    recentTrades: [trade, ...state.recentTrades].slice(0, 50),
  })),

  clearTrades: () => set({ recentTrades: [] }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({
    portfolio: null,
    positions: [],
    recentTrades: [],
    isLoading: false,
    error: null,
  }),
})) 