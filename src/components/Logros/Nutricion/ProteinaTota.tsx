import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';
import Logro from '../Logro';
import LogrosStore from '@store/LogrosStore';

interface ProteinaTotalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProteinaTotal = ({ open, setOpen }: ProteinaTotalProps) => {
  const { valores } = LogrosStore();

  const proteinaTotal = valores.proteinasTotal || 0;

  if (!open) {
    return (
      <TouchableOpacity style={styles.containerClosed} onPress={() => setOpen(!open)}>
        <Text style={styles.titulo}>Proteina consumida</Text>
        <Feather name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.containerOpen} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titulo}>Proteina consumida</Text>
          <Feather name="chevron-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Logro objetivo={1000} actual={proteinaTotal} titulo="Consume 1K gramos de proteina" />
      <Logro objetivo={5000} actual={proteinaTotal} titulo="Consume 5K gramos de proteina" />
      <Logro objetivo={10000} actual={proteinaTotal} titulo="Consume 10K gramos de proteina" />
    </View>
  );
};

export default ProteinaTotal;

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
