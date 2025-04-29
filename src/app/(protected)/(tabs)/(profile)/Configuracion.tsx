import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import Cuenta from '@components/Profile/Configuracion/Cuenta';
import Preferencias from '@components/Profile/Configuracion/Preferencias';
import Ayuda from '@components/Profile/Configuracion/Ayuda';
import Redes from '@components/Profile/Configuracion/Redes';

import entrenamientoStore from '@store/Entrenamientostore';

const Configuracion = () => {
  const { entrenamientoTerminado } = entrenamientoStore();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        entrenamientoTerminado ? { paddingBottom: 100 } : { paddingBottom: 200 }
      }
      showsVerticalScrollIndicator={false}>
      <Text style={styles.titulo}>Cuenta</Text>
      <Cuenta />
      <Text style={styles.titulo}>Preferencias</Text>
      <Preferencias />
      <Text style={styles.titulo}>Ayuda</Text>
      <Ayuda />
      <Text style={styles.titulo}>Síguenos en redes</Text>
      <Redes />
    </ScrollView>
  );
};

export default Configuracion;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  titulo: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
