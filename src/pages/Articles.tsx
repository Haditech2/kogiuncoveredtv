import React from 'react';
import { ArticleGrid } from '@/components/blog/ArticleGrid';

const Articles: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Articles</h1>
        <p className="text-lg text-muted-foreground">
          Discover our complete collection of articles covering web development, design, and technology.
        </p>
      </div>
      <ArticleGrid />
    </div>
  );
};

export default Articles;