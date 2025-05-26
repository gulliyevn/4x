import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MarketData } from '@/types/market'
import { API_ENDPOINTS } from '@/constants/trading'

const fetchMarketData = async (symbol: string): Promise<MarketData> => {
  const { data } = await axios.get(`${API_ENDPOINTS.MARKET_DATA}/${symbol}`)
  return data
}

export const useMarketData = (symbol: string) => {
  return useQuery({
    queryKey: ['marketData', symbol],
    queryFn: () => fetchMarketData(symbol),
    refetchInterval: 5000, // Refetch every 5 seconds for real-time data
    staleTime: 1000, // Data is considered stale after 1 second
  })
}

export const useMultipleMarketData = (symbols: string[]) => {
  return useQuery({
    queryKey: ['multipleMarketData', symbols],
    queryFn: async () => {
      const promises = symbols.map(symbol => fetchMarketData(symbol))
      return Promise.all(promises)
    },
    refetchInterval: 5000,
    staleTime: 1000,
  })
} 