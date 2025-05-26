/**
 * Authentication API Client
 * 
 * Provides authentication functions:
 * - Login/logout operations
 * - User registration
 * - Token refresh
 * - Password management
 * - Profile updates
 */

import { apiClient, createApiCall, ApiClientError } from './client'
import type { 
  User, 
  LoginCredentials, 
  RegisterData,
  ChangePassword,
  ProfileUpdate,
  AuthResponse
} from '@/types/auth'
import type { ApiResponse } from '@/types/api'

// Authentication endpoints
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials)
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Login failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'LOGIN_ERROR'
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export const register = async (data: RegisterData): Promise<{ user: User; message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ user: User; message: string }>>(
      '/auth/register', 
      data
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Registration failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'REGISTER_ERROR'
      )
    }
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

export const refreshToken = async (refreshToken: string): Promise<{
  accessToken: string
  refreshToken: string
  expiresAt: string
}> => {
  try {
    const response = await apiClient.post<ApiResponse<{
      accessToken: string
      refreshToken: string
      expiresAt: string
    }>>('/auth/refresh', { refreshToken })
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Token refresh failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'REFRESH_ERROR'
      )
    }
  } catch (error) {
    console.error('Token refresh error:', error)
    throw error
  }
}

export const logout = async (refreshToken?: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/logout',
      refreshToken ? { refreshToken } : {}
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Logout failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'LOGOUT_ERROR'
      )
    }
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

export const changePassword = async (data: ChangePassword): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/change-password',
      data
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Password change failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'PASSWORD_CHANGE_ERROR'
      )
    }
  } catch (error) {
    console.error('Password change error:', error)
    throw error
  }
}

export const updateProfile = async (updates: ProfileUpdate): Promise<User> => {
  try {
    const response = await apiClient.patch<ApiResponse<User>>('/auth/profile', updates)
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Profile update failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'PROFILE_UPDATE_ERROR'
      )
    }
  } catch (error) {
    console.error('Profile update error:', error)
    throw error
  }
}

export const getCurrentUser = createApiCall<User>(
  () => apiClient.get<ApiResponse<User>>('/auth/me')
)

export const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/forgot-password',
      { email }
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Password reset request failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'PASSWORD_RESET_ERROR'
      )
    }
  } catch (error) {
    console.error('Password reset request error:', error)
    throw error
  }
}

export const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/reset-password',
      { token, newPassword }
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Password reset failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'PASSWORD_RESET_ERROR'
      )
    }
  } catch (error) {
    console.error('Password reset error:', error)
    throw error
  }
}

export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/verify-email',
      { token }
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Email verification failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'EMAIL_VERIFICATION_ERROR'
      )
    }
  } catch (error) {
    console.error('Email verification error:', error)
    throw error
  }
}

export const resendVerificationEmail = async (): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/resend-verification'
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to resend verification email',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'RESEND_VERIFICATION_ERROR'
      )
    }
  } catch (error) {
    console.error('Resend verification error:', error)
    throw error
  }
}

// Two-factor authentication
export const enableTwoFactor = async (): Promise<{ 
  qrCode: string 
  secret: string 
  backupCodes: string[] 
}> => {
  try {
    const response = await apiClient.post<ApiResponse<{ 
      qrCode: string 
      secret: string 
      backupCodes: string[] 
    }>>('/auth/2fa/enable')
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to enable 2FA',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'TWO_FACTOR_ERROR'
      )
    }
  } catch (error) {
    console.error('Enable 2FA error:', error)
    throw error
  }
}

export const verifyTwoFactor = async (token: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/2fa/verify',
      { token }
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || '2FA verification failed',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'TWO_FACTOR_VERIFY_ERROR'
      )
    }
  } catch (error) {
    console.error('2FA verification error:', error)
    throw error
  }
}

export const disableTwoFactor = async (token: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/2fa/disable',
      { token }
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to disable 2FA',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'TWO_FACTOR_DISABLE_ERROR'
      )
    }
  } catch (error) {
    console.error('Disable 2FA error:', error)
    throw error
  }
}

// Session management
export const getSessions = createApiCall<Array<{
  id: string
  deviceInfo: string
  ipAddress: string
  location: string
  isCurrentSession: boolean
  lastActive: Date
  createdAt: Date
}>>(
  () => apiClient.get<ApiResponse<Array<{
    id: string
    deviceInfo: string
    ipAddress: string
    location: string
    isCurrentSession: boolean
    lastActive: Date
    createdAt: Date
  }>>>('/auth/sessions')
)

export const revokeSession = async (sessionId: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/auth/sessions/${sessionId}`
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to revoke session',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'REVOKE_SESSION_ERROR'
      )
    }
  } catch (error) {
    console.error('Revoke session error:', error)
    throw error
  }
}

export const revokeAllSessions = async (): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      '/auth/sessions/all'
    )
    
    if (response.data.success && response.data.data) {
      return response.data.data
    } else {
      throw new ApiClientError(
        response.data.error?.message || 'Failed to revoke all sessions',
        response.status,
        response.data.error?.code ? String(response.data.error.code) : 'REVOKE_ALL_SESSIONS_ERROR'
      )
    }
  } catch (error) {
    console.error('Revoke all sessions error:', error)
    throw error
  }
}

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateUsername = (username: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long')
  }
  
  if (username.length > 20) {
    errors.push('Username must be no more than 20 characters long')
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
} 