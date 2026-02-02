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
import { auth } from '../../services/firebase/firebase';
import { signInWithPhoneNumber } from '@react-native-firebase/auth';
import Colors from '../../constants/colors';

export default function PhoneLoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone.startsWith('+')) {
      Alert.alert('Error', 'Please enter phone number with country code (e.g. +94771234567)');
      return;
    }

    setLoading(true);

    try {
      // In real app → you need to attach reCAPTCHA verifier (invisible or normal)
      // For development → use Firebase test phone numbers
      const confirmationResult = await signInWithPhoneNumber(auth, phone);
      navigation.navigate('VerifyOTP', { confirmation: confirmationResult, phone });
    } catch (error: any) {
      Alert.alert('Failed to send code', error.message || 'Please try again');
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
        <Text style={styles.title}>Welcome to ChatApp</Text>
        <Text style={styles.subtitle}>
          Enter your phone number to get started
        </Text>

        <TextInput
          style={styles.input}
          placeholder="+94 77 123 4567"
          placeholderTextColor={Colors.light.subtitle}
          keyboardType="phone-pad"
          autoFocus
          value={phone}
          onChangeText={setPhone}
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSendCode}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Sending...' : 'Next'}
          </Text>
        </Pressable>

        <Text style={styles.footerText}>
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtitle,
    marginBottom: 48,
    lineHeight: 24,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
    paddingVertical: 12,
    marginBottom: 48,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 'auto',
    textAlign: 'center',
    color: Colors.light.subtitle,
    fontSize: 13,
    paddingBottom: 40,
  },
});