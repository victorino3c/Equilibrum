import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';
import Logro from '../Logro';
import logrosStore from '@store/LogrosStore';

interface DiasSueñoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DiasSueño = ({ open, setOpen }: DiasSueñoProps) => {
  const { valores } = logrosStore();

  const diasTotales = valores.diasObjetivoSueño || 0;

  if (!open) {
    return (
      <TouchableOpacity style={styles.containerClosed} onPress={() => setOpen(!open)}>
        <Text style={styles.titulo}>Días cumplendo objetivo sueño</Text>
        <Feather name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.containerOpen} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titulo}>Días cumplendo objetivo sueño</Text>
          <Feather name="chevron-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Logro objetivo={50} actual={diasTotales} titulo="Objetivo cumplido 50 dias" />
      <Logro objetivo={150} actual={diasTotales} titulo="Objetivo cumplido 150 dias" />
      <Logro objetivo={365} actual={diasTotales} titulo="Objetivo cumplido 365 dias" />
    </View>
  );
};

export default DiasSueño;

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
