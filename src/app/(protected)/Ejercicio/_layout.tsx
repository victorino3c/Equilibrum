import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '../../../providers/AuthProvider';
import { Redirect } from 'expo-router';

export default function EjercicioLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/(onboarding)'} />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: 'transparent' }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Entrenamiento" />
        <Stack.Screen name="FinEntrenamiento" />
      </Stack>
    </View>
  );
}
