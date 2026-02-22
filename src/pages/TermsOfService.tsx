import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US')}</p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            Welcome to Kogiuncovered TV. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Our Service</h2>
          <p>
            Kogiuncovered TV provides news, stories, and content about Kogi State and beyond. You may browse, read, and share our content for personal, non-commercial use. You agree not to reproduce, distribute, or create derivative works from our content without prior written permission.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">User Conduct</h2>
          <p>
            You agree to use our service responsibly. You will not use our site to post false, defamatory, or unlawful content; interfere with our operations; or attempt to gain unauthorized access to our systems or other users&apos; data.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Advertisements</h2>
          <p>
            Our site may display advertisements provided by third parties, including Google AdSense. These ads are subject to the policies of the respective ad networks. Your interactions with advertisements are between you and the advertisers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
          <p>
            All content on Kogiuncovered TV, including text, images, and logos, is owned by us or our licensors. You may not use our branding or content without permission.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
          <p>
            Our content is provided for informational purposes only. We strive for accuracy but do not guarantee that all content is error-free or complete. You rely on our content at your own risk.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes</h2>
          <p>
            We may update these Terms of Service from time to time. Continued use of our site after changes constitutes acceptance of the revised terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:kogiuncoveredtv@gmail.com" className="text-primary hover:underline">
              kogiuncoveredtv@gmail.com
            </a>{' '}
            or visit our <Link to="/contact" className="text-primary hover:underline">Contact</Link> page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
