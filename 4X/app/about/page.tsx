'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  Mail
} from 'lucide-react'

// Team Member Interface
interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
    email?: string
  }
}

// Company Stats Interface
interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
  decimals?: number
}

export default function AboutPage() {
  // Company Statistics
  const stats: Stat[] = [
    { value: 50000, label: 'Active Traders', suffix: '+' },
    { value: 2.5, label: 'Billion in Volume', prefix: '$', suffix: 'B' },
    { value: 99.9, label: 'Uptime', suffix: '%', decimals: 1 },
    { value: 150, label: 'Countries Served', suffix: '+' }
  ]

  // Team Members
  const team: TeamMember[] = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Former Goldman Sachs trader with 15+ years in financial markets',
      image: '/api/placeholder/150/150',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'alex@4xanalytics.com'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Ex-Google engineer specializing in AI and machine learning',
      image: '/api/placeholder/150/150',
      social: {
        linkedin: '#',
        github: '#',
        email: 'sarah@4xanalytics.com'
      }
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Trading',
      bio: 'Quantitative analyst with expertise in algorithmic trading',
      image: '/api/placeholder/150/150',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@4xanalytics.com'
      }
    },
    {
      name: 'Emily Watson',
      role: 'Head of Design',
      bio: 'UX designer focused on creating intuitive trading experiences',
      image: '/api/placeholder/150/150',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@4xanalytics.com'
      }
    }
  ]

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: 'Security First',
      description: 'Your funds and data are protected with bank-level security and encryption.'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Lightning Fast',
      description: 'Execute trades in milliseconds with our high-performance infrastructure.'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'User-Centric',
      description: 'Every feature is designed with our users\' success and experience in mind.'
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: 'Global Reach',
      description: 'Access markets worldwide with 24/7 support in multiple languages.'
    }
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to democratize trading through AI'
    },
    {
      year: '2021',
      title: 'AI Engine Launch',
      description: 'Released our first AI-powered trading analysis platform'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded to 50+ countries with multi-language support'
    },
    {
      year: '2023',
      title: 'Series A Funding',
      description: 'Raised $25M to accelerate product development'
    },
    {
      year: '2024',
      title: 'Advanced Analytics',
      description: 'Launched next-gen AI with 95%+ prediction accuracy'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            About 4X Analytics
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Revolutionizing Trading
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Through AI Innovation
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize financial markets by providing cutting-edge AI tools 
            that empower traders of all levels to make informed decisions and achieve their financial goals.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      delay={0.5 + index * 0.1}
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 hover-lift">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-blue-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                To democratize access to sophisticated trading tools and AI-powered insights, 
                enabling traders worldwide to make data-driven decisions and achieve financial success 
                regardless of their experience level or background.
              </p>
            </Card>

            <Card className="p-8 hover-lift">
              <div className="flex items-center mb-6">
                <Star className="h-8 w-8 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                To become the world's leading AI-powered trading platform, where technology meets 
                human intuition to create unprecedented opportunities for financial growth and 
                market understanding.
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Card className="p-6 text-center hover-lift interactive-card h-full">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Key milestones in our mission to transform trading
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="p-6 hover-lift">
                      <div className="flex items-center mb-3">
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 mr-3">
                          {milestone.year}
                        </Badge>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                  </div>
                  
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The brilliant minds behind 4X Analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <Card className="p-6 text-center hover-lift interactive-card">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-3">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.email && (
                      <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-green-600 transition-colors">
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of successful traders who trust 4X Analytics for their trading decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 hover-scale"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 hover-scale"
              >
                Contact Sales
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 