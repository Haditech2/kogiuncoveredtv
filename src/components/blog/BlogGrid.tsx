import React from 'react';
import { useBlog } from '@/contexts/BlogContext';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  className?: string;
  loading?: boolean;
  maxPosts?: number;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  className = '',
  loading = false,
  maxPosts = 3,
}) => {
  const { posts } = useBlog();

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const displayedPosts = sortedPosts.slice(0, maxPosts);

  // Skeleton loading state
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
            <div className="aspect-video animate-pulse bg-muted"></div>
            <div className="p-6">
              <div className="mb-4 h-4 w-3/4 animate-pulse rounded bg-muted"></div>
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-muted"></div>
              <div className="mb-6 h-4 w-5/6 animate-pulse rounded bg-muted"></div>
              <div className="flex justify-between">
                <div className="h-3 w-1/3 animate-pulse rounded bg-muted"></div>
                <div className="h-3 w-1/4 animate-pulse rounded bg-muted"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {displayedPosts.length === 0 ? (
        <div className="col-span-3 py-12 text-center">
          <h3 className="text-xl font-medium">No articles yet</h3>
          <p className="mt-2 text-muted-foreground">Be the first to create a post!</p>
        </div>
      ) : (
        displayedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default BlogGrid;