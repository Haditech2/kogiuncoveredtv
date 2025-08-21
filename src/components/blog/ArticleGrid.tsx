import React from 'react';
import BlogCard from './BlogCard';
import { useBlog } from '@/contexts/BlogContext';



export const ArticleGrid: React.FC = () => {
  const { posts } = useBlog();
  
  console.log('ArticleGrid - posts:', posts);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.length === 0 ? (
        <div className="col-span-3 text-center py-12">
          <h3 className="text-xl font-medium">No articles yet</h3>
          <p className="text-muted-foreground mt-2">Be the first to create a post!</p>
        </div>
      ) : (
        posts.map((article) => (
          <BlogCard
            key={article.id}
            post={article}
          />
        ))
      )}
    </div>
  );
};