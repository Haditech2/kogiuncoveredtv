import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { useBlog } from '@/contexts/BlogContext';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug } = useBlog();
  
  const article = slug ? getPostBySlug(slug) : undefined;
  
  if (!article) {
    return <Navigate to="/404" replace />;
  }
  
  return <ArticleContent article={article} />;
};

export default ArticleDetail;