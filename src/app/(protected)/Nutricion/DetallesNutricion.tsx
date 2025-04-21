import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import moment from 'moment';

import { useGetNutricionesOfDate, getAlimentosByPeriodo } from '@api/nutricion';
import { getProfile } from '@api/profile';

import { Database } from '~/src/database.types';

import appStore from '@store/AppStore';
import ResumenEstadisticasNutricion from '@components/Nutricion/ResumenEstadisticas';
import TarjetaNutricion from '@components/Nutricion/TarjetaNutricion/TarjetaNutricion';
import ResumenHistoriaNutricion from '@components/Nutricion/ResumenHistoriaNutricion';
import ResumenNutricion from '@components/Nutricion/ResumenNutricion';
import { useAuth } from '@providers/AuthProvider';

type DetallesNutricionProps = {
  fecha: string;
};

const periodos = ['Desayuno', 'Comida', 'Cena', 'Snacks'];

const DetallesNutricion = () => {
  const [editar, setEditar] = React.useState(false);

  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    return null;
  }

  const { data: profile } = getProfile();

  const { fecha }: DetallesNutricionProps = useLocalSearchParams();

  //const [Nutricion, setNutricion] = React.useState<any>(null);
  const { data: Nutricion, isLoading } = useGetNutricionesOfDate(fecha);
  const objetivosNutricion = appStore.getState().objetivosNutricion;

  var alimentosData: { [key: string]: any } = {
    Desayuno: [],
    Comida: [],
    Cena: [],
    Snacks: [],
  };

  periodos.forEach((periodo) => {
    const { data } = getAlimentosByPeriodo(periodo, fecha, userId);

    if (data) {
      alimentosData[periodo] = data;
    } else {
      alimentosData[periodo] = {};
    }

    return { data };
  });

  const renderItem = ({ item }: { item: JSX.Element }) => <View>{item}</View>;

  if (!Nutricion || isLoading || !alimentosData) {
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

  const data = [
    <Text style={styles.fecha}>{moment(fecha).format('DD MMMM, YYYY')}</Text>,
    !editar ? <ResumenEstadisticasNutricion Nutricion={NutricionEstadisticas} card={true} /> : null,
    !editar ? (
      <TarjetaNutricion
        nutricion={NutricionEstadisticas.macros}
        fecha={fecha}
        username={profile?.username || ''}
      />
    ) : null,
    !editar ? <ResumenHistoriaNutricion nutricion={alimentosData} /> : null,
    ...periodos.map((periodo) => (
      <ResumenNutricion
        fecha={fecha}
        periodo={periodo as Database['public']['Enums']['tipo_nutricion_enum']}
        periodoMacros={{
          Calorias:
            alimentosData[periodo]?.reduce(
              (acc: any, curr: { calorias: any }) => acc + (curr.calorias || 0),
              0
            ) || 0,
          Proteinas:
            alimentosData[periodo]?.reduce(
              (acc: any, curr: { proteina: any }) => acc + (curr.proteina || 0),
              0
            ) || 0,
          Carbohidratos:
            alimentosData[periodo]?.reduce(
              (acc: any, curr: { carbohidratos: any }) => acc + (curr.carbohidratos || 0),
              0
            ) || 0,
          Grasas:
            alimentosData[periodo]?.reduce(
              (acc: any, curr: { grasa: any }) => acc + (curr.grasa || 0),
              0
            ) || 0,
        }}
        alimentos={Object.values(alimentosData).flat()} // Flatten and extract data
        alimentosPeriodo={alimentosData[periodo]?.map((alimento: any) => ({
          alimento: { ...alimento },
          cantidad: alimento.cantidad,
        }))} // Flatten and map to include 'alimento' property
        editar={editar}
      />
    )),
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
