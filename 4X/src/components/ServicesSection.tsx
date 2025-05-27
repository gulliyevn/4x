'use client';

import React from 'react';

const ServicesSection: React.FC = () => {
  return (
    <main id="main-container" className="container mx-auto pt-0 h-auto mt-8 px-6 rounded">
      {/* Features Section */}
      <div id="services-header">
        <button className="text-black hover:text-gray-500 text-7xl mx-auto pl-2 pt-[70px]">Services</button>
      </div>

      {/* Services Section */}
      <section id="services-section" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Real-Time Charts */}
        <button 
          id="realtime-charts-btn"
          onClick={() => window.location.href = '/charts'}
          className="text-center p-6 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] dark-mode:text-white duration-100 rounded-lg transform hover:scale-105 transition-all duration-300 focus:outline-none"
        >
          <i className="fas fa-chart-line text-4xl mb-4 transition-all duration-100"></i>
          <h3 className="text-xl font-semibold mb-2 text-inherit">Real-Time Charts</h3>
          <p className="text-inherit">Access accurate and updated charts to make informed trading decisions.</p>
        </button>

        {/* AI-Powered Bot */}
        <button 
          id="ai-bot-btn"
          onClick={() => window.location.href = '/demo'}
          className="text-center p-6 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] dark-mode:text-white duration-100 rounded-lg transform hover:scale-105 transition-all duration-300 focus:outline-none"
        >
          <i className="fas fa-robot text-4xl mb-4 transition-all duration-100"></i>
          <h3 className="text-xl font-semibold mb-2 text-inherit">AI-Powered Bot</h3>
          <p className="text-inherit">Let our trading bot handle complex trades while you relax.</p>
        </button>

        {/* Expert Insights */}
        <button 
          id="expert-insights-btn"
          onClick={() => window.location.href = '/portfolio'}
          className="text-center p-6 bg-[#98b5a4] hover:bg-[#162A2C] text-black hover:text-[#D6E0E2] dark-mode:text-white duration-100 rounded-lg transform hover:scale-105 transition-all duration-300 focus:outline-none"
        >
          <i className="fas fa-user-tie text-4xl mb-4 transition-all duration-100"></i>
          <h3 className="text-xl font-semibold mb-2 text-inherit">Expert Insights</h3>
          <p className="text-inherit">Get insights and analytics from top trading experts.</p>
        </button>
      </section>
    </main>
  );
};

export default ServicesSection; 