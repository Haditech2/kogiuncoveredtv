import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Latest Updates from Kogi State
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fadeInUp animate-delay-100">
            Welcome to{' '}
            <span className="gradient-text bg-gradient-to-r from-primary to-secondary">Kogiuncovered</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fadeInUp animate-delay-200">
            Discover the latest news, stories, and insights from Kogi State and beyond. 
            <span className="block mt-2 text-primary font-medium">Your window to the heart of Nigeria.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animate-delay-300">
            <Button size="lg" className="text-lg px-8 btn-hover bg-gradient-to-r from-primary to-secondary text-white border-0">
              Start Reading
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 btn-hover border-primary/30 hover:bg-primary/5 hover:border-primary/50">
              <span className="relative z-10">Browse Topics</span>
              <span className="absolute inset-0 w-0 bg-primary/5 transition-all group-hover:w-full duration-300 ease-out"></span>
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
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1 + 0.4}s forwards`,
                  opacity: 0 
                }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text bg-gradient-to-r from-primary to-secondary">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;