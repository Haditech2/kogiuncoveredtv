import React, { useState, useEffect } from 'react';

import RichTextEditor from '@/components/blog/RichTextEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import ImageUpload from '@/components/ui/ImageUpload';
import { Footer } from '@/components/blog/Footer';

const EditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { posts, editPost } = useBlog();

  // Load post data when component mounts
  useEffect(() => {
    if (postId) {
      const post = posts.find(p => p.id === postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setTags(post.tags);
        setFeaturedImage(post.imageUrl);
      } else {
        toast({
          title: 'Post not found',
          description: 'The post you are trying to edit could not be found',
          variant: 'destructive',
        });
        navigate('/articles');
      }
    }
  }, [postId, posts, navigate, toast]);

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !excerpt) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (postId) {
      // Update the post
      editPost(postId, {
        title,
        excerpt,
        content,
        tags: tags.length > 0 ? tags : ['Uncategorized'],
        imageUrl: featuredImage
      });

      toast({
        title: 'Success!',
        description: 'The post has been updated',
      });
      navigate('/articles');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Edit Post</h1>
          <p className="text-lg text-muted-foreground">
            Update your post content and details.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
          {/* Featured Image */}
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <ImageUpload
              value={featuredImage}
              onChange={setFeaturedImage}
              label="Upload a featured image"
            />
            {featuredImage && (
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                <ImageIcon className="h-3 w-3 mr-1" />
                Image selected
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base">Post Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter a compelling title"
                className="text-lg py-6"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="excerpt" className="text-base">Excerpt</Label>
              <Input 
                id="excerpt" 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)} 
                placeholder="A brief summary of your post (150-160 characters)"
                className="py-6"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="tags" className="text-base">Tags</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  id="tags" 
                  value={tag} 
                  onChange={(e) => setTag(e.target.value)} 
                  onKeyDown={handleKeyDown}
                  placeholder="Add tags and press Enter"
                  className="py-6"
                />
                <Button type="button" onClick={handleAddTag} variant="outline">Add</Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs py-1 px-3">
                      {t}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveTag(t)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="content" className="text-base">Content</Label>
              <RichTextEditor 
                initialValue={content} 
                onChange={setContent} 
                height={500}
                placeholder="Write your post content here..."
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/articles')}>Cancel</Button>
            <Button type="submit">Update Post</Button>
          </div>
        </form>
      <Footer />
    </div>
  );
};

export default EditPost;