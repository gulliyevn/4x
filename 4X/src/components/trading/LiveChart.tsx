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
    
    const priceDataset = {
      label: 'Price',
      data: data.map(d => ({
        x: d.x,
        y: d.c // Use close price for line chart
      })),
      backgroundColor: 'rgba(152, 181, 164, 0.2)',
      borderColor: 'rgb(152, 181, 164)',
      borderWidth: 2,
      fill: true,
      tension: 0.1,
    }

    const datasets = [priceDataset]

    if (showVolume) {
      datasets.push({
        label: 'Volume',
        data: data.map(d => ({
          x: d.x,
          y: d.v || 0
        })),
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
        yAxisID: 'volume',
        type: 'bar',
      } as any)
    }
    
    return { datasets }
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
              return `Price: ${item.parsed.y?.toFixed(5)}`
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
    // Reset zoom level state
  }, [])

  return (
    <div className={`chart-container ${className}`}>
      {/* Header */}
      <div className="chart-header">
        <div className="chart-title-section">
          <h3 className="chart-title">
            {symbol} Chart
          </h3>
          
          {/* Connection Status */}
          <div className="connection-status">
            <motion.div
              animate={{ 
                backgroundColor: isConnected ? '#10b981' : '#ef4444',
                scale: isConnected ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.5, repeat: isConnected ? Infinity : 0 }}
              className="connection-indicator"
            />
            <span className="connection-text">
              {isConnected ? 'Live' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Controls */}
        {showControls && (
          <div className="chart-controls">
            {/* Timeframe Selector */}
            <div className="timeframe-selector">
              {TIMEFRAMES.map((timeframe) => (
                <button
                  key={timeframe.value}
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={`timeframe-btn ${
                    selectedTimeframe === timeframe.value ? 'active' : ''
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="zoom-controls">
              <button
                onClick={() => handleZoom('in')}
                className="zoom-btn"
                title="Zoom In"
              >
                <svg className="zoom-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                onClick={() => handleZoom('out')}
                className="zoom-btn"
                title="Zoom Out"
              >
                <svg className="zoom-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
              <button
                onClick={handleReset}
                className="zoom-btn"
                title="Reset Zoom"
              >
                <svg className="zoom-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="chart-content" style={{ height }}>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="chart-loading"
            >
              <div className="loading-content">
                <div className="loading-spinner"></div>
                <span className="loading-text">Loading chart...</span>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="chart-error"
            >
              <div className="error-content">
                <div className="error-icon">
                  <svg className="error-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="error-message">{error}</p>
                <button
                  onClick={() => fetchPriceHistory(symbol, selectedTimeframe, 100)}
                  className="retry-btn"
                >
                  Retry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && !error && (
          <div className="chart-wrapper">
            <Chart
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