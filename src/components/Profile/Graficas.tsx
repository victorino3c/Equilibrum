import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ejercicio from './Graficas/Ejercicio';
import General from './Graficas/General';
import Nutricion from './Graficas/Nutricion';

interface graficasProps {
  selected: string;
}

const Graficas = ({ selected }: graficasProps) => {
  return (
    <View style={styles.container}>
      {selected === 'Ejercicio' && <Ejercicio />}
      {selected === 'General' && <General />}
      {selected === 'Nutrición' && <Nutricion />}
    </View>
  );
};

export default Graficas;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
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
});
