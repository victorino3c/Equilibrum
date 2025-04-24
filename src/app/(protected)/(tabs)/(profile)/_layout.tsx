import { Link, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileLayout() {
  return (
    <View className="flex-1">
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: 'Perfil',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => {
              return (
                <Link href="/(protected)/(tabs)/(profile)/Configuracion">
                  <Ionicons name="settings-outline" size={24} color="#000" />
                </Link>
              );
            },
          }}
        />
        <Stack.Screen
          name="Configuracion"
          options={{
            headerShown: true,
            title: 'Configuración',
            headerTitleAlign: 'center',
            headerLeft: () => {
              return (
                <Link href="/(protected)/(tabs)/(profile)">
                  <Ionicons name="arrow-back-outline" size={24} color="#000" />
                </Link>
              );
            },
          }}
        />
      </Stack>
    </View>
  );
}
