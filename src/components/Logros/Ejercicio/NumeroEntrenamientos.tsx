import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';
import Logro from '../Logro';
import LogrosStore from '@store/LogrosStore';

interface NumeroEntrenamientosProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NumeroEntrenamientos = ({ open, setOpen }: NumeroEntrenamientosProps) => {
  const { valores } = LogrosStore();

  const numeroEntrenos = valores.entrenamientosTotal || 0;

  if (!open) {
    return (
      <TouchableOpacity style={styles.containerClosed} onPress={() => setOpen(!open)}>
        <Text style={styles.titulo}>Numero de entrenamientos</Text>
        <Feather name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.containerOpen} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titulo}>Numero de entrenamientos</Text>
          <Feather name="chevron-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Logro objetivo={5} actual={numeroEntrenos} titulo="Realiza 5 entrenamientos" />

      <Logro objetivo={10} actual={numeroEntrenos} titulo="Realiza 10 entrenamientos" />
      <Logro objetivo={50} actual={numeroEntrenos} titulo="Realiza 50 entrenamientos" />
    </View>
  );
};

export default NumeroEntrenamientos;

const styles = StyleSheet.create({
  containerClosed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerOpen: {},
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
