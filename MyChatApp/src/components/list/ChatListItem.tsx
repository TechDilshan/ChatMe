// src/components/list/ChatListItem.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Avatar from '../common/Avatar';
import OnlineBadge from '../common/OnlineBadge';
import Colors from '../../constants/colors';
import { formatRelativeTime } from '../../utils/dateFormat';

interface ChatListItemProps {
  avatar: string;
  name: string;
  lastMessage: string;
  timestamp: number;
  unreadCount?: number;
  online?: boolean;
  onPress: () => void;
}

export default function ChatListItem({
  avatar,
  name,
  lastMessage,
  timestamp,
  unreadCount = 0,
  online = false,
  onPress,
}: ChatListItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Avatar uri={avatar} size={56} />
        <OnlineBadge online={online} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.time}>{formatRelativeTime(timestamp)}</Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={[styles.preview, unreadCount > 0 && styles.unread]} numberOfLines={1}>
            {lastMessage}
          </Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
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
  },
  avatarContainer: {
    position: 'relative',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: Colors.light.subtitle,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  preview: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.subtitle,
  },
  unread: {
    fontWeight: '500',
    color: '#000',
  },
  badge: {
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});