import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';

import moment from 'moment';

import Feather from '@expo/vector-icons/Feather';
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  useUpdateObjetivosDiariosSueñoByFecha,
  useUpdateObjetivosDiariosAguaByFecha,
  getObjetivosdiariosByFecha,
} from '@api/objetivos';
import Skeleton from '../Utils/SkeletonView';

type SueñoHidratacionProps = {
  fecha: string;
  objetivoHidratacion: number;
  objetivoSueño: number;
  loading?: boolean;
};

const SueñoHidratacion = ({
  fecha,
  objetivoHidratacion,
  objetivoSueño,
  loading = false,
}: SueñoHidratacionProps) => {
  // Define the color of the slider based on the value
  const getSliderColor = (value: number) => {
    if (value === 0) return '#d3d3d3'; // Grey color for 0 value
    if (value < objetivoHidratacion) return '#00c6fb'; // Light blue for intermediate values
    return '#00c6fb'; // Full blue for maximum value
  };

  const { mutate: updateObjetivosDiariosSueñoByFecha } = useUpdateObjetivosDiariosSueñoByFecha();
  const { mutate: updateObjetivosDiariosAguaByFecha } = useUpdateObjetivosDiariosAguaByFecha();
  const {
    data: objetivosDiarios,
    isLoading: isLoadingObjetivosDiarios,
    error,
  } = getObjetivosdiariosByFecha(fecha);

  // Define the emoji based on the value
  const getEmoji = (value: number) => {
    if (value <= 0.2 * objetivoHidratacion) return '😫';
    if (value <= 0.4 * objetivoHidratacion) return '😪';
    if (value <= 0.6 * objetivoHidratacion) return '😐';
    if (value <= 0.8 * objetivoHidratacion) return '😄';
    if (value <= objetivoHidratacion) return '😁';
    return null;
  };

  const handleSueñoChange = (text: string) => {
    if (text === '') {
      updateObjetivosDiariosSueñoByFecha({ fecha, sueño: null });
    }
    try {
      updateObjetivosDiariosSueñoByFecha({ fecha, sueño: parseInt(text) });
    } catch (error) {
      console.error(error);
      objetivoHidratacion;
    }
  };

  const handleAguaChange = (value: number) => {
    updateObjetivosDiariosAguaByFecha({ fecha, agua: value });
  };

  if ((loading || isLoadingObjetivosDiarios) && moment().format('YYYY-MM-DD') !== fecha) {
    return <Skeleton height={190} />;
  }

  if (moment().format('YYYY-MM-DD') !== fecha) {
    return (
      <View style={styles.container}>
        <View style={styles.sueño}>
          <View style={styles.inner}>
            <Feather name="moon" size={24} color="#6608ff" />
            <Text className="px-2 text-xl font-bold">Horas de sueño</Text>
            <Feather name="info" size={16} color="grey" />
          </View>
          <View style={styles.inner}>
            <View>
              <Text className="font-regular text-center text-xl">
                {objetivosDiarios?.sueño || '-'}
              </Text>
            </View>
            <Text className="text-lg">/ {objetivoSueño} horas</Text>
          </View>
        </View>
        <View style={styles.inner}>
          <Ionicons name="water-outline" size={24} color="#6608ff" />
          <Text className="px-2 text-xl font-bold">Hidratación</Text>
          <Feather name="info" size={16} color="grey" />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.emoji, { fontSize: 50 }]}>
            {getEmoji(objetivosDiarios?.agua || objetivoHidratacion + 1) || ''}
          </Text>
          <Text style={{ fontSize: 24 }}>
            {objetivosDiarios?.agua?.toFixed(1) || '-'} / {objetivoHidratacion.toFixed(1)} Litros
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sueño}>
        <View style={styles.inner}>
          <Feather name="moon" size={24} color="#6608ff" />
          <Text className="px-2 text-xl font-bold">Horas de sueño</Text>
          <Feather name="info" size={16} color="grey" />
        </View>
        <View style={styles.inner}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(text) => handleSueñoChange(text)}
              value={objetivosDiarios?.sueño?.toString() || ''}
              className="font-regular text-center text-xl"
            />
          </View>
          <Text className="text-lg">/ {objetivoSueño} horas</Text>
        </View>
      </View>
      <View style={styles.inner}>
        <Ionicons name="water-outline" size={24} color="#6608ff" />
        <Text className="px-2 text-xl font-bold">Hidratación</Text>
        <Feather name="info" size={16} color="grey" />
      </View>
      <Text
        style={
          styles.amountText
        }>{`${objetivosDiarios?.agua?.toFixed(1) || '0.0'} / ${objetivoHidratacion} Litros`}</Text>
      <View style={styles.row}>
        <Text style={styles.emoji}>{getEmoji(objetivosDiarios?.agua || 0)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={objetivoHidratacion}
          minimumTrackTintColor={getSliderColor(objetivosDiarios?.agua || 0)}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor={getSliderColor(objetivosDiarios?.agua || 0)}
          value={objetivosDiarios?.agua || 0}
          onValueChange={(value) => handleAguaChange(value)}
        />
      </View>
    </View>
  );
};

export default SueñoHidratacion;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
  sueño: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginHorizontal: 5,
    width: 40,
  },
  emoji: {
    fontSize: 30,
    marginRight: 5,
  },
  slider: {
    flex: 1,
  },
  track: {
    height: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    paddingLeft: 32,
  },
});
