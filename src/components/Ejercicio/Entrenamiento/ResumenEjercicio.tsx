import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { findEjercicioById } from '~/assets/ejercicio/entrenamientos';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CuerpoResumenEjercicioCardio from './CuerpoResumenEjercicioCardio';
import CuerpoResumenEjercicioFuerza from './CuerpoResumenEjercicioFuerza';
import CuerpoResumenEjercicioCalistenia from './CuerpoResumenEjercicioCalistenia';

type ResumenEjercicioProps = {
  idEjercicio: number;
  idEntrenamiento: number;
  editar?: boolean;
};

const ResumenEjercicio = ({ idEjercicio, idEntrenamiento, editar }: ResumenEjercicioProps) => {
  const Ejercicio = findEjercicioById(idEjercicio);

  return (
    <View style={styles.container}>
      <View style={styles.cabecera}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', width: '60%' }}>
          <View style={styles.foto}></View>
          <Text style={styles.nombre} numberOfLines={2}>
            {Ejercicio?.Nombre}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <MaterialIcons name="access-alarm" size={30} color="#6608ff" />
          <Text style={styles.nombre} numberOfLines={1}>
            {Ejercicio?.Descanso}''
          </Text>
        </View>
      </View>
      <View>
        {Ejercicio?.tipo === 'Cardio' ? (
          <CuerpoResumenEjercicioCardio
            idEjercicio={idEjercicio}
            idEntrenamiento={idEntrenamiento}
          />
        ) : null}
        {Ejercicio?.tipo === 'Fuerza' ? (
          <CuerpoResumenEjercicioFuerza
            idEjercicio={idEjercicio}
            idEntrenamiento={idEntrenamiento}
          />
        ) : null}
        {Ejercicio?.tipo === 'Calistenia' ? (
          <CuerpoResumenEjercicioCalistenia
            idEjercicio={idEjercicio}
            idEntrenamiento={idEntrenamiento}
          />
        ) : null}
      </View>
      {editar && (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
          <MaterialIcons name="edit" size={30} color="#6608ff" />
        </View>
      )}
    </View>
  );
};

export default ResumenEjercicio;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
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
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6608ff',
  },
  foto: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
    height: 40,
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
  },
});
