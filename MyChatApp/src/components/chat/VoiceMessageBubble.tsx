// src/components/chat/VoiceMessageBubble.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import Colors from '../../constants/colors';
import MessageTime from './MessageTime';

interface VoiceMessageBubbleProps {
  duration: string; // e.g. "0:45"
  isPlaying: boolean;
  onPlayPause: () => void;
  isMe: boolean;
  timestamp: number;
}

export default function VoiceMessageBubble({
  duration,
  isPlaying,
  onPlayPause,
  isMe,
  timestamp,
}: VoiceMessageBubbleProps) {
  return (
    <View
      style={[
        styles.container,
        isMe ? styles.myContainer : styles.theirContainer,
      ]}>
      <Pressable style={styles.playButton} onPress={onPlayPause}>
        {isPlaying ? (
          <Pause size={20} color="#fff" />
        ) : (
          <Play size={20} color="#fff" fill="#fff" />
        )}
      </Pressable>

      <View style={styles.waveform}>
        {/* Simple fake waveform — in real app use real audio visualizer */}
        {Array.from({ length: 12 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.bar,
              { height: [8, 16, 24, 18, 12][i % 5] },
            ]}
          />
        ))}
      </View>

      <Text style={styles.duration}>{duration}</Text>

      <View style={styles.timeContainer}>
        <MessageTime timestamp={timestamp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    minWidth: 180,
    maxWidth: '75%',
    gap: 10,
  },
  myContainer: {
    backgroundColor: Colors.light.messageSent,
    alignSelf: 'flex-end',
  },
  theirContainer: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 28,
  },
  bar: {
    width: 3,
    backgroundColor: Colors.light.primary,
    opacity: 0.7,
    borderRadius: 2,
  },
  duration: {
    fontSize: 12,
    color: '#555',
    minWidth: 40,
  },
  timeContainer: {
    alignSelf: 'flex-end',
  },
});