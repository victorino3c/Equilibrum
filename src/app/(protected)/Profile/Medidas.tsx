import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

import { medidasStore } from '@store/MedidasStore';
import { tipoMedidaEnum } from '~/src/types/types';
import CarrouselMedidas from '~/src/components/Medidas/CarrouselMedidas';
import GraficaMedidas from '~/src/components/Medidas/GraficaMedidas';

const Medidas = () => {
  const { medidas, addMedida, clearMedidas } = medidasStore();

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => {
          addMedida({
            id: '1',
            tipo_medida: tipoMedidaEnum.Peso,
            fecha: '2023-10-01',
            valor: 70,
            unidad: 'kg',
          });
        }}>
        <Text>Agregar Medida</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          clearMedidas();
        }}>
        <Text>Limpiar Medidas</Text>
      </TouchableOpacity>

      <CarrouselMedidas medidas={medidas} />
      <GraficaMedidas medidas={medidas} />
    </ScrollView>
  );
};

export default Medidas;
