import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Post } from '../types';
import { useStore } from '../store';

interface CommentsModalProps {
  post: Post;
  onClose: () => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ post, onClose }) => {
  const { addComment, currentUser } = useStore();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-md h-[80vh] rounded-2xl flex flex-col border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Comments</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {post.comments.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <p>No comments yet.</p>
              <p className="text-xs">Be the first to say something!</p>
            </div>
          ) : (
            post.comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <img src={comment.userAvatar} alt={comment.userName} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1 bg-secondary p-3 rounded-lg rounded-tl-none">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-white text-xs font-bold">{comment.userName}</span>
                    <span className="text-slate-600 text-[10px]">
                      {new Date(comment.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-snug">{comment.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-secondary border-t border-slate-800">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={currentUser ? "Add a comment..." : "Log in to comment"}
              disabled={!currentUser}
              className="flex-1 bg-background text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary border border-slate-700"
            />
            <button 
              type="submit" 
              disabled={!commentText.trim() || !currentUser}
              className="p-2 bg-primary rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};