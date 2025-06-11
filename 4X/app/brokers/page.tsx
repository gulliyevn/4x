'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { useToastContext } from '@/components/ToastProvider'
import { 
  Building2, 
  Star, 
  Shield, 
  TrendingUp,
  Globe,
  Award,
  Users,
  DollarSign,
  Search,
  Filter,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Clock,
  Phone,
  Mail,
  MapPin,
  MessageCircle
} from 'lucide-react'

interface Broker {
  id: string
  name: string
  logo: string
  rating: number
  reviews: number
  minDeposit: number
  spreads: string
  leverage: string
  regulation: string[]
  features: string[]
  pros: string[]
  cons: string[]
  website: string
  founded: number
  headquarters: string
  instruments: number
  platforms: string[]
  support: {
    phone: boolean
    email: boolean
    chat: boolean
    hours: string
  }
  accountTypes: {
    name: string
    minDeposit: number
    features: string[]
  }[]
  isRecommended?: boolean
  isSponsored?: boolean
}

export default function BrokersPage() {
  const { success } = useToastContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  const brokers: Broker[] = [
    {
      id: '1',
      name: 'MetaTrader Pro',
      logo: '/api/placeholder/80/80',
      rating: 4.8,
      reviews: 15420,
      minDeposit: 100,
      spreads: 'From 0.1 pips',
      leverage: 'Up to 1:500',
      regulation: ['FCA', 'CySEC', 'ASIC'],
      features: ['ECN Trading', 'Copy Trading', 'Mobile App', 'Expert Advisors'],
      pros: [
        'Tight spreads and low commissions',
        'Advanced trading platforms',
        'Strong regulatory oversight',
        'Excellent customer support'
      ],
      cons: [
        'Higher minimum deposit for some accounts',
        'Limited educational resources'
      ],
      website: 'https://metatraderpro.com',
      founded: 2010,
      headquarters: 'London, UK',
      instruments: 300,
      platforms: ['MetaTrader 4', 'MetaTrader 5', 'WebTrader', 'Mobile App'],
      support: {
        phone: true,
        email: true,
        chat: true,
        hours: '24/5'
      },
      accountTypes: [
        {
          name: 'Standard',
          minDeposit: 100,
          features: ['Variable spreads', 'No commission', 'All instruments']
        },
        {
          name: 'ECN',
          minDeposit: 500,
          features: ['Raw spreads', 'Low commission', 'Direct market access']
        },
        {
          name: 'VIP',
          minDeposit: 10000,
          features: ['Tightest spreads', 'Priority support', 'Personal manager']
        }
      ],
      isRecommended: true
    },
    {
      id: '2',
      name: 'TradeFX Global',
      logo: '/api/placeholder/80/80',
      rating: 4.6,
      reviews: 8930,
      minDeposit: 50,
      spreads: 'From 0.2 pips',
      leverage: 'Up to 1:400',
      regulation: ['FCA', 'ASIC'],
      features: ['Social Trading', 'Automated Trading', 'Risk Management', 'Analytics'],
      pros: [
        'Low minimum deposit',
        'User-friendly platform',
        'Good educational content',
        'Multiple payment methods'
      ],
      cons: [
        'Higher spreads on some pairs',
        'Limited advanced features'
      ],
      website: 'https://tradefxglobal.com',
      founded: 2015,
      headquarters: 'Sydney, Australia',
      instruments: 250,
      platforms: ['TradeFX Platform', 'MetaTrader 4', 'Mobile App'],
      support: {
        phone: true,
        email: true,
        chat: true,
        hours: '24/7'
      },
      accountTypes: [
        {
          name: 'Starter',
          minDeposit: 50,
          features: ['Basic features', 'Educational resources', 'Demo account']
        },
        {
          name: 'Professional',
          minDeposit: 1000,
          features: ['Advanced tools', 'Lower spreads', 'Priority support']
        }
      ],
      isSponsored: true
    },
    {
      id: '3',
      name: 'AlphaTrading',
      logo: '/api/placeholder/80/80',
      rating: 4.4,
      reviews: 12340,
      minDeposit: 200,
      spreads: 'From 0.3 pips',
      leverage: 'Up to 1:300',
      regulation: ['CySEC', 'BaFin'],
      features: ['Algorithmic Trading', 'Portfolio Management', 'Research Tools', 'API Access'],
      pros: [
        'Advanced algorithmic trading',
        'Comprehensive research tools',
        'Strong security measures',
        'Institutional-grade platform'
      ],
      cons: [
        'Higher learning curve',
        'Limited beginner resources'
      ],
      website: 'https://alphatrading.com',
      founded: 2008,
      headquarters: 'Frankfurt, Germany',
      instruments: 400,
      platforms: ['AlphaTrader Pro', 'MetaTrader 5', 'API Trading'],
      support: {
        phone: true,
        email: true,
        chat: false,
        hours: '24/5'
      },
      accountTypes: [
        {
          name: 'Classic',
          minDeposit: 200,
          features: ['Standard features', 'Basic research', 'Mobile access']
        },
        {
          name: 'Premium',
          minDeposit: 2000,
          features: ['Advanced analytics', 'API access', 'Dedicated support']
        }
      ]
    },
    {
      id: '4',
      name: 'SwiftBroker',
      logo: '/api/placeholder/80/80',
      rating: 4.2,
      reviews: 6780,
      minDeposit: 25,
      spreads: 'From 0.4 pips',
      leverage: 'Up to 1:200',
      regulation: ['FCA'],
      features: ['Copy Trading', 'Social Features', 'Mobile Trading', 'Education'],
      pros: [
        'Very low minimum deposit',
        'Great for beginners',
        'Strong educational platform',
        'Active trading community'
      ],
      cons: [
        'Limited advanced features',
        'Higher spreads',
        'Fewer instruments'
      ],
      website: 'https://swiftbroker.com',
      founded: 2018,
      headquarters: 'London, UK',
      instruments: 150,
      platforms: ['SwiftTrader', 'Mobile App', 'WebTrader'],
      support: {
        phone: false,
        email: true,
        chat: true,
        hours: '24/5'
      },
      accountTypes: [
        {
          name: 'Basic',
          minDeposit: 25,
          features: ['Basic trading', 'Educational content', 'Community access']
        },
        {
          name: 'Advanced',
          minDeposit: 500,
          features: ['Advanced tools', 'Lower fees', 'Priority support']
        }
      ]
    }
  ]

  const filters = [
    { id: 'all', label: 'All Brokers' },
    { id: 'recommended', label: 'Recommended' },
    { id: 'low-deposit', label: 'Low Minimum Deposit' },
    { id: 'regulated', label: 'Highly Regulated' },
    { id: 'advanced', label: 'Advanced Features' }
  ]

  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broker.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'recommended' && broker.isRecommended) ||
                         (selectedFilter === 'low-deposit' && broker.minDeposit <= 100) ||
                         (selectedFilter === 'regulated' && broker.regulation.length >= 3) ||
                         (selectedFilter === 'advanced' && broker.instruments >= 300)
    
    return matchesSearch && matchesFilter
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating
      case 'deposit': return a.minDeposit - b.minDeposit
      case 'reviews': return b.reviews - a.reviews
      default: return 0
    }
  })

  const handleVisitBroker = (brokerName: string, website: string) => {
    success('Redirecting...', `Opening ${brokerName} in a new tab`)
    window.open(website, '_blank')
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
            <Building2 className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Broker Comparison
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Compare and choose from the world's leading forex and CFD brokers. 
            Find the perfect trading partner for your investment goals.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search brokers, features, or platforms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.id)}
                    className="hover-scale"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="rating">Sort by Rating</option>
                <option value="deposit">Sort by Min Deposit</option>
                <option value="reviews">Sort by Reviews</option>
              </select>
            </div>
          </Card>
        </motion.div>

        {/* Brokers Grid */}
        <div className="space-y-6">
          {filteredBrokers.map((broker, index) => (
            <motion.div
              key={broker.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 md:p-8 hover-lift interactive-card relative overflow-hidden">
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {broker.isRecommended && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <Award className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                  {broker.isSponsored && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      <Zap className="h-3 w-3 mr-1" />
                      Sponsored
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Broker Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                        {broker.name.substring(0, 2)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {broker.name}
                        </h3>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(broker.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                              {broker.rating} ({broker.reviews.toLocaleString()} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {broker.regulation.map((reg) => (
                            <Badge key={reg} className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                              <Shield className="h-3 w-3 mr-1" />
                              {reg}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                        <div className="space-y-2">
                          {broker.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Trading Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Min Deposit:</span>
                            <span className="font-medium text-gray-900 dark:text-white">${broker.minDeposit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Spreads:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{broker.spreads}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Leverage:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{broker.leverage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Instruments:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{broker.instruments}+</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Pros
                        </h4>
                        <ul className="space-y-1">
                          {broker.pros.map((pro, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center">
                          <XCircle className="h-4 w-4 mr-2" />
                          Cons
                        </h4>
                        <ul className="space-y-1">
                          {broker.cons.map((con, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Panel */}
                  <div className="lg:col-span-1">
                    <Card className="p-6 bg-gray-50 dark:bg-gray-800 border-0">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {broker.rating}/5
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Overall Rating</p>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Founded:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{broker.founded}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Headquarters:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{broker.headquarters}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Support:</span>
                          <div className="flex space-x-1">
                            {broker.support.phone && <Phone className="h-4 w-4 text-green-500" />}
                            {broker.support.email && <Mail className="h-4 w-4 text-blue-500" />}
                            {broker.support.chat && <MessageCircle className="h-4 w-4 text-purple-500" />}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          onClick={() => handleVisitBroker(broker.name, broker.website)}
                          className="w-full hover-scale"
                          size="lg"
                        >
                          Visit Broker
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full hover-scale"
                          size="lg"
                        >
                          Compare
                        </Button>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Account Types</h5>
                        <div className="space-y-2">
                          {broker.accountTypes.map((account, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900 dark:text-white">{account.name}</span>
                                <span className="text-blue-600 dark:text-blue-400">${account.minDeposit}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredBrokers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No brokers found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Risk Warning</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Trading forex and CFDs involves significant risk and may not be suitable for all investors. 
                  Past performance is not indicative of future results. Please ensure you fully understand 
                  the risks involved and seek independent advice if necessary. The information provided is 
                  for educational purposes only and should not be considered as investment advice.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 