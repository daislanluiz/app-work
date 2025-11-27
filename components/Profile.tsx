import React, { useState } from 'react';
import { MapPin, Settings, Grid, LogOut, Edit2 } from 'lucide-react';
import { useStore } from '../store';
import { ViewState, User } from '../types';

interface ProfileProps {
  onNavigate: (view: ViewState) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { currentUser, posts, logout, updateProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  if (!currentUser) return null;

  const userPosts = posts.filter(p => p.userId === currentUser.id);

  const startEditing = () => {
    setEditForm({
      name: currentUser.name,
      bio: currentUser.bio,
      profession: currentUser.profession,
      location: currentUser.location
    });
    setIsEditing(true);
  };

  const saveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate(ViewState.LOGIN);
  };

  return (
    <div className="pb-24">
      {/* Header / Cover Area */}
      <div className="w-full h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative">
        <div className="absolute top-4 right-4 flex space-x-2">
           <button onClick={handleLogout} className="p-2 bg-black/30 rounded-full text-white backdrop-blur-md">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-5 -mt-12 mb-6">
        <div className="flex justify-between items-end mb-4">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-24 h-24 rounded-full border-4 border-background object-cover shadow-xl" 
          />
          {isEditing ? (
             <div className="flex space-x-2">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-full"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveProfile} 
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full"
                >
                  Save
                </button>
             </div>
          ) : (
            <button 
              onClick={startEditing} 
              className="px-4 py-2 bg-secondary border border-slate-700 text-white text-sm font-medium rounded-full hover:bg-slate-700 flex items-center"
            >
              <Edit2 size={14} className="mr-2" /> Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3 bg-secondary p-4 rounded-xl border border-slate-700">
            <input 
              value={editForm.name} 
              onChange={e => setEditForm({...editForm, name: e.target.value})}
              className="w-full bg-background p-2 rounded text-white border border-slate-700"
              placeholder="Name"
            />
             <input 
              value={editForm.profession} 
              onChange={e => setEditForm({...editForm, profession: e.target.value})}
              className="w-full bg-background p-2 rounded text-white border border-slate-700"
              placeholder="Profession"
            />
            <textarea 
              value={editForm.bio} 
              onChange={e => setEditForm({...editForm, bio: e.target.value})}
              className="w-full bg-background p-2 rounded text-white border border-slate-700"
              placeholder="Bio"
              rows={3}
            />
            <input 
              value={editForm.location} 
              onChange={e => setEditForm({...editForm, location: e.target.value})}
              className="w-full bg-background p-2 rounded text-white border border-slate-700"
              placeholder="Location"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
            <p className="text-primary font-medium">{currentUser.profession}</p>
            <p className="text-slate-300 text-sm leading-relaxed py-2">{currentUser.bio}</p>
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin size={14} className="mr-1" /> {currentUser.location}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-around border-y border-slate-800 py-4 mb-6 bg-secondary/30">
        <div className="text-center">
          <span className="block text-lg font-bold text-white">{userPosts.length}</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Posts</span>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold text-white">0</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Followers</span>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold text-white">0</span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">Following</span>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="px-2">
        <div className="flex items-center space-x-2 mb-4 px-2">
          <Grid size={20} className="text-white" />
          <h3 className="font-semibold text-white">Portfolio</h3>
        </div>
        
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1">
            {userPosts.map(post => (
              <div key={post.id} className="aspect-square bg-slate-800 relative group overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-secondary rounded-xl mx-2 border-dashed border-2 border-slate-700">
            <p className="text-slate-400">No work posted yet.</p>
            <button 
              onClick={() => onNavigate(ViewState.CREATE)}
              className="mt-4 text-primary font-medium"
            >
              Create your first post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};