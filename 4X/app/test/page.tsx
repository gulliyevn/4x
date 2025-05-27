'use client'

import { useState, useEffect } from 'react'

export default function TestPage() {
  const [mounted, setMounted] = useState(false)
  const [timestamp, setTimestamp] = useState<string>('')

  useEffect(() => {
    setMounted(true)
    setTimestamp(new Date().toISOString())
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Hydrating application...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Page</h1>
        <div className="space-y-4">
          <div>
            <strong>Status:</strong> ✅ Hydrated Successfully
          </div>
          <div>
            <strong>Timestamp:</strong> {timestamp}
          </div>
          <div>
            <strong>Environment:</strong> {process.env.NODE_ENV}
          </div>
          <div>
            <strong>Demo Mode:</strong> {process.env.NEXT_PUBLIC_DEMO_MODE === 'true' ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <a 
            href="/login" 
            className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </a>
          <a 
            href="/" 
            className="block w-full text-center bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  )
} 