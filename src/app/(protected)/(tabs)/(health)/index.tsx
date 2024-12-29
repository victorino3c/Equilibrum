import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

//TEMP
import {
  Entrenamientos,
  EntrenamientosType,
  findEntrenamientoByDate,
} from '~/assets/ejercicio/entrenamientos';
import { Nutriciones, NutricionType } from '~/assets/nutricion/nutricion';

import Formula from '~/src/components/Health/Formula';
import SueñoHidratacion from '~/src/components/Health/SueñoHidratacion';
import Sueño from '~/src/components/Health/Sueño';
import Agua from '~/src/components/Health/Agua';
import CustomCalendar from 'src/components/Health/Calendar';
import CalendarioReplegado from '~/src/components/Health/CalendarioReplegado';
import moment from 'moment';
import TwoOptionsButton from '~/src/components/Buttons/TwoOptions';
import Ejercicio from '~/src/components/Health/Ejercicio/Ejercicio';
import Nutricion from '~/src/components/Health/Nutricion/Nutricion';

export default function Health() {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [mode, setMode] = useState<string>('Ejercicio');
  const [ejercicio, setEjercicio] = useState<any>(null);
  const [nutricion, setNutricion] = useState<any>(null);

  const getEjercicio = (date: string): EntrenamientosType | null => {
    return findEntrenamientoByDate(date);
  };

  const getNutricion = (date: string): NutricionType | null => {
    //forma de obtener datos
    return Nutriciones[date] || null;
  };

  useEffect(() => {
    setEjercicio(getEjercicio(selectedDate.format('YYYY-MM-DD')));
    setNutricion(getNutricion(selectedDate.format('YYYY-MM-DD')));
    //console.log('Selected date:', selectedDate.format('YYYY-MM-DD'));
  }, [selectedDate, calendar]);

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        {calendar === 'R' ? (
          <CalendarioReplegado
            onSelectDate={(date) => setSelectedDate(date)}
            onCalendarChange={setCalendar}
            selected={selectedDate}
          />
        ) : (
          <CustomCalendar
            selectedDate={selectedDate.format('YYYY-MM-DD')}
            setSelectedDate={(date) => setSelectedDate(date)}
            onCalendarChange={setCalendar}
          />
        )}
        <Formula objective="2400" nutricion="1800" exercise="0" />
        <SueñoHidratacion />
        <TwoOptionsButton
          option1="Ejercicio"
          option2="Nutricion"
          method={setMode}
          selected={mode}
        />
        {mode === 'Ejercicio' ? (
          <Ejercicio Entrenamiento={ejercicio} Fecha={selectedDate} />
        ) : (
          <Nutricion Nutricion={nutricion} Fecha={selectedDate} />
        )}
      </ScrollView>
    </View>
  );
}
