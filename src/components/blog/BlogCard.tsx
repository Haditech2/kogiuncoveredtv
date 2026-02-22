import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/contexts/BlogContext';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  index?: number;
  // Add individual props for backward compatibility
  title?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  imageUrl?: string;
  slug?: string;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 16
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: i * 0.06,
      ease: [0.16, 1, 0.3, 1]
    }
  }),
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const BlogCard: React.FC<BlogCardProps> = ({ post, className = '', index = 0 }) => {
  
  const article = post || {
    title,
    excerpt,
    author,
    date,
    readTime,
    tags: tags || [],
    imageUrl: imageUrl || '/placeholder.svg',
    slug: slug || ''
  };

  const {
    title: articleTitle = '',
    excerpt: articleExcerpt = '',
    author: articleAuthor = 'Unknown Author',
    date: articleDate = '',
    readTime: articleReadTime = '',
    tags: articleTags = [],
    imageUrl: articleImageUrl = '/placeholder.svg',
    slug: articleSlug = ''
  } = article;

  return (
    <motion.article
      variants={variants}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md ${className}`}
    >
      <Link to={`/articles/${articleSlug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={articleImageUrl}
            alt={articleTitle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex flex-wrap gap-2">
              {Array.isArray(articleTags) && articleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/40 bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center text-sm text-muted-foreground">
            <span className="flex items-center mr-4">
              <Calendar className="w-4 h-4 mr-1 text-primary" />
              {articleDate}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-primary" />
              {articleReadTime}
            </span>
          </div>

          <h3 className="mb-3 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
            {articleTitle}
          </h3>

          <p className="mb-5 line-clamp-2 text-muted-foreground">{articleExcerpt}</p>

          <div className="flex items-center text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-1">
            Read more
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;