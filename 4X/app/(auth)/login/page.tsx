import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In - 4X Trading Platform',
  description: 'Sign in to your 4X Trading Platform account to access professional trading tools and analytics.',
  keywords: ['login', 'sign in', 'trading platform', 'forex', '4X'],
  openGraph: {
    title: 'Sign In - 4X Trading Platform',
    description: 'Access your trading account with advanced tools and real-time market data.',
    type: 'website',
  },
}

export default function LoginPage() {
  return (
    <LoginForm 
      onSuccess={() => {
        // Redirect will be handled by the auth store
        window.location.href = '/dashboard'
      }}
    />
  )
} 