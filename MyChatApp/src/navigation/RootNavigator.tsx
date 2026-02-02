import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import IncomingCallScreen from '../screens/call/IncomingCallScreen';
import VoiceCallScreen from '../screens/call/VoiceCallScreen';
import VideoCallScreen from '../screens/call/VideoCallScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      {/* Full-screen modals for calls */}
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal', headerShown: false }}>
        <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
        <Stack.Screen name="VoiceCall" component={VoiceCallScreen} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}