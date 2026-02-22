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
    y: 20
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1]
    }
  }),
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] // Using cubic-bezier values for smoother animation
    }
  }
};

export const BlogCard: React.FC<BlogCardProps> = ({ post, className = '', index = 0 }) => {
  // Generate a random color for the tag
  const tagColors = [
    'text-white',           // emerald
    'text-white',           // green
    'text-white',           // amber
    'text-white',           // teal-green
    'text-white',           // deep green
  ];
  const tagGradients = [
    'linear-gradient(135deg, #1a7a4a, #1e9e5e)',
    'linear-gradient(135deg, #15803d, #16a34a)',
    'linear-gradient(135deg, #d97706, #f59e0b)',
    'linear-gradient(135deg, #0f766e, #14b8a6)',
    'linear-gradient(135deg, #0f5c2e, #1a7a4a)',
  ];

  const getTagGradient = (str: string) => {
    const hash = str.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return tagGradients[Math.abs(hash) % tagGradients.length];
  };

  // Handle both post object and individual props
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

  // Ensure required fields have default values
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
      className={`group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-emerald-400 dark:hover:border-emerald-600 ${className}`}
    >
      <Link to={`/articles/${articleSlug}`} className="block">
        {/* Image with overlay */}
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img
            src={articleImageUrl}
            alt={articleTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex flex-wrap gap-2">
              {Array.isArray(articleTags) && articleTags.map((tag) => (
                <motion.span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm text-white"
                  style={{ background: getTagGradient(tag) }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <span className="flex items-center mr-4">
              <Calendar className="w-4 h-4 mr-1 text-primary" />
              {articleDate}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-primary" />
              {articleReadTime}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
            {articleTitle}
          </h3>

          <p className="text-muted-foreground mb-5 line-clamp-2">{articleExcerpt}</p>

          <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
            Read more
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;