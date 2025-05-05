import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import moment from 'moment';
import {
  BarChart,
  LineChart,
  lineDataItem,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from 'react-native-gifted-charts';

import { getVolumeLiftedSinceDate, getVolumePerWeekForGivenMonths } from '@api/entrenamientos';
import { Ionicons } from '@expo/vector-icons';
import Skeleton from '../../Utils/SkeletonView';

const graphOptions = ['Volumen', 'Repeticiones', 'Series', 'Calorias'];

const data = [
  { value: 50, label: 'hola', showVerticalLine: true },
  { value: 80, label: 'hola', dataPointText: 'true' },
  { value: 90 },
  { value: 70 },
  { value: 60 },
  { value: 70 },
  { value: 70 },
  { value: 70 },
];
const data2 = [
  { value: 40 },
  { value: 90 },
  { value: 100 },
  { value: 50 },
  { value: 50 },
  { value: 60 },
];

const Ejercicio = () => {
  const { data: volume } = getVolumeLiftedSinceDate(
    moment().subtract(7, 'days').format('YYYY-MM-DD')
  );
  const { data: volumenMes, isLoading } = getVolumePerWeekForGivenMonths(2);

  //Get maxValue from the volumenMes data
  const getMaxVolumeValue = () => {
    return volumenMes?.reduce((max, item) => (item.value > max ? item.value : max), 0);
  };

  const [selectedMode, setSelectedMode] = React.useState('Volumen');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{volume} kg</Text> esta semana
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#6608ff' }}>Últimos 3 meses</Text>
          <Ionicons name="chevron-down-outline" size={20} color="#6608ff" />
        </View>
      </View>
      <View style={styles.grafica}>
        {!isLoading && selectedMode === 'Volumen' ? (
          <LineChart
            data={volumenMes as lineDataItem[]}
            //dataSet={[{ data }]}
            //data2={data2}
            lineGradient={true}
            //stepChart={true}
            stepValue={getMaxVolumeValue()! / 4}
            maxValue={getMaxVolumeValue()}
            width={300}
            //adjustToWidth={true}
            isAnimated={true}
            animateOnDataChange={true}
          />
        ) : (
          <Skeleton height={300} width={300} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        {graphOptions.map((option) => (
          <View
            key={option}
            style={{
              ...styles.graficaButton,
              ...(selectedMode === option && { backgroundColor: '#6608ff' }),
            }}>
            <TouchableOpacity onPress={() => setSelectedMode(option)}>
              <Text
                key={option}
                style={{
                  fontSize: 14,
                  color: '#000',
                  ...(selectedMode === option && { fontWeight: 'bold', color: 'white' }),
                }}>
                {option}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Ejercicio;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  grafica: {
    backgroundColor: 'white',
    //flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  graficaButton: {
    backgroundColor: 'lightgray',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
