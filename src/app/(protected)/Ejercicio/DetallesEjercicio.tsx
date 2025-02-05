import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { useGetEjercicioById } from '@api/ejercicios';

import { LocalRouteParamsContext } from 'expo-router/build/Route';

const DetallesEjercicio = () => {
  const params = React.useContext(LocalRouteParamsContext);

  if (!params || !params.id) {
    throw new Error('No se ha encontrado el id del ejercicio');
    return null;
  }

  const { id } = params;

  const { data: ejercicio, error, isLoading } = useGetEjercicioById(id);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>detallesEjercicio</Text>
    </View>
  );
};

export default DetallesEjercicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
