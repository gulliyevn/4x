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
  GraduationCap, 
  BookOpen, 
  Video, 
  FileText,
  Users,
  Clock,
  Star,
  Search,
  Filter,
  Play,
  Download,
  CheckCircle,
  TrendingUp,
  BarChart3,
  DollarSign,
  Shield,
  Zap,
  Target,
  Award,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessons: number
  students: number
  rating: number
  price: number
  instructor: string
  category: string
  thumbnail: string
  tags: string[]
  isPopular?: boolean
  isFree?: boolean
}

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  author: string
  publishedAt: string
  thumbnail: string
  tags: string[]
}

export default function EducationPage() {
  const { success } = useToastContext()
  const [activeTab, setActiveTab] = useState('courses')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete Forex Trading Masterclass',
      description: 'Learn forex trading from scratch with our comprehensive course covering technical analysis, fundamental analysis, and risk management.',
      level: 'beginner',
      duration: '12 hours',
      lessons: 45,
      students: 15420,
      rating: 4.8,
      price: 199,
      instructor: 'John Smith',
      category: 'Forex',
      thumbnail: '/api/placeholder/300/200',
      tags: ['Forex', 'Technical Analysis', 'Risk Management'],
      isPopular: true
    },
    {
      id: '2',
      title: 'Advanced Cryptocurrency Trading',
      description: 'Master cryptocurrency trading with advanced strategies, DeFi protocols, and portfolio management techniques.',
      level: 'advanced',
      duration: '8 hours',
      lessons: 32,
      students: 8930,
      rating: 4.9,
      price: 299,
      instructor: 'Sarah Chen',
      category: 'Cryptocurrency',
      thumbnail: '/api/placeholder/300/200',
      tags: ['Crypto', 'DeFi', 'Portfolio Management']
    },
    {
      id: '3',
      title: 'Stock Market Fundamentals',
      description: 'Understanding stock markets, company analysis, and long-term investment strategies for building wealth.',
      level: 'beginner',
      duration: '10 hours',
      lessons: 38,
      students: 12340,
      rating: 4.7,
      price: 0,
      instructor: 'Michael Rodriguez',
      category: 'Stocks',
      thumbnail: '/api/placeholder/300/200',
      tags: ['Stocks', 'Fundamental Analysis', 'Investment'],
      isFree: true
    },
    {
      id: '4',
      title: 'Options Trading Strategies',
      description: 'Learn advanced options trading strategies including spreads, straddles, and hedging techniques.',
      level: 'intermediate',
      duration: '6 hours',
      lessons: 24,
      students: 6780,
      rating: 4.6,
      price: 149,
      instructor: 'Emily Watson',
      category: 'Options',
      thumbnail: '/api/placeholder/300/200',
      tags: ['Options', 'Derivatives', 'Hedging']
    },
    {
      id: '5',
      title: 'AI Trading Algorithms',
      description: 'Build and deploy AI-powered trading algorithms using machine learning and quantitative analysis.',
      level: 'advanced',
      duration: '15 hours',
      lessons: 52,
      students: 4560,
      rating: 4.9,
      price: 399,
      instructor: 'Dr. Alex Johnson',
      category: 'AI Trading',
      thumbnail: '/api/placeholder/300/200',
      tags: ['AI', 'Machine Learning', 'Algorithms'],
      isPopular: true
    },
    {
      id: '6',
      title: 'Risk Management Essentials',
      description: 'Master risk management techniques to protect your capital and maximize trading performance.',
      level: 'intermediate',
      duration: '4 hours',
      lessons: 18,
      students: 9870,
      rating: 4.8,
      price: 99,
      instructor: 'Lisa Park',
      category: 'Risk Management',
      thumbnail: '/api/placeholder/300/200',
      tags: ['Risk Management', 'Psychology', 'Capital Protection']
    }
  ]

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Market Volatility: A Comprehensive Guide',
      excerpt: 'Learn how to navigate volatile markets and turn uncertainty into opportunity with proven strategies.',
      category: 'Market Analysis',
      readTime: '8 min read',
      author: 'John Smith',
      publishedAt: '2024-01-15',
      thumbnail: '/api/placeholder/400/250',
      tags: ['Volatility', 'Market Analysis', 'Strategy']
    },
    {
      id: '2',
      title: 'The Psychology of Trading: Mastering Your Emotions',
      excerpt: 'Discover how to control emotions, avoid common psychological traps, and develop a winning mindset.',
      category: 'Trading Psychology',
      readTime: '12 min read',
      author: 'Dr. Sarah Chen',
      publishedAt: '2024-01-12',
      thumbnail: '/api/placeholder/400/250',
      tags: ['Psychology', 'Emotions', 'Mindset']
    },
    {
      id: '3',
      title: 'DeFi Yield Farming: Opportunities and Risks',
      excerpt: 'Explore the world of decentralized finance and learn how to maximize yields while managing risks.',
      category: 'DeFi',
      readTime: '10 min read',
      author: 'Michael Rodriguez',
      publishedAt: '2024-01-10',
      thumbnail: '/api/placeholder/400/250',
      tags: ['DeFi', 'Yield Farming', 'Cryptocurrency']
    },
    {
      id: '4',
      title: 'Technical Analysis: Chart Patterns That Work',
      excerpt: 'Master the most reliable chart patterns and technical indicators for better trading decisions.',
      category: 'Technical Analysis',
      readTime: '15 min read',
      author: 'Emily Watson',
      publishedAt: '2024-01-08',
      thumbnail: '/api/placeholder/400/250',
      tags: ['Technical Analysis', 'Chart Patterns', 'Indicators']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'forex', label: 'Forex' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'cryptocurrency', label: 'Cryptocurrency' },
    { id: 'options', label: 'Options' },
    { id: 'ai-trading', label: 'AI Trading' },
    { id: 'risk-management', label: 'Risk Management' }
  ]

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesCategory = selectedCategory === 'all' || 
                           course.category.toLowerCase().replace(' ', '-') === selectedCategory
    
    return matchesSearch && matchesLevel && matchesCategory
  })

  const handleEnrollCourse = (courseTitle: string, price: number) => {
    if (price === 0) {
      success('Enrolled Successfully! 🎉', `You've been enrolled in "${courseTitle}" for free`)
    } else {
      success('Redirecting to Payment...', `Enrolling in "${courseTitle}" - $${price}`)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
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
            <GraduationCap className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Trading Education
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master the markets with our comprehensive trading education platform. 
            Learn from industry experts and accelerate your trading journey.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Users className="h-8 w-8 text-blue-500" />, value: '50,000+', label: 'Students' },
              { icon: <BookOpen className="h-8 w-8 text-green-500" />, value: '200+', label: 'Courses' },
              { icon: <Award className="h-8 w-8 text-yellow-500" />, value: '4.8/5', label: 'Rating' },
              { icon: <Clock className="h-8 w-8 text-purple-500" />, value: '1000+', label: 'Hours' }
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center hover-lift">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'courses', label: 'Courses', icon: <Video className="h-4 w-4" /> },
              { id: 'articles', label: 'Articles', icon: <FileText className="h-4 w-4" /> },
              { id: 'webinars', label: 'Webinars', icon: <Users className="h-4 w-4" /> },
              { id: 'tools', label: 'Tools', icon: <BarChart3 className="h-4 w-4" /> }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className="hover-scale"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Search and Filters */}
            <Card className="p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover-lift interactive-card h-full relative">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {course.isPopular && (
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {course.isFree && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          Free
                        </Badge>
                      )}
                    </div>

                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Play className="h-16 w-16 text-white opacity-80" />
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>

                    <div className="p-6">
                      {/* Level Badge */}
                      <Badge className={`mb-3 ${getLevelColor(course.level)}`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </Badge>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Course Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {course.lessons} lessons
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students.toLocaleString()}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(course.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                          {course.rating} ({course.students.toLocaleString()} students)
                        </span>
                      </div>

                      {/* Instructor */}
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        By {course.instructor}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.tags.map((tag) => (
                          <Badge key={tag} className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Price and Enroll */}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {course.price === 0 ? 'Free' : `$${course.price}`}
                        </div>
                        <Button
                          onClick={() => handleEnrollCourse(course.title, course.price)}
                          className="hover-scale"
                        >
                          {course.price === 0 ? 'Enroll Free' : 'Enroll Now'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover-lift interactive-card h-full">
                    {/* Thumbnail */}
                    <div className="h-48 bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-white opacity-80" />
                    </div>

                    <div className="p-6">
                      <Badge className="mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        {article.category}
                      </Badge>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {article.excerpt}
                      </p>

                      {/* Article Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span>{article.readTime}</span>
                        <span>By {article.author}</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.map((tag) => (
                          <Badge key={tag} className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full hover-scale">
                        Read Article
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Webinars Tab */}
        {activeTab === 'webinars' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Live Webinars Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join our expert-led webinars for real-time market analysis and trading strategies.
            </p>
            <Button>
              Get Notified
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Position Size Calculator',
                  description: 'Calculate optimal position sizes based on your risk tolerance',
                  icon: <Target className="h-8 w-8 text-blue-500" />,
                  category: 'Risk Management'
                },
                {
                  title: 'Profit/Loss Calculator',
                  description: 'Calculate potential profits and losses for your trades',
                  icon: <DollarSign className="h-8 w-8 text-green-500" />,
                  category: 'Trading Tools'
                },
                {
                  title: 'Economic Calendar',
                  description: 'Stay updated with important economic events and announcements',
                  icon: <Clock className="h-8 w-8 text-purple-500" />,
                  category: 'Market Data'
                },
                {
                  title: 'Market Screener',
                  description: 'Find trading opportunities with our advanced market screener',
                  icon: <Search className="h-8 w-8 text-orange-500" />,
                  category: 'Analysis'
                },
                {
                  title: 'Risk/Reward Calculator',
                  description: 'Analyze risk-to-reward ratios for better trade planning',
                  icon: <Shield className="h-8 w-8 text-red-500" />,
                  category: 'Risk Management'
                },
                {
                  title: 'Trading Journal',
                  description: 'Track and analyze your trading performance over time',
                  icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
                  category: 'Performance'
                }
              ].map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover-lift interactive-card h-full">
                    <div className="flex items-center mb-4">
                      {tool.icon}
                      <Badge className="ml-auto bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                        {tool.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {tool.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {tool.description}
                    </p>

                    <Button variant="outline" className="w-full hover-scale">
                      Use Tool
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <GraduationCap className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Trading Education Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of successful traders who have transformed their financial future 
              through our comprehensive education platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 hover-scale"
              >
                Browse Free Courses
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 hover-scale"
              >
                View All Courses
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 