import { Pressable, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import moment from 'moment';
import { Link } from 'expo-router';
import { useState } from 'react';

import { useAuth } from '~/src/providers/AuthProvider';
import { appStore } from '@store/AppStore';
import { useQueryClient } from '@providers/QueryProvider';
import { entrenamientoStore } from '@store/Entrenamientostore';
import { useNutricionStore } from '@store/NutricionStore';
import { useInsertNutricio } from '~/src/utils/insertNutricio';

import Graficas from '@components/Profile/Graficas';
import UserCard from '@components/Profile/UserCard';
import ThreeOptionsButton from '@components/Buttons/ThreeOptionsButton';
import InformacionButtons from '~/src/components/Profile/InformacionButtons';
import Objetivos from '@components/Profile/Objetivos';

export default function Profile() {
  //CODIGO PREVIO

  const { signOut, session } = useAuth();
  const user_id = session?.user.id || '';
  const queryClient = useQueryClient();
  const { insertNutricio } = useInsertNutricio(queryClient);
  const { setHasEnteredUserInfo } = appStore();
  const { clearAll, getPeriodos, fecha } = useNutricionStore();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleInsert = async () => {
    const periodos_store = getPeriodos();
    const storedDate = fecha; //fecha;
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

  //CODIGO NUEVO

  const { entrenamientoTerminado } = entrenamientoStore();

  const [graficaOpcion, setGraficaOpcion] = useState<string>('Ejercicio');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'transparent', paddingTop: 20 }}
      contentContainerStyle={
        entrenamientoTerminado ? { paddingBottom: 100 } : { paddingBottom: 200 }
      }>
      <Link href="/(protected)/Profile/DetallesPerfil" asChild>
        <Pressable>
          <UserCard />
        </Pressable>
      </Link>
      <ThreeOptionsButton
        option1="Ejercicio"
        option2="General"
        option3="Nutrición"
        method={setGraficaOpcion}
        selected={graficaOpcion}
        style={{ marginTop: 20 }}
      />
      <Graficas selected={graficaOpcion} />
      <Text style={styles.title}>Información</Text>
      <InformacionButtons />
      <Text style={styles.title}>Objetivos</Text>
      <Objetivos />
    </ScrollView>
  );

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
      <Link href="/(protected)/Profile/DetallesPerfil" asChild>
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text className="rounded-lg bg-blue-500 p-3 text-center text-xl">Detalles Perfil</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
});
