//SHOW THE NUTRITION SUMMARY STATISTICS
// This component displays the nutrition statistics of a user, including calories, proteins, carbohydrates, and fats.
// It uses a circular progress bar to show the percentage of calories consumed compared to the goal.
// It also displays the progress of proteins, carbohydrates, and fats in a horizontal bar format.
// It has 2 modes: card and plane.

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import { Database } from '~/src/database.types';
import { NutricionInfo } from '~/src/types/types';

type ResumenEstadisticasNutricionProps = {
  Nutricion: {
    macros: NutricionInfo;
    objetivoCalorias: number;
    objetivoProteinas: number;
    objetivoCarbohidratos: number;
    objetivoGrasas: number;
  } | null;
  card: boolean;
};

const ResumenEstadisticasNutricion = ({ Nutricion, card }: ResumenEstadisticasNutricionProps) => {
  if (!Nutricion) {
    return null;
  }

  const percentage = ((Nutricion.macros.Calorias || 0) / Nutricion.objetivoCalorias) * 100;

  return (
    <View style={card ? styles.container : styles.plane}>
      <View style={styles.caloriesView}>
        <AnimatedCircularProgress
          size={150}
          width={10}
          rotation={0}
          fill={percentage}
          lineCap="round"
          tintColor="#6608ff"
          backgroundColor="#e0e0e0"
        />
        <View style={styles.textContainer}>
          <Text style={styles.textCalorias}>{Nutricion.macros.Calorias} /</Text>
          <Text style={styles.textCalorias}>{Nutricion.objetivoCalorias}</Text>
          <Text style={styles.textCalorias}>kcal</Text>
        </View>
      </View>
      <View style={styles.StatsView}>
        <View style={styles.stat}>
          <View style={styles.statTextView}>
            <Text style={styles.text}>Proteinas</Text>
            <Text style={{ fontSize: 14 }}>
              {Nutricion.macros.Proteinas} / {Nutricion.objetivoProteinas} g
            </Text>
          </View>
          <Progress.Bar
            progress={Nutricion.macros.Proteinas / Nutricion.objetivoProteinas}
            width={200}
            color="#6608ff"
            unfilledColor="#e5e5e5"
            borderColor="white"
          />
        </View>
        <View style={styles.stat}>
          <View style={styles.statTextView}>
            <Text style={styles.text}>Carbohidratos</Text>
            <Text style={{ fontSize: 14 }}>
              {Nutricion.macros.Carbohidratos} / {Nutricion.objetivoCarbohidratos} g
            </Text>
          </View>
          <Progress.Bar
            progress={Nutricion.macros.Carbohidratos / Nutricion.objetivoCarbohidratos}
            width={200}
            color="#6608ff"
            unfilledColor="#e5e5e5"
            borderColor="white"
          />
        </View>
        <View style={styles.stat}>
          <View style={styles.statTextView}>
            <Text style={styles.text}>Grasas</Text>
            <Text style={{ fontSize: 14 }}>
              {Nutricion.macros.Grasas} / {Nutricion.objetivoGrasas} g
            </Text>
          </View>
          <Progress.Bar
            progress={Nutricion.macros.Grasas / Nutricion.objetivoGrasas}
            width={200}
            color="#6608ff"
            unfilledColor="#e5e5e5"
            borderColor="white"
          />
        </View>
      </View>
    </View>
  );
};

export default ResumenEstadisticasNutricion;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 15,
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
  plane: {
    flexDirection: 'row',
  },
  caloriesView: {
    width: '40%',
    aspectRatio: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  StatsView: {
    width: '60%',
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  stat: {
    justifyContent: 'space-between',
    gap: 5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  statTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textCalorias: {
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 18,
  },
});
