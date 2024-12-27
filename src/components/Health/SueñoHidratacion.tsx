import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useState } from 'react';

import Feather from '@expo/vector-icons/Feather';
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';

const SueñoHidratacion = () => {
  const [sueño, setsueño] = useState('-');

  const [value, setValue] = useState(1.5); // Set initial value
  const maxValue = 3.3; // Maximum value for the slider

  // Define the color of the slider based on the value
  const getSliderColor = (value: number) => {
    if (value === 0) return '#d3d3d3'; // Grey color for 0 value
    if (value < maxValue) return '#00c6fb'; // Light blue for intermediate values
    return '#00c6fb'; // Full blue for maximum value
  };

  // Define the emoji based on the value
  const getEmoji = (value: number) => {
    if (value <= 0.2 * maxValue) return '😫';
    if (value <= 0.4 * maxValue) return '😪';
    if (value <= 0.6 * maxValue) return '😐';
    if (value <= 0.8 * maxValue) return '😄';
    return '😁';
  };

  return (
    <View style={styles.container}>
      <View style={styles.sueño}>
        <View style={styles.inner}>
          <Feather name="moon" size={24} color="#6608ff" />
          <Text className="px-2 text-xl font-bold">Horas de sueño</Text>
          <Feather name="info" size={16} color="grey" />
        </View>
        <View style={styles.inner}>
          <View style={styles.input}>
            <TextInput
              onPress={() => (sueño === '-' ? setsueño('') : null)}
              onChangeText={(text) => setsueño(text)}
              value={sueño}
              className="font-regular text-center text-xl"
            />
          </View>
          <Text className="text-lg">/ 8 horas</Text>
        </View>
      </View>
      <View style={styles.inner}>
        <Ionicons name="water-outline" size={24} color="#6608ff" />
        <Text className="px-2 text-xl font-bold">Hidratación</Text>
        <Feather name="info" size={16} color="grey" />
      </View>
      <Text style={styles.amountText}>{`${value.toFixed(1)} / ${maxValue} Litros`}</Text>
      <View style={styles.row}>
        <Text style={styles.emoji}>{getEmoji(value)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={maxValue}
          minimumTrackTintColor={getSliderColor(value)}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor={getSliderColor(value)}
          value={value}
          onValueChange={setValue}
        />
      </View>
    </View>
  );
};

export default SueñoHidratacion;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 20,
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
  sueño: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginHorizontal: 5,
    width: 40,
  },
  emoji: {
    fontSize: 30,
    marginRight: 5,
  },
  slider: {
    flex: 1,
  },
  track: {
    height: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    paddingLeft: 32,
  },
});
