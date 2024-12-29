import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { EntrenamientosType, findEntrenamientoByDate } from '~/assets/ejercicio/entrenamientos';

const sensaciones: Record<number, [string, string, string]> = {
  1: ['Muy negativo', '😫', '#ff0000'],
  2: ['Negativo', '😪', '#990000'],
  3: ['Neutro', '😐', '#222222'],
  4: ['Positivo', '😄', '#009900'],
  5: ['Muy positivo', '😁', '#00ee00'],
};

type SensacionesEntrenamientoProps = {
  fecha: string;
};

const SensacionesEntrenamiento = ({ fecha }: SensacionesEntrenamientoProps) => {
  const actual: EntrenamientosType | null = findEntrenamientoByDate(fecha);

  if (!actual || !actual.Sensacion) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Sensaciones Entrenamiento</Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>{sensaciones[actual.Sensacion][1]}</Text>
        <Text style={[styles.infoText, { color: sensaciones[actual.Sensacion][2] }]}>
          {sensaciones[actual.Sensacion][0]}
        </Text>
      </View>
    </View>
  );
};

export default SensacionesEntrenamiento;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  info: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 40,
    fontWeight: 'regular',
  },
});
