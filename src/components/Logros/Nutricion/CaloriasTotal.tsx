import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';
import Logro from '../Logro';
import logrosStore from '@store/LogrosStore';

interface CaloriasTotalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CaloriasTotal = ({ open, setOpen }: CaloriasTotalProps) => {
  const { valores } = logrosStore();

  const caloriasTotal = valores.caloriasConsumidasTotal || 0;

  if (!open) {
    return (
      <TouchableOpacity style={styles.containerClosed} onPress={() => setOpen(!open)}>
        <Text style={styles.titulo}>Calorías consumidas</Text>
        <Feather name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.containerOpen} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.titulo}>Calorías consumidas</Text>
          <Feather name="chevron-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Logro objetivo={20000} actual={caloriasTotal} titulo="Consume 20K calorias" />
      <Logro objetivo={75000} actual={caloriasTotal} titulo="Consume 75K calorias" />
      <Logro objetivo={200000} actual={caloriasTotal} titulo="Consume 200K calorias" />
    </View>
  );
};

export default CaloriasTotal;

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
