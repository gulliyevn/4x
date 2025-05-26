import { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Create Account - 4X Trading Platform',
  description: 'Join thousands of traders on the 4X Trading Platform. Create your free account and start trading with professional tools.',
  keywords: ['register', 'sign up', 'create account', 'trading platform', 'forex', '4X'],
  openGraph: {
    title: 'Create Account - 4X Trading Platform',
    description: 'Start your trading journey with advanced tools, real-time data, and professional analytics.',
    type: 'website',
  },
}

export default function RegisterPage() {
  return (
    <RegisterForm 
      onSuccess={() => {
        // Redirect will be handled by the auth store
        window.location.href = '/dashboard'
      }}
    />
  )
} 