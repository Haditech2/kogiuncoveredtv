import React from 'react';
import BlogHeader from './blog/BlogHeader';
import HeroSection from './blog/HeroSection';
import BlogGrid from './blog/BlogGrid';
import SearchBar from './blog/SearchBar';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main>
        <HeroSection />
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar />
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stay up to date with the latest trends and insights in web development
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
