// src/components/input/EmojiPickerButton.tsx
// Simple placeholder — in real app use emoji-mart or similar library
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Smile } from 'lucide-react-native';
import Colors from '../../constants/colors';

interface EmojiPickerButtonProps {
  onPress: () => void;
}

export default function EmojiPickerButton({ onPress }: EmojiPickerButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Smile size={24} color={Colors.light.subtitle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});