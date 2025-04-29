import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';

const iconSize = 40;

const iconInstagram = <Feather name="instagram" size={iconSize} color="black" />;
const iconFacebook = <Feather name="facebook" size={iconSize} color="black" />;
const iconYoutube = <Feather name="youtube" size={iconSize} color="black" />;
const iconTwitter = <Feather name="x" size={iconSize} color="black" />;

const Redes = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>{iconInstagram}</TouchableOpacity>
      <TouchableOpacity>{iconFacebook}</TouchableOpacity>
      <TouchableOpacity>{iconYoutube}</TouchableOpacity>
      <TouchableOpacity>{iconTwitter}</TouchableOpacity>
    </View>
  );
};

export default Redes;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: 30,
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
});
