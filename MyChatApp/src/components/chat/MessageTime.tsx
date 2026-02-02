// src/components/chat/MessageTime.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/colors';

interface MessageTimeProps {
  timestamp: number;
}

export default function MessageTime({ timestamp }: MessageTimeProps) {
  const formatTime = () => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return <Text style={styles.time}>{formatTime()}</Text>;
}

const styles = StyleSheet.create({
  time: {
    fontSize: 11,
    color: Colors.light.subtitle,
  },
});