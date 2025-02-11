import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Link } from 'expo-router';

import { Feather, AntDesign } from '@expo/vector-icons';

import { router } from 'expo-router';

import { RutinaType } from '~/src/types/types';

import { rutinaStore } from '~/src/store/RutinaStore';
import { entrenamientoStore } from '~/src/store/Entrenamientostore';

import IconButton from '../Buttons/IconButton';

const NuevoView = () => {
  const { rutinas, getRutina, getSeriesByEjercicioAndRutina } = rutinaStore();
  const {
    isRunning,
    addEjercicio,
    addSerieEjercicio,
    setFecha,
    setTitulo,
    resetEntrenamiento,
    setEntrenamientoTerminado,
  } = entrenamientoStore();

  //const rutinas = getRutinasByUser('victorino_3c');
  const handleEmpezarEntreno = (idRutina: string) => {
    // Check if there is a Entrenamiento in progress
    if (isRunning) {
      Alert.alert(
        'Entrenamiento en progreso',
        '¿Deseas continuar con el entrenamiento en progreso o reiniciarlo con la rutina?',
        [
          {
            text: 'Continuar entrenamiento',
            onPress: () => {
              router.push('/Ejercicio/Entrenamiento');
            },
          },
          {
            text: 'Reiniciar con rutina',
            onPress: () => {
              resetEntrenamiento();
              prefillEntrenamiento(idRutina);
              setEntrenamientoTerminado(false);
            },
          },
        ]
      );
    } else {
      prefillEntrenamiento(idRutina);
      setEntrenamientoTerminado(false);
    }
  };

  const prefillEntrenamiento = (idRutina: string) => {
    const rutina = getRutina(idRutina);

    if (!rutina) {
      console.error('Rutina not found');
      return;
    }

    setTitulo(rutina.Nombre);
    setFecha(new Date().toISOString());

    rutina.Ejercicios.forEach((element) => {
      addEjercicio(element);
      const series = getSeriesByEjercicioAndRutina(idRutina, element.id);
      series.forEach((serie) => {
        addSerieEjercicio(serie, element.id);
      });
    });

    router.push('/Ejercicio/Entrenamiento');
  };

  const icon = <Feather name="plus-circle" size={45} color="#6608ff" />;

  return (
    <View>
      <Text style={styles.fecha}>Inicio rápido</Text>
      <Link href="/Ejercicio/Entrenamiento" asChild>
        <IconButton
          icon={icon}
          text="Empezar entrenamiento"
          onPress={() => setEntrenamientoTerminado(false)}
        />
      </Link>
      <View style={styles.rutinasView}>
        <Text style={styles.fecha}>Rutinas</Text>
        <Link href="/(protected)/Ejercicio/CrearRutina" asChild>
          <AntDesign name="addfolder" size={24} color="#6608ff" />
        </Link>
      </View>
      {rutinas.length > 0 ? (
        <FlatList
          scrollEnabled={false}
          data={rutinas}
          keyExtractor={(item) => item.Nombre}
          renderItem={({ item }) => (
            <Link href={`/Ejercicio/DetallesRutina?rutina=${item.Nombre}`} asChild>
              <TouchableOpacity style={styles.container}>
                <Text style={styles.rutinaText}>{item.Nombre}</Text>
                <View style={styles.separator} />
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => handleEmpezarEntreno(item.Nombre)}>
                    <Text style={styles.empezarButton}>Empezar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.textoRutinaEmpty}>No hay rutinas</Text>
        </View>
      )}
    </View>
  );
};

export default NuevoView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
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
  fecha: {
    fontSize: 20,
    fontWeight: '500',
    padding: 10,
  },
  rutinaText: {
    fontSize: 20,
    fontWeight: '700',
  },
  separator: {
    height: 2,
    backgroundColor: '#dddddd',
  },
  empezarButton: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#6608ff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  rutinasView: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingRight: 10,
  },
  textoRutinaEmpty: {
    fontSize: 20,
    paddingVertical: 30,
    fontWeight: '500',
    textAlign: 'center',
  },
});
