'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/pricing')
  }

  const handleCharts = () => {
    router.push('/charts')
  }

  return (
    <section 
      id="heroSection" 
      className="relative"
      role="region"
      aria-label="Hero Section"
    >
      <div className="relative w-full h-[700px] overflow-hidden">
        <Image
          src="/assets/herobanner.png"
          alt="Hero Background"
          fill
          className="w-full h-full object-cover object-center transition-shadow duration-300 hover:shadow-lg hover:shadow-black/50"
          priority
        />
        
        {/* Hero overlay for better text visibility */}
        <div className="absolute inset-0 hero-overlay"></div>
        
        <div className="absolute mt-2 bottom-0 left-0 right-0 p-4">
          <div className="w-full sm:w-2/3 text-bold pb-24">
            <h1 
              className="neon-title pl-6 sm:pl-[135px] md:pl-[135px] text-8xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-extrabold uppercase leading-tight pt-8" 
              id="mainTitle"
            >
              Create Your Reality.
            </h1>
            <p 
              className="neon-paragraph sm:pl-[140px] sm:text-xl lg:text-2xl md:text-xl pb-4 hidden sm:block mt-4 font-extrabold leading-relaxed" 
              id="mainSubtitle"
            >
              Empower Your Trading with AI-Powered Insights! 🚀
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pl-[10px] sm:pl-[139px] pb-[40px] pt-4 flex gap-10 justify-center sm:justify-start" id="actionButtons">
            <button 
              onClick={handleGetStarted}
              className="px-6 py-3 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] dark-mode:text-white text-inherit transition-all duration-100 rounded-full shadow w-[200px] h-[55px]"
              aria-label="Get Started with 4X Trading"
            >
              Get Started
            </button>
            <button 
              onClick={handleCharts}
              className="px-6 py-3 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] dark-mode:text-white text-inherit transition-all duration-100 rounded-full shadow w-[200px] h-[55px]"
              aria-label="View Trading Charts"
            >
              Charts
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 