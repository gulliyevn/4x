'use client'

import React from 'react'
import Link from 'next/link'

export default function ServicesSection() {
  const services = [
    {
      id: 'realtime-charts-btn',
      href: '/charts',
      icon: 'fas fa-chart-line',
      title: 'Real-Time Charts',
      description: 'Access accurate and updated charts to make informed trading decisions.'
    },
    {
      id: 'ai-bot-btn',
      href: '/demo',
      icon: 'fas fa-robot',
      title: 'AI-Powered Bot',
      description: 'Let our trading bot handle complex trades while you relax.'
    },
    {
      id: 'expert-insights-btn',
      href: '/portfolio',
      icon: 'fas fa-user-tie',
      title: 'Expert Insights',
      description: 'Get insights and analytics from top trading experts.'
    }
  ]

  return (
    <main id="main-container" className="container mx-auto pt-0 h-auto mt-8 px-6 rounded">
      {/* Features Section */}
      <div id="services-header">
        <h2 className="text-black hover:text-gray-500 text-7xl mx-auto pl-2 pt-[70px] text-center">
          Services
        </h2>
      </div>

      {/* Services Section */}
      <section id="services-section" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {services.map((service) => (
          <Link key={service.id} href={service.href}>
            <button
              id={service.id}
              className="service-card text-center p-6 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] dark-mode:text-white duration-100 rounded-lg transform hover:scale-105 transition-all duration-300 focus:outline-none w-full h-full"
            >
              <i className={`${service.icon} text-4xl mb-4 transition-all duration-100`}></i>
              <h3 className="text-xl font-semibold mb-2 text-inherit">{service.title}</h3>
              <p className="text-inherit">{service.description}</p>
            </button>
          </Link>
        ))}
      </section>
    </main>
  )
} 