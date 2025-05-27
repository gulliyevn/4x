import { AlertCircle } from 'lucide-react'

export function DemoModeIndicator() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            You are currently in Demo Mode. All data and trades are simulated.
            <a href="/upgrade" className="font-medium underline ml-1 hover:text-yellow-800">
              Upgrade to a real account
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 