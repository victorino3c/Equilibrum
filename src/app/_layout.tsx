import '~/global.css';

import { StatusBar } from 'expo-status-bar';

import AuthProvider from '@providers/AuthProvider';
import QueryProvider from '@providers/QueryProvider';

import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <QueryProvider>
        <AuthProvider>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
          <Stack>
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
            <Stack.Screen name="(userInfo)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </AuthProvider>
      </QueryProvider>
    </View>
  );
}
