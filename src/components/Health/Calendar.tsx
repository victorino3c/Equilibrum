import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Feather from '@expo/vector-icons/Feather';
import moment from 'moment';

//TEMP
//import { getNutricionDatesByUser } from '~/assets/nutricion/nutricion';
//import { useGetUserNutriciones } from '@api/nutricion';
import { Database } from '~/src/database.types';
const Colores = {
  1: '#34E5E5', //Solo entrenamiento
  2: '#A1FF08', // Solo nutricion
  3: '#6608ff', // Ambos
};

type CustomCalendarProps = {
  selected: string;
  onCalendarChange: (value: string) => void;
  onSelectDate: (value: moment.Moment) => void;
  entrenamientos: Database['public']['Tables']['entrenamiento']['Row'][] | undefined;
  nutriciones: Database['public']['Tables']['nutricion']['Row'][] | undefined;
  loading?: boolean;
};

export default function CustomCalendar({
  selected,
  onCalendarChange,
  onSelectDate,
  entrenamientos = [],
  nutriciones = [],
  loading = false,
}: CustomCalendarProps) {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    var newMarkedDates = {
      ...markedDates,
      [today]: {
        marked: true,
        dotColor: '#6608ff',
        text: { color: 'black' },
      },
    };

    //CAMBIAR
    //const { data: nutriciones } = useGetUserNutriciones();

    const entrenamientosNutricion = entrenamientos
      .map((entrenamiento) => {
        if (
          nutriciones
            ?.map((nutricion) => moment(nutricion.fecha).format('YYYY-MM-DD')) // Extract and format the 'fecha' property
            .includes(moment(entrenamiento.fecha).format('YYYY-MM-DD')) // Compare formatted dates
        ) {
          return moment(entrenamiento.fecha).format('YYYY-MM-DD');
        }
      })
      .filter((date) => date !== undefined);

    const entrenamientosSolo = entrenamientos?.filter(
      (entrenamiento) =>
        !nutriciones
          .map((nutricion) => moment(nutricion.fecha).format('YYYY-MM-DD'))
          .includes(moment(entrenamiento.fecha).format('YYYY-MM-DD'))
    );

    const nutricionesSolo = nutriciones?.filter(
      (nutricion) =>
        !entrenamientos
          .map((entrenamiento) => moment(entrenamiento.fecha).format('YYYY-MM-DD'))
          .includes(moment(nutricion.fecha).format('YYYY-MM-DD'))
    );

    entrenamientosNutricion.forEach((date) => {
      newMarkedDates = {
        ...newMarkedDates,
        [date]: {
          selected: true,
          selectedColor: Colores[3],
          text: { color: 'white' },
          selectedDayTextColor: 'white',
        },
      };
    });

    entrenamientosSolo?.forEach((entrenamiento) => {
      newMarkedDates = {
        ...newMarkedDates,
        [moment(entrenamiento.fecha).format('YYYY-MM-DD')]: {
          selected: true,
          selectedColor: Colores[1],
          selectedDayTextColor: 'white',
        },
      };
    });

    nutricionesSolo?.forEach((nutricion) => {
      newMarkedDates = {
        ...newMarkedDates,
        [nutricion.fecha]: {
          selected: true,
          selectedColor: Colores[2],
          selectedDayTextColor: 'white',
        },
      };
    });

    setMarkedDates(newMarkedDates);
  }, []);

  const renderArrow = (direction: 'left' | 'right') => (
    <Feather name={`chevron-${direction}`} size={24} color="black" />
  );

  return (
    <View style={styles.container}>
      <Calendar
        current={selected}
        minDate={moment().subtract(1, 'year').format('YYYY-MM-DD')}
        maxDate={moment().format('YYYY-MM-DD')}
        onDayPress={(day: { dateString: string }) => onSelectDate(moment(day.dateString))}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        firstDay={1}
        markedDates={markedDates}
        markingType={'custom'}
        renderArrow={renderArrow}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#6608ff',
          selectedDayTextColor: '#ffffff',
          //todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: 'grey',
          monthTextColor: 'black',
          indicatorColor: 'grey',
          textDayFontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
          textMonthFontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
          textDayHeaderFontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
          textDayFontWeight: '300',
          textMonthFontWeight: 'light',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 17,
          textMonthFontSize: 21,
          textDayHeaderFontSize: 16,
        }}
      />
      <View style={styles.centered}>
        <TouchableOpacity onPress={() => onCalendarChange('R')}>
          <Feather name="chevron-up" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
