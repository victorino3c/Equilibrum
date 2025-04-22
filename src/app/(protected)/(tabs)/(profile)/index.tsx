import { Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '~/src/providers/AuthProvider';
import { appStore } from '@store/AppStore';
import { useNutricionStore } from '@store/NutricionStore';

export default function Profile() {
  const { signOut } = useAuth();
  const { setHasEnteredUserInfo } = appStore();
  const { checkAndResetIfNewDay } = useNutricionStore();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-center text-xl">Profile</Text>
      <TouchableOpacity
        style={{ marginBottom: 10 }}
        onPress={() => {
          handleSignOut();
        }}>
        <Text className="rounded-lg bg-blue-500 p-3 text-center text-xl">Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 10 }}
        onPress={() => {
          setHasEnteredUserInfo(false);
        }}>
        <Text className="rounded-lg bg-blue-500 p-3 text-center text-xl">User info false</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          //setHasEnteredUserInfo(false);
        }}>
        <Text className="rounded-lg bg-blue-500 p-3 text-center text-xl">Nutricion to db</Text>
      </TouchableOpacity>
    </View>
  );
}
