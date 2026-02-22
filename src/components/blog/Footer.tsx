import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tv } from 'lucide-react';

export const Footer: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <footer className="border-t bg-muted/40 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Tv className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold">
                Kogiuncovered<span className="font-black text-primary"> TV</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for news and stories from Kogi State and beyond.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">Home</Link></li>
              <li><Link to="/articles" className="text-muted-foreground transition-colors hover:text-foreground">Articles</Link></li>
              <li><Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link></li>
              {isAdmin && (
                <li><Link to="/create-post" className="text-muted-foreground transition-colors hover:text-foreground">Create Post</Link></li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Topics</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Politics</a></li>
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Business</a></li>
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Culture</a></li>
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Sports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Connect</h4>
            <p className="text-sm text-muted-foreground">
              Follow us for the latest updates and join our community of readers across Kogi State.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t pt-8 text-sm text-muted-foreground sm:flex-row sm:gap-4">
          <p>&copy; {new Date().getFullYear()} Kogiuncovered TV. All rights reserved.</p>
          <span className="hidden sm:inline">·</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};