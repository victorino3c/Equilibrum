import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';

type ResumenEstadisticasNutricionProps = {
  Nutricion: any;
  card: boolean;
};

const ResumenEstadisticasNutricion = ({ Nutricion, card }: ResumenEstadisticasNutricionProps) => {
  const percentage = (Nutricion.Calorias / Nutricion.ObjetivoCalorias) * 100;

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
          <Text style={styles.textCalorias}>{Nutricion.Calorias} /</Text>
          <Text style={styles.textCalorias}>{Nutricion.ObjetivoCalorias}</Text>
          <Text style={styles.textCalorias}>kcal</Text>
        </View>
      </View>
      <View style={styles.StatsView}>
        <View style={styles.stat}>
          <View style={styles.statTextView}>
            <Text style={styles.text}>Proteinas</Text>
            <Text style={{ fontSize: 14 }}>
              {Nutricion.Proteinas} / {Nutricion.ObjetivoProteinas} g
            </Text>
          </View>
          <Progress.Bar
            progress={Nutricion.Proteinas / Nutricion.ObjetivoProteinas}
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
              {Nutricion.Carbohidratos} / {Nutricion.ObjetivoCarbohidratos} g
            </Text>
          </View>
          <Progress.Bar
            progress={Nutricion.Carbohidratos / Nutricion.ObjetivoCarbohidratos}
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
              {Nutricion.Grasas} / {Nutricion.ObjetivoGrasas} g
            </Text>
          </View>
          <Progress.Bar
            progress={Nutricion.Grasas / Nutricion.ObjetivoGrasas}
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
