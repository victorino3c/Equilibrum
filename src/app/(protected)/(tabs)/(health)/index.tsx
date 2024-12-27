import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

//TEMP
import { Entrenamientos, EntrenamientosType } from '~/assets/ejercicio/entrenamientos';

import Formula from '~/src/components/Health/Formula';
import SueñoHidratacion from '~/src/components/Health/SueñoHidratacion';
import Sueño from '~/src/components/Health/Sueño';
import Agua from '~/src/components/Health/Agua';
import CustomCalendar from 'src/components/Health/Calendar';
import CalendarioReplegado from '~/src/components/Health/CalendarioReplegado';
import moment from 'moment';
import TwoOptionsButton from '~/src/components/Buttons/TwoOptions';
import Ejercicio from '~/src/components/Health/Ejercicio/Ejercicio';

export default function Health() {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [mode, setMode] = useState<string>('Ejercicio');
  const [ejercicio, setEjercicio] = useState<any>();
  const [nutricion, setNutricion] = useState<any>();

  const getEjercicio = (date: string): EntrenamientosType | null => {
    //forma de obtener datos
    return Entrenamientos[date] || null;
  };

  useEffect(() => {
    setEjercicio(getEjercicio(selectedDate.format('YYYY-MM-DD')));
    console.log('Fecha: ', selectedDate.format('YYYY-MM-DD'));
  }, [selectedDate]);

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {calendar === 'R' ? (
          <CalendarioReplegado
            onSelectDate={(date) => setSelectedDate(date)}
            onCalendarChange={setCalendar}
            selected={selectedDate}
          />
        ) : (
          <CustomCalendar onCalendarChange={setCalendar} />
        )}
        <Formula objective="2400" nutricion="1800" exercise="0" />
        <SueñoHidratacion />
        <TwoOptionsButton
          option1="Ejercicio"
          option2="Nutricion"
          method={setMode}
          selected={mode}
        />
        {mode === 'Ejercicio' ? <Ejercicio Entrenamiento={ejercicio} /> : null}
      </ScrollView>
    </View>
  );
}
