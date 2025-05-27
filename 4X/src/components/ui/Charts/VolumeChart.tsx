'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface VolumeData {
  time: number
  volume: number
  price?: number
  label?: string
}

interface VolumeChartProps {
  data: VolumeData[]
  width?: number
  height?: number
  color?: string
  showGrid?: boolean
  showAxes?: boolean
  animate?: boolean
  className?: string
}

export const VolumeChart: React.FC<VolumeChartProps> = React.memo(({
  data,
  width = 400,
  height = 200,
  color = '#6366f1',
  showGrid = true,
  showAxes = true,
  animate = true,
  className = ''
}) => {
  const { bars, xScale, yScale, maxVolume } = useMemo(() => {
    if (data.length === 0) {
      return { bars: [], xScale: 0, yScale: 0, maxVolume: 0 }
    }

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    const maxVolume = Math.max(...data.map(d => d.volume))
    const xScale = chartWidth / data.length
    const yScale = chartHeight / (maxVolume || 1)

    const bars = data.map((point, index) => {
      const x = padding + index * xScale + xScale * 0.1
      const barWidth = xScale * 0.8
      const barHeight = point.volume * yScale
      const y = padding + chartHeight - barHeight

      return {
        x,
        y,
        width: barWidth,
        height: barHeight,
        volume: point.volume,
        time: point.time,
        price: point.price,
        label: point.label
      }
    })

    return { bars, xScale, yScale, maxVolume }
  }, [data, width, height])

  const gridLines = useMemo(() => {
    if (!showGrid) return { horizontal: [], vertical: [] }

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    const horizontalLines = []
    const verticalLines = []

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      horizontalLines.push({
        x1: padding,
        y1: y,
        x2: padding + chartWidth,
        y2: y,
        value: maxVolume - (maxVolume / 4) * i
      })
    }

    // Vertical grid lines
    const step = Math.max(1, Math.floor(data.length / 5))
    for (let i = 0; i < data.length; i += step) {
      const x = padding + i * xScale + xScale / 2
      verticalLines.push({
        x1: x,
        y1: padding,
        x2: x,
        y2: padding + chartHeight,
        index: i
      })
    }

    return { horizontal: horizontalLines, vertical: verticalLines }
  }, [showGrid, width, height, data.length, xScale, maxVolume])

  if (data.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <p className="text-gray-500 dark:text-gray-400">No volume data available</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid */}
        {showGrid && (
          <g className="opacity-20">
            {gridLines.horizontal.map((line, index) => (
              <line
                key={`h-${index}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="currentColor"
                strokeWidth={1}
                className="text-gray-400"
              />
            ))}
            {gridLines.vertical.map((line, index) => (
              <line
                key={`v-${index}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="currentColor"
                strokeWidth={1}
                className="text-gray-400"
              />
            ))}
          </g>
        )}

        {/* Axes */}
        {showAxes && (
          <g className="text-gray-600 dark:text-gray-400">
            {/* Y-axis */}
            <line
              x1={40}
              y1={40}
              x2={40}
              y2={height - 40}
              stroke="currentColor"
              strokeWidth={1}
            />
            {/* X-axis */}
            <line
              x1={40}
              y1={height - 40}
              x2={width - 40}
              y2={height - 40}
              stroke="currentColor"
              strokeWidth={1}
            />
          </g>
        )}

        {/* Volume bars */}
        {bars.map((bar, index) => (
          <motion.rect
            key={index}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            fill={color}
            initial={animate ? { scaleY: 0 } : undefined}
            animate={animate ? { scaleY: 1 } : undefined}
            transition={animate ? { delay: index * 0.05, duration: 0.4 } : undefined}
            className="cursor-pointer hover:opacity-80"
          >
            <title>
              {`${bar.label || new Date(bar.time).toLocaleString()}
Volume: ${bar.volume.toLocaleString()}
${bar.price ? `Price: ${bar.price.toFixed(5)}` : ''}`}
            </title>
          </motion.rect>
        ))}

        {/* Y-axis labels */}
        {showAxes && gridLines.horizontal.map((line, index) => (
          <text
            key={`y-label-${index}`}
            x={35}
            y={line.y1 + 4}
            textAnchor="end"
            className="text-xs fill-current text-gray-500 dark:text-gray-400"
          >
            {line.value.toLocaleString()}
          </text>
        ))}

        {/* X-axis labels */}
        {showAxes && gridLines.vertical.map((line, index) => (
          <text
            key={`x-label-${index}`}
            x={line.x1}
            y={height - 25}
            textAnchor="middle"
            className="text-xs fill-current text-gray-500 dark:text-gray-400"
          >
            {data[line.index]?.label || new Date(data[line.index]?.time).toLocaleDateString()}
          </text>
        ))}
      </svg>

      {/* Interactive overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: bar.x,
              top: bar.y,
              width: bar.width,
              height: bar.height,
            }}
            title={`Volume: ${bar.volume.toLocaleString()}`}
          />
        ))}
      </div>
    </div>
  )
})

VolumeChart.displayName = 'VolumeChart'

export default VolumeChart 