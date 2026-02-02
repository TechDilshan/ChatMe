// src/services/hooks/useChatMessages.ts
import { useState, useEffect } from 'react';
import { listenToChatMessages } from '../firebase/chat.service';

export const useChatMessages = (chatId: string | null) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = listenToChatMessages(chatId, (msgs) => {
      setMessages(msgs);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return { messages, loading };
};