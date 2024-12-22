import { Stack, Redirect } from 'expo-router';

import { useAuth } from '../../providers/AuthProvider';

export default function SignIn() {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (session) {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
    </Stack>
  );
}
