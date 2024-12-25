import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState('2024-02-21');

  const markedDates = {
    '2024-02-21': { selected: true, marked: true, selectedColor: '#9c27b0' },
    '2024-02-22': { selected: true, marked: true, selectedColor: '#9c27b0' },
    '2024-02-01': { marked: true, dotColor: '#00adf5', selectedDotColor: '#00adf5' },
    '2024-02-02': { marked: true, dotColor: '#00adf5', selectedDotColor: '#00adf5' },
    '2024-02-03': { marked: true, dotColor: '#00adf5', selectedDotColor: '#00adf5' },
    // Add more marked dates as needed
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={'2024-02-01'}
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
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
});
