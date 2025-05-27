import axios from 'axios'

// Create axios instance with default config
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('4x-auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem('4x-refresh-token')
        const response = await api.post('/auth/refresh', { refreshToken })
        
        const { accessToken } = response.data
        localStorage.setItem('4x-auth-token', accessToken)
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (error) {
        // Refresh token failed, logout user
        localStorage.removeItem('4x-auth-token')
        localStorage.removeItem('4x-refresh-token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
) 