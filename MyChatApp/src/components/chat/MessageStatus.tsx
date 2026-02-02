// src/components/chat/MessageStatus.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Check, CheckCheck } from 'lucide-react-native';
import Colors from '../../constants/colors';

type MessageStatusType = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

interface MessageStatusProps {
  status?: MessageStatusType;
}

export default function MessageStatus({ status = 'sent' }: MessageStatusProps) {
  if (status === 'sending') {
    return <Text style={styles.text}>Sending...</Text>;
  }

  if (status === 'failed') {
    return <Text style={[styles.text, { color: Colors.light.error }]}>Failed</Text>;
  }

  const color = status === 'read' ? Colors.light.primary : Colors.light.subtitle;

  return (
    <View style={styles.container}>
      {status === 'delivered' || status === 'sent' ? (
        <Check size={14} color={color} />
      ) : (
        <CheckCheck size={14} color={color} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 4,
  },
  text: {
    fontSize: 11,
    color: Colors.light.subtitle,
  },
});



//comment