import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Skeleton from '../Utils/SkeletonView';

type FormulaProps = {
  objective: string;
  nutricion: string;
  exercise: string;
  loading?: boolean;
};

const FormulaOnboarding = ({ objective, nutricion, exercise, loading = false }: FormulaProps) => {
  const textsize = 'text-3xl';

  if (loading) {
    return <Skeleton height={90} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.formula}>
        <View style={styles.item}>
          <Text className={textsize}>{objective}</Text>
          <Text className="text-md">Objetivo</Text>
        </View>
        <Text className={textsize}>-</Text>
        <View style={styles.item}>
          <Text className={textsize}>{nutricion}</Text>
          <Text className="text-md">Nutrición</Text>
        </View>
        <Text className={textsize}>+</Text>
        <View style={styles.item}>
          <Text className={textsize}>{exercise}</Text>
          <Text className="text-md">Ejercicio</Text>
        </View>
        <Text className={textsize}>=</Text>
        <View style={styles.item}>
          <Text className={textsize}>
            {parseInt(objective) - parseInt(nutricion) + parseInt(exercise)}
          </Text>
          <Text className="text-md">Restante</Text>
        </View>
      </View>
    </View>
  );
};

export default FormulaOnboarding;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: 370,
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
