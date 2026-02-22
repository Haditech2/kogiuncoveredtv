import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import BlogCard from '@/components/blog/BlogCard';
import { Search } from 'lucide-react';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchPosts } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchPosts>>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      setResults(searchPosts(query));
    } else {
      navigate('/');
    }
  }, [location.search, searchPosts, navigate]);

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="bg-background">
      <main className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 rounded-2xl border border-border/80 bg-card p-6 text-center md:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Search</p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight">Search Results</h1>
            <p className="text-lg text-muted-foreground">
              {results.length} result{results.length !== 1 ? 's' : ''} found for "{searchQuery}"
            </p>
          </div>
          
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.date}
                  readTime={post.readTime}
                  tags={post.tags}
                  imageUrl={post.imageUrl}
                  slug={post.slug}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/80 bg-card py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-medium">No results found</h3>
              <p className="text-muted-foreground">
                We couldn't find any articles matching "{searchQuery}". Try different keywords.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
