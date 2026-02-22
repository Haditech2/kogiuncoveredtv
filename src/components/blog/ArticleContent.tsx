import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Calendar, Edit, MessageCircle, Heart } from 'lucide-react';
import { BlogPost, Comment } from '@/contexts/BlogContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import { LikeButton } from './LikeButton';
import { CommentSection } from './CommentSection';
import AdSlot from '../ads/AdSlot';

interface ArticleContentProps {
  article: BlogPost;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { addComment, toggleLike } = useBlog();
  const [showComments, setShowComments] = useState(false);

  const handleEdit = () => {
    navigate(`/edit-post/${article.id}`);
  };

  const handleAddComment = async (content: string) => {
    if (!user) return;

    await addComment(article.id, {
      author: user.name || 'Anonymous',
      content,
      userId: user.id,
    });
  };

  const handleToggleLike = () => {
    if (!user?.id) return;
    toggleLike(article.id, user.id);
  };

  const commentCount = article.comments?.length || 0;
  const likeCount = article.likes?.length || 0;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-start">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="my-8 flex justify-center">
          <AdSlot adFormat="rectangle" className="min-w-[300px] max-w-[336px]" />
        </div>

        <div className="mt-12 pt-6 border-t">
          <div className="flex items-center space-x-4 mb-8">
            <LikeButton
              postId={article.id}
              likes={article.likes || []}
              className="mr-4"
            />

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
            </Button>
          </div>

          {showComments && (
            <div className="mt-6">
              <CommentSection
                postId={article.id}
                comments={article.comments || []}
                onAddComment={handleAddComment}
              />
            </div>
          )}
        </div>
      </article>
    </main>
  );
};