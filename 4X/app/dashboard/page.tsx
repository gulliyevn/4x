'use client'

import { ProtectedRoute } from '@/components/auth'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            4X Trading Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Portfolio Overview
              </h2>
              <p className="text-gray-600">
                Your trading portfolio and performance metrics.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Market Analysis
              </h2>
              <p className="text-gray-600">
                Real-time market data and trading signals.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Trading Tools
              </h2>
              <p className="text-gray-600">
                Advanced charting and analysis tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 