import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';

import { Link } from 'expo-router';

import { Feather } from '@expo/vector-icons';

//TEMP
import { getRutinasByUser } from '~/assets/ejercicio/entrenamientos';
import IconButton from '../Buttons/IconButton';

const NuevoView = () => {
  const rutinas = getRutinasByUser('victorino_3c');

  const icon = <Feather name="plus-circle" size={45} color="#6608ff" />;

  return (
    <View>
      <Text style={styles.fecha}>Inicio rápido</Text>
      <IconButton icon={icon} text="Empezar entrenamiento" onPress={() => {}} />
      <Text style={styles.fecha}>Rutinas</Text>
      <FlatList
        scrollEnabled={false}
        data={rutinas}
        keyExtractor={(item) => item.Nombre}
        renderItem={({ item }) => (
          <Link
            href={`/Ejercicio/DetallesRutina?rutina=${item.Nombre}&usuario=${item.idUsuario}`}
            asChild>
            <TouchableOpacity style={styles.container}>
              <Text style={styles.rutinaText}>{item.Nombre}</Text>
              <View style={styles.separator} />
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity>
                  <Text style={styles.empezarButton}>Empezar</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Link>
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
  rutinaText: {
    fontSize: 20,
    fontWeight: '700',
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
