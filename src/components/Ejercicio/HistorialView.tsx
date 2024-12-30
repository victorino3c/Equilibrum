import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

import { useState } from 'react';

import CustomCalendar from 'src/components/Ejercicio/Calendar';
import CalendarioReplegado from '~/src/components/Ejercicio/CalendarioReplegado';
import Ejercicio from '~/src/components/Health/Ejercicio/Ejercicio';

//TEMP
import { EntrenamientosType, findEntrenamientoByDate } from '~/assets/ejercicio/entrenamientos';

import moment from 'moment';

const HistorialView = () => {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [ejercicio, setEjercicio] = useState<any>(null);

  const getEjercicio = (date: string): EntrenamientosType | null => {
    return findEntrenamientoByDate(date);
  };

  useEffect(() => {
    setEjercicio(getEjercicio(selectedDate.format('YYYY-MM-DD')));
    //console.log('Selected date:', selectedDate.format('YYYY-MM-DD'));
  }, [selectedDate, calendar]);

  return (
    <View>
      {calendar === 'R' ? (
        <CalendarioReplegado
          onSelectDate={(date) => setSelectedDate(date)}
          onCalendarChange={setCalendar}
          selected={selectedDate}
          tipo="Ejercicio"
        />
      ) : (
        <CustomCalendar
          selectedDate={selectedDate.format('YYYY-MM-DD')}
          setSelectedDate={(date) => setSelectedDate(date)}
          onCalendarChange={setCalendar}
        />
      )}
      <Ejercicio Entrenamiento={ejercicio} Fecha={selectedDate} />
    </View>
  );
};

export default HistorialView;
