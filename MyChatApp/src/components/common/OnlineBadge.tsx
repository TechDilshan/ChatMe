// src/components/common/OnlineBadge.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/colors';

interface OnlineBadgeProps {
  online?: boolean;
  size?: number;
}

export default function OnlineBadge({ online = false, size = 14 }: OnlineBadgeProps) {
  if (!online) return null;

  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: Colors.light.online,
    borderWidth: 2,
    borderColor: '#fff',
  },
});