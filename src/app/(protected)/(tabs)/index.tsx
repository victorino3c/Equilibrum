import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1">
      <View className="bg-red-500 p-20">
        <Text className="text-left text-xl">Tab One</Text>
      </View>
      <Stack.Screen options={{ title: 'Tab Two' }} />
    </View>
  );
}
