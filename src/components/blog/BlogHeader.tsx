import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, PenLine, LogIn, LogOut, Tv, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface BlogHeaderProps {
  onMenuClick?: () => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ onMenuClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/articles', label: 'Articles', end: false },
    { to: '/about', label: 'About', end: false },
    { to: '/contact', label: 'Contact', end: false },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
    onMenuClick?.();
  };

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
              onClick={handleMenuToggle}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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

      {/* Mobile nav overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        />
        {/* Menu panel */}
        <div
          className="absolute top-0 left-0 right-0 mt-16 mx-4 rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200"
          style={{ background: 'linear-gradient(160deg, #0d4d27 0%, #0f5c2e 50%, #1a7a4a 100%)' }}
        >
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/15'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 pt-0 space-y-2 border-t border-white/10">
            <Link to="/search" className="flex items-center gap-2 w-full px-4 py-3 text-white/90 hover:bg-white/15 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Link>
            {isAdmin && (
              <Link to="/create-post" className="flex items-center gap-2 w-full px-4 py-3 rounded-lg transition-colors text-white font-medium" style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }} onClick={() => setMobileMenuOpen(false)}>
                <PenLine className="h-5 w-5" />
                <span>Write</span>
              </Link>
            )}
            {isAuthenticated ? (
              <button
                type="button"
                className="flex items-center gap-2 w-full px-4 py-3 text-white/90 hover:bg-white/15 rounded-lg transition-colors text-left"
                onClick={() => { setMobileMenuOpen(false); logout(); }}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 w-full px-4 py-3 text-white/90 hover:bg-white/15 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export { BlogHeader };
export default BlogHeader;