// src/components/chat/ChatBubble.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';
import MessageTime from './MessageTime';
import MessageStatus from './MessageStatus';
import { Message } from '../../types';

interface ChatBubbleProps {
  message: Message;
  isMe: boolean;
}

export default function ChatBubble({ message, isMe }: ChatBubbleProps) {
  return (
    <View
      style={[
        styles.container,
        isMe ? styles.myMessageContainer : styles.theirMessageContainer,
      ]}>
      <View
        style={[
          styles.bubble,
          isMe ? styles.myBubble : styles.theirBubble,
        ]}>
        {message.type === 'text' ? (
          <Text style={[styles.text, isMe && styles.myText]}>
            {message.content}
          </Text>
        ) : (
          // Voice message placeholder (VoiceMessageBubble should be used instead in most cases)
          <Text style={styles.voicePlaceholder}>Voice message • {message.content}</Text>
        )}

        <View style={styles.footer}>
          <MessageTime timestamp={message.timestamp} />
          {isMe && <MessageStatus status={message.status || 'sent'} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  myBubble: {
    backgroundColor: Colors.light.messageSent,
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15.5,
    lineHeight: 20,
    color: '#000',
  },
  myText: {
    color: '#000',
  },
  voicePlaceholder: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
    gap: 6,
  },
});