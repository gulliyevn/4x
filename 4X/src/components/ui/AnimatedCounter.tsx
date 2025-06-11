'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  delay?: number
}

export function AnimatedCounter({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  delay = 0
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000
  })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(value)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, value, motionValue, delay])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest)
    })

    return unsubscribe
  }, [springValue])

  const formatValue = (val: number) => {
    return val.toFixed(decimals)
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {prefix}{formatValue(displayValue)}{suffix}
    </motion.span>
  )
}

// Percentage counter with visual bar
interface AnimatedPercentageProps {
  percentage: number
  label: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
  size?: 'sm' | 'md' | 'lg'
  showBar?: boolean
  delay?: number
}

export function AnimatedPercentage({
  percentage,
  label,
  color = 'blue',
  size = 'md',
  showBar = true,
  delay = 0
}: AnimatedPercentageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400'
  }

  const barColorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  }

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  return (
    <motion.div
      ref={ref}
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
        <AnimatedCounter
          value={percentage}
          suffix="%"
          decimals={1}
          delay={delay + 0.2}
          className={`font-bold ${sizeClasses[size]} ${colorClasses[color]}`}
        />
      </div>
      
      {showBar && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${barColorClasses[color]}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
            transition={{ 
              duration: 1.5, 
              delay: delay + 0.5,
              ease: "easeOut"
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

// Stats grid with staggered animations
interface StatItem {
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

interface AnimatedStatsGridProps {
  stats: StatItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export function AnimatedStatsGrid({ 
  stats, 
  columns = 4, 
  className = '' 
}: AnimatedStatsGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  }

  return (
    <div
      ref={ref}
      className={`grid ${gridCols[columns]} gap-6 ${className}`}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover-lift"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          <AnimatedCounter
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals || 0}
            delay={index * 0.1 + 0.3}
            className={`block text-3xl font-bold mb-2 ${
              stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
              stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
              stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
              'text-blue-600 dark:text-blue-400'
            }`}
          />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
} 