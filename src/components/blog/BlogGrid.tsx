import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useBlog } from '@/contexts/BlogContext';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  className?: string;
  loading?: boolean;
  maxPosts?: number;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren'
    }
  }
};

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
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6 mb-6 animate-pulse"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3 animate-pulse"></div>
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
      >
        {displayedPosts.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <h3 className="text-xl font-medium">No articles yet</h3>
            <p className="text-muted-foreground mt-2">Be the first to create a post!</p>
          </div>
        ) : (
          displayedPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              index={index % 10}
            />
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogGrid;