import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import React, { useEffect, useState } from 'react';
import moment from 'moment';

import ResumenEstadisticasNutricion from '@components/Nutricion/ResumenEstadisticas';
import { findNutricionByDate } from '~/assets/nutricion/nutricion';

const HoyView = () => {
  return (
    <View>
      <ResumenEstadisticasNutricion isToday={true} card={true} />
    </View>
  );
};

export default HoyView;

const styles = StyleSheet.create({});
