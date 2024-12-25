import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type FormulaProps = {
  objective: string;
  nutricion: string;
  exercise: string;
};

const Formula = (props: FormulaProps) => {
  const textsize = 'text-3xl';

  return (
    <View style={styles.container}>
      <View style={styles.formula}>
        <View style={styles.item}>
          <Text className={textsize}>{props?.objective}</Text>
          <Text className="text-md">Objetivo</Text>
        </View>
        <Text className={textsize}>-</Text>
        <View style={styles.item}>
          <Text className={textsize}>{props?.nutricion}</Text>
          <Text className="text-md">Nutrición</Text>
        </View>
        <Text className={textsize}>+</Text>
        <View style={styles.item}>
          <Text className={textsize}>{props?.exercise}</Text>
          <Text className="text-md">Ejercicio</Text>
        </View>
        <Text className={textsize}>=</Text>
        <View style={styles.item}>
          <Text className={textsize}>
            {parseInt(props?.objective) - parseInt(props?.nutricion) + parseInt(props?.exercise)}
          </Text>
          <Text className="text-md">Restante</Text>
        </View>
      </View>
    </View>
  );
};

export default Formula;

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
  formula: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
