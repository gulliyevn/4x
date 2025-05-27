'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface PieData {
  label: string
  value: number
  color?: string
}

interface PieChartProps {
  data: PieData[]
  width?: number
  height?: number
  innerRadius?: number
  showLabels?: boolean
  showLegend?: boolean
  animate?: boolean
  className?: string
}

const DEFAULT_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6b7280'
]

export const PieChart: React.FC<PieChartProps> = React.memo(({
  data,
  width = 300,
  height = 300,
  innerRadius = 0,
  showLabels = true,
  showLegend = true,
  animate = true,
  className = ''
}) => {
  const { segments, total, centerX, centerY, outerRadius } = useMemo(() => {
    if (data.length === 0) {
      return { segments: [], total: 0, centerX: 0, centerY: 0, outerRadius: 0 }
    }

    const centerX = width / 2
    const centerY = height / 2
    const outerRadius = Math.min(width, height) / 2 - 20

    const total = data.reduce((sum, item) => sum + item.value, 0)
    
    let currentAngle = -Math.PI / 2 // Start from top

    const segments = data.map((item, index) => {
      const percentage = (item.value / total) * 100
      const angle = (item.value / total) * 2 * Math.PI
      const startAngle = currentAngle
      const endAngle = currentAngle + angle

      // Calculate path for arc
      const x1 = centerX + outerRadius * Math.cos(startAngle)
      const y1 = centerY + outerRadius * Math.sin(startAngle)
      const x2 = centerX + outerRadius * Math.cos(endAngle)
      const y2 = centerY + outerRadius * Math.sin(endAngle)

      const largeArcFlag = angle > Math.PI ? 1 : 0

      let pathData = ''
      if (innerRadius > 0) {
        // Donut chart
        const innerX1 = centerX + innerRadius * Math.cos(startAngle)
        const innerY1 = centerY + innerRadius * Math.sin(startAngle)
        const innerX2 = centerX + innerRadius * Math.cos(endAngle)
        const innerY2 = centerY + innerRadius * Math.sin(endAngle)

        pathData = [
          `M ${x1} ${y1}`,
          `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          `L ${innerX2} ${innerY2}`,
          `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1}`,
          'Z'
        ].join(' ')
      } else {
        // Pie chart
        pathData = [
          `M ${centerX} ${centerY}`,
          `L ${x1} ${y1}`,
          `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          'Z'
        ].join(' ')
      }

      // Label position
      const labelAngle = startAngle + angle / 2
      const labelRadius = outerRadius + 20
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      currentAngle = endAngle

      return {
        ...item,
        pathData,
        percentage,
        color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        labelX,
        labelY,
        startAngle,
        endAngle,
        angle
      }
    })

    return { segments, total, centerX, centerY, outerRadius }
  }, [data, width, height, innerRadius])

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
    <div className={`flex items-center ${className}`}>
      {/* Chart */}
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Segments */}
          {segments.map((segment, index) => (
            <g key={segment.label}>
              {/* Pie/Donut segment */}
              <motion.path
                d={segment.pathData}
                fill={segment.color}
                stroke="white"
                strokeWidth={2}
                initial={animate ? { 
                  scale: 0,
                  rotate: -90
                } : undefined}
                animate={animate ? { 
                  scale: 1,
                  rotate: 0
                } : undefined}
                transition={animate ? { 
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut"
                } : undefined}
                className="cursor-pointer hover:opacity-80"
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              >
                <title>{`${segment.label}: ${segment.value} (${segment.percentage.toFixed(1)}%)`}</title>
              </motion.path>

              {/* Labels */}
              {showLabels && segment.percentage > 5 && (
                <motion.text
                  x={segment.labelX}
                  y={segment.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-current text-gray-700 dark:text-gray-300"
                  initial={animate ? { opacity: 0 } : undefined}
                  animate={animate ? { opacity: 1 } : undefined}
                  transition={animate ? { 
                    delay: index * 0.1 + 0.5,
                    duration: 0.3
                  } : undefined}
                >
                  {segment.percentage.toFixed(1)}%
                </motion.text>
              )}
            </g>
          ))}

          {/* Center label for donut chart */}
          {innerRadius > 0 && (
            <g>
              <text
                x={centerX}
                y={centerY - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-bold fill-current text-gray-900 dark:text-white"
              >
                Total
              </text>
              <text
                x={centerX}
                y={centerY + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm fill-current text-gray-600 dark:text-gray-400"
              >
                {total.toLocaleString()}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      {showLegend && (
        <motion.div
          className="ml-6 space-y-2"
          initial={animate ? { opacity: 0, x: 20 } : undefined}
          animate={animate ? { opacity: 1, x: 0 } : undefined}
          transition={animate ? { delay: 0.8, duration: 0.5 } : undefined}
        >
          {segments.map((segment, index) => (
            <motion.div
              key={segment.label}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              initial={animate ? { opacity: 0, y: 10 } : undefined}
              animate={animate ? { opacity: 1, y: 0 } : undefined}
              transition={animate ? { 
                delay: 0.8 + index * 0.1,
                duration: 0.3
              } : undefined}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <div className="text-sm">
                <div className="font-medium text-gray-900 dark:text-white">
                  {segment.label}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {segment.value.toLocaleString()} ({segment.percentage.toFixed(1)}%)
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
})

PieChart.displayName = 'PieChart'

export default PieChart 