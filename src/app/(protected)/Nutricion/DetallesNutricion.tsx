import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import ResumenEstadisticasNutricion from '~/src/components/Nutricion/ResumenEstadisticas';
import {
  findAlimentosByPeriodo,
  findNutricionByDate,
  findNutricionIdByDate,
  findPeriodoIdByNutricion,
  findPeriodosByNutricion,
} from '~/assets/nutricion/nutricion';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import moment from 'moment';
import TarjetaNutricion from '~/src/components/Nutricion/TarjetaNutricion/TarjetaNutricion';
import ResumenHistoriaNutricion from '~/src/components/Nutricion/ResumenHistoriaNutricion';
import ResumenNutricion from '~/src/components/Nutricion/ResumenNutricion';
//TEMP

type DetallesNutricionProps = {
  fecha: string;
};

const DetallesNutricion = () => {
  const [editar, setEditar] = React.useState(false);

  const { fecha }: DetallesNutricionProps = useLocalSearchParams();

  const renderItem = ({ item }: { item: JSX.Element }) => <View>{item}</View>;

  const idNutricion = findNutricionIdByDate(fecha) || -1;

  if (!idNutricion) {
    return null;
  }

  const Periodos = findPeriodosByNutricion(idNutricion) || [];
  const Nutricion = findNutricionByDate(fecha);

  const data = [
    <Text style={styles.fecha}>{moment(fecha).format('DD MMMM, YYYY')}</Text>,
    !editar ? (
      <ResumenEstadisticasNutricion Nutricion={findNutricionByDate(fecha)} card={true} />
    ) : null,
    !editar ? <TarjetaNutricion idNutricion={findNutricionIdByDate(fecha) || -1} /> : null,
    !editar ? <ResumenHistoriaNutricion idNutricion={findNutricionIdByDate(fecha) || -1} /> : null,
    ...(Periodos.length > 0
      ? Periodos.map((Periodo) => (
          <ResumenNutricion
            periodo={Periodo}
            alimentos={findAlimentosByPeriodo(
              findPeriodoIdByNutricion(idNutricion, Periodo.periodo) || -1
            )}
            editar={editar}
          />
        ))
      : []),
  ].filter((item) => item !== null);

  return (
    <>
      <Stack.Screen
        name="Nutricion/DetallesNutricion"
        options={{
          headerShown: true,
          title: 'Detalles Nutrición',
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

export default DetallesNutricion;

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
  fecha: {
    fontSize: 20,
    fontWeight: '500',
    padding: 10,
  },
});
