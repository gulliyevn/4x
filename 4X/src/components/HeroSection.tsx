'use client';

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="heroSection" className="relative">
      <div className="relative w-full h-[700px] overflow-hidden">
        <a href="#" id="heroImage">
          <img
            src="/assets/0.png"
            className="w-full h-full object-cover object-center transition-shadow duration-300 hover:shadow-lg hover:shadow-black/50"
            alt="Hero Background"
          />
        </a>
        <div className="absolute mt-2 bottom-0 left-0 right-0 p-4">
          <div className="w-full sm:w-2/3 text-bold pb-24">
            <h1 className="neon-title pl-6 sm:pl-[135px] md:pl-[135px] text-8xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-extrabold uppercase leading-tight pt-8" id="mainTitle">
              Create Your Reality.
            </h1>
            <p className="neon-paragraph sm:pl-[140px] sm:text-xl lg:text-2xl md:text-xl pb-4 hidden sm:block mt-4 font-extrabold leading-relaxed" id="mainSubtitle">
              Empower Your Trading with AI-Powered Insights! 🚀
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pl-[10px] sm:pl-[139px] pb-[40px] pt-4 flex gap-10 justify-center sm:justify-start" id="actionButtons">
            <a href="/pricing" id="getStartedBtn">
              <button className="px-6 py-3 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] dark-mode:text-white text-inherit transition-all duration-100 rounded-full shadow w-[200px] h-[55px]">
                Get Started
              </button>
            </a>
            <a href="/charts" id="realtimechartsBtn">
              <button className="px-6 py-3 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] dark-mode:text-white text-inherit transition-all duration-100 rounded-full shadow w-[200px] h-[55px]">
                Charts
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 