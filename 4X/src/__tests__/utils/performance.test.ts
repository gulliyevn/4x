import { 
  debounce, 
  throttle, 
  memoize, 
  BatchProcessor, 
  PerformanceMonitor 
} from '@/utils/performance'

// Mock timers
jest.useFakeTimers()

describe('Performance Utilities', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  describe('debounce', () => {
    it('delays function execution', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('test')
      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('cancels previous calls when called multiple times', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('first')
      debouncedFn('second')
      debouncedFn('third')

      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('third')
    })
  })

  describe('throttle', () => {
    it('limits function execution frequency', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('first')
      throttledFn('second')
      throttledFn('third')

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('first')

      jest.advanceTimersByTime(100)
      throttledFn('fourth')
      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn).toHaveBeenCalledWith('fourth')
    })
  })

  describe('memoize', () => {
    it('caches function results', () => {
      const expensiveFn = jest.fn((x: number) => x * 2)
      const memoizedFn = memoize(expensiveFn)

      const result1 = memoizedFn(5)
      const result2 = memoizedFn(5)

      expect(result1).toBe(10)
      expect(result2).toBe(10)
      expect(expensiveFn).toHaveBeenCalledTimes(1)
    })

    it('uses custom key generation', () => {
      const mockFn = jest.fn((obj: { id: number; name: string }) => obj.id)
      const memoizedFn = memoize(mockFn, (obj) => obj.id.toString())

      memoizedFn({ id: 1, name: 'first' })
      memoizedFn({ id: 1, name: 'second' }) // Different object, same id

      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('BatchProcessor', () => {
    it('processes items in batches', () => {
      const mockProcessor = jest.fn()
      const batchProcessor = new BatchProcessor(mockProcessor, { batchSize: 3, delay: 100 })

      batchProcessor.add('item1')
      batchProcessor.add('item2')
      expect(mockProcessor).not.toHaveBeenCalled()

      batchProcessor.add('item3')
      expect(mockProcessor).toHaveBeenCalledWith(['item1', 'item2', 'item3'])
    })

    it('processes items after delay', () => {
      const mockProcessor = jest.fn()
      const batchProcessor = new BatchProcessor(mockProcessor, { batchSize: 10, delay: 100 })

      batchProcessor.add('item1')
      batchProcessor.add('item2')
      expect(mockProcessor).not.toHaveBeenCalled()

      jest.advanceTimersByTime(100)
      expect(mockProcessor).toHaveBeenCalledWith(['item1', 'item2'])
    })

    it('clears batch when clear is called', () => {
      const mockProcessor = jest.fn()
      const batchProcessor = new BatchProcessor(mockProcessor, { batchSize: 10, delay: 100 })

      batchProcessor.add('item1')
      batchProcessor.clear()

      jest.advanceTimersByTime(100)
      expect(mockProcessor).not.toHaveBeenCalled()
    })
  })

  describe('PerformanceMonitor', () => {
    let monitor: PerformanceMonitor

    beforeEach(() => {
      monitor = PerformanceMonitor.getInstance()
      monitor.clear() // Clear all metrics
    })

    it('records timing metrics', () => {
      const endTiming = monitor.startTiming('test-operation')
      
      // Simulate some work
      jest.advanceTimersByTime(50)
      endTiming()

      const metrics = monitor.getMetrics('test-operation')
      expect(metrics).toBeTruthy()
      expect(metrics!.count).toBe(1)
    })

    it('calculates average, min, max correctly', () => {
      monitor.recordMetric('test', 10)
      monitor.recordMetric('test', 20)
      monitor.recordMetric('test', 30)

      const metrics = monitor.getMetrics('test')
      expect(metrics).toEqual({
        avg: 20,
        min: 10,
        max: 30,
        count: 3
      })
    })

    it('returns null for non-existent metrics', () => {
      const metrics = monitor.getMetrics('non-existent')
      expect(metrics).toBeNull()
    })

    it('clears specific metrics', () => {
      monitor.recordMetric('test1', 10)
      monitor.recordMetric('test2', 20)

      monitor.clear('test1')

      expect(monitor.getMetrics('test1')).toBeNull()
      expect(monitor.getMetrics('test2')).toBeTruthy()
    })

    it('clears all metrics', () => {
      monitor.recordMetric('test1', 10)
      monitor.recordMetric('test2', 20)

      monitor.clear()

      expect(monitor.getMetrics('test1')).toBeNull()
      expect(monitor.getMetrics('test2')).toBeNull()
    })
  })
}) 