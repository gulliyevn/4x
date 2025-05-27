'use client'

import React from 'react'
import MarketTicker from '@/components/ui/MarketTicker'
import HeroSection from '@/components/ui/HeroSection'
import ServicesSection from '@/components/ui/ServicesSection'
import { AreaChart, PieChart } from '@/components/ui/Charts'
import PriceDisplay from '@/components/ui/PriceDisplay'
import { mockMarketData, mockSymbols, mockNewsArticles } from '@/lib/mockData'

export default function HomePage() {
  const topSymbols = mockSymbols.slice(0, 6)
  const latestNews = mockNewsArticles.slice(0, 6)

  // Generate sample chart data
  const portfolioData = Array.from({ length: 30 }, (_, i) => ({
    x: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    y: 100000 + Math.random() * 20000,
    label: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
  }))

  const portfolioDistribution = [
    { label: 'Bitcoin (BTC)', value: 35000, color: '#f7931a' },
    { label: 'Ethereum (ETH)', value: 25000, color: '#627eea' },
    { label: 'Stocks', value: 20000, color: '#10b981' },
    { label: 'Forex', value: 15000, color: '#3b82f6' },
    { label: 'Cash', value: 5000, color: '#6b7280' }
  ]

  const stats = [
    { label: 'Active Users', value: '25,847', icon: '👥' },
    { label: 'AI Accuracy', value: '94.2%', icon: '🎯' },
    { label: 'Signals Processed', value: '1.2M', icon: '📊' },
    { label: 'Avg Profit per Trade', value: '$247', icon: '💰' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark-mode font-open-sans" data-testid="homepage">
      {/* Market Ticker */}
      <MarketTicker />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Market Section */}
      <section className="container mx-auto px-6 py-16">
        <div>
          <h2 className="text-black hover:text-gray-500 text-7xl mx-auto mb-6 pl-2 pt-[70px] text-center">
            Market
          </h2>
        </div>

        {/* Market Overview */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Market Prices */}
              <div className="lg:col-span-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="price-grid">
                  {topSymbols.map((symbol) => {
                    const marketPrice = mockMarketData[symbol.symbol]
                    if (!marketPrice) return null
                    
                    return (
                      <div key={symbol.symbol}>
                        <PriceDisplay
                          price={marketPrice.price}
                          previousPrice={marketPrice.prevPrice}
                          currency="USD"
                          decimals={symbol.pricePrecision}
                          size="md"
                          showChange={true}
                          showPercentage={true}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* Price History */}
                <div className="rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mt-6 bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Price History</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {topSymbols.slice(0, 5).map((symbol) => {
                      const marketPrice = mockMarketData[symbol.symbol]
                      if (!marketPrice) return null
                      
                      return (
                        <div key={symbol.symbol} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="font-medium text-gray-900 dark:text-white">{symbol.symbol}</span>
                          <PriceDisplay
                            price={marketPrice.price}
                            previousPrice={marketPrice.prevPrice}
                            currency="USD"
                            decimals={symbol.pricePrecision}
                            size="sm"
                            showChange={true}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="lg:col-span-2">
                <div className="rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Price Chart</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm rounded-md bg-[#98b5a4] text-white">1H</button>
                      <button className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">1D</button>
                      <button className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600">1W</button>
                    </div>
                  </div>
                  <div className="h-[400px]">
                    <AreaChart
                      data={portfolioData}
                      width={600}
                      height={400}
                      color="#98b5a4"
                      gradient={true}
                      showGrid={true}
                      showAxes={true}
                      animate={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Watchlist and News */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Watchlist */}
          <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Watchlist</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">Updates every 10 seconds</span>
            </div>

            <form className="mb-6">
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Enter pair (e.g., BTCUSDT)"
                  className="flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98b5a4] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-[#98b5a4] text-white rounded-lg hover:bg-[#162A2C] transition-colors duration-300"
                >
                  ADD
                </button>
              </div>
            </form>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="space-y-3">
                {topSymbols.map((symbol) => {
                  const marketPrice = mockMarketData[symbol.symbol]
                  if (!marketPrice) return null
                  
                  return (
                    <div key={symbol.symbol} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{symbol.symbol}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{symbol.name}</p>
                      </div>
                      <PriceDisplay
                        price={marketPrice.price}
                        previousPrice={marketPrice.prevPrice}
                        currency="USD"
                        decimals={symbol.pricePrecision}
                        size="sm"
                        showChange={true}
                        showPercentage={true}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* News */}
          <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">News</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">Updates every 5 minutes</span>
            </div>

            <div className="overflow-y-auto max-h-[600px]">
              <div className="space-y-4">
                {latestNews.map((article) => (
                  <div key={article.id} className="news-card p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>{article.source.name}</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="container mx-auto px-6 py-16">
        <div>
          <h2 className="text-black hover:text-gray-500 text-7xl mx-auto mb-6 pl-2 pt-[20px] text-center">
            Portfolio
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Performance */}
          <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Portfolio Performance</h3>
            <AreaChart
              data={portfolioData}
              width={500}
              height={300}
              color="#10b981"
              gradient={true}
              showGrid={true}
              showAxes={true}
              animate={true}
            />
          </div>

          {/* Portfolio Distribution */}
          <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Asset Allocation</h3>
            <PieChart
              data={portfolioDistribution}
              width={400}
              height={300}
              innerRadius={50}
              showLegend={true}
              showLabels={true}
              animate={true}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Create Your Reality with 4X</h2>
            <p className="text-gray-600 dark:text-gray-400">Real-time insights powered by AI-driven trading strategies.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                <p className="text-lg font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-4xl font-extrabold text-[#98b5a4] md:text-5xl">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-[50px] px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <div className="w-full h-[300px] bg-gradient-to-r from-[#98b5a4] to-[#162A2C] rounded-lg flex items-center justify-center">
              <span className="text-white text-6xl">📈</span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
              🔥 Dominate the Market.
              <strong className="text-[#98b5a4] sm:block">Start Winning Today</strong>
            </h2>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Your AI assistant for smarter trades and better results.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                className="inline-flex items-center px-6 py-3 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] transition-all duration-100 rounded-full shadow w-[135px] h-[55px] border-b-4"
                href="/demo"
              >
                Get Started
              </a>

              <a
                className="inline-flex items-center px-6 py-3 bg-[#162A2C] text-white hover:text-[#D6E0E2] transition-all duration-100 rounded-full shadow w-[135px] h-[55px] border-b-4"
                href="/demo"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 