import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = () => {
  return (
    <View style={styles.inputView}>
      <TextInput style={styles.text}>Buscar ejercicio</TextInput>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.14,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
});
