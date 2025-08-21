import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const Footer: React.FC = () => {
  const { isAdmin } = useAuth();
  
  return (
    <footer className="border-t" style={{ backgroundColor: '#BBDCE5' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Kogiuncovered</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted source for news and stories from Kogi State and beyond.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/articles" className="text-muted-foreground hover:text-primary">Articles</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              {isAdmin && (
                <li><Link to="/create-post" className="text-muted-foreground hover:text-primary">Create Post</Link></li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Topics</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">React</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">TypeScript</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">CSS</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Performance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <p className="text-sm text-muted-foreground">
              Follow us for the latest updates and join our developer community.
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Kogiuncovered. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};