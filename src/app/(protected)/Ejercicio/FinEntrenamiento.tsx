import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, Link } from 'expo-router';
import CabeceraEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/EnCurso/CabeceraEntrenamiento';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { entrenamientoStore } from '~/src/store/Entrenamientostore';

import React, { memo } from 'react';
import CustomInput from '~/src/components/Utils/CustomInput';

const FinEntrenamiento = () => {
  const insets = useSafeAreaInsets();

  const { stopTimer, ejercicios } = entrenamientoStore();

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
      {/*ELEMENTOS*/}
      <CustomInput
        placeholder="Titulo del entrenamiento"
        style={{ marginTop: 20, marginHorizontal: 10 }}
        textStyle={{ fontSize: 20, fontWeight: 'bold' }}
      />
      <CustomInput
        placeholder="Notas del entrenamiento"
        style={{ marginTop: 20, marginHorizontal: 10, height: 120 }}
        //textStyle={{ flex: 1 }}
        multiline={true}
        nol={4}
      />
    </View>
  );
};

export default FinEntrenamiento;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerItems: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botonGuardar: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    backgroundColor: '#6608ff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 90,
    //textAlign: 'right',
  },
});
