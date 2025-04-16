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
  Nutricion: Database['public']['Tables']['nutricion']['Row'] | undefined;
  Fecha: moment.Moment;
};

const Nutricion = ({ Nutricion, Fecha }: NutricionProps) => {
  const { objetivosNutricion } = appStore.getState();

  const nutricionData = {
    macros: {
      Calorias: Nutricion?.calorias || 0,
      Proteinas: Nutricion?.proteina || 0,
      Carbohidratos: Nutricion?.carbohidratos || 0,
      Grasas: Nutricion?.grasa || 0,
    },
    ...objetivosNutricion,
  };

  if (Nutricion === undefined) {
    return (
      <View style={styles.container}>
        <Text style={[styles.titulo, { textAlign: 'center', paddingVertical: 30 }]}>
          No hay datos
        </Text>
      </View>
    );
  }

  return (
    <Link href={`/Nutricion/DetallesNutricion?fecha=${Fecha.format('YYYY-MM-DD')}`} asChild>
      <TouchableOpacity style={styles.container}>
        <ResumenEstadisticasNutricion Nutricion={nutricionData} card={false} />
        <View style={styles.periodView}>
          <View style={styles.tituloView}>
            <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
              <Text style={styles.titulo}>Desayuno • {Nutricion.calorias} kcal</Text>
              <Ionicons name="flame-outline" size={24} color="#FF6F15" />
            </View>
            {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
          </View>
          <View style={styles.tituloView}>
            <Text style={styles.text}>
              {Nutricion.proteina} P | {Nutricion.carbohidratos} C | {Nutricion.grasa} G
            </Text>
          </View>
        </View>
        <View style={styles.periodView}>
          <View style={styles.tituloView}>
            <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
              <Text style={styles.titulo}>Comida • {Nutricion.calorias} kcal</Text>
              <Ionicons name="flame-outline" size={24} color="#FF6F15" />
            </View>
            {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
          </View>
          <View style={styles.tituloView}>
            <Text style={styles.text}>
              {Nutricion.proteina} P | {Nutricion.carbohidratos} C | {Nutricion.grasa} G
            </Text>
          </View>
        </View>
        <View style={styles.periodView}>
          <View style={styles.tituloView}>
            <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
              <Text style={styles.titulo}>Cena • {Nutricion.calorias} kcal</Text>
              <Ionicons name="flame-outline" size={24} color="#FF6F15" />
            </View>
            {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
          </View>
          <View style={styles.tituloView}>
            <Text style={styles.text}>
              {Nutricion.proteina} P | {Nutricion.carbohidratos} C | {Nutricion.grasa} G
            </Text>
          </View>
        </View>
        <View style={styles.periodView}>
          <View style={styles.tituloView}>
            <View style={[styles.izq, /*Nutricion.Imagen*/ false && { flex: 1 }]}>
              <Text style={styles.titulo}>Snacks • {Nutricion.calorias} kcal</Text>
              <Ionicons name="flame-outline" size={24} color="#FF6F15" />
            </View>
            {/*{Nutricion.Imagen && <Feather name="image" size={24} color="#777777" />}*/}
          </View>
          <View style={styles.tituloView}>
            <Text style={styles.text}>
              {Nutricion.proteina} P | {Nutricion.carbohidratos} C | {Nutricion.grasa} G
            </Text>
          </View>
        </View>
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
