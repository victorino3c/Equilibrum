import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const AddImagen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Añadir imagen</Text>
      <TouchableOpacity style={styles.imagen}>
        <Feather name="plus-circle" size={50} color={'#6608ff'} />
      </TouchableOpacity>
    </View>
  );
};

export default AddImagen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imagen: {
    height: 130,
    marginTop: 20,
    aspectRatio: 1,
    borderColor: '#6608ff',
    borderRadius: 20,
    borderStyle: 'dashed',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
