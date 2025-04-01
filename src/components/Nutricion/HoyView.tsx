import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import React, { useEffect, useState } from 'react';

import ResumenEstadisticasNutricion from '@components/Nutricion/ResumenEstadisticas';
import { useNutricionStore } from '@store/NutricionStore';

const HoyView = () => {
  const [nutricion, setNutricion] = useState<any>(null);

  const { getNutricion } = useNutricionStore();
  useEffect(() => {
    const nutricionData = getNutricion();
    setNutricion(nutricionData);
  }, []);

  return (
    <View>
      <ResumenEstadisticasNutricion Nutricion={nutricion} card={true} />
    </View>
  );
};

export default HoyView;

const styles = StyleSheet.create({});
