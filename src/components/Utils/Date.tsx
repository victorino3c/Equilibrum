import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

interface DateProps {
  date: string;
  onSelectDate: (date: string) => void;
  selected: string;
}

const Date = ({ date, onSelectDate, selected }: DateProps) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day =
    /*moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today': */ moment(
      date
    ).format('ddd');

  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format('D');

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD');
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, selected === fullDate && { borderColor: '#6608ff' }]}>
      <Text style={[styles.big, selected === fullDate && { color: '#000' }]}>{day}</Text>
      <Text
        style={[
          styles.medium,
          selected === fullDate && { color: '#000', fontWeight: '400', fontSize: 20 },
        ]}>
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    borderRadius: 100,
    borderColor: '#ddd',
    borderWidth: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    aspectRatio: '1',
    marginHorizontal: 5,
  },
  big: {
    fontWeight: '400',
    color: '#000',
    fontSize: 18,
  },
  medium: {
    fontSize: 16,
  },
});
