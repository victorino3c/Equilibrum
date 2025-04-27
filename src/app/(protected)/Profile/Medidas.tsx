import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { Feather } from '@expo/vector-icons';

import { medidasStore } from '@store/MedidasStore';
import { tipoMedidaEnum } from '~/src/types/types';
import CarrouselMedidas from '~/src/components/Medidas/CarrouselMedidas';
import IconInputSelector from '~/src/components/inputs/IconInputSelector';
import GraficaMedidas from '~/src/components/Medidas/GraficaMedidas';
import HistorialMedidas from '~/src/components/Medidas/HistorialMedidas';
import IconButtonPurple from '~/src/components/Buttons/IconButtonPurple';
import { Link } from 'expo-router';

const iconoMedida = <Feather name="activity" size={24} color="#6608ff" />;

const Medidas = () => {
  const { medidas } = medidasStore();
  const [selectedMedida, setSelectedMedida] = useState<string>('Peso');

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <IconInputSelector
          icon={iconoMedida}
          text="Selecciona medida"
          selected={selectedMedida}
          textStyle={{ fontSize: 18 }}
          style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 0 }}
          setSelected={setSelectedMedida}
          options={Object.values(tipoMedidaEnum).map((medida) => medida)}
        />
        <CarrouselMedidas
          medidas={medidas.filter((medida) => medida.tipo_medida === selectedMedida)}
        />
        <GraficaMedidas
          medidas={medidas}
          selectedMedida={selectedMedida}
          setSelectedMedida={setSelectedMedida}
        />
        <Text style={styles.historialText}>Historial</Text>
        <HistorialMedidas
          medida={selectedMedida}
          medidas={medidas.filter((medida) => medida.tipo_medida === selectedMedida)}
        />
      </ScrollView>
      <Link href="/(protected)/Profile/AddMedida" asChild>
        <IconButtonPurple
          text="Añadir medida"
          icon={<Feather name="plus-circle" size={45} color="#fff" />}
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
          }}
        />
      </Link>
    </View>
  );
};

export default Medidas;

const styles = StyleSheet.create({
  historialText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
});
