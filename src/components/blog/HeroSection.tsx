import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative border-b bg-gradient-to-b from-background to-muted/40 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Latest updates from Kogi State
          </div>

          <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Kogiuncovered TV
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Reliable reporting, meaningful stories, and clear insights from communities across Kogi.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="px-8" asChild>
              <Link to="/articles">
                Read Latest Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link to="/articles">
                <Newspaper className="mr-2 h-5 w-5" />
                Browse Categories
              </Link>
            </Button>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { number: '100+', label: 'Articles' },
              { number: '50k+', label: 'Readers' },
              { number: '3', label: 'Languages' },
              { number: '24/7', label: 'Updates' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/40"
              >
                <div className="text-2xl font-bold text-foreground md:text-3xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;