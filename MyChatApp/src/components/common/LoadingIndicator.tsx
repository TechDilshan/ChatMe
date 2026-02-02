// src/components/common/LoadingIndicator.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';

interface LoadingIndicatorProps {
  message?: string;
}

export default function LoadingIndicator({ message = 'Loading...' }: LoadingIndicatorProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.light.primary} />
      {message && <Text style={styles.text}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.light.subtitle,
  },
});