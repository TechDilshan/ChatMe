// src/screens/call/VoiceCallScreen.tsx
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Mic, MicOff, PhoneOff, Volume2 } from 'lucide-react-native';
import Colors from '../../constants/colors';

export default function VoiceCallScreen({ route, navigation }: any) {
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const min = Math.floor(duration / 60);
    const sec = duration % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.caller}>Calling...</Text>
        <Text style={styles.timer}>{formatTime()}</Text>

        <View style={styles.controls}>
          <Pressable
            style={[styles.controlBtn, muted && styles.active]}
            onPress={() => setMuted(!muted)}
          >
            {muted ? <MicOff size={28} color="#fff" /> : <Mic size={28} color="#fff" />}
            <Text style={styles.label}>{muted ? 'Unmute' : 'Mute'}</Text>
          </Pressable>

          <Pressable style={styles.endBtn} onPress={endCall}>
            <PhoneOff size={32} color="#fff" />
          </Pressable>

          <Pressable
            style={[styles.controlBtn, speaker && styles.active]}
            onPress={() => setSpeaker(!speaker)}
          >
            <Volume2 size={28} color="#fff" />
            <Text style={styles.label}>Speaker</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primaryDark,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 40,
    alignItems: 'center',
  },
  caller: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '700',
    marginTop: 100,
  },
  timer: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.9)',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
  controlBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  endBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
  },
});