import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, PenLine, LogIn, LogOut, Tv } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface BlogHeaderProps {
  onMenuClick?: () => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ onMenuClick }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/articles', label: 'Articles', end: false },
    { to: '/about', label: 'About', end: false },
    { to: '/contact', label: 'Contact', end: false },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-lg"
      style={{ background: 'linear-gradient(135deg, #0f5c2e 0%, #1a7a4a 50%, #1e9e5e 100%)' }}
    >
      {/* Gold shimmer accent line */}
      <div className="accent-line w-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center space-x-2 group">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}
              >
                <Tv className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight group-hover:opacity-90 transition-opacity">
                Kogiuncovered
                <span className="text-amber-300 font-black"> TV</span>
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/85 hover:bg-white/15 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/15 hover:text-white" asChild>
              <Link to="/search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>

            {isAdmin && (
              <Button
                size="sm"
                className="font-semibold border-0 text-white"
                style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}
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
                className="text-white hover:bg-white/15 hover:text-white flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/15 hover:text-white"
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

      {/* Mobile nav (shown when menu is open — simple overlay approach) */}
    </header>
  );
};

export { BlogHeader };
export default BlogHeader;