import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { medidaType, tipoMedidaEnum } from '~/src/types/types';

import { Picker } from '@react-native-picker/picker';
import Grafica from './Grafica';

interface GraficaMedidasProps {
  medidas: medidaType[];
  selectedMedida: string;
  setSelectedMedida: (medida: string) => void;
}

const GraficaMedidas = ({ medidas, selectedMedida, setSelectedMedida }: GraficaMedidasProps) => {
  return (
    <View style={styles.container}>
      <Grafica medida={selectedMedida} />
    </View>
  );
};

export default GraficaMedidas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    //padding: 20,
  },
});
