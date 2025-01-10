import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExerciseLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
