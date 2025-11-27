import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Post, Comment } from './types';

// Mock Data
const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Jenkins',
    email: 'sarah@design.com',
    avatar: 'https://picsum.photos/seed/sarah/150/150',
    profession: 'UX/UI Designer',
    bio: 'Crafting digital experiences that humans love. 5+ years in Figma & React.',
    location: 'San Francisco, CA'
  },
  {
    id: 'u2',
    name: 'David Chen',
    email: 'david@photo.com',
    avatar: 'https://picsum.photos/seed/david/150/150',
    profession: 'Event Photographer',
    bio: 'Capturing moments that last a lifetime. Weddings, corporate, and portraits.',
    location: 'New York, NY'
  },
  {
    id: 'u3',
    name: 'Elena Rodriguez',
    email: 'elena@arch.com',
    avatar: 'https://picsum.photos/seed/elena/150/150',
    profession: 'Interior Architect',
    bio: 'Minimalist spaces for modern living. Sustainable design advocate.',
    location: 'Barcelona, ES'
  }
];

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    imageUrl: 'https://picsum.photos/seed/design1/800/600',
    title: 'Fintech Mobile App Redesign',
    description: 'A complete overhaul of a banking application focusing on accessibility and dark mode aesthetics.',
    timestamp: Date.now() - 10000000,
    likes: ['u2', 'u3'],
    comments: [
      { id: 'c1', postId: 'p1', userId: 'u2', userName: 'David Chen', userAvatar: 'https://picsum.photos/seed/david/150/150', text: 'Love the color palette!', timestamp: Date.now() - 500000 }
    ]
  },
  {
    id: 'p2',
    userId: 'u2',
    imageUrl: 'https://picsum.photos/seed/wedding/800/600',
    title: 'Sunset Wedding at The Pier',
    description: 'Golden hour shots are always the best. The lighting was absolutely perfect for this couple.',
    timestamp: Date.now() - 5000000,
    likes: ['u1'],
    comments: []
  },
  {
    id: 'p3',
    userId: 'u3',
    imageUrl: 'https://picsum.photos/seed/interior/800/600',
    title: 'Modern Loft Renovation',
    description: 'Converting an old industrial warehouse into a cozy, modern living space using reclaimed wood.',
    timestamp: Date.now() - 2000000,
    likes: ['u1', 'u2'],
    comments: []
  }
];

interface AppContextType {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  login: (email: string) => boolean;
  register: (name: string, email: string, profession: string) => void;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => void;
  createPost: (title: string, description: string, imageFile: File) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const login = (email: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, profession: string) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      profession,
      avatar: `https://picsum.photos/seed/${name.replace(' ', '')}/150/150`,
      bio: 'I am new here! checking out the app.',
      location: 'Unknown'
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  const createPost = (title: string, description: string, imageFile: File) => {
    if (!currentUser) return;
    
    // Simulate image upload by creating a local object URL
    const imageUrl = URL.createObjectURL(imageFile);

    const newPost: Post = {
      id: `p${Date.now()}`,
      userId: currentUser.id,
      imageUrl,
      title,
      description,
      timestamp: Date.now(),
      likes: [],
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId: string) => {
    if (!currentUser) return;
    setPosts(posts.map(post => {
      if (post.id !== postId) return post;
      const isLiked = post.likes.includes(currentUser.id);
      return {
        ...post,
        likes: isLiked 
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id]
      };
    }));
  };

  const addComment = (postId: string, text: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      postId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text,
      timestamp: Date.now()
    };
    setPosts(posts.map(post => {
      if (post.id !== postId) return post;
      return { ...post, comments: [...post.comments, newComment] };
    }));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      posts,
      login,
      register,
      logout,
      updateProfile,
      createPost,
      toggleLike,
      addComment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useStore must be used within AppProvider");
  return context;
};