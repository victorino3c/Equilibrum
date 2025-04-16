import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import moment from 'moment';

//TEMP
import {
  findAlimentosByPeriodo,
  findNutricionByDate,
  findNutricionIdByDate,
  findPeriodoIdByNutricion,
  findPeriodosByNutricion,
  TipoPeriodo,
} from '~/assets/nutricion/nutricion';

import { useGetNutricionesOfDate } from '@api/nutricion';

import { Database } from '~/src/database.types';

import appStore from '@store/AppStore';
import ResumenEstadisticasNutricion from '@components/Nutricion/ResumenEstadisticas';
import TarjetaNutricion from '@components/Nutricion/TarjetaNutricion/TarjetaNutricion';
import ResumenHistoriaNutricion from '@components/Nutricion/ResumenHistoriaNutricion';
import ResumenNutricion from '@components/Nutricion/ResumenNutricion';

type DetallesNutricionProps = {
  fecha: string;
};

const DetallesNutricion = () => {
  const [editar, setEditar] = React.useState(false);

  const { fecha }: DetallesNutricionProps = useLocalSearchParams();

  //const [Nutricion, setNutricion] = React.useState<any>(null);
  const { data: Nutricion, isLoading } = useGetNutricionesOfDate(fecha);
  const objetivosNutricion = appStore.getState().objetivosNutricion;

  //useEffect(() => {
  //  const nutricionData = findNutricionByDate(fecha);
  //  const objetivosNutricion = appStore.getState().objetivosNutricion;
  //  setNutricion({ ...nutricionData, ...objetivosNutricion });
  //}, []);

  const renderItem = ({ item }: { item: JSX.Element }) => <View>{item}</View>;

  const idNutricion = findNutricionIdByDate(fecha) || -1;

  if (!Nutricion || isLoading) {
    return null;
  }

  const NutricionEstadisticas = {
    macros: {
      Calorias: Nutricion.reduce((acc, curr) => acc + (curr.calorias || 0), 0),
      Proteinas: Nutricion.reduce((acc, curr) => acc + (curr.proteina || 0), 0),
      Carbohidratos: Nutricion.reduce((acc, curr) => acc + (curr.carbohidratos || 0), 0),
      Grasas: Nutricion.reduce((acc, curr) => acc + (curr.grasa || 0), 0),
    },
    ...objetivosNutricion,
  };

  const Periodos = findPeriodosByNutricion(idNutricion) || [];

  const data = [
    <Text style={styles.fecha}>{moment(fecha).format('DD MMMM, YYYY')}</Text>,
    !editar ? <ResumenEstadisticasNutricion Nutricion={NutricionEstadisticas} card={true} /> : null,
    !editar ? <TarjetaNutricion idNutricion={findNutricionIdByDate(fecha) || -1} /> : null,
    !editar ? <ResumenHistoriaNutricion idNutricion={findNutricionIdByDate(fecha) || -1} /> : null,
    ...(Periodos.length > 0
      ? Periodos.map((Periodo) => (
          <ResumenNutricion
            // TODO: ARREGLAR PARA SER COMPATIBLE CON EL NUEVO TIPO DE NUTRICION DE SUPABASE
            periodo={Periodo.periodo as Database['public']['Enums']['tipo_nutricion_enum']}
            periodoMacros={{
              Calorias: Periodo.calorias,
              Proteinas: Periodo.proteinas,
              Carbohidratos: Periodo.carbohidratos,
              Grasas: Periodo.grasas,
            }}
            alimentos={findAlimentosByPeriodo(
              findPeriodoIdByNutricion(idNutricion, Periodo.periodo as TipoPeriodo) || -1
            )?.map((alimento) => ({
              alimento: {
                calorias: alimento.alimento.calorias,
                carbohidratos: alimento.alimento.carbohidratos,
                created_at: '', // Provide a default or fetch this value
                descripcion: null, // Provide a default or fetch this value
                grasa: alimento.alimento.grasas,
                id: '', // Provide a default or fetch this value
                nombre: alimento.alimento.nombre,
                proteina: alimento.alimento.proteinas,
                tipo_medida: null, // Provide a default or fetch this value
              },
              cantidad: alimento.cantidad, // Provide a default or fetch this value
            }))}
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
