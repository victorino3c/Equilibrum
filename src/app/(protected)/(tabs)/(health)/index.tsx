import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

//TEMP
import { NutricionType, findNutricionByDate } from '~/assets/nutricion/nutricion';

import { Database } from '~/src/database.types';

import { getObjetivos } from '@api/objetivos';
import { getEntrenamientos } from '@api/entrenamientos';
import { entrenamientoStore } from '@store/Entrenamientostore';

import Formula from '@components/Health/Formula';
import SueñoHidratacion from '@components/Health/SueñoHidratacion';
import CustomCalendar from '@components/Health/Calendar';
import CalendarioReplegado from '@components/Utils/CalendarioReplegado';
import TwoOptionsButton from '@components/Buttons/TwoOptions';
import Ejercicio from '@components/Health/Ejercicio/Ejercicio';
import Nutricion from '@components/Health/Nutricion/Nutricion';

import moment from 'moment';

export default function HealthLayout() {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [mode, setMode] = useState<string>('Ejercicio');
  const [ejercicio, setEjercicio] = useState<
    Database['public']['Tables']['entrenamiento']['Row'][] | undefined
  >(undefined);
  const [nutricion, setNutricion] = useState<any>(null);

  const { data: objetivos, isLoading: isLoadingObjetivos } = getObjetivos();
  const { data: entrenamientos, isLoading: isLoadingEntrenamientos } = getEntrenamientos(); // Para ajustar bottom padding de scrollview
  const { entrenamientoTerminado } = entrenamientoStore();

  const getEjercicio = (
    date: string
  ): Database['public']['Tables']['entrenamiento']['Row'][] | undefined => {
    const entrenamiento = entrenamientos?.filter((entrenamiento) => {
      return moment(entrenamiento.fecha).format('YYYY-MM-DD') === date;
    });
    return entrenamiento;
  };

  const getNutricion = (date: string): NutricionType | null => {
    //TODO: Cambiar por llamada a API como en getEjercicio
    return findNutricionByDate(date);
  };

  useEffect(() => {
    setEjercicio(getEjercicio(selectedDate.format('YYYY-MM-DD')));
    setNutricion(getNutricion(selectedDate.format('YYYY-MM-DD')));
  }, [selectedDate, calendar, isLoadingEntrenamientos]);

  if (isLoadingObjetivos || isLoadingEntrenamientos) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: 'transparent' }}>
      <ScrollView
        contentContainerStyle={
          entrenamientoTerminado ? { paddingBottom: 70 } : { paddingBottom: 170 }
        }
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        {calendar === 'R' ? (
          <CalendarioReplegado
            onSelectDate={(date) => setSelectedDate(date)}
            onCalendarChange={setCalendar}
            entrenamientos={entrenamientos}
            selected={selectedDate}
            loading={isLoadingObjetivos && isLoadingEntrenamientos}
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
          exercise={(
            ejercicio?.reduce((acc, curr) => acc + (curr.calorias ?? 0), 0) || 0
          ).toString()}
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
          ejercicio?.length === 0 ? (
            <Ejercicio key={0} entrenamiento={null} />
          ) : (
            ejercicio?.map((entrenamiento) => (
              <Ejercicio key={entrenamiento.id} entrenamiento={entrenamiento} />
            ))
          )
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
