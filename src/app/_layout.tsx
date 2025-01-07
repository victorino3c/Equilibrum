import '~/global.css';

import { StatusBar } from 'expo-status-bar';

import AuthProvider from '../providers/AuthProvider';

import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <AuthProvider>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Stack>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </AuthProvider>
    </View>
  );
}
