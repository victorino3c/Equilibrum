import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';

import { alimentoType, medidaEnum, NutricionInfo } from '~/src/types/types';
import { Feather, FontAwesome6, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import PlantillaModal from './PlantillaModal';
import { Database } from '~/src/database.types';

type ResumenNutricionProps = {
  periodo: Database['public']['Enums']['tipo_nutricion_enum'];
  periodoMacros: NutricionInfo | undefined;
  alimentos: { alimento: alimentoType; cantidad: number }[] | undefined;
  editar?: boolean;
};

const ResumenNutricion = ({ periodo, periodoMacros, alimentos, editar }: ResumenNutricionProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState<any>(null);

  const showModal = () => {
    setModalData({ periodoMacros, alimentos });
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <PlantillaModal visible={modalVisible} data={modalData} setModalVisible={setModalVisible} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={styles.tittle}>{periodo}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <Feather name="image" size={24} color="#777777" />
          <TouchableOpacity onPress={() => showModal()}>
            <FontAwesome6 name="bolt" size={24} color="#6608ff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="flame-outline" size={20} color="#FF6F15" style={{ marginBottom: 10 }} />
        <Text style={styles.text}>
          {periodoMacros?.Calorias || 0} kcal | {periodoMacros?.Grasas || 0} g |{' '}
          {periodoMacros?.Carbohidratos || 0} g | {periodoMacros?.Grasas || 0} g
        </Text>
      </View>
      <FlatList
        data={alimentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.titulos}>
              <Text style={[styles.datos, { fontWeight: 'bold' }]}>{index + 1}</Text>
              <Text style={styles.datos}>{item.alimento.nombre}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              <View style={[styles.titulos, { gap: 5 }]}>
                <Text style={styles.cantidad}>{item.cantidad}</Text>
                {item.alimento.tipo_medida !== medidaEnum.Peso && (
                  <Text style={styles.cantidad}>{item.alimento.tipo_medida}</Text>
                )}
              </View>
              <View>
                <FontAwesome5 name="check-circle" size={24} color="black" />
              </View>
            </View>
          </View>
        )}
      />
      {editar && (
        <TouchableOpacity style={styles.botonAdd}>
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
