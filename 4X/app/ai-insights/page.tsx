'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AnimatedCounter, AnimatedPercentage } from '@/components/ui/AnimatedCounter'
import { EnhancedLoading } from '@/components/ui/EnhancedLoading'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  Eye,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react'

interface AIInsight {
  id: string
  type: 'bullish' | 'bearish' | 'neutral' | 'alert'
  asset: string
  confidence: number
  prediction: string
  timeframe: string
  reasoning: string[]
  impact: 'high' | 'medium' | 'low'
  timestamp: Date
}

interface MarketSentiment {
  overall: number
  fear_greed: number
  volatility: number
  momentum: number
}

export default function AIInsightsPage() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [sentiment, setSentiment] = useState<MarketSentiment>({
    overall: 72,
    fear_greed: 68,
    volatility: 45,
    momentum: 78
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')

  useEffect(() => {
    // Simulate loading AI insights
    const loadInsights = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockInsights: AIInsight[] = [
        {
          id: '1',
          type: 'bullish',
          asset: 'BTC/USD',
          confidence: 87.5,
          prediction: 'Strong upward momentum expected',
          timeframe: '24h',
          reasoning: [
            'Technical indicators show bullish divergence',
            'Volume spike indicates institutional buying',
            'Support level at $42,000 holding strong',
            'RSI oversold conditions suggest reversal'
          ],
          impact: 'high',
          timestamp: new Date()
        },
        {
          id: '2',
          type: 'bearish',
          asset: 'EUR/USD',
          confidence: 73.2,
          prediction: 'Potential downside pressure',
          timeframe: '4h',
          reasoning: [
            'ECB dovish stance weighing on EUR',
            'US dollar strength continues',
            'Breaking below key support at 1.0850',
            'Economic data showing weakness'
          ],
          impact: 'medium',
          timestamp: new Date()
        },
        {
          id: '3',
          type: 'alert',
          asset: 'AAPL',
          confidence: 91.3,
          prediction: 'High volatility expected',
          timeframe: '2h',
          reasoning: [
            'Earnings announcement in 2 hours',
            'Options activity unusually high',
            'Analyst upgrades/downgrades pending',
            'Market makers positioning for big move'
          ],
          impact: 'high',
          timestamp: new Date()
        },
        {
          id: '4',
          type: 'neutral',
          asset: 'Gold',
          confidence: 65.8,
          prediction: 'Sideways consolidation likely',
          timeframe: '1D',
          reasoning: [
            'Range-bound between $1,950-$2,000',
            'Fed policy uncertainty',
            'Mixed economic signals',
            'Technical indicators neutral'
          ],
          impact: 'low',
          timestamp: new Date()
        }
      ]
      
      setInsights(mockInsights)
      setIsLoading(false)
    }

    loadInsights()
  }, [selectedTimeframe])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'bullish': return <TrendingUp className="h-5 w-5 text-green-500" />
      case 'bearish': return <TrendingDown className="h-5 w-5 text-red-500" />
      case 'alert': return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default: return <Activity className="h-5 w-5 text-blue-500" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'bullish': return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'bearish': return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      case 'alert': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
      default: return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
    }
  }

  const timeframes = ['1H', '4H', '1D', '1W', '1M']

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <EnhancedLoading 
              variant="trading" 
              size="xl" 
              text="AI is analyzing market data..."
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-gray-600 dark:text-gray-300"
            >
              Processing millions of data points...
            </motion.p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600 mr-4 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              AI Market Intelligence
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced artificial intelligence analyzing global markets in real-time to provide 
            you with actionable trading insights and predictions.
          </p>
        </motion.div>

        {/* Market Sentiment Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Zap className="h-6 w-6 text-yellow-500 mr-2" />
                Market Sentiment Analysis
              </h2>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <CheckCircle className="h-4 w-4 mr-1" />
                Live
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <AnimatedPercentage
                  percentage={sentiment.overall}
                  label="Overall Sentiment"
                  color="blue"
                  size="lg"
                />
              </div>
              <div className="text-center">
                <AnimatedPercentage
                  percentage={sentiment.fear_greed}
                  label="Fear & Greed Index"
                  color="green"
                  size="lg"
                  delay={0.2}
                />
              </div>
              <div className="text-center">
                <AnimatedPercentage
                  percentage={sentiment.volatility}
                  label="Volatility Index"
                  color="orange"
                  size="lg"
                  delay={0.4}
                />
              </div>
              <div className="text-center">
                <AnimatedPercentage
                  percentage={sentiment.momentum}
                  label="Market Momentum"
                  color="purple"
                  size="lg"
                  delay={0.6}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Trading Insights
            </h2>
            <div className="flex space-x-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="hover-scale"
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className={`p-6 border-2 hover-lift interactive-card ${getInsightColor(insight.type)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {insight.asset}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {insight.timeframe} • {insight.impact.toUpperCase()} Impact
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      <AnimatedCounter
                        value={insight.confidence}
                        suffix="%"
                        decimals={1}
                        delay={0.5 + index * 0.1}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Confidence</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {insight.prediction}
                  </h4>
                  <div className="space-y-2">
                    {insight.reasoning.map((reason, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{insight.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <Button size="sm" variant="outline" className="hover-scale">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="p-6 md:p-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-0 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AI Performance Metrics
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time performance of our AI trading algorithms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  <AnimatedCounter value={94.7} suffix="%" decimals={1} delay={1} />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Prediction Accuracy
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Last 30 days
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  <AnimatedCounter value={2847} delay={1.2} />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Signals Generated
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This week
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  <AnimatedCounter value={127} delay={1.4} />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Markets Analyzed
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Real-time
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 