import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

type EjercicioProps = {
  Entrenamiento: any;
};

const Ejercicio = ({ Entrenamiento }: EjercicioProps) => {
  if (Entrenamiento === null) {
    return (
      <View style={styles.container}>
        <Text style={[styles.titulo, { textAlign: 'center', paddingVertical: 30 }]}>
          No hay entrenamientos
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tituloView}>
        <View style={[styles.izq, Entrenamiento.Imagen && { flex: 1 }]}>
          <Text style={styles.titulo}>
            {Entrenamiento.Nombre} • {Entrenamiento.Calorias} kcal
          </Text>
          <Ionicons name="flame-outline" size={24} color="#FF6F15" />
        </View>
        {Entrenamiento.Imagen && <Feather name="image" size={24} color="black" />}
      </View>
      <View style={styles.tituloView}>
        <Text style={styles.text}>
          #{Entrenamiento.Numero}
          {Entrenamiento}
        </Text>
      </View>
    </View>
  );
};

export default Ejercicio;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 15,
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
  izq: {
    flexDirection: 'row',
  },
  tituloView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});
