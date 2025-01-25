import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Date from '../Utils/Date';

import { useFocusEffect } from '@react-navigation/native';

// TEMP
import { findNutricionByDate } from '~/assets/nutricion/nutricion';

import Feather from '@expo/vector-icons/Feather';
import Skeleton from './SkeletonView';

interface CalendarioReplegadoProps {
  onSelectDate: (date: moment.Moment) => void;
  onCalendarChange: (tipo: string) => void;
  entrenamientos: { id: string; fecha: string }[] | undefined;
  selected: moment.Moment;
  tipo?: string;
  loading?: boolean;
}

const CalendarioReplegado = ({
  onSelectDate,
  onCalendarChange,
  entrenamientos = [],
  selected,
  tipo,
  loading = true,
}: CalendarioReplegadoProps) => {
  const [dates, setDates] = useState<{ date: moment.Moment; visualization: number }[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Get the dates from today to 10 days from now, format them as strings, and store them in state
  const getDates = () => {
    const _dates = [];
    for (let i = 14; i >= 0; i--) {
      const date = moment().subtract(i, 'days');
      let visualization = 0;

      // Check if the date has a training
      if (tipo !== 'Nutricion') {
        const training = entrenamientos.find(
          (entrenamiento) =>
            moment(entrenamiento.fecha).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        );
        visualization = training ? 1 : 0;
      }

      // Check if the date has a nutrition
      if (tipo !== 'Ejercicio') {
        //HACER LO MISMO AQUI QUE CON LOS ENTRENAMIENTOS
        const nutrition = findNutricionByDate(date.format('YYYY-MM-DD'));
        visualization += nutrition ? 2 : 0;
      }

      _dates.push({ date: date, visualization: visualization });
    }

    setDates(_dates);
  };

  useFocusEffect(
    React.useCallback(() => {
      getDates();
      setCurrentMonth(moment().format('MMMM YYYY'));
    }, [])
  );

  useEffect(() => {
    // Use a small timeout to ensure the scroll view has rendered its content
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 200); // Adjust the timeout duration as needed
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return <Skeleton height={145} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.title}>{currentMonth}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date.date.format('YYYY-MM-DD')}
                visualization={date.visualization}
                onSelectDate={(dateString) => onSelectDate(moment(dateString))}
                selected={selected.format('YYYY-MM-DD')}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.centered}>
        <TouchableOpacity onPress={() => onCalendarChange('D')}>
          <Feather name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalendarioReplegado;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 15,
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
  title: {
    fontSize: 21,
    paddingTop: 10,
    fontWeight: 'light',
  },
  dateSection: {
    width: '100%',
    paddingHorizontal: 10,
  },
  scroll: {
    flex: 1,
  },
});
