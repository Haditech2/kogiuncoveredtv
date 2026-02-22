import React from 'react';
import BlogHeader from './blog/BlogHeader';
import { Footer } from './blog/Footer';

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
      <Footer />
    </div>
  );
};
