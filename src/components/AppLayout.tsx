import React from 'react';
import HeroSection from './blog/HeroSection';
import BlogGrid from './blog/BlogGrid';
import SearchBar from './blog/SearchBar';
import AdSlot from './ads/AdSlot';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar />
            <div className="mb-10 flex justify-center">
              <AdSlot adFormat="horizontal" className="min-w-[320px] max-w-[728px] w-full" />
            </div>
            <div className="mb-10 border-b border-border/70 pb-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Latest Coverage</p>
              <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">Top Stories from Kogi</h2>
              <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                Stay informed with verified reports, local perspectives, and the biggest stories shaping Kogi State.
              </p>
            </div>
            <BlogGrid />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AppLayout;
