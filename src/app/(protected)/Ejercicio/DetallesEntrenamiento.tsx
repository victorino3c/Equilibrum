import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CabeceraDetallesEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/CabeceraDetallesEntrenamiento';
import SensacionesEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/SensacionesEntrenamiento';
import ResumenHistoriaEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/ResumenHistoriaEntrenamiento';
import ResumenEjercicio from '~/src/components/Ejercicio/Entrenamiento/ResumenEjercicio';

//TEMP
import {
  findEntrenamientoByDate,
  findEntrenamientoIdByDate,
} from '~/assets/ejercicio/entrenamientos';
import TarjetaEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/TarjetaEntrenamiento/TarjetaEntrenamiento';

type DetallesEntrenamientoProps = {
  fecha: string;
};

const DetallesEntrenamiento = () => {
  const [editar, setEditar] = React.useState(false);

  const { fecha }: DetallesEntrenamientoProps = useLocalSearchParams();

  const renderItem = ({ item }: { item: JSX.Element }) => <View>{item}</View>;

  const Ejercicios = findEntrenamientoByDate(fecha)?.Ejericios || [];
  const idEntrenamiento = findEntrenamientoIdByDate(fecha);

  if (!idEntrenamiento) {
    return null;
  }

  const data = [
    <CabeceraDetallesEntrenamiento fecha={fecha} editar={editar} />,
    editar ? null : <TarjetaEntrenamiento idEntrenamiento={idEntrenamiento} />,
    editar ? null : <SensacionesEntrenamiento fecha={fecha} />, // HACER QUE SE VEA EL SLIDER
    editar ? null : <ResumenHistoriaEntrenamiento idEntrenamiento={idEntrenamiento} />,
    ...(Ejercicios.length > 0
      ? Ejercicios.map((Ejercicio) => (
          <ResumenEjercicio
            idEjercicio={Ejercicio}
            idEntrenamiento={idEntrenamiento}
            editar={editar}
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
        contentContainerStyle={styles.container}
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
