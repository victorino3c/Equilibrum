import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';
import Logro from '../Logro';
import logrosStore from '@store/LogrosStore';

interface VolumenTotalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VolumenTotal = ({ open, setOpen }: VolumenTotalProps) => {
  const { valores } = logrosStore();

  const volumenTotal = valores.volumenTotal || 0;

  if (!open) {
    return (
      <TouchableOpacity style={styles.containerClosed} onPress={() => setOpen(!open)}>
        <Text style={styles.titulo}>Volumen levantado</Text>
        <Feather name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.containerOpen} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titulo}>Volumen levantado</Text>
          <Feather name="chevron-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Logro objetivo={100000} actual={volumenTotal} titulo="Levanta 100K kilos" />
      <Logro objetivo={500000} actual={volumenTotal} titulo="Levanta 500K kilos" />
      <Logro objetivo={1000000} actual={volumenTotal} titulo="Levanta 1M de kilos" />
    </View>
  );
};

export default VolumenTotal;

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
