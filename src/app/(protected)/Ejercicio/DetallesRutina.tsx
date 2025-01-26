import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';

import { Feather, FontAwesome6 } from '@expo/vector-icons';
import IconButton from '../../../components/Buttons/IconButton';

import { Stack, Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

//import { getProfile } from '@api/profile';
import { useAuth } from '@providers/AuthProvider';

import { rutinaStore } from '~/src/store/RutinaStore';
import { entrenamientoStore } from '~/src/store/Entrenamientostore';

import TarjetaEjercicio from '~/src/components/Ejercicio/Entrenamiento/EnCurso/TarjetaEjercicio';
import EjerciciosModal from '~/src/components/Ejercicio/Entrenamiento/EnCurso/EjerciciosModal';

const DetallesRutina = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const { getRutina, getSeriesByEjercicioAndRutina, removeRutina } = rutinaStore();
  const { isRunning, addEjercicio, addSerieEjercicio, setFecha, setTitulo, resetEntrenamiento } =
    entrenamientoStore();

  const [editar, setEditar] = React.useState(false);

  //Get arguments from URL
  const { rutina } = useLocalSearchParams();

  const rutinaStr = Array.isArray(rutina) ? rutina[0] : rutina;

  const ejercicios = getRutina(rutinaStr)?.Ejercicios || [];

  const icon = <Feather name="delete" size={45} color="#E34716" />;
  const iconSum = <Feather name="plus-circle" size={45} color="#6608ff" />;

  //const { data: profile, error, isLoading } = getProfile();
  const { profile, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;
  //if (error) return <Text>Error: {error.message}</Text>;

  const handleEmpezarEntreno = (idRutina: string) => {
    // Check if there is a Entrenamiento in progress
    if (isRunning) {
      Alert.alert(
        'Entrenamiento en progreso',
        '¿Deseas continuar con el entrenamiento en progreso o reiniciarlo con la rutina?',
        [
          {
            text: 'Continuar entrenamiento',
            onPress: () => {
              router.push('/Ejercicio/Entrenamiento');
            },
          },
          {
            text: 'Reiniciar con rutina',
            onPress: () => {
              resetEntrenamiento();
              prefillEntrenamiento(idRutina);
            },
          },
        ]
      );
    } else {
      prefillEntrenamiento(idRutina);
    }
  };

  const prefillEntrenamiento = (idRutina: string) => {
    const rutina = getRutina(idRutina);

    if (!rutina) {
      console.error('Rutina not found');
      return;
    }

    setTitulo(rutina.Nombre);
    setFecha(new Date().toISOString());

    rutina.Ejercicios.forEach((element) => {
      addEjercicio(element);
      const series = getSeriesByEjercicioAndRutina(idRutina, element.id);
      series.forEach((serie) => {
        addSerieEjercicio(serie, element.id);
      });
    });

    router.push('/Ejercicio/Entrenamiento');
  };

  return (
    <ScrollView>
      <EjerciciosModal
        visible={modalVisible}
        setModalVisible={setModalVisible}
        rutina={rutinaStr}
      />

      <Stack.Screen
        name="Ejercicio/DetallesRutina"
        options={{
          headerShown: true,
          title: 'Rutina',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity>
              <Feather name="more-horizontal" size={25} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 10,
        }}>
        <View>
          <Text style={styles.fecha}>{rutina}</Text>
          <Text style={{ paddingLeft: 10 }}>Creado por {profile?.username}</Text>
        </View>
        <TouchableOpacity onPress={() => setEditar(!editar)}>
          {editar ? (
            <Text style={{ color: '#6608ff', fontSize: 18 }}>Guardar</Text>
          ) : (
            <FontAwesome6 name="edit" size={24} color="#6608ff" />
          )}
        </TouchableOpacity>
      </View>
      {editar ? (
        <Link href="/(protected)/(tabs)/(exercise)" asChild>
          <IconButton
            icon={icon}
            text="Eliminar rutina"
            textStyle={{ color: '#E34716' }}
            style={{ backgroundColor: '#FFBBB9', shadowColor: '#E34716' }}
            onPress={() => {
              removeRutina(rutinaStr);
            }}
          />
        </Link>
      ) : (
        <IconButton
          icon={iconSum}
          text="Empezar entrenamiento"
          onPress={() => handleEmpezarEntreno(rutinaStr)}
        />
      )}

      <Text style={[styles.fecha, { paddingBottom: 15, flex: 1 }]}>Ejercicios</Text>
      <FlatList
        scrollEnabled={false}
        style={{ paddingBottom: 20 }}
        data={ejercicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TarjetaEjercicio
            idEjercicio={item.id}
            rutina={rutinaStr}
            editable={editar}
            showCheck={false}
          />
        )}
      />

      {editar && (
        <IconButton
          icon={iconSum}
          text="Añadir Ejercicio"
          onPress={() => setModalVisible(!modalVisible)}
        />
      )}
    </ScrollView>
  );
};

export default DetallesRutina;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fecha: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
    paddingTop: 15,
  },
  empezarEntrenamiento: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6608ff',
  },
  separator: {
    height: 2,
    backgroundColor: '#dddddd',
  },
  empezarButton: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#6608ff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
