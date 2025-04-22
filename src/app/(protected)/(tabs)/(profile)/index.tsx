import { Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '~/src/providers/AuthProvider';
import { useQueryClient } from '@providers/QueryProvider';
import { appStore } from '@store/AppStore';
import { useNutricionStore } from '@store/NutricionStore';

import { useInsertNutricio } from '~/src/utils/insertNutricio';
import moment from 'moment';

export default function Profile() {
  const { signOut, session } = useAuth();
  const user_id = session?.user.id || '';
  const queryClient = useQueryClient();
  const { insertNutricio } = useInsertNutricio(queryClient);
  const { setHasEnteredUserInfo } = appStore();
  const { clearAll, clearAlimentos, getPeriodos, fecha } = useNutricionStore();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleInsert = async () => {
    const periodos_store = getPeriodos();
    const storedDate = '2025-04-20'; //fecha;
    const today = moment().format('YYYY-MM-DD');

    if (storedDate === today) {
      console.log('La fecha almacenada es la misma que la de hoy. No se hace nada.');
      return;
    }

    try {
      //TEMP funciona pero no se suben los alimentos ver por que
      await insertNutricio({ user_id, periodos_store, storedDate, today });
      clearAll();
    } catch (error) {
      console.error('Error inserting nutricion:', error);
      return;
    }
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
          handleInsert();
        }}>
        <Text className="rounded-lg bg-blue-500 p-3 text-center text-xl">Nutricion to db</Text>
      </TouchableOpacity>
    </View>
  );
}
