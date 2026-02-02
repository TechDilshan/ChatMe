// src/screens/call/IncomingCallScreen.tsx
import React, { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Phone, PhoneOff, Video } from 'lucide-react-native';
import Colors from '../../constants/colors';

export default function IncomingCallScreen({ route, navigation }: any) {
  const { userId, isVideo = false } = route.params || {};

  const [pulse] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.3, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const acceptCall = () => {
    navigation.navigate(isVideo ? 'VideoCall' : 'VoiceCall', { userId });
  };

  const declineCall = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.pulse, { transform: [{ scale: pulse }] }]} />

        <Text style={styles.callerName}>Incoming {isVideo ? 'Video' : 'Voice'} Call</Text>
        <Text style={styles.callerName}>From User {userId}</Text>

        <View style={styles.buttons}>
          <Pressable style={[styles.button, styles.decline]} onPress={declineCall}>
            <PhoneOff color="#fff" size={32} />
          </Pressable>

          <Pressable style={[styles.button, styles.accept]} onPress={acceptCall}>
            {isVideo ? <Video color="#fff" size={32} /> : <Phone color="#fff" size={32} />}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(74, 158, 255, 0.3)',
    position: 'absolute',
  },
  callerName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 80,
    gap: 80,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  decline: {
    backgroundColor: Colors.light.error,
  },
  accept: {
    backgroundColor: Colors.light.online,
  },
});