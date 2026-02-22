import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f0faf4 0%, #e8f5ec 40%, #fefce8 100%)' }}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full animate-blob opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(26,122,74,0.18) 0%, rgba(30,158,94,0.08) 70%)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full animate-blob animation-delay-2000 opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.18) 0%, rgba(245,158,11,0.08) 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(26,122,74,0.15) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fadeInUp">
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm"
              style={{ background: 'linear-gradient(135deg, rgba(26,122,74,0.12), rgba(217,119,6,0.1))', border: '1px solid rgba(26,122,74,0.25)', color: '#1a7a4a' }}>
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: '#1a7a4a' }} />
                <span className="relative inline-flex rounded-full h-3 w-3"
                  style={{ backgroundColor: '#1a7a4a' }} />
              </span>
              Latest Updates from Kogi State
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fadeInUp animate-delay-100 text-gray-900">
            Welcome to{' '}
            <span className="gradient-text">Kogiuncovered</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 font-black"
              style={{ color: '#d97706' }}>
              TV
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fadeInUp animate-delay-200">
            Discover the latest news, stories, and insights from Kogi State and beyond.{' '}
            <span className="block mt-2 font-semibold" style={{ color: '#1a7a4a' }}>
              Your window to the heart of Nigeria.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animate-delay-300">
            <Button size="lg" className="text-lg px-8 btn-hover border-0 text-white" asChild
              style={{ background: 'linear-gradient(135deg, #1a7a4a, #1e9e5e)' }}>
              <Link to="/articles">
                Start Reading
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 font-semibold transition-all duration-300"
              style={{ borderColor: '#d97706', color: '#d97706' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(217,119,6,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <Newspaper className="mr-2 h-5 w-5" />
              Browse Topics
            </Button>
          </div>

          {/* Stats counter */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { number: '100+', label: 'Articles' },
              { number: '50k+', label: 'Readers' },
              { number: '3', label: 'Languages' },
              { number: '24/7', label: 'Updates' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="backdrop-blur-sm p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1 + 0.4}s forwards`,
                  opacity: 0,
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(26,122,74,0.15)',
                  boxShadow: '0 4px 20px rgba(26,122,74,0.08)'
                }}
              >
                <div className="text-2xl md:text-3xl font-black gradient-text">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;