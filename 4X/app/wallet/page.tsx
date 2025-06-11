'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader, Button, Input, Badge, Alert } from '@/components/ui'

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock wallet data
  const walletData = {
    totalBalance: 25847.50,
    availableBalance: 23547.50,
    usedMargin: 2300.00,
    equity: 25947.50,
    freeMargin: 23647.50,
    marginLevel: 1127.5,
    currency: 'USD'
  }

  const handleDeposit = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setDepositAmount('')
    }, 3000)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'deposit', label: 'Deposit', icon: '⬇️' },
    { id: 'withdraw', label: 'Withdraw', icon: '⬆️' },
    { id: 'history', label: 'History', icon: '📝' }
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
          <h1 className="text-4xl font-bold text-primary mb-2">Wallet</h1>
          <p className="text-secondary">Manage your funds and transactions</p>
        </motion.div>

        {/* Success Alert */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert type="success" dismissible onDismiss={() => setShowSuccess(false)}>
              Transaction submitted successfully! It may take a few minutes to process.
            </Alert>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="elevated">
                <CardBody className="p-0">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-primary text-white border-r-4 border-accent-primary'
                            : 'text-secondary hover:bg-secondary hover:text-primary'
                        }`}
                      >
                        <span className="text-lg">{tab.icon}</span>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Balance Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card variant="elevated" className="bg-gradient-primary text-white">
                      <CardBody>
                        <div className="text-center">
                          <div className="text-3xl mb-2">💰</div>
                          <h3 className="text-sm opacity-90 mb-1">Total Balance</h3>
                          <div className="text-2xl font-bold">${walletData.totalBalance.toLocaleString()}</div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card variant="elevated" className="bg-gradient-secondary text-white">
                      <CardBody>
                        <div className="text-center">
                          <div className="text-3xl mb-2">💳</div>
                          <h3 className="text-sm opacity-90 mb-1">Available Balance</h3>
                          <div className="text-2xl font-bold">${walletData.availableBalance.toLocaleString()}</div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card variant="elevated" className="bg-gradient-light">
                      <CardBody>
                        <div className="text-center">
                          <div className="text-3xl mb-2">📈</div>
                          <h3 className="text-sm text-secondary mb-1">Used Margin</h3>
                          <div className="text-2xl font-bold text-primary">${walletData.usedMargin.toLocaleString()}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <Card variant="elevated">
                    <CardHeader>
                      <h2 className="text-xl font-semibold">Quick Actions</h2>
                    </CardHeader>
                    <CardBody>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          onClick={() => setActiveTab('deposit')}
                        >
                          Deposit Funds
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          fullWidth
                          onClick={() => setActiveTab('withdraw')}
                        >
                          Withdraw Funds
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* Deposit Tab */}
              {activeTab === 'deposit' && (
                <Card variant="elevated">
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Deposit Funds</h2>
                    <p className="text-secondary">Add money to your trading account</p>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-6">
                      <div className="max-w-md">
                        <Input
                          label="Deposit Amount"
                          type="number"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder="Enter amount"
                          fullWidth
                          prefix="$"
                        />
                        <div className="mt-2 flex gap-2">
                          {[100, 500, 1000, 5000].map(amount => (
                            <button
                              key={amount}
                              onClick={() => setDepositAmount(amount.toString())}
                              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                            >
                              ${amount}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleDeposit}
                        disabled={!depositAmount}
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Placeholder for other tabs */}
              {(activeTab === 'withdraw' || activeTab === 'history') && (
                <Card variant="elevated">
                  <CardBody>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🚧</div>
                      <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                      <p className="text-secondary">This feature is under development</p>
                    </div>
                  </CardBody>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
