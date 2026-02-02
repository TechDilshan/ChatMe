// src/screens/main/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LogOut, User, Bell, HelpCircle, Settings, ChevronRight } from 'lucide-react-native';
import { auth } from '../../services/firebase/firebase';
import Colors from '../../constants/colors';

export default function ProfileScreen({ navigation }: any) {
  const [userData, setUserData] = useState<any>({
    name: 'You',
    phone: auth.currentUser?.phoneNumber || '+94xxxxxxxxx',
    avatar: 'https://i.pravatar.cc/150?img=33',
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await auth.signOut();
          navigation.replace('Auth');
        },
      },
    ]);
  };

  const SettingsItem = ({ icon, title, onPress }: any) => (
    <Pressable style={styles.settingsItem} onPress={onPress}>
      <View style={styles.itemLeft}>
        {icon}
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <ChevronRight color={Colors.light.subtitle} size={20} />
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          <Pressable style={styles.editBadge}>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.phone}>{userData.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.group}>
          <SettingsItem
            icon={<User color={Colors.light.text} size={22} />}
            title="Edit Profile"
            onPress={() => Alert.alert('Coming soon')}
          />
          <SettingsItem
            icon={<Bell color={Colors.light.text} size={22} />}
            title="Notifications"
            onPress={() => Alert.alert('Coming soon')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.group}>
          <SettingsItem
            icon={<HelpCircle color={Colors.light.text} size={22} />}
            title="Help & Support"
            onPress={() => Alert.alert('Coming soon')}
          />
          <SettingsItem
            icon={<Settings color={Colors.light.text} size={22} />}
            title="Settings"
            onPress={() => Alert.alert('Coming soon')}
          />
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <LogOut color={Colors.light.error} size={22} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
  },
  phone: {
    fontSize: 16,
    color: Colors.light.subtitle,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.subtitle,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  group: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 12,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.light.error,
  },
  version: {
    textAlign: 'center',
    color: Colors.light.subtitle,
    fontSize: 13,
    marginBottom: 32,
  },
});