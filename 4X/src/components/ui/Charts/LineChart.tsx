'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface DataPoint {
  x: number | string
  y: number
  label?: string
}

interface LineChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
  showDots?: boolean
  showGrid?: boolean
  showAxes?: boolean
  animate?: boolean
  className?: string
}

export const LineChart: React.FC<LineChartProps> = React.memo(({
  data,
  width = 400,
  height = 200,
  color = '#3b82f6',
  strokeWidth = 2,
  showDots = false,
  showGrid = true,
  showAxes = true,
  animate = true,
  className = ''
}) => {
  const { pathData, points, xScale, yScale, minY, maxY } = useMemo(() => {
    if (data.length === 0) {
      return { pathData: '', points: [], xScale: 0, yScale: 0, minY: 0, maxY: 0 }
    }

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    const minY = Math.min(...data.map(d => d.y))
    const maxY = Math.max(...data.map(d => d.y))
    const yRange = maxY - minY || 1

    const xScale = chartWidth / (data.length - 1 || 1)
    const yScale = chartHeight / yRange

    const points = data.map((point, index) => ({
      x: padding + index * xScale,
      y: padding + chartHeight - ((point.y - minY) * yScale),
      originalY: point.y,
      label: point.label
    }))

    const pathData = points.reduce((path, point, index) => {
      const command = index === 0 ? 'M' : 'L'
      return `${path} ${command} ${point.x} ${point.y}`
    }, '')

    return { pathData, points, xScale, yScale, minY, maxY }
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
        value: maxY - ((maxY - minY) / 4) * i
      })
    }

    // Vertical grid lines
    const step = Math.max(1, Math.floor(data.length / 5))
    for (let i = 0; i < data.length; i += step) {
      const x = padding + i * xScale
      verticalLines.push({
        x1: x,
        y1: padding,
        x2: x,
        y2: padding + chartHeight,
        index: i
      })
    }

    return { horizontal: horizontalLines, vertical: verticalLines }
  }, [showGrid, width, height, data.length, xScale, minY, maxY])

  if (data.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
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

        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={animate ? { duration: 1, ease: "easeInOut" } : undefined}
        />

        {/* Dots */}
        {showDots && points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={color}
            initial={animate ? { scale: 0 } : undefined}
            animate={animate ? { scale: 1 } : undefined}
            transition={animate ? { delay: index * 0.1, duration: 0.3 } : undefined}
            className="cursor-pointer hover:r-6 transition-all"
          >
            <title>{`Value: ${point.originalY.toFixed(2)}`}</title>
          </motion.circle>
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
            {line.value.toFixed(2)}
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
            {data[line.index]?.label || line.index}
          </text>
        ))}
      </svg>

      {/* Tooltip area */}
      <div className="absolute inset-0 pointer-events-none">
        {points.map((point, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 pointer-events-auto cursor-pointer"
            style={{
              left: point.x - 4,
              top: point.y - 4,
            }}
            title={`${data[index]?.label || index}: ${point.originalY.toFixed(2)}`}
          />
        ))}
      </div>
    </div>
  )
})

LineChart.displayName = 'LineChart'

export default LineChart 