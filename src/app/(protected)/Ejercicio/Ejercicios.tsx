import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { useGetEjercicios } from '@api/ejercicios';
import CustomInput from '@components/Utils/CustomInput';
import { Feather } from '@expo/vector-icons';

const Ejercicios = () => {
  const { data: ejercicios, isLoading } = useGetEjercicios();

  return (
    <ScrollView style={{ flex: 1, paddingTop: 20 }}>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Material</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Músculos</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 10, gap: 10, marginBottom: 20 }}>
        <CustomInput placeholder="Buscar ejercicio" style={{ flex: 1 }} />
        <View
          style={{
            backgroundColor: '#6608ff',
            height: 'auto',
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}>
          <Feather name="search" size={24} color="white" />
        </View>
      </View>
      <View
        style={[
          styles.headerButton,
          { marginHorizontal: 10, flex: 0, borderRadius: 15, marginBottom: 20 },
        ]}>
        {isLoading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <Text>Cargando...</Text>
          </View>
        ) : (
          ejercicios?.map((ejercicio, index) => (
            <View key={index} style={{ margin: 10 }}>
              <TouchableOpacity onPress={() => {}}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={styles.image} />
                  <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.tituloEjercicio}>{ejercicio.nombre}</Text>
                    <Text>{ejercicio.musculos?.map((m) => `${m}, `)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Ejercicios;

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
    marginHorizontal: 10,
    marginBottom: 15,
  },

  headerButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerButtonText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
  tituloEjercicio: {
    fontSize: 20,
    fontWeight: '500',
    color: '#6608ff',
  },
  closeButton: {
    marginVertical: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});
