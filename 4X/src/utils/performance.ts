/**
 * Performance Optimization Utilities
 * 
 * Collection of utilities for optimizing performance in the trading platform,
 * including debouncing, throttling, memoization, and batch processing.
 */

import React, { useCallback, useRef, useMemo, useEffect, useState } from 'react'

// Debounce function for delaying function execution
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Throttle function for limiting function execution frequency
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// React hook for debounced values
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// React hook for throttled callbacks
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const throttledCallback = useRef<T>(null as any)
  const lastCall = useRef<number>(0)

  if (!throttledCallback.current) {
    throttledCallback.current = ((...args: Parameters<T>) => {
      if (Date.now() - lastCall.current >= delay) {
        callback(...args)
        lastCall.current = Date.now()
      }
    }) as T
  }

  return throttledCallback.current
}

// Memoization utility with custom key generation
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>()
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey ? getKey(...args) : JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)!
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Batch processing utility for handling multiple updates
export class BatchProcessor<T> {
  private batch: T[] = []
  private timeoutId: NodeJS.Timeout | null = null
  private readonly batchSize: number
  private readonly delay: number
  private readonly processor: (items: T[]) => void

  constructor(
    processor: (items: T[]) => void,
    options: { batchSize?: number; delay?: number } = {}
  ) {
    this.processor = processor
    this.batchSize = options.batchSize || 10
    this.delay = options.delay || 100
  }

  add(item: T): void {
    this.batch.push(item)
    
    if (this.batch.length >= this.batchSize) {
      this.flush()
    } else {
      this.scheduleFlush()
    }
  }

  private scheduleFlush(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    
    this.timeoutId = setTimeout(() => {
      this.flush()
    }, this.delay)
  }

  private flush(): void {
    if (this.batch.length > 0) {
      const items = [...this.batch]
      this.batch = []
      this.processor(items)
    }
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  clear(): void {
    this.batch = []
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }
}

// React hook for batch processing
export function useBatchProcessor<T>(
  processor: (items: T[]) => void,
  options?: { batchSize?: number; delay?: number }
) {
  const batchProcessorRef = useRef<BatchProcessor<T>>(null as any)
  
  if (!batchProcessorRef.current) {
    batchProcessorRef.current = new BatchProcessor(processor, options)
  }

  useEffect(() => {
    return () => {
      batchProcessorRef.current?.clear()
    }
  }, [])

  return useCallback((item: T) => {
    batchProcessorRef.current?.add(item)
  }, [])
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTiming(label: string): () => void {
    const start = performance.now()
    
    return () => {
      const duration = performance.now() - start
      this.recordMetric(label, duration)
    }
  }

  recordMetric(label: string, value: number): void {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, [])
    }
    
    const values = this.metrics.get(label)!
    values.push(value)
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift()
    }
  }

  getMetrics(label: string): { avg: number; min: number; max: number; count: number } | null {
    const values = this.metrics.get(label)
    if (!values || values.length === 0) {
      return null
    }

    const avg = values.reduce((sum, val) => sum + val, 0) / values.length
    const min = Math.min(...values)
    const max = Math.max(...values)
    
    return { avg, min, max, count: values.length }
  }

  getAllMetrics(): Record<string, { avg: number; min: number; max: number; count: number }> {
    const result: Record<string, any> = {}
    
    for (const [label] of this.metrics) {
      const metrics = this.getMetrics(label)
      if (metrics) {
        result[label] = metrics
      }
    }
    
    return result
  }

  clear(label?: string): void {
    if (label) {
      this.metrics.delete(label)
    } else {
      this.metrics.clear()
    }
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor(label: string) {
  const monitor = useMemo(() => PerformanceMonitor.getInstance(), [])
  
  const startTiming = useCallback(() => {
    return monitor.startTiming(label)
  }, [monitor, label])
  
  const recordMetric = useCallback((value: number) => {
    monitor.recordMetric(label, value)
  }, [monitor, label])
  
  const getMetrics = useCallback(() => {
    return monitor.getMetrics(label)
  }, [monitor, label])
  
  return { startTiming, recordMetric, getMetrics }
}

// Lazy loading utility for components
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = React.lazy(importFunc)
  
  return React.forwardRef((props: any, ref: any) => 
    React.createElement(React.Suspense, {
      fallback: fallback ? React.createElement(fallback) : React.createElement('div', {}, 'Loading...')
    },
      React.createElement(LazyComponent, { ...props, ref })
    )
  )
}

// Memory management utilities
export class MemoryManager {
  private static cleanupTasks: (() => void)[] = []
  
  static addCleanupTask(task: () => void): () => void {
    this.cleanupTasks.push(task)
    
    return () => {
      const index = this.cleanupTasks.indexOf(task)
      if (index > -1) {
        this.cleanupTasks.splice(index, 1)
      }
    }
  }
  
  static cleanup(): void {
    this.cleanupTasks.forEach(task => {
      try {
        task()
      } catch (error) {
        console.warn('Cleanup task failed:', error)
      }
    })
    this.cleanupTasks = []
  }
  
  static getMemoryUsage(): any {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory
    }
    return null
  }
}

// React hook for memory management
export function useMemoryManager() {
  useEffect(() => {
    const cleanup = MemoryManager.addCleanupTask(() => {
      // Component-specific cleanup
    })
    
    return cleanup
  }, [])
  
  return {
    getMemoryUsage: MemoryManager.getMemoryUsage,
    addCleanupTask: MemoryManager.addCleanupTask
  }
}

// WebWorker utilities for offloading heavy computations
export class WebWorkerManager {
  private workers: Map<string, Worker> = new Map()
  
  createWorker(name: string, script: string): Worker {
    if (this.workers.has(name)) {
      this.terminateWorker(name)
    }
    
    const blob = new Blob([script], { type: 'application/javascript' })
    const worker = new Worker(URL.createObjectURL(blob))
    
    this.workers.set(name, worker)
    return worker
  }
  
  getWorker(name: string): Worker | undefined {
    return this.workers.get(name)
  }
  
  terminateWorker(name: string): void {
    const worker = this.workers.get(name)
    if (worker) {
      worker.terminate()
      this.workers.delete(name)
    }
  }
  
  terminateAll(): void {
    for (const [name] of this.workers) {
      this.terminateWorker(name)
    }
  }
}

// React hook for WebWorker management
export function useWebWorker(name: string, script?: string) {
  const managerRef = useRef<WebWorkerManager>(null as any)
  
  if (!managerRef.current) {
    managerRef.current = new WebWorkerManager()
  }
  
  useEffect(() => {
    if (script) {
      managerRef.current!.createWorker(name, script)
    }
    
    return () => {
      managerRef.current!.terminateWorker(name)
    }
  }, [name, script])
  
  const postMessage = useCallback((data: any) => {
    const worker = managerRef.current!.getWorker(name)
    if (worker) {
      worker.postMessage(data)
    }
  }, [name])
  
  const addEventListener = useCallback((type: string, listener: EventListener) => {
    const worker = managerRef.current!.getWorker(name)
    if (worker) {
      worker.addEventListener(type, listener)
      return () => worker.removeEventListener(type, listener)
    }
    return () => {}
  }, [name])
  
  return { postMessage, addEventListener }
}

export default {
  debounce,
  throttle,
  useDebounce,
  useThrottle,
  memoize,
  BatchProcessor,
  useBatchProcessor,
  PerformanceMonitor,
  usePerformanceMonitor,
  createLazyComponent,
  MemoryManager,
  useMemoryManager,
  WebWorkerManager,
  useWebWorker
} 