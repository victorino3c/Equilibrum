import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import Feather from '@expo/vector-icons/Feather';

type CustomCalendarProps = {
  onCalendarChange: (value: string) => void;
};

export default function CustomCalendar({ onCalendarChange }: CustomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState('2024-12-23');

  const markedDates = {
    '2024-12-21': { selected: true, marked: true, selectedColor: '#6608ff' },
    '2024-12-22': { selected: true, marked: true, selectedColor: '#6608ff' },
    '2024-12-01': { marked: true, dotColor: '#00adf5', selectedDotColor: '#00adf5' },
    '2024-12-02': { marked: true, dotColor: '#00adf5', selectedDotColor: '#00adf5' },
    '2024-12-03': { marked: true, dotColor: '#00adf5', selectedDotColor: '#00adf5' },
    // Add more marked dates as needed
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        minDate={'2024-01-01'}
        maxDate={'2024-12-31'}
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        firstDay={1}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#9c27b0',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#000000',
          arrowColor: 'grey',
          monthTextColor: 'grey',
          indicatorColor: 'grey',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 20,
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
    marginVertical: 15,
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
