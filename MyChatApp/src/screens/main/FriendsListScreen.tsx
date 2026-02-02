// src/screens/main/FriendsListScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Plus, Search } from 'lucide-react-native';
import FriendListItem from '../../components/list/FriendListItem';
import Colors from '../../constants/colors';
import { auth, db } from '../../services/firebase/firebase';
import { onValue, ref, query, orderByChild, equalTo } from '@react-native-firebase/database';

export default function FriendsListScreen({ navigation }: any) {
  const [friends, setFriends] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    if (!currentUid) return;

    // Listen to friends list (assuming you store friends under users/uid/friends/otherUid: true)
    const friendsRef = ref(db, `users/${currentUid}/friends`);
    const unsubscribe = onValue(friendsRef, (snapshot) => {
      const friendUids: string[] = [];
      snapshot.forEach((child) => {
        if (child.val() === true) {
          friendUids.push(child.key!);
        }
      });

      // Fetch friend details
      const friendDetails: any[] = [];
      const promises = friendUids.map((uid) =>
        new Promise((resolve) => {
          onValue(ref(db, `users/${uid}`), (snap) => {
            const user = snap.val();
            if (user) {
              friendDetails.push({
                id: uid,
                name: user.name || 'Unknown',
                avatar: user.avatar || '',
                online: user.online || false,
                lastSeen: user.lastSeen || null,
              });
            }
            resolve(null);
          }, { onlyOnce: true });
        })
      );

      Promise.all(promises).then(() => {
        setFriends(friendDetails);
      });
    });

    return () => unsubscribe();
  }, [currentUid]);

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLastSeen = (timestamp: number | null) => {
    if (!timestamp) return 'Offline';
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} h ago`;
    return 'Long ago';
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search color={Colors.light.subtitle} size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          placeholderTextColor={Colors.light.subtitle}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Pressable
        style={styles.addFriendButton}
        onPress={() => navigation.navigate('AddFriend')} // you can create AddFriendScreen later
      >
        <Plus color="#fff" size={24} />
        <Text style={styles.addFriendText}>Add Friend</Text>
      </Pressable>

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendListItem
            avatar={item.avatar}
            name={item.name}
            status={item.online ? 'Online' : formatLastSeen(item.lastSeen)}
            online={item.online}
            onPress={() => navigation.navigate('ChatRoom', { userId: item.id })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No friends yet</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  addFriendText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.light.subtitle,
    fontSize: 16,
    marginTop: 40,
  },
});