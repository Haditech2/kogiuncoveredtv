import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'kogiuncovered_cookie_consent';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 shadow-lg border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          We use cookies and similar technologies for analytics and to display ads (including Google AdSense).
          By continuing, you accept our{' '}
          <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>
          {' '}and{' '}
          <Link to="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
