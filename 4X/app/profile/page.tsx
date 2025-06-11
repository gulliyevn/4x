'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader, Button, Input, Badge } from '@/components/ui'
import { useAuthStore } from '@/stores/authStore'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phoneNumber || '+1 (555) 123-4567',
    country: user?.preferences?.timezone || 'United States',
    timezone: user?.timezone || 'UTC-5',
    language: user?.locale || 'English',
  })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false)
    // Mock save success
    console.log('Profile updated:', formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const accountStats = [
    { label: 'Account Status', value: 'Verified', type: 'success' as const },
    { label: 'Account Type', value: 'Premium', type: 'primary' as const },
    { label: 'Member Since', value: 'Jan 2024', type: 'default' as const },
    { label: 'Last Login', value: '2 hours ago', type: 'default' as const },
  ]

  const tradingStats = [
    { label: 'Total Trades', value: '1,247', change: '+12%' },
    { label: 'Win Rate', value: '68.5%', change: '+2.1%' },
    { label: 'Total Volume', value: '$2.4M', change: '+18%' },
    { label: 'Profit/Loss', value: '+$24,680', change: '+8.5%' },
  ]

  return (
    <div className="min-h-screen bg-primary pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Profile</h1>
          <p className="text-secondary">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="elevated" hoverable>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <Button
                      variant={isEditing ? "outline" : "primary"}
                      size="sm"
                      onClick={isEditing ? handleSave : handleEdit}
                      leftIcon={
                        isEditing ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        )
                      }
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                    />
                    <Input
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                      prefixIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      }
                    />
                    <Input
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                      prefixIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      }
                    />
                    <Input
                      label="Country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                    />
                    <Input
                      label="Timezone"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                    />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Trading Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Trading Statistics</h2>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {tradingStats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-sm text-secondary mb-2">{stat.label}</div>
                        <Badge variant="success" className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Picture & Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="elevated">
                <CardBody className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary">
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-secondary text-sm mb-4">{formData.email}</p>
                  <Button variant="outline" size="sm" fullWidth>
                    Change Avatar
                  </Button>
                </CardBody>
              </Card>
            </motion.div>

            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Account Status</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    {accountStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-secondary">{stat.label}</span>
                        <Badge variant={stat.type} className="text-xs">
                          {stat.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      fullWidth
                      onClick={() => window.location.href = '/profile/settings'}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Profile Settings
                    </Button>
                    <Button variant="outline" size="sm" fullWidth>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h5l-5-5v5z" />
                      </svg>
                      Download Data
                    </Button>
                    <Button variant="outline" size="sm" fullWidth>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help & Support
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 