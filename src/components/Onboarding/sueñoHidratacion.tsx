import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';

import moment from 'moment';

import Feather from '@expo/vector-icons/Feather';
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';

import Skeleton from '../Utils/SkeletonView';

type SueñoHidratacionProps = {
  fecha: string;
  objetivoHidratacion: number;
  objetivoSueño: number;
  loading?: boolean;
};

const SueñoHidratacionOnboarding = ({
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

  // Define the emoji based on the value
  const getEmoji = (value: number) => {
    if (value <= 0.2 * objetivoHidratacion) return '😫';
    if (value <= 0.4 * objetivoHidratacion) return '😪';
    if (value <= 0.6 * objetivoHidratacion) return '😐';
    if (value <= 0.8 * objetivoHidratacion) return '😄';
    if (value <= objetivoHidratacion) return '😁';
    return null;
  };

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
            <Text className="font-regular text-center text-xl">{'7'}</Text>
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
        <Text style={[styles.emoji, { fontSize: 50 }]}>{getEmoji(2.2)}</Text>
        <Text style={{ fontSize: 24 }}>
          {'2.2'} / {objetivoHidratacion.toFixed(1)} Litros
        </Text>
      </View>
    </View>
  );
};

export default SueñoHidratacionOnboarding;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 15,
    width: 370,
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
