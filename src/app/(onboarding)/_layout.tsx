import { Stack, Redirect } from 'expo-router';

import { useAuth } from '@providers/AuthProvider';

import { appStore } from '@store/AppStore';

export default function SignIn() {
  const { session, loading } = useAuth();
  const { hasEnteredUserInfo } = appStore();

  if (loading) {
    return null;
  }

  if (session && hasEnteredUserInfo) {
    return <Redirect href="/(protected)/(tabs)/(health)" />;
  } else if (session && !hasEnteredUserInfo) {
    return <Redirect href="/(userInfo)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Onboarding' }} />
      <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
    </Stack>
  );
}
