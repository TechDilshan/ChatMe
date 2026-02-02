// src/services/firebase/users.service.ts
import { db, getCurrentUserId } from './firebase';
import { ref, onValue, set, update } from '@react-native-firebase/database';

export interface UserProfile {
  uid: string;
  name: string;
  phone?: string;
  avatar?: string;
  online: boolean;
  lastSeen?: number;
  createdAt?: number;
}

export const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
  const uid = getCurrentUserId();
  if (!uid) throw new Error('No authenticated user');

  await update(ref(db, `users/${uid}`), {
    ...updates,
    lastSeen: Date.now(),
    online: true,
  });
};

export const setUserOnlineStatus = async (online: boolean): Promise<void> => {
  const uid = getCurrentUserId();
  if (!uid) return;

  await update(ref(db, `users/${uid}`), {
    online,
    lastSeen: Date.now(),
  });
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onValue(ref(db, `users/${uid}`), (snap) => {
      unsubscribe();
      const data = snap.val();
      if (data) {
        resolve({ uid, ...data });
      } else {
        resolve(null);
      }
    }, { onlyOnce: true });
  });
};

export const listenToUserProfile = (
  uid: string,
  callback: (profile: UserProfile | null) => void
): (() => void) => {
  return onValue(ref(db, `users/${uid}`), (snap) => {
    const data = snap.val();
    callback(data ? { uid, ...data } : null);
  });
};

// Add friend (mutual)
export const addFriend = async (friendUid: string): Promise<void> => {
  const myUid = getCurrentUserId();
  if (!myUid) return;

  await Promise.all([
    set(ref(db, `users/${myUid}/friends/${friendUid}`), true),
    set(ref(db, `users/${friendUid}/friends/${myUid}`), true),
  ]);
};