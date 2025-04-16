import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import React, { useEffect, useState } from 'react';

import { Database } from '~/src/database.types';
import { NutricionInfo } from '~/src/types/types';
import ResumenEstadisticasNutricion from '@components/Nutricion/ResumenEstadisticas';
import ResumenNutricion from '@components/Nutricion/ResumenNutricion';
import { useNutricionStore } from '@store/NutricionStore';
import appStore from '@store/AppStore';
import { useGetAlimentos } from '@api/nutricion';

type periodosType = Partial<
  Record<
    Database['public']['Enums']['tipo_nutricion_enum'],
    {
      alimentos: {
        alimento: Database['public']['Tables']['alimento']['Row'];
        cantidad: number;
      }[];
      macros: NutricionInfo;
    }
  >
>;

const HoyView = () => {
  const [nutricion, setNutricion] = useState<any>(null);
  const [periodos, setPeriodos] = useState<periodosType>({});
  const { data: alimentos } = useGetAlimentos();

  const { getNutricion, getPeriodos } = useNutricionStore();
  useEffect(() => {
    const nutricionData = getNutricion();
    const periodosNutricion = getPeriodos();
    const objetivosNutricion = appStore.getState().objetivosNutricion;
    setNutricion({ ...nutricionData, ...objetivosNutricion });
    setPeriodos(periodosNutricion);
  }, []);

  return (
    <View>
      <ResumenEstadisticasNutricion Nutricion={nutricion} card={true} />
      <FlatList
        data={Object.keys(periodos)}
        keyExtractor={(item) => item}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const periodo = periodos[item as keyof typeof periodos];
          return (
            <ResumenNutricion
              periodo={item as Database['public']['Enums']['tipo_nutricion_enum']}
              periodoMacros={periodo?.macros}
              alimentosPeriodo={periodo?.alimentos}
              alimentos={alimentos}
              editar={true}
            />
          );
        }}
      />
    </View>
  );
};

export default HoyView;

const styles = StyleSheet.create({});
