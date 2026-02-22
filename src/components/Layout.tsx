import React from 'react';
import BlogHeader from './blog/BlogHeader';
import { Footer } from './blog/Footer';
import AdSlot from './ads/AdSlot';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <BlogHeader />
      <main className="flex-grow">
        {children}
      </main>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <AdSlot adFormat="horizontal" className="mx-auto min-w-[320px] max-w-[728px] w-full" />
      </div>
      <Footer />
    </div>
  );
};
