'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { ChartInterval, PricePoint } from '@/types/market'
import { useMarketStore } from '@/stores/marketStore'
import { useRealTimePrice } from '@/hooks/useRealTimePrice'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

interface LiveChartProps {
  symbol: string
  height?: number
  showVolume?: boolean
  showControls?: boolean
  className?: string
}

interface CandlestickData {
  x: number
  o: number // open
  h: number // high
  l: number // low
  c: number // close
  v?: number // volume
}

const TIMEFRAMES: { label: string; value: ChartInterval }[] = [
  { label: '1m', value: ChartInterval.ONE_MINUTE },
  { label: '5m', value: ChartInterval.FIVE_MINUTES },
  { label: '15m', value: ChartInterval.FIFTEEN_MINUTES },
  { label: '1h', value: ChartInterval.ONE_HOUR },
  { label: '4h', value: ChartInterval.FOUR_HOURS },
  { label: '1d', value: ChartInterval.ONE_DAY },
]

export const LiveChart: React.FC<LiveChartProps> = React.memo(({
  symbol,
  height = 400,
  showVolume = true,
  showControls = true,
  className = ''
}) => {
  const chartRef = useRef<ChartJS>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState<ChartInterval>(ChartInterval.ONE_HOUR)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState(0)

  // Store hooks
  const { priceHistory, fetchPriceHistory, appendPricePoint } = useMarketStore()
  
  // Real-time price hook
  const { price: realTimePrice, isConnected } = useRealTimePrice({
    symbol,
    enabled: true
  })

  // Get price data for selected timeframe
  const priceData = useMemo(() => {
    return priceHistory[symbol]?.[selectedTimeframe] || []
  }, [priceHistory, symbol, selectedTimeframe])

  // Convert price points to candlestick data
  const candlestickData = useMemo((): CandlestickData[] => {
    return priceData.map(point => ({
      x: point.time,
      o: point.open,
      h: point.high,
      l: point.low,
      c: point.close,
      v: point.volume
    }))
  }, [priceData])

  // Generate demo data if no real data available
  const generateDemoData = useCallback((): CandlestickData[] => {
    const now = Date.now()
    const interval = selectedTimeframe === ChartInterval.ONE_MINUTE ? 60000 : 
                    selectedTimeframe === ChartInterval.FIVE_MINUTES ? 300000 :
                    selectedTimeframe === ChartInterval.ONE_HOUR ? 3600000 : 86400000
    
    const data: CandlestickData[] = []
    let basePrice = 1.2345
    
    for (let i = 100; i >= 0; i--) {
      const time = now - (i * interval)
      const volatility = 0.001
      const change = (Math.random() - 0.5) * 2 * volatility
      const open = basePrice
      const close = basePrice * (1 + change)
      const high = Math.max(open, close) * (1 + Math.random() * 0.001)
      const low = Math.min(open, close) * (1 - Math.random() * 0.001)
      const volume = Math.random() * 1000000
      
      data.push({
        x: time,
        o: Number(open.toFixed(5)),
        h: Number(high.toFixed(5)),
        l: Number(low.toFixed(5)),
        c: Number(close.toFixed(5)),
        v: volume
      })
      
      basePrice = close
    }
    
    return data
  }, [selectedTimeframe])

  // Chart data
  const chartData = useMemo(() => {
    const data = candlestickData.length > 0 ? candlestickData : generateDemoData()
    
    return {
      datasets: [
        {
          label: 'Price',
          data: data.map(d => ({
            x: d.x,
            y: [d.o, d.h, d.l, d.c]
          })),
          backgroundColor: (ctx: any) => {
            const point = data[ctx.dataIndex]
            return point.c >= point.o ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)'
          },
          borderColor: (ctx: any) => {
            const point = data[ctx.dataIndex]
            return point.c >= point.o ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
          },
          borderWidth: 1,
        },
        ...(showVolume ? [{
          label: 'Volume',
          data: data.map(d => ({
            x: d.x,
            y: d.v || 0
          })),
          backgroundColor: 'rgba(99, 102, 241, 0.3)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
          yAxisID: 'volume',
          type: 'bar' as const,
        }] : [])
      ]
    }
  }, [candlestickData, generateDemoData, showVolume])

  // Chart options
  const chartOptions = useMemo((): ChartOptions => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            minute: 'HH:mm',
            hour: 'HH:mm',
            day: 'MMM dd',
          }
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        }
      },
      y: {
        position: 'right',
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: function(value) {
            return typeof value === 'number' ? value.toFixed(5) : value
          }
        }
      },
      ...(showVolume ? {
        volume: {
          type: 'linear' as const,
          position: 'right' as const,
          max: Math.max(...(chartData.datasets[1]?.data.map((d: any) => d.y) || [0])) * 4,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          }
        }
      } : {})
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'rgb(243, 244, 246)',
        bodyColor: 'rgb(243, 244, 246)',
        borderColor: 'rgba(75, 85, 99, 0.5)',
        borderWidth: 1,
        callbacks: {
          title: (items: TooltipItem<any>[]) => {
            const item = items[0]
            return new Date(item.parsed.x).toLocaleString()
          },
          label: (item: TooltipItem<any>) => {
            if (item.datasetIndex === 0) {
              const data = item.raw as number[]
              return [
                `Open: ${data[0]?.toFixed(5)}`,
                `High: ${data[1]?.toFixed(5)}`,
                `Low: ${data[2]?.toFixed(5)}`,
                `Close: ${data[3]?.toFixed(5)}`,
              ]
            } else {
              return `Volume: ${item.parsed.y?.toLocaleString()}`
            }
          }
        }
      }
    },
    onHover: (event, elements) => {
      if (event.native?.target) {
        (event.native.target as HTMLElement).style.cursor = elements.length > 0 ? 'crosshair' : 'default'
      }
    },
  }), [chartData, showVolume])

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        await fetchPriceHistory(symbol, selectedTimeframe, 100)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chart data')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [symbol, selectedTimeframe, fetchPriceHistory])

  // Update chart with real-time data
  useEffect(() => {
    if (realTimePrice && candlestickData.length > 0) {
      const lastCandle = candlestickData[candlestickData.length - 1]
      const currentTime = realTimePrice.timestamp
      
      // Check if we need to create a new candle or update the existing one
      const interval = selectedTimeframe === ChartInterval.ONE_MINUTE ? 60000 : 
                      selectedTimeframe === ChartInterval.FIVE_MINUTES ? 300000 :
                      selectedTimeframe === ChartInterval.ONE_HOUR ? 3600000 : 86400000
      
      const shouldCreateNewCandle = currentTime - lastCandle.x >= interval
      
      if (shouldCreateNewCandle) {
        const newPoint: PricePoint = {
          time: currentTime,
          open: realTimePrice.price,
          high: realTimePrice.price,
          low: realTimePrice.price,
          close: realTimePrice.price,
          volume: 0
        }
        appendPricePoint(symbol, newPoint)
      }
    }
  }, [realTimePrice, candlestickData, selectedTimeframe, symbol, appendPricePoint])

  // Zoom and pan handlers
  const handleZoom = useCallback((direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newLevel = direction === 'in' ? prev * 1.2 : prev / 1.2
      return Math.max(0.5, Math.min(5, newLevel))
    })
  }, [])

  const handleReset = useCallback(() => {
    setZoomLevel(1)
    setPanOffset(0)
    if (chartRef.current) {
      chartRef.current.resetZoom()
    }
  }, [])

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {symbol} Chart
          </h3>
          
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ 
                backgroundColor: isConnected ? '#10b981' : '#ef4444',
                scale: isConnected ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.5, repeat: isConnected ? Infinity : 0 }}
              className="w-2 h-2 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isConnected ? 'Live' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Controls */}
        {showControls && (
          <div className="flex items-center space-x-2">
            {/* Timeframe Selector */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {TIMEFRAMES.map((timeframe) => (
                <button
                  key={timeframe.value}
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                    selectedTimeframe === timeframe.value
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="flex space-x-1">
              <button
                onClick={() => handleZoom('in')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                title="Zoom In"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                onClick={() => handleZoom('out')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                title="Zoom Out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
              <button
                onClick={handleReset}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                title="Reset Zoom"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="relative" style={{ height }}>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10"
            >
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Loading chart...</span>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10"
            >
              <div className="text-center">
                <div className="text-red-500 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
                <button
                  onClick={() => fetchPriceHistory(symbol, selectedTimeframe, 100)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && !error && (
          <div className="p-4 h-full">
            <Chart
              ref={chartRef}
              type="line"
              data={chartData}
              options={chartOptions}
            />
          </div>
        )}
      </div>
    </div>
  )
})

LiveChart.displayName = 'LiveChart'

export default LiveChart 