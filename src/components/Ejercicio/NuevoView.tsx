import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';

//TEMP
import { getRutinasByUser } from '~/assets/ejercicio/entrenamientos';

const NuevoView = () => {
  const rutinas = getRutinasByUser('victorino_3c');

  return (
    <View>
      <Text style={styles.fecha}>Inicio rápido</Text>
      <TouchableOpacity style={styles.empezarEntrenamiento}>
        <Feather name="plus-circle" size={45} color="#6608ff" />
        <Text style={styles.buttonText}>Empezar entrenamiento</Text>
      </TouchableOpacity>
      <Text style={styles.fecha}>Rutinas</Text>
      <FlatList
        scrollEnabled={false}
        data={rutinas}
        keyExtractor={(item) => item.Nombre}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.container}>
            <Text style={[styles.buttonText, { color: 'black' }]}>{item.Nombre}</Text>
            <View style={styles.separator} />
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity>
                <Text style={styles.empezarButton}>Empezar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NuevoView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
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
  fecha: {
    fontSize: 20,
    fontWeight: '500',
    padding: 10,
  },
  empezarEntrenamiento: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 15,
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
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6608ff',
  },
  separator: {
    height: 2,
    backgroundColor: '#dddddd',
  },
  empezarButton: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#6608ff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
