// src/components/list/FriendListItem.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Avatar from '../common/Avatar';
import OnlineBadge from '../common/OnlineBadge';
import Colors from '../../constants/colors';

interface FriendListItemProps {
  avatar: string;
  name: string;
  status: string; // "Online" or "Last seen ..."
  online: boolean;
  onPress: () => void;
}

export default function FriendListItem({
  avatar,
  name,
  status,
  online,
  onPress,
}: FriendListItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Avatar uri={avatar} size={56} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.statusRow}>
          <OnlineBadge online={online} size={12} />
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 6,
  },
  status: {
    fontSize: 14,
    color: Colors.light.subtitle,
  },
});