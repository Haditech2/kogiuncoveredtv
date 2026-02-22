import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US')}</p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            Kogiuncovered TV (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at kogiuncoveredtv.vercel.app and related sites.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>
            We may collect information you provide directly (e.g., when contacting us), information from your device and browser (e.g., IP address, browser type), and information collected automatically through cookies and similar technologies when you browse our site.
          </p>
          <p>
            We use cookies and similar tracking technologies to improve your experience, analyze site traffic, and support advertising. Third-party vendors, including Google, may use cookies to serve ads based on your prior visits to our site. You can control cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use collected information to operate our website, improve content, understand reader preferences, display relevant ads, and communicate with you when you contact us.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>
            We take reasonable measures to protect your information, but no transmission over the internet is completely secure. We encourage you to use caution when sharing personal data online.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Children&apos;s Privacy</h2>
          <p>
            Our site is not directed at children under 13. We do not knowingly collect personal information from children.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            For questions about this Privacy Policy, contact us at{' '}
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

export default PrivacyPolicy;
