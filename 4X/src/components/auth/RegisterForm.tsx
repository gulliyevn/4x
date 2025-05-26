'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { RegisterData } from '@/types/auth'
import { Button, Input, Alert, Card, CardBody, Badge } from '@/components/ui'

// Multi-step form schemas
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  country: z.string().min(1, 'Please select your country'),
  dateOfBirth: z.string().min(1, 'Please enter your date of birth'),
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

const verificationSchema = z.object({
  emailCode: z.string().length(6, 'Verification code must be 6 digits'),
})

const termsSchema = z.object({
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  acceptPrivacy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
  marketingEmails: z.boolean().optional(),
})

type Step1Data = z.infer<typeof personalInfoSchema>
type Step2Data = z.infer<typeof passwordSchema>
type Step3Data = z.infer<typeof verificationSchema>
type Step4Data = z.infer<typeof termsSchema>

interface RegisterFormProps {
  onSuccess?: () => void
  className?: string
}

// Password strength calculator
const calculatePasswordStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0
  
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  
  const levels = [
    { label: 'Very Weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-orange-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Good', color: 'bg-blue-500' },
    { label: 'Strong', color: 'bg-green-500' },
  ]
  
  return { score, ...levels[score] }
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  className
}) => {
  const { register: registerUser, isLoading, error } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<RegisterData>>({})
  const [emailSent, setEmailSent] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  // Step 1: Personal Information
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange'
  })

  // Step 2: Password
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange'
  })

  // Step 3: Email Verification
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(verificationSchema),
    mode: 'onChange'
  })

  // Step 4: Terms and Conditions
  const step4Form = useForm<Step4Data>({
    resolver: zodResolver(termsSchema),
    mode: 'onChange'
  })

  const password = step2Form.watch('password') || ''
  const passwordStrength = calculatePasswordStrength(password)

  const onStep1Submit = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, ...data }))
    setCurrentStep(2)
  }

  const onStep2Submit = (data: Step2Data) => {
    setFormData(prev => ({ ...prev, password: data.password }))
    setCurrentStep(3)
    // Simulate sending email verification
    setEmailSent(true)
  }

  const onStep3Submit = (data: Step3Data) => {
    setFormData(prev => ({ ...prev, emailVerificationCode: data.emailCode }))
    setCurrentStep(4)
  }

  const onStep4Submit = async (data: Step4Data) => {
    try {
      const completeData: RegisterData = {
        ...formData,
        password: formData.password!,
        acceptTerms: data.acceptTerms,
        acceptPrivacy: data.acceptPrivacy,
        marketingEmails: data.marketingEmails || false,
      } as RegisterData
      
      await registerUser(completeData)
      setRegistrationComplete(true)
      onSuccess?.()
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const goBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Security', icon: '🔒' },
    { number: 3, title: 'Verification', icon: '📧' },
    { number: 4, title: 'Terms', icon: '📋' },
  ]

  if (registrationComplete) {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Welcome to 4X Trading Platform! We've sent a confirmation email to your inbox.
            </p>
            <Alert type="success" className="mb-6">
              Please check your email and click the verification link to activate your account.
            </Alert>
            <Button variant="primary" size="lg" onClick={onSuccess}>
              Continue to Dashboard
            </Button>
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
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join 4X Trading Platform and start your trading journey
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium
                  ${currentStep >= step.number 
                    ? 'bg-[#98b5a4] text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {currentStep > step.number ? '✓' : step.icon}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-[#98b5a4]' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-[#98b5a4]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              type="error"
              title="Registration Failed"
              className="mb-6"
              dismissible
            >
              {error}
            </Alert>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      {...step1Form.register('firstName')}
                      label="First Name"
                      placeholder="Enter your first name"
                      error={step1Form.formState.errors.firstName?.message}
                      fullWidth
                    />
                    <Input
                      {...step1Form.register('lastName')}
                      label="Last Name"
                      placeholder="Enter your last name"
                      error={step1Form.formState.errors.lastName?.message}
                      fullWidth
                    />
                  </div>

                  <Input
                    {...step1Form.register('email')}
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    error={step1Form.formState.errors.email?.message}
                    prefixIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    }
                    fullWidth
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      {...step1Form.register('phone')}
                      type="text"
                      label="Phone Number"
                      placeholder="+1 (555) 123-4567"
                      error={step1Form.formState.errors.phone?.message}
                      fullWidth
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        {...step1Form.register('country')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98b5a4] focus:border-[#98b5a4] transition-colors"
                      >
                        <option value="">Select your country</option>
                        <option value="US">United States</option>
                        <option value="TR">Turkey</option>
                        <option value="RU">Russia</option>
                        <option value="GB">United Kingdom</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                      {step1Form.formState.errors.country && (
                        <p className="text-xs text-red-600 mt-1">
                          {step1Form.formState.errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Input
                    {...step1Form.register('dateOfBirth')}
                    type="text"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    error={step1Form.formState.errors.dateOfBirth?.message}
                    fullWidth
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={!step1Form.formState.isValid}
                  >
                    Continue
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Password Setup */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-6">
                  <Input
                    {...step2Form.register('password')}
                    type="password"
                    label="Password"
                    placeholder="Create a strong password"
                    error={step2Form.formState.errors.password?.message}
                    prefixIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                    fullWidth
                  />

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Password Strength:</span>
                        <Badge variant={passwordStrength.score >= 4 ? 'success' : passwordStrength.score >= 3 ? 'warning' : 'error'}>
                          {passwordStrength.label}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="grid grid-cols-2 gap-2">
                          <span className={password.length >= 8 ? 'text-green-600' : ''}>
                            ✓ At least 8 characters
                          </span>
                          <span className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                            ✓ Uppercase letter
                          </span>
                          <span className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                            ✓ Lowercase letter
                          </span>
                          <span className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                            ✓ Number
                          </span>
                          <span className={/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}>
                            ✓ Special character
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Input
                    {...step2Form.register('confirmPassword')}
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    error={step2Form.formState.errors.confirmPassword?.message}
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
                      disabled={!step2Form.formState.isValid}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Email Verification */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
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
                    <strong>{formData.email}</strong>
                  </p>
                </div>

                {emailSent && (
                  <Alert type="info" className="mb-6">
                    Verification email sent! Please check your inbox and spam folder.
                  </Alert>
                )}

                <form onSubmit={step3Form.handleSubmit(onStep3Submit)} className="space-y-6">
                  <Input
                    {...step3Form.register('emailCode')}
                    type="text"
                    label="Verification Code"
                    placeholder="Enter 6-digit code"
                    error={step3Form.formState.errors.emailCode?.message}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    fullWidth
                  />

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-[#98b5a4] hover:text-[#89a396] transition-colors"
                      onClick={() => setEmailSent(true)}
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
                      disabled={!step3Form.formState.isValid}
                    >
                      Verify Email
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 4: Terms and Conditions */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={step4Form.handleSubmit(onStep4Submit)} className="space-y-6">
                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        {...step4Form.register('acceptTerms')}
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-[#98b5a4] focus:ring-[#98b5a4] focus:ring-2 focus:ring-opacity-50"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        I agree to the{' '}
                        <Link href="/terms" className="text-[#98b5a4] hover:text-[#89a396]">
                          Terms and Conditions
                        </Link>
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {step4Form.formState.errors.acceptTerms && (
                      <p className="text-xs text-red-600 ml-6">
                        {step4Form.formState.errors.acceptTerms.message}
                      </p>
                    )}

                    <label className="flex items-start">
                      <input
                        {...step4Form.register('acceptPrivacy')}
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-[#98b5a4] focus:ring-[#98b5a4] focus:ring-2 focus:ring-opacity-50"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        I agree to the{' '}
                        <Link href="/privacy" className="text-[#98b5a4] hover:text-[#89a396]">
                          Privacy Policy
                        </Link>
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {step4Form.formState.errors.acceptPrivacy && (
                      <p className="text-xs text-red-600 ml-6">
                        {step4Form.formState.errors.acceptPrivacy.message}
                      </p>
                    )}

                    <label className="flex items-start">
                      <input
                        {...step4Form.register('marketingEmails')}
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-[#98b5a4] focus:ring-[#98b5a4] focus:ring-2 focus:ring-opacity-50"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        I would like to receive marketing emails and updates about new features
                        <span className="text-gray-500"> (optional)</span>
                      </span>
                    </label>
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
                      disabled={!step4Form.formState.isValid || isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
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

export default RegisterForm 