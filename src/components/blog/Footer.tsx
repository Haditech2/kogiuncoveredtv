import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tv } from 'lucide-react';

export const Footer: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <footer style={{ background: 'linear-gradient(160deg, #0d4d27 0%, #0f5c2e 50%, #1a3a20 100%)' }} className="text-white border-t border-emerald-900/50">
      {/* Gold shimmer accent line at top */}
      <div className="accent-line w-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}>
                <Tv className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Kogiuncovered<span className="text-amber-400 font-black"> TV</span>
              </h3>
            </div>
            <p className="text-sm text-emerald-200/70">
              Your trusted source for news and stories from Kogi State and beyond.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Home</Link></li>
              <li><Link to="/articles" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Articles</Link></li>
              <li><Link to="/about" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">About</Link></li>
              <li><Link to="/contact" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Contact</Link></li>
              <li><Link to="/privacy" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Terms of Service</Link></li>
              {isAdmin && (
                <li><Link to="/create-post" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Create Post</Link></li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-400">Topics</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Politics</a></li>
              <li><a href="#" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Business</a></li>
              <li><a href="#" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Culture</a></li>
              <li><a href="#" className="text-emerald-200/60 hover:text-amber-400 transition-colors duration-200">Sports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-400">Connect</h4>
            <p className="text-sm text-emerald-200/60">
              Follow us for the latest updates and join our community of readers across Kogi State.
            </p>
          </div>
        </div>

        <div className="border-t border-emerald-800/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-emerald-300/50">
          <p>&copy; {new Date().getFullYear()} Kogiuncovered TV. All rights reserved.</p>
          <span className="hidden sm:inline">·</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-amber-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};