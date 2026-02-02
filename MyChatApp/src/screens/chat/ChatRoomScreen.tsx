// src/screens/chat/ChatRoomScreen.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { auth, db } from '../../services/firebase/firebase';
import { onValue, ref, push, set, serverTimestamp } from '@react-native-firebase/database';
import ChatBubble from '../../components/chat/ChatBubble';
import ChatInput from '../../components/input/ChatInput';
import Colors from '../../constants/colors';

export default function ChatRoomScreen({ route, navigation }: any) {
  const { userId } = route.params;
  const currentUid = auth.currentUser?.uid;

  const [messages, setMessages] = useState<any[]>([]);
  const [otherUser, setOtherUser] = useState<any>({ name: 'User', avatar: '' });

  const chatId = [currentUid, userId].sort().join('_');
  const flatListRef = useRef<FlatList>(null);

  // Load other user info
  useEffect(() => {
    const userRef = ref(db, `users/${userId}`);
    const unsubscribe = onValue(userRef, (snap) => {
      const data = snap.val();
      if (data) {
        setOtherUser({
          name: data.name || 'User',
          avatar: data.avatar || '',
        });
      }
    });

    navigation.setOptions({
      title: otherUser.name,
    });

    return () => unsubscribe();
  }, [userId, navigation, otherUser.name]);

  // Load messages
  useEffect(() => {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, (snap) => {
      const msgList: any[] = [];
      snap.forEach((child) => {
        msgList.push({
          id: child.key,
          ...child.val(),
        });
      });
      setMessages(msgList.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || !currentUid) return;

    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const newMsgRef = push(messagesRef);

    const messageData = {
      senderId: currentUid,
      type: 'text',
      content: text.trim(),
      timestamp: serverTimestamp(),
      status: 'sent',
    };

    await set(newMsgRef, messageData);

    // Update last message preview
    await set(ref(db, `chats/${chatId}/lastMessage`), {
      ...messageData,
      id: newMsgRef.key,
    });

    // Mark as friend if not already
    await set(ref(db, `users/${currentUid}/friends/${userId}`), true);
    await set(ref(db, `users/${userId}/friends/${currentUid}`), true);
  };

  const handleVoicePress = () => {
    // TODO: implement voice recording later
    alert('Voice messages coming soon');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble
            message={item}
            isMe={item.senderId === currentUid}
          />
        )}
        inverted
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <ChatInput
        onSend={sendMessage}
        onVoicePress={handleVoicePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece5dd',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});