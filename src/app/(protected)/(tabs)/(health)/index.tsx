import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

//TEMP
import { EntrenamientosType, findEntrenamientoByDate } from '~/assets/ejercicio/entrenamientos';
import { NutricionType, findNutricionByDate } from '~/assets/nutricion/nutricion';
import {
  getObjetivosByUsername,
  getObjetivosDiariosByUsername,
  objetivosDiariosType,
  objetivosType,
} from '~/assets/health/health';

import Formula from '~/src/components/Health/Formula';
import SueñoHidratacion from '~/src/components/Health/SueñoHidratacion';
import Sueño from '~/src/components/Health/Sueño';
import Agua from '~/src/components/Health/Agua';
import CustomCalendar from 'src/components/Health/Calendar';
import CalendarioReplegado from '~/src/components/Utils/CalendarioReplegado';
import moment from 'moment';
import TwoOptionsButton from '~/src/components/Buttons/TwoOptions';
import Ejercicio from '~/src/components/Health/Ejercicio/Ejercicio';
import Nutricion from '~/src/components/Health/Nutricion/Nutricion';

import { entrenamientoStore } from '~/src/store/store';

export default function HealthLayout() {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [mode, setMode] = useState<string>('Ejercicio');
  const [ejercicio, setEjercicio] = useState<any>(null);
  const [nutricion, setNutricion] = useState<any>(null);
  const [objetivos, setObjetivos] = useState<objetivosType | null>(null);
  const [objetivosDiarios, setObjetivosDiarios] = useState<objetivosDiariosType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getEjercicio = (date: string): EntrenamientosType | null => {
    return findEntrenamientoByDate(date);
  };

  const getNutricion = (date: string): NutricionType | null => {
    //forma de obtener datos
    return findNutricionByDate(date);
  };

  useEffect(() => {
    setObjetivos(getObjetivosByUsername('victorino_3c'));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    setEjercicio(getEjercicio(selectedDate.format('YYYY-MM-DD')));
    setNutricion(getNutricion(selectedDate.format('YYYY-MM-DD')));
    setObjetivosDiarios(
      getObjetivosDiariosByUsername('victorino_3c', selectedDate.format('YYYY-MM-DD'))
    );
    setLoading(false);
  }, [selectedDate, calendar]);

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: 'transparent' }}>
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
        <Formula
          objective={objetivos?.calorias.toString() || '0'}
          nutricion={nutricion?.Calorias || 0}
          exercise={ejercicio?.Calorias || 0}
        />
        <SueñoHidratacion
          fecha={selectedDate.format('YYYY-MM-DD')}
          objetivoHidratacion={objetivos?.agua || 3.3}
          objetivoSueño={objetivos?.sueño || 0}
          objetivosDiarios={objetivosDiarios}
        />
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
