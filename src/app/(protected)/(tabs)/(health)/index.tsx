import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

//TEMP
import { EntrenamientosType, findEntrenamientoByDate } from '~/assets/ejercicio/entrenamientos';
import { NutricionType, findNutricionByDate } from '~/assets/nutricion/nutricion';

//import { useObjetivos } from '@providers/ObjetivosProvider';
import { getObjetivos } from '@api/objetivos';

import Formula from '@components/Health/Formula';
import SueñoHidratacion from '@components/Health/SueñoHidratacion';
import Sueño from '~/src/components/Health/Sueño';
import Agua from '~/src/components/Health/Agua';
import CustomCalendar from '@components/Health/Calendar';
import CalendarioReplegado from '@components/Utils/CalendarioReplegado';
import moment from 'moment';
import TwoOptionsButton from '@components/Buttons/TwoOptions';
import Ejercicio from '@components/Health/Ejercicio/Ejercicio';
import Nutricion from '@components/Health/Nutricion/Nutricion';

export default function HealthLayout() {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [mode, setMode] = useState<string>('Ejercicio');
  const [ejercicio, setEjercicio] = useState<any>(null);
  const [nutricion, setNutricion] = useState<any>(null);

  //const { objetivos } = useObjetivos();
  const { data: objetivos, isLoading: isLoadingObjetivos } = getObjetivos();

  const getEjercicio = (date: string): EntrenamientosType | null => {
    return findEntrenamientoByDate(date);
  };

  const getNutricion = (date: string): NutricionType | null => {
    //forma de obtener datos
    return findNutricionByDate(date);
  };

  useEffect(() => {
    setEjercicio(getEjercicio(selectedDate.format('YYYY-MM-DD')));
    setNutricion(getNutricion(selectedDate.format('YYYY-MM-DD')));
  }, [selectedDate, calendar]);

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
            loading={isLoadingObjetivos}
          />
        ) : (
          <CustomCalendar
            selectedDate={selectedDate.format('YYYY-MM-DD')}
            setSelectedDate={(date) => setSelectedDate(date)}
            onCalendarChange={setCalendar}
          />
        )}
        <Text style={styles.fecha}>{selectedDate.format('DD MMMM, YYYY')}</Text>

        <Formula
          objective={objetivos?.calorias?.toString() || '0'}
          nutricion={nutricion?.Calorias || 0}
          exercise={ejercicio?.Calorias || 0}
          loading={isLoadingObjetivos}
        />
        <SueñoHidratacion
          fecha={selectedDate.format('YYYY-MM-DD')}
          objetivoHidratacion={objetivos?.agua || 3.3}
          objetivoSueño={objetivos?.sueño || 0}
          loading={isLoadingObjetivos}
        />
        <TwoOptionsButton
          option1="Ejercicio"
          option2="Nutricion"
          method={setMode}
          selected={mode}
          loading={false}
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

const styles = StyleSheet.create({
  fecha: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
