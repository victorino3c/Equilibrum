import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Database } from '~/src/database.types';

import { useGetUserNutriciones } from '@api/nutricion';

const HistorialView = () => {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [ejercicio, setEjercicio] = useState<
    Database['public']['Tables']['nutricion']['Row'][] | undefined
  >(undefined);

  const { data: nutriciones, isLoading: isLoadingNutriciones } = useGetUserNutriciones();

  return (
    <View>
      <Text>Historial</Text>
    </View>
  );
};

export default HistorialView;

const styles = StyleSheet.create({});
