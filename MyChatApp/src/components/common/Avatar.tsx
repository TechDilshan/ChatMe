// src/components/common/Avatar.tsx
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface AvatarProps {
  uri: string;
  size?: number;
  style?: any;
}

export default function Avatar({ uri, size = 48, style }: AvatarProps) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={{ uri: uri || 'https://i.pravatar.cc/150?img=33' }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  image: {
    resizeMode: 'cover',
  },
});