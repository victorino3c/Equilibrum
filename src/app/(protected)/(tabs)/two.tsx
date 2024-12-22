import { Stack } from 'expo-router';
import { StyleSheet, View, Button, Text } from 'react-native';

import { useAuth } from '~/src/providers/AuthProvider';

import { ScreenContent } from '~/src/components/ScreenContent';

export default function Home() {
  const { signOut, loading } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View className="mb-20 bg-red-500 p-5">
        <Text className="text-lg">Tab Two</Text>
      </View>
      <Button
        onPress={handleSignOut}
        disabled={loading}
        title={loading ? 'Signing out..' : 'Sign out'}
      />
    </>
  );
}
