/**
 * Authentication Store
 * 
 * Manages user authentication state, login/logout operations,
 * token management, and user profile data using Zustand.
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'
import type { 
  User, 
  AuthState, 
  LoginCredentials, 
  RegisterData,
  JWTPayload,
  ChangePassword,
  ProfileUpdate
} from '@/types/auth'
import type { ApiResponse } from '@/types/api'
import { api } from '@/lib/api'
import { env, DEMO_MODE } from '@/lib/env'
import { demoCredentials, mockUser, testUsers, testCredentials } from '@/lib/mockData'
import { UserRole } from '@/types/auth'

interface AuthStore extends AuthState {
  // Demo mode state
  isDemoMode: boolean
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  updateUser: (updates: ProfileUpdate) => Promise<void>
  refreshAuthToken: () => Promise<void>
  changePassword: (data: ChangePassword) => Promise<void>
  clearError: () => void
  checkAuthStatus: () => Promise<void>
  updateLastActivity: () => void
  
  // Demo actions
  enableDemoMode: () => void
  disableDemoMode: () => void
  demoLogin: () => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Token utilities
const parseJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Failed to parse JWT:', error)
    return null
  }
}

const isTokenExpired = (token: string): boolean => {
  const payload = parseJWT(token)
  if (!payload) return true
  return Date.now() >= payload.exp * 1000
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        accessToken: null,
        refreshToken: null,
        tokenExpiresAt: null,
        rememberMe: false,
        lastActivity: null,
        isDemoMode: env.NEXT_PUBLIC_DEMO_MODE || false,

        // Actions
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null })
          
          try {
            // Check if credentials match any test user (for demo/development)
            const testCredential = testCredentials.find(
              cred => cred.email === credentials.email && cred.password === credentials.password
            )
            
            if (testCredential) {
              const testUser = testUsers.find(user => user.email === credentials.email)
              if (testUser) {
                // Test user login - no API call needed
                set({
                  user: testUser,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                  lastActivity: new Date()
                })
                return
              }
            }

            // Only make API calls in production mode
            if (!DEMO_MODE) {
              const response = await api.post<ApiResponse<{
                user: User
                accessToken: string
                refreshToken: string
                expiresAt: string
              }>>('/auth/login', credentials)

              if (response.data.success && response.data.data) {
                const { user, accessToken, refreshToken, expiresAt } = response.data.data
                
                // Set axios authorization header
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

                set({
                  user,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                  accessToken,
                  refreshToken,
                  tokenExpiresAt: new Date(expiresAt),
                  rememberMe: credentials.rememberMe || false,
                  lastActivity: new Date()
                })
              } else {
                throw new Error(response.data.error?.message || 'Login failed')
              }
            }
          } catch (error: any) {
            console.error('Login error:', error)
            set({
              error: error.response?.data?.error?.message || error.message || 'Invalid email or password',
              isLoading: false
            })
            throw error
          }
        },

        logout: () => {
          // Clear axios authorization header
          delete axios.defaults.headers.common['Authorization']
          
          // Only call logout API in production mode
          if (!DEMO_MODE) {
            const currentRefreshToken = get().refreshToken
            if (currentRefreshToken) {
              api.post('/auth/logout', {
                refreshToken: currentRefreshToken
              }).catch(() => {
                // Ignore logout API errors
              })
            }
          }

          set({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            tokenExpiresAt: null,
            lastActivity: null,
            error: null
          })
        },

        register: async (data: RegisterData) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.post<ApiResponse<{
              user: User
              message: string
            }>>(`${API_BASE_URL}/auth/register`, data)

            if (response.data.success) {
              set((state) => {
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Registration failed')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Registration failed'
            })
            throw error
          }
        },

        updateUser: async (updates: ProfileUpdate) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.patch<ApiResponse<User>>(
              `${API_BASE_URL}/auth/profile`,
              updates
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.user = response.data.data!
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Profile update failed')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Profile update failed'
            })
            throw error
          }
        },

        refreshAuthToken: async () => {
          const { refreshToken } = get()
          if (!refreshToken) {
            get().logout()
            return
          }

          try {
            const response = await axios.post<ApiResponse<{
              accessToken: string
              refreshToken: string
              expiresAt: string
            }>>(`${API_BASE_URL}/auth/refresh`, {
              refreshToken
            })

            if (response.data.success && response.data.data) {
              const { accessToken, refreshToken: newRefreshToken, expiresAt } = response.data.data
              
              // Update axios authorization header
              axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

              set((state) => {
                state.accessToken = accessToken
                state.refreshToken = newRefreshToken
                state.tokenExpiresAt = new Date(expiresAt)
                state.lastActivity = new Date()
              })
            } else {
              get().logout()
            }
          } catch (error) {
            console.error('Token refresh failed:', error)
            get().logout()
          }
        },

        changePassword: async (data: ChangePassword) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const response = await axios.post<ApiResponse<{ message: string }>>(
              `${API_BASE_URL}/auth/change-password`,
              data
            )

            if (response.data.success) {
              set((state) => {
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Password change failed')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Password change failed'
            })
            throw error
          }
        },

        clearError: () => {
          set((state) => {
            state.error = null
          })
        },

        checkAuthStatus: async () => {
          const { accessToken, refreshToken } = get()
          
          if (!accessToken) {
            return
          }

          // Check if token is expired
          if (isTokenExpired(accessToken)) {
            if (refreshToken && !isTokenExpired(refreshToken)) {
              await get().refreshAuthToken()
            } else {
              get().logout()
            }
            return
          }

          // Verify token with server
          try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            const response = await axios.get<ApiResponse<User>>(`${API_BASE_URL}/auth/me`)
            
            if (response.data.success && response.data.data) {
              set((state) => {
                state.user = response.data.data!
                state.isAuthenticated = true
              })
            } else {
              get().logout()
            }
          } catch (error) {
            console.error('Auth status check failed:', error)
            get().logout()
          }
        },

        updateLastActivity: () => {
          set((state) => {
            state.lastActivity = new Date()
          })
        },

        // Demo mode actions
        enableDemoMode: () => {
          set((state) => {
            state.isDemoMode = true
          })
        },

        disableDemoMode: () => {
          set((state) => {
            state.isDemoMode = false
            // Logout when disabling demo mode
            if (state.user && state.user.email === demoCredentials.email) {
              state.user = null
              state.isAuthenticated = false
              state.accessToken = null
              state.refreshToken = null
              state.tokenExpiresAt = null
              state.lastActivity = null
              state.error = null
            }
          })
        },

        demoLogin: () => {
          set((state) => {
            state.user = mockUser
            state.isAuthenticated = true
            state.isLoading = false
            state.error = null
            state.isDemoMode = true
            state.lastActivity = new Date()
          })
        },
      })),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          tokenExpiresAt: state.tokenExpiresAt,
          rememberMe: state.rememberMe,
        }),
        onRehydrateStorage: () => (state) => {
          if (state?.accessToken) {
            // Set axios authorization header on app initialization
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`
            
            // Check auth status on rehydration
            state.checkAuthStatus()
          }
        },
      }
    ),
    {
      name: 'auth-store',
    }
  )
)

// Auto-refresh token before expiration
setInterval(() => {
  const { accessToken, tokenExpiresAt, refreshToken } = useAuthStore.getState()
  
  if (accessToken && tokenExpiresAt && refreshToken) {
    const timeUntilExpiry = tokenExpiresAt.getTime() - Date.now()
    // Refresh token 5 minutes before expiry
    if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
      useAuthStore.getState().refreshAuthToken()
    }
  }
}, 60000) // Check every minute

// Update last activity on axios requests
axios.interceptors.request.use((config) => {
  const { isAuthenticated, updateLastActivity } = useAuthStore.getState()
  if (isAuthenticated) {
    updateLastActivity()
  }
  return config
}) 