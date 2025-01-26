import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { Stack, useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { FontAwesome6, Feather } from '@expo/vector-icons';

import CabeceraDetallesEntrenamiento from '@components/Ejercicio/Entrenamiento/CabeceraDetallesEntrenamiento';
import SensacionesEntrenamiento from '@components/Ejercicio/Entrenamiento/SensacionesEntrenamiento';
import ResumenHistoriaEntrenamiento from '@components/Ejercicio/Entrenamiento/ResumenHistoriaEntrenamiento';
//import ResumenEjercicio from '@components/Ejercicio/Entrenamiento/ResumenEjercicio';
import TarjetaEntrenamiento from '@components/Ejercicio/Entrenamiento/TarjetaEntrenamiento/TarjetaEntrenamiento';

import {
  getEntrenamiento,
  getEjerciciosEntrenamiento,
  useDeleteEntrenamiento,
} from '@api/entrenamientos';

import TarjetaEjercicio from '@components/Ejercicio/Entrenamiento/EnCurso/TarjetaEjercicio';
import IconButton from '@components/Buttons/IconButton';

type DetallesEntrenamientoProps = {
  id: string;
};

const deleteIcon = <Feather name="trash-2" size={40} color="#E34716" />;

const DetallesEntrenamiento = () => {
  const [editar, setEditar] = React.useState(false);

  const { id }: DetallesEntrenamientoProps = useLocalSearchParams();

  const renderItem = ({ item }: { item: JSX.Element }) => <View>{item}</View>;

  const { data: entrenamiento, isLoading: isLoadingEntrenamiento } = getEntrenamiento(id);
  const { data: ejercicios_, isLoading: isLoadingEjercicios } = getEjerciciosEntrenamiento(id);
  const { mutate: deleteEntrenamiento } = useDeleteEntrenamiento();

  // Creo un array con los ids de los ejercicios
  const ejercicios = ejercicios_?.flatMap((ejercicio) => ejercicio.id_ejercicio);

  const handleDeleteEntrenamiento = () => {
    deleteEntrenamiento(id);
    router.back();
  };

  if (!entrenamiento || !ejercicios) {
    return null;
  }

  if (isLoadingEntrenamiento || isLoadingEjercicios) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const data = [
    <CabeceraDetallesEntrenamiento
      entrenamiento={entrenamiento}
      loading={isLoadingEjercicios && isLoadingEntrenamiento}
      editar={editar}
    />,
    editar ? (
      <IconButton
        style={{ backgroundColor: '#FFBBB9', marginBottom: 25, marginTop: 10, paddingVertical: 35 }}
        textStyle={{ color: '#E34716', fontSize: 24, fontWeight: 'bold' }}
        icon={deleteIcon}
        text="Borrar entrenamiento"
        onPress={() => handleDeleteEntrenamiento()}
      />
    ) : null,
    editar ? null : <TarjetaEntrenamiento entrenamiento={entrenamiento} />,
    editar ? null : <SensacionesEntrenamiento entrenamiento={entrenamiento} />, // TODO: HACER QUE SE VEA EL SLIDER
    editar ? null : (
      <ResumenHistoriaEntrenamiento idsEjercicios={ejercicios} idEntrenamiento={entrenamiento.id} />
    ),
    ...(ejercicios.length > 0
      ? ejercicios.map((ejercicio) => (
          <TarjetaEjercicio
            idEjercicio={ejercicio}
            idEntrenamiento={entrenamiento.id}
            editable={editar}
            showCheck={editar}
            actual={false}
            style={{ marginBottom: 15, marginTop: 0 }}
          />
        ))
      : [
          <View style={styles.cont}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'medium',
                textAlign: 'center',
                paddingVertical: 30,
              }}>
              No hay ejercicios
            </Text>
          </View>,
        ]),
  ].filter((item) => item !== null);

  return (
    <>
      <Stack.Screen
        name="Ejercicio/DetallesEntrenamiento"
        options={{
          headerShown: true,
          title: 'Detalles Entrenamiento',
          headerTitleAlign: 'center',
          headerRight: () => {
            return editar ? (
              <TouchableOpacity onPress={() => setEditar(false)}>
                <Text style={{ color: '#6608ff', fontSize: 18, textAlign: 'center' }}>Guardar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setEditar(true)}>
                <FontAwesome6 name="edit" size={24} color="#6608ff" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <StatusBar style="auto" backgroundColor="white" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        //contentContainerStyle={styles.container}
      />
    </>
  );
};

export default DetallesEntrenamiento;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  cont: {
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    flex: 1,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
