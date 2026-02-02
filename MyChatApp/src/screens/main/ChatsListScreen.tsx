import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Search } from 'lucide-react-native';
import ChatListItem from '../../components/list/ChatListItem';
import Colors from '../../constants/colors';
import { db, auth } from '../../services/firebase/firebase';
import { onValue, ref } from '@react-native-firebase/database';

type ChatPreview = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: number;
  unread: number;
  online: boolean;
};

export default function ChatsListScreen({ navigation }: any) {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    if (!currentUid) return;

    const chatsRef = ref(db, `users/${currentUid}/chats`);
    const unsubscribe = onValue(chatsRef, async (snapshot) => {
      const newChats: ChatPreview[] = [];

      const promises = [];
      snapshot.forEach((child) => {
        const otherUid = child.key;
        if (!otherUid || otherUid === currentUid) return;

        promises.push(
          new Promise<void>((resolve) => {
            const userRef = ref(db, `users/${otherUid}`);
            onValue(userRef, (userSnap) => {
              const user = userSnap.val();
              if (!user) return resolve();

              const lastMsgRef = ref(db, `chats/${[currentUid, otherUid].sort().join('_')}/lastMessage`);
              onValue(lastMsgRef, (msgSnap) => {
                const msg = msgSnap.val();
                newChats.push({
                  id: otherUid,
                  name: user.name || 'User',
                  avatar: user.avatar || '',
                  lastMessage: msg?.content || 'Start chatting...',
                  timestamp: msg?.timestamp || Date.now(),
                  unread: 0, // you can count unread later
                  online: user.online || false,
                });
                resolve();
              }, { onlyOnce: true });
            }, { onlyOnce: true });
          })
        );
      });

      await Promise.all(promises);
      setChats(newChats.sort((a, b) => b.timestamp - a.timestamp));
    });

    return () => unsubscribe();
  }, [currentUid]);

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={20} color={Colors.light.subtitle} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          placeholderTextColor={Colors.light.subtitle}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            {...item}
            onPress={() => navigation.navigate('ChatRoom', { userId: item.id })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
});