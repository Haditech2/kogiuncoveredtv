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
    { to: '/privacy', label: 'Privacy', end: false },
    { to: '/terms', label: 'Terms', end: false },
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
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/88">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.25rem] items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={handleMenuToggle}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="group flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Tv className="h-4 w-4" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-foreground transition-opacity group-hover:opacity-90 sm:text-xl">
                Kogiuncovered
                <span className="font-black text-primary"> TV</span>
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>

            {isAdmin && (
              <Button size="sm" className="font-semibold" asChild>
                <Link to="/create-post" className="flex items-center space-x-1">
                  <PenLine className="h-4 w-4" />
                  <span className="hidden sm:inline">Write</span>
                </Link>
              </Button>
            )}

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <Link to="/login" className="flex items-center space-x-1">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
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
        <div className="absolute left-0 right-0 top-0 mx-4 mt-16 overflow-hidden rounded-2xl border border-border/70 bg-background shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="space-y-2 border-t p-4 pt-0">
            <Link to="/search" className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Link>
            {isAdmin && (
              <Link to="/create-post" className="flex w-full items-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90" onClick={() => setMobileMenuOpen(false)}>
                <PenLine className="h-5 w-5" />
                <span>Write</span>
              </Link>
            )}
            {isAuthenticated ? (
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => { setMobileMenuOpen(false); logout(); }}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
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