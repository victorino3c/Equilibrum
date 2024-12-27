import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const CabeceraDetallesEntrenamiento = () => {
  return (
    <View>
      <Text>CabeceraDetallesEntrenamiento</Text>
    </View>
  );
};

export default CabeceraDetallesEntrenamiento;

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
});
