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
    <div className="min-h-screen bg-background">
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Search Results</h1>
            <p className="text-muted-foreground text-lg">
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
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No results found</h3>
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
