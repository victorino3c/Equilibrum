// Import necessary components and libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

import { getEjerciciosFromIds } from '@api/ejercicios';
import { getSeriesByEntrenamiento, getSeriesByEjercicioAndEntrenamiento } from '@api/series';

import Skeleton from '@components/Utils/SkeletonView';

type ResumenHistoriaEntrenamientoProps = {
  idsEjercicios: string[];
  idEntrenamiento?: string;
};

// Define the component for the visual summary
const ResumenHistoriaEntrenamiento = ({
  idsEjercicios,
  idEntrenamiento,
}: ResumenHistoriaEntrenamientoProps) => {
  // Get the exercises for the training
  const { data: ejercicios, isLoading, error } = getEjerciciosFromIds(idsEjercicios);
  const {
    data: series,
    isLoading: isLoadingSeries,
    error: errorSeries,
  } = getSeriesByEntrenamiento(idEntrenamiento ?? '');

  if (isLoading || !ejercicios) {
    return <Skeleton height={160} />;
  }

  if (error) {
    return <Text>Error al cargar los ejercicios</Text>;
  }

  if (ejercicios.length === 0) {
    return null;
  }

  // TODO: De momento, solo mira datos de supabase. Quiero añadir datos del entrenamiento actual o directo desde API siempre?

  // Create the data for the timeline
  const data = ejercicios.map((ejercicio) => {
    const series_ejercicio = series?.filter((serie) => serie.id_ejercicio === ejercicio.id);

    return {
      title: ejercicio.nombre,
      description: `${series_ejercicio?.reduce((acc, serie) => acc + (serie.calorias ?? 0), 0)} kcal • ${series_ejercicio?.length} series ${ejercicio.tipo_ejercicio === 'fuerza' ? '• ' + series_ejercicio?.reduce((acc, serie) => acc + (serie.calorias ?? 0), 0) + ' kg' : ''}`,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Resumen entrenamiento</Text>
      <Timeline
        data={data}
        circleSize={15}
        circleColor="#6608ff"
        //circleStyle={{top: 15}}
        lineColor="#6608ff"
        timeContainerStyle={{ minWidth: 0 }}
        descriptionStyle={{ color: 'gray' }}
        titleStyle={{ color: '#6608ff', fontWeight: 'bold' }}
        renderDetail={(rowData) => (
          <View style={styles.detailContainer}>
            <Text style={styles.exerciseName}>{rowData.title}</Text>
            <Text style={styles.exerciseDetails}>{rowData.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    flex: 1,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailContainer: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6608ff',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#000',
  },
});

export default ResumenHistoriaEntrenamiento;
