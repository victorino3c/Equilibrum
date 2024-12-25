import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useState } from 'react';

import Feather from '@expo/vector-icons/Feather';

const Sueño = () => {
  const [sueño, setsueño] = useState('-');

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Feather name="moon" size={24} color="#6608ff" />
        <Text className="px-2 text-xl font-bold">Horas de sueño</Text>
        <Feather name="info" size={16} color="grey" />
      </View>
      <View style={styles.inner}>
        <View style={styles.input}>
          <TextInput
            onPress={() => (sueño === '-' ? setsueño('') : null)}
            onChangeText={(text) => setsueño(text)}
            value={sueño}
            className="font-regular text-center text-xl"
          />
        </View>
        <Text className="text-lg">/ 8 horas</Text>
      </View>
    </View>
  );
};

export default Sueño;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginHorizontal: 5,
    width: 40,
  },
});
