import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../constants/colors';

export default function VerifyOTPScreen({ route, navigation }: any) {
  const { confirmation, phone } = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) return;

    setLoading(true);

    try {
      await confirmation.confirm(code);
      navigation.replace('Main');
    } catch (error: any) {
      Alert.alert('Verification failed', 'Invalid code. Please try again.');
      setCode('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Verify {phone}</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code we sent you
        </Text>

        <TextInput
          style={styles.codeInput}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
          value={code}
          onChangeText={(text) => {
            setCode(text);
            if (text.length === 6) handleVerify();
          }}
        />

        <Pressable
          style={[styles.resend, loading && { opacity: 0.5 }]}
          disabled={loading}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.resendText}>Didn't receive code? Change number</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 120,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtitle,
    textAlign: 'center',
    marginBottom: 48,
  },
  codeInput: {
    fontSize: 36,
    letterSpacing: 20,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderBottomColor: Colors.light.primary,
    width: 240,
    marginBottom: 48,
  },
  resend: {
    marginTop: 24,
  },
  resendText: {
    color: Colors.light.primary,
    fontSize: 16,
  },
});