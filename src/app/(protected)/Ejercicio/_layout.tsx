import { Stack, router } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@providers/AuthProvider';
import { Redirect, Link } from 'expo-router';
import CabeceraEntrenamiento from '@components/Ejercicio/Entrenamiento/EnCurso/CabeceraEntrenamiento';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

import { entrenamientoStore } from '@store/Entrenamientostore';
import { rutinaStore } from '@store/RutinaStore';

import { useInsertEntrenamiento } from '@api/entrenamientos';
import { useInsertEjerciciosEntrenamiento } from '@api/ejercicios';
import { useInsertSerieCalistenia, useInsertSerieCardio, useInsertSerieFuerza } from '@api/series';

export default function EjercicioLayout() {
  const {
    resetEntrenamiento,
    allSeriesChecked,
    titulo,
    notas,
    calorias,
    volumen,
    seconds,
    sensacion,
    fecha,
    seriesCalistenia,
    seriesCardio,
    seriesFuerza,
  } = entrenamientoStore();
  const { updateRutina, removeRutina, tituloNuevaRutina, setTituloNuevaRutina, getRutina } =
    rutinaStore();

  const insertEntrenamiento = useInsertEntrenamiento();
  const insertEntrenamientoEjercicios = useInsertEjerciciosEntrenamiento();
  const insertSerieFuerza = useInsertSerieFuerza();
  const insertSerieCalistenia = useInsertSerieCalistenia();
  const insertSerieCardio = useInsertSerieCardio();

  const [id_entrenamiento, setIdEntrenamiento] = useState<string>('');
  const [ejerciciosAñadidos, setEjerciciosAñadidos] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const ids_ejercicios: string[] = entrenamientoStore().ejercicios.map((ejercicio) => ejercicio.id);

  const { session } = useAuth();
  const insets = useSafeAreaInsets();

  if (!session) {
    return <Redirect href={'/(onboarding)'} />;
  }

  // Insertar los ejercicios al entrenamiento despues de crearlo
  useEffect(() => {
    if (id_entrenamiento !== '') {
      insertEntrenamientoEjercicios.mutate(
        {
          id_entrenamiento,
          ids_ejercicios,
        },
        {
          onSuccess: () => {
            setEjerciciosAñadidos(true);
            //resetEntrenamiento();
            //router.navigate('./Entrenamiento');
          },
          onError: (error) => {
            console.log(error);
            setIdEntrenamiento('');
            setError(error.message);
            Alert.alert(
              'Error',
              'No se ha podido guardar el entrenamiento al añadir los ejercicios.'
            );
          },
        }
      );
    }
  }, [id_entrenamiento]);

  // Insertar las series de los ejercicios al finalizar el añadido de los ejercicios
  useEffect(() => {
    if (ejerciciosAñadidos) {
      seriesFuerza.forEach((serie) => {
        insertSerieFuerza.mutate(
          { ...serie, id_entrenamiento },
          {
            onError: (error) => {
              setError(error.message);
              setEjerciciosAñadidos(false);
              setIdEntrenamiento('');
              Alert.alert('Error', 'No se ha podido guardar las series de fuerza.');
            },
          }
        );
      });

      seriesCardio.forEach((serie) => {
        insertSerieCardio.mutate(
          { ...serie, id_entrenamiento },
          {
            onError: (error) => {
              setError(error.message);
              setEjerciciosAñadidos(false);
              setIdEntrenamiento('');
              Alert.alert('Error', 'No se ha podido guardar las series de cardio.');
            },
          }
        );
      });

      seriesCalistenia.forEach((serie) => {
        insertSerieCalistenia.mutate(
          { ...serie, id_entrenamiento },
          {
            onError: (error) => {
              setError(error.message);
              setEjerciciosAñadidos(false);
              setIdEntrenamiento('');
              Alert.alert('Error', 'No se ha podido guardar las series de calistenia.');
            },
          }
        );
      });

      setIdEntrenamiento('');
      setEjerciciosAñadidos(false);
      if (error) {
        console.log(error);
        return;
      }

      resetEntrenamiento();
      router.navigate('/(protected)/(tabs)/(exercise)');
    }
  }, [ejerciciosAñadidos]);

  // Insertar el entrenamiento al finalizar
  const handleTerminar = () => {
    insertEntrenamiento.mutate(
      {
        calorias,
        notas,
        titulo,
        duracion: seconds,
        series: 20,
        sensacion,
        volumen,
        fecha,
      },
      {
        onSuccess: (data) => {
          setIdEntrenamiento(data.id);
        },
        onError: (error) => {
          setError(error.message);
          Alert.alert('Error', 'No se ha podido guardar el entrenamiento.');
        },
      }
    );
  };

  const handleTerminarEntrenamiento = () => {
    if (!allSeriesChecked()) return Alert.alert('Error', 'Debes marcar todas las series.');

    router.navigate('./FinEntrenamiento');
  };

  const handleGuardarRutina = () => {
    if (tituloNuevaRutina.trim() === '') {
      Alert.alert('Error', 'El título de la rutina no puede estar vacío.');
      return;
    }

    const rutina = getRutina('temp');
    const rutinaRep = getRutina(tituloNuevaRutina);

    if (!rutina) {
      Alert.alert('Error', 'No se ha podido guardar la rutina.');
      return;
    }

    if (rutinaRep) {
      Alert.alert('Error', 'Ya existe una rutina con ese nombre.');
      return;
    }

    // Hacer que al guardar rutina, se cambie el nombre de la rutina a un nombre unico
    updateRutina('temp', { ...rutina, Nombre: tituloNuevaRutina });

    //Eliminar el nombre de la rutina

    setTituloNuevaRutina('');

    // Eliminar la rutina temporal por si acaso
    removeRutina('temp');

    // Navegar a la pestaña después de guardar la rutina
    router.push('/(protected)/(tabs)/(exercise)');
  };

  const handleBackCrearRutina = () => {
    setTituloNuevaRutina('');
    removeRutina('temp');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: 'transparent' }}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="Entrenamiento">
        <Stack.Screen
          name="CrearRutina"
          options={{
            title: 'Crear Rutina',
            headerShown: true,
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity onPress={handleGuardarRutina}>
                <Text style={styles.botonGuardar}>Guardar</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <Link href="/(protected)/(tabs)/(exercise)" asChild>
                <TouchableOpacity onPress={handleBackCrearRutina}>
                  <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="Entrenamiento"
          options={{
            headerShown: true,
            header: () => (
              <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <View style={styles.headerTop}>
                  <View style={styles.headerItems}>
                    <Link href="/(protected)/(tabs)/(exercise)" asChild>
                      <TouchableOpacity>
                        <Feather name="chevron-down" size={24} color="black" />
                      </TouchableOpacity>
                    </Link>
                  </View>
                  <View style={styles.headerItems}>
                    <Text style={styles.headerTitle}>Entrenamiento</Text>
                  </View>
                  <View style={styles.headerItems}>
                    <TouchableOpacity onPress={handleTerminarEntrenamiento}>
                      <Text style={styles.botonGuardar}>Terminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <CabeceraEntrenamiento />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="FinEntrenamiento"
          options={{
            headerShown: true,
            header: () => (
              <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <View style={styles.headerTop}>
                  <View style={styles.headerItems}>
                    <Link href="./Entrenamiento" asChild>
                      <TouchableOpacity>
                        <Feather name="arrow-left" size={24} color="black" />
                      </TouchableOpacity>
                    </Link>
                  </View>
                  <View style={styles.headerItems}>
                    <Text style={styles.headerTitle}>Entrenamiento</Text>
                  </View>
                  <View style={styles.headerItems}>
                    <TouchableOpacity onPress={handleTerminar}>
                      <Text style={styles.botonGuardar}>Terminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <CabeceraEntrenamiento />
              </View>
            ),
          }}
        />
        <Stack.Screen name="DetallesEjercicio" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerItems: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botonGuardar: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    backgroundColor: '#6608ff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 90,
  },
});
