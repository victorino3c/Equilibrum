import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
import React, { useState } from 'react';

//TEMP
import { findEjercicioById } from '~/assets/ejercicio/entrenamientos';

import { MaterialIcons, Feather } from '@expo/vector-icons';

import CuerpoResumenEjercicioCardio from '../CuerpoResumenEjercicioCardio';
import CuerpoResumenEjercicioFuerza from '../CuerpoResumenEjercicioFuerza';
import CuerpoResumenEjercicioCalistenia from '../CuerpoResumenEjercicioCalistenia';

import { entrenamientoStore } from '~/src/store/Entrenamientostore';
import { rutinaStore } from '~/src/store/RutinaStore';

type TarjetaEjercicioProps = {
  idEjercicio: number;
  rutina?: string;
  editable?: boolean;
  showCheck?: boolean;
};

const TarjetaEjercicio = ({
  idEjercicio,
  rutina,
  editable = true,
  showCheck = true,
}: TarjetaEjercicioProps) => {
  const { addSerieEjercicio, getSeriesByEjericio, removeEjercicio } = entrenamientoStore(); // Suponiendo que tienes una función eliminarEjercicio
  const { addSerieEjercicioRutina, removeEjercicioFromRutina } = rutinaStore();

  const [showDeleteOption, setShowDeleteOption] = useState(false); // Estado para mostrar la opción de eliminar

  const Ejercicio = findEjercicioById(idEjercicio);

  if (!Ejercicio) {
    console.error(`Ejercicio with id ${idEjercicio} not found`);
    return null;
  }

  const handleAddSerie = () => {
    let series = getSeriesByEjericio(Ejercicio.id);

    let newSerie = {
      id: Math.round(Math.random() * 10000),
      idEntrenamiento: 1,
      idEjercicio: Ejercicio.id,
      check: false,
    };

    if (series) {
      newSerie = {
        ...series[0],
        id: Math.round(Math.random() * 10000),
        idEntrenamiento: 1,
        idEjercicio: Ejercicio.id,
        check: false,
      };
    }

    addSerieEjercicio(newSerie, Ejercicio.id);
  };

  const handleAddRutinaSerie = () => {
    if (typeof rutina === 'undefined') {
      console.error('Rutina not found');
      return;
    }

    let newSerie = {
      id: Math.round(Math.random() * 10000),
      idEjercicio: Ejercicio.id,
      check: false,
    };

    addSerieEjercicioRutina(rutina, Ejercicio.id, newSerie);
  };

  const handleDelete = () => {
    removeEjercicio(idEjercicio); // Llama a la función de eliminación
    setShowDeleteOption(false); // Oculta la opción de eliminar después de hacer click
  };

  const handleDeleteRutina = () => {
    if (typeof rutina === 'undefined') {
      console.error('Rutina not found');
      return;
    }

    removeEjercicioFromRutina(rutina, idEjercicio); // Llama a la función de eliminación
    setShowDeleteOption(false); // Oculta la opción de eliminar después de hacer click
  };

  return (
    <View style={styles.container}>
      {showDeleteOption && editable && (
        <TouchableOpacity
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onPress={() => setShowDeleteOption(false)}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={typeof rutina !== 'undefined' ? handleDeleteRutina : handleDelete}>
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      <Pressable
        style={[styles.cardContent, showDeleteOption && { opacity: 0.1 }]}
        onLongPress={() => {
          if (editable) {
            setShowDeleteOption(!showDeleteOption);
          }
        }} // Muestra la opción de eliminar al mantener presionado
        delayLongPress={500} // Espera 0,5 segundo
      >
        <View style={styles.cabecera}>
          <View style={styles.row}>
            <View style={styles.foto}></View>
            <Text style={styles.nombre} numberOfLines={2}>
              {Ejercicio.Nombre}
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="access-alarm" size={30} color="#6608ff" />
            <Text style={styles.nombre} numberOfLines={1}>
              {Ejercicio.Descanso}''
            </Text>
          </View>
        </View>

        <View>
          {Ejercicio.tipo === 'Cardio' ? (
            <CuerpoResumenEjercicioCardio
              actual={true}
              editar={editable}
              idEjercicio={idEjercicio}
              idRutina={typeof rutina === 'undefined' ? undefined : rutina}
              showCheck={showCheck}
            />
          ) : null}
          {Ejercicio?.tipo === 'Fuerza' ? (
            <CuerpoResumenEjercicioFuerza
              actual={true}
              editar={editable}
              idEjercicio={idEjercicio}
              idRutina={typeof rutina === 'undefined' ? undefined : rutina}
              showCheck={showCheck}
            />
          ) : null}
          {Ejercicio?.tipo === 'Calistenia' ? (
            <CuerpoResumenEjercicioCalistenia
              actual={true}
              editar={editable}
              idEjercicio={idEjercicio}
              idRutina={typeof rutina === 'undefined' ? undefined : rutina}
              showCheck={showCheck}
            />
          ) : null}
        </View>

        {editable && (
          <TouchableOpacity
            style={styles.footer}
            onPress={typeof rutina === 'undefined' ? handleAddSerie : handleAddRutinaSerie}>
            <Feather name="plus-circle" size={45} color="#6608ff" />
            <Text style={styles.footerText}>Añadir Serie</Text>
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  );
};

export default TarjetaEjercicio;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
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
  cardContent: {
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    zIndex: 1,
    width: 150, // Set a specific width
    height: 50, // Set a specific height
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -25 }], // Center the button
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    elevation: 10,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 24,
    padding: 5,
    fontWeight: 'bold',
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
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
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 20,
    color: '#6608ff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
