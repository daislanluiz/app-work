import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { useStore } from '../store';
import { ViewState } from '../types';

interface CreatePostProps {
  onNavigate: (view: ViewState) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onNavigate }) => {
  const { createPost, currentUser } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) {
     return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
            <h2 className="text-xl text-white font-bold mb-2">Join to Post</h2>
            <p className="text-slate-400 mb-6">You need to be logged in to share your work.</p>
            <button onClick={() => onNavigate(ViewState.LOGIN)} className="bg-primary px-6 py-2 rounded-full text-white">Login</button>
        </div>
     );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !selectedFile) return;

    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
        createPost(title, description, selectedFile);
        setIsSubmitting(false);
        onNavigate(ViewState.PROFILE);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">New Project</h1>
        <button onClick={() => onNavigate(ViewState.FEED)} className="text-slate-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Image Upload Area */}
        <div className="w-full">
          <label className="block text-slate-400 text-sm mb-2">Project Image</label>
          <div className="relative w-full aspect-video bg-secondary rounded-xl border-2 border-dashed border-slate-700 overflow-hidden flex flex-col items-center justify-center hover:border-slate-500 transition-colors group">
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                  }}
                  className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-red-500 transition-colors"
                >
                    <X size={16} />
                </button>
              </>
            ) : (
              <>
                <Upload size={48} className="text-slate-600 mb-2 group-hover:text-slate-400" />
                <p className="text-slate-500 text-sm">Click to upload image</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>

        {/* Text Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-secondary border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none placeholder-slate-600"
              placeholder="e.g. Minimalist Branding Kit"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-secondary border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none placeholder-slate-600 h-32 resize-none"
              placeholder="Describe your process, tools used, and the outcome..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!title || !description || !selectedFile || isSubmitting}
          className="w-full bg-primary hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center"
        >
          {isSubmitting ? 'Publishing...' : (
             <>
                <Check size={20} className="mr-2" /> Publish Project
             </>
          )}
        </button>
      </form>
    </div>
  );
};