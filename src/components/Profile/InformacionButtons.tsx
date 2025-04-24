import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const InformacionButtons = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Medidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logros</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ejercicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Alimentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InformacionButtons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
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
  button: {
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 15,
    flex: 1,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});
