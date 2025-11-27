
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  profession: string;
  bio: string;
  location: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: number;
}

export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  title: string;
  description: string;
  timestamp: number;
  likes: string[]; // Array of User IDs
  comments: Comment[];
}

export enum ViewState {
  FEED = 'FEED',
  EXPLORE = 'EXPLORE',
  CREATE = 'CREATE',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  EDIT_PROFILE = 'EDIT_PROFILE',
  CALCULATOR = 'CALCULATOR'
}
