import { View, Text } from 'react-native';
import React from 'react';

import SueñoHidratacionOnboarding from './sueñoHidratacion';
import FormulaOnboarding from './formula';

const EquilibrioOnboaring = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        height: 370,
        width: 370,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FormulaOnboarding objective={'2200'} nutricion={'2400'} exercise={'600'} />
      <SueñoHidratacionOnboarding
        fecha={'2023-10-01'}
        objetivoHidratacion={3.3}
        objetivoSueño={8}
      />
    </View>
  );
};

export default EquilibrioOnboaring;
