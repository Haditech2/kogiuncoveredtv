import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Contact</p>
        <h1 className="mb-8 text-4xl font-bold tracking-tight">Get In Touch</h1>

        <div className="prose prose-lg mb-8 max-w-none">
          <p className="text-muted-foreground">
            Have questions, suggestions, or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border/80 bg-card p-6 md:p-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message here..."
              rows={6}
            />
          </div>

          <Button type="submit" className="w-full h-11">
            Send Message
          </Button>
        </form>

        <div className="mt-12 rounded-2xl border border-border/80 bg-muted/40 p-6">
          <h3 className="text-lg font-semibold mb-2">Other Ways to Connect</h3>
          <p className="text-sm text-muted-foreground">
            Email us directly at <span className="font-medium text-foreground">kogiuncoveredtv@gmail.com</span> for editorial requests and partnerships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;