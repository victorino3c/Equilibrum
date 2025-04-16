import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Database } from '~/src/database.types';

import CustomCalendar from '@components/Nutricion/Calendar';
import CalendarioReplegado from '@components/Utils/CalendarioReplegado';

import { useGetUserNutriciones } from '@api/nutricion';
import Nutricion from '../Health/Nutricion/Nutricion';

const HistorialView = () => {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [nutricion, setNutricion] = useState<
    Database['public']['Tables']['nutricion']['Row'][] | undefined
  >(undefined);

  const { data: nutriciones, isLoading: isLoadingNutriciones } = useGetUserNutriciones();

  const getNutricion = (
    date: string
  ): Database['public']['Tables']['nutricion']['Row'][] | undefined => {
    const nutricion = nutriciones?.filter((nutricion) => {
      return moment(nutricion.fecha).format('YYYY-MM-DD') === date;
    });
    return nutricion;
  };

  useEffect(() => {
    setNutricion(getNutricion(selectedDate.format('YYYY-MM-DD')));
  }, [selectedDate, calendar, isLoadingNutriciones]);

  return (
    <View>
      {calendar === 'R' ? (
        <CalendarioReplegado
          onSelectDate={(date) => setSelectedDate(date)}
          onCalendarChange={setCalendar}
          selected={selectedDate}
          nutriciones={nutriciones?.map((nutricion) => ({
            tipo_nutricion: nutricion.tipo_nutricion,
            fecha: nutricion.fecha,
          }))}
          loading={isLoadingNutriciones}
          tipo="Nutricion"
        />
      ) : (
        <CustomCalendar
          onSelectDate={(date) => setSelectedDate(date)}
          onCalendarChange={setCalendar}
          selected={selectedDate.format('YYYY-MM-DD')}
          nutriciones={nutriciones?.map((nutricion) => ({
            tipo_nutricion: nutricion.tipo_nutricion,
            fecha: nutricion.fecha,
          }))}
          loading={isLoadingNutriciones}
        />
      )}

      <Text style={styles.fecha}>{selectedDate.format('DD MMMM, YYYY')}</Text>

      <Nutricion Nutricion={nutricion} Fecha={selectedDate} />
    </View>
  );
};

export default HistorialView;

const styles = StyleSheet.create({
  fecha: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
