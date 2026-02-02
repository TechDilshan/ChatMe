// src/services/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authInstance, getCurrentUser } from '../firebase/firebase';
import { onAuthStateChanged } from '@react-native-firebase/auth';

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setState({
        user,
        loading: false,
        error: null,
      });
    }, (error) => {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    });

    return () => unsubscribe();
  }, []);

  return state;
};