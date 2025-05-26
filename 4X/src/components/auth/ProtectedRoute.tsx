'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { UserRole } from '@/types/auth'
import { Loading } from '@/components/ui'

interface ProtectedRouteProps {
  children: React.ReactNode
  /**
   * Required roles to access this route
   * If not provided, only authentication is required
   */
  allowedRoles?: UserRole[]
  /**
   * Redirect path for unauthenticated users
   * @default '/login'
   */
  redirectTo?: string
  /**
   * Show loading spinner while checking authentication
   * @default true
   */
  showLoading?: boolean
  /**
   * Custom fallback component for unauthorized access
   */
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/login',
  showLoading = true,
  fallback
}) => {
  const router = useRouter()
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    logout 
  } = useAuthStore()

  // Check if we need to redirect (no useEffect needed as the store handles auth state)

  // Still loading authentication status
  if (isLoading) {
    if (!showLoading) return null

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center p-8"
        >
          <Loading type="spinner" size="lg" />
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-medium text-gray-900">
              Verifying Access
            </h3>
            <p className="text-sm text-gray-600">
              Please wait while we check your authentication status...
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  // User is not authenticated
  if (!isAuthenticated || !user) {
    // Redirect to login page
    router.push(redirectTo)
    return null
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.includes(user.role)
    
    if (!hasRequiredRole) {
      // User doesn't have required role
      if (fallback) {
        return <>{fallback}</>
      }

      // Default unauthorized fallback
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center p-8"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. 
              {allowedRoles.length === 1 
                ? ` This page requires ${allowedRoles[0]} access.`
                : ` This page requires one of the following roles: ${allowedRoles.join(', ')}.`
              }
            </p>

            <div className="space-y-3">
              <div className="text-sm text-gray-500">
                Current role: <span className="font-medium text-gray-700">{user.role}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Go Back
                </button>
                
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#98b5a4] rounded-lg hover:bg-[#89a396] transition-colors"
                >
                  Go to Dashboard
                </button>
                
                <button
                  onClick={() => {
                    logout()
                    router.push('/login')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Switch Account
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }
  }

  // User is authenticated and has required permissions
  return <>{children}</>
}

/**
 * Higher-order component version of ProtectedRoute
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  )

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

/**
 * Hook for checking if user has specific roles
 */
export const useRequireAuth = (allowedRoles?: UserRole[]) => {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  
  const hasAccess = React.useMemo(() => {
    if (!isAuthenticated || !user) return false
    if (!allowedRoles || allowedRoles.length === 0) return true
    return allowedRoles.includes(user.role)
  }, [isAuthenticated, user, allowedRoles])

  return {
    isAuthenticated,
    hasAccess,
    isLoading,
    user,
    userRole: user?.role
  }
}

/**
 * Component for role-based conditional rendering
 */
interface RoleGuardProps {
  allowedRoles: UserRole[]
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  fallback = null,
  children
}) => {
  const { hasAccess } = useRequireAuth(allowedRoles)
  
  return hasAccess ? <>{children}</> : <>{fallback}</>
}

export default ProtectedRoute 