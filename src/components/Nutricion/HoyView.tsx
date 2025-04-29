import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Database } from '~/src/database.types';
import { NutricionInfo } from '~/src/types/types';
import ResumenEstadisticasNutricion from '@components/Nutricion/ResumenEstadisticas';
import ResumenNutricion from '@components/Nutricion/ResumenNutricion';
import { useNutricionStore } from '@store/NutricionStore';
import appStore from '@store/AppStore';
import { insertNutricio, useGetAlimentos } from '@api/nutricion';
import { useInsertNutricio } from '~/src/utils/insertNutricio';
import { useAuth } from '~/src/providers/AuthProvider';
import { useQueryClient } from '~/src/providers/QueryProvider';

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

  const { session } = useAuth();
  const user_id = session?.user.id || '';
  const queryClient = useQueryClient();
  const { insertNutricio } = useInsertNutricio(queryClient);

  const { getNutricion, getPeriodos, fecha, clearAll } = useNutricionStore();

  useEffect(() => {
    const nutricionData = getNutricion();
    const periodosNutricion = getPeriodos();
    const objetivosNutricion = appStore.getState().objetivosNutricion;
    setNutricion({ ...nutricionData, ...objetivosNutricion });
    setPeriodos(periodosNutricion);
  }, []);

  const handleButton = () => {
    Alert.alert(
      '¿Estás seguro?',
      'Esta acción subirá todos tus datos a la nube pero los eliminará localmente.',
      [
        {
          text: 'Si',
          onPress: () => {
            handleInsert();
          },
        },
        { text: 'No', style: 'cancel' },
      ]
    );
  };

  const handleInsert = async () => {
    const periodos_store = getPeriodos();
    const storedDate = fecha; //fecha;
    const today = moment().format('YYYY-MM-DD');

    //if (storedDate === today) {
    //  console.log('La fecha almacenada es la misma que la de hoy. No se hace nada.');
    //  return;
    //}

    try {
      //TEMP funciona pero no se suben los alimentos ver por que
      await insertNutricio({ user_id, periodos_store, storedDate: today, today });
      clearAll();
    } catch (error) {
      console.error('Error inserting nutricion:', error);
      return;
    }
  };

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
      <TouchableOpacity
        style={styles.insertButton}
        onPress={() => {
          handleButton();
        }}>
        <Text style={styles.insertButtonText}>Subir a base de datos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HoyView;

const styles = StyleSheet.create({
  insertButton: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
  insertButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6608ff',
    textAlign: 'center',
  },
});
