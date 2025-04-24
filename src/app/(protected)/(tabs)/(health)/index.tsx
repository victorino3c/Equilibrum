import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { Database } from '~/src/database.types';

import { getEntrenamientos } from '@api/entrenamientos';
import { useGetUserNutriciones } from '@api/nutricion';
import { entrenamientoStore } from '@store/Entrenamientostore';
import { useNutricionStore } from '@store/NutricionStore';
import { appStore } from '@store/AppStore';

import Formula from '@components/Health/Formula';
import SueñoHidratacion from '@components/Health/SueñoHidratacion';
import CustomCalendar from '@components/Health/Calendar';
import CalendarioReplegado from '@components/Utils/CalendarioReplegado';
import TwoOptionsButton from '@components/Buttons/TwoOptions';
import Entrenamiento from '@components/Health/Ejercicio/Entrenamiento';
import Nutricion from '@components/Health/Nutricion/Nutricion';

import moment from 'moment';

export default function HealthLayout() {
  const [calendar, setCalendar] = useState<string>('R');
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [mode, setMode] = useState<string>('Ejercicio');
  const [ejercicio, setEjercicio] = useState<
    Database['public']['Tables']['entrenamiento']['Row'][] | undefined
  >(undefined);
  const [nutricion, setNutricion] = useState<
    Database['public']['Tables']['nutricion']['Row'][] | undefined
  >([]);

  //const { data: objetivos, isLoading: isLoadingObjetivos } = getObjetivos();
  // CAMBIADO A OBJETIVOS GUARDADOS EN EL STORE LOCAL
  const { objetivosNutricion: objetivos, objetivoAgua, objetivoSueño } = appStore((state) => state);
  const { data: entrenamientos, isLoading: isLoadingEntrenamientos } = getEntrenamientos(); // Para ajustar bottom padding de scrollview
  const { data: nutriciones, isLoading: isLoadingNutriciones } = useGetUserNutriciones();
  const { entrenamientoTerminado } = entrenamientoStore();

  const caloriasNutricionToday = useNutricionStore((state) => state.macros.Calorias);

  const getEjercicio = (
    date: string
  ): Database['public']['Tables']['entrenamiento']['Row'][] | undefined => {
    const entrenamiento = entrenamientos?.filter((entrenamiento) => {
      return moment(entrenamiento.fecha).format('YYYY-MM-DD') === date;
    });
    return entrenamiento;
  };

  const getNutricion = (
    date: string
  ): Database['public']['Tables']['nutricion']['Row'][] | undefined => {
    const nutricion = nutriciones?.filter((nutricion) => {
      return moment(nutricion.fecha).format('YYYY-MM-DD') === date;
    });
    return nutricion;
  };

  const getCalorias = () => {
    if (selectedDate.isSame(moment(), 'day')) {
      return caloriasNutricionToday;
    } else {
      return nutricion?.reduce((acc, curr) => acc + (curr.calorias ?? 0), 0);
    }
  };

  useEffect(() => {
    setEjercicio(getEjercicio(selectedDate.format('YYYY-MM-DD')));
    setNutricion(getNutricion(selectedDate.format('YYYY-MM-DD')));
  }, [selectedDate, calendar, isLoadingEntrenamientos]);

  if (isLoadingEntrenamientos || isLoadingNutriciones) {
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
            nutriciones={nutriciones}
            selected={selectedDate}
            //loading={isLoadingObjetivos && isLoadingEntrenamientos}
            loading={isLoadingEntrenamientos}
          />
        ) : (
          <CustomCalendar
            onSelectDate={(date) => setSelectedDate(date)}
            onCalendarChange={setCalendar}
            entrenamientos={entrenamientos}
            selected={selectedDate.format('YYYY-MM-DD')}
            //loading={isLoadingObjetivos && isLoadingEntrenamientos}
            loading={isLoadingEntrenamientos}
          />
        )}
        <Text style={styles.fecha}>{selectedDate.format('DD MMMM, YYYY')}</Text>

        <Formula
          objective={objetivos?.objetivoCalorias?.toString() || '0'}
          nutricion={getCalorias()?.toString() || '0'}
          exercise={(
            ejercicio?.reduce((acc, curr) => acc + (curr.calorias ?? 0), 0) || 0
          ).toString()}
          //loading={isLoadingObjetivos}
        />
        <SueñoHidratacion
          fecha={selectedDate.format('YYYY-MM-DD')}
          objetivoHidratacion={objetivoAgua || 3.3}
          objetivoSueño={objetivoSueño || 0}
          //loading={isLoadingObjetivos}
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
            <Entrenamiento key={0} entrenamiento={null} />
          ) : (
            ejercicio?.map((entrenamiento) => (
              <Entrenamiento key={entrenamiento.id} entrenamiento={entrenamiento} />
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
