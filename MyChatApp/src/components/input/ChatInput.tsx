// src/components/input/ChatInput.tsx
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Mic, Send, Smile, Plus } from 'lucide-react-native';
import Colors from '../../constants/colors';

interface ChatInputProps {
  onSend: (text: string) => void;
  onVoicePress: () => void;
  onAttachPress?: () => void;
  onEmojiPress?: () => void;
}

export default function ChatInput({
  onSend,
  onVoicePress,
  onAttachPress,
  onEmojiPress,
}: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={styles.container}>
      <View style={styles.inner}>
        <Pressable style={styles.iconButton} onPress={onAttachPress}>
          <Plus size={24} color={Colors.light.primary} />
        </Pressable>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor={Colors.light.subtitle}
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable style={styles.iconButtonSmall} onPress={onEmojiPress}>
            <Smile size={22} color={Colors.light.subtitle} />
          </Pressable>
        </View>

        {text.trim() ? (
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Send size={20} color="#fff" />
          </Pressable>
        ) : (
          <Pressable style={styles.micButton} onPress={onVoicePress}>
            <Mic size={22} color="#fff" />
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 120,
    paddingVertical: 8,
  },
  iconButton: {
    padding: 8,
  },
  iconButtonSmall: {
    padding: 4,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});