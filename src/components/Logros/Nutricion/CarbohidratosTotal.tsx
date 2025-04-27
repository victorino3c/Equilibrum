import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';
import Logro from '../Logro';
import LogrosStore from '@store/LogrosStore';

interface CarbohidratosTotalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CarbohidratosTotal = ({ open, setOpen }: CarbohidratosTotalProps) => {
  const { valores } = LogrosStore();

  const carbohidratosTotal = valores.carbohidratosTotal || 0;

  if (!open) {
    return (
      <TouchableOpacity style={styles.containerClosed} onPress={() => setOpen(!open)}>
        <Text style={styles.titulo}>Carbohidratos consumidos</Text>
        <Feather name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.containerOpen} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titulo}>Carbohidratos consumidos</Text>
          <Feather name="chevron-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Logro
        objetivo={1000}
        actual={carbohidratosTotal}
        titulo="Consume 1K gramos de carbohidratos"
      />
      <Logro
        objetivo={5000}
        actual={carbohidratosTotal}
        titulo="Consume 5K gramos de carbohidratos"
      />
      <Logro
        objetivo={10000}
        actual={carbohidratosTotal}
        titulo="Consume 10K gramos de carbohidatos"
      />
    </View>
  );
};

export default CarbohidratosTotal;

const styles = StyleSheet.create({
  containerClosed: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  containerOpen: {
    marginTop: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
