import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tv } from 'lucide-react';

export const Footer: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <footer className="border-t border-border/70 bg-card text-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Tv className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold">
                Kogiuncovered<span className="font-black text-primary"> TV</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your trusted source for stories that matter in Kogi State, delivered with accuracy, context, and community focus.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Quick Links</h4>
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
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Editorial Desk</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              For tips, corrections, partnerships, or story submissions, contact our editorial team.
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">kogiuncoveredtv@gmail.com</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Kogiuncovered TV. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};