
import React, { useState } from 'react';
import { AppProvider, useStore } from './store';
import { ViewState, Post } from './types';
import { Navigation } from './components/Navigation';
import { Auth } from './components/Auth';
import { PostCard } from './components/PostCard';
import { Profile } from './components/Profile';
import { CreatePost } from './components/CreatePost';
import { CommentsModal } from './components/CommentsModal';
import { FinancialCalculator } from './components/FinancialCalculator';

const MainLayout = () => {
  const { currentUser, posts, users } = useStore();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.FEED);
  const [selectedPostForComments, setSelectedPostForComments] = useState<Post | null>(null);

  // Helper to find author
  const getAuthor = (userId: string) => users.find(u => u.id === userId) || users[0];

  const renderContent = () => {
    switch (currentView) {
      case ViewState.LOGIN:
      case ViewState.REGISTER:
        return <Auth view={currentView} onNavigate={setCurrentView} />;
      
      case ViewState.CREATE:
        return <CreatePost onNavigate={setCurrentView} />;
      
      case ViewState.PROFILE:
      case ViewState.EDIT_PROFILE:
        return <Profile onNavigate={setCurrentView} />;

      case ViewState.CALCULATOR:
        return <FinancialCalculator />;
      
      case ViewState.FEED:
      default:
        return (
          <div className="pb-24 pt-4 px-4">
            <header className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Discover</h1>
                <p className="text-slate-400 text-sm">Latest work from professionals</p>
              </div>
            </header>
            
            <div className="max-w-xl mx-auto">
              {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  author={getAuthor(post.userId)}
                  onCommentClick={() => setSelectedPostForComments(post)}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-200 font-sans selection:bg-primary selection:text-white">
      {/* Main Content Area */}
      <main className="w-full max-w-lg mx-auto min-h-screen relative bg-background shadow-2xl overflow-x-hidden">
        {renderContent()}
        
        {/* Modals */}
        {selectedPostForComments && (
          <CommentsModal 
            post={selectedPostForComments} 
            onClose={() => setSelectedPostForComments(null)} 
          />
        )}
      </main>

      {/* Navigation (Only show if not in auth screens) */}
      {currentView !== ViewState.LOGIN && currentView !== ViewState.REGISTER && (
        <Navigation currentView={currentView} onNavigate={setCurrentView} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
