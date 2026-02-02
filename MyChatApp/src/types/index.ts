// src/types/index.ts
export interface User {
    uid: string;
    name: string;
    phone?: string;
    avatar?: string;
    online: boolean;
    lastSeen?: number;
    createdAt?: number;
  }
  
  export interface Message {
    id: string;
    senderId: string;
    type: 'text' | 'voice' | 'image';
    content: string;
    timestamp: number | object;
    status?: 'sent' | 'delivered' | 'read';
  }
  
  export interface ChatPreview {
    id: string;           // other user's uid
    name: string;
    avatar: string;
    lastMessage?: string;
    timestamp: number;
    unread: number;
    online: boolean;
  }
  
  export interface Friend {
    uid: string;
    name: string;
    avatar: string;
    status: 'accepted' | 'pending' | 'blocked';
  }