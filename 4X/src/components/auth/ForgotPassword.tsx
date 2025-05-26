'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { Button, Input, Alert, Card, CardBody } from '@/components/ui'

// Step schemas
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type EmailData = z.infer<typeof emailSchema>
type OtpData = z.infer<typeof otpSchema>
type PasswordData = z.infer<typeof passwordSchema>

interface ForgotPasswordProps {
  onSuccess?: () => void
  className?: string
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSuccess,
  className
}) => {
  const { isLoading, error } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [resetComplete, setResetComplete] = useState(false)

  // Step 1: Email form
  const emailForm = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange'
  })

  // Step 2: OTP form
  const otpForm = useForm<OtpData>({
    resolver: zodResolver(otpSchema),
    mode: 'onChange'
  })

  // Step 3: New password form
  const passwordForm = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange'
  })

  const onEmailSubmit = async (data: EmailData) => {
    try {
      // In a real app, you'd call the forgot password API
      // await authApi.forgotPassword(data.email)
      setEmail(data.email)
      setOtpSent(true)
      setCurrentStep(2)
    } catch (error) {
      console.error('Failed to send reset email:', error)
    }
  }

  const onOtpSubmit = async (data: OtpData) => {
    try {
      // In a real app, you'd verify the OTP
      // await authApi.verifyResetOtp(email, data.otp)
      setCurrentStep(3)
    } catch (error) {
      console.error('Failed to verify OTP:', error)
    }
  }

  const onPasswordSubmit = async (data: PasswordData) => {
    try {
      // In a real app, you'd reset the password
      // await authApi.resetPassword(email, data.password)
      setResetComplete(true)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to reset password:', error)
    }
  }

  const resendOtp = async () => {
    try {
      // In a real app, you'd resend the OTP
      // await authApi.resendResetOtp(email)
      setOtpSent(true)
    } catch (error) {
      console.error('Failed to resend OTP:', error)
    }
  }

  const goBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  if (resetComplete) {
    return (
      <Card className={className}>
        <CardBody className="p-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <Link href="/login">
              <Button variant="primary" size="lg">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardBody className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-600">
              {currentStep === 1 && "Enter your email address and we'll send you a reset code"}
              {currentStep === 2 && "Enter the verification code sent to your email"}
              {currentStep === 3 && "Create a new password for your account"}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                  ${currentStep >= step 
                    ? 'bg-[#98b5a4] text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {currentStep > step ? '✓' : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-[#98b5a4]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              type="error"
              title="Reset Failed"
              className="mb-6"
              dismissible
            >
              {error}
            </Alert>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Email Input */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                  <Input
                    {...emailForm.register('email')}
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    error={emailForm.formState.errors.email?.message}
                    prefixIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    }
                    fullWidth
                    autoComplete="email"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    disabled={!emailForm.formState.isValid || isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Code'}
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Step 2: OTP Verification */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600">
                    We've sent a 6-digit verification code to<br />
                    <strong>{email}</strong>
                  </p>
                </div>

                {otpSent && (
                  <Alert type="info" className="mb-6">
                    Reset code sent! Please check your inbox and spam folder.
                  </Alert>
                )}

                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                  <Input
                    {...otpForm.register('otp')}
                    type="text"
                    label="Verification Code"
                    placeholder="Enter 6-digit code"
                    error={otpForm.formState.errors.otp?.message}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    fullWidth
                  />

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-[#98b5a4] hover:text-[#89a396] transition-colors"
                      onClick={resendOtp}
                    >
                      Didn't receive the code? Resend
                    </button>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      fullWidth
                      onClick={goBack}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isLoading}
                      disabled={!otpForm.formState.isValid || isLoading}
                    >
                      {isLoading ? 'Verifying...' : 'Verify Code'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: New Password */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                  <Input
                    {...passwordForm.register('password')}
                    type="password"
                    label="New Password"
                    placeholder="Create a new password"
                    error={passwordForm.formState.errors.password?.message}
                    prefixIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                    fullWidth
                  />

                  <Input
                    {...passwordForm.register('confirmPassword')}
                    type="password"
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    error={passwordForm.formState.errors.confirmPassword?.message}
                    prefixIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    fullWidth
                  />

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      fullWidth
                      onClick={goBack}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isLoading}
                      disabled={!passwordForm.formState.isValid || isLoading}
                    >
                      {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                href="/login"
                className="font-medium text-[#98b5a4] hover:text-[#89a396] transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </CardBody>
    </Card>
  )
}

export default ForgotPassword 