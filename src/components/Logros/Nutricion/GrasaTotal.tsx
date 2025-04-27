import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';
import Logro from '../Logro';
import LogrosStore from '@store/LogrosStore';

interface GrasaTotalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const GrasaTotal = ({ open, setOpen }: GrasaTotalProps) => {
  const { valores } = LogrosStore();

  const grasaTotal = valores.grasasTotal || 0;

  if (!open) {
    return (
      <TouchableOpacity style={styles.containerClosed} onPress={() => setOpen(!open)}>
        <Text style={styles.titulo}>Grasa consumida</Text>
        <Feather name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.containerOpen} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titulo}>Grasa consumida</Text>
          <Feather name="chevron-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Logro objetivo={1000} actual={grasaTotal} titulo="Consume 1K gramos de grasa" />
      <Logro objetivo={5000} actual={grasaTotal} titulo="Consume 5K gramos de grasa" />
      <Logro objetivo={10000} actual={grasaTotal} titulo="Consume 10K gramos de grasa" />
    </View>
  );
};

export default GrasaTotal;

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
