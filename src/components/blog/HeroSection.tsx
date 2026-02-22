import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative border-b border-border/70 bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Independent news from Kogi State
          </div>

          <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl md:leading-tight">
            Modern Local Journalism,
            <span className="block text-primary">Built for Clarity and Trust</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Kogiuncovered TV delivers timely reporting, community voices, and practical insights from every part of the state.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="px-8" asChild>
              <Link to="/articles">
                Explore Today&apos;s Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link to="/about">
                <Newspaper className="mr-2 h-5 w-5" />
                About Our Coverage
              </Link>
            </Button>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { number: 'Daily', label: 'Updated Reporting' },
              { number: 'Local', label: 'Community Voices' },
              { number: 'Verified', label: 'Fact-Checked Stories' },
              { number: 'Focused', label: 'Kogi-First Coverage' }
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/80 bg-card p-5 text-left"
              >
                <div className="text-xl font-semibold text-foreground md:text-2xl">
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