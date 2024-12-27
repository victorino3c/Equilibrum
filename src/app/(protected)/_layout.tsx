import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';
import { Redirect } from 'expo-router';

export default function ProtectedLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/(onboarding)'} />;
  }

  return (
    <View className="flex-1">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
