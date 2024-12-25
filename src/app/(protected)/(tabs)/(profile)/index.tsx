import { Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '~/src/providers/AuthProvider';

export default function Profile() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-center text-xl">Profile</Text>
      <TouchableOpacity
        onPress={() => {
          handleSignOut();
        }}>
        <Text className="rounded-lg bg-blue-500 p-3 text-center text-xl">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
