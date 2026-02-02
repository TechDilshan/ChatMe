import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { auth } from './src/services/firebase/firebase';
import { onAuthStateChanged } from '@react-native-firebase/auth';

export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // You can use context / zustand / redux here to store auth state
      console.log('Auth changed:', user ? 'logged in' : 'logged out');
    });

    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}