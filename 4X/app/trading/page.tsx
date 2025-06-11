'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, CardHeader, Button, Input, Badge, Alert } from '@/components/ui'

export default function TradingPage() {
  const [selectedPair, setSelectedPair] = useState('EURUSD')
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy')
  const [orderAmount, setOrderAmount] = useState('1000')
  const [leverage, setLeverage] = useState('10')
  const [showOrderConfirm, setShowOrderConfirm] = useState(false)

  // Mock live prices
  const [prices, setPrices] = useState({
    EURUSD: { bid: 1.0875, ask: 1.0877, change: 0.0012, changePercent: 0.11 },
    GBPUSD: { bid: 1.2645, ask: 1.2647, change: -0.0023, changePercent: -0.18 },
    USDJPY: { bid: 150.25, ask: 150.27, change: 0.45, changePercent: 0.30 },
    AUDUSD: { bid: 0.6721, ask: 0.6723, change: 0.0008, changePercent: 0.12 },
    USDCAD: { bid: 1.3542, ask: 1.3544, change: -0.0015, changePercent: -0.11 },
  })

  // Mock positions
  const [positions] = useState([
    {
      id: 1,
      pair: 'EURUSD',
      type: 'buy',
      amount: 5000,
      openPrice: 1.0865,
      currentPrice: 1.0875,
      profit: 50.00,
      profitPercent: 0.92,
      time: '14:25:33'
    },
    {
      id: 2,
      pair: 'GBPUSD', 
      type: 'sell',
      amount: 3000,
      openPrice: 1.2670,
      currentPrice: 1.2645,
      profit: 75.00,
      profitPercent: 2.47,
      time: '13:42:18'
    }
  ])

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const newPrices = { ...prev }
        Object.keys(newPrices).forEach(pair => {
          const pairKey = pair as keyof typeof newPrices
          const change = (Math.random() - 0.5) * 0.0002
          newPrices[pairKey].bid += change
          newPrices[pairKey].ask += change
          newPrices[pairKey].change += change
          newPrices[pairKey].changePercent = (newPrices[pairKey].change / newPrices[pairKey].bid) * 100
        })
        return newPrices
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handlePlaceOrder = () => {
    setShowOrderConfirm(true)
    setTimeout(() => {
      setShowOrderConfirm(false)
      setOrderAmount('1000')
    }, 2000)
  }

  const formatPrice = (price: number, pair: string) => {
    const decimals = pair.includes('JPY') ? 3 : 5
    return price.toFixed(decimals)
  }

  const marketWatchData = Object.entries(prices).map(([pair, data]) => ({
    pair,
    ...data
  }))

  return (
    <div className="min-h-screen bg-primary pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">Live Trading</h1>
              <p className="text-secondary">Real-time forex trading platform</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="success" className="text-sm">
                Market Open
              </Badge>
              <div className="text-right">
                <div className="text-sm text-secondary">Account Balance</div>
                <div className="text-lg font-bold text-primary">$25,847.50</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Confirmation Alert */}
        {showOrderConfirm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert type="success" dismissible onDismiss={() => setShowOrderConfirm(false)}>
              Order placed successfully! {orderType.toUpperCase()} {orderAmount} {selectedPair} at market price.
            </Alert>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Market Watch */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <h2 className="text-lg font-semibold">Market Watch</h2>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="space-y-1">
                    {marketWatchData.map((item) => (
                      <div
                        key={item.pair}
                        onClick={() => setSelectedPair(item.pair)}
                        className={`p-3 cursor-pointer transition-all duration-200 border-l-4 ${
                          selectedPair === item.pair
                            ? 'bg-accent-primary/10 border-accent-primary'
                            : 'hover:bg-secondary border-transparent'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-primary">{item.pair}</span>
                          <div className="text-right">
                            <div className="text-sm font-mono">
                              {formatPrice(item.bid, item.pair)}
                            </div>
                            <div className={`text-xs ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Chart Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{selectedPair} Chart</h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="success" className="text-xs">LIVE</Badge>
                      <span className="text-lg font-mono font-bold">
                        {formatPrice(prices[selectedPair as keyof typeof prices]?.bid || 0, selectedPair)}
                      </span>
                      <span className={`text-sm ${prices[selectedPair as keyof typeof prices]?.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {prices[selectedPair as keyof typeof prices]?.change >= 0 ? '+' : ''}
                        {prices[selectedPair as keyof typeof prices]?.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {/* Mock Chart Placeholder */}
                  <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-center z-10">
                      <div className="text-6xl mb-4">📈</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Live {selectedPair} Chart</h3>
                      <p className="text-gray-500">Real-time price chart would be displayed here</p>
                      <div className="mt-4 flex justify-center gap-2">
                        {['1M', '5M', '15M', '1H', '4H', '1D'].map((timeframe) => (
                          <button
                            key={timeframe}
                            className="px-3 py-1 text-xs bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                          >
                            {timeframe}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Order Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <h2 className="text-lg font-semibold">Place Order</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    {/* Buy/Sell Tabs */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setOrderType('buy')}
                        className={`py-2 px-4 rounded-lg font-medium transition-all ${
                          orderType === 'buy'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        BUY
                      </button>
                      <button
                        onClick={() => setOrderType('sell')}
                        className={`py-2 px-4 rounded-lg font-medium transition-all ${
                          orderType === 'sell'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        SELL
                      </button>
                    </div>

                    {/* Symbol */}
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">Symbol</label>
                      <select
                        value={selectedPair}
                        onChange={(e) => setSelectedPair(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                      >
                        {Object.keys(prices).map(pair => (
                          <option key={pair} value={pair}>{pair}</option>
                        ))}
                      </select>
                    </div>

                    {/* Amount */}
                    <Input
                      label="Amount (USD)"
                      type="number"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(e.target.value)}
                      fullWidth
                      prefix="$"
                    />

                    {/* Leverage */}
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">Leverage</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={leverage}
                          onChange={(e) => setLeverage(e.target.value)}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="min-w-[50px] text-sm font-medium">{leverage}x</span>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="p-3 bg-secondary rounded-lg text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Position Size:</span>
                        <span className="font-medium">${parseInt(orderAmount) * parseInt(leverage)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Margin Required:</span>
                        <span className="font-medium">${orderAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spread:</span>
                        <span className="font-medium">
                          {((prices[selectedPair as keyof typeof prices]?.ask || 0) - 
                            (prices[selectedPair as keyof typeof prices]?.bid || 0)).toFixed(5)}
                        </span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button
                      variant={orderType === 'buy' ? 'primary' : 'destructive'}
                      fullWidth
                      size="lg"
                      onClick={handlePlaceOrder}
                      loading={showOrderConfirm}
                    >
                      {orderType === 'buy' ? 'BUY' : 'SELL'} {selectedPair}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Positions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Open Positions</h2>
                <Badge variant="default" className="text-xs">
                  {positions.length} Active
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-secondary">Symbol</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-secondary">Type</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-secondary">Size</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-secondary">Open Price</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-secondary">Current Price</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-secondary">P&L</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-secondary">Time</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position) => (
                      <tr key={position.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <span className="font-medium">{position.pair}</span>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant={position.type === 'buy' ? 'success' : 'error'} size="xs">
                            {position.type.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 font-mono text-sm">${position.amount.toLocaleString()}</td>
                        <td className="py-3 px-2 font-mono text-sm">{formatPrice(position.openPrice, position.pair)}</td>
                        <td className="py-3 px-2 font-mono text-sm">{formatPrice(position.currentPrice, position.pair)}</td>
                        <td className="py-3 px-2">
                          <div className={`font-medium ${position.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${position.profit.toFixed(2)}
                          </div>
                          <div className={`text-xs ${position.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {position.profit >= 0 ? '+' : ''}{position.profitPercent.toFixed(2)}%
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-secondary">{position.time}</td>
                        <td className="py-3 px-2">
                          <Button variant="destructive" size="sm">
                            Close
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 