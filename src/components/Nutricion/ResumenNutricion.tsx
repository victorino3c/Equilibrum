import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';

import { alimentoType, medidaEnum, NutricionInfo } from '~/src/types/types';
import { Feather, FontAwesome6, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import PlantillaModal from './PlantillaModal';
import AlimentosModal from './AlimentosModal';

import { Database } from '~/src/database.types';
import moment from 'moment';
import { useNutricionStore } from '@store/NutricionStore';

type ResumenNutricionProps = {
  periodo: Database['public']['Enums']['tipo_nutricion_enum'];
  periodoMacros: NutricionInfo | undefined;
  alimentosPeriodo: { alimento: alimentoType; cantidad: number }[] | undefined;
  alimentos?: alimentoType[];
  fecha?: string;
  editar?: boolean;
};

const ResumenNutricion = ({
  periodo,
  periodoMacros,
  alimentosPeriodo,
  alimentos,
  fecha,
  editar,
}: ResumenNutricionProps) => {
  const [modalVisiblePlantilla, setModalVisiblePlantilla] = React.useState(false);
  const [modalDataPlantilla, setModalDataPlantilla] = React.useState<any>(null);
  const [modalVisibleAlimentos, setModalVisibleAlimentos] = React.useState(false);

  const { removeAlimento } = useNutricionStore();

  const handleRemoveAlimento = (id: string) => {
    if (fecha && fecha != moment().format('YYYY-MM-DD')) {
      // TODO: Si quiero añadir edicion de nutricion en el pasado quitar if y añadir la logica
      return;
    }

    removeAlimento(periodo, id);
  };

  const showModalPlantilla = () => {
    setModalDataPlantilla({ periodoMacros, alimentosPeriodo });
    setModalVisiblePlantilla(!modalVisiblePlantilla);
  };

  const showModalAlimentos = () => {
    setModalVisibleAlimentos(!modalVisibleAlimentos);
  };

  return (
    <View style={styles.container}>
      <PlantillaModal
        visible={modalVisiblePlantilla}
        data={modalDataPlantilla}
        setModalVisible={setModalVisiblePlantilla}
      />
      <AlimentosModal
        visible={modalVisibleAlimentos}
        alimentos={alimentos}
        alimentosPeriodo={alimentosPeriodo?.map((item) => item.alimento)}
        periodo={periodo}
        setModalVisible={setModalVisibleAlimentos}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={styles.tittle}>{periodo}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <Feather name="image" size={24} color="#777777" />
          <TouchableOpacity onPress={() => showModalPlantilla()}>
            <FontAwesome6 name="bolt" size={24} color="#6608ff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="flame-outline" size={20} color="#FF6F15" style={{ marginBottom: 10 }} />
        <Text style={styles.text}>
          {periodoMacros?.Calorias || 0} kcal | {periodoMacros?.Proteinas || 0} P |{' '}
          {periodoMacros?.Carbohidratos || 0} C | {periodoMacros?.Grasas || 0} G
        </Text>
      </View>
      <FlatList
        data={alimentosPeriodo}
        //keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.titulos}>
              <Text style={[styles.datos, { fontWeight: 'bold' }]}>{index + 1}</Text>
              <View>
                <Text style={{ fontSize: 20 }}>{item.alimento.nombre}</Text>
                <Text style={styles.cantidad}>
                  {item.alimento.calorias} kcal | {item.alimento.proteina} P |{' '}
                  {item.alimento.carbohidratos} C | {item.alimento.grasa} G
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              <View style={[styles.titulos, { gap: 5 }]}>
                <Text style={styles.cantidad}>{item.cantidad}</Text>
                {item.alimento.tipo_medida !== medidaEnum.Peso ? (
                  <Text style={styles.cantidad}>{item.alimento.tipo_medida}</Text>
                ) : (
                  <Text style={styles.cantidad}>g</Text>
                )}
              </View>
              {editar && (
                <TouchableOpacity onPress={() => handleRemoveAlimento(item.alimento.id)}>
                  <Entypo name="circle-with-cross" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
      {editar && (
        <TouchableOpacity style={styles.botonAdd} onPress={() => showModalAlimentos()}>
          <Feather name="plus-circle" size={45} color="#6608ff" />
          <Text style={{ fontSize: 20, color: '#6608ff', textAlign: 'center', fontWeight: 'bold' }}>
            Añadir Alimento
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ResumenNutricion;

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
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
  tittle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  titulos: {
    flexDirection: 'row',
    gap: 15,
    //alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 15,
  },
  datos: {
    fontSize: 20,
    textAlign: 'center',
  },
  cantidad: {
    fontSize: 16,
    textAlign: 'center',
  },
  botonAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
});
