import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { Feather } from '@expo/vector-icons';
import { medidaType, tipoMedidaEnum } from '~/src/types/types';

import IconInputSelector from '@components/inputs/IconInputSelector';

interface GraficaMedidasProps {
  medidas: medidaType[];
}

const GraficaMedidas = ({ medidas }: GraficaMedidasProps) => {
  const iconoSelector = <Feather name="bar-chart-2" size={24} color="black" />;

  const [selectedMedida, setSelectedMedida] = useState<string>('Selecciona una medida');

  return (
    <View style={styles.container}>
      <Text>GraficaMedidas</Text>
      <IconInputSelector
        icon={iconoSelector}
        text={selectedMedida ? selectedMedida : 'Selecciona una medida'}
        selected={selectedMedida}
        setSelected={setSelectedMedida}
        options={Object.values(tipoMedidaEnum).map((medida) => medida)}
      />
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
    padding: 20,
  },
});
