import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CabeceraDetallesEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/CabeceraDetallesEntrenamiento';

const DetallesEntrenamiento = () => {
  return (
    <>
      <Stack.Screen
        name="Ejercicio/DetallesEntrenamiento"
        options={{
          headerShown: true,
          title: 'Detalles Entrenamiento',
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <View>
                <FontAwesome6 name="edit" size={24} color="black" />
              </View>
            );
          },
        }}
      />
      <StatusBar style="auto" backgroundColor="white" />
      <View style={styles.container}>
        <CabeceraDetallesEntrenamiento />
      </View>
    </>
  );
};

export default DetallesEntrenamiento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
