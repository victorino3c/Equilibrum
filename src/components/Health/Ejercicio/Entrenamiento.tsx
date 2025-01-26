import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import moment from 'moment';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import Skeleton from '@components/Utils/SkeletonView';

import { Database } from '~/src/database.types';

import { parseDuracion } from '@utils/funciones';

type EntrenamientoProps = {
  entrenamiento: Database['public']['Tables']['entrenamiento']['Row'] | null;
  loading?: boolean;
};

const Entrenamiento = ({ entrenamiento, loading }: EntrenamientoProps) => {
  if (loading) {
    return <Skeleton height={160} />;
  }

  if (entrenamiento === undefined || entrenamiento === null) {
    return (
      <View style={styles.container}>
        <Text style={[styles.titulo, { textAlign: 'center', paddingVertical: 30 }]}>
          No hay entrenamientos
        </Text>
      </View>
    );
  }

  return (
    <Link href={`/Ejercicio/DetallesEntrenamiento?id=${entrenamiento.id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={styles.tituloView}>
          <View style={[styles.izq, entrenamiento.imagen && { flex: 1 }]}>
            <Text style={styles.titulo}>{entrenamiento.titulo} </Text>
            <Text style={styles.titulo}>• {entrenamiento.calorias} kcal</Text>
            <Ionicons name="flame-outline" size={24} color="#FF6F15" />
          </View>
          {entrenamiento.imagen && <Feather name="image" size={24} color="#777777" />}
        </View>
        <View style={styles.tituloView}>
          <Text style={styles.text}>
            #{entrenamiento.numero} •{' '}
            {moment(entrenamiento.fecha).format('dddd D, MMMM, YYYY').toLowerCase()}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={[styles.tituloView, { justifyContent: 'space-between' }]}>
          <View style={styles.info}>
            <AntDesign name="clockcircleo" size={24} color="#6608ff" />
            <Text style={styles.textInfo}>{parseDuracion(entrenamiento.duracion || 0)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontFamily: 'IcoMoon', fontSize: 24, color: '#6608ff' }}>&#xe901;</Text>
            <Text style={styles.textInfo}>{entrenamiento.volumen} kg</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 24, color: '#6608ff' }}>S</Text>
            <Text style={styles.textInfo}>{entrenamiento.series} series</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default Entrenamiento;

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
    flex: 1,
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
