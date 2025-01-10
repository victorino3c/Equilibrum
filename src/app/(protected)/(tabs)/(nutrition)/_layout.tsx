import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NutritionLayout() {
  return (
    <SafeAreaView className="flex-1 ">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
