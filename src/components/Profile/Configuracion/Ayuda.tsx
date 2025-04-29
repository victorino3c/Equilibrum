import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

import { Feather, AntDesign } from '@expo/vector-icons';

const iconQuestions = <AntDesign name="questioncircleo" size={26} color="black" />;
const iconSuggestion = <Feather name="inbox" size={26} color="black" />;
const iconReview = <Feather name="star" size={26} color="black" />;
const iconChevronDown = <Feather name="chevron-right" size={26} color="black" />;

const Ayuda = () => {
  const noAvailableYet = () => {
    Alert.alert('En proceso...', 'Está característica no está disponible de momento');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => noAvailableYet()}>
        <View style={styles.itemLeft}>
          {iconQuestions}
          <Text style={styles.text}>Preguntas frecuentes</Text>
        </View>
        <View>{iconChevronDown}</View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => noAvailableYet()}>
        <View style={styles.itemLeft}>
          {iconSuggestion}
          <Text style={styles.text}>Enviar sugerencia</Text>
        </View>
        <View>{iconChevronDown}</View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => noAvailableYet()}>
        <View style={styles.itemLeft}>
          {iconReview}
          <Text style={styles.text}>Reseña en Play Store</Text>
        </View>
        <View>{iconChevronDown}</View>
      </TouchableOpacity>
    </View>
  );
};

export default Ayuda;

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
