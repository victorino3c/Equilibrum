import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

import { Feather, Ionicons, FontAwesome6 } from '@expo/vector-icons';

import appStore from '@store/AppStore';

const iconLanguage = <Ionicons name="globe-outline" size={26} color="black" />;
const iconMeasures = <FontAwesome6 name="ruler" size={26} color="black" />;
const iconMode = <Feather name="moon" size={26} color="black" />;
const iconChevronDown = <Feather name="chevron-right" size={26} color="black" />;

const Preferencias = () => {
  const { setHasEnteredUserInfo } = appStore();

  const noAvailableYet = () => {
    Alert.alert('En proceso...', 'Está característica no está disponible de momento');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => noAvailableYet()}>
        <View style={styles.itemLeft}>
          {iconLanguage}
          <Text style={styles.text}>Idioma</Text>
        </View>
        <View>{iconChevronDown}</View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => setHasEnteredUserInfo(false)}>
        <View style={styles.itemLeft}>
          {iconMeasures}
          <Text style={styles.text}>Unidades</Text>
        </View>
        <View>{iconChevronDown}</View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => noAvailableYet()}>
        <View style={styles.itemLeft}>
          {iconMode}
          <Text style={styles.text}>Modo</Text>
        </View>
        <View>{iconChevronDown}</View>
      </TouchableOpacity>
    </View>
  );
};

export default Preferencias;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
    gap: 15,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});
