import React from 'react';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { Footer } from '@/components/blog/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Kogiuncovered</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Welcome to Kogiuncovered, your trusted source for news, stories, and insights from Kogi State and beyond.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              We're on a mission to uncover and share the stories that matter most to the people of Kogi State.
              Our team of dedicated journalists and contributors work tirelessly to bring you accurate,
              timely, and insightful content that keeps you informed about what's happening in our communities.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">What We Cover</h2>
            <ul>
              <li><strong>News:</strong> Breaking news and updates from Kogi State</li>
              <li><strong>Stories:</strong> Human-interest stories and features from across the state</li>
              <li><strong>Insights:</strong> Analysis and commentary on issues affecting Kogi State</li>
              <li><strong>Community:</strong> Profiles and spotlights on local communities and initiatives</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p>
              Kogiuncovered is powered by a team of dedicated journalists and local experts who are 
              passionate about bringing you the most relevant and accurate news from across Kogi State. 
              We're committed to ethical journalism and community-focused reporting.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Get In Touch</h2>
            <p>
              Have questions or suggestions? We'd love to hear from you! Reach out to us at  
               <br /><a href="mailto:info@kogiuncovered.tv" className="text-blue-600 dark:text-blue-400 hover:underline">
                kogiuncoveredtv@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;