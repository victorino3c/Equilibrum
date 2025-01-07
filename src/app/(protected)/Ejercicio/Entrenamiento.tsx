import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, Link } from 'expo-router';
import CabeceraEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/EnCurso/CabeceraEntrenamiento';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '~/src/store/store';
import { useEffect, useState } from 'react';
import FooterEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/EnCurso/FooterEntrenamiento';

const Entrenamiento = () => {
  const insets = useSafeAreaInsets();

  const { startTimer, stopTimer } = useStore();

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
      <Stack.Screen
        name="Ejercicio/Entrenamiento"
        options={{
          headerShown: true,
          header: () => (
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
              <View style={styles.headerTop}>
                <Link href="/(protected)/(tabs)/(exercise)" asChild>
                  <TouchableOpacity>
                    <Feather name="chevron-down" size={24} color="black" />
                  </TouchableOpacity>
                </Link>
                <Text style={styles.headerTitle}>Entrenamiento</Text>
                <Link href="/(protected)/(tabs)/(exercise)" asChild>
                  <TouchableOpacity onPress={() => stopTimer()}>
                    <Text style={styles.botonGuardar}>Terminar</Text>
                  </TouchableOpacity>
                </Link>
              </View>
              <CabeceraEntrenamiento />
            </View>
          ),
        }}
      />

      {/*ELEMENTOS*/}

      <FooterEntrenamiento />
    </View>
  );
};

export default Entrenamiento;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  },
});
