// src/services/firebase/auth.service.ts
import { authInstance } from './firebase';
import {
  signInWithPhoneNumber,
  ConfirmationResult,
  signOut,
  onAuthStateChanged,
} from '@react-native-firebase/auth';

let confirmationResult: ConfirmationResult | null = null;

export const sendPhoneVerificationCode = async (
  phoneNumber: string
): Promise<ConfirmationResult> => {
  // You need to implement reCAPTCHA verifier in real app
  // For testing: use Firebase console test phone numbers
  try {
    confirmationResult = await signInWithPhoneNumber(authInstance, phoneNumber);
    return confirmationResult;
  } catch (error: any) {
    console.error('Phone auth error:', error);
    throw new Error(error.message || 'Failed to send verification code');
  }
};

export const verifyPhoneCode = async (code: string): Promise<boolean> => {
  if (!confirmationResult) {
    throw new Error('No verification in progress');
  }

  try {
    const credential = await confirmationResult.confirm(code);
    return !!credential.user;
  } catch (error: any) {
    console.error('Code verification failed:', error);
    throw new Error('Invalid verification code');
  }
};

export const logout = async (): Promise<void> => {
  await signOut(authInstance);
};

export const subscribeToAuthChanges = (
  callback: (user: any) => void
): (() => void) => {
  return onAuthStateChanged(authInstance, callback);
};