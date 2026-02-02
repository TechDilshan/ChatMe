// src/services/firebase/database.service.ts
import { db } from './firebase';
import { ref, set, update, remove, onValue, push, serverTimestamp } from '@react-native-firebase/database';

export const setValue = async (path: string, value: any): Promise<void> => {
  await set(ref(db, path), value);
};

export const updateValue = async (path: string, updates: any): Promise<void> => {
  await update(ref(db, path), updates);
};

export const pushValue = async (path: string, value: any): Promise<string> => {
  const newRef = push(ref(db, path));
  await set(newRef, { ...value, createdAt: serverTimestamp() });
  return newRef.key!;
};

export const removeValue = async (path: string): Promise<void> => {
  await remove(ref(db, path));
};

export const listenToPath = (
  path: string,
  callback: (data: any) => void,
  options?: { onlyOnce?: boolean }
): (() => void) => {
  const r = ref(db, path);
  const unsubscribe = onValue(r, (snapshot) => {
    const val = snapshot.val();
    callback(val);
  }, options);

  return unsubscribe;
};