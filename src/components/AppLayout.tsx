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
        <section className="py-14 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar />
            <div className="mb-8 flex justify-center">
              <AdSlot adFormat="horizontal" className="min-w-[320px] max-w-[728px] w-full" />
            </div>
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-bold tracking-tight">Latest Articles</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Stay up to date with the latest news and stories from Kogi State
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
