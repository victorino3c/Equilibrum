import { Stack } from 'expo-router';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@providers/AuthProvider';
import { appStore } from '@store/AppStore';

import { Redirect } from 'expo-router';

export default function UserInfoLayout() {
  const { session } = useAuth();
  const { hasEnteredUserInfo } = appStore();

  if (!session) {
    return <Redirect href={'/(onboarding)'} />;
  }
  if (hasEnteredUserInfo && session) {
    return <Redirect href={'/(protected)/(tabs)/(health)'} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1" style={{ backgroundColor: 'transparent' }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
