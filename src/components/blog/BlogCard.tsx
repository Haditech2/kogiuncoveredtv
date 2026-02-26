import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Edit } from 'lucide-react';
import { BlogPost } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  post?: BlogPost;
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
export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  className = '',
  title,
  excerpt,
  author,
  date,
  readTime,
  tags,
  imageUrl,
  slug,
}) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const article = post || {
    id: '',
    title: title || '',
    excerpt: excerpt || '',
    author: author || 'Unknown Author',
    date: date || '',
    readTime: readTime || '',
    tags: tags || [],
    imageUrl: imageUrl || '/placeholder.svg',
    slug: slug || ''
  };

  const {
    id: articleId = '',
    title: articleTitle = '',
    excerpt: articleExcerpt = '',
    author: articleAuthor = 'Unknown Author',
    date: articleDate = '',
    readTime: articleReadTime = '',
    tags: articleTags = [],
    imageUrl: articleImageUrl = '/placeholder.svg',
    slug: articleSlug = ''
  } = article;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit-post/${articleId}`);
  };

  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg ${className}`}>
      {isAdmin && (
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      <Link to={`/articles/${articleSlug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={articleImageUrl}
            alt={articleTitle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                  className="rounded-full border border-white/40 bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3 flex flex-wrap items-center gap-y-1 text-sm text-muted-foreground">
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

          <p className="mb-4 text-sm font-medium text-foreground/75">By {articleAuthor}</p>

          <div className="flex items-center text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1">
            Read more
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;