import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function WaterIntakeSlider() {
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
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: '5%',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  emoji: {
    fontSize: 30,
    marginRight: 10,
  },
  slider: {
    flex: 1,
  },
  track: {
    height: 10,
    borderRadius: 5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
