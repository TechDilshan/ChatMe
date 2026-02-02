// src/services/firebase/chat.service.ts
import { db, getCurrentUserId } from './firebase';
import { ref, push, set, update, serverTimestamp } from '@react-native-firebase/database';

export interface Message {
  id: string;
  senderId: string;
  type: 'text' | 'voice' | 'image';
  content: string;
  timestamp: number | object; // serverTimestamp() returns object
  status?: 'sent' | 'delivered' | 'read';
}

export const sendTextMessage = async (
  toUserId: string,
  content: string
): Promise<void> => {
  const myUid = getCurrentUserId();
  if (!myUid) throw new Error('Not authenticated');

  const chatId = [myUid, toUserId].sort().join('_');
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  const newMsgRef = push(messagesRef);

  const message: Omit<Message, 'id'> = {
    senderId: myUid,
    type: 'text',
    content,
    timestamp: serverTimestamp(),
    status: 'sent',
  };

  await set(newMsgRef, message);

  // Update last message preview
  await update(ref(db, `chats/${chatId}`), {
    lastMessage: { ...message, id: newMsgRef.key },
    [`participants/${myUid}`]: true,
    [`participants/${toUserId}`]: true,
    updatedAt: serverTimestamp(),
  });
};

export const markMessagesAsRead = async (chatId: string): Promise<void> => {
  const myUid = getCurrentUserId();
  if (!myUid) return;

  // In real app → update only unread messages from other user
  // Here simplified: set read status on chat level
  await update(ref(db, `chats/${chatId}`), {
    [`readBy/${myUid}`]: serverTimestamp(),
  });
};

export const listenToChatMessages = (
  chatId: string,
  callback: (messages: Message[]) => void
): (() => void) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);

  return onValue(messagesRef, (snapshot) => {
    const msgs: Message[] = [];
    snapshot.forEach((child) => {
      msgs.push({
        id: child.key!,
        ...child.val(),
      });
    });
    callback(msgs.sort((a, b) => (a.timestamp as number) - (b.timestamp as number)));
  });
};