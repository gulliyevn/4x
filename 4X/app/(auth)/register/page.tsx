'use client'

import { RegisterForm } from '@/components/auth/RegisterForm'
import { DemoToggle } from '@/components/DemoToggle'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Join 4X Trading
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your account or try our demo
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Demo Toggle */}
        <div className="mb-6">
          <DemoToggle />
        </div>

                 {/* Register Form */}
         <RegisterForm />
       </div>
      </div>
     </div>
   )
} 