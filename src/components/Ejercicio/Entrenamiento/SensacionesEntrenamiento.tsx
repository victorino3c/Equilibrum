import Slider from '@react-native-community/slider';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Database } from '~/src/database.types';

type Sensaciones = Database['public']['Enums']['sensaciones_enum'];

const sensacionesColor: Record<string, [string]> = {
  'Muy negativo': ['#ff0000'],
  Negativo: ['#990000'],
  Neutro: ['#222222'],
  Positivo: ['#009900'],
  'Muy positivo': ['#00ee00'],
};

interface SensacionesFinEntrenamientoProps {
  value?: Sensaciones;
  setValue?: (value: Sensaciones) => void;
  entrenamiento?: Database['public']['Tables']['entrenamiento']['Row'];
  editable?: boolean;
}

const SensacionesEntrenamiento = ({
  value,
  setValue,
  editable = true,
  entrenamiento,
}: SensacionesFinEntrenamientoProps) => {
  const getEmoji = (value: Sensaciones) => {
    if (value == 'Muy negativo') return '😫';
    if (value == 'Negativo') return '😪';
    if (value == 'Neutro') return '😐';
    if (value == 'Positivo') return '😄';
    if (value == 'Muy positivo') return '😁';
    return null;
  };

  const getValor = (value: Sensaciones): number => {
    if (value == 'Muy negativo') return 0;
    if (value == 'Negativo') return 1;
    if (value == 'Neutro') return 2;
    if (value == 'Positivo') return 3;
    if (value == 'Muy positivo') return 4;
    return 2;
  };

  const setValor = (value: number) => {
    if (value == 0) setValue!('Muy negativo');
    if (value == 1) setValue!('Negativo');
    if (value == 2) setValue!('Neutro');
    if (value == 3) setValue!('Positivo');
    if (value == 4) setValue!('Muy positivo');
  };

  if (editable === true && value && setValue) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sensaciones entrenamiento</Text>

        <View style={styles.selector}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{getEmoji(value)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.labelsContainer}>
              <TouchableOpacity onPress={() => setValue('Muy negativo')}>
                <Text style={[styles.label, value == 'Muy negativo' && { fontWeight: 'bold' }]}>
                  Muy{'\n'}negativo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setValue('Negativo')}>
                <Text style={[styles.label, value == 'Negativo' && { fontWeight: 'bold' }]}>
                  Negativo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setValue('Neutro')}>
                <Text style={[styles.label, value == 'Neutro' && { fontWeight: 'bold' }]}>
                  Neutro
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setValue('Positivo')}>
                <Text style={[styles.label, value == 'Positivo' && { fontWeight: 'bold' }]}>
                  Positivo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setValue('Muy positivo')}>
                <Text style={[styles.label, value == 'Muy positivo' && { fontWeight: 'bold' }]}>
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
              value={getValor(value)}
              onValueChange={setValor}
              step={1}
            />
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${getValor(value) * 25}%` }]} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (entrenamiento && entrenamiento.sensacion) {
    return (
      <View style={styles.container}>
        <Text style={styles.tittle}>Sensaciones Entrenamiento</Text>
        <View style={styles.info}>
          <Text style={styles.infoText}>{getEmoji(entrenamiento.sensacion)}</Text>
          <Text style={[styles.infoText, { color: sensacionesColor[entrenamiento.sensacion][0] }]}>
            {entrenamiento.sensacion}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 15,
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
  info: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 40,
    fontWeight: 'regular',
  },
});

export default SensacionesEntrenamiento;
