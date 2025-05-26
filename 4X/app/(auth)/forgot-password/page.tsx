import { Metadata } from 'next'
import { ForgotPassword } from '@/components/auth/ForgotPassword'

export const metadata: Metadata = {
  title: 'Reset Password - 4X Trading Platform',
  description: 'Reset your 4X Trading Platform password securely. Enter your email to receive a password reset link.',
  keywords: ['forgot password', 'reset password', 'password recovery', 'trading platform', '4X'],
  openGraph: {
    title: 'Reset Password - 4X Trading Platform',
    description: 'Securely reset your trading account password and regain access to your account.',
    type: 'website',
  },
}

export default function ForgotPasswordPage() {
  return (
    <ForgotPassword 
      onSuccess={() => {
        // Redirect to login after successful password reset
        window.location.href = '/login'
      }}
    />
  )
} 