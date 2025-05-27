'use client';

import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Trader',
      company: 'Goldman Sachs',
      content: 'The 4X platform has revolutionized my trading experience. The AI-powered insights and real-time analytics have significantly improved my trading performance.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Portfolio Manager',
      company: 'JP Morgan',
      content: 'Outstanding platform with exceptional security features. The user interface is intuitive and the execution speed is unmatched in the industry.',
      rating: 5,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Forex Analyst',
      company: 'Deutsche Bank',
      content: 'The educational resources and market analysis tools provided by 4X have been instrumental in developing my trading strategies.',
      rating: 5,
      avatar: 'ER'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fas fa-star`}
        style={{
          color: index < rating ? 'var(--brand-warning)' : 'var(--gray-300)',
          fontSize: '1.25rem',
          marginRight: 'var(--space-1)'
        }}
      />
    ));
  };

  return (
    <section style={{
      padding: 'var(--space-20) 0',
      background: 'linear-gradient(135deg, var(--brand-secondary) 0%, #1a3a3c 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(2, 209, 254, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(152, 181, 164, 0.1) 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: 'var(--space-4)',
            letterSpacing: '-0.02em'
          }}>
            What Our Traders Say
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Join thousands of successful traders who trust our platform
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-12)',
            boxShadow: 'var(--shadow-xl)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {/* Quote Icon */}
            <div style={{
              fontSize: '3rem',
              color: 'var(--brand-primary)',
              textAlign: 'center',
              marginBottom: 'var(--space-6)'
            }}>
              <i className="fas fa-quote-left" />
            </div>

            {/* Testimonial Content */}
            <div style={{
              textAlign: 'center',
              marginBottom: 'var(--space-8)'
            }}>
              <p style={{
                fontSize: '1.25rem',
                lineHeight: '1.8',
                color: 'var(--gray-700)',
                fontStyle: 'italic',
                marginBottom: 'var(--space-6)'
              }}>
                "{testimonials[currentIndex].content}"
              </p>

              {/* Rating */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 'var(--space-6)'
              }}>
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              {/* Author Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-4)'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>
                  {testimonials[currentIndex].avatar}
                </div>

                {/* Author Details */}
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: 'var(--gray-900)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    {testimonials[currentIndex].name}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--gray-600)'
                  }}>
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-8)'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentIndex 
                    ? 'var(--brand-accent)' 
                    : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex(
              currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
            )}
            style={{
              position: 'absolute',
              left: '-60px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              color: 'var(--brand-primary)',
              fontSize: '1.25rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-lg)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <i className="fas fa-chevron-left" />
          </button>

          <button
            onClick={() => setCurrentIndex(
              currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
            )}
            style={{
              position: 'absolute',
              right: '-60px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              color: 'var(--brand-primary)',
              fontSize: '1.25rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-lg)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 