// src/services/firebase/firebase.ts
import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// Replace with your actual Firebase config from Firebase Console → Project Settings → Your apps → SDK setup
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.asia-southeast1.firebasedatabase.app", // ← important for Asia region
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:android:xxxxxxxxxxxxxxxxxx",
  // measurementId: "G-XXXXXXXXXX" // optional
};

// Prevent duplicate initialization
if (!initializeApp.length) {
  initializeApp(firebaseConfig);
}

export const authInstance = auth();
export const db = database();

// Export current user helper
export const getCurrentUser = () => authInstance.currentUser;
export const getCurrentUserId = () => authInstance.currentUser?.uid ?? null;