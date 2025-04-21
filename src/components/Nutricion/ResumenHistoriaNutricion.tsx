// Import necessary components and libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

type ResumenHistoriaNutricionProps = {
  nutricion: any;
};

const periodos = ['Desayuno', 'Comida', 'Cena', 'Snacks'];

// Define the component for the visual summary
const ResumenHistoriaNutricion = ({ nutricion }: ResumenHistoriaNutricionProps) => {
  // Create the data for the timeline
  const data = periodos.map((periodo) => ({
    title: periodo,
    description: `${
      nutricion[periodo]?.reduce(
        (acc: any, curr: { calorias: any }) => acc + (curr.calorias || 0),
        0
      ) || 0
    } kcal | ${nutricion[periodo]?.reduce((acc: any, curr: { proteina: any }) => acc + (curr.proteina || 0), 0) || 0} P  | ${nutricion[periodo]?.reduce((acc: any, curr: { carbohidratos: any }) => acc + (curr.carbohidratos || 0), 0) || 0} C | ${nutricion[periodo]?.reduce((acc: any, curr: { grasa: any }) => acc + (curr.grasa || 0), 0) || 0}G`,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Resumen nutrición</Text>
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
