import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

import { medidaType, tipoMedidaEnum } from '~/src/types/types';

import { medidasStore } from '@store/MedidasStore';

interface CarrouselMedidasProps {
  medidas: medidaType[];
}

const CarrouselMedidas = ({ medidas }: CarrouselMedidasProps) => {
  const { removeMedida } = medidasStore();

  const handleRemove = (fecha: string, tipo: tipoMedidaEnum, value: number) => {
    Alert.alert('Borrar medida', 'Seguro que quieres borrar la medida?', [
      { text: 'Si', onPress: () => removeMedida(fecha, tipo, value) },
      { text: 'No', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrousel medidas</Text>
      {medidas.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}>
          {medidas.map((medida) => (
            <TouchableOpacity
              onPress={() => {
                handleRemove(medida.fecha, medida.tipo_medida, medida.valor);
              }}
              key={medida.fecha + medida.valor.toString() + medida.tipo_medida}
              style={styles.item}>
              <Text
                style={{
                  paddingBottom: 5,
                  width: '100%',
                  fontWeight: 'bold',
                  backgroundColor: '#9f9f9f',
                  color: '#fff',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  textAlign: 'center',
                }}>
                {medida.fecha}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noItems}>
          <Text style={styles.noItemsText}>No hay medidas</Text>
        </View>
      )}
    </View>
  );
};

export default CarrouselMedidas;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  item: {
    //marginVertical: 10,
    height: 150,
    width: 110,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  noItems: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 18,
    color: '#9f9f9f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
