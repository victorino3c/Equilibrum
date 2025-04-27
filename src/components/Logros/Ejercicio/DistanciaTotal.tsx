import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';
import Logro from '../Logro';
import LogrosStore from '@store/LogrosStore';

interface DistanciaTotalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DistanciaTotal = ({ open, setOpen }: DistanciaTotalProps) => {
  const { valores } = LogrosStore();

  const distanciaTotal = valores.distanciaTotal || 0;

  if (!open) {
    return (
      <TouchableOpacity style={styles.containerClosed} onPress={() => setOpen(!open)}>
        <Text style={styles.titulo}>Distancia recorrida</Text>
        <Feather name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.containerOpen} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titulo}>Distancia recorrida</Text>
          <Feather name="chevron-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Logro objetivo={100} actual={distanciaTotal} titulo="Recorre 100 kilometros" />
      <Logro objetivo={1000} actual={distanciaTotal} titulo="Recorre 1.000 kilometros" />
      <Logro objetivo={5000} actual={distanciaTotal} titulo="Recorre 5.000 kilometros" />
    </View>
  );
};

export default DistanciaTotal;

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
