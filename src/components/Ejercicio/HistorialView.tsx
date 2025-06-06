import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

import { useState } from 'react';

import CustomCalendar from '@components/Ejercicio/Calendar';
import CalendarioReplegado from '@components/Utils/CalendarioReplegado';
import Entrenamiento from '@components/Health/Ejercicio/Entrenamiento';

import { getEntrenamientos } from '@api/entrenamientos';
import { Database } from '~/src/database.types';

import moment from 'moment';

const HistorialView = () => {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [ejercicio, setEjercicio] = useState<
    Database['public']['Tables']['entrenamiento']['Row'][] | undefined
  >(undefined);

  const { data: entrenamientos, isLoading: isLoadingEntrenamientos } = getEntrenamientos();

  const getEjercicio = (
    date: string
  ): Database['public']['Tables']['entrenamiento']['Row'][] | undefined => {
    const entrenamiento = entrenamientos?.filter((entrenamiento) => {
      return moment(entrenamiento.fecha).format('YYYY-MM-DD') === date;
    });
    return entrenamiento;
  };

  useEffect(() => {
    setEjercicio(getEjercicio(selectedDate.format('YYYY-MM-DD')));
  }, [selectedDate, calendar, isLoadingEntrenamientos]);

  return (
    <View>
      {calendar === 'R' ? (
        <CalendarioReplegado
          onSelectDate={(date) => setSelectedDate(date)}
          onCalendarChange={setCalendar}
          selected={selectedDate}
          entrenamientos={entrenamientos}
          loading={isLoadingEntrenamientos}
          tipo="Ejercicio"
        />
      ) : (
        <CustomCalendar
          onSelectDate={(date) => setSelectedDate(date)}
          onCalendarChange={setCalendar}
          selected={selectedDate.format('YYYY-MM-DD')}
          entrenamientos={entrenamientos}
          loading={isLoadingEntrenamientos}
        />
      )}
      <Text style={styles.fecha}>{selectedDate.format('DD MMMM, YYYY')}</Text>

      {ejercicio?.length === 0 ? (
        <Entrenamiento key={0} entrenamiento={null} />
      ) : (
        ejercicio?.map((ejercicio) => (
          <Entrenamiento key={ejercicio.id} entrenamiento={ejercicio} />
        ))
      )}
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
