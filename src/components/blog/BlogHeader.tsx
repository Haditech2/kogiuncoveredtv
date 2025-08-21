import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, PenLine, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface BlogHeaderProps {
  onMenuClick?: () => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ onMenuClick }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#5E936C] text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white">Kogiuncoverd TV</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-white hover:text-gray-200 transition-colors">
              Home
            </Link>
            <Link to="/articles" className="text-sm font-medium text-white hover:text-gray-200 transition-colors">
              Articles
            </Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-gray-200 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-gray-200 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
              <Search className="h-4 w-4" />
            </Button>
            
            {isAdmin && (
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                asChild
              >
                <Link to="/create-post" className="flex items-center space-x-1">
                  <PenLine className="h-4 w-4" />
                  <span>Write</span>
                </Link>
              </Button>
            )}
            
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout} 
                className="text-white hover:bg-white/10 hover:text-white flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/login" className="flex items-center space-x-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export { BlogHeader };
export default BlogHeader;