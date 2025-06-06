import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Feather from '@expo/vector-icons/Feather';
import moment from 'moment';

const Colores = {
  1: '#34E5E5', //Solo entrenamiento
};

type CustomCalendarProps = {
  selected: string;
  onCalendarChange: (value: string) => void;
  onSelectDate: (value: moment.Moment) => void;
  entrenamientos: { id: string; fecha: string }[] | undefined;
  loading?: boolean;
};

export default function CustomCalendar({
  selected,
  onCalendarChange,
  onSelectDate,
  entrenamientos = [],
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

    entrenamientos.forEach((entrenamiento) => {
      newMarkedDates = {
        ...newMarkedDates,
        [moment(entrenamiento.fecha).format('YYYY-MM-DD')]: {
          selected: true,
          selectedColor: Colores[1],
          text: { color: 'white' },
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
