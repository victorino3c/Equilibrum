import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import ResumenEstadisticasNutricion from '@components/Nutricion/ResumenEstadisticas';

// Make nutricion fake data
const nutricion_data = [
  {
    tipo_nutricion: 'Desayuno',
    calorias: 500,
    proteina: 30,
    carbohidratos: 50,
    grasa: 20,
  },
  {
    tipo_nutricion: 'Comida',
    calorias: 700,
    proteina: 40,
    carbohidratos: 80,
    grasa: 30,
  },
  {
    tipo_nutricion: 'Cena',
    calorias: 600,
    proteina: 35,
    carbohidratos: 70,
    grasa: 25,
  },
];

const objetivosNutricion = {
  objetivoCalorias: 2200,
  objetivoProteinas: 100,
  objetivoCarbohidratos: 100,
  objetivoGrasas: 100,
};

const NutricionOnboarding = () => {
  // Sum all macros for the selected date
  const nutricionResume = nutricion_data.reduce(
    (acc, curr) => {
      acc.calorias += curr.calorias || 0;
      acc.proteina += curr.proteina || 0;
      acc.carbohidratos += curr.carbohidratos || 0;
      acc.grasa += curr.grasa || 0;
      return acc;
    },
    {
      calorias: 0,
      proteina: 0,
      carbohidratos: 0,
      grasa: 0,
    }
  );

  const nutricionData = {
    macros: {
      Calorias: nutricionResume.calorias || 0,
      Proteinas: nutricionResume.proteina || 0,
      Carbohidratos: nutricionResume.carbohidratos || 0,
      Grasas: nutricionResume.grasa || 0,
    },
    ...objetivosNutricion,
  };

  // Make sure the data is sorted by tipo_nutricion
  nutricion_data.sort((a, b) => {
    const order = ['Desayuno', 'Comida', 'Cena', 'Snacks'];
    return order.indexOf(a.tipo_nutricion) - order.indexOf(b.tipo_nutricion);
  });

  return (
    <View style={styles.container}>
      <ResumenEstadisticasNutricion Nutricion={nutricionData} card={false} />
      {nutricion_data[0] && nutricion_data[0].tipo_nutricion === 'Desayuno' && (
        <View style={styles.periodView}>
          <View style={styles.tituloView}>
            <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
              <Text style={styles.titulo}>Desayuno • {nutricion_data[0].calorias} kcal</Text>
              <Ionicons name="flame-outline" size={24} color="#FF6F15" />
            </View>
            {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
          </View>
          <View style={styles.tituloView}>
            <Text style={styles.text}>
              {nutricion_data[0].proteina} P | {nutricion_data[0].carbohidratos} C |{' '}
              {nutricion_data[0].grasa} G
            </Text>
          </View>
        </View>
      )}
      {nutricion_data[1] && nutricion_data[1].tipo_nutricion === 'Comida' && (
        <View style={styles.periodView}>
          <View style={styles.tituloView}>
            <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
              <Text style={styles.titulo}>Comida • {nutricion_data[1].calorias} kcal</Text>
              <Ionicons name="flame-outline" size={24} color="#FF6F15" />
            </View>
            {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
          </View>
          <View style={styles.tituloView}>
            <Text style={styles.text}>
              {nutricion_data[1].proteina} P | {nutricion_data[1].carbohidratos} C |{' '}
              {nutricion_data[1].grasa} G
            </Text>
          </View>
        </View>
      )}
      {nutricion_data[2] && nutricion_data[2].tipo_nutricion === 'Cena' && (
        <View style={styles.periodView}>
          <View style={styles.tituloView}>
            <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
              <Text style={styles.titulo}>Cena • {nutricion_data[2].calorias} kcal</Text>
              <Ionicons name="flame-outline" size={24} color="#FF6F15" />
            </View>
            {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
          </View>
          <View style={styles.tituloView}>
            <Text style={styles.text}>
              {nutricion_data[2].proteina} P | {nutricion_data[2].carbohidratos} C |{' '}
              {nutricion_data[2].grasa} G
            </Text>
          </View>
        </View>
      )}
      {nutricion_data[3] && nutricion_data[3].tipo_nutricion === 'Snacks' && (
        <View style={styles.periodView}>
          <View style={styles.tituloView}>
            <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
              <Text style={styles.titulo}>Snacks • {nutricion_data[3].calorias} kcal</Text>
              <Ionicons name="flame-outline" size={24} color="#FF6F15" />
            </View>
            {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
          </View>
          <View style={styles.tituloView}>
            <Text style={styles.text}>
              {nutricion_data[3].proteina} P | {nutricion_data[3].carbohidratos} C |{' '}
              {nutricion_data[3].grasa} G
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default NutricionOnboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 370,
    width: 370,
    padding: 20,
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  izq: {
    flexDirection: 'row',
    maxWidth: '65%',
  },
  tituloView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodView: {
    marginTop: 20,
  },
  separator: {
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'medium',
  },
  text: {
    fontSize: 16,
  },
  textInfo: {
    fontSize: 20,
    fontWeight: 'medium',
  },
});
