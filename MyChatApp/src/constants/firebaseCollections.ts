// src/constants/firebaseCollections.ts
// Realtime Database paths (not Firestore collections)

export const PATHS = {
    USERS: 'users',
    CHATS: 'chats',
    FRIENDS: (uid: string) => `users/${uid}/friends`,
    CHAT_MESSAGES: (chatId: string) => `chats/${chatId}/messages`,
    LAST_MESSAGE: (chatId: string) => `chats/${chatId}/lastMessage`,
    ONLINE_STATUS: (uid: string) => `users/${uid}/online`,
    LAST_SEEN: (uid: string) => `users/${uid}/lastSeen`,
  };