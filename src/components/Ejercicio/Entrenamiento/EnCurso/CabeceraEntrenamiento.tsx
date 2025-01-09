import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { appStore } from '~/src/store/store';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Timer from '~/src/components/Utils/Timer';

const CabeceraEntrenamiento = () => {
  const { volumen, calorias } = appStore();

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <FontAwesome name="clock-o" size={30} color="#6608ff" />
        <Timer textStyle={{ fontSize: 18 }} />
      </View>
      <View style={styles.item}>
        <MaterialCommunityIcons name="weight-kilogram" size={30} color="#6608ff" />
        <Text style={{ fontSize: 18 }}>{volumen} kg</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="flame-outline" size={30} color="#6608ff" />
        <Text style={{ fontSize: 18 }}>{calorias} kcal</Text>
      </View>
    </View>
  );
};

export default CabeceraEntrenamiento;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  item: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    gap: 5,
    //width: '33%',
    flex: 1,
    justifyContent: 'center',
  },
});
