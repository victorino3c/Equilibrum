import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import ResumenEstadisticasNutricion from '../../Nutricion/ResumenEstadisticas';
import appStore from '@store/AppStore';
import { Database } from '~/src/database.types';
import { Link } from 'expo-router';

type NutricionProps = {
  Nutricion: Database['public']['Tables']['nutricion']['Row'][] | undefined;
  Fecha: moment.Moment;
};

const Nutricion = ({ Nutricion, Fecha }: NutricionProps) => {
  const { objetivosNutricion } = appStore.getState();

  if (Nutricion === undefined || !Nutricion || Fecha.isSame()) {
    return (
      <View style={styles.container}>
        <Text style={[styles.titulo, { textAlign: 'center', paddingVertical: 30 }]}>
          No hay datos
        </Text>
      </View>
    );
  }

  // Sum all macros for the selected date
  const nutricionResume = Nutricion.reduce(
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
  Nutricion.sort((a, b) => {
    const order = ['Desayuno', 'Comida', 'Cena', 'Snacks'];
    return order.indexOf(a.tipo_nutricion) - order.indexOf(b.tipo_nutricion);
  });

  return (
    <Link href={`/Nutricion/DetallesNutricion?fecha=${Fecha.format('YYYY-MM-DD')}`} asChild>
      <TouchableOpacity style={styles.container}>
        <ResumenEstadisticasNutricion Nutricion={nutricionData} card={false} />
        {Nutricion[0] && Nutricion[0].tipo_nutricion === 'Desayuno' && (
          <View style={styles.periodView}>
            <View style={styles.tituloView}>
              <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
                <Text style={styles.titulo}>Desayuno • {Nutricion[0].calorias} kcal</Text>
                <Ionicons name="flame-outline" size={24} color="#FF6F15" />
              </View>
              {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
            </View>
            <View style={styles.tituloView}>
              <Text style={styles.text}>
                {Nutricion[0].proteina} P | {Nutricion[0].carbohidratos} C | {Nutricion[0].grasa} G
              </Text>
            </View>
          </View>
        )}
        {Nutricion[1] && Nutricion[1].tipo_nutricion === 'Comida' && (
          <View style={styles.periodView}>
            <View style={styles.tituloView}>
              <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
                <Text style={styles.titulo}>Comida • {Nutricion[1].calorias} kcal</Text>
                <Ionicons name="flame-outline" size={24} color="#FF6F15" />
              </View>
              {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
            </View>
            <View style={styles.tituloView}>
              <Text style={styles.text}>
                {Nutricion[1].proteina} P | {Nutricion[1].carbohidratos} C | {Nutricion[1].grasa} G
              </Text>
            </View>
          </View>
        )}
        {Nutricion[2] && Nutricion[2].tipo_nutricion === 'Cena' && (
          <View style={styles.periodView}>
            <View style={styles.tituloView}>
              <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
                <Text style={styles.titulo}>Cena • {Nutricion[2].calorias} kcal</Text>
                <Ionicons name="flame-outline" size={24} color="#FF6F15" />
              </View>
              {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
            </View>
            <View style={styles.tituloView}>
              <Text style={styles.text}>
                {Nutricion[2].proteina} P | {Nutricion[2].carbohidratos} C | {Nutricion[2].grasa} G
              </Text>
            </View>
          </View>
        )}
        {Nutricion[3] && Nutricion[3].tipo_nutricion === 'Snacks' && (
          <View style={styles.periodView}>
            <View style={styles.tituloView}>
              <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
                <Text style={styles.titulo}>Snacks • {Nutricion[3].calorias} kcal</Text>
                <Ionicons name="flame-outline" size={24} color="#FF6F15" />
              </View>
              {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
            </View>
            <View style={styles.tituloView}>
              <Text style={styles.text}>
                {Nutricion[3].proteina} P | {Nutricion[3].carbohidratos} C | {Nutricion[3].grasa} G
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default Nutricion;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 15,
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
