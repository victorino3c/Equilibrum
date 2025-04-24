import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import { medidaType } from '~/src/types/types';

interface CarrouselMedidasProps {
  medidas: medidaType[];
}

const CarrouselMedidas = ({ medidas }: CarrouselMedidasProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrousel medidas</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}>
        {medidas.map((medida) => (
          <View key={medida.id} style={styles.item}>
            <Text
              style={{
                paddingBottom: 5,
                width: '100%',
                fontWeight: 'bold',
                backgroundColor: '#9f9f9f',
                color: '#fff',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                textAlign: 'center',
              }}>
              {medida.fecha}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CarrouselMedidas;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  item: {
    //marginVertical: 10,
    height: 150,
    width: 110,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
});
