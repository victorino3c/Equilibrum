import { View, Text } from 'react-native';
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
    <View>
      <Text>detallesEjercicio</Text>
    </View>
  );
};

export default DetallesEjercicio;
