import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';

import { appStore } from '@store/AppStore';

const iconFire = <Ionicons name="flame-outline" size={26} color="#FF6F15" />;
const iconSueño = <Feather name="moon" size={26} color="#6608ff" />;
const iconAgua = <Ionicons name="water-outline" size={26} color="#00BFFF" />;

const Objetivos = () => {
  const { objetivoAgua, objetivoSueño, objetivosNutricion } = appStore();

  return (
    <View style={styles.container}>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          {iconFire}
          <Text style={styles.text}>Objetivo calorias</Text>
        </View>
        <Text style={styles.objetivosText}>{objetivosNutricion.objetivoCalorias} Kcal</Text>
      </View>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          {iconSueño}
          <Text style={styles.text}>Objetivo sueño</Text>
        </View>
        <Text style={styles.objetivosText}>{objetivoSueño} Horas</Text>
      </View>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          {iconAgua}
          <Text style={styles.text}>Objetivo agua</Text>
        </View>
        <Text style={styles.objetivosText}>{objetivoAgua} L</Text>
      </View>
    </View>
  );
};

export default Objetivos;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 10,
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
  objetivosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
    marginLeft: 10,
  },
  objetivosText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6608ff',
    marginLeft: 10,
    textAlign: 'right',
  },
});
