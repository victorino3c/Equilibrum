import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, Link } from 'expo-router';
import CabeceraEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/EnCurso/CabeceraEntrenamiento';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appStore } from '~/src/store/store';
import FooterEntrenamiento from '~/src/components/Ejercicio/Entrenamiento/EnCurso/FooterEntrenamiento';
import TarjetaEjercicio from '~/src/components/Ejercicio/Entrenamiento/EnCurso/TarjetaEjercicio';

import React, { memo } from 'react';

const Entrenamiento = () => {
  const insets = useSafeAreaInsets();

  const { stopTimer, ejercicios } = appStore();

  return (
    <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
      <Stack.Screen
        name="Ejercicio/Entrenamiento"
        options={{
          headerShown: true,
          header: () => (
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
              <View style={styles.headerTop}>
                <View style={styles.headerItems}>
                  <Link href="/(protected)/(tabs)/(exercise)" asChild>
                    <TouchableOpacity>
                      <Feather name="chevron-down" size={24} color="black" />
                    </TouchableOpacity>
                  </Link>
                </View>
                <View style={styles.headerItems}>
                  <Text style={styles.headerTitle}>Entrenamiento</Text>
                </View>
                <View style={styles.headerItems}>
                  <Link href="/(protected)/(tabs)/(exercise)" asChild>
                    <TouchableOpacity onPress={() => stopTimer()}>
                      <Text style={styles.botonGuardar}>Terminar</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
              <CabeceraEntrenamiento />
            </View>
          ),
        }}
      />

      {/*ELEMENTOS*/}
      <FlatList
        keyboardDismissMode="on-drag"
        data={ejercicios}
        renderItem={({ item }) => <TarjetaEjercicio key={item.id} idEjercicio={item.id} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<FooterEntrenamiento />}
      />
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
