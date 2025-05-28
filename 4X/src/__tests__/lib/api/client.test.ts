import { ApiClientError, createApiCall } from '@/lib/api/client'

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
  post: jest.fn(),
  isAxiosError: jest.fn(() => false),
}))

describe('API Client', () => {
  describe('ApiClientError', () => {
    it('should create error with message and status', () => {
      const error = new ApiClientError('Test error', 400, 'TEST_ERROR')
      
      expect(error.message).toBe('Test error')
      expect(error.status).toBe(400)
      expect(error.code).toBe('TEST_ERROR')
      expect(error.name).toBe('ApiClientError')
    })

    it('should create error with default values', () => {
      const error = new ApiClientError('Test error')
      
      expect(error.message).toBe('Test error')
      expect(error.status).toBeUndefined()
      expect(error.code).toBeUndefined()
    })

    it('should create error with nested errors', () => {
      const nestedError = new Error('Nested error')
      const error = new ApiClientError('Test error', 500, 'TEST_ERROR', [nestedError])
      
      expect(error.details).toEqual([nestedError])
    })
  })

  describe('createApiCall', () => {
    it('should create a function that handles API calls', () => {
      const mockApiFunction = jest.fn().mockResolvedValue({
        data: { success: true, data: 'test data' }
      })
      
      const apiCall = createApiCall(mockApiFunction)
      
      expect(typeof apiCall).toBe('function')
    })

    it('should handle successful API responses', async () => {
      const mockApiFunction = jest.fn().mockResolvedValue({
        data: { success: true, data: 'test data' }
      })
      
      const apiCall = createApiCall(mockApiFunction)
      const result = await apiCall()
      
      expect(result).toBe('test data')
      expect(mockApiFunction).toHaveBeenCalledTimes(1)
    })

    it('should handle API errors', async () => {
      const mockApiFunction = jest.fn().mockRejectedValue(new ApiClientError('API Error'))
      
      const apiCall = createApiCall(mockApiFunction)
      
      await expect(apiCall()).rejects.toThrow('API Error')
    })
  })
}) 