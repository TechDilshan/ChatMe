import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneLoginScreen from '../screens/auth/PhoneLoginScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
    </Stack.Navigator>
  );
}