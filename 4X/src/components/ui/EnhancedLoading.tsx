'use client'

import { motion } from 'framer-motion'
import { Loader2, TrendingUp, BarChart3, Activity } from 'lucide-react'

interface EnhancedLoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'trading'
  text?: string
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const textSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

export function EnhancedLoading({ 
  size = 'md', 
  variant = 'spinner', 
  text,
  className = '' 
}: EnhancedLoadingProps) {
  const renderSpinner = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} ${className}`}
    >
      <Loader2 className="w-full h-full text-blue-600 dark:text-blue-400" />
    </motion.div>
  )

  const renderDots = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
          className={`rounded-full bg-blue-600 dark:bg-blue-400 ${
            size === 'sm' ? 'w-1.5 h-1.5' :
            size === 'md' ? 'w-2 h-2' :
            size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'
          }`}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`rounded-full bg-gradient-to-r from-blue-500 to-purple-600 ${sizeClasses[size]} ${className}`}
    />
  )

  const renderTrading = () => (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={sizeClasses[size]}
      >
        <TrendingUp className="w-full h-full text-green-500" />
      </motion.div>
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          delay: 0.3
        }}
        className={sizeClasses[size]}
      >
        <BarChart3 className="w-full h-full text-blue-500" />
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, -4, 0],
        }}
        transition={{ 
          duration: 1, 
          repeat: Infinity,
          delay: 0.6
        }}
        className={sizeClasses[size]}
      >
        <Activity className="w-full h-full text-purple-500" />
      </motion.div>
    </div>
  )

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'trading':
        return renderTrading()
      default:
        return renderSpinner()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderLoader()}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-gray-600 dark:text-gray-300 font-medium ${textSizes[size]}`}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Full page loading overlay
interface LoadingOverlayProps {
  isVisible: boolean
  text?: string
  variant?: EnhancedLoadingProps['variant']
}

export function LoadingOverlay({ isVisible, text = "Loading...", variant = 'trading' }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <EnhancedLoading size="xl" variant={variant} text={text} />
      </motion.div>
    </motion.div>
  )
}

// Skeleton loading components
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 w-full"></div>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2"></div>
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 dark:bg-gray-700 rounded h-4 ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
} 