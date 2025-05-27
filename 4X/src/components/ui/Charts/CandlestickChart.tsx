'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface CandlestickData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

interface CandlestickChartProps {
  data: CandlestickData[]
  width?: number
  height?: number
  showVolume?: boolean
  animate?: boolean
  className?: string
}

export const CandlestickChart: React.FC<CandlestickChartProps> = React.memo(({
  data,
  width = 600,
  height = 400,
  showVolume = true,
  animate = true,
  className = ''
}) => {
  const { candles, volumeBars, xScale, yScale, minPrice, maxPrice, maxVolume } = useMemo(() => {
    if (data.length === 0) {
      return { candles: [], volumeBars: [], xScale: 0, yScale: 0, minPrice: 0, maxPrice: 0, maxVolume: 0 }
    }

    const padding = 40
    const chartHeight = showVolume ? height * 0.7 : height - padding * 2
    const volumeHeight = showVolume ? height * 0.2 : 0
    const chartWidth = width - padding * 2

    // Calculate price range
    const prices = data.flatMap(d => [d.open, d.high, d.low, d.close])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice || 1

    // Calculate volume range
    const volumes = data.map(d => d.volume || 0)
    const maxVolume = Math.max(...volumes)

    const xScale = chartWidth / data.length
    const yScale = chartHeight / priceRange
    const volumeScale = volumeHeight / (maxVolume || 1)

    // Generate candles
    const candles = data.map((point, index) => {
      const x = padding + index * xScale + xScale * 0.1
      const candleWidth = xScale * 0.8

      const openY = padding + chartHeight - ((point.open - minPrice) * yScale)
      const closeY = padding + chartHeight - ((point.close - minPrice) * yScale)
      const highY = padding + chartHeight - ((point.high - minPrice) * yScale)
      const lowY = padding + chartHeight - ((point.low - minPrice) * yScale)

      const isGreen = point.close >= point.open
      const bodyTop = Math.min(openY, closeY)
      const bodyHeight = Math.abs(closeY - openY) || 1

      return {
        x,
        candleWidth,
        bodyTop,
        bodyHeight,
        highY,
        lowY,
        isGreen,
        data: point
      }
    })

    // Generate volume bars
    const volumeBars = showVolume ? data.map((point, index) => {
      const x = padding + index * xScale + xScale * 0.1
      const barWidth = xScale * 0.8
      const barHeight = (point.volume || 0) * volumeScale
      const barY = height - padding - barHeight

      return {
        x,
        y: barY,
        width: barWidth,
        height: barHeight,
        volume: point.volume || 0
      }
    }) : []

    return { candles, volumeBars, xScale, yScale, minPrice, maxPrice, maxVolume }
  }, [data, width, height, showVolume])

  if (data.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <p className="text-gray-500 dark:text-gray-400">No candlestick data available</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        <g className="opacity-10">
          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = 40 + (height * (showVolume ? 0.7 : 1) - 80) * ratio
            return (
              <line
                key={`h-${index}`}
                x1={40}
                y1={y}
                x2={width - 40}
                y2={y}
                stroke="currentColor"
                strokeWidth={1}
                className="text-gray-400"
              />
            )
          })}
          
          {/* Vertical grid lines */}
          {data.map((_, index) => {
            if (index % Math.max(1, Math.floor(data.length / 6)) === 0) {
              const x = 40 + index * xScale + xScale / 2
              return (
                <line
                  key={`v-${index}`}
                  x1={x}
                  y1={40}
                  x2={x}
                  y2={height - 40}
                  stroke="currentColor"
                  strokeWidth={1}
                  className="text-gray-400"
                />
              )
            }
            return null
          })}
        </g>

        {/* Price axis */}
        <line
          x1={40}
          y1={40}
          x2={40}
          y2={height * (showVolume ? 0.7 : 1)}
          stroke="currentColor"
          strokeWidth={1}
          className="text-gray-600 dark:text-gray-400"
        />

        {/* Time axis */}
        <line
          x1={40}
          y1={height - 40}
          x2={width - 40}
          y2={height - 40}
          stroke="currentColor"
          strokeWidth={1}
          className="text-gray-600 dark:text-gray-400"
        />

        {/* Candlesticks */}
        {candles.map((candle, index) => (
          <g key={index}>
            {/* High-Low line */}
            <motion.line
              x1={candle.x + candle.candleWidth / 2}
              y1={candle.highY}
              x2={candle.x + candle.candleWidth / 2}
              y2={candle.lowY}
              stroke={candle.isGreen ? '#10b981' : '#ef4444'}
              strokeWidth={1}
              initial={animate ? { scaleY: 0 } : undefined}
              animate={animate ? { scaleY: 1 } : undefined}
              transition={animate ? { delay: index * 0.02, duration: 0.3 } : undefined}
            />
            
            {/* Candle body */}
            <motion.rect
              x={candle.x}
              y={candle.bodyTop}
              width={candle.candleWidth}
              height={candle.bodyHeight}
              fill={candle.isGreen ? '#10b981' : '#ef4444'}
              stroke={candle.isGreen ? '#059669' : '#dc2626'}
              strokeWidth={1}
              initial={animate ? { scaleY: 0 } : undefined}
              animate={animate ? { scaleY: 1 } : undefined}
              transition={animate ? { delay: index * 0.02, duration: 0.3 } : undefined}
              className="cursor-pointer hover:opacity-80"
            >
              <title>
                {`Time: ${new Date(candle.data.time).toLocaleString()}
Open: ${candle.data.open.toFixed(5)}
High: ${candle.data.high.toFixed(5)}
Low: ${candle.data.low.toFixed(5)}
Close: ${candle.data.close.toFixed(5)}
${candle.data.volume ? `Volume: ${candle.data.volume.toLocaleString()}` : ''}`}
              </title>
            </motion.rect>
          </g>
        ))}

        {/* Volume bars */}
        {showVolume && volumeBars.map((bar, index) => (
          <motion.rect
            key={`vol-${index}`}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            fill="rgba(99, 102, 241, 0.6)"
            initial={animate ? { scaleY: 0 } : undefined}
            animate={animate ? { scaleY: 1 } : undefined}
            transition={animate ? { delay: index * 0.02 + 0.5, duration: 0.3 } : undefined}
            className="cursor-pointer hover:opacity-80"
          >
            <title>{`Volume: ${bar.volume.toLocaleString()}`}</title>
          </motion.rect>
        ))}

        {/* Price labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const price = maxPrice - (maxPrice - minPrice) * ratio
          const y = 40 + (height * (showVolume ? 0.7 : 1) - 80) * ratio
          return (
            <text
              key={`price-${index}`}
              x={35}
              y={y + 4}
              textAnchor="end"
              className="text-xs fill-current text-gray-500 dark:text-gray-400"
            >
              {price.toFixed(5)}
            </text>
          )
        })}

        {/* Time labels */}
        {data.map((point, index) => {
          if (index % Math.max(1, Math.floor(data.length / 6)) === 0) {
            const x = 40 + index * xScale + xScale / 2
            return (
              <text
                key={`time-${index}`}
                x={x}
                y={height - 25}
                textAnchor="middle"
                className="text-xs fill-current text-gray-500 dark:text-gray-400"
              >
                {new Date(point.time).toLocaleTimeString()}
              </text>
            )
          }
          return null
        })}

        {/* Volume label */}
        {showVolume && (
          <text
            x={35}
            y={height - 60}
            textAnchor="end"
            className="text-xs fill-current text-gray-500 dark:text-gray-400"
          >
            Vol: {maxVolume.toLocaleString()}
          </text>
        )}
      </svg>
    </div>
  )
})

CandlestickChart.displayName = 'CandlestickChart'

export default CandlestickChart 