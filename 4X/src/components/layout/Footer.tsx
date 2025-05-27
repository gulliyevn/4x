'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const serviceLinks = [
    { href: '/markets', label: 'Market' },
    { href: '/demo', label: 'Trader AI' },
    { href: '/dashboard', label: 'News' },
    { href: '/portfolio', label: 'Brokers' },
    { href: '/charts', label: 'More' }
  ]

  const informationLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/return', label: 'Return Policy' },
    { href: '/terms', label: 'Terms & Condition' },
    { href: '/privacy', label: 'Privacy Policy' }
  ]

  const customerServiceLinks = [
    { href: '/services', label: 'Service' },
    { href: '/feedback', label: 'Feedback' },
    { href: '/demo', label: 'Tutorial' },
    { href: '/contact', label: 'Contact' }
  ]

  const socialLinks = [
    { href: 'https://www.facebook.com/', icon: 'fa-brands fa-facebook', color: 'text-[#1877F2]' },
    { href: 'https://x.com/?mx=2', icon: 'fa-brands fa-x-twitter', color: 'text-[#1DA1F2]' },
    { href: 'https://www.youtube.com/', icon: 'fa-brands fa-youtube', color: 'text-[#FF0000]' },
    { href: 'https://web.telegram.org/', icon: 'fa-brands fa-telegram', color: 'text-[#0088cc]' },
    { href: 'https://www.instagram.com/', icon: 'fa-brands fa-instagram', color: 'text-[#E1306C]' }
  ]

  return (
    <footer className="body-font">
      <div className="container pt-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Link href="/">
              <Image 
                id="logo" 
                src="/assets/logo.png" 
                alt="Company Logo" 
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </Link>
            <span className="pl-2 text-sm font-semibold text-black">
              Create<br />your Reality
            </span>
          </div>
          <p className="mt-2 text-sm text-black">
            We combine the power of AI and advanced analytical tools to help you make more confident and informed decisions in the world of trading. Our innovative solutions allow you to receive accurate forecasts and deep analytics, making your trading more efficient and profitable.
          </p>
        </div>
        
        <div className="flex-grow flex flex-wrap md:pl-20 -md:-10 md:mt-0 mt-10 md:text-left text-center">
          {/* Services */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">Services</h2>
            <div className="list-none mb-10">
              {serviceLinks.map((link) => (
                <li key={link.href} className="mb-2">
                  <Link className="text-gray-400 hover:text-black" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </div>
          </div>
          
          {/* Information */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">INFORMATION</h2>
            <div className="list-none mb-10">
              {informationLinks.map((link) => (
                <li key={link.href} className="mb-2">
                  <Link className="text-gray-400 hover:text-black" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </div>
          </div>
          
          {/* Customer Service */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">CUSTOMER SERVICE</h2>
            <div className="list-none mb-10">
              {customerServiceLinks.map((link) => (
                <li key={link.href} className="mb-2">
                  <Link className="text-gray-400 hover:text-black" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </div>
          </div>
          
          {/* Subscribe */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">SUBSCRIBE</h2>
            <p className="mt-2 text-sm text-gray-500">
              Start your Trading journey with 4X, learn new skills and<br />be informed about all events!
            </p>
            <div className="mt-6">
              {socialLinks.map((social, index) => (
                <Link 
                  key={social.href}
                  className={`text-xl ${index > 0 ? 'ml-5' : ''}`} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${social.icon} ${social.color} social-icon transition-all duration-100 hover:saturate-100 saturate-0 transition-[filter]`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-opacity-75">
        <div className="container mx-auto py-4 sm:flex-row">
          <p className="text-sm text-center sm:text-left">© 2025. All Rights Reserved by 4X</p>
        </div>
      </div>
    </footer>
  )
} 