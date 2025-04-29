import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { appStore } from '@store/AppStore';

const iconFire = <Ionicons name="flame-outline" size={26} color="#FF6F15" />;
const iconSueño = <Feather name="moon" size={26} color="#6608ff" />;
const iconAgua = <Ionicons name="water-outline" size={26} color="#00BFFF" />;
const iconGrams = <MaterialCommunityIcons name="weight-gram" size={26} color="#6608ff" />;

interface ObjetivosProps {
  editar?: boolean;
}

const Objetivos = ({ editar }: ObjetivosProps) => {
  const { objetivoAgua, objetivoSueño, objetivosNutricion, setHasEnteredUserInfo } = appStore();

  const onChange = () => {
    Alert.alert('Cambiar objetivos', '¿Estás seguro de que deseas modificar los objetivos?', [
      { text: 'Si', onPress: () => setHasEnteredUserInfo(false) },
      { text: 'No', style: 'cancel' },
    ]);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          {iconFire}
          <Text style={styles.text}>Objetivo calorias</Text>
        </View>
        <Text style={styles.objetivosText}>{objetivosNutricion.objetivoCalorias} Kcal</Text>
      </View>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          {iconGrams}
          <Text style={styles.text}>Objetivo proteinas</Text>
        </View>
        <Text style={styles.objetivosText}>{objetivosNutricion.objetivoProteinas} g</Text>
      </View>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          {iconGrams}
          <Text style={styles.text}>Objetivo grasas</Text>
        </View>
        <Text style={styles.objetivosText}>{objetivosNutricion.objetivoGrasas} g</Text>
      </View>
      <View style={{ ...styles.objetivosContainer, justifyContent: 'space-between' }}>
        <View style={styles.objetivosContainer}>
          {iconGrams}
          <Text style={styles.text}>Objetivo carbohidratos</Text>
        </View>
        <Text style={styles.objetivosText}>{objetivosNutricion.objetivoCarbohidratos} g</Text>
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
    </TouchableOpacity>
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
