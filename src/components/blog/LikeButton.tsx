import React from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';

interface LikeButtonProps {
  postId: string;
  likes: string[];
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ postId, likes, className = '' }) => {
  const { user } = useAuth();
  const { toggleLike } = useBlog();
  
  const isLiked = user?.id ? likes.includes(user.id) : false;
  const likeCount = likes.length;

  const handleLike = () => {
    if (!user?.id) return;
    toggleLike(postId, user.id);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={`p-2 rounded-full ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-100'}`}
        disabled={!user}
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        {isLiked ? (
          <Heart className="h-5 w-5 fill-current" />
        ) : (
          <Heart className="h-5 w-5" />
        )}
      </Button>
      <span className="text-sm text-gray-600">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
