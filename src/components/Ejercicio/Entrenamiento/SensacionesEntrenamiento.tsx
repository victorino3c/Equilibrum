import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { EntrenamientosType, findEntrenamientoByDate } from '~/assets/ejercicio/entrenamientos';
import { Database } from '~/src/database.types';

const sensaciones: Record<string, [string, string]> = {
  'Muy negativo': ['😫', '#ff0000'],
  Negativo: ['😪', '#990000'],
  Neutro: ['😐', '#222222'],
  Positivo: ['😄', '#009900'],
  'Muy positivo': ['😁', '#00ee00'],
};

type SensacionesEntrenamientoProps = {
  entrenamiento: Database['public']['Tables']['entrenamiento']['Row'];
};

const SensacionesEntrenamiento = ({ entrenamiento }: SensacionesEntrenamientoProps) => {
  if (!entrenamiento || !entrenamiento.sensacion) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Sensaciones Entrenamiento</Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>{sensaciones[entrenamiento.sensacion][0]}</Text>
        <Text style={[styles.infoText, { color: sensaciones[entrenamiento.sensacion][1] }]}>
          {entrenamiento.sensacion}
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
