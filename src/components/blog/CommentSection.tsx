import React, { useState } from 'react';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Comment } from '@/contexts/BlogContext';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (content: string) => void;
  className?: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  onAddComment,
  className = '',
}) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      await onAddComment(comment);
      setComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
      
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[80px]"
                disabled={isSubmitting}
              />
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!comment.trim() || isSubmitting}
                  className="bg-[#5E936C] hover:bg-[#4a7a5a]"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 border rounded-lg bg-gray-50">
          <p className="text-gray-600">
            Please{' '}
            <a href="/login" className="text-[#5E936C] hover:underline font-medium">
              sign in
            </a>{' '}
            to leave a comment.
          </p>
        </div>
      )}

      <div className="space-y-6 mt-8">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="h-10 w-10 mt-1">
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{comment.author}</h4>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-800">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
