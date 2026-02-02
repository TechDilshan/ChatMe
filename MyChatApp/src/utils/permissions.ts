// src/utils/permissions.ts
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const result = await check(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) return true;

    const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
    return requestResult === RESULTS.GRANTED;
  } catch (err) {
    console.error('Camera permission error:', err);
    return false;
  }
};

export const requestMicrophonePermission = async (): Promise<boolean> => {
  try {
    const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (result === RESULTS.GRANTED) return true;

    const requestResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    return requestResult === RESULTS.GRANTED;
  } catch (err) {
    console.error('Microphone permission error:', err);
    return false;
  }
};

// Add iOS equivalents when needed