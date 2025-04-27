import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface GraficaProps {
  medida: string;
}

const Grafica = ({ medida }: GraficaProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfica {medida}</Text>
    </View>
  );
};

export default Grafica;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 195,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
  },
});
