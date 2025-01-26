import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

import { entrenamientoStore } from '@store/Entrenamientostore';

import CustomInput from '@components/Utils/CustomInput';
import SensacionesEntrenamiento from '@components/Ejercicio/Entrenamiento/SensacionesEntrenamiento';

import { Entypo } from '@expo/vector-icons';
import { Database } from '~/src/database.types';

const FinEntrenamiento = () => {
  const {
    resetEntrenamiento,
    titulo: tituloStore,
    notas: notasStore,
    sensacion: sensacionStore,
    setTitulo: setTituloStore,
    setNotas: setNotasStore,
    setSensacion: setSensacionStore,
  } = entrenamientoStore();

  const [titulo, setTitulo] = useState(tituloStore);
  const [notas, setNotas] = useState(notasStore);
  const [sensaciones, setSensaciones] =
    useState<Database['public']['Enums']['sensaciones_enum']>(sensacionStore);

  useEffect(() => {
    setTituloStore(titulo);
    setNotasStore(notas);
    setSensacionStore(sensaciones);
  }, [titulo, notas, sensaciones]);

  const handleDescartar = () => {
    Alert.alert(
      'Descartar entrenamiento',
      '¿Estás seguro de que quieres descartar el entrenamiento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Descartar',
          onPress: () => {
            resetEntrenamiento();
            router.navigate('/(protected)/(tabs)/(exercise)');
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
      {/*ELEMENTOS*/}
      <CustomInput
        placeholder="Titulo del entrenamiento"
        style={{ marginTop: 20, marginHorizontal: 10 }}
        textStyle={{ fontSize: 20, fontWeight: 'bold' }}
        texto={titulo}
        setTexto={setTitulo}
      />
      <CustomInput
        placeholder="Notas del entrenamiento"
        style={{ marginVertical: 20, marginHorizontal: 10, height: 120 }}
        //textStyle={{ flex: 1 }}
        multiline={true}
        nol={4}
        texto={notas}
        setTexto={setNotas}
      />
      <SensacionesEntrenamiento value={sensaciones} setValue={setSensaciones} editable={true} />
      <TouchableOpacity style={styles.buttonDescartar} onPress={handleDescartar}>
        <Entypo name="circle-with-cross" size={26} color="#E34716" />
        <Text style={styles.descartarTexto}>Descartar entrenamiento</Text>
      </TouchableOpacity>
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
  buttonDescartar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    gap: 10,
  },
  descartarTexto: {
    color: '#E34716',
    fontWeight: '700',
    fontSize: 18,
  },
});
