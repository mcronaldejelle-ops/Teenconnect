import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  displayName: string;
  age: number;
  gender?: string;
  location?: string;
  lookingFor?: string[];
  interests?: string[];
  bio?: string;
  avatarUrl?: string;
  photos?: string[]; // Added to support existing components
  media?: UserMedia[];
  followersCount?: number;
  followingCount?: number;
  friendsCount?: number;
  isLive?: boolean;
  createdAt: Timestamp;
}

export interface UserMedia {
  url: string;
  type: 'image' | 'video';
  createdAt: Timestamp;
}

export interface Like {
  id?: string;
  fromUid: string;
  toUid: string;
  type: 'like' | 'nope' | 'superlike';
  createdAt: Timestamp;
}

export interface Follow {
  id?: string;
  followerUid: string;
  followingUid: string;
  createdAt: Timestamp;
}

export interface Friend {
  id?: string;
  uids: string[];
  createdAt: Timestamp;
}

export interface ChatMessage {
  id?: string;
  senderUid: string;
  receiverUid?: string;
  liveId?: string;
  text: string;
  mediaUrl?: string;
  createdAt: Timestamp;
}

export interface LiveStream {
  id?: string;
  hostUid: string;
  title?: string;
  viewerCount?: number;
  status: 'active' | 'ended';
  startedAt: Timestamp;
}

export type Message = ChatMessage;
export type Match = {
  id: string;
  uids: string[];
  createdAt: Timestamp;
};
