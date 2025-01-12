import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';
import { Redirect } from 'expo-router';

import { appStore } from '@store/AppStore';

export default function ProtectedLayout() {
  const { session } = useAuth();
  const { hasEnteredUserInfo } = appStore();

  if (!session) {
    return <Redirect href={'/(onboarding)'} />;
  }

  if (!hasEnteredUserInfo) {
    return <Redirect href={'/(userInfo)'} />;
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1" style={{ backgroundColor: 'transparent' }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Ejercicio" options={{ headerShown: false }} />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
