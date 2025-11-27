import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import { Post, User } from '../types';
import { useStore } from '../store';

interface PostCardProps {
  post: Post;
  author: User;
  onCommentClick: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, author, onCommentClick }) => {
  const { currentUser, toggleLike } = useStore();
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;
  const [animateLike, setAnimateLike] = useState(false);

  const handleLike = () => {
    if (!currentUser) return; // Add logic to prompt login later
    toggleLike(post.id);
    if (!isLiked) {
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 300);
    }
  };

  const formatTime = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="w-full bg-secondary rounded-xl overflow-hidden shadow-lg border border-slate-700/50 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
          <div>
            <h3 className="text-white font-semibold text-sm">{author.name}</h3>
            <p className="text-primary text-xs font-medium">{author.profession}</p>
          </div>
        </div>
        <span className="text-slate-500 text-xs">{formatTime(post.timestamp)}</span>
      </div>

      {/* Image */}
      <div 
        className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer"
        onDoubleClick={handleLike}
      >
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`transition-transform duration-200 ${animateLike ? 'scale-125' : 'scale-100'}`}
            >
              <Heart 
                size={26} 
                className={isLiked ? "fill-red-500 text-red-500" : "text-white hover:text-red-400"} 
                strokeWidth={isLiked ? 0 : 2}
              />
            </button>
            <button onClick={onCommentClick} className="text-white hover:text-primary transition-colors">
              <MessageCircle size={26} />
            </button>
            <button className="text-white hover:text-primary transition-colors">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Likes Count */}
        <div className="mb-2">
          <span className="text-white font-semibold text-sm">{post.likes.length} likes</span>
        </div>

        {/* Content */}
        <div className="mb-2">
          <h4 className="text-white font-bold inline mr-2 text-sm">{post.title}</h4>
          <span className="text-slate-300 text-sm">{post.description}</span>
        </div>

        {/* View Comments */}
        {post.comments.length > 0 && (
          <button onClick={onCommentClick} className="text-slate-500 text-sm mt-1 hover:text-slate-300">
            View all {post.comments.length} comments
          </button>
        )}
      </div>
    </div>
  );
};