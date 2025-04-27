import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';

interface LogroProps {
  objetivo: number;
  actual: number;
  titulo: string;
}

const Logro = ({ objetivo, actual, titulo }: LogroProps) => {
  const progress = Math.min(actual / objetivo, 1); // Ensure progress doesn't exceed 1 (100%)

  if (progress < 1) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16 }}>{titulo}</Text>
        <View style={styles.progresoView}>
          <Text style={styles.actualText}>{actual}</Text>
          <View style={styles.barraVacia}>
            <View style={[styles.barraLlena, { width: `${progress * 100}%` }]} />
          </View>
        </View>
      </View>
    );
  } else {
    //#FFC107
    return (
      <View style={{ ...styles.container, flexDirection: 'row', gap: 10 }}>
        <Feather name="check-circle" size={50} color="#0f0" />
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 16 }}>{titulo}</Text>
          <Text style={styles.completadoText}>Completado</Text>
        </View>
      </View>
    );
  }
};

export default Logro;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progresoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  actualText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6608ff',
    marginRight: 10,
  },
  barraVacia: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden', // Ensures the filled bar doesn't overflow the container
  },
  barraLlena: {
    height: '100%',
    backgroundColor: '#6608ff',
    borderRadius: 5,
  },
  completadoText: {
    color: '#6608ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
