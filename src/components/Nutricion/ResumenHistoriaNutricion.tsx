// Import necessary components and libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

//TEMP
import { findPeriodosByNutricion } from '~/assets/nutricion/nutricion';
import Nutricion from '../Health/Nutricion/Nutricion';

type ResumenHistoriaNutricionProps = {
  idNutricion: number;
};

// Define the component for the visual summary
const ResumenHistoriaNutricion = ({ idNutricion }: ResumenHistoriaNutricionProps) => {
  // Get the exercises for the training
  const nutricion = findPeriodosByNutricion(idNutricion) || [];

  if (Nutricion.length === 0) {
    return null;
  }

  // Create the data for the timeline
  const data = nutricion.map((periodo) => ({
    title: periodo.periodo,
    description: `${periodo.calorias} kcal | ${periodo.proteinas} g  | ${periodo.carbohidratos} g | ${periodo.grasas} g`,
  }));

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

export default ResumenHistoriaNutricion;
