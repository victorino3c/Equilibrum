import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Date from '../Utils/Date';

//TEMP
import { findEntrenamientoByDate } from '~/assets/ejercicio/entrenamientos';
import { findNutricionByDate } from '~/assets/nutricion/nutricion';

import Feather from '@expo/vector-icons/Feather';

interface CalendarioReplegadoProps {
  onSelectDate: (date: moment.Moment) => void;
  onCalendarChange: (tipo: string) => void;
  selected: moment.Moment;
}

const CalendarioReplegado = ({
  onSelectDate,
  onCalendarChange,
  selected,
}: CalendarioReplegadoProps) => {
  const [dates, setDates] = useState<{ date: moment.Moment; visualization: number }[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = [];
    for (let i = 10; i >= 0; i--) {
      const date = moment().subtract(i, 'days');

      // Check if the date has a training
      const training = findEntrenamientoByDate(date.format('YYYY-MM-DD'));
      var visualization = training ? 1 : 0;

      // Check if the date has a nutrition
      const nutrition = findNutricionByDate(date.format('YYYY-MM-DD'));
      visualization += nutrition ? 2 : 0;

      _dates.push({ date: date, visualization: visualization });
    }

    setDates(_dates);
  };

  useEffect(() => {
    getDates();
    setCurrentMonth(moment().format('MMMM YYYY'));

    // scroll to the end of the scroll view
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1);
  }, []);

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
