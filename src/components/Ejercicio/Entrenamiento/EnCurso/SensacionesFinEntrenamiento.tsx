import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface SensacionesFinEntrenamientoProps {
  value: number;
  setValue: (value: number) => void;
}

const SensacionesFinEntrenamiento = ({ value, setValue }: SensacionesFinEntrenamientoProps) => {
  const getEmoji = (value: number) => {
    if (value == 0) return '😫';
    if (value == 1) return '😪';
    if (value == 2) return '😐';
    if (value == 3) return '😄';
    if (value == 4) return '😁';
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensaciones entrenamiento</Text>

      <View style={styles.selector}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{getEmoji(value)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.labelsContainer}>
            <TouchableOpacity onPress={() => setValue(0)}>
              <Text style={[styles.label, value == 0 && { fontWeight: 'bold' }]}>
                Muy{'\n'}negativo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setValue(1)}>
              <Text style={[styles.label, value == 1 && { fontWeight: 'bold' }]}>Negativo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setValue(2)}>
              <Text style={[styles.label, value == 2 && { fontWeight: 'bold' }]}>Neutro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setValue(3)}>
              <Text style={[styles.label, value == 3 && { fontWeight: 'bold' }]}>Positivo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setValue(4)}>
              <Text style={[styles.label, value == 4 && { fontWeight: 'bold' }]}>
                Muy{'\n'}Positivo
              </Text>
            </TouchableOpacity>
          </View>

          <Slider
            thumbTintColor="#6608ff"
            maximumTrackTintColor="#e0e0e0"
            minimumTrackTintColor="#6608ff"
            minimumValue={0}
            maximumValue={4}
            value={value}
            onValueChange={setValue}
            step={1}
          />
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${value * 25}%` }]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 20,
    elevation: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.14,
  },
  selector: {
    padding: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    padding: 10,
  },
  labelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //gap: 20,
    marginBottom: 12,
  },
  label: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555',
  },
  emojiContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 8,
  },
  emoji: {
    fontSize: 24,
  },
  progressBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 3,
    zIndex: -1,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progress: {
    width: '70%', // Ajusta el porcentaje según sea necesario
    height: '100%',
    backgroundColor: '#6608ff',
  },
});

export default SensacionesFinEntrenamiento;
