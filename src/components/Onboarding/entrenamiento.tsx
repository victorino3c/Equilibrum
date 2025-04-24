// Import necessary components and libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

// Create the data for the timeline
const data = [
  {
    title: 'Elíptica',
    description: '303 kcal • 1 serie • 9km ',
  },
  {
    title: 'Curls Biceps',
    description: '134 kcal • 4 series • 200kg ',
  },
  {
    title: 'Abdominales banco inclinado',
    description: '196 kcal • 4 series • 25 reps ',
  },
  {
    title: 'Press de banca',
    description: '134 kcal • 4 series • 200kg ',
  },
];

// Define the component for the visual summary
const EntrenamientoOnboarding = () => {
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
    height: 370,
    width: 370,
    padding: 20,
    //marginLeft: 10,
    borderRadius: 15,
    flex: 1,
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default EntrenamientoOnboarding;
