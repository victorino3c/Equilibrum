import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Timer from '~/src/components/Utils/Timer';

const CabeceraEntrenamiento = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <FontAwesome name="clock-o" size={30} color="#6608ff" />
        <Timer textStyle={{ fontSize: 18 }} />
      </View>
      <View style={styles.item}>
        <MaterialCommunityIcons name="weight-kilogram" size={30} color="#6608ff" />
        <Text style={{ fontSize: 18 }}>kg</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="flame-outline" size={30} color="#6608ff" />
        <Text style={{ fontSize: 18 }}>kcal</Text>
      </View>
    </View>
  );
};

export default CabeceraEntrenamiento;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  item: { alignItems: 'center', alignContent: 'center', flexDirection: 'row', gap: 10 },
});
