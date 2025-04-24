import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import moment from 'moment';

import { getVolumeLiftedSinceDate } from '~/src/api/entrenamientos';
import { Ionicons } from '@expo/vector-icons';

const graphOptions = ['Volumen', 'Repeticiones', 'Series', 'Calorias'];

const Ejercicio = () => {
  const { data: volume } = getVolumeLiftedSinceDate(
    moment().subtract(7, 'days').format('YYYY-MM-DD')
  );

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
        <Text style={{ fontSize: 18, color: 'black' }}>Gráfica ejercicio</Text>
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
    justifyContent: 'space-between',
    width: '100%',
  },
  grafica: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 60,
    alignSelf: 'center',
  },
  graficaButton: {
    backgroundColor: 'lightgray',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
