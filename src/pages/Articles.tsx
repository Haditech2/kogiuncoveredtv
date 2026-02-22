import React from 'react';
import { ArticleGrid } from '@/components/blog/ArticleGrid';
import AdSlot from '@/components/ads/AdSlot';

const Articles: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-2xl border border-border/80 bg-card p-6 md:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Archive</p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight">All Articles</h1>
        <p className="text-base text-muted-foreground md:text-lg">
          Browse our complete coverage of politics, business, communities, culture, and public affairs across Kogi State.
        </p>
      </div>
      <div className="mb-8 flex justify-center">
        <AdSlot adFormat="horizontal" className="min-w-[320px] max-w-[728px] w-full" />
      </div>
      <ArticleGrid />
    </div>
  );
};

export default Articles;